/**
 * Setzt ein grünes Kästchen (🟩) vor offene Google Tasks, die wiederkehrend sind.
 *
 * Wichtig: Die Google Tasks API liefert KEIN Wiederholungs-Feld. Das Skript
 * erkennt wiederkehrende Aufgaben daher heuristisch:
 *   1. Es gibt in derselben Liste eine erledigte Aufgabe mit gleichem Titel
 *      und früherem Fälligkeitsdatum (= frühere Instanz der Serie), oder
 *   2. die Notiz der Aufgabe enthält den manuellen Tag "#wdh".
 *
 * Einrichtung: Im Apps-Script-Editor unter "Dienste" die "Tasks API" hinzufügen,
 * dann einmal installTrigger() ausführen.
 */

const MARKER = "🟩";
const MANUAL_TAG = /#wdh\b/i;

function markRecurringTasks() {
  const lists = Tasks.Tasklists.list({ maxResults: 100 }).items || [];

  lists.forEach(list => {
    const tasks = fetchAllTasks_(list.id);

    const byTitle = {};
    tasks.forEach(t => {
      if (!t.title) return;
      const key = normalize_(t.title);
      (byTitle[key] = byTitle[key] || []).push(t);
    });

    tasks.forEach(task => {
      if (!task.title || task.status !== "needsAction") return;
      if (task.title.startsWith(MARKER)) return;
      if (!isRecurring_(task, byTitle[normalize_(task.title)])) return;

      Tasks.Tasks.patch({ title: `${MARKER} ${task.title}` }, list.id, task.id);
    });
  });
}

function isRecurring_(task, sameTitle) {
  if (MANUAL_TAG.test(task.notes || "")) return true;
  if (!task.due) return false;
  // RFC-3339-Strings im selben Format lassen sich lexikografisch vergleichen.
  return sameTitle.some(other =>
    other.id !== task.id &&
    other.status === "completed" &&
    other.due &&
    other.due < task.due
  );
}

function fetchAllTasks_(listId) {
  const all = [];
  let pageToken;
  do {
    const res = Tasks.Tasks.list(listId, {
      showCompleted: true,
      showHidden: true,
      maxResults: 100,
      pageToken: pageToken
    });
    all.push(...(res.items || []));
    pageToken = res.nextPageToken;
  } while (pageToken);
  return all;
}

function normalize_(title) {
  return title.replace(MARKER, "").trim().toLowerCase();
}

/** Einmal ausführen: lässt markRecurringTasks stündlich laufen. */
function installTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === "markRecurringTasks")
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("markRecurringTasks").timeBased().everyHours(1).create();
}

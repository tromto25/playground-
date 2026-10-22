/**
 * Kochplan-Tabelle → Bring!
 *
 * Holt Zeilen mit Status „neu“ aus dem Blatt „Einkauf“ der Tabelle „Kochplan“,
 * setzt die Artikel auf die Bring!-Liste aus Spalte „Laden“ und setzt den Status
 * auf „übertragen“. Der Skill kochplan-woche schreibt die Zeilen.
 *
 *   Artikel  | Angaben   | Laden    | Für | Status | Angelegt
 *   Paprika  | rot 1 Stk | Aldi     | 3T  | neu    | 2026-10-22   → Aldi: Paprika [rot 1 Stk]
 *   Udon     | 2 Pck     | Woanders | 3T  | neu    | 2026-10-22   → Woanders: Udon [2 Pck]
 *
 * Laden leer → Aldi; unbekannter Laden → Woanders.
 * Ein Artikel gilt erst als übertragen, wenn seine Bring!-Liste den Aufruf angenommen hat.
 *
 * Nutzt ZIELE, INTERVALL_MINUTEN und die Bring!-Funktionen aus Code.gs.
 * Einrichtung: diese Datei im Projekt BringBridge anlegen, kochplanEinrichten()
 * einmal ausführen und den Zugriff auf Google Sheets erlauben.
 */

const KOCHPLAN_TABELLE = '1EGEHyF_lTqhfWEcc2dxYU_lEojisyQSVM41iFYrhi-Q';
const KOCHPLAN_BLATT = 'Einkauf';
const KOCHPLAN_SPALTE_STATUS = 5; // Artikel | Angaben | Laden | Für | Status | Angelegt

// ---------------------------------------------------------------------------
// Einstiegspunkte
// ---------------------------------------------------------------------------

/** Läuft per Zeitauslöser. */
function kochplanUebertragen() {
  const sperre = LockService.getScriptLock();
  if (!sperre.tryLock(1000)) return; // anderer Lauf noch aktiv
  try {
    kochplanLauf_(false);
  } finally {
    sperre.releaseLock();
  }
}

/** Zeigt im Protokoll, was passieren würde – ändert nichts. */
function kochplanTestlauf() {
  kochplanLauf_(true);
}

/** Einmal von Hand ausführen: legt den Zeitauslöser an und macht einen Testlauf. */
function kochplanEinrichten() {
  kochplanAbschalten();
  ScriptApp.newTrigger('kochplanUebertragen').timeBased().everyMinutes(INTERVALL_MINUTEN).create();
  console.log('Zeitauslöser angelegt: alle ' + INTERVALL_MINUTEN + ' Minuten.');
  kochplanTestlauf();
}

/** Entfernt den Zeitauslöser wieder. */
function kochplanAbschalten() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'kochplanUebertragen')
    .forEach(t => ScriptApp.deleteTrigger(t));
}

// ---------------------------------------------------------------------------
// Ablauf
// ---------------------------------------------------------------------------

function kochplanLauf_(nurAnzeigen) {
  const blatt = SpreadsheetApp.openById(KOCHPLAN_TABELLE).getSheetByName(KOCHPLAN_BLATT);
  const letzte = blatt.getLastRow();
  if (letzte < 2) return;

  // neue Zeilen nach Bring!-Liste gruppieren
  const gruppen = {};
  blatt.getRange(2, 1, letzte - 1, KOCHPLAN_SPALTE_STATUS).getValues().forEach((werte, i) => {
    const [artikel, angaben, laden, , status] = werte.map(w => String(w).trim());
    if (status !== 'neu' || !artikel) return;
    const liste = kochplanZiel_(laden).liste;
    (gruppen[liste] = gruppen[liste] || []).push({ zeile: i + 2, name: artikel, spec: angaben });
  });

  const namen = Object.keys(gruppen);
  if (namen.length === 0) {
    if (nurAnzeigen) console.log('Keine neuen Artikel im Blatt „' + KOCHPLAN_BLATT + '“.');
    return;
  }

  if (nurAnzeigen) {
    namen.forEach(n => console.log(n + ': ' + gruppen[n].map(a => a.name + (a.spec ? ' [' + a.spec + ']' : '')).join(', ')));
    return;
  }

  const sitzung = bringSitzung_();
  const listen = bringListen_(sitzung);
  namen.forEach(n => {
    try {
      const liste = listeFinden_(listen, n);
      if (!liste) throw new Error('Keine Bring!-Liste namens „' + n + '“ gefunden.');
      bringHinzufuegen_(sitzung, liste.listUuid, gruppen[n]);
      gruppen[n].forEach(a => blatt.getRange(a.zeile, KOCHPLAN_SPALTE_STATUS).setValue('übertragen'));
      console.log('Übertragen: ' + n + ' (' + gruppen[n].length + ' Artikel)');
    } catch (e) {
      // Zeilen bleiben „neu“ → nächster Lauf versucht es erneut
      console.error('Fehler bei Liste „' + n + '“: ' + e.message);
    }
  });
}

/** Laden aus der Tabelle → Eintrag aus ZIELE. */
function kochplanZiel_(laden) {
  const name = (laden || 'Aldi').toLowerCase();
  return ZIELE.find(z => z.liste.toLowerCase() === name)
    || ZIELE.find(z => z.liste.toLowerCase() === 'woanders')
    || ZIELE[0];
}

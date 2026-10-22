# 3-Tage-Modus und Resteverwerter

Modul zu `kochplan-woche`. Wird gelesen, wenn T statt eines Wochenplans eine rollierende Planung für die nächsten drei Tage möchte oder Reste verwerten will. Alle Regeln aus `SKILL.md` gelten weiter (≤ 30 Min, Aldi-Check, Bring!-Format, PDF-Konventionen), soweit hier nichts anderes steht.

**Leitprinzip:** T soll so wenig wie möglich tippen. Jede Rückfrage wird in **einem** Block gestellt, Defaults werden angenommen, nur Abweichungen muss T nennen.

## Dateien in OneDrive (Zustand)

Der Zustand liegt bewusst in OneDrive und nicht neben dieser Datei, weil Plugin-Dateien beim Sync überschrieben werden können und T die Dateien selbst bearbeiten können soll.

- `C:\Users\tt-st\OneDrive\Rezepte\Kochlog.md` – was geplant, gekocht, bewertet wurde und welche Reste übrig sind. Neueste Einträge oben.
- `C:\Users\tt-st\OneDrive\Rezepte\Vorrat.md` – Standardzutaten, die immer da sind. Zeilen mit `(knapp)` oder `(leer)` gelten als **nicht** vorrätig und kommen auf die Einkaufsliste.

Fehlt eine der Dateien, lege sie an (Kochlog mit dem Format unten und leerer Tabelle; Vorrat mit den Positionen aus der Sektion „Vermutlich vorrätig" in `einkaufsliste-template.txt`) und melde das T in einem Satz.

### Kochlog-Format

```
| Datum | Gericht | ID | Status | Bewertung | Reste | Notiz |
|---|---|---|---|---|---|---|
| 2026-10-24 | Kichererbsen-Spinat-Topf | HP13 | geplant | | | |
| 2026-10-23 | Gnocchi mit Tomaten und Mozzarella | HP01 | gekocht | ++ | ½ Mozzarella | |
```

- **Status:** `geplant` → `gekocht` / `getauscht` (dann Gericht durch das tatsächlich gekochte ersetzen und Notiz „statt X") / `ausgefallen`.
- **Bewertung:** `++` (gerne öfter), `+` (gut), `-` (nicht nochmal), leer = keine Angabe.
- **Reste:** frei, kurz. Wird beim Resteverwerter und beim nächsten Vorschlag verbraucht; verbrauchte Reste durchstreichen (`~~½ Mozzarella~~`).
- Einträge älter als 90 Tage in die Sektion „Archiv" am Dateiende verschieben, damit die Tabelle schlank bleibt.

## Ablauf 3-Tage-Modus

Trigger: „3 Tage", „nächste Tage", „was koche ich die nächsten Tage", „neue Vorschläge", „Vorschläge für morgen", „Kochvorschlag".

### Schritt 1 – Nachtrag (automatisch, ohne Extra-Aufforderung)

Lies `Kochlog.md`. Für alle Einträge mit Status `geplant` und Datum vor heute (bzw. heute, wenn T abends schreibt) stelle **eine** Sammelfrage:

> Seit dem letzten Mal: Mo Gnocchi, Di Lachs. Wenn nichts kommt, nehme ich an: beides gekocht, keine Bewertung, keine Reste. Abweichungen, 👍/👎 oder Reste? (z. B. „Di getauscht gegen Pizza, Gnocchi ++, Rest: halber Brokkoli")

Antwortet T nur mit „passt", „ok" oder geht direkt zur Auswahl über: Status auf `gekocht` setzen, sonst nichts. Bewertungen zusätzlich wie bisher spiegeln: `++` → `wunschrezepte.md` „Lieblingsgerichte", `-` → „Nicht nochmal".

### Schritt 2 – Kontext einlesen

- `Kochlog.md`: letzte 14 Tage (Wiederholungen, Kategorien, Bewertungen), offene Reste.
- `standardgerichte.md`, `wunschrezepte.md`, `aldi_sortiment.md` wie in Phase 2 des Wochenplans.
- `Vorrat.md`.
- Personenzahl: letzte im Kochlog notierte (Notiz-Spalte, z. B. `2 P`) oder 2 als Default; nur fragen, wenn T etwas anderes andeutet.

### Schritt 3 – Vorschlag: 3 Tage × 2 Optionen

**Regeln:**

1. **Keine Wiederholung** eines Gerichts, das in den letzten 10 Tagen gekocht wurde. Keine Gerichte mit Bewertung `-`.
2. **Anti-Monotonie:** Tag 1 nicht in der Kategorie des zuletzt gekochten Gerichts; die drei Tage decken mindestens drei Kategorien ab (über beide Optionen hinweg).
3. **Option A = bewährt** (Status `standard`, bevorzugt `++`/`+` oder Lieblingsgericht). **Option B = Abwechslung** (Neuentdeckung im HF-Stil, `neu`, oder ein länger nicht gekochtes Gericht). Mindestens eine vegetarische Option pro Tag.
4. **Reste zuerst:** Offene Reste aus dem Kochlog in mindestens einer Option von Tag 1 oder 2 verwerten und das in der Tabelle markieren.
5. **Haltbarkeit:** Frischer Fisch, Hackfleisch, zarte Kräuter und Blattsalat auf Tag 1; Robustes (Kohl, Wurzelgemüse, TK, Konserven) auf Tag 3.
6. **Zutaten-Überschneidung:** Bei der Auswahl der Optionen darauf achten, dass angebrochene Packungen (Sahne, Spinat, Feta, Frischkäse, Kräuterbund, Kokosmilch) an einem anderen Tag weiterverwendet werden können. Mögliche Kombinationen kurz ausweisen.

**Ausgabe im Chat (kompakt):**

```
Vorschläge ab Do 23.10. (2 P)

Tag | A (bewährt)                 | B (Abwechslung)
Do  | Lachs Senf-Honigrahm (HP16) | NEU: Orzo mit Zitrone & Erbsen 🌱
Fr  | Gnocchi Tomate-Mozz. 🌱      | Kichererbsen-Spinat-Topf 🌱 ♻ Rest Spinat
Sa  | Penne Rindsteak (HP09)      | NEU: Ofen-Kürbis mit Feta 🌱

Überschneidung: Do-B + Fr-B teilen Spinat; Fr-A + Sa-B teilen Feta-/Käsepackung.
Wahl? z. B. „A B B"
```

🌱 = vegetarisch, ♻ = verwertet Reste, NEU = Neuentdeckung ohne PDF im Ordner.

### Schritt 4 – Einkaufsliste nach Auswahl

T antwortet z. B. „A B B". Dann ohne weitere Bestätigung:

1. Zutaten der gewählten Gerichte ermitteln (PDF aus dem Index öffnen bzw. eigenes Rezept bei NEU), auf Personenzahl skalieren, konsolidieren.
2. **Abziehen:** alles aus `Vorrat.md` ohne `(knapp)`/`(leer)`; offene Reste aus dem Kochlog.
3. **Nur echte Zweifel abfragen**, in einem Block und höchstens fünf Positionen; typische Kandidaten sind Dinge, die oft angebrochen herumstehen (Sahne, Parmesan, Frischkäse, Kokosmilch):
   > Noch da? Sahne, Parmesan. (Keine Antwort = kaufen.)
4. **Aldi-Check** wie Phase 4 in `SKILL.md`, aber als eine kurze Rückfrage zusammen mit Punkt 3. Für Nicht-Aldi-Zutaten zusätzlich passende Bezugsquelle aus `onlineshops.md` nennen.
5. **Bring!-Datei schreiben** (Format exakt wie Phase 6b in `SKILL.md`), flach in den Wochenpläne-Ordner:
   `C:\Users\tt-st\OneDrive\Rezepte\Wochenpläne\einkaufsliste_bring_3T_[YYYY-MM-DD].txt`
   Das Präfix `einkaufsliste_bring_` bleibt erhalten, damit T's Skript die Datei findet. Eine strukturierte Liste und einen Wochenordner gibt es im 3-Tage-Modus **nicht**, außer T fragt danach.
6. Pfad als computer://-Link melden. Ein Satz, keine Zusammenfassung der Liste.

### Schritt 5 – Kochlog und Rezepte pflegen

- Die drei gewählten Gerichte mit Datum und Status `geplant` oben in `Kochlog.md` eintragen, Personenzahl in die Notiz (`2 P`).
- **Neuentdeckungen** (NEU), die gewählt wurden: Rezept als PDF im Standardlayout aus Phase 7b erzeugen und direkt in `C:\Users\tt-st\OneDrive\Rezepte\Hauptgerichte\NE_[GerichtKurz].pdf` ablegen, außerdem eine Zeile in `standardgerichte.md` (Sektion Neuentdeckungen, Status `neu`) ergänzen. So wächst der Rezepteordner von selbst.
- Wird ein `neu`-Gericht mit `++`/`+` bewertet, Status in `standardgerichte.md` auf `standard` setzen.

### Schritt 6 – Rollieren

Der Modus ist rollierend: Ruft T nach zwei Tagen wieder auf, gelten noch offene `geplant`-Einträge der Zukunft als gesetzt; vorgeschlagen werden nur die Tage, die danach noch fehlen, sodass immer drei Tage abgedeckt sind. Will T nur einen Tag neu, nimmt der Skill das hin.

## Resteverwerter

Trigger: „Reste", „Reste:", „was ist übrig", „Resteverwertung", „was koche ich aus", „Kühlschrank leer machen", oder eine Aufzählung von Zutaten mit der Frage, was man daraus machen kann.

1. Zutaten aus T's Nachricht nehmen und mit den offenen Resten im Kochlog sowie `Vorrat.md` zusammenführen.
2. **Zwei** Gerichte vorschlagen, ≤ 30 Min:
   - Option 1: kommt ohne Einkauf aus.
   - Option 2: darf **höchstens zwei** Zutaten zukaufen; diese ausdrücklich nennen.
   - Je Option: Name, Zeit, welche Reste verbraucht werden, Zubereitung in höchstens fünf Schritten direkt im Chat (kein PDF, außer T möchte es behalten).
3. Nach der Wahl: Eintrag `gekocht` (oder `geplant`, wenn es nicht heute ist) im Kochlog, verbrauchte Reste durchstreichen. Bei Option 2 die Zukäufe als kleine Bring!-Datei `einkaufsliste_bring_reste_[YYYY-MM-DD].txt` schreiben, sofern T nicht ablehnt.
4. Kochtipp: Wenn es einen Profi-Trick gibt, der die Reste besser macht (z. B. alten Reis kalt aus dem Kühlschrank anbraten, welkes Gemüse in Eiswasser aufleben lassen), in einer Zeile ergänzen.

## Was dieser Modus nicht tut

- Keine Live-Abfrage des Aldi-Sortiments oder der Prospekte; es bleibt bei der Heuristik in `aldi_sortiment.md`. Nennt T Angebote der Woche („Lachs ist im Angebot"), werden sie bevorzugt eingeplant.
- Kein direkter Bring!-Zugriff; der Weg läuft über die Datei und T's Skript.

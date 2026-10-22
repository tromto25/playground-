# Tabelle „Kochplan" – Aufbau

Google Sheet in `Rezepte/` (ID `1EGEHyF_lTqhfWEcc2dxYU_lEojisyQSVM41iFYrhi-Q`). Einzige Stelle für veränderliche Daten des Skills; T bearbeitet sie auch selbst am Handy. Lesen und schreiben per Sheets-Connector, Bereiche über den Blattnamen (z. B. `Rezepte!A1:K`). Neue Einträge immer **anhängen**, bestehende Zeilen nur zellgenau ändern, nie Blätter neu schreiben.

**Behauptungen kenntlich gemacht:** Zeit-, Aldi- und Haltbarkeitswerte in `Rezepte` und `Frühstücke` sind Schätzungen aus Dateinamen, allgemeiner Rezeptkenntnis und der Aldi-Heuristik, nicht aus den PDFs verifiziert. T justiert sie nach dem ersten Kochen.

## Status-Werte (Rezepte und Frühstücke)

- `standard` – regulärer Pool
- `wunsch` – von T gewünscht, bevorzugt einplanen
- `neu` – Neuentdeckung, noch nicht bewertet; nach `+`/`++` auf `standard` setzen
- `pause` – derzeit nicht vorschlagen (nur auf ausdrücklichen Wunsch)
- `nein` – endgültig raus

## Blatt `Rezepte`

| Spalte | Inhalt |
|---|---|
| ID | `HP..` Pool, `SP..` Sonderfall, `AU..` Auflauf, `BK..` Backen, `NE..` Neuentdeckung |
| Gericht | Anzeigename |
| Kategorie | Pasta, Reis/Asia, Kartoffel, Pfanne, Auflauf, Suppe, Eintopf, Brot/Pizza, Fisch, Fleisch, Vegetarisch-ohne-Stärkebasis; Grundlage der Anti-Monotonie-Regel |
| Zeit (min) | geschätzte Gesamtzeit; Wochen- und 3-Tage-Pool nur ≤ 30 |
| Vegi | ja / nein |
| Aldi | grün / gelb / rot nach `aldi_sortiment.md`; gelb/rot → Rückfrage |
| Status | siehe oben |
| Datei | Pfad relativ zu `Rezepte/` (Ordner-IDs in `SKILL.md`); leer bei Neuentdeckungen ohne PDF |
| Notiz | Kurzhinweis (Aldi-Risiko, Ersatz, Schnellkoch-Variante) |
| Gruppe | `Pool`, `Sonderfall` (nur mit Anpassung ≤ 30 Min), `Auflauf` (meist > 30 Min), `Backen` (nur als Sonderwunsch), `Neuentdeckung` |
| Erstmals | Datum der ersten Einplanung (vor allem bei Neuentdeckungen) |

Nicht im Blatt, nur zur Inspiration: `Sammlungen/` (vegane Drei-Zutaten-Rezepte, zwei Scans von 2019) für Veggie-Wochen; `Sonstiges/Top Gewürze.pdf` als Referenz für den Gewürzbestand.

## Blatt `Frühstücke`

| Spalte | Inhalt |
|---|---|
| ID | `FR..` |
| Frühstück | Anzeigename |
| Typ | `Make-ahead` (Sonntag vorbereiten, hält mehrere Tage), `Schnell` (≤ 5 Min, ohne Vorbereitung), `Warm/Frisch` (10–15 Min, eher Wochenende), `Brot-basiert` |
| Zeit aktiv (min) | Hands-on-Zeit; bei Make-ahead die Vorbereitungszeit ohne Ziehzeit |
| Haltbarkeit | Kühlschrank-Haltbarkeit (für Make-ahead-Planung) |
| Vegi, Aldi, Status | wie bei `Rezepte` |
| Datei | Pfad relativ zu `Rezepte/`, meist leer |
| Kurzrezept | Zutaten und Zubereitung; reicht als Quelle für die PDF-Erzeugung |

**Auswahl-Hinweise Frühstück:**
- Default-Routine: Mo–Mi eine Make-ahead-Variante, Do–Fr eine strukturell andere Make-ahead-Variante (nicht zweimal Overnight Oats), Sa–So eine Warm/Frisch-Variante.
- Saisonalität: TK-Beeren ganzjährig, frische Beeren Mai–September; Mango und Granatapfel nur eingeschränkt bei Aldi.
- Make-ahead läuft auf einen Sonntag-Prep hinaus; im Plan einen kurzen Prep-Hinweis mitschicken („Sonntag 17 Uhr: Overnight Oats und Eier-Muffins zusammen vorbereiten").

## Blatt `Wünsche`

| Spalte | Inhalt |
|---|---|
| Art | `Lieblingsgericht`, `Wunsch`, `Eingeplant`, `Neu probiert`, `Nicht nochmal`, `Präferenz`, `Frühstücks-Wunsch`, `Frühstücks-Liebling`, `Frühstücks-Notiz` |
| Eintrag | Gericht bzw. Regel im Klartext; bei Rezepten aus dem Ordner die ID in Klammern, z. B. `Gnocchi Tomate-Mozzarella (HP01)` |
| Datum | YYYY-MM-DD |
| Notiz | Bewertung (`+`, `++`, `-`) oder Freitext |

## Blätter `Kochlog`, `Vorrat`, `Einkauf`

Aufbau in `SKILL.md` (Abschnitt Ablageort) und `drei-tage-modus.md`.

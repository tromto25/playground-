# 3-Tage-Modus und Resteverwerter

Modul zu `kochplan-woche`. Wird gelesen, wenn T statt eines Wochenplans eine rollierende Planung für die nächsten drei Tage möchte oder Reste verwerten will. Alle Regeln aus `SKILL.md` gelten weiter (≤ 30 Min, Aldi-Check, Format von Artikel/Angaben, PDF-Konventionen, Drive-IDs), soweit hier nichts anderes steht.

**Leitprinzip:** T soll so wenig wie möglich tippen. Jede Rückfrage wird in **einem** Block gestellt, Defaults werden angenommen, nur Abweichungen muss T nennen.

## Zustand: Tabelle „Kochplan" in Google Drive

ID `1EGEHyF_lTqhfWEcc2dxYU_lEojisyQSVM41iFYrhi-Q`, Zugriff über den Google-Sheets-Connector. Der Zustand liegt bewusst dort und nicht neben dieser Datei, weil Plugin-Dateien beim Sync überschrieben werden können und T die Tabelle am Handy selbst bearbeiten können soll.

### Blatt `Kochlog`

| Datum | Gericht | ID | Status | Bewertung | Reste | Personen | Notiz |
|---|---|---|---|---|---|---|---|
| 2026-10-23 | Gnocchi mit Tomaten und Mozzarella | HP01 | gekocht | ++ | ½ Mozzarella | 2 | |
| 2026-10-24 | Kichererbsen-Spinat-Topf | HP13 | geplant | | | 2 | |

- Neue Einträge **anhängen** (chronologisch, älteste oben). Änderungen an bestehenden Zeilen per Zellen-Update in genau dieser Zeile.
- **Status:** `geplant` → `gekocht` / `getauscht` (Gericht durch das tatsächlich gekochte ersetzen, Notiz „statt X") / `ausgefallen`.
- **Bewertung:** `++` (gerne öfter), `+` (gut), `-` (nicht nochmal), leer = keine Angabe.
- **Reste:** frei, kurz. Verbrauchte Reste löschen und in die Notiz „Rest verwertet am …" schreiben.
- **ID:** ID aus dem Blatt `Rezepte`, bei Neuentdeckungen `NEU`.

### Blatt `Vorrat`

Spalten: Zutat | Bereich | Status. Nur Status `da` gilt als vorrätig; `knapp` und `leer` kommen auf die Einkaufsliste. Nach einem Einkauf, der solche Positionen enthielt, Status wieder auf `da` setzen, sobald T den Einkauf bestätigt oder beim nächsten Aufruf nichts Gegenteiliges sagt.

### Blatt `Einkauf`

Spalten: Artikel | Angaben | Laden | Für | Status | Angelegt. Der Skill hängt nur Zeilen mit Status `neu` an. T's Apps Script `BringBridge` holt sie alle 10 Minuten ab, setzt sie auf die Bring!-Liste aus „Laden" (Aldi, DM, Woanders) und setzt `übertragen`.

## Ablauf 3-Tage-Modus

Trigger: „3 Tage", „nächste Tage", „was koche ich die nächsten Tage", „neue Vorschläge", „Vorschläge für morgen", „Kochvorschlag".

### Schritt 1 – Nachtrag (automatisch, ohne Extra-Aufforderung)

Lies `Kochlog`. Für alle Zeilen mit Status `geplant` und Datum vor heute (bzw. heute, wenn T abends schreibt) stelle **eine** Sammelfrage:

> Seit dem letzten Mal: Mo Gnocchi, Di Lachs. Wenn nichts kommt, nehme ich an: beides gekocht, keine Bewertung, keine Reste. Abweichungen, 👍/👎 oder Reste? (z. B. „Di getauscht gegen Pizza, Gnocchi ++, Rest: halber Brokkoli")

Antwortet T nur mit „passt", „ok" oder geht direkt zur Auswahl über: Status auf `gekocht` setzen, sonst nichts. Bewertungen zusätzlich im Blatt `Wünsche` spiegeln: `++` → Zeile mit Art `Lieblingsgericht`, `-` → Art `Nicht nochmal`.

### Schritt 2 – Kontext einlesen

- `Kochlog`: letzte 14 Tage (Wiederholungen, Kategorien, Bewertungen), offene Reste, zuletzt genutzte Personenzahl (Default 2; nur fragen, wenn T etwas anderes andeutet).
- Blätter `Rezepte` und `Wünsche` sowie `aldi_sortiment.md` wie in Phase 2 des Wochenplans.
- `Vorrat`.

### Schritt 3 – Vorschlag: 3 Tage × 2 Optionen

**Regeln:**

1. **Keine Wiederholung** eines Gerichts, das in den letzten 10 Tagen gekocht wurde. Keine Gerichte mit Bewertung `-`.
2. **Anti-Monotonie:** Tag 1 nicht in der Kategorie des zuletzt gekochten Gerichts; die drei Tage decken mindestens drei Kategorien ab (über beide Optionen hinweg).
3. **Option A = bewährt** (Status `standard`, bevorzugt `++`/`+` oder Lieblingsgericht). **Option B = Abwechslung** (Neuentdeckung im HF-Stil, `neu`, oder ein länger nicht gekochtes Gericht). Mindestens eine vegetarische Option pro Tag.
4. **Reste zuerst:** Offene Reste aus dem Kochlog in mindestens einer Option von Tag 1 oder 2 verwerten und das in der Tabelle markieren.
5. **Haltbarkeit:** Frischer Fisch, Hackfleisch, zarte Kräuter und Blattsalat auf Tag 1; Robustes (Kohl, Wurzelgemüse, TK, Konserven) auf Tag 3.
6. **Zutaten-Überschneidung:** Mit dem Blatt `Zutaten` prüfen und bei der Auswahl der Optionen darauf achten, dass angebrochene Packungen (Sahne, Spinat, Feta, Frischkäse, Kräuterbund, Kokosmilch) an einem anderen Tag weiterverwendet werden können. Mögliche Kombinationen kurz ausweisen.

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

1. Zutaten der gewählten Gerichte aus dem Blatt `Zutaten` holen (Mengen für 2 Portionen, auf die Personenzahl umrechnen) und konsolidieren. Fehlen Zeilen: PDF lesen bzw. bei NEU das eigene Rezept nehmen und die Zutaten an das Blatt anhängen; bei unlesbarem Scan T einmal nach den Hauptzutaten fragen.
2. **Abziehen:** alles aus `Vorrat` mit Status `da`; offene Reste aus dem Kochlog.
3. **Nur echte Zweifel abfragen**, in einem Block und höchstens fünf Positionen; typische Kandidaten sind Dinge, die oft angebrochen herumstehen (Sahne, Parmesan, Frischkäse, Kokosmilch):
   > Noch da? Sahne, Parmesan. (Keine Antwort = kaufen.)
4. **Aldi-Check** wie Phase 4 in `SKILL.md`, aber als eine kurze Rückfrage zusammen mit Punkt 3. Für Nicht-Aldi-Zutaten zusätzlich passende Bezugsquelle aus `onlineshops.md` nennen.
5. **Ins Blatt `Einkauf` anhängen** (Format wie Phase 6b in `SKILL.md`), Spalte „Für" = `3T`. Eine strukturierte Liste oder einen Wochenordner gibt es im 3-Tage-Modus **nicht**, außer T fragt danach.
6. In einem Satz melden: „X Artikel stehen im Einkauf und landen in spätestens 10 Minuten in Bring!". Keine Wiederholung der Liste.

### Schritt 5 – Kochlog und Rezepte pflegen

- Die drei gewählten Gerichte mit Datum, Status `geplant` und Personenzahl an `Kochlog` anhängen.
- **Neuentdeckungen** (NEU), die gewählt wurden: Rezept als PDF im Standardlayout aus Phase 7b erzeugen und per Drive-Connector im Ordner Hauptgerichte (ID `1dKds_LZi_zHPsPuw91U2vpXDx1-G_Asz`) als `NE_[GerichtKurz].pdf` anlegen, außerdem eine Zeile im Blatt `Rezepte` anhängen (Gruppe `Neuentdeckung`, Status `neu`, Datei = `Hauptgerichte/NE_[GerichtKurz].pdf`). So wächst der Rezepteordner von selbst. Den Drive-Link des PDFs in die Notiz-Spalte des Kochlogs schreiben.
- Wird ein `neu`-Gericht mit `++`/`+` bewertet, Status in Blatt `Rezepte` auf `standard` setzen.

### Schritt 6 – Rollieren

Der Modus ist rollierend: Ruft T nach zwei Tagen wieder auf, gelten noch offene `geplant`-Einträge der Zukunft als gesetzt; vorgeschlagen werden nur die Tage, die danach noch fehlen, sodass immer drei Tage abgedeckt sind. Will T nur einen Tag neu, nimmt der Skill das hin.

## Resteverwerter

Trigger: „Reste", „Reste:", „was ist übrig", „Resteverwertung", „was koche ich aus", „Kühlschrank leer machen", oder eine Aufzählung von Zutaten mit der Frage, was man daraus machen kann.

1. Zutaten aus T's Nachricht nehmen und mit den offenen Resten im `Kochlog` sowie dem `Vorrat` zusammenführen.
2. **Zwei** Gerichte vorschlagen, ≤ 30 Min:
   - Option 1: kommt ohne Einkauf aus.
   - Option 2: darf **höchstens zwei** Zutaten zukaufen; diese ausdrücklich nennen.
   - Je Option: Name, Zeit, welche Reste verbraucht werden, Zubereitung in höchstens fünf Schritten direkt im Chat (kein PDF, außer T möchte es behalten).
3. Nach der Wahl: Zeile `gekocht` (oder `geplant`, wenn es nicht heute ist) an `Kochlog` anhängen, verbrauchte Reste austragen. Bei Option 2 die Zukäufe ins Blatt `Einkauf` mit „Für" = `Reste`, sofern T nicht ablehnt.
4. Kochtipp: Wenn es einen Profi-Trick gibt, der die Reste besser macht (z. B. alten Reis kalt aus dem Kühlschrank anbraten, welkes Gemüse in Eiswasser aufleben lassen), in einer Zeile ergänzen.

## Was dieser Modus nicht tut

- Keine Live-Abfrage des Aldi-Sortiments oder der Prospekte; es bleibt bei der Heuristik in `aldi_sortiment.md`. Nennt T Angebote der Woche („Lachs ist im Angebot"), werden sie bevorzugt eingeplant.
- Kein direkter Bring!-Zugriff; der Weg läuft über das Blatt `Einkauf` und T's Apps Script.

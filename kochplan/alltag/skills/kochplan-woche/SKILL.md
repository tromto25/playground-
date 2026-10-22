---
name: kochplan-woche
description: Kochplanung für T aus seinem Rezepteordner (Google Drive, Ordner Rezepte) im HF-Stil, Rezepte ≤ 30 Min, Aldi-Abgleich, Einkaufsliste im Bring!-Format. Drei Modi: (1) Wochenplan Mo–So mit Personenzahl-Abfrage, optional Frühstück, Rezept-PDFs im Wochenordner, Kochmodus; (2) 3-Tage-Modus: rollierend je zwei Vorschläge pro Tag nach Geschmack und Kochlog, nach Wahl sofort Bring!-Liste; (3) Resteverwerter aus Resten und Vorrat. IMMER nutzen bei „Kochplan", „Wochenplan", „Wochenmenü", „Speiseplan", „Essensplan", „Einkaufsliste Woche", „Frühstück planen", „nächste 3 Tage", „was koche ich die nächsten Tage", „Kochvorschlag", „neue Vorschläge", „Reste", „Resteverwertung", „was ist übrig", „was koche ich aus", bei „koch heute" / „los geht's mit X" im laufenden Plan und beim Fortsetzen. Nicht bei einzelnen Rezeptfragen ohne Planungs- oder Restebezug.
---

# Kochplan-Woche

## Was dieser Skill leistet

T möchte einmal pro Woche einen Kochplan, ohne dafür lange überlegen zu müssen. Dieser Skill nimmt ihm diese Last ab: er stellt sieben Gerichte zusammen, die alle in unter 30 Minuten kochbar sind, sorgt für Abwechslung über die Woche, kalkuliert die Zutaten parallel für zwei und vier Personen und liefert eine fertige Einkaufsliste, die zu Aldi passt. Optional plant der Skill zusätzlich das Frühstück der Woche mit – als Make-ahead-Routine (Sonntag vorbereiten) oder mit schnellen Optionen für unter der Woche und einer warmen Variante fürs Wochenende. Auf Wunsch führt der Skill T am Kochtag selbst Schritt für Schritt durch das Rezept.

Die Rezepte einer Woche werden als PDF-Sammlung in einen Wochenunterordner kopiert, damit T sie offline und gebündelt zur Hand hat. Die Einkaufsliste für Bring! landet als Zeilen im Blatt `Einkauf` der Tabelle „Kochplan"; T's Apps Script überträgt sie von dort automatisch weiter.

Neben dem Wochenplan gibt es einen **3-Tage-Modus** (rollierend, je zwei Optionen pro Tag, mit Kochlog und Vorratsabgleich) und einen **Resteverwerter**. Beide sind in `drei-tage-modus.md` beschrieben.

Der Skill lernt mit: jedes Gericht, das T beim Ausführen nennt oder lobt, wandert ins Blatt `Wünsche` der Tabelle „Kochplan", sodass der Pool über die Wochen wächst. Dasselbe gilt für Frühstücke.

## Ablageort: Google Drive

Alle Dateien liegen in T's Google Drive. **Google Drive ist die einzige Arbeitsablage; OneDrive (`C:\Users\tt-st\OneDrive\Rezepte`) ist nur noch Archiv** – dort nichts lesen, schreiben oder abgleichen. Nennt T ein Rezept, das nur in OneDrive liegt, bitte ihn, es nach Drive hochzuladen. Zugriff über die Google-Drive- und Google-Sheets-Connectoren. Ordner und Dateien **über die ID** ansprechen, nicht über den Namen suchen.

| Was | Name in Drive | ID |
|---|---|---|
| Rezepte-Wurzel | `Rezepte/` | `1vtkCobEu4EfhAnqaOJoSIzIbhKuNFpgt` |
| Hauptgerichte | `Rezepte/Hauptgerichte/` | `1dKds_LZi_zHPsPuw91U2vpXDx1-G_Asz` |
| Aufläufe und Gratins | `Rezepte/Aufläufe und Gratins/` | `1Dw8lntvv7rJhOYtr3bPgUZ45pguqlxH_` |
| Suppen | `Rezepte/Suppen/` | `1YLkKwVYOksWEXnSpV81R0tS28jUULqzG` |
| Backen und Gebäck | `Rezepte/Backen und Gebäck/` | `19oFvuA07KCld1FU6wSGXwo--uyCETVbf` |
| Sammlungen | `Rezepte/Sammlungen/` | `1Z9xEdZNLr2ex6e9sTbg23Ta5MKJG53WP` |
| Sonstiges | `Rezepte/Sonstiges/` | `1xDP0nbb8yRj13W1QarmOtjg1o8e_oiF1` |
| Wochenpläne (Output) | `Rezepte/Wochenpläne/` | `1wUbSoDLHEiJXbKGcS3C9Tb5VFosCh8yr` |
| Tabelle „Kochplan" | `Rezepte/Kochplan` | `1EGEHyF_lTqhfWEcc2dxYU_lEojisyQSVM41iFYrhi-Q` |

**Tabelle „Kochplan"** (Google Sheet, von T am Handy editierbar) mit den Blättern `Rezepte`, `Zutaten`, `Frühstücke`, `Wünsche` (Aufbau in `tabelle-kochplan.md`) sowie:

- `Kochlog` – Spalten: Datum (YYYY-MM-DD) | Gericht | ID | Status | Bewertung | Reste | Personen | Notiz. Neue Zeilen per Anhängen; Status-Änderungen per Zellen-Update.
- `Vorrat` – Spalten: Zutat | Bereich | Status (`da` / `knapp` / `leer`). Nur `da` gilt als vorrätig.
- `Einkauf` – Spalten: Artikel | Angaben | Laden | Für | Status | Angelegt. Hier schreibt der Skill die Einkaufsliste hinein (eine Zeile pro Artikel, Status `neu`). T's Apps Script `BringBridge` (Datei `Kochplan.gs`) holt Zeilen mit Status `neu` alle 10 Minuten ab, setzt sie auf die Bring!-Liste aus Spalte „Laden" und markiert sie als `übertragen`. **Der Skill ändert keine Zeilen, die nicht `neu` sind.**

**Dateien lesen:** PDFs und Word-Dateien mit dem Drive-Connector lesen (Datei-ID aus der Ordnersuche `parentId = '<Ordner-ID>'`).
**Dateien schreiben:** Neue Dateien mit dem Drive-Connector anlegen (Text mit `disableConversionToGoogleType`, damit .txt/.md erhalten bleiben; PDFs als Base64). Bestehende Textdateien lassen sich über den Connector nicht überschreiben, deshalb liegt aller veränderliche Zustand in der Tabelle.
**Links an T:** immer den Drive-Link (`viewUrl`) der angelegten Datei bzw. des Ordners melden.

## Wissensbasis

**Auswahl-Pools und Lernspeicher liegen in der Tabelle „Kochplan"** (ID oben; Spalten, Status-Werte und Auswahl-Hinweise in `tabelle-kochplan.md`):

- Blatt `Rezepte` – Index aller Hauptgerichte aus T's Ordner plus Neuentdeckungen (Spalten u. a. Kategorie, Zeit, Vegi, Aldi, Status, Datei, Gruppe). **Primärer Auswahl-Pool Hauptmahlzeiten. Beim Vorschlag immer zuerst dieses Blatt lesen, nicht den PDF-Ordner durchsuchen.**
- Blatt `Zutaten` – Zutaten je Rezept-ID, normiert auf 2 Portionen, mit Abteilung und Basis-Kennzeichen. **Quelle für Einkaufsliste, Vorratsabgleich, Resteverwertung und Zutaten-Überschneidung.** Ein PDF wird nur geöffnet, wenn ein ausgewähltes Gericht hier noch keine Zeilen hat (dann die Zutaten danach als Zeilen anhängen) oder T im Kochmodus die Zubereitung braucht. Pflegen: neue Rezepte anhängen, Status anpassen (standard/wunsch/neu/pause/nein), Zeit-/Aldi-Werte korrigieren.
- Blatt `Frühstücke` – analog für Frühstücke, mit Typ (Make-ahead, Schnell, Warm/Frisch, Brot-basiert), Haltbarkeit und Kurzrezept, aus dem der Skill bei Bedarf ein PDF erzeugt.
- Blatt `Wünsche` – T's Lieblingsgerichte, kurzfristige Wünsche, Bewertungen, Ablehnungen und allgemeine Präferenzen (Mittag/Abend und Frühstück), unterschieden über die Spalte „Art". Vor jedem Plan lesen, danach ergänzen.

Diese Blätter werden per Sheets-Connector gelesen und gepflegt (Zeilen anhängen, einzelne Zellen ändern), nie als Datei neben dieser SKILL.md.

**T's PDF-Rezepteordner**: `Rezepte/` in Google Drive (IDs siehe oben) – Quelle der Wahrheit für die Original-Rezepte. Struktur: `Hauptgerichte/`, `Backen und Gebäck/`, `Suppen/`, `Aufläufe und Gratins/`, `Sammlungen/`, `Sonstiges/`. Wird nur punktuell geöffnet (für die ausgewählten Gerichte, oder wenn T ein Wunschgericht nennt, das nicht im Blatt `Rezepte` steht).

**Begleitdateien neben dieser SKILL.md** (nur lesen; Änderungen nimmt T über ein Plugin-Update vor):

- `tabelle-kochplan.md` – Aufbau aller Blätter der Tabelle „Kochplan", Status-Werte, Auswahl-Hinweise.
- `aldi_sortiment.md` – Heuristik, was bei Aldi (Süd) regelmäßig erhältlich ist. Vor dem finalen Vorschlag gegen die Zutatenlisten prüfen.
- `einkaufsliste-template.txt` – Vorlage für das Output-Format der Einkaufsliste, inkl. Frühstücks-Sektion.
- `drei-tage-modus.md` – Ablauf für 3-Tage-Modus und Resteverwerter. Nur lesen, wenn einer dieser Modi gewählt ist.
- `onlineshops.md` – Bezugsquellen für Nicht-Aldi-Zutaten (lokal und online).

**Zustand in der Tabelle „Kochplan"** (siehe Ablageort): Blätter `Kochlog`, `Vorrat`, `Einkauf`.

## Pfade und Ablagestruktur

T's Workspace-Struktur in Google Drive unter `Rezepte/`:

```
Rezepte/
├── Hauptgerichte/                 ← Original-PDFs der Hauptmahlzeiten
├── Backen und Gebäck/             ← Original-PDFs Backwaren
├── Suppen/, Aufläufe.../          ← weitere Kategorien
└── Wochenpläne/                   ← Output-Ordner des Skills
    ├── einkaufsliste_bring_KW18_2026.txt   ← Altbestand (vor Umstellung auf Blatt „Einkauf")
    ├── ...
    └── KW18_2026/                          ← NEU: Wochenunterordner
        ├── einkaufsliste_KW18_2026.txt     ← strukturierte .txt-Liste
        ├── wochenplan_KW18_2026.md         ← Wochenübersicht mit Begründungen
        ├── 01_Mo_Gnocchi_Mozzarella.pdf    ← Rezept-PDFs, Tag-Präfix sortiert
        ├── 02_Di_…, 03_Mi_…, …
        └── Frühstück_Overnight_Oats.pdf    ← Frühstücks-Rezepte (falls geplant)
```

**Konventionen:**
- Wochenordner-Name: `KW[Nr]_[Jahr]/`, Format `KW18_2026`, immer mit führender Null bei einstelligen KWs (KW01, KW02, …).
- Rezept-PDF-Dateinamen: `[NN]_[Tag]_[GerichtKurz].pdf` für Hauptmahlzeiten, mit `NN` = 01–07 Mo–So.
- Frühstücks-Dateinamen: `Frühstück_[Variante].pdf` (kein Tagespräfix, da meist mehrere Tage abgedeckt).
- Sonderzeichen in Dateinamen vermeiden: Umlaute behalten ist ok (Windows kann das), aber Schrägstriche, Doppelpunkte, Anführungszeichen entfernen oder ersetzen.

## Modus wählen

- „3 Tage", „nächste Tage", „neue Vorschläge", „Kochvorschlag" oder ein Aufruf ohne Wochenbezug → **3-Tage-Modus**: `drei-tage-modus.md` lesen und dort weitermachen.
- „Reste", „was ist übrig", Aufzählung vorhandener Zutaten → **Resteverwerter**: `drei-tage-modus.md` lesen, Abschnitt Resteverwerter.
- „Kochplan", „Wochenplan", „Wochenmenü" usw. → **Wochenplan**: Ablauf unten.
- Unklar → 3-Tage-Modus als Default, das in einem Satz offenlegen.

## Ablauf bei jedem Aufruf (Wochenplan)

### Phase 1 – Eröffnungsdialog

Beginne knapp und präzise (T mag keine Floskeln). Frage in einer Antwort:

1. Hat T eigene Wunschgerichte für diese Woche? (Wenn ja: nimm sie als Fixpunkte.)
2. Sondermodi für diese Woche? (z. B. „viel vegetarisch", „kein Fisch", „nur Pfannengerichte", „einer ist Sonntag → Brunch statt Mittag", „kein Aufwand am Mittwoch").
3. **Personenzahl Mittag/Abend für diese Woche?** (typisch 2 oder 4) – Pflichtfrage, der Skill rät hier nichts. Wenn T sich nicht entscheiden kann, erkläre kurz: Einkaufsliste und Mengenangaben werden auf genau diese Zahl skaliert; eine Hochrechnung auf die jeweils andere Größe kann der Skill am Ende auf Zuruf ergänzen.
4. **Frühstück mitplanen für diese Woche?** (ja/nein, Default: nein.) Bei „ja": kurze Folgefrage nach Frühstücks-Personenzahl (Default: identisch zu Mittag/Abend; falls abweichend, separat skalieren) und ob T Frühstücks-Wünsche hat oder einen Modus möchte (z. B. „nur süß", „nur herzhaft", „warm am Wochenende, Make-ahead unter der Woche" = Default-Routine).
5. Tag-Zuordnung gewünscht oder nur 7 Vorschläge ohne feste Tage?

Wenn T zu einer dieser Fragen nichts sagt, gilt der Default. Nicht jede Frage einzeln durchgehen, sondern in einem Block stellen, damit T in einer Nachricht antworten kann.

### Phase 2 – Indizes und Wunschrezepte einlesen

**Hauptmahlzeiten:** Lies Blatt `Rezepte` als kompletten Auswahl-Pool. Filtere die Tabellen-Zeilen mit Status `standard`, `wunsch` oder (selten) `neu` und Zeit ≤ 30 Min. Merke dir pro Eintrag: ID, Gericht, Kategorie, Vegi-Flag, Aldi-Status, PDF-Pfad. Den PDF-Inhalt **nicht** öffnen.

**Frühstücke (nur wenn in Phase 1 aktiviert):** Lies Blatt `Frühstücke`. Filtere analog auf Status `standard`, `wunsch`, `neu`. Merke dir pro Eintrag: ID, Frühstück, Typ (Make-ahead / Schnell / Warm-Frisch / Brot-basiert), Aldi-Status, PDF-Pfad (oft leer), Kurzrezept.

**Wünsche:** Lies Blatt `Wünsche` und merke dir nach Spalte „Art":
- `Lieblingsgericht` / `Frühstücks-Liebling` → in Phase 3 priorisieren
- `Wunsch` / `Frühstücks-Wunsch` → kurzfristige Wünsche, fest einplanen
- `Neu probiert` mit Bewertung `+`/`++` → gerne wieder
- `Nicht nochmal` → aus dem Auswahl-Pool entfernen
- `Präferenz` / `Frühstücks-Notiz` → allgemeine Regeln für die Auswahl

### Phase 3 – Vorschlag zusammenstellen

#### 3a. Hauptmahlzeiten (immer)

Stelle 7 Gerichte zusammen, die alle folgende Bedingungen erfüllen:

**Hartes Kriterium – Zeit:** Nur Gerichte mit Zeit ≤ 30 Min aus dem Index. Zeilen mit Gruppe `Sonderfall` nur dann, wenn T explizit eine Schnellkoch-Variante benennt – sonst ignorieren.

**Mischungsregel – Quellen:**
- 4–5 Gerichte aus dem Index (Blatt `Rezepte`, Status `standard`)
- 1–2 echte Neuentdeckungen pro Woche („Überraschungs-Slot") – diese im HF-Stil-Eigen erfinden, kein PDF erwartet, wird in Phase 7 generiert
- 0–1 ausdrücklicher Wunsch aus Blatt `Wünsche`, falls T einen genannt hat

**Abwechslungsregel – Anti-Monotonie:** Keine zwei direkt aufeinander folgenden Tage in derselben Kategorie. Kategorien siehe Index-Spalte „Kategorie". Über die Woche hinweg sollten mind. 4 verschiedene Kategorien vorkommen, mind. 2 Gerichte vegetarisch sein (Vegi-Flag im Index nutzen).

**Wunschgerichte zuerst:** Wenn T konkrete Wunschgerichte genannt hat, diese fest einplanen und drum herum auffüllen. Wenn das Wunschgericht im Index existiert: dortigen Eintrag nutzen. Wenn nicht: ein passendes Rezept (≤ 30 Min, Aldi-tauglich) vorschlagen, mit Quellverweis (URL oder Eigenkonstruktion gekennzeichnet) liefern und in Phase 7 prüfen, ob es als neue Zeile im Blatt `Rezepte` (`NE…`) ergänzt werden soll.

**Keine Volltextsuche im Ordner.** Wenn ein Gericht außerhalb des Index gewünscht wird, einmal gezielt nach dem Dateinamen suchen (Drive-Suche `title contains '…'` mit `parentId` des Kategorienordners) – nicht alle PDFs lesen.

#### 3b. Frühstücke (nur wenn aktiviert)

**Default-Routine (entspricht T's Wunsch in Blatt `Wünsche`):**
- **Mo–Mi:** eine Make-ahead-Variante (FR01–FR09)
- **Do–Fr:** eine zweite, anders typisierte Make-ahead-Variante
- **Sa–So:** eine Warm/Frisch-Variante (FR16–FR19)

→ 3 verschiedene Frühstücke pro Woche.

**Anti-Monotonie:** Die zwei Make-ahead-Varianten sollen sich strukturell unterscheiden, also nicht zweimal Overnight Oats. Beispiel ok: Overnight Oats (FR01) + Bircher (FR03). Beispiel zu monoton: Overnight Oats Banane (FR01) + Overnight Oats Beere (FR02).

**Variation:** Pro Aufruf möglichst eine andere Kombination als in der Vorwoche (sofern aus Blatt `Wünsche` ablesbar – sonst nach Best-Effort variieren). T soll das Gefühl haben, dass die Frühstücke wirklich abwechseln.

**Wunsch / Sondermodus aus Phase 1:**
- „nur süß" → nur süße Make-ahead-Varianten und süße Warm/Frisch (FR18 Pancakes, FR19 Bananen-Toast).
- „nur herzhaft" → Eier-Muffins, Vollkornbrot-Belag-Sammlung, Rührei.
- „warm jeden Tag" → Porridge Mo–Fr (mit unterschiedlichen Toppings als Variation), Rührei oder Pancakes Sa/So.
- Konkreter Wunsch (z. B. „diese Woche unbedingt Bircher"): als Fixpunkt setzen, drumherum auffüllen.

### Phase 4 – Aldi-Check

Bevor der Plan an T geht, gehe alle Zutaten der Woche (Mittag/Abend **und** Frühstück, falls aktiviert) durch und gleiche sie gegen `aldi_sortiment.md` ab. Identifiziere Zutaten, die laut Heuristik nicht zum Aldi-Standardsortiment gehören (z. B. spezielle asiatische Gewürze, exotische Käsesorten, frische Kräuter außer Petersilie/Schnittlauch/Basilikum, bestimmte Fischarten, saisonal-eingeschränkte Früchte wie Granatapfel oder frische Mango). Frage T konkret zurück:

> Für [Gericht X] brauchst du [Zutat Y], das gibt's bei Aldi (Süd) nach meiner Heuristik nicht zuverlässig. Optionen: (a) ich tausche das Rezept, (b) du holst die Zutat woanders, (c) ich schlage einen Aldi-Ersatz vor: [Vorschlag]. Wie willst du vorgehen?

Den Aldi-Check nicht als reine Auflistung, sondern als entscheidbare Rückfrage formulieren. Wenn nur eine Zutat betroffen ist, direkt einen Ersatzvorschlag mitliefern.

### Phase 5 – Plan-Ausgabe im Chat

Liefere im Chat zuerst eine kompakte Wochenübersicht (Markdown-Tabelle, gemischt Mittag/Abend + Frühstück falls aktiviert):

```
Wochenplan KW [Nr] / [Mo Datum] – [So Datum]
Personen: [N] (Hauptmahlzeit)[, Frühstück: [N]]

Tag | Hauptmahlzeit                       | Quelle             | Kategorie
Mo  | [Gericht]                           | [Quelle]           | [Kat]
Di  | [Gericht]                           | [Quelle]           | [Kat]
...

Frühstücks-Routine (falls aktiviert):
Mo–Mi  | [Frühstück 1]   | Make-ahead (Vorbereitung Sonntag)
Do–Fr  | [Frühstück 2]   | Make-ahead
Sa–So  | [Frühstück 3]   | Warm/Frisch
```

Quelle = Dateiname im Rezepteordner ODER „HF-Stil/eigen" ODER URL.

Direkt darunter: kurze Begründung, warum die Mischung so aussieht (1–2 Sätze, kein Roman). Wenn ein Wunschgericht enthalten ist, das markieren. Bei Frühstück: Hinweis auf Vorbereitungstag (typisch Sonntagabend) und ungefähre Vorbereitungsdauer.

### Phase 6 – Strukturierte Einkaufsliste

Zutaten aus dem Blatt `Zutaten` holen (Mengen von 2 Portionen auf die Personenzahl umrechnen). Fehlen für ein Gericht die Zeilen, das PDF lesen und die Zutaten im selben Format an das Blatt anhängen; ist das PDF nicht lesbar (Scan), T einmal kurz nach den Hauptzutaten fragen und diese eintragen.

Schreibe die strukturierte Einkaufsliste als `.txt`-Datei in den **Wochenunterordner**:

`Rezepte/Wochenpläne/KW[Nr]_[Jahr]/einkaufsliste_KW[Nr]_[Jahr].txt` (Wochenordner per Drive-Connector als Ordner unter der Wochenpläne-ID anlegen)

Wenn der Wochenunterordner noch nicht existiert, beim ersten Schreibvorgang anlegen. Wenn der übergeordnete `Wochenpläne/`-Ordner noch nicht existiert (sehr unwahrscheinlich, aber möglich), beim ersten Schreibvorgang ebenfalls anlegen.

Format siehe `einkaufsliste-template.txt`. Wesentliche Eigenschaften:
- Sortiert nach Aldi-Abteilungen (Obst/Gemüse, Kühlregal, Trockenwaren/Konserven, Tiefkühl, Backwaren, Fleisch/Fisch, **Frühstück** falls aktiviert, Sonstiges)
- Eine Mengenspalte für die in Phase 1 gewählte Personenzahl (Spaltenkopf benennen, z. B. „4 P"). Wenn Frühstücks-Personenzahl abweicht: Frühstücks-Sektion mit eigener Personenzahl-Markierung, z. B. „Frühstück 1 P".
- Mengen sinnvoll konsolidieren (wenn drei Rezepte je eine Zwiebel brauchen, steht „3 Zwiebeln")
- Eigene Sektion am Ende für „Nicht-Aldi" mit Hinweis, wo T es bekommt
- Sektion „Vermutlich vorrätig (bitte prüfen)" für Standardzutaten, getrennt von der Kaufliste. Quelle dafür ist das Blatt `Vorrat`: Positionen mit Status `da` stehen hier, Positionen mit `knapp`/`leer` wandern in die Kaufliste.
- Hochrechnung auf alternative Personenzahl nur, wenn T danach fragt – als zusätzliche Spalte oder zweites Dokument.

Nach dem Schreiben den Drive-Link an T melden.

### Phase 6b – Bring!-Liste ins Blatt `Einkauf`

Hänge die Bring!-taugliche Liste als Zeilen an das Blatt `Einkauf` der Tabelle „Kochplan" an (Sheets-Connector, Anhängen ab `Einkauf!A1`). Eine Zeile pro Artikel:

| Artikel | Angaben | Laden | Für | Status | Angelegt |
|---|---|---|---|---|---|
| Paprika | rot 1 Stk | Aldi | KW43 | neu | 2026-10-22 |

- **Artikel** = Grundzutat (der Teil vor der Klammer im Schema unten), **Angaben** = Klammerinhalt ohne Klammern. Bring! zeigt die Angaben als Notiz am Artikel.
- **Laden** = Name der Bring!-Liste: `Aldi` (Standard), `DM` (Drogerie) oder `Woanders` (alles aus der Nicht-Aldi-Sektion; die Bezugsquelle aus `onlineshops.md` gehört dann in die Angaben, z. B. `2 Pck – Asialaden`).
- **Für** = `KW[Nr]` beim Wochenplan, `3T` beim 3-Tage-Modus, `Reste` beim Resteverwerter.
- **Status** immer `neu`, **Angelegt** = heutiges Datum.
- Zusätzlich eine .txt-Datei ist nicht nötig; nur auf Wunsch von T.

**Format-Regeln für Artikel und Angaben** (das Schema `<Grundzutat> (<Angaben>)` entspricht einer Zeile):

- Eine Zeile pro Item.
- Schema pro Zeile: `<Grundzutat> (<Merkmale> <Menge> <Einheit>)`. Vor der Klammer steht **ausschließlich** die Grundzutat als reines Substantiv. Alle beschreibenden Merkmale (Farbe, Form, TK/frisch, Sorte, Schnitt, Fettgehalt, Reifegrad usw.) wandern gemeinsam mit Menge und Einheit in die Klammer. Bring! interpretiert den Klammertext als Notiz am Item; identische Grundzutaten in verschiedenen Varianten matchen damit auf demselben Bring!-Eintrag.
- Beispiele für korrekte vs. falsche Schreibweise:
  - `Paprika (rot 1 Stk)` – **nicht** `Paprika rot (1 Stk)`
  - `Lachsfilet (TK 2 Stk)` – **nicht** `Lachsfilet TK (2 Stk)`
  - `Hackfleisch (gemischt 500 g)` – Sorte als Merkmal in der Klammer
  - `Mozzarella (Kugel 2 Stk)` – Form als Merkmal in der Klammer
  - `Sahne (30 % 200 ml)` – Fettgehalt als Merkmal in der Klammer
  - `Zwiebeln (4 Stk)` – keine Merkmale, nur Menge
- Mengeneinheiten kompakt abkürzen: `Stk` (nicht „Stück"), `g`, `kg`, `ml`, `l`, `EL`, `TL`, `Pck` (Packung), `Bd` (Bund), `Dose`, `Glas`. Innerhalb der Klammer steht zuerst das/die Merkmal(e), dann ein Leerzeichen, dann Menge + Einheit.
- Keine Sektions-Trenner, keine Kommentar- oder Leerzeilen im Blatt. Nur Artikelzeilen.
- Reihenfolge: identisch zur strukturierten Liste (Obst/Gemüse → Kühlregal → Trocken → TK → Backwaren → Fleisch/Fisch → **Frühstück falls aktiviert** → Sonstiges → Nicht-Aldi). Vorrats-Sektion („vermutlich vorrätig") **nicht** mit übernehmen – die soll T nicht in Bring! haben.
- Frühstücks-Items werden in die thematisch passenden Sektionen einsortiert (Haferflocken → Trocken, Skyr → Kühlregal, TK-Beeren → Tiefkühl), nicht als eigene Sektion. Auf Item-Ebene kein Unterschied zwischen Mittag/Abend und Frühstück.
- Ein Item = ein Eintrag, ohne 2P/4P-Spalten. Es wird die in Phase 1 gewählte Personenzahl genommen.
- Grundzutat (vor der Klammer) so kompakt wie möglich, damit sie in Bring!s Item-Anzeige nicht abgeschnitten wird (Faustregel: max. ~25 Zeichen für den Teil vor der Klammer).

Danach in einem Satz melden, wie viele Artikel im Blatt `Einkauf` stehen; das Apps Script überträgt sie automatisch (läuft zeitgesteuert, kein Zutun von T).

### Phase 7 – Rezept-PDFs in Wochenordner ablegen

Lege alle Rezepte der Woche als PDF in den Wochenunterordner. Drei Quellen-Typen, drei Vorgehensweisen:

#### 7a. Rezepte mit Original-PDF im Rezepteordner

Für jedes Hauptmahlzeit-Gericht und Frühstück, dessen Index-Eintrag eine PDF-Datei referenziert (Spalte „Datei" gefüllt):

→ **Kopie** der Original-PDF in den Wochenordner. Das Original im Quellordner bleibt unverändert.

Dateiname im Wochenordner:
- Hauptmahlzeit: `[NN]_[Tag]_[GerichtKurz].pdf`, z. B. `01_Mo_Gnocchi_Mozzarella.pdf`
- Frühstück: `Frühstück_[Variante].pdf`, z. B. `Frühstück_Bircher_klassisch.pdf`

`GerichtKurz` = Gericht-Name, gekürzt auf max. 30 Zeichen, Sonderzeichen entfernt, Leerzeichen durch Unterstrich ersetzt, Umlaute beibehalten.

#### 7b. HF-Stil-Eigen / Neuentdeckungen / Frühstücke ohne Original-PDF

Für Gerichte oder Frühstücke, die der Skill als Neuentdeckung erfunden hat (Zeilen mit Gruppe `Neuentdeckung` im Blatt `Rezepte`), oder für Frühstücke ohne PDF-Eintrag in Blatt `Frühstücke`:

→ **Generiere ein neues PDF** aus der Rezeptbeschreibung (Zutaten + Zubereitung). Quelle: bei Hauptmahlzeiten der vom Skill in Phase 3a generierte HF-Stil-Vorschlag, bei Frühstücken die Spalte „Kurzrezept" im Blatt `Frühstücke`.

PDF-Inhalt (Standardlayout, sauber formatiert):
```
[Gerichtsname]                    KW [Nr] / [Jahr]
Quelle: HF-Stil / kochplan-woche
Zubereitungszeit: [X] Min   Personen: [N]   Aldi: grün/gelb/rot

Zutaten ([N] Personen)
- [Zutat] [Menge]
- ...

Zubereitung
1. [Schritt]
2. [Schritt]
...

Notiz: [optional, z. B. Aldi-Hinweis, Vorbereitungs-Tipp]
```

Generierungs-Workflow: Markdown-Quelle erstellen, mit verfügbarem PDF-Tool (siehe Skill `pdf` im System) konvertieren, in den Wochenordner schreiben.

Dateiname: identisch zur Konvention in 7a.

#### 7c. Wunschgerichte aus dem Internet

Wenn T in Phase 1 ein Wunschgericht genannt hat, das weder in Blatt `Rezepte` noch im Rezepteordner ist (und der Skill in Phase 3a per URL einen Vorschlag dafür gemacht hat):

→ **Erste Wahl:** Rezept aus dem Internet als PDF herunterladen oder die Rezept-URL in ein PDF konvertieren (per `web_fetch` Inhalt holen, in Markdown bringen, daraus PDF generieren).
→ **Fallback:** Rezept-Inhalt vom Skill paraphrasiert ins Standardlayout aus 7b bringen und als PDF generieren. **Wichtig:** Nicht 1:1 abschreiben (Urheberrecht), sondern Zutaten + Zubereitung in eigenen Worten zusammenfassen, mit klarer Quellenangabe (URL und Originaltitel) im PDF-Header.

Dateiname: identisch zur Konvention in 7a.

#### 7d. Wochenplan-Übersicht als Markdown-Datei

Schreibe zusätzlich eine Datei `wochenplan_KW[Nr]_[Jahr].md` direkt in den Wochenordner. Inhalt:
- Wochenübersichts-Tabelle (identisch zur Chat-Ausgabe aus Phase 5)
- Begründung der Mischung (wie Phase 5)
- Frühstücks-Routine inkl. Vorbereitungs-Hinweis (falls geplant)
- Liste der enthaltenen Rezept-PDFs mit Dateinamen
- Aldi-Sondermeldungen aus Phase 4 (was T woanders besorgen muss / welche Ersätze gewählt wurden)

So hat T eine textuelle Übersicht, falls er die Chat-Ausgabe nicht zur Hand hat.

#### Bestätigung an T

Nach Phase 7 melde an T:
- Drive-Link zum Wochenordner
- Anzahl kopierter Original-PDFs / Anzahl neu generierter PDFs
- Hinweis, falls eine PDF-Generierung fehlgeschlagen ist (z. B. URL nicht erreichbar) – in dem Fall mit Vorschlag, was T tun kann.

### Phase 8 – Pflege der Wissensbasis (nach Plan, vor Verabschiedung)

Die Gerichte des Wochenplans mit Datum und Status `geplant` an das Blatt `Kochlog` anhängen, damit der 3-Tage-Modus und die Nachfrage „gekocht?" darauf aufbauen.

Falls in dieser Woche neue Gerichte / Frühstücke aufgenommen wurden:

- Hauptmahlzeit-Neuentdeckung → Zeile im Blatt `Rezepte` anhängen: ID `NE..` (fortlaufend), Gruppe `Neuentdeckung`, Status `neu`, Erstmals = heute.
- Frühstücks-Neuentdeckung → Zeile im Blatt `Frühstücke` anhängen: ID `FR..` (fortlaufend), Status `neu`, Kurzrezept ausfüllen.
- Konkreter Wunsch von T (Mittag/Abend oder Frühstück), der eingeplant wurde → im Blatt `Wünsche` die Art der Zeile von `Wunsch` bzw. `Frühstücks-Wunsch` auf `Eingeplant` setzen und das Datum eintragen.

Wenn T später zurückmeldet „die Bircher waren super, gerne öfter": Status im Blatt `Frühstücke` auf `standard` lassen, aber im Blatt `Wünsche` eine Zeile mit Art `Frühstücks-Liebling` anhängen. Wenn T sagt „die Eier-Muffins sind nichts für uns": Status im Blatt `Frühstücke` auf `nein` setzen.

### Optional – Kochmodus / Frühstücks-Prep-Modus

Wenn T später am Kochtag mit „los geht's mit X" / „koch heute" / „Sonntag-Prep starten" zurückkommt:

- Bei Hauptmahlzeit: das jeweilige PDF aus dem Wochenordner öffnen (nicht erneut aus dem Quellordner) und Schritt für Schritt durchgehen.
- Bei Frühstücks-Prep: das/die Frühstücks-PDF(s) der Woche öffnen und in der richtigen Reihenfolge durchgehen (z. B. zuerst Eier-Muffins in den Ofen, parallel Overnight Oats abfüllen).
- Dialogisch, knapp, ein Schritt nach dem anderen, T fragt nach wenn er weiter will.

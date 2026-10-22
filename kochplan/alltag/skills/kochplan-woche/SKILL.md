---
name: kochplan-woche
description: Kochplanung für T aus seinem Rezepteordner (OneDrive/Rezepte) im HF-Stil, Rezepte ≤ 30 Min, Aldi-Abgleich, Einkaufsliste im Bring!-Format. Drei Modi: (1) Wochenplan Mo–So mit Personenzahl-Abfrage, optional Frühstück, Rezept-PDFs im Wochenordner, Kochmodus; (2) 3-Tage-Modus: rollierend je zwei Vorschläge pro Tag nach Geschmack und Kochlog, nach Wahl sofort Bring!-Liste; (3) Resteverwerter aus Resten und Vorrat. IMMER nutzen bei „Kochplan", „Wochenplan", „Wochenmenü", „Speiseplan", „Essensplan", „Einkaufsliste Woche", „Frühstück planen", „nächste 3 Tage", „was koche ich die nächsten Tage", „Kochvorschlag", „neue Vorschläge", „Reste", „Resteverwertung", „was ist übrig", „was koche ich aus", bei „koch heute" / „los geht's mit X" im laufenden Plan und beim Fortsetzen. Nicht bei einzelnen Rezeptfragen ohne Planungs- oder Restebezug.
---

# Kochplan-Woche

## Was dieser Skill leistet

T möchte einmal pro Woche einen Kochplan, ohne dafür lange überlegen zu müssen. Dieser Skill nimmt ihm diese Last ab: er stellt sieben Gerichte zusammen, die alle in unter 30 Minuten kochbar sind, sorgt für Abwechslung über die Woche, kalkuliert die Zutaten parallel für zwei und vier Personen und liefert eine fertige Einkaufsliste, die zu Aldi passt. Optional plant der Skill zusätzlich das Frühstück der Woche mit – als Make-ahead-Routine (Sonntag vorbereiten) oder mit schnellen Optionen für unter der Woche und einer warmen Variante fürs Wochenende. Auf Wunsch führt der Skill T am Kochtag selbst Schritt für Schritt durch das Rezept.

Die Rezepte einer Woche werden als PDF-Sammlung in einen Wochenunterordner kopiert, damit T sie offline und gebündelt zur Hand hat. Die Bring!-Einkaufsliste bleibt bewusst auf der oberen Ordnerebene, weil dort ein eigenes Python-Skript von T sie aufgreift.

Neben dem Wochenplan gibt es einen **3-Tage-Modus** (rollierend, je zwei Optionen pro Tag, mit Kochlog und Vorratsabgleich) und einen **Resteverwerter**. Beide sind in `drei-tage-modus.md` beschrieben.

Der Skill lernt mit: jedes Gericht, das T beim Ausführen nennt oder lobt, wandert in die Datei `wunschrezepte.md`, sodass der Pool über die Wochen wächst. Dasselbe gilt für Frühstücke.

## Wissensbasis

**Primärer Auswahl-Pool Hauptmahlzeiten: `standardgerichte.md`** (Index neben dieser SKILL.md). Diese Datei enthält alle vorgeprüften Rezepte aus T's Ordner mit Spalten für Kategorie, Zeit, Vegi-Flag, Aldi-Tauglichkeit, Status und PDF-Pfad. **Beim Vorschlag immer zuerst diesen Index lesen, nicht den ganzen PDF-Ordner durchsuchen.** PDFs werden erst geöffnet, wenn ein Gericht für die Woche ausgewählt ist und der Skill in Phase 6 die genauen Zutaten und Mengen für die Einkaufsliste extrahieren muss bzw. in Phase 7 das PDF in den Wochenordner kopiert.

**Primärer Auswahl-Pool Frühstücke: `fruehstuecke.md`** (Index neben dieser SKILL.md). Strukturell analog zu `standardgerichte.md`, aber mit eigenen Typen (Make-ahead, Schnell, Warm/Frisch, Brot-basiert) und Haltbarkeitsangabe. Die meisten Frühstücks-Einträge haben kein Original-PDF, sondern enthalten ein Kurzrezept in der Notiz-Spalte – aus dem generiert der Skill in Phase 7 ein eigenes PDF.

**T's PDF-Rezepteordner**: `C:\Users\tt-st\OneDrive\Rezepte` – Quelle der Wahrheit für die Original-Rezepte. Struktur: `Hauptgerichte/`, `Backen und Gebäck/`, `Suppen/`, `Aufläufe und Gratins/`, `Sammlungen/`, `Sonstiges/`. Wird nur punktuell geöffnet (für die ausgewählten Gerichte der Woche, oder wenn T ein Wunschgericht nennt, das im Index nicht steht).

**Begleitdateien neben dieser SKILL.md** (lesen und pflegen):

- `standardgerichte.md` – Rezept-Index Hauptmahlzeiten, Quelle der Wahrheit für den Auswahl-Pool. Pflegen: neue Rezepte ergänzen, Status anpassen (standard/wunsch/neu/pause/nein), Zeit-/Aldi-Werte korrigieren.
- `fruehstuecke.md` – Rezept-Index Frühstücke. Logik analog. Pflegen: neue Frühstücke ergänzen, Status anpassen, Bewertungen aus „neu" → „standard" überführen, wenn T sie gut fand.
- `wunschrezepte.md` – T's wachsende Liste von Lieblingsgerichten, kurzfristigen Wünschen und Bewertungen (sowohl Mittag/Abend als auch Frühstück). Vor jedem Plan einlesen, nach jedem Plan ergänzen.
- `aldi_sortiment.md` – Heuristik, was bei Aldi (Süd) regelmäßig erhältlich ist. Vor dem finalen Vorschlag gegen die Zutatenlisten prüfen.
- `einkaufsliste-template.txt` – Vorlage für das Output-Format der Einkaufsliste, inkl. Frühstücks-Sektion.
- `drei-tage-modus.md` – Ablauf für 3-Tage-Modus und Resteverwerter. Nur lesen, wenn einer dieser Modi gewählt ist.
- `onlineshops.md` – Bezugsquellen für Nicht-Aldi-Zutaten (lokal und online).

**Zustandsdateien in OneDrive** (lesen und pflegen, von T editierbar):

- `C:\Users\tt-st\OneDrive\Rezepte\Kochlog.md` – was geplant, gekocht, bewertet wurde; offene Reste.
- `C:\Users\tt-st\OneDrive\Rezepte\Vorrat.md` – Standardzutaten, die immer da sind und nicht auf die Einkaufsliste gehören.

## Pfade und Ablagestruktur

T's Workspace-Struktur unter `C:\Users\tt-st\OneDrive\Rezepte\`:

```
Rezepte/
├── Hauptgerichte/                 ← Original-PDFs der Hauptmahlzeiten
├── Backen und Gebäck/             ← Original-PDFs Backwaren
├── Suppen/, Aufläufe.../          ← weitere Kategorien
└── Wochenpläne/                   ← Output-Ordner des Skills
    ├── einkaufsliste_bring_KW18_2026.txt   ← BLEIBT FLACH (Python-Skript greift hier zu)
    ├── einkaufsliste_bring_KW19_2026.txt
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

**Hauptmahlzeiten:** Lies `standardgerichte.md` als kompletten Auswahl-Pool. Filtere die Tabellen-Zeilen mit Status `standard`, `wunsch` oder (selten) `neu` und Zeit ≤ 30 Min. Merke dir pro Eintrag: ID, Gericht, Kategorie, Vegi-Flag, Aldi-Status, PDF-Pfad. Den PDF-Inhalt **nicht** öffnen.

**Frühstücke (nur wenn in Phase 1 aktiviert):** Lies `fruehstuecke.md`. Filtere analog auf Status `standard`, `wunsch`, `neu`. Merke dir pro Eintrag: ID, Frühstück, Typ (Make-ahead / Schnell / Warm-Frisch / Brot-basiert), Aldi-Status, PDF-Pfad (oft leer), Kurzrezept.

**Wunschrezepte:** Lies `wunschrezepte.md` und merke dir:
- T's Lieblingskategorien
- konkrete kurzfristige Wünsche (Sektion „Wunschgerichte (T möchte diese Woche / demnächst)" und „Frühstücks-Wünsche")
- explizit als „neu probiert, gut" markierte Gerichte/Frühstücke
- explizit als „nicht nochmal" markierte Gerichte

Treffer aus beiden Listen abgleichen: Gerichte aus dem Index, deren Name in „Nicht nochmal" steht, aus dem Auswahl-Pool entfernen. Gerichte aus „Lieblingsgerichte" oder „Wunschgerichte", die im Index existieren, werden in Phase 3 priorisiert.

### Phase 3 – Vorschlag zusammenstellen

#### 3a. Hauptmahlzeiten (immer)

Stelle 7 Gerichte zusammen, die alle folgende Bedingungen erfüllen:

**Hartes Kriterium – Zeit:** Nur Gerichte mit Zeit ≤ 30 Min aus dem Index. Sonderfälle aus der Tabelle „Sonderfälle" nur dann, wenn T explizit eine Schnellkoch-Variante benennt – sonst ignorieren.

**Mischungsregel – Quellen:**
- 4–5 Gerichte aus dem Index (`standardgerichte.md`, Status `standard`)
- 1–2 echte Neuentdeckungen pro Woche („Überraschungs-Slot") – diese im HF-Stil-Eigen erfinden, kein PDF erwartet, wird in Phase 7 generiert
- 0–1 ausdrücklicher Wunsch aus `wunschrezepte.md`, falls T einen genannt hat

**Abwechslungsregel – Anti-Monotonie:** Keine zwei direkt aufeinander folgenden Tage in derselben Kategorie. Kategorien siehe Index-Spalte „Kategorie". Über die Woche hinweg sollten mind. 4 verschiedene Kategorien vorkommen, mind. 2 Gerichte vegetarisch sein (Vegi-Flag im Index nutzen).

**Wunschgerichte zuerst:** Wenn T konkrete Wunschgerichte genannt hat, diese fest einplanen und drum herum auffüllen. Wenn das Wunschgericht im Index existiert: dortigen Eintrag nutzen. Wenn nicht: ein passendes Rezept (≤ 30 Min, Aldi-tauglich) vorschlagen, mit Quellverweis (URL oder Eigenkonstruktion gekennzeichnet) liefern und in Phase 7 prüfen, ob es als neuer Index-Eintrag (`NE…`) ergänzt werden soll.

**Keine Volltextsuche im Ordner.** Wenn ein Gericht außerhalb des Index gewünscht wird, einmal gezielt nach dem Dateinamen im Ordner schauen (Glob auf den Namen) – nicht alle PDFs lesen.

#### 3b. Frühstücke (nur wenn aktiviert)

**Default-Routine (entspricht T's Wunsch in `wunschrezepte.md`):**
- **Mo–Mi:** eine Make-ahead-Variante (FR01–FR09)
- **Do–Fr:** eine zweite, anders typisierte Make-ahead-Variante
- **Sa–So:** eine Warm/Frisch-Variante (FR16–FR19)

→ 3 verschiedene Frühstücke pro Woche.

**Anti-Monotonie:** Die zwei Make-ahead-Varianten sollen sich strukturell unterscheiden, also nicht zweimal Overnight Oats. Beispiel ok: Overnight Oats (FR01) + Bircher (FR03). Beispiel zu monoton: Overnight Oats Banane (FR01) + Overnight Oats Beere (FR02).

**Variation:** Pro Aufruf möglichst eine andere Kombination als in der Vorwoche (sofern aus `wunschrezepte.md` ablesbar – sonst nach Best-Effort variieren). T soll das Gefühl haben, dass die Frühstücke wirklich abwechseln.

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

Schreibe die strukturierte Einkaufsliste als `.txt`-Datei in den **Wochenunterordner**:

`C:\Users\tt-st\OneDrive\Rezepte\Wochenpläne\KW[Nr]_[Jahr]\einkaufsliste_KW[Nr]_[Jahr].txt`

Wenn der Wochenunterordner noch nicht existiert, beim ersten Schreibvorgang anlegen. Wenn der übergeordnete `Wochenpläne/`-Ordner noch nicht existiert (sehr unwahrscheinlich, aber möglich), beim ersten Schreibvorgang ebenfalls anlegen.

Format siehe `einkaufsliste-template.txt`. Wesentliche Eigenschaften:
- Sortiert nach Aldi-Abteilungen (Obst/Gemüse, Kühlregal, Trockenwaren/Konserven, Tiefkühl, Backwaren, Fleisch/Fisch, **Frühstück** falls aktiviert, Sonstiges)
- Eine Mengenspalte für die in Phase 1 gewählte Personenzahl (Spaltenkopf benennen, z. B. „4 P"). Wenn Frühstücks-Personenzahl abweicht: Frühstücks-Sektion mit eigener Personenzahl-Markierung, z. B. „Frühstück 1 P".
- Mengen sinnvoll konsolidieren (wenn drei Rezepte je eine Zwiebel brauchen, steht „3 Zwiebeln")
- Eigene Sektion am Ende für „Nicht-Aldi" mit Hinweis, wo T es bekommt
- Sektion „Vermutlich vorrätig (bitte prüfen)" für Standardzutaten, getrennt von der Kaufliste. Quelle dafür ist `Vorrat.md` in OneDrive: Positionen ohne `(knapp)`/`(leer)` stehen hier, Positionen mit `(knapp)`/`(leer)` wandern in die Kaufliste.
- Hochrechnung auf alternative Personenzahl nur, wenn T danach fragt – als zusätzliche Spalte oder zweites Dokument.

Nach dem Schreiben den Pfad als computer://-Link an T melden.

### Phase 6b – Bring!-Import-Liste (BLEIBT FLACH in `Wochenpläne/`)

Schreibe parallel eine zweite, Bring!-taugliche Plain-Liste **direkt** in den Wochenpläne-Ordner (nicht in den Wochenunterordner!), weil T's Python-Skript dort sucht:

`C:\Users\tt-st\OneDrive\Rezepte\Wochenpläne\einkaufsliste_bring_KW[Nr]_[Jahr].txt`

**Format-Regeln (verifiziert über Bring! Developer Guide; das Share-Sheet-Verhalten ist nicht offiziell dokumentiert – T testet beim ersten Mal):**

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
- Keine Sektions-Trenner, keine Kommentare, keine Leerzeilen, keine Aufzählungszeichen. Reine Item-Liste.
- Reihenfolge: identisch zur strukturierten Liste (Obst/Gemüse → Kühlregal → Trocken → TK → Backwaren → Fleisch/Fisch → **Frühstück falls aktiviert** → Sonstiges → Nicht-Aldi). Vorrats-Sektion („vermutlich vorrätig") **nicht** mit übernehmen – die soll T nicht in Bring! haben.
- Frühstücks-Items werden in die thematisch passenden Sektionen einsortiert (Haferflocken → Trocken, Skyr → Kühlregal, TK-Beeren → Tiefkühl), nicht als eigene Sektion. Auf Item-Ebene kein Unterschied zwischen Mittag/Abend und Frühstück.
- Ein Item = ein Eintrag, ohne 2P/4P-Spalten. Es wird die in Phase 1 gewählte Personenzahl genommen.
- Grundzutat (vor der Klammer) so kompakt wie möglich, damit sie in Bring!s Item-Anzeige nicht abgeschnitten wird (Faustregel: max. ~25 Zeichen für den Teil vor der Klammer).

Nach dem Schreiben den Pfad ebenfalls als computer://-Link an T melden.

### Phase 7 – Rezept-PDFs in Wochenordner ablegen

Lege alle Rezepte der Woche als PDF in den Wochenunterordner. Drei Quellen-Typen, drei Vorgehensweisen:

#### 7a. Rezepte mit Original-PDF im Rezepteordner

Für jedes Hauptmahlzeit-Gericht und Frühstück, dessen Index-Eintrag eine PDF-Datei referenziert (Spalte „PDF" gefüllt):

→ **Kopie** der Original-PDF in den Wochenordner. Das Original im Quellordner bleibt unverändert.

Dateiname im Wochenordner:
- Hauptmahlzeit: `[NN]_[Tag]_[GerichtKurz].pdf`, z. B. `01_Mo_Gnocchi_Mozzarella.pdf`
- Frühstück: `Frühstück_[Variante].pdf`, z. B. `Frühstück_Bircher_klassisch.pdf`

`GerichtKurz` = Gericht-Name, gekürzt auf max. 30 Zeichen, Sonderzeichen entfernt, Leerzeichen durch Unterstrich ersetzt, Umlaute beibehalten.

#### 7b. HF-Stil-Eigen / Neuentdeckungen / Frühstücke ohne Original-PDF

Für Gerichte oder Frühstücke, die der Skill als Neuentdeckung erfunden hat (NE-Einträge in `standardgerichte.md`), oder für Frühstücke ohne PDF-Eintrag in `fruehstuecke.md`:

→ **Generiere ein neues PDF** aus der Rezeptbeschreibung (Zutaten + Zubereitung). Quelle: bei Hauptmahlzeiten der vom Skill in Phase 3a generierte HF-Stil-Vorschlag, bei Frühstücken die „Notiz / Kurzrezept"-Spalte aus `fruehstuecke.md`.

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

Wenn T in Phase 1 ein Wunschgericht genannt hat, das weder in `standardgerichte.md` noch im Rezepteordner ist (und der Skill in Phase 3a per URL einen Vorschlag dafür gemacht hat):

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
- Pfad zum Wochenordner als computer://-Link
- Anzahl kopierter Original-PDFs / Anzahl neu generierter PDFs
- Hinweis, falls eine PDF-Generierung fehlgeschlagen ist (z. B. URL nicht erreichbar) – in dem Fall mit Vorschlag, was T tun kann.

### Phase 8 – Pflege der Wissensbasis (nach Plan, vor Verabschiedung)

Die Gerichte des Wochenplans mit Datum und Status `geplant` oben in `Kochlog.md` eintragen, damit der 3-Tage-Modus und die Nachfrage „gekocht?" darauf aufbauen.

Falls in dieser Woche neue Gerichte / Frühstücke aufgenommen wurden:

- Hauptmahlzeit-Neuentdeckung → Eintrag in `standardgerichte.md` Sektion „HF-Stil-Eigen / Neuentdeckungen", Status `neu`.
- Frühstücks-Neuentdeckung → Eintrag in `fruehstuecke.md` Sektion „Wunsch / Neu / Pause", Status `neu`.
- Konkreter Wunsch von T (Mittag/Abend oder Frühstück), der eingeplant wurde → in `wunschrezepte.md` von der Wunsch- in die Eingeplant-Sektion verschieben oder löschen.

Wenn T später zurückmeldet „die Bircher waren super, gerne öfter": Status in `fruehstuecke.md` von `standard` auf weiterhin `standard` lassen, aber in `wunschrezepte.md` unter „Frühstücks-Lieblinge" eintragen. Wenn T sagt „die Eier-Muffins sind nichts für uns": Status in `fruehstuecke.md` auf `nein` setzen.

### Optional – Kochmodus / Frühstücks-Prep-Modus

Wenn T später am Kochtag mit „los geht's mit X" / „koch heute" / „Sonntag-Prep starten" zurückkommt:

- Bei Hauptmahlzeit: das jeweilige PDF aus dem Wochenordner öffnen (nicht erneut aus dem Quellordner) und Schritt für Schritt durchgehen.
- Bei Frühstücks-Prep: das/die Frühstücks-PDF(s) der Woche öffnen und in der richtigen Reihenfolge durchgehen (z. B. zuerst Eier-Muffins in den Ofen, parallel Overnight Oats abfüllen).
- Dialogisch, knapp, ein Schritt nach dem anderen, T fragt nach wenn er weiter will.

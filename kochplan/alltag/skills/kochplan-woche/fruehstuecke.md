# Frühstücke – Index für `kochplan-woche`

Pool für die Frühstücks-Auswahl. Logik analog zu `standardgerichte.md`: der Skill liest **diese Datei** beim Vorschlag, einzelne PDFs werden erst geöffnet, wenn ein Frühstück für die Woche ausgewählt ist und Mengen für die Einkaufsliste extrahiert werden müssen.

**Pflege-Hinweis:** Quelle der Wahrheit für den Frühstücks-Auswahl-Pool. Neue Frühstücke hier mit einer Zeile ergänzen, alte Status anpassen, Aldi-Werte korrigieren, wenn sie nicht stimmen.

**Behauptungen kenntlich gemacht:** Die Werte „Zeit aktiv (min)", „Aldi" und „Haltbarkeit" sind Schätzungen aus allgemeiner Rezeptkenntnis und Aldi-Süd-Heuristik – nicht persönlich verifiziert. T sollte sie nach dem ersten echten Test pro Frühstück justieren.

## Spaltenbedeutung

- **ID:** kurze Referenz (FR = Frühstück), vom Skill in der Wochenübersicht nutzbar.
- **Frühstück:** Anzeige-Name.
- **Typ:** `Make-ahead` (Sonntag vorbereiten, hält mehrere Tage), `Schnell` (≤ 5 Min am Morgen, ohne Vorbereitung), `Warm/Frisch` (10–15 Min am Morgen, eher Wochenende), `Brot-basiert` (Standard-Belag-Variante).
- **Zeit aktiv (min):** geschätzte Hands-on-Zeit. Bei Make-ahead = Vorbereitungszeit (nicht inkl. Ziehzeit).
- **Haltbarkeit:** wie lange im Kühlschrank haltbar (für Make-ahead-Planung).
- **Vegi:** ja/nein – falls T mal eine vegane Frühstückswoche will, hilfreich.
- **Aldi:** grün/gelb/rot – Aldi-Süd-Tauglichkeit nach `aldi_sortiment.md`. Gelb/rot = Skill rückfragt.
- **Status:** `standard` / `wunsch` / `neu` / `pause` / `nein`. Logik wie in `standardgerichte.md`.
- **PDF:** Dateiname relativ zu `Rezepte_Spiegel/` in Google Drive (Ordner-IDs in `SKILL.md`, Abschnitt Ablageort) (falls vorhanden), sonst leer → Skill generiert beim Wochenplan ein PDF aus der Rezeptzusammenfassung in dieser Tabelle.
- **Notiz / Kurzrezept:** knappes Rezept (Zutaten + Zubereitung), reicht als Quelle für PDF-Generierung.

## Pool – Make-ahead (vorbereiten, hält mehrere Tage)

| ID | Frühstück | Typ | Zeit aktiv (min) | Haltbarkeit | Vegi | Aldi | Status | PDF | Notiz / Kurzrezept |
|---|---|---|---|---|---|---|---|---|---|
| FR01 | Overnight Oats Banane-Nuss | Make-ahead | 5 | 3 Tage | ja | grün | standard |  | 60 g Haferflocken + 150 ml Milch/Pflanzendrink + 1 EL Joghurt + ½ Banane + 1 EL gehackte Walnüsse, im Glas mischen, über Nacht im Kühlschrank quellen lassen. |
| FR02 | Overnight Oats Beere-Mandel | Make-ahead | 5 | 3 Tage | ja | grün | standard |  | 60 g Haferflocken + 150 ml Milch + 1 EL Joghurt + 50 g TK-Beeren (auftauen lassen) + 1 EL Mandeln, über Nacht im Kühlschrank. |
| FR03 | Bircher Müsli klassisch | Make-ahead | 10 | 2 Tage | ja | grün | standard |  | 60 g Haferflocken + 100 ml Milch + 100 g Joghurt + 1 geriebener Apfel + Zitronensaft + 1 TL Honig + 1 EL Nüsse. Über Nacht ziehen. |
| FR04 | Chia-Pudding Vanille-Mango | Make-ahead | 5 | 3 Tage | ja | gelb | standard |  | 35 g Chiasamen + 150 ml Milch oder Kokos-Drink + 1 Msp. Vanille + 1 TL Ahornsirup, 2 h ziehen. Topping: Mangopüree (TK-Mango püriert). Mango-TK saisonal. |
| FR05 | Chia-Pudding Schoko | Make-ahead | 5 | 3 Tage | ja | grün | standard |  | 35 g Chiasamen + 150 ml Milch + 1 EL Kakaopulver + 1 TL Honig, 2 h ziehen. Topping: Bananenscheiben + Kakaonibs. |
| FR06 | Joghurt-Granola-Bowl | Make-ahead | 2 (morgens) | – | ja | grün | standard |  | 200 g Naturjoghurt oder Skyr + 50 g Granola + 100 g Beeren (frisch oder TK), schichten. Granola am Sonntag selbst rösten oder gekauft. |
| FR07 | Pfannengranola Vorrat | Make-ahead | 10 | 1–2 Wochen trocken | ja | grün | standard |  | 200 g Haferflocken + 50 g Mandeln/Walnüsse + 2 EL Honig oder Ahornsirup + 1 EL Öl in Pfanne 8 Min rösten. Abkühlen, in Glas füllen. Reicht für mehrere Wochen. |
| FR08 | Frühstücks-Muffins süß (Banane-Hafer) | Make-ahead | 15 (+ 25 Backen) | 4 Tage | ja | grün | standard |  | 12 Muffins: 2 reife Bananen zerdrücken + 150 g Haferflocken + 150 g Dinkelmehl + 1 TL Backpulver + 60 ml Rapsöl + 120 ml Milch + 50 g Nüsse + 1 geriebener Apfel + 2 geriebene Karotten. In Förmchen, 25 Min bei 180 °C. |
| FR09 | Eier-Muffins herzhaft | Make-ahead | 15 (+ 20 Backen) | 3 Tage | ja | grün | standard |  | 12 Muffins: 8 Eier verquirlen + 150 g klein geschnittenes Gemüse (Paprika, Spinat, Tomate) + 100 g geriebener Käse + Salz/Pfeffer. In Förmchen, 20 Min bei 180 °C. |

## Pool – Schnell (≤ 5 Min am Morgen, ohne Vorbereitung)

| ID | Frühstück | Typ | Zeit aktiv (min) | Vegi | Aldi | Status | PDF | Notiz / Kurzrezept |
|---|---|---|---|---|---|---|---|---|
| FR10 | Vollkornbrot mit Käse | Schnell | 3 | ja | grün | standard |  | 1–2 Scheiben Vollkornbrot + Frischkäse oder Schnittkäse + Tomate/Gurke. |
| FR11 | Vollkornbrot mit Avocado | Schnell | 5 | ja | grün | standard |  | 1–2 Scheiben Vollkornbrot + ½ Avocado zerdrückt + Salz, Pfeffer, Zitrone. Optional: gepoachtes oder hartes Ei. |
| FR12 | Porridge schnell | Schnell | 5 | ja | grün | standard |  | 50 g Haferflocken + 200 ml Milch + Prise Salz, 3 Min köcheln. Topping: Banane, Beeren, Zimt, 1 TL Honig. |
| FR13 | Smoothie | Schnell | 5 | ja | grün | standard |  | 1 Banane + 100 g TK-Beeren + 200 ml Milch + 30 g Haferflocken + 1 EL Honig im Mixer. |
| FR14 | Quark mit Obst | Schnell | 3 | ja | grün | standard |  | 200 g Magerquark + 1 EL Honig + 100 g frisches Obst (Beeren, Banane, Apfel). Optional: 1 EL Leinsamen oder Nüsse. |
| FR15 | Skyr mit Granola und Beeren | Schnell | 2 | ja | grün | standard |  | 200 g Skyr + 30 g Granola + 100 g Beeren. Wenn Skyr nicht da: Naturjoghurt 10 % oder Magerquark. |

## Pool – Warm / Frisch (Wochenende, 10–15 Min)

| ID | Frühstück | Typ | Zeit aktiv (min) | Vegi | Aldi | Status | PDF | Notiz / Kurzrezept |
|---|---|---|---|---|---|---|---|---|
| FR16 | Rührei mit Tomate und Avocado | Warm/Frisch | 10 | ja | grün | standard |  | 2 Eier + Schuss Milch verquirlen, in Pfanne mit Butter stocken lassen. Dazu: ½ Avocado in Scheiben, 1 Tomate gewürfelt, Salz, Pfeffer. Optional: Vollkorntoast. |
| FR17 | Spiegelei auf Vollkornbrot | Warm/Frisch | 10 | ja | grün | standard |  | 2 Scheiben Vollkornbrot toasten + ½ Avocado zerdrückt drauf + 1 Spiegelei + Salz, Pfeffer, Chiliflocken. |
| FR18 | Pancakes Banane-Hafer | Warm/Frisch | 15 | ja | grün | standard |  | 4 Stk: 1 reife Banane zerdrücken + 1 Ei + 50 g Haferflocken (gemahlen oder fein) + 1 TL Backpulver. In Pfanne mit etwas Öl je Seite 2 Min. Topping: Beeren, Ahornsirup. |
| FR19 | Bananen-Toast mit Erdnussbutter | Warm/Frisch | 5 | ja | grün | standard |  | 2 Scheiben Vollkornbrot toasten + Erdnussbutter dick bestrichen + Bananenscheiben + Prise Zimt + 1 TL Honig. |

## Brot-basiert / Belag-Sammlung (für Brot-Frühstückswochen)

| ID | Frühstück | Typ | Zeit aktiv (min) | Vegi | Aldi | Status | PDF | Notiz / Kurzrezept |
|---|---|---|---|---|---|---|---|---|
| FR20 | Vollkornbrot mit Schinken-Käse | Brot-basiert | 3 | nein | grün | standard |  | 1–2 Scheiben Vollkornbrot + Butter + Schinken + Schnittkäse + Gurke/Tomate. |
| FR21 | Vollkornbrot mit Lachs | Brot-basiert | 5 | nein | grün | standard |  | 1–2 Scheiben Vollkornbrot + Frischkäse + Räucherlachs + Dill + Zitrone. |
| FR22 | Vollkornbrot mit Ei und Schnittlauch | Brot-basiert | 8 | ja | grün | standard |  | 2 Scheiben Vollkornbrot + Butter + 1 hartgekochtes Ei in Scheiben + Schnittlauch + Salz. |

## Wunsch / Neu / Pause

(Hier wandern Frühstücke rein, die T per Wunsch ergänzt oder als Neuentdeckung markiert hat. Neue Einträge entweder direkt mit Status `wunsch` / `neu` aufnehmen oder beim Bewerten in den Hauptpool verschieben.)

| ID | Frühstück | Typ | Status | Erstmals | Bewertung | Notiz |
|---|---|---|---|---|---|---|
| _noch leer_ |  |  |  |  |  |  |

## Hinweise zur Auswahl-Logik (für den Skill)

- **Wochen-Routine-Default (siehe SKILL.md Phase 3, Frühstücks-Slot):** Mo–Mi eine Make-ahead-Variante (FR01–FR09), Do–Fr eine andere Make-ahead-Variante, Sa–So eine Warm/Frisch-Variante (FR16–FR19). 3 verschiedene Frühstücke pro Woche.
- **Anti-Monotonie:** keine zwei Make-ahead-Varianten desselben Typs (z. B. nicht zweimal Overnight Oats).
- **Saisonalität:** TK-Beeren ganzjährig ok, frische Beeren nur Mai–September. Mango und Granatapfel nur eingeschränkt Aldi-zuverlässig.
- **Vorbereitungstag:** Make-ahead-Frühstücke laufen typischerweise auf einen Sonntag-Prep hinaus. Der Skill kann im Plan einen kurzen Prep-Hinweis mitschicken („Sonntag 17 Uhr: Overnight Oats und Eier-Muffins zusammen vorbereiten").

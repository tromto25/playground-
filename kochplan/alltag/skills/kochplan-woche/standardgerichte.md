# Standardgerichte – Index für `kochplan-woche`

Vorgefertigter Katalog der Rezepte aus T's Ordner `Rezepte_Spiegel/` in Google Drive, geeignet für die wöchentliche Vorschlagslogik. Der Skill liest **diese Datei** beim Vorschlag, nicht den ganzen PDF-Ordner. Einzelne PDFs werden erst geöffnet, wenn ein Gericht für die Woche ausgewählt ist und die Mengen für die Einkaufsliste extrahiert werden müssen.

**Pflege-Hinweis:** Die Datei ist die Quelle der Wahrheit für den Auswahl-Pool. Neue Rezepte hier mit einer Zeile ergänzen, alte rauswerfen, Zeit-/Aldi-Werte korrigieren, wenn sie nicht stimmen. Der Skill verlässt sich primär auf diese Datei.

**Behauptungen kenntlich gemacht:** Die Spalten „Zeit (min)" und „Aldi" sind Schätzungen aus Dateinamen und allgemeiner Rezeptkenntnis – nicht aus dem PDF-Inhalt verifiziert. T sollte sie nach dem ersten echten Kochen pro Gericht justieren.

## Spaltenbedeutung

- **ID:** kurze Referenz, vom Skill in der Wochenübersicht nutzbar.
- **Gericht:** Anzeige-Name.
- **Kategorie:** Pasta, Reis/Asia, Kartoffel, Pfanne/Bowl, Auflauf, Suppe, Brot/Pizza, Fisch, Vegetarisch-ohne-Stärkebasis. Für Anti-Monotonie-Regel.
- **Zeit (min):** geschätzte Gesamtzubereitungszeit. Nur Gerichte mit ≤30 Min in den Wochenpool.
- **Vegi:** ja/nein – für Vegetarisch-Quote (mind. 2 pro Woche).
- **Aldi:** grün/gelb/rot – Aldi-Tauglichkeit nach `aldi_sortiment.md`. Gelb/rot = Skill rückfragt.
- **Status:** standard / wunsch / neu / pause / nein. „pause" = aktuell nicht vorschlagen, „nein" = endgültig raus.
- **PDF:** Dateiname relativ zu `Rezepte_Spiegel/` in Google Drive (Ordner-IDs in `SKILL.md`, Abschnitt Ablageort).
- **Notiz:** Kurzhinweis (Aldi-Risiko, Schnellkoch-Variante, etc.).

## Pool – Hauptgerichte ≤30 Min (aktiv)

| ID | Gericht | Kategorie | Zeit (min) | Vegi | Aldi | Status | PDF | Notiz |
|---|---|---|---|---|---|---|---|---|
| HP01 | Gnocchi mit Tomaten und Mozzarella | Pasta | 25 | ja | grün | standard | `Hauptgerichte/Chefkoch Rezept_ Gnocchi mit Tomaten und Mozzarella von iglantine.pdf` | Klassiker, schnell, immer geht |
| HP02 | Tagliatelle al Salmone | Pasta | 25 | nein | grün | standard | `Hauptgerichte/Chefkoch Rezept_ Tagliatelle al Salmone von foreigner1986.pdf` | Lachs frisch oder TK |
| HP03 | HF: Gnocchi in cremiger Ziegenkäsesoße | Pasta | 25 | ja | gelb | standard | `Hauptgerichte/HF_gnocchi-in-cremiger-ziegenkasesosse.pdf` | Ziegenkäserolle nicht immer Aldi |
| HP04 | HF: Pasta Bufala mit Pistaziencrumble & Mozzarella | Pasta | 25 | ja | gelb | standard | `Hauptgerichte/HF_pasta-bufala-mit-pistaziencrumble-mozzarella.pdf` | Pistazien Aktion |
| HP05 | HF: Mini-Conchiglie mit Bacon und Spinat | Pasta | 25 | nein | grün | standard | `Hauptgerichte/HF_Mini-Conchiglie mit Bacon und Spinat.pdf` | Bacon vorhanden |
| HP06 | HF: Cremige Hirtenkäse-Tomaten-Pasta mit Spinatsalat | Pasta | 25 | ja | grün | standard | `Hauptgerichte/HF_Cremige Hirtenkäse-Tomaten-Pasta mit Spinatsalat.pdf` | Hirtenkäse = Feta-ähnlich, Aldi |
| HP07 | HF: Pasta Ceci con Tonno mit Thunfisch | Pasta | 20 | nein | grün | standard | `Hauptgerichte/HF_PAsta Ceci con Tonno mit Thunfisch.pdf` | Vorratsküche |
| HP08 | HF: Riesengarnelen mit Spaghetti und Sahnesoße | Pasta | 25 | nein | grün | standard | `Hauptgerichte/HF_Riesengarnelen mit Spaghetti und Sahnesoße.pdf` | Garnelen TK |
| HP09 | HF: Penne mit Rindsteakstreifen | Pasta | 30 | nein | grün | standard | `Hauptgerichte/HF_Penne mit Rindsteakstreifen.pdf` | Rumpsteak Aktion |
| HP10 | HF: Knoblauch-Garnelen-Pasta | Pasta | 20 | nein | grün | standard | `Hauptgerichte/HF_Knochblauch Garnelen Pasta.pdf` | Schnell, klassisch |
| HP11 | HF: Schupfnudeln in Portobello-Rahmsoße | Pfanne | 25 | ja | gelb | standard | `Hauptgerichte/HF_Schupfnudeln in PortobelloRahmsoße.pdf` | Portobello bei Aldi unsicher → braune Champignons als Ersatz |
| HP12 | Gebratene Udon-Nudeln | Reis/Asia | 20 | ja | gelb | standard | `Hauptgerichte/Gebratene UdonNudeln.pdf` | Udon nicht Aldi-Standard, Mie als Ersatz |
| HP13 | Kichererbsen-Spinat-Topf | Vegetarisch-ohne-Stärkebasis | 25 | ja | grün | standard | `Hauptgerichte/Kichererbsen-Spinat-Topf Rezept _ EAT SMARTER.pdf` | Eintopf, sehr schnell |
| HP14 | Gedünstetes Fischfilet | Fisch | 20 | nein | grün | standard | `Hauptgerichte/Gedünstetes Fischfilet Rezept _ EAT SMARTER.pdf` | Seelachs/Lachs, leicht |
| HP15 | Orangen-Lachs mit Nussreis | Fisch | 30 | nein | gelb | standard | `Hauptgerichte/Orangen-Lachs mit Nussreis Rezept _ EAT SMARTER.pdf` | Nussreis ggf. ersetzen |
| HP16 | Gegrillter Lachs in Senf-Honigrahm mit Basmati & Brokkoli | Fisch | 25 | nein | grün | standard | `Hauptgerichte/gegrillter lachs in Senf-Honigrahm mit Basmatireis und Butterbroccoli.pdf` | Solider Klassiker |
| HP17 | Zartes Lachsfilet auf frischen Linguine | Fisch | 25 | nein | gelb | standard | `Hauptgerichte/zartes-lachsfilet-auf-frischen-linguine-62f6755c76780e71000572d0-c2633b22.pdf` | Frische Linguine ggf. nicht Aldi |
| HP18 | Kartoffelpfanne | Kartoffel | 25 | ja | grün | standard | `Hauptgerichte/2024_03_02 19_31 Kartoffelpfanne.pdf` | Schnell, vegetarisch |
| HP19 | Zucchini-Polenta-Puffer mit Kürbis-Wintersalat | Vegetarisch-ohne-Stärkebasis | 30 | ja | gelb | standard | `Hauptgerichte/zucchini-polenta-puffer-mit-kurbis-wintersalat.pdf` | Saisonal, Kürbis im Winter |
| HP20 | Brokkolisuppe (Chefkoch) | Suppe | 25 | ja | grün | standard | `Suppen/Chefkoch Rezept_ Brokkolisuppe von jesusfreak.pdf` | Klassiker, sehr schnell |

## Sonderfälle (nur mit Anpassung ≤30 Min)

| ID | Gericht | Kategorie | Zeit (min) | Vegi | Aldi | Status | PDF | Notiz |
|---|---|---|---|---|---|---|---|---|
| SP01 | Karibisches Curry mit Passionsfrucht (Thermomix) | Pfanne | 35–45 | ja | gelb | pause | `Hauptgerichte/karibisches-curry-mit-passionsfrucht-thermomix-6230604f3c99b6130b608aa8-80ebf7c0.pdf` | Nur Thermomix-Variante schnell, sonst raus |
| SP02 | Chili con Carne | Eintopf | 40 | nein | grün | pause | `Hauptgerichte/Chili con carne.pdf` | Nur mit Schnellkochtopf ≤30 |
| SP03 | Japche | Reis/Asia | 35 | ja | gelb | pause | `Hauptgerichte/2020_07_26 12_10 japche.pdf` | Glasnudeln nicht zuverlässig Aldi |
| SP04 | Tofu Sante | Reis/Asia | 30 | ja | gelb | pause | `Hauptgerichte/2020_07_26 12_09 Office Lens tofu sante.pdf` | Office-Lens-Scan, prüfen |
| SP05 | Pfannkuchen (Chefkoch) | Brot/Pizza | 20 | ja | grün | standard | `Hauptgerichte/Chefkoch Rezept_ Der perfekte Pfannkuchen.pdf` | Süß oder herzhaft, Wildcard |
| SP06 | Gulasch a la Mama | Eintopf | 90+ | nein | grün | nein | `Hauptgerichte/Gulasch a la Mama.doc` | Klassiker, aber nie ≤30 |
| SP07 | Brathuhn | Fleisch | 60+ | nein | grün | nein | `Hauptgerichte/2024_03_02 Brathuhn.pdf` | Backofenzeit, kein Wochenmenü-Kandidat |
| SP08 | Gebackene Kartoffeln mit Ziegenkäse | Kartoffel | 45 | ja | gelb | nein | `Hauptgerichte/2024_03_02 gebackene Kartoffeln mit ziegenkäse.pdf` | Backofen, ≥30 |
| SP09 | Geeiste Kartoffelsuppe | Suppe | 30 + Kühlzeit | ja | grün | pause | `Suppen/2024_03_02 geeiste kartoffelsuppe.pdf` | Sommer, braucht Vorlauf |

## Aufläufe / Gratins (eigene Kategorie, meist >30 Min)

| ID | Gericht | Zeit (min) | Status | PDF | Notiz |
|---|---|---|---|---|---|
| AU01 | Kartoffel-Brokkoli-Auflauf | 60 | nein | `Aufläufe und Gratins/Chefkoch Rezept_ Kartoffel-Brokkoli-Auflauf von Monellaa.pdf` | nicht Wochenpool |
| AU02 | Kartoffel-Lachs-Gratin mit Salat | 60 | nein | `Aufläufe und Gratins/Kartoffel-Lachs-Gratin mit Salat Rezept - [ESSEN UND TRINKEN].pdf` | nicht Wochenpool |
| AU03 | Gratin (eigen) | ? | nein | `Aufläufe und Gratins/2024_03_02 gratin.pdf` | Inhalt unklar, T prüft |
| AU04 | Lasagne | 60+ | nein | `Hauptgerichte/Rezept Lasange.pdf` | nicht Wochenpool |
| AU05 | Lasagne (Variante 2020) | 60+ | nein | `Hauptgerichte/2020_06_12 10_39 Lasangerezept.pdf` | nicht Wochenpool |

## Backwaren / Brot / Pizza (separate Kategorie, nur als Sonderwunsch)

| ID | Gericht | PDF | Notiz |
|---|---|---|---|
| BK01 | Pizzateig wie beim Italiener | `Backen und Gebäck/Pizzateig wie beim Italiener_ Luftig, locker und leicht_.pdf` | Belag separat planen |
| BK02 | Pizzabrötchen | `Backen und Gebäck/Pizzabrötchen.pdf` | Snack |
| BK03 | Pide mit veganem Hackfleisch | `Hauptgerichte/Pide mit veganem Hackfleisch - Eat this!.pdf` | Vegan, Spezialfall |
| BK04 | Croissants und Pains au chocolat | `Backen und Gebäck/Chefkoch Rezept_ Croissants und Pains au chocolat von fenji.pdf` | Aufwendig, Sonntag |
| BK05 | Quark-Haferflocken-Brötchen | `Backen und Gebäck/Chefkoch Rezept_ Quark-Haferflocken Brötchen von RibTho.pdf` | Schnell, Frühstück |
| BK06 | Bröselkuchen | `Backen und Gebäck/Bröselkuchen.pdf` | Süß, separat |
| BK07 | Lieblingsgebäck (Mail-Rezepte) | `Backen und Gebäck/LIEBLINGSGEBÄCK Mail-Rezepte .pdf` | Sammlung |

## Sammlungen (referenziert, nicht direkt im Pool)

- `Sammlungen/vegane-drei-Zutaten-Rezepte.jpg` – als Inspirationsquelle bei Veggie-Wochen.
- `Sammlungen/Gesunde vegane Rezepte mit nur drei Zutaten.pdf` – siehe oben.
- `Sammlungen/2019_08_31_…Rezepte.pdf` (zwei Scans) – T prüft Inhalt bei Gelegenheit.

## Sonstiges / Gewürze

- `Sonstiges/Top Gewürze.pdf` – Referenz für Gewürzbestand, nicht Pool.
- `Sonstiges/7. Kochbuch.url` – externer Link, nicht Pool.

## HF-Stil-Eigen / Neuentdeckungen (kein PDF, vom Skill aus dem Stand erzeugt)

Diese Liste füllt sich mit jeder Woche, in der der Skill ein neues Gericht generiert (Status = neu). Wenn T das Gericht gut findet, wird der Status auf „standard" gesetzt und ggf. ein PDF-Pfad ergänzt (falls T später ein Rezept abspeichert).

| ID | Gericht | Erstmals | Bewertung | Notiz |
|---|---|---|---|---|
| NE01 | Mie-Pfanne mit Tofu & Asia-Gemüse | 2026-04-26 | offen | Ersatz für Udon-Slot, Aldi-Aktion |
| NE02 | One-Pot Linsen-Curry mit Basmati | 2026-04-26 | offen | HF-Stil, vegetarisch |
| NE03 | Honig-Senf-Hähnchen mit Couscous & Möhrensalat | 2026-04-26 | offen | HF-Stil, schnell |

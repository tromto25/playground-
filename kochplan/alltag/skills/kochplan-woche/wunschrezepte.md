# Wunschrezepte – T

Diese Datei wächst mit. Der Skill `kochplan-woche` liest sie vor jedem Plan und ergänzt sie nach jedem Gespräch um neue Wünsche, Bewertungen und Ablehnungen.

**Format-Regeln:**
- Eintrag pro Zeile, Datum im Format `YYYY-MM-DD` in Klammern.
- Bei Rezept aus Ordner: Dateiname in Backticks anfügen.
- Bewertung nach Ausprobieren: `+` (gut), `++` (sehr gut, gerne öfter), `-` (mochten wir nicht).

---

## Lieblingsgerichte (gerne öfter)

<!-- Hier wandern Gerichte rein, die T explizit als Standard / „immer gut" benennt. -->

- _noch leer – wird beim ersten Aufruf gefüllt_

## Wunschgerichte (T möchte diese Woche / demnächst)

<!-- Hier landen kurzfristige Wünsche; nach Einplanung Eintrag löschen oder mit Datum als „eingeplant" markieren. -->

- _noch leer_

## Neu probiert

<!-- Gerichte, die der Skill als Überraschungs-Slot eingeplant hat. T kann nachträglich bewerten. -->

- _noch leer_

## Nicht nochmal

<!-- Gerichte, die explizit nicht mehr auftauchen sollen. -->

- _noch leer_

## Allgemeine Präferenzen / Notizen

<!-- Freie Notizen: Vorlieben, Abneigungen, Gewohnheiten, die der Skill bei Vorschlägen berücksichtigen soll. -->

- Personenzahl: Skill fragt zu Beginn jeder Woche aktiv (typisch 2 oder 4); kein Default-Doppelweg, sondern eine bewusste Entscheidung.
- Quellen-Mix bevorzugt: eigener Rezepteordner + HelloFresh-Stil + 1–2 Neuentdeckungen.
- HelloFresh-Stil ist erwünscht (viele HF-Rezepte im Ordner: `HF_…`).
- Aldi (Süd) ist Standard-Einkaufsort.
- Harte Zeitgrenze: ≤ 30 Minuten Zubereitung.

---

## Frühstücks-Wünsche (T möchte diese Woche / demnächst)

<!-- Konkrete Frühstückswünsche; nach Einplanung Eintrag löschen oder als „eingeplant" markieren. -->

- _noch leer_

## Frühstücks-Lieblinge (gerne öfter)

<!-- Frühstücke, die T explizit als Standard / „immer gut" benennt. -->

- _noch leer – wird nach erstem Frühstücks-Plan gefüllt_

## Frühstücks-Notizen

- Personenzahl Frühstück: standardmäßig identisch zu Mittag/Abend, aber „nur ich frühstücke so" möglich → andere Skalierung (in Phase 1 abfragbar).
- Wochenroutine bevorzugt: Mo–Mi eine Make-ahead-Variante, Do–Fr eine zweite, Sa–So eine warme/frische. Spart Einkauf und morgendlichen Aufwand.
- Frühstück ist standardmäßig **optional**: in Phase 1 wird abgefragt, ob die aktuelle Woche Frühstück mitplant.

# Kochplan: 3-Tage-Modus und Resteverwerter einrichten

Alles läuft über Google Drive (Ordner `Rezepte/`) und die Tabelle „Kochplan" dort. Rezepte-Index, Frühstücke, Wünsche, Kochlog, Vorrat und Einkauf sind Blätter dieser Tabelle. OneDrive ist nur noch Archiv.

## 1. Vorrat prüfen (5 Min)
In der Tabelle „Kochplan" das Blatt **Vorrat** durchgehen: streichen, was du nicht immer
da hast, ergänzen, was fehlt. Status `da` / `knapp` / `leer`.

## 2. Bring!-Anbindung (5 Min)
Im Apps-Script-Projekt **BringBridge**:
1. Links „Dateien" → „+" → „Skript", Name `Kochplan`, Inhalt von `BringBridge/Kochplan.gs` einfügen, speichern.
2. Oben die Funktion `kochplanEinrichten` auswählen → „Ausführen" → Zugriff auf Google Sheets erlauben.
3. Im Protokoll steht „Zeitauslöser angelegt" und „Keine neuen Artikel" – fertig.

Ab dann landen Zeilen mit Status `neu` aus dem Blatt **Einkauf** alle 10 Minuten in Bring!
(Liste laut Spalte „Laden": Aldi, DM oder Woanders). Du kannst dort auch selbst Zeilen eintragen.

## 3. Plugin aktualisieren
`alltag.zip` (Plugin `alltag` 1.1.0) als neue Version hochladen; ersetzt 1.0.0.

## Nutzung
- „Was koche ich die nächsten Tage?" → 3 Tage × 2 Optionen, antworten mit z. B. „A B B"
- „Reste: halber Brokkoli, Feta" → zwei Resteideen
- Bewertungen nebenbei: „Gnocchi ++", „Orzo -"

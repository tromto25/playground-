# clever-tanken (Nachbau)

Ein funktionaler Nachbau der Spritpreis-Vergleichsseite **clever-tanken.de**
als eigenständige, framework-freie Web-App (HTML + CSS + Vanilla JS).

## Funktionen

- **Tankstellensuche** nach Ort oder PLZ (Berlin, München, Hamburg, Köln, Frankfurt, Stuttgart)
- **Kraftstoffauswahl**: Diesel, Super E10, Super E5, SuperPlus, Autogas (LPG)
- **Umkreisfilter**: 2 / 5 / 10 / 20 km
- **Sortierung** nach Preis oder Entfernung
- **Preis-Hervorhebung**: günstigste (grün) und teuerste (rot) Tankstelle
- **Detailansicht** je Tankstelle: alle Spritpreise, Öffnungszeiten, „geöffnet/geschlossen"-Status,
  Aktualisierungszeit und Link zu Karte/Route (OpenStreetMap)
- **Responsives Design** für Desktop und Mobil, tastaturbedienbar

## Nutzung

Es ist kein Build-Schritt nötig. Einfach die `index.html` im Browser öffnen:

```bash
# direkt öffnen
xdg-open index.html            # Linux
open index.html                # macOS

# oder über einen lokalen Server
python3 -m http.server 8000    # dann http://localhost:8000
```

## Projektstruktur

```
index.html        Seitenstruktur (Header, Suche, Ergebnisliste, Modal)
css/styles.css    Design im clever-tanken-Look (Orange/Anthrazit)
js/data.js        Datenschicht: Kraftstoffarten, Städte, Preis-Erzeugung
js/app.js         Anwendungslogik: Suche, Filter, Sortierung, Rendering, Detail-Modal
```

## Datenquelle / Echte Preise anbinden

Die angezeigten Preise sind **realistische Beispieldaten**, keine echten Live-Preise.
Grund: Offizielle Tankstellenpreise in Deutschland stammen aus der
**Markttransparenzstelle für Kraftstoffe (MTS-K)** und sind nur über registrierte,
zugelassene Verbraucher-Informationsdienste (z. B. die Tankerkönig-API) abrufbar.

Der Datenzugriff ist in `js/data.js` in der Funktion `fetchStations(query)` gekapselt.
Um echte Daten anzubinden, muss lediglich diese eine Funktion angepasst werden – z. B.:

```js
async function fetchStations(query) {
  const { lat, lng } = await geocode(query);
  const url = `https://creativecommons.tankerkoenig.de/json/list.php`
            + `?lat=${lat}&lng=${lng}&rad=5&type=all&apikey=DEIN_KEY`;
  const res = await fetch(url);
  const data = await res.json();
  // Antwort in das interne Stationsformat übersetzen …
  return { city: { name: query, lat, lng }, stations: mapTankerkoenig(data.stations) };
}
```

Die restliche App bleibt dabei unverändert.

## Hinweis

Dieses Projekt ist ein Demonstrations-Nachbau zu Lern- und Anschauungszwecken und
steht in keiner Verbindung zu clever-tanken.de bzw. der mobile.de GmbH.

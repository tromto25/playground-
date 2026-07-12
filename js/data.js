/* ==========================================================================
 * data.js — Datenschicht (Mock-Daten)
 * --------------------------------------------------------------------------
 * Da die echten Live-Preise eine kostenpflichtige/registrierungspflichtige
 * API voraussetzen (z. B. Tankerkönig auf Basis der MTS-K), werden hier
 * realistische Beispieldaten bereitgestellt. Die Funktion `fetchStations`
 * kapselt den Datenzugriff, sodass später problemlos eine echte API
 * angebunden werden kann, ohne die restliche App zu ändern.
 * ======================================================================== */

const FUEL_TYPES = [
  { id: 'diesel',    label: 'Diesel',        short: 'Diesel'   },
  { id: 'e10',       label: 'Super E10',     short: 'E10'      },
  { id: 'e5',        label: 'Super E5',      short: 'E5'       },
  { id: 'superplus', label: 'SuperPlus',     short: 'Plus'     },
  { id: 'autogas',   label: 'Autogas (LPG)', short: 'LPG'      },
];

const BRANDS = [
  'Aral', 'Shell', 'Esso', 'TotalEnergies', 'JET', 'star',
  'HEM', 'Eni', 'bft', 'Raiffeisen', 'AVIA', 'OMV',
];

/* Städte mit Mittelpunkt-Koordinaten und PLZ-Bereichen */
const CITIES = {
  '10115': { name: 'Berlin',     lat: 52.5200, lng: 13.4050 },
  'berlin':{ name: 'Berlin',     lat: 52.5200, lng: 13.4050 },
  '80331': { name: 'München',    lat: 48.1351, lng: 11.5820 },
  'münchen':{name: 'München',    lat: 48.1351, lng: 11.5820 },
  'muenchen':{name:'München',    lat: 48.1351, lng: 11.5820 },
  '20095': { name: 'Hamburg',    lat: 53.5511, lng:  9.9937 },
  'hamburg':{ name: 'Hamburg',   lat: 53.5511, lng:  9.9937 },
  '50667': { name: 'Köln',       lat: 50.9375, lng:  6.9603 },
  'köln':  { name: 'Köln',       lat: 50.9375, lng:  6.9603 },
  'koeln': { name: 'Köln',       lat: 50.9375, lng:  6.9603 },
  '60311': { name: 'Frankfurt',  lat: 50.1109, lng:  8.6821 },
  'frankfurt':{name:'Frankfurt', lat: 50.1109, lng:  8.6821 },
  '70173': { name: 'Stuttgart',  lat: 48.7758, lng:  9.1829 },
  'stuttgart':{name:'Stuttgart', lat: 48.7758, lng:  9.1829 },
};

const STREETS = [
  'Hauptstraße', 'Bahnhofstraße', 'Ringstraße', 'Industrieweg', 'Frankfurter Allee',
  'Münchner Straße', 'Berliner Straße', 'Kölner Straße', 'Am Stadtpark', 'Lindenallee',
  'Gutenbergstraße', 'Schillerstraße', 'Goethestraße', 'Marktplatz', 'Ostring',
  'Westring', 'Nordstraße', 'Südallee', 'Feldstraße', 'Brückenstraße',
];

/* Deterministischer Pseudo-Zufallsgenerator, damit Preise pro Sitzung stabil
   sind (kein Neu-Würfeln bei jeder Sortierung). */
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Basispreise (EUR/Liter) je Kraftstoffart – realistisches Niveau */
const BASE_PRICE = {
  diesel:    1.669,
  e10:       1.729,
  e5:        1.789,
  superplus: 1.949,
  autogas:   0.999,
};

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function makeOpeningHours(rand) {
  const alwaysOpen = rand() < 0.35;
  if (alwaysOpen) return { text: '24 Stunden geöffnet', open: true, always: true };
  const openH = 5 + Math.floor(rand() * 3);          // 5–7 Uhr
  const closeH = 21 + Math.floor(rand() * 3);         // 21–23 Uhr
  const now = new Date().getHours();
  return {
    text: `${String(openH).padStart(2, '0')}:00 – ${String(closeH).padStart(2, '0')}:00 Uhr`,
    open: now >= openH && now < closeH,
    always: false,
  };
}

/* Erzeugt die Tankstellenliste für eine Stadt (deterministisch pro Stadt). */
function generateStations(cityKey, city) {
  const seedBase = Array.from(cityKey).reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = seededRandom(seedBase * 7 + 13);
  const count = 14 + Math.floor(rand() * 6); // 14–19 Stationen
  const stations = [];

  for (let i = 0; i < count; i++) {
    const brand = BRANDS[Math.floor(rand() * BRANDS.length)];
    const street = STREETS[Math.floor(rand() * STREETS.length)];
    const houseNo = 1 + Math.floor(rand() * 180);

    // leichte Streuung um das Stadtzentrum (~ ±0.045° ≈ wenige km)
    const lat = city.lat + (rand() - 0.5) * 0.09;
    const lng = city.lng + (rand() - 0.5) * 0.13;

    // Preise: Basispreis + individuelle Abweichung pro Station
    const spread = (rand() - 0.5) * 0.14; // ±7 Cent Grundtendenz der Station
    const prices = {};
    FUEL_TYPES.forEach(ft => {
      const jitter = (rand() - 0.5) * 0.06;
      let p = BASE_PRICE[ft.id] + spread + jitter;
      // Autogas bieten nicht alle an
      if (ft.id === 'autogas' && rand() < 0.45) { prices[ft.id] = null; return; }
      if (ft.id === 'superplus' && rand() < 0.25) { prices[ft.id] = null; return; }
      prices[ft.id] = Math.max(0.5, Math.round(p * 1000) / 1000);
    });

    // "aktualisiert vor X Minuten"
    const updatedMin = 1 + Math.floor(rand() * 55);

    stations.push({
      id: `${cityKey}-${i}`,
      brand,
      name: `${brand} ${city.name} ${street}`,
      street: `${street} ${houseNo}`,
      city: city.name,
      lat, lng,
      prices,
      hours: makeOpeningHours(rand),
      updatedMin,
    });
  }
  return stations;
}

/* Cache, damit dieselbe Stadt stabile Werte behält */
const _cityCache = {};

/**
 * Zentrale Datenzugriffsfunktion.
 * @param {string} query  Ort oder PLZ
 * @returns {Promise<{city:object, stations:array}>}
 */
function fetchStations(query) {
  return new Promise((resolve, reject) => {
    // Netzwerk-Latenz simulieren
    setTimeout(() => {
      const key = String(query || '').trim().toLowerCase();
      const cityEntry = CITIES[key];
      if (!cityEntry) {
        reject(new Error('NOT_FOUND'));
        return;
      }
      const cacheKey = cityEntry.name;
      if (!_cityCache[cacheKey]) {
        _cityCache[cacheKey] = generateStations(cacheKey.toLowerCase(), cityEntry);
      }
      // Entfernung vom Stadtzentrum berechnen
      const stations = _cityCache[cacheKey].map(s => ({
        ...s,
        distance: haversine(cityEntry.lat, cityEntry.lng, s.lat, s.lng),
      }));
      resolve({ city: cityEntry, stations });
    }, 350);
  });
}

/* Liste unterstützter Orte für Autovervollständigung / Hinweise */
const SUPPORTED_PLACES = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart'];

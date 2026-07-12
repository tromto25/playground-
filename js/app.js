/* ==========================================================================
 * app.js — Anwendungslogik
 * ======================================================================== */

const state = {
  fuel: 'diesel',
  radius: 5,
  sort: 'price',      // 'price' | 'distance'
  query: '',
  city: null,
  stations: [],
};

/* ---------- DOM-Referenzen ---------- */
const el = {
  form:        document.getElementById('search-form'),
  input:       document.getElementById('query'),
  fuelSelect:  document.getElementById('fuel'),
  radiusSelect:document.getElementById('radius'),
  sortPrice:   document.getElementById('sort-price'),
  sortDist:    document.getElementById('sort-distance'),
  results:     document.getElementById('results'),
  resultsHead: document.getElementById('results-head'),
  status:      document.getElementById('status'),
  chips:       document.getElementById('city-chips'),
  fuelChips:   document.getElementById('fuel-chips'),
  modal:       document.getElementById('modal'),
  modalBody:   document.getElementById('modal-body'),
  modalClose:  document.getElementById('modal-close'),
};

/* ---------- Hilfsfunktionen ---------- */
function fuelLabel(id) {
  const f = FUEL_TYPES.find(x => x.id === id);
  return f ? f.label : id;
}

function formatPrice(p) {
  if (p == null) return '—';
  // Deutschland-Format: 1,669 -> "1,66⁹" mit hochgestellter Nachkommastelle
  const s = p.toFixed(3).replace('.', ',');
  return s.slice(0, -1) + '<sup>' + s.slice(-1) + '</sup>';
}

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1).replace('.', ',')} km`;
}

function brandInitial(brand) {
  return brand.replace(/[^A-Za-zÄÖÜ]/g, '').slice(0, 2).toUpperCase();
}

/* ---------- Rendering ---------- */
function render() {
  const fuel = state.fuel;

  // nur Stationen im Radius und mit Preis für gewählten Kraftstoff
  let list = state.stations.filter(s =>
    s.distance <= state.radius && s.prices[fuel] != null
  );

  if (list.length === 0) {
    el.results.innerHTML = '';
    el.resultsHead.hidden = true;
    setStatus(state.stations.length
      ? `Keine Tankstelle mit ${fuelLabel(fuel)} im Umkreis von ${state.radius} km gefunden. Erhöhe den Radius.`
      : '', 'info');
    return;
  }

  // Sortieren
  list.sort((a, b) => state.sort === 'price'
    ? a.prices[fuel] - b.prices[fuel]
    : a.distance - b.distance);

  const cheapest = Math.min(...list.map(s => s.prices[fuel]));
  const priciest = Math.max(...list.map(s => s.prices[fuel]));

  el.resultsHead.hidden = false;
  el.resultsHead.innerHTML = `
    <strong>${list.length}</strong> Tankstellen in
    <strong>${state.city.name}</strong> · Kraftstoff:
    <strong>${fuelLabel(fuel)}</strong> · Umkreis ${state.radius} km`;

  el.results.innerHTML = list.map((s, i) => {
    const price = s.prices[fuel];
    const isCheapest = price === cheapest;
    const isPriciest = price === priciest && priciest !== cheapest;
    const cls = isCheapest ? 'price-low' : isPriciest ? 'price-high' : 'price-mid';
    return `
      <li class="station" data-id="${s.id}" tabindex="0" role="button"
          aria-label="Details zu ${s.name}">
        <div class="rank">${i + 1}</div>
        <div class="brand-logo" data-brand="${s.brand}">${brandInitial(s.brand)}</div>
        <div class="station-main">
          <div class="station-name">${s.name}${isCheapest
            ? '<span class="badge-cheap">günstigste</span>' : ''}</div>
          <div class="station-sub">${s.street} · ${s.city}
            · <span class="${s.hours.open ? 'open' : 'closed'}">
              ${s.hours.open ? 'geöffnet' : 'geschlossen'}</span></div>
          <div class="station-updated">aktualisiert vor ${s.updatedMin} Min.</div>
        </div>
        <div class="station-meta">
          <div class="distance">${formatDistance(s.distance)}</div>
        </div>
        <div class="price ${cls}">
          <span class="price-value">${formatPrice(price)}</span>
          <span class="price-cur">€</span>
        </div>
      </li>`;
  }).join('');

  setStatus('', 'info');
}

function setStatus(msg, type = 'info') {
  el.status.textContent = msg;
  el.status.className = 'status ' + (msg ? type : 'hidden');
}

/* ---------- Detail-Modal ---------- */
function openDetail(id) {
  const s = state.stations.find(x => x.id === id);
  if (!s) return;

  const rows = FUEL_TYPES.map(ft => {
    const p = s.prices[ft.id];
    return `
      <tr class="${ft.id === state.fuel ? 'active-fuel' : ''}">
        <td>${ft.label}</td>
        <td class="detail-price">${p != null
          ? formatPrice(p) + ' €' : '<span class="na">nicht verfügbar</span>'}</td>
      </tr>`;
  }).join('');

  el.modalBody.innerHTML = `
    <div class="detail-header">
      <div class="brand-logo lg" data-brand="${s.brand}">${brandInitial(s.brand)}</div>
      <div>
        <h2>${s.name}</h2>
        <p class="detail-addr">${s.street}, ${s.city}</p>
      </div>
    </div>
    <div class="detail-info">
      <div class="info-block">
        <span class="info-label">Öffnungszeiten</span>
        <span class="info-value ${s.hours.open ? 'open' : 'closed'}">
          ${s.hours.text} · ${s.hours.open ? 'jetzt geöffnet' : 'jetzt geschlossen'}</span>
      </div>
      <div class="info-block">
        <span class="info-label">Entfernung</span>
        <span class="info-value">${formatDistance(s.distance)} vom Zentrum</span>
      </div>
      <div class="info-block">
        <span class="info-label">Zuletzt aktualisiert</span>
        <span class="info-value">vor ${s.updatedMin} Minuten</span>
      </div>
    </div>
    <h3 class="detail-sub">Aktuelle Preise</h3>
    <table class="detail-table">${rows}</table>
    <a class="route-btn" target="_blank" rel="noopener"
       href="https://www.openstreetmap.org/?mlat=${s.lat}&mlon=${s.lng}#map=15/${s.lat}/${s.lng}">
       📍 Route / Karte öffnen</a>`;

  el.modal.classList.add('open');
  el.modal.setAttribute('aria-hidden', 'false');
  el.modalClose.focus();
}

function closeDetail() {
  el.modal.classList.remove('open');
  el.modal.setAttribute('aria-hidden', 'true');
}

/* ---------- Suche ---------- */
async function doSearch(query) {
  state.query = query;
  setStatus('Suche Tankstellen …', 'info');
  el.results.innerHTML = '';
  el.resultsHead.hidden = true;
  try {
    const { city, stations } = await fetchStations(query);
    state.city = city;
    state.stations = stations;
    render();
  } catch (e) {
    state.stations = [];
    state.city = null;
    el.resultsHead.hidden = true;
    setStatus(
      `Für „${query}" liegen keine Daten vor. Verfügbare Orte: ${SUPPORTED_PLACES.join(', ')}.`,
      'error');
  }
}

/* ---------- Initialisierung ---------- */
function initControls() {
  // Kraftstoff-Dropdown füllen
  el.fuelSelect.innerHTML = FUEL_TYPES
    .map(f => `<option value="${f.id}">${f.label}</option>`).join('');
  el.fuelSelect.value = state.fuel;

  // Kraftstoff-Chips (Schnellauswahl)
  el.fuelChips.innerHTML = FUEL_TYPES.map(f =>
    `<button type="button" class="chip fuel-chip ${f.id === state.fuel ? 'active' : ''}"
       data-fuel="${f.id}">${f.short}</button>`).join('');

  // Städte-Chips
  el.chips.innerHTML = SUPPORTED_PLACES.map(p =>
    `<button type="button" class="chip" data-city="${p}">${p}</button>`).join('');
}

function syncFuelUI() {
  el.fuelSelect.value = state.fuel;
  document.querySelectorAll('.fuel-chip').forEach(c =>
    c.classList.toggle('active', c.dataset.fuel === state.fuel));
}

function syncSortUI() {
  el.sortPrice.classList.toggle('active', state.sort === 'price');
  el.sortDist.classList.toggle('active', state.sort === 'distance');
}

/* ---------- Event-Bindings ---------- */
function bindEvents() {
  el.form.addEventListener('submit', e => {
    e.preventDefault();
    const q = el.input.value.trim();
    if (q) doSearch(q);
  });

  el.fuelSelect.addEventListener('change', () => {
    state.fuel = el.fuelSelect.value;
    syncFuelUI();
    if (state.stations.length) render();
  });

  el.radiusSelect.addEventListener('change', () => {
    state.radius = Number(el.radiusSelect.value);
    if (state.stations.length) render();
  });

  el.sortPrice.addEventListener('click', () => {
    state.sort = 'price'; syncSortUI();
    if (state.stations.length) render();
  });
  el.sortDist.addEventListener('click', () => {
    state.sort = 'distance'; syncSortUI();
    if (state.stations.length) render();
  });

  // Delegation: Chips
  el.fuelChips.addEventListener('click', e => {
    const b = e.target.closest('.fuel-chip'); if (!b) return;
    state.fuel = b.dataset.fuel; syncFuelUI();
    if (state.stations.length) render();
  });
  el.chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    el.input.value = b.dataset.city;
    doSearch(b.dataset.city);
  });

  // Delegation: Stationsklick -> Detail
  el.results.addEventListener('click', e => {
    const li = e.target.closest('.station'); if (!li) return;
    openDetail(li.dataset.id);
  });
  el.results.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const li = e.target.closest('.station'); if (!li) return;
    e.preventDefault();
    openDetail(li.dataset.id);
  });

  // Modal schließen
  el.modalClose.addEventListener('click', closeDetail);
  el.modal.addEventListener('click', e => {
    if (e.target === el.modal) closeDetail();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && el.modal.classList.contains('open')) closeDetail();
  });
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initControls();
  bindEvents();
  syncSortUI();
  // Startsuche als Demo
  el.input.value = 'Berlin';
  doSearch('Berlin');
});

const metricConfigs = {
  TX01: { label: "氣溫 (°C)", mode: "mean", color: "#5be4a8", index: 3 },
  PP01: { label: "降雨量 (mm)", mode: "sum", color: "#4ea3ff", index: 7 },
  RH01: { label: "相對濕度 (%)", mode: "mean", color: "#fcb97d", index: 4 },
  WD01: { label: "風速 (m/s)", mode: "mean", color: "#ff7eb6", index: 5 },
};

const dom = {
  countySelect: document.getElementById("countySelect"),
  stationSelect: document.getElementById("stationSelect"),
  rollupSelect: document.getElementById("rollupSelect"),
  rangeStart: document.getElementById("rangeStart"),
  rangeEnd: document.getElementById("rangeEnd"),
  rangeLabel: document.getElementById("rangeLabel"),
  status: document.getElementById("status"),
  chartTitle: document.getElementById("chartTitle"),
  loadBtn: document.getElementById("loadBtn"),
  clearBtn: document.getElementById("clearBtn"),
  tabs: Array.from(document.querySelectorAll("[data-tab-target]")),
  panels: Array.from(document.querySelectorAll(".tab-panel")),
  realtimeStatus: document.getElementById("realtimeStatus"),
  realtimeCounty: document.getElementById("realtimeCounty"),
  alertList: document.getElementById("alertList"),
  forecastSlots: document.getElementById("forecastSlots"),
  refreshRealtimeBtn: document.getElementById("refreshRealtimeBtn"),
  reloadAlertsBtn: document.getElementById("reloadAlertsBtn"),
  reloadForecastBtn: document.getElementById("reloadForecastBtn"),
  reloadLiveTyphoonBtn: document.getElementById("reloadLiveTyphoonBtn"),
  clearRealtimeBtn: document.getElementById("clearRealtimeBtn"),
  liveTyphoonMap: document.getElementById("liveTyphoonMap"),
  typhoonLiveList: document.getElementById("typhoonLiveList"),
  reloadNCUEBtn: document.getElementById("reloadNCUEBtn"),
  ncueStatus: document.getElementById("ncueStatus"),
  ncueObservation: document.getElementById("ncueObservation"),
  reloadAqiBtn: document.getElementById("reloadAqiBtn"),
  aqiStatus: document.getElementById("aqiStatus"),
  aqiObservation: document.getElementById("aqiObservation"),
};

let fileIndex = [];
let stationsMeta = [];
const charts = {};
const fileCache = new Map();
const dailyCache = new Map();

const realtimeState = {
  forecastCache: new Map(),
  alertCache: null,
  typhoonMap: null,
  typhoonLayer: null,
  countiesGeo: null,
  latestObservation: null,
  latestAqi: null,
};

const CWA_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/rest/datastore";
const CWA_API_KEY = "";
const NCUE_STATION_KEYWORDS = ["彰師大", "彰化師大", "國立彰化師範大學", "NCUE"];
const AQI_ENDPOINT = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/aqi";
const AQI_SITE_KEYWORDS = ["彰化"];
const AQI_API_KEY = "";
const REALTIME_COUNTY = "彰化縣";
const CWA_COUNTIES = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹縣",
  "新竹市",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "嘉義市",
  "臺南市",
  "高雄市",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindTabs();
  bindEvents();
  await loadIndex();
  await loadStationsMeta();
  buildCountyOptions();
  updateRangeLabel();
  updateLoadButtonState();
  setStatus("請先選測站或縣市與時間區間，再點重新載入。");
  initRealtimeView();
}

function bindTabs() {
  dom.tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      dom.tabs.forEach((b) => b.classList.toggle("active", b === btn));
      dom.panels.forEach((p) => p.classList.toggle("active", p.dataset.tab === target));
      if (target === "realtime") {
        requestAnimationFrame(() => {
          ensureRealtimeMapSized();
        });
      }
    });
  });
}

function bindEvents() {
  dom.rangeStart.addEventListener("input", syncRange);
  dom.rangeEnd.addEventListener("input", syncRange);
  dom.loadBtn.addEventListener("click", refreshChart);
  dom.clearBtn.addEventListener("click", clearChart);
  dom.countySelect?.addEventListener("change", () => {
    buildStationOptions();
    updateRangeLabel();
    updateLoadButtonState();
  });
  dom.stationSelect.addEventListener("change", updateLoadButtonState);
  dom.rollupSelect.addEventListener("change", updateLoadButtonState);
  dom.refreshRealtimeBtn?.addEventListener("click", refreshRealtimeAll);
  dom.reloadAlertsBtn?.addEventListener("click", loadWeatherAlerts);
  dom.reloadForecastBtn?.addEventListener("click", () => {
    loadForecast(REALTIME_COUNTY);
  });
  dom.reloadLiveTyphoonBtn?.addEventListener("click", loadLiveTyphoon);
  dom.reloadNCUEBtn?.addEventListener("click", loadNCUEObservation);
  dom.reloadAqiBtn?.addEventListener("click", loadAqiData);
  dom.clearRealtimeBtn?.addEventListener("click", clearRealtimeDisplay);
}
async function loadIndex() {
  try {
    const res = await fetch("./data/changhua/fileIndex.json");
    fileIndex = await res.json();
    if (!Array.isArray(fileIndex) || !fileIndex.length) {
      setStatus("找不到索引檔，請先執行 scripts/build_changhua_subset.py");
      return;
    }
    dom.rangeStart.max = fileIndex.length - 1;
    dom.rangeEnd.max = fileIndex.length - 1;
    dom.rangeStart.value = Math.max(0, fileIndex.length - 3);
    dom.rangeEnd.value = fileIndex.length - 1;
  } catch (err) {
    console.error(err);
    setStatus("讀取索引失敗");
  }
}

async function loadStationsMeta() {
  try {
    const res = await fetch("./data/changhua/stations_meta.json");
    if (!res.ok) return;
    stationsMeta = await res.json();
  } catch (err) {
    console.warn("stations_meta.json 讀取失敗，將不顯示縣市選單", err);
  } finally {
    buildStationOptions();
    updateLoadButtonState();
  }
}

function buildCountyOptions() {
  if (!dom.countySelect) return;
  const counties = new Set(
    stationsMeta
      .filter((s) => !s.status || s.status === "existing")
      .map((s) => s.county)
      .filter(Boolean)
  );
  const options = ['<option value="*">全部縣市</option>'].concat(
    Array.from(counties)
      .sort()
      .map((c) => `<option value="${c}">${c}</option>`)
  );
  dom.countySelect.innerHTML = options.join("");
}

function buildStationOptions() {
  const county = dom.countySelect ? dom.countySelect.value : "";
  let list = stationsMeta.filter((s) => !s.status || s.status === "existing");
  if (county && county !== "*") {
    list = list.filter((s) => s.county === county);
  }
  const options = ['<option value="*">全部測站（縣內平均）</option>'].concat(
    list
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((s) => `<option value="${s.id}">${s.id} ｜ ${s.name || ""}</option>`)
  );
  dom.stationSelect.innerHTML = options.join("");
  if (list.some((s) => s.id === "A0G720")) {
    dom.stationSelect.value = "A0G720";
  }
}

function syncRange() {
  const start = Number(dom.rangeStart.value);
  const end = Number(dom.rangeEnd.value);
  if (start > end) {
    dom.rangeStart.value = end;
  }
  updateRangeLabel();
  updateLoadButtonState();
}

function updateRangeLabel() {
  if (!fileIndex.length) {
    dom.rangeLabel.textContent = "索引尚未載入";
    return;
  }
  const startIdx = Number(dom.rangeStart.value);
  const endIdx = Number(dom.rangeEnd.value);
  const start = fileIndex[startIdx];
  const end = fileIndex[endIdx];
  dom.rangeLabel.textContent = `${start.year}/${String(start.month).padStart(2, "0")} ~ ${end.year}/${String(end.month).padStart(2, "0")}`;
}

function setStatus(text) {
  dom.status.textContent = text;
}

function isSelectionReady() {
  if (!fileIndex.length) return false;
  const start = Number(dom.rangeStart.value);
  const end = Number(dom.rangeEnd.value);
  const hasValidRange = start <= end;
  const station = dom.stationSelect.value;
  const county = dom.countySelect ? dom.countySelect.value : "";
  if (stationsMeta.length > 0) {
    const hasStation = station && station !== "*";
    const hasCounty = county && county !== "*";
    return hasValidRange && (hasStation || hasCounty || !dom.countySelect);
  }
  return hasValidRange;
}

function updateLoadButtonState() {
  const ready = isSelectionReady();
  dom.loadBtn.disabled = !ready;
  if (!ready) {
    setStatus("請先選測站並設定時間範圍");
  }
}

async function refreshChart() {
  if (!isSelectionReady()) {
    setStatus("請先選測站/縣市與起迄範圍");
    updateLoadButtonState();
    return;
  }
  setStatus("載入中...");
  dom.loadBtn.disabled = true;
  try {
    const payload = await loadAllSeries();
    if (!payload.points || !payload.labels.length) {
      clearChart();
      setStatus("目前條件沒有有效資料（可能都是 -999x）");
      return;
    }
    renderCharts(payload);
    setStatus(`完成：${payload.points} 筆資料已匯總`);
  } catch (err) {
    console.error(err);
    setStatus("載入失敗，請檢查主控台與檔案路徑");
  } finally {
    dom.loadBtn.disabled = false;
  }
}

function clearChart() {
  Object.keys(charts).forEach((k) => {
    charts[k].destroy();
    delete charts[k];
  });
  dom.chartTitle.textContent = "已清空";
}

function resolveStations() {
  const pick = dom.stationSelect.value;
  if (pick && pick !== "*") {
    return new Set([pick]);
  }
  if (!dom.countySelect) return null;
  const county = dom.countySelect.value;
  if (!county || county === "*") return null;
  const ids = stationsMeta
    .filter((s) => (!s.status || s.status === "existing") && s.county === county)
    .map((s) => s.id);
  return ids.length ? new Set(ids) : null;
}

async function loadAllSeries() {
  const rollup = dom.rollupSelect.value;
  const metricKeys = Object.keys(metricConfigs);
  const bucketMap = new Map(metricKeys.map((k) => [k, new Map()]));
  const startIdx = Math.min(Number(dom.rangeStart.value), Number(dom.rangeEnd.value));
  const endIdx = Math.max(Number(dom.rangeStart.value), Number(dom.rangeEnd.value));
  const files = fileIndex.slice(startIdx, endIdx + 1);
  const allowedStations = resolveStations();
  let pointCount = 0;

  for (let i = 0; i < files.length; i += 1) {
    const f = files[i];
    setStatus(`讀取 ${f.file} (${i + 1}/${files.length})`);
    if (rollup === "day") {
      const ok = await tryParseDailyAll(f, metricKeys, allowedStations, bucketMap);
      if (ok) continue;
    }
    const url = resolveFileUrl(f.path);
    let text = fileCache.get(url);
    if (!text) {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`讀取失敗：${f.file} (${res.status})`);
      }
      text = await res.text();
      fileCache.set(url, text);
    }
    parseFileAll(text, metricKeys, rollup, allowedStations, bucketMap);
  }

  const keySet = new Set();
  for (const map of bucketMap.values()) {
    for (const key of map.keys()) keySet.add(key);
  }
  const sortedKeys = Array.from(keySet).sort();
  const labels = sortedKeys.map((k) => formatKey(k, rollup));

  const series = {};
  const isMultiStation = !allowedStations || allowedStations.size > 1;
  for (const metricKey of metricKeys) {
    const cfg = metricConfigs[metricKey];
    const map = bucketMap.get(metricKey);
    const data = sortedKeys.map((k) => {
      const b = map.get(k);
      if (!b || b.count === 0) return null;
      const val =
        cfg.mode === "sum" && metricKey === "PP01" && isMultiStation
          ? b.sum / b.count
          : cfg.mode === "sum"
            ? b.sum
            : b.sum / b.count;
      pointCount += b.count;
      return Number(val.toFixed(2));
    });
    series[metricKey] = {
      label: cfg.mode === "sum" && metricKey === "PP01" && isMultiStation ? `${cfg.label}（平均）` : cfg.label,
      data,
      color: cfg.color,
      mode: cfg.mode,
    };
  }

  return {
    labels,
    series,
    points: pointCount,
  };
}

function parseFileAll(text, metricKeys, rollup, allowedStations, bucketMap) {
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith("*") || line.startsWith("#")) continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length <= 8) continue;
    const stno = parts[0];
    if (allowedStations && !allowedStations.has(stno)) continue;

    const rawTime = parts[1];
    const key = rollup === "hour" ? rawTime : rawTime.slice(0, 8);
    for (const metricKey of metricKeys) {
      const cfg = metricConfigs[metricKey];
      const value = Number(parts[cfg.index]);
      if (!Number.isFinite(value) || value <= -9000) continue;
      const bucket = bucketMap.get(metricKey).get(key) || { sum: 0, count: 0 };
      bucket.sum += value;
      bucket.count += 1;
      bucketMap.get(metricKey).set(key, bucket);
    }
  }
}

async function tryParseDailyAll(fileInfo, metricKeys, allowedStations, bucketMap) {
  const dailyPath = `./data/changhua/daily/${fileInfo.file.replace(".auto_hr.txt", ".daily.json")}`;
  let records = dailyCache.get(dailyPath);
  if (!records) {
    const res = await fetch(dailyPath);
    if (!res.ok) {
      return false;
    }
    records = await res.json();
    dailyCache.set(dailyPath, records);
  }
  for (const rec of records) {
    if (allowedStations && !allowedStations.has(rec.stno)) continue;
    for (const metricKey of metricKeys) {
      const cfg = metricConfigs[metricKey];
      const val = Number(rec[metricKey]);
      if (!Number.isFinite(val) || val <= -9000) continue;
      const key = rec.date;
      const bucket = bucketMap.get(metricKey).get(key) || { sum: 0, count: 0 };
      bucket.sum += val;
      bucket.count += 1;
      bucketMap.get(metricKey).set(key, bucket);
    }
  }
  return true;
}

function resolveFileUrl(rawPath) {
  try {
    return new URL(rawPath, window.location.origin + window.location.pathname).toString();
  } catch (_) {
    return rawPath;
  }
}

function formatKey(key, rollup) {
  if (rollup === "hour") {
    const year = key.slice(0, 4);
    const month = key.slice(4, 6);
    const day = key.slice(6, 8);
    const hour = key.slice(8, 10);
    return `${year}/${month}/${day} ${hour}:00`;
  }
  const year = key.slice(0, 4);
  const month = key.slice(4, 6);
  const day = key.slice(6, 8);
  return `${year}/${month}/${day}`;
}

function renderCharts(payload) {
  dom.chartTitle.textContent = `${payload.labels[0]} ~ ${payload.labels[payload.labels.length - 1]} ｜ 氣溫、降雨量、相對濕度、風速`;
  Object.entries(payload.series).forEach(([metricKey, ser]) => {
    const canvas = document.getElementById(`chart-${metricKey}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dataset = {
      label: ser.label,
      data: ser.data,
      borderColor: ser.color,
      backgroundColor: hexToRgba(ser.color, 0.1),
      pointRadius: 0,
      pointHoverRadius: 3,
      tension: 0.15,
      fill: false,
    };
    if (charts[metricKey]) {
      charts[metricKey].data.labels = payload.labels;
      charts[metricKey].data.datasets = [dataset];
      charts[metricKey].update();
    } else {
      charts[metricKey] = new Chart(ctx, {
        type: "line",
        data: { labels: payload.labels, datasets: [dataset] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { mode: "index", intersect: false },
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { maxRotation: 0, autoSkip: true }, grid: { color: "rgba(255,255,255,0.05)" } },
            y: { grid: { color: "rgba(255,255,255,0.08)" } },
          },
        },
      });
    }
  });
}

function hexToRgba(hex, alpha) {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function requestUserLocation() {
  if (!navigator.geolocation) {
    setRealtimeStatus("瀏覽器不支援定位，請手動選縣市。");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      setRealtimeStatus("定位成功，判斷所屬縣市中…");
      try {
        const county = await resolveCountyByPoint(longitude, latitude);
        if (county && dom.realtimeCounty) {
          dom.realtimeCounty.value = county;
          setRealtimeStatus(`已定位到 ${county}，自動載入資料。`);
          refreshRealtimeAll();
        } else {
          setRealtimeStatus("定位完成，但無法對應縣市，請手動選擇。");
        }
      } catch (err) {
        console.error(err);
        setRealtimeStatus("定位成功但對應縣市失敗，請手動選擇。");
      }
    },
    (err) => {
      console.warn("Geolocation error", err);
      setRealtimeStatus("無法取得定位，請手動選縣市。");
    },
    { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
  );
}

async function ensureCountiesGeo() {
  if (realtimeState.countiesGeo) return realtimeState.countiesGeo;
  const res = await fetch("./data/typhoon/counties.geojson");
  if (!res.ok) throw new Error("無法載入縣市邊界資料");
  realtimeState.countiesGeo = await res.json();
  return realtimeState.countiesGeo;
}

async function resolveCountyByPoint(lon, lat) {
  const geo = await ensureCountiesGeo();
  const features = geo.features || [];
  const pt = [Number(lon), Number(lat)];
  for (const f of features) {
    if (!f.geometry) continue;
    if (geometryContainsPoint(f.geometry, pt)) {
      const name = f.properties?.COUNTYNAME || f.properties?.name;
      if (name) return normalizeCountyName(name);
    }
  }
  return null;
}

function geometryContainsPoint(geom, pt) {
  if (!geom || !geom.type) return false;
  if (geom.type === "Polygon") {
    return polygonContainsPoint(geom.coordinates, pt);
  }
  if (geom.type === "MultiPolygon") {
    return geom.coordinates.some((poly) => polygonContainsPoint(poly, pt));
  }
  return false;
}

function polygonContainsPoint(rings, pt) {
  if (!rings || !rings.length) return false;
  const [x, y] = pt;
  const ring = rings[0];
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// ----------------- 即時資料 -----------------

function initRealtimeView() {
  setRealtimeStatus("已使用 Cloudflare Proxy，直接點「更新全部」即可。");
  initRealtimeMap();
  loadNCUEObservation();
  loadAqiData();
  loadForecast(REALTIME_COUNTY);
  loadWeatherAlerts();
  loadLiveTyphoon();
}

function buildRealtimeCountyOptions() {
  if (!dom.realtimeCounty) return;
  const opts = CWA_COUNTIES.map((c) => `<option value="${c}">${c}</option>`);
  dom.realtimeCounty.innerHTML = opts.join("");
  dom.realtimeCounty.value = REALTIME_COUNTY;
}

function setRealtimeStatus(text) {
  if (dom.realtimeStatus) {
    dom.realtimeStatus.textContent = text;
  }
}

function initRealtimeMap() {
  if (!dom.liveTyphoonMap || realtimeState.typhoonMap) return;
  realtimeState.typhoonMap = L.map("liveTyphoonMap", { zoomControl: true }).setView([23.5, 121], 6);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(realtimeState.typhoonMap);
}

function ensureRealtimeMapSized() {
  if (!realtimeState.typhoonMap) return;
  realtimeState.typhoonMap.invalidateSize();
  if (realtimeState.typhoonLayer) {
    const bounds = realtimeState.typhoonLayer.getBounds();
    if (bounds && bounds.isValid()) {
      realtimeState.typhoonMap.fitBounds(bounds, { padding: [20, 20] });
    }
  }
}

async function refreshRealtimeAll() {
  setRealtimeStatus("更新中...");
  const county = REALTIME_COUNTY;
  try {
    await Promise.all([
      loadWeatherAlerts(),
      loadForecast(county),
      loadLiveTyphoon(),
      loadNCUEObservation(),
      loadAqiData(),
    ]);
    setRealtimeStatus("已完成最新一次更新。");
  } catch (err) {
    console.error(err);
    setRealtimeStatus(err.message || "更新即時資料失敗");
  }
}

function clearRealtimeDisplay() {
  if (dom.alertList) dom.alertList.innerHTML = "";
  if (dom.forecastSlots) dom.forecastSlots.innerHTML = "";
  if (dom.typhoonLiveList) dom.typhoonLiveList.innerHTML = "";
  if (dom.ncueObservation) dom.ncueObservation.innerHTML = "";
  if (dom.aqiObservation) dom.aqiObservation.innerHTML = "";
  if (dom.ncueStatus) dom.ncueStatus.textContent = "尚未載入";
  if (dom.aqiStatus) dom.aqiStatus.textContent = "尚未載入";
  if (realtimeState.typhoonLayer && realtimeState.typhoonMap) {
    realtimeState.typhoonMap.removeLayer(realtimeState.typhoonLayer);
    realtimeState.typhoonLayer = null;
  }
  setRealtimeStatus("已清空資料。");
}

async function fetchCwaDataset(datasetId, params = {}) {
  const search = new URLSearchParams({ format: "JSON", ...params });
  if (CWA_API_KEY) search.set("Authorization", CWA_API_KEY);
  const url = `${CWA_BASE}/${datasetId}?${search.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`無法取得 ${datasetId}（${res.status}）`);
  }
  const data = await res.json();
  if (data?.success === "false") {
    const msg = data?.result?.message || "CWA 回應錯誤";
    throw new Error(msg);
  }
  return data;
}

async function loadWeatherAlerts() {
  setRealtimeStatus("讀取天氣警特報...");
  try {
    const data = await fetchCwaDataset("W-C0033-001");
    const list = normalizeAlerts(data);
    renderAlerts(list);
    realtimeState.alertCache = list;
    setRealtimeStatus(list.length ? `已更新 ${list.length} 則警特報` : "目前無警特報。");
  } catch (err) {
    console.error(err);
    renderAlerts([]);
    setRealtimeStatus(err.message || "讀取警特報失敗");
  }
}

function normalizeAlerts(payload) {
  const records = payload?.records || payload?.Records || {};
  const list = [];
  const locs = records.location || records.locations || [];
  const ensureArr = (val) => (Array.isArray(val) ? val : val != null ? [val] : []);
  const collectHazards = (loc) => {
    const collected = [];
    const hc = loc.hazardConditions;
    if (hc) {
      if (Array.isArray(hc)) {
        hc.forEach((h) => {
          collected.push(...ensureArr(h?.hazardCondition));
          collected.push(...ensureArr(h?.hazards));
        });
      } else {
        collected.push(...ensureArr(hc.hazardCondition));
        collected.push(...ensureArr(hc.hazards));
      }
    }
    collected.push(...ensureArr(loc.hazardCondition));
    collected.push(...ensureArr(loc.conditions));
    return collected;
  };

  locs.forEach((loc) => {
    const locNameNorm = normalizeCountyName(loc.locationName || loc.county || "");
    const hazards = collectHazards(loc);
    hazards.forEach((h) => {
      const info = h.info || {};
      const valid = h.validTime || h.time || {};
      const areaRaw = loc.locationName || loc.county || h.locationName || h.areaName || info.areaName || "全區";
      list.push({
        area: normalizeCountyName(areaRaw),
        locArea: locNameNorm,
        areaRaw,
        title:
          h.event ||
          h.hazardDesc ||
          h.hazardType ||
          h.headline ||
          info.phenomena ||
          info.event ||
          "警特報",
        desc: h.description || h.hazardDesc || h.info || h.content || info.description || "",
        start: h.startTime || h.start || h.publishTime || valid.startTime || valid.start,
        end: h.endTime || h.end || valid.endTime || valid.end,
        severity: h.severity || h.significance || h.alertLevel || info.significance,
        raw: h,
        info,
      });
    });
  });
  const direct = records.alert || records.alerts;
  if (Array.isArray(direct)) {
    direct.forEach((h) => {
      list.push({
        area: h.areaName || h.locationName || "全區",
        title: h.title || h.headline || h.event || "警特報",
        desc: h.description || h.summary || "",
        start: h.startTime || h.publishTime,
        end: h.endTime,
        severity: h.severity || h.significance,
      });
    });
  }
  return list;
}

function buildLocalAlerts() {
  const alerts = [];
  const obs = realtimeState.latestObservation;
  const aqi = realtimeState.latestAqi;
  const add = (title) => {
    alerts.push({
      area: REALTIME_COUNTY,
      title: "即時提醒",
      desc: title,
      severity: "提醒",
    });
  };

  if (obs) {
    if (Number.isFinite(obs.temp) && obs.temp >= 34) add("溫度 ≥ 34（目前溫度偏高）");
    if (Number.isFinite(obs.temp) && obs.temp <= 12) add("溫度 ≤ 12（目前溫度偏低）");
    if (Number.isFinite(obs.apparent) && obs.apparent >= 34) add("體感溫度 ≥ 34（目前體感溫度偏高）");
    if (Number.isFinite(obs.apparent) && obs.apparent <= 12) add("體感溫度 ≤ 12（目前體感溫度偏低）");
    if (Number.isFinite(obs.humidity) && obs.humidity < 50) add("濕度 < 50%（目前濕度偏低）");
    const windLevel = windToBeaufortLevel(obs.windSpeed);
    const gustLevel = windToBeaufortLevel(obs.gust);
    if (Number.isFinite(windLevel) && windLevel >= 4) add("風速 ≥ 4級（目前風速偏大）");
    if (Number.isFinite(gustLevel) && gustLevel >= 6) add("陣風 ≥ 6級（目前陣風偏大）");
    if (Number.isFinite(obs.rain) && obs.rain >= 30) add("雨量 ≥ 30（今日雨量偏大）");
  }

  if (aqi) {
    if (Number.isFinite(aqi.aqi) && aqi.aqi >= 101) add("AQI ≥ 101（目前空氣品質較差）");
    if (Number.isFinite(aqi.pm25) && aqi.pm25 >= 30) add("PM2.5 ≥ 30（目前細懸浮微粒值偏高）");
    if (Number.isFinite(aqi.pm10) && aqi.pm10 >= 76) add("PM10 ≥ 76（目前懸浮微粒值偏高）");
    if (Number.isFinite(aqi.o3) && aqi.o3 >= 101) add("O3 ≥ 101（目前臭氧濃度偏高）");
    if (Number.isFinite(aqi.so2) && aqi.so2 >= 66) add("SO2 ≥ 66（目前二氧化硫偏高）");
    if (Number.isFinite(aqi.no2) && aqi.no2 >= 101) add("NO2 ≥ 101（目前氮氧化物偏高）");
    if (Number.isFinite(aqi.co) && aqi.co >= 9.5) add("CO ≥ 9.5（目前一氧化碳偏高）");
  }

  return alerts;
}

function renderAlerts(list) {
  if (!dom.alertList) return;
  const county = normalizeCountyName(REALTIME_COUNTY);
  let filtered = list;
  if (county) {
    filtered = list.filter((a) => {
      const aArea = normalizeCountyName(a.area);
      const aAreaRaw = normalizeCountyName(a.areaRaw);
      const locArea = normalizeCountyName(a.locArea);
      return aArea === county || aAreaRaw === county || locArea === county;
    });
  }

  const localAlerts = buildLocalAlerts();
  // 嚴格依縣市過濾；若該縣市沒有特報，仍顯示本地提醒
  const useList = county ? localAlerts.concat(filtered) : localAlerts.concat(list);

  if (!useList.length) {
    dom.alertList.innerHTML = `<div class="alert-item">${county ? `目前 ${county} 沒有警特報。` : "目前沒有警特報。"}</div>`;
    dom.alertList.classList.add("ghost-status");
    return;
  }
  dom.alertList.classList.remove("ghost-status");
  dom.alertList.innerHTML = useList
    .map((a) => {
      const range = formatTimeRange(a.start, a.end);
      const descText = range ? `持續時間：${range}` : formatAlertDesc(a.desc, a.raw);
      return `<div class="alert-item">
        <h4 class="alert-title">${sanitizeText(a.title || "警特報")}</h4>
        <div class="alert-meta">
          ${a.area ? `<span class="badge">影響區：${sanitizeText(a.area)}</span>` : ""}
          ${a.severity ? `<span class="badge">${sanitizeText(a.severity)}</span>` : ""}
        </div>
        ${descText ? `<p class="alert-desc">${sanitizeText(descText)}</p>` : ""}
      </div>`;
    })
    .join("");
}

async function loadForecast(county) {
  if (!county) return;
  setRealtimeStatus(`讀取 ${county} 36 小時預報...`);
  try {
    const data = await fetchCwaDataset("F-C0032-001", { locationName: county });
    const slots = normalizeForecast(data, county);
    realtimeState.forecastCache.set(county, slots);
    renderForecast(slots, county);
    setRealtimeStatus(`已更新 ${county} 預報。`);
  } catch (err) {
    console.error(err);
    renderForecast([], county);
    setRealtimeStatus(err.message || `讀取 ${county} 預報失敗`);
  }
}

function normalizeForecast(payload, county) {
  const records = payload?.records || {};
  const locs = records.location || records.locations || [];
  const loc = locs.find((l) => l.locationName === county) || locs[0];
  if (!loc) return [];
  const elementMap = new Map();
  (loc.weatherElement || []).forEach((el) => {
    elementMap.set(el.elementName, el.time || []);
  });
  const lengths = Array.from(elementMap.values()).map((v) => v.length);
  const slotCount = lengths.length ? Math.max(...lengths) : 0;
  const slots = [];
  for (let i = 0; i < slotCount; i += 1) {
    slots.push({
      start: readElementTime(elementMap, i, "start"),
      end: readElementTime(elementMap, i, "end"),
      wx: readElementValue(elementMap, "Wx", i),
      pop: readElementValue(elementMap, "PoP12h", i) ?? readElementValue(elementMap, "PoP", i),
      minT: readElementValue(elementMap, "MinT", i) ?? readElementValue(elementMap, "T", i),
      maxT: readElementValue(elementMap, "MaxT", i),
      ci: readElementValue(elementMap, "CI", i),
      rh: readElementValue(elementMap, "RH", i),
      location: loc.locationName || county,
    });
  }
  return slots.filter((s) => s.start || s.wx || s.pop || s.minT || s.maxT);
}

function readElementTime(map, idx, key) {
  for (const arr of map.values()) {
    const slot = arr[idx];
    if (slot && (slot[`${key}Time`] || slot[`${key}time`] || slot[key] || slot.dataTime || slot.time)) {
      return slot[`${key}Time`] || slot[`${key}time`] || slot[key] || slot.dataTime || slot.time;
    }
  }
  return null;
}

function readElementValue(map, key, idx) {
  const arr = map.get(key);
  if (!arr || !arr[idx]) return null;
  const node = arr[idx];
  if (node.parameter) {
    return node.parameter.parameterName || node.parameter.parameterValue || node.parameter.value || null;
  }
  if (Array.isArray(node.elementValue) && node.elementValue.length) {
    const ev = node.elementValue[0];
    return ev.value ?? ev.elementValue ?? ev.measures ?? ev.parameterName ?? null;
  }
  if (node.value != null) return node.value;
  if (node.text) return node.text;
  return node.parameterName || null;
}

function renderForecast(slots, county) {
  if (!dom.forecastSlots) return;
  if (!slots.length) {
    dom.forecastSlots.innerHTML = '<div class="alert-item">找不到預報資料。</div>';
    dom.forecastSlots.classList.add("ghost-status");
    return;
  }
  dom.forecastSlots.classList.remove("ghost-status");
  dom.forecastSlots.innerHTML = slots
    .slice(0, 4)
    .map((s, idx) => {
      const range = formatTimeRange(s.start, s.end);
      return `<div class="forecast-card">
        <div class="forecast-header">
          <div>
            <div class="eyebrow">${sanitizeText(s.location || county)}</div>
            <div class="forecast-range">${sanitizeText(range || `時段 ${idx + 1}`)}</div>
          </div>
          ${s.wx ? `<span class="badge">${sanitizeText(s.wx)}</span>` : ""}
        </div>
        <div class="forecast-row"><span>降雨機率</span><span>${s.pop != null ? `${s.pop}%` : "—"}</span></div>
        <div class="forecast-row"><span>最高溫</span><span>${s.maxT != null ? `${s.maxT}°C` : "—"}</span></div>
        <div class="forecast-row"><span>最低溫</span><span>${s.minT != null ? `${s.minT}°C` : "—"}</span></div>
        <div class="forecast-row"><span>舒適度</span><span>${s.ci ?? "—"}</span></div>
        <div class="forecast-row"><span>相對濕度</span><span>${s.rh != null ? `${s.rh}%` : "—"}</span></div>
      </div>`;
    })
    .join("");
}
function setNCUEStatus(text) {
  if (dom.ncueStatus) {
    dom.ncueStatus.textContent = text;
  }
}

function setAqiStatus(text) {
  if (dom.aqiStatus) {
    dom.aqiStatus.textContent = text;
  }
}

async function loadNCUEObservation() {
  if (!dom.ncueObservation) return;
  setNCUEStatus("載入中...");
  try {
    const data = await fetchCwaDataset("O-A0003-001");
    const station = pickNCUEStation(data);
    if (!station) {
      dom.ncueObservation.innerHTML = "";
      setNCUEStatus("找不到彰師大測站資料");
      return;
    }
    renderNCUEObservation(station);
    setNCUEStatus("已更新");
  } catch (err) {
    console.error(err);
    dom.ncueObservation.innerHTML = "";
    setNCUEStatus(err.message || "載入失敗");
  }
}

function pickNCUEStation(payload) {
  const stations = extractCwaStations(payload);
  if (!stations.length) return null;
  const found = stations.find((s) => {
    const name = getStationName(s);
    return NCUE_STATION_KEYWORDS.some((k) => name.includes(k));
  });
  return found || stations[0];
}

function extractCwaStations(payload) {
  const records = payload?.records || {};
  const list =
    records.Station ||
    records.station ||
    records.Stations ||
    records.stations ||
    records.location ||
    records.locations;
  if (Array.isArray(list)) return list;
  if (list && Array.isArray(list.Station)) return list.Station;
  return [];
}

function getStationName(station) {
  const raw =
    station?.StationName ||
    station?.stationName ||
    station?.Station?.StationName ||
    station?.Station?.stationName ||
    station?.LocationName ||
    station?.locationName ||
    "";
  return String(raw);
}

function readWeatherElement(station, key) {
  const el =
    station?.WeatherElement ||
    station?.weatherElement ||
    station?.WeatherElements ||
    station?.weatherElements ||
    station?.Element ||
    station?.element ||
    null;
  if (!el) return null;
  if (Array.isArray(el)) {
    const found = el.find((e) => e.ElementName === key || e.elementName === key);
    if (!found) return null;
    return found.ElementValue ?? found.elementValue ?? found.Value ?? found.value ?? null;
  }
  const node = el[key] ?? el[key.toLowerCase?.() ?? key];
  if (node == null) return null;
  if (typeof node === "object") {
    return node.ElementValue ?? node.Value ?? node.value ?? node.elementValue ?? null;
  }
  return node;
}

function readWeatherNested(station, path) {
  const el =
    station?.WeatherElement ||
    station?.weatherElement ||
    station?.WeatherElements ||
    station?.weatherElements ||
    station?.Element ||
    station?.element ||
    null;
  if (!el) return null;
  const parts = path.split(".");
  let cursor = el;
  for (const part of parts) {
    if (cursor == null) return null;
    cursor = cursor[part] ?? cursor[part.toLowerCase?.() ?? part];
  }
  if (cursor == null) return null;
  if (typeof cursor === "object") {
    return cursor.ElementValue ?? cursor.Value ?? cursor.value ?? cursor.elementValue ?? null;
  }
  return cursor;
}

function toNumber(value) {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatValue(value, unit = "", digits = 1) {
  if (value == null) return "—";
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  const fixed = typeof digits === "number" ? num.toFixed(digits) : String(num);
  return `${fixed}${unit}`;
}

function formatObsTime(value) {
  if (!value) return "";
  const raw = String(value).trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2})/);
  if (!match) return raw.replace("T", " ").replace(/[-/]/g, "/");
  const [, y, m, d, t] = match;
  return `${y}/${m}/${d} ${t}`;
}

function formatWindDirection(value) {
  const deg = Number(value);
  if (!Number.isFinite(deg)) return "—";
  const dirs = [
    "北",
    "北北東",
    "東北",
    "東北東",
    "東",
    "東南東",
    "東南",
    "南南東",
    "南",
    "南南西",
    "西南",
    "西南西",
    "西",
    "西北西",
    "西北",
    "北北西",
  ];
  const idx = Math.round(((deg % 360) / 22.5)) % 16;
  return `${dirs[idx]} (${deg}°)`;
}

function windToBeaufort(mps) {
  const v = Number(mps);
  if (!Number.isFinite(v)) return "--";
  const scale = [
    [0.0, 0.2, "靜風"],
    [0.3, 1.5, "1級"],
    [1.6, 3.3, "2級"],
    [3.4, 5.4, "3級"],
    [5.5, 7.9, "4級"],
    [8.0, 10.7, "5級"],
    [10.8, 13.8, "6級"],
    [13.9, 17.1, "7級"],
    [17.2, 20.7, "8級"],
    [20.8, 24.4, "9級"],
    [24.5, 28.4, "10級"],
    [28.5, 32.6, "11級"],
    [32.7, 36.9, "12級"],
    [37.0, 41.4, "13級"],
    [41.5, 46.1, "14級"],
    [46.2, 50.9, "15級"],
    [51.0, 56.0, "16級"],
    [56.1, 61.2, "17級"],
  ];
  for (const [low, high, label] of scale) {
    if (v >= low && v <= high) return label;
  }
  return "17級以上";
}

function windToBeaufortLevel(mps) {
  const v = Number(mps);
  if (!Number.isFinite(v)) return NaN;
  const scale = [
    [0.0, 0.2, 0],
    [0.3, 1.5, 1],
    [1.6, 3.3, 2],
    [3.4, 5.4, 3],
    [5.5, 7.9, 4],
    [8.0, 10.7, 5],
    [10.8, 13.8, 6],
    [13.9, 17.1, 7],
    [17.2, 20.7, 8],
    [20.8, 24.4, 9],
    [24.5, 28.4, 10],
    [28.5, 32.6, 11],
    [32.7, 36.9, 12],
    [37.0, 41.4, 13],
    [41.5, 46.1, 14],
    [46.2, 50.9, 15],
    [51.0, 56.0, 16],
    [56.1, 61.2, 17],
  ];
  for (const [low, high, level] of scale) {
    if (v >= low && v <= high) return level;
  }
  return 18;
}

function calcApparentTemp(temperature, humidity, windMps) {
  const T = Number(temperature);
  const RH = Number(humidity);
  const V = Number(windMps);
  if (!Number.isFinite(T) || !Number.isFinite(RH) || !Number.isFinite(V)) {
    return temperature;
  }
  const e = (RH / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));
  const at = 1.04 * T + 0.2 * e - 0.65 * V - 2.7;
  return Math.round(at * 10) / 10;
}

function renderNCUEObservation(station) {
  if (!dom.ncueObservation) return;
  const name = getStationName(station) || "彰師大測站";
  const obsTime =
    station?.ObsTime?.DateTime ||
    station?.ObsTime?.dateTime ||
    station?.ObsTime?.LocalTime ||
    station?.obsTime?.dateTime ||
    station?.obsTime?.DateTime ||
    "";
  const obsTimeFormatted = formatObsTime(obsTime);
  const temp = toNumber(readWeatherElement(station, "AirTemperature"));
  let humidity = toNumber(readWeatherElement(station, "RelativeHumidity"));
  if (humidity != null && humidity <= 1) humidity *= 100;
  const windSpeed = toNumber(readWeatherElement(station, "WindSpeed"));
  const windDir = toNumber(readWeatherElement(station, "WindDirection"));
  const gustRaw =
    toNumber(readWeatherNested(station, "GustInfo.PeakGustSpeed")) ??
    toNumber(readWeatherNested(station, "Max10MinAverage.WindSpeed")) ??
    toNumber(readWeatherElement(station, "Max10MinAverage")) ??
    toNumber(readWeatherElement(station, "Max10MinAverageWindSpeed")) ??
    toNumber(readWeatherElement(station, "Max10MinWindSpeed")) ??
    toNumber(readWeatherElement(station, "GustWindSpeed")) ??
    toNumber(readWeatherElement(station, "PeakGustSpeed"));
  const rain =
    toNumber(readWeatherElement(station, "NowPrecipitation")) ??
    toNumber(readWeatherElement(station, "Precipitation")) ??
    toNumber(readWeatherElement(station, "HourlyPrecipitation")) ??
    toNumber(readWeatherElement(station, "DailyRainfall"));
  const weather = readWeatherElement(station, "Weather");
  const windLevel = windToBeaufort(windSpeed);
  const gustLevel = windToBeaufort(gustRaw);
  const apparent = calcApparentTemp(temp, humidity, windSpeed);
  realtimeState.latestObservation = {
    temp,
    apparent,
    humidity,
    windSpeed,
    gust: gustRaw,
    rain,
    weather,
    obsTime: obsTimeFormatted || "",
  };
  const rows = [
    { label: "測站", value: name },
    { label: "觀測時間", value: obsTimeFormatted || "—" },
    { label: "氣溫", value: formatValue(temp, "°C", 1) },
    { label: "體感溫度", value: formatValue(apparent, "°C", 1) },
    { label: "相對濕度", value: formatValue(humidity, "%", 0) },
    {
      label: "風速",
      value: windSpeed != null ? `${windLevel} (${formatValue(windSpeed, " m/s", 1)})` : "—",
    },
    { label: "風向", value: formatWindDirection(windDir) },
    {
      label: "陣風",
      value: gustRaw != null ? `${gustLevel} (${formatValue(gustRaw, " m/s", 1)})` : "—",
    },
    { label: "降雨量", value: formatValue(rain, " mm", 1) },
    { label: "天氣現象", value: weather ? String(weather) : "—" },
  ];
  dom.ncueObservation.innerHTML = rows
    .map((r) => `<div class="data-row"><span>${sanitizeText(r.label)}</span><strong>${sanitizeText(r.value)}</strong></div>`)
    .join("");
  if (realtimeState.alertCache) {
    renderAlerts(realtimeState.alertCache);
  }
}

async function loadAqiData() {
  if (!dom.aqiObservation) return;
  setAqiStatus("載入中...");
  try {
    const data = await fetchAqiDataset();
    const record = pickAqiRecord(data);
    if (!record) {
      dom.aqiObservation.innerHTML = "";
      setAqiStatus("找不到彰化測站 AQI");
      return;
    }
    renderAqi(record);
    setAqiStatus("已更新");
  } catch (err) {
    console.error(err);
    dom.aqiObservation.innerHTML = "";
    setAqiStatus(err.message || "載入失敗");
  }
}

async function fetchAqiDataset() {
  const params = new URLSearchParams({ format: "json", limit: "200" });
  if (AQI_API_KEY) params.set("api_key", AQI_API_KEY);
  const url = `${AQI_ENDPOINT}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`AQI 讀取失敗 (${res.status})`);
  }
  return res.json();
}

function pickAqiRecord(payload) {
  const records = payload?.records || payload?.data || [];
  if (!Array.isArray(records)) return null;
  return (
    records.find((r) => {
      const name = String(r.sitename || r.siteName || r.SiteName || "");
      return AQI_SITE_KEYWORDS.some((k) => name.includes(k));
    }) ||
    records.find((r) => {
      const county = String(r.county || r.County || "");
      const name = String(r.sitename || r.siteName || r.SiteName || "");
      return county.includes("彰化") && name.includes("彰化");
    }) ||
    null
  );
}

function renderAqi(record) {
  if (!dom.aqiObservation) return;
  realtimeState.latestAqi = {
    aqi: toNumber(record.aqi ?? record.AQI),
    pm25: toNumber(record["pm2.5"] ?? record.pm25),
    pm10: toNumber(record.pm10),
    o3: toNumber(record.o3),
    no2: toNumber(record.no2),
    so2: toNumber(record.so2),
    co: toNumber(record.co),
  };
  const pm25Val = toNumber(record["pm2.5"] ?? record.pm25);
  const pm10Val = toNumber(record.pm10);
  const o3Val = toNumber(record.o3);
  const no2Val = toNumber(record.no2);
  const so2Val = toNumber(record.so2);
  const coVal = toNumber(record.co);
  const rows = [
    { label: "測站", value: record.sitename || record.siteName || record.SiteName || "彰化" },
    { label: "發布時間", value: record.publishtime || record.PublishTime || "—" },
    { label: "AQI", value: record.aqi ?? record.AQI ?? "—" },
    { label: "狀態", value: record.status || record.Status || "—" },
    { label: "PM2.5", value: pm25Val != null ? `${pm25Val} (μg/m3)` : "—" },
    { label: "PM10", value: pm10Val != null ? `${pm10Val} (μg/m3)` : "—" },
    { label: "O3", value: o3Val != null ? `${o3Val} (ppb)` : "—" },
    { label: "NO2", value: no2Val != null ? `${no2Val} (ppb)` : "—" },
    { label: "SO2", value: so2Val != null ? `${so2Val} (ppb)` : "—" },
    { label: "CO", value: coVal != null ? `${coVal} (ppm)` : "—" },
  ];
  dom.aqiObservation.innerHTML = rows
    .map((r) => `<div class="data-row"><span>${sanitizeText(r.label)}</span><strong>${sanitizeText(r.value)}</strong></div>`)
    .join("");
  if (realtimeState.alertCache) {
    renderAlerts(realtimeState.alertCache);
  }
}
async function loadLiveTyphoon() {
  setRealtimeStatus("讀取即時颱風消息...");
  try {
    const data = await fetchCwaDataset("W-C0034-005");
    const typhoons = normalizeTyphoon(data);
    renderLiveTyphoon(typhoons);
    setRealtimeStatus(typhoons.length ? "已更新即時颱風資訊。" : "目前沒有最新颱風消息。");
  } catch (err) {
    console.error(err);
    renderLiveTyphoon([]);
    setRealtimeStatus(err.message || "讀取颱風資料失敗");
  }
}

function normalizeTyphoon(payload) {
  const records = payload?.records || {};
  const list = [];
  const arr = records.typhoon || records.typhoons || records.tropicalCyclone || records.cyclone || [];
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      const track = extractTrackPoints(item);
      list.push({
        name: item.cwaTyphoonName || item.typhoonName || item.name || item.title || item.id,
        id: item.typhoonId || item.no || item.serial || item.id,
        status: item.status || item.alertLevel || item.typhoonStatus,
        time: item.issueTime || item.publishTime || item.time || item.dataTime,
        text: item.description || item.summary || item.remark || item.text,
        track,
      });
    });
  }
  if (!list.length && Array.isArray(records.typhoonInfos)) {
    records.typhoonInfos.forEach((item) => {
      list.push({
        name: item.name || item.title || item.id,
        id: item.id,
        status: item.status,
        time: item.issueTime || item.publishTime,
        text: item.remark || item.description,
        track: extractTrackPoints(item),
      });
    });
  }
  return list;
}

function renderLiveTyphoon(list) {
  if (!dom.typhoonLiveList) return;
  if (realtimeState.typhoonLayer && realtimeState.typhoonMap) {
    realtimeState.typhoonMap.removeLayer(realtimeState.typhoonLayer);
    realtimeState.typhoonLayer = null;
  }
  if (!list.length) {
    dom.typhoonLiveList.innerHTML = '<div class="typhoon-live-item">目前沒有颱風警報或資料尚未提供。</div>';
    dom.typhoonLiveList.classList.add("ghost-status");
    return;
  }
  dom.typhoonLiveList.classList.remove("ghost-status");
  dom.typhoonLiveList.innerHTML = list
    .map((t) => {
      return `<div class="typhoon-live-item">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <strong>${sanitizeText(t.name || "未命名")}</strong>
          ${t.status ? `<span class="badge">${sanitizeText(t.status)}</span>` : ""}
          ${t.id ? `<span class="badge">#${sanitizeText(t.id)}</span>` : ""}
        </div>
        ${t.time ? `<div class="forecast-range">發布時間：${sanitizeText(t.time)}</div>` : ""}
        ${t.text ? `<p class="alert-desc">${sanitizeText(t.text)}</p>` : ""}
      </div>`;
    })
    .join("");

  // 繪製第一筆可用的路徑
  const track = list.find((t) => t.track && t.track.length)?.track;
  if (track && realtimeState.typhoonMap) {
    realtimeState.typhoonLayer = L.polyline(
      track.map((p) => [p.lat, p.lon]),
      { color: "#2563eb", weight: 4, opacity: 0.9 }
    ).addTo(realtimeState.typhoonMap);
    try {
      const bounds = realtimeState.typhoonLayer.getBounds();
      if (bounds.isValid()) {
        realtimeState.typhoonMap.fitBounds(bounds, { padding: [20, 20] });
      }
    } catch (_) {
      // ignore
    }
  }
}

function extractTrackPoints(obj) {
  if (!obj || typeof obj !== "object") return [];
  let found = null;
  function walk(node) {
    if (found) return;
    if (Array.isArray(node)) {
      const pts = node.map(parseTrackPoint).filter(Boolean);
      if (pts.length >= 2) {
        found = pts;
        return;
      }
      node.forEach(walk);
    } else if (node && typeof node === "object") {
      Object.values(node).forEach(walk);
    }
  }
  walk(obj);
  return found || [];
}

function parseTrackPoint(p) {
  if (!p || typeof p !== "object") return null;
  const lat =
    Number(p.lat ?? p.latitude ?? p.Latitude ?? p.LAT ?? p.latitute ?? p.Lat ?? p.緯度);
  const lon =
    Number(p.lon ?? p.longitude ?? p.Longitude ?? p.LON ?? p.lonitude ?? p.Lon ?? p.經度);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    lat,
    lon,
    time: p.time || p.dateTime || p.DateTime || p.datetime,
  };
}

function sanitizeText(text) {
  return String(text ?? "").replace(/[<>]/g, "");
}

function normalizeCountyName(name) {
  const raw = String(name || "").trim();
  if (!raw) return "";
  const map = {
    台北市: "臺北市",
    台中市: "臺中市",
    台南市: "臺南市",
    台東縣: "臺東縣",
    彰化縣: "彰化縣",
    雲林縣: "雲林縣",
    南投縣: "南投縣",
    屏東縣: "屏東縣",
    高雄市: "高雄市",
    桃園縣: "桃園市",
    花蓮縣: "花蓮縣",
    苗栗縣: "苗栗縣",
    新北市: "新北市",
    基隆市: "基隆市",
    新竹市: "新竹市",
    新竹縣: "新竹縣",
    宜蘭縣: "宜蘭縣",
    澎湖縣: "澎湖縣",
    金門縣: "金門縣",
    連江縣: "連江縣",
    嘉義縣: "嘉義縣",
    嘉義市: "嘉義市",
  };
  return map[raw] || raw;
}

function formatTimeRange(start, end) {
  if (!start && !end) return "";
  if (start && end) return `${start} ~ ${end}`;
  return start || end || "";
}


function formatAlertDesc(desc, raw) {
  if (desc == null) return "";
  if (typeof desc === "string") return desc;
  if (typeof desc === "object") {
    // 常見格式： { language, phenomena, significance } or nested info
    const parts = [];
    const tryKeys = ["description", "phenomena", "significance", "event", "headline", "info"];
    tryKeys.forEach((k) => {
      const v = desc[k] ?? raw?.[k];
      if (typeof v === "string") parts.push(v);
    });
    if (parts.length) return parts.join(" / ");
    return JSON.stringify(desc);
  }
  return String(desc);
}

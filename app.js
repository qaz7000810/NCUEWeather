const metricConfigs = {
  TX01: { label: "氣溫 (°C)", mode: "mean", color: "#5be4a8", index: 2 },
  PP01: { label: "降雨量 (mm)", mode: "sum", color: "#4ea3ff", index: 5 },
  RH01: { label: "相對濕度 (%)", mode: "mean", color: "#fcb97d", index: 3 },
  WD01: { label: "風速 (m/s)", mode: "mean", color: "#ff7eb6", index: 4 },
};

const dom = {
  countySelect: document.getElementById("countySelect"),
  stationSelect: document.getElementById("stationSelect"),
  rollupSelect: document.getElementById("rollupSelect"),
  rangeStart: document.getElementById("rangeStart"),
  rangeEnd: document.getElementById("rangeEnd"),
  rangeLabel: document.getElementById("rangeLabel"),
  chartRangeStart: document.getElementById("chartRangeStart"),
  chartRangeEnd: document.getElementById("chartRangeEnd"),
  chartRangeLabel: document.getElementById("chartRangeLabel"),
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
  reloadRadarBtn: document.getElementById("reloadRadarBtn"),
  clearRealtimeBtn: document.getElementById("clearRealtimeBtn"),
  liveTyphoonMap: document.getElementById("liveTyphoonMap"),
  typhoonLiveList: document.getElementById("typhoonLiveList"),
  radarMap: document.getElementById("radarMap"),
  radarStatus: document.getElementById("radarStatus"),
  reloadNCUEBtn: document.getElementById("reloadNCUEBtn"),
  ncueStatus: document.getElementById("ncueStatus"),
  ncueObservation: document.getElementById("ncueObservation"),
  reloadAqiBtn: document.getElementById("reloadAqiBtn"),
  aqiStatus: document.getElementById("aqiStatus"),
  aqiObservation: document.getElementById("aqiObservation"),
  rankingMetric: document.getElementById("rankingMetric"),
  rankingStatus: document.getElementById("rankingStatus"),
  rankingTableBody: document.getElementById("rankingTableBody"),
  rankingCounty: document.getElementById("rankingCounty"),
  rankingValueHeader: document.getElementById("rankingValueHeader"),
  rankingTable: document.getElementById("rankingTable"),
  rankingDataTime: document.getElementById("rankingDataTime"),
  rankingPager: document.getElementById("rankingPager"),
  rankingMap: document.getElementById("rankingMap"),
  reloadRankingBtn: document.getElementById("reloadRankingBtn"),
  rankingColorbar: document.getElementById("rankingColorbar"),
  taiwanRankingMetric: document.getElementById("taiwanRankingMetric"),
  taiwanRankingStatus: document.getElementById("taiwanRankingStatus"),
  taiwanRankingTableBody: document.getElementById("taiwanRankingTableBody"),
  taiwanRankingCounty: document.getElementById("taiwanRankingCounty"),
  taiwanRankingValueHeader: document.getElementById("taiwanRankingValueHeader"),
  taiwanRankingTable: document.getElementById("taiwanRankingTable"),
  taiwanRankingDataTime: document.getElementById("taiwanRankingDataTime"),
  taiwanRankingPager: document.getElementById("taiwanRankingPager"),
  taiwanRankingMap: document.getElementById("taiwanRankingMap"),
  taiwanReloadRankingBtn: document.getElementById("taiwanReloadRankingBtn"),
  taiwanRankingColorbar: document.getElementById("taiwanRankingColorbar"),
  disasterMetric: document.getElementById("disasterMetric"),
  disasterStatus: document.getElementById("disasterStatus"),
  disasterTableBody: document.getElementById("disasterTableBody"),
  disasterValueHeader: document.getElementById("disasterValueHeader"),
  disasterTable: document.getElementById("disasterTable"),
  disasterDataTime: document.getElementById("disasterDataTime"),
  disasterPager: document.getElementById("disasterPager"),
  disasterMap: document.getElementById("disasterMap"),
  disasterReloadBtn: document.getElementById("disasterReloadBtn"),
  disasterColorbar: document.getElementById("disasterColorbar"),
  healthMetric: document.getElementById("healthMetric"),
  healthMode: document.getElementById("healthMode"),
  healthWindow: document.getElementById("healthWindow"),
  healthStatus: document.getElementById("healthStatus"),
  healthTableBody: document.getElementById("healthTableBody"),
  healthValueHeader: document.getElementById("healthValueHeader"),
  healthTable: document.getElementById("healthTable"),
  healthDataTime: document.getElementById("healthDataTime"),
  healthPager: document.getElementById("healthPager"),
  healthMap: document.getElementById("healthMap"),
  healthReloadBtn: document.getElementById("healthReloadBtn"),
  healthColorbar: document.getElementById("healthColorbar"),
  healthTimelineWrap: document.getElementById("healthTimelineWrap"),
  healthTimeline: document.getElementById("healthTimeline"),
  healthTimelineLabel: document.getElementById("healthTimelineLabel"),
};

let fileIndex = [];
let stationsMeta = [];
const charts = {};
const fileCache = new Map();
const dailyCache = new Map();
const historicalViewState = {
  labelCount: 0,
  start: 0,
  end: 0,
  syncing: false,
};

if (typeof Chart !== "undefined") {
  const zoomPlugin = window.ChartZoom || window["chartjs-plugin-zoom"];
  if (zoomPlugin) {
    Chart.register(zoomPlugin);
  }
}

const realtimeState = {
  forecastCache: new Map(),
  alertCache: null,
  typhoonMap: null,
  typhoonLayer: null,
  radarMap: null,
  radarLayer: null,
  radarTime: null,
  countiesGeo: null,
  latestObservation: null,
  latestAqi: null,
};

const rankingState = {
  map: null,
  townLayer: null,
  stationLayer: null,
  townGeo: null,
  entries: [],
  activeRow: null,
  activeMarker: null,
  sortDir: "desc",
  page: 1,
  countyCodeMap: null,
};

const taiwanRankingState = {
  map: null,
  townLayer: null,
  stationLayer: null,
  townGeo: null,
  entries: [],
  activeRow: null,
  activeMarker: null,
  sortDir: "desc",
  page: 1,
  countyCodeMap: null,
};

const disasterState = {
  map: null,
  townLayer: null,
  stationLayer: null,
  townGeo: null,
  entries: [],
  activeRow: null,
  activeMarker: null,
  sortDir: "desc",
  page: 1,
  countyCodeMap: null,
};

const healthState = {
  map: null,
  townLayer: null,
  stationLayer: null,
  townGeo: null,
  entries: [],
  activeRow: null,
  activeMarker: null,
  sortDir: "desc",
  page: 1,
  countyCodeMap: null,
  timelineKeys: [],
  timelineEntries: new Map(),
  timelineIndex: 0,
};

const CWA_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/rest/datastore";
const CWA_FILEAPI_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/fileapi/v1/opendataapi";
const GEO_ASSETS_BASE = "https://raw.githubusercontent.com/qaz7000810/geo-assets/main";
const GEO_ASSETS_CDN_BASE = "https://cdn.jsdelivr.net/gh/qaz7000810/geo-assets@main";
const GEO_ASSETS_PAGES_BASE = "https://qaz7000810.github.io/geo-assets";
const CHANGHUA_DATA_BASE = `${GEO_ASSETS_BASE}/changhua`;
const TYPHOON_COUNTIES_URL = `${GEO_ASSETS_BASE}/typhoon/counties.geojson`;
const RADAR_DATASET = "O-A0059-001";
const RADAR_LEVELS = [0, 5, 10, 20, 30, 40, 50, 60];
const RADAR_COLORS = ["#d2f5ff", "#9be7ff", "#5bc0ff", "#1f78ff", "#00d26a", "#f6f930", "#ff8c1a", "#ff2d2d"];
const CWA_API_KEY = "";
const NCUE_STATION_KEYWORDS = ["彰師大", "彰化師大", "國立彰化師範大學", "NCUE"];
const AQI_ENDPOINT = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/aqi";
const AQI_SITE_KEYWORDS = ["彰化"];
const AQI_API_KEY = "";
const REALTIME_COUNTY = "彰化縣";
const RANKING_DATASET = "O-A0001-001";
const RAIN_DATASET = "O-A0002-001";
const COLD_INJURY_DATASET = "F-A0085-003";
const TEMP_DIFF_DATASET = "F-A0085-005";
const HEAT_INJURY_DATASET = "M-A0085-001";
const TOWN_NAME_FIELD = "名稱";
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

const RAIN_COLORS_BASE = [
  "#ffffff",
  "#f0f0f0",
  "#e3f6ff",
  "#bdeaff",
  "#8fd5ff",
  "#64c2ff",
  "#3bb1ff",
  "#18a1f5",
  "#07a9cf",
  "#0fbfbf",
  "#10cfa2",
  "#4fdc56",
  "#8ddc34",
  "#ace82a",
  "#e4f014",
  "#ffe000",
  "#ffbb00",
  "#ff8a00",
  "#ff5d00",
  "#ff2800",
  "#d80080",
  "#8e00c9",
  "#a200c6",
];

const RAIN_LEVELS_24HR = [0, 1, 2, 6, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 130, 160, 200, 250, 300, 350, 400, 500];
const RAIN_LEVELS_3HR = [0, 1, 2, 6, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200];
const RAIN_LEVELS_1HR = [0, 1, 2, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100];
const AQI_LEVELS = [0, 50, 100, 150, 200, 300];
const AQI_COLORS = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const PM25_LEVELS = [0, 15, 35, 55, 150, 250];
const PM25_COLORS = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const PM10_LEVELS = [0, 50, 100, 255, 355, 425];
const PM10_COLORS = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const O3_LEVELS = [0, 125, 165, 205, 405];
const O3_COLORS = ["#00e400", "#ff7e00", "#ff0000","#8f3f97", "#7e0023"];
const DISASTER_PM10_THRESHOLD = 255;
const DISASTER_O3_THRESHOLD = 125;
const HEALTH_WARNING_COLORS = ["#f5d64a", "#f39c34", "#dd4b39", "#9f1239"];
const HEALTH_WARNING_LEVELS = {
  coldInjury: [
    { level: 1, label: "注意", thresholdText: "<=10", keywords: ["注意"] },
    { level: 2, label: "警戒", thresholdText: "<=8", keywords: ["警戒"] },
    { level: 3, label: "危險", thresholdText: "<=6", keywords: ["危險"] },
    { level: 4, label: "高危險", thresholdText: "<=4", keywords: ["高危險"] },
  ],
  tempDiff: [
    { level: 1, label: "注意", thresholdText: "7-8", keywords: ["注意"] },
    { level: 2, label: "警戒", thresholdText: "9-10", keywords: ["警戒"] },
    { level: 3, label: "危險", thresholdText: "11-12", keywords: ["危險"] },
    { level: 4, label: "高危險", thresholdText: ">=13", keywords: ["高危險"] },
  ],
  heatInjury: [
    { level: 1, label: "注意", thresholdText: ">=32", keywords: ["注意"] },
    { level: 2, label: "警戒", thresholdText: ">=34", keywords: ["警戒"] },
    { level: 3, label: "危險", thresholdText: ">=36", keywords: ["危險"] },
    { level: 4, label: "高危險", thresholdText: ">=38", keywords: ["高危險"] },
  ],
};

const COUNTY_CODE_MAP = {
  彰化縣: "10007",
};

const rankingMetrics = {
  temp: {
    label: "即時氣溫",
    unit: "°C",
    value: (station) => toNumber(readWeatherElement(station, "AirTemperature")),
    direction: null,
    colorScale: "temp",
  },
  apparent: {
    label: "體感溫度",
    unit: "°C",
    value: (station) => {
      const temp = toNumber(readWeatherElement(station, "AirTemperature"));
      let humidity = toNumber(readWeatherElement(station, "RelativeHumidity"));
      if (humidity != null && humidity >= 0 && humidity <= 1) humidity *= 100;
      const windSpeed = toNumber(readWeatherElement(station, "WindSpeed"));
      return calcApparentTemp(temp, humidity, windSpeed);
    },
    direction: null,
    colorScale: "temp",
  },
  humidity: {
    label: "相對濕度",
    unit: "%",
    value: (station) => {
      let h = toNumber(readWeatherElement(station, "RelativeHumidity"));
      if (h != null && h <= 1) h *= 100;
      return h;
    },
    direction: null,
    colorScale: "humidity",
  },
  wind: {
    label: "平均風速",
    unit: "m/s",
    value: (station) => toNumber(readWeatherElement(station, "WindSpeed")),
    direction: (station) => toNumber(readWeatherElement(station, "WindDirection")),
    colorScale: "wind",
  },
  gust: {
    label: "最大陣風",
    unit: "m/s",
    value: (station) =>
      toNumber(readWeatherNested(station, "GustInfo.PeakGustSpeed")) ??
      toNumber(readWeatherElement(station, "PeakGustSpeed")) ??
      toNumber(readWeatherElement(station, "GustWindSpeed")),
    direction: (station) =>
      toNumber(readWeatherNested(station, "GustInfo.Occurred_at.WindDirection")) ??
      toNumber(readWeatherElement(station, "WindDirection")),
    colorScale: "wind",
  },
  rain: {
    label: "1小時雨量",
    unit: "mm",
    value: (station) =>
      toNumber(readRainElement(station, "Past1hr")) ??
      toNumber(readRainElement(station, "Now")),
    direction: null,
    colorScale: "rain",
  },
  rain3hr: {
    label: "3小時雨量",
    unit: "mm",
    value: (station) => toNumber(readRainElement(station, "Past3hr")),
    direction: null,
    colorScale: "rain",
  },
  rain24hr: {
    label: "24小時雨量",
    unit: "mm",
    value: (station) => toNumber(readRainElement(station, "Past24hr")),
    direction: null,
    colorScale: "rain",
  },
  thi: {
    label: "溫濕度指數 (THI)",
    unit: "",
    value: (station) => {
      const temp = toNumber(readWeatherElement(station, "AirTemperature"));
      let humidity = toNumber(readWeatherElement(station, "RelativeHumidity"));
      if (humidity != null && humidity <= 1) humidity *= 100;
      return computeThi(temp, humidity);
    },
    direction: null,
    colorScale: "thi",
  },
  aqi: {
    label: "AQI",
    unit: "",
    value: () => null,
    direction: null,
    colorScale: "aqi",
  },
  pm25: {
    label: "PM2.5",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm25",
  },
  pm10: {
    label: "PM10",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm10",
  },
  o3: {
    label: "臭氧",
    unit: "ppb",
    value: () => null,
    direction: null,
    colorScale: "o3",
  },
  coldInjury: {
    label: "冷傷害指數",
    unit: "",
    value: () => null,
    direction: null,
    colorScale: "health",
  },
  tempDiff: {
    label: "溫差提醒指數",
    unit: "",
    value: () => null,
    direction: null,
    colorScale: "health",
  },
  heatInjury: {
    label: "熱傷害指數",
    unit: "",
    value: () => null,
    direction: null,
    colorScale: "health",
  },
};

const rankingMetricKeys = ["temp", "apparent", "humidity", "wind", "gust", "rain", "rain3hr", "rain24hr", "thi", "aqi", "pm25", "pm10", "o3"];
const taiwanMetricKeys = [...rankingMetricKeys];

const disasterMetricKeys = ["temp", "apparent", "humidity", "wind", "gust", "rain", "rain3hr", "rain24hr", "aqi", "pm25", "pm10", "o3"];
const healthMetricKeys = ["coldInjury", "tempDiff", "heatInjury"];

const disasterView = {
  key: "disaster",
  dom: {
    metric: dom.disasterMetric,
    status: dom.disasterStatus,
    tableBody: dom.disasterTableBody,
    countySelect: null,
    valueHeader: dom.disasterValueHeader,
    table: dom.disasterTable,
    dataTime: dom.disasterDataTime,
    pager: dom.disasterPager,
    map: dom.disasterMap,
    reloadBtn: dom.disasterReloadBtn,
    colorbar: dom.disasterColorbar,
  },
  state: disasterState,
  geojsonUrl: "https://raw.githubusercontent.com/qaz7000810/geo-assets/main/townships.geojson",
  areaProp: "TOWNNAME",
  areaType: "town",
  showTownColumn: true,
  countyFilter: null,
  mapCenter: [23.7, 121],
  mapZoom: 7,
};

const healthView = {
  key: "health",
  dom: {
    metric: dom.healthMetric,
    mode: dom.healthMode,
    window: dom.healthWindow,
    status: dom.healthStatus,
    tableBody: dom.healthTableBody,
    countySelect: null,
    valueHeader: dom.healthValueHeader,
    table: dom.healthTable,
    dataTime: dom.healthDataTime,
    pager: dom.healthPager,
    map: dom.healthMap,
    reloadBtn: dom.healthReloadBtn,
    colorbar: dom.healthColorbar,
    timelineWrap: dom.healthTimelineWrap,
    timeline: dom.healthTimeline,
    timelineLabel: dom.healthTimelineLabel,
  },
  state: healthState,
  geojsonUrl: "https://raw.githubusercontent.com/qaz7000810/geo-assets/main/townships.geojson",
  areaProp: "TOWNNAME",
  areaType: "town",
  showTownColumn: true,
  countyFilter: null,
  mapCenter: [23.7, 121],
  mapZoom: 7,
};

const rankingViews = {
  changhua: {
    key: "changhua",
    dom: {
      metric: dom.rankingMetric,
      status: dom.rankingStatus,
      tableBody: dom.rankingTableBody,
      countySelect: dom.rankingCounty,
      valueHeader: dom.rankingValueHeader,
      table: dom.rankingTable,
      dataTime: dom.rankingDataTime,
      pager: dom.rankingPager,
      map: dom.rankingMap,
      reloadBtn: dom.reloadRankingBtn,
      colorbar: dom.rankingColorbar,
    },
    state: rankingState,
    geojsonUrl: "./data/changhua/changhua_townships.geojson",
    areaProp: "名稱",
    areaType: "town",
    showTownColumn: false,
    metricKeys: rankingMetricKeys,
    countyFilter: REALTIME_COUNTY,
    mapCenter: [23.98, 120.46],
    mapZoom: 10,
  },
  taiwan: {
    key: "taiwan",
    dom: {
      metric: dom.taiwanRankingMetric,
      status: dom.taiwanRankingStatus,
      tableBody: dom.taiwanRankingTableBody,
      countySelect: dom.taiwanRankingCounty,
      valueHeader: dom.taiwanRankingValueHeader,
      table: dom.taiwanRankingTable,
      dataTime: dom.taiwanRankingDataTime,
      pager: dom.taiwanRankingPager,
      map: dom.taiwanRankingMap,
      reloadBtn: dom.taiwanReloadRankingBtn,
      colorbar: dom.taiwanRankingColorbar,
    },
    state: taiwanRankingState,
    geojsonUrl: "https://raw.githubusercontent.com/qaz7000810/geo-assets/main/townships.geojson",
    areaProp: "TOWNNAME",
    areaType: "town",
    showTownColumn: true,
    metricKeys: taiwanMetricKeys,
    countyFilter: null,
    mapCenter: [23.7, 121],
    mapZoom: 7,
  },
};

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
  initRankingViews();
  initDisasterView();
  initHealthView();
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
      if (target === "rankings") {
        requestAnimationFrame(() => {
          ensureRankingMapSized(rankingViews.changhua);
        });
      }
      if (target === "taiwan-rankings") {
        requestAnimationFrame(() => {
          ensureRankingMapSized(rankingViews.taiwan);
        });
      }
      if (target === "disaster") {
        requestAnimationFrame(() => {
          ensureRankingMapSized(disasterView);
        });
      }
      if (target === "health") {
        requestAnimationFrame(() => {
          ensureRankingMapSized(healthView);
        });
      }
    });
  });
}

function bindEvents() {
  dom.rangeStart.addEventListener("input", syncRange);
  dom.rangeEnd.addEventListener("input", syncRange);
  dom.chartRangeStart?.addEventListener("input", syncChartRangeFromSlider);
  dom.chartRangeEnd?.addEventListener("input", syncChartRangeFromSlider);
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
  dom.reloadRadarBtn?.addEventListener("click", loadRadarComposite);
  dom.reloadNCUEBtn?.addEventListener("click", loadNCUEObservation);
  dom.reloadAqiBtn?.addEventListener("click", loadAqiData);
  dom.clearRealtimeBtn?.addEventListener("click", clearRealtimeDisplay);
  bindRankingViewEvents(rankingViews.changhua);
  bindRankingViewEvents(rankingViews.taiwan);
  bindDisasterViewEvents();
  bindHealthViewEvents();
}
async function loadIndex() {
  try {
    const res = await fetch(`${CHANGHUA_DATA_BASE}/fileIndex.json`);
    fileIndex = await res.json();
    fileIndex = (Array.isArray(fileIndex) ? fileIndex : []).map((item) => {
      const file = String(item?.file || "");
      const fixedPath = /^\d{6}99\.auto_hr\.txt$/i.test(file) ? `./data/changhua/hourly/${file}` : item?.path;
      return { ...item, path: fixedPath };
    });
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
    const res = await fetch(`${CHANGHUA_DATA_BASE}/stations_meta.json`);
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
  const targetCounty = normalizeCountyName(REALTIME_COUNTY);
  const counties = new Set(
    stationsMeta
      .filter((s) => !s.status || s.status === "existing")
      .map((s) => normalizeCountyName(s.county))
      .filter(Boolean)
  );
  const preferredCounty = counties.has(targetCounty) ? targetCounty : null;
  const options = preferredCounty
    ? [`<option value="${preferredCounty}">${preferredCounty}</option>`]
    : ['<option value="*">全部縣市</option>'].concat(
        Array.from(counties)
          .sort()
          .map((c) => `<option value="${c}">${c}</option>`)
      );
  dom.countySelect.innerHTML = options.join("");
  if (preferredCounty) {
    dom.countySelect.value = preferredCounty;
  }
  buildStationOptions();
}

function buildStationOptions() {
  const prevPick = dom.stationSelect?.value || "*";
  const county = dom.countySelect ? normalizeCountyName(dom.countySelect.value) : "";
  const targetCounty = normalizeCountyName(REALTIME_COUNTY);
  let list = stationsMeta
    .filter((s) => !s.status || s.status === "existing")
    .filter((s) => normalizeCountyName(s.county) === targetCounty);
  if (county && county !== "*") {
    list = list.filter((s) => normalizeCountyName(s.county) === county);
  }
  const options = ['<option value="*">全部測站（縣內平均）</option>'].concat(
    list
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((s) => `<option value="${s.id}">${s.id} ｜ ${s.name || ""}</option>`)
  );
  dom.stationSelect.innerHTML = options.join("");
  if (prevPick && (prevPick === "*" || list.some((s) => s.id === prevPick))) {
    dom.stationSelect.value = prevPick;
  } else {
    dom.stationSelect.value = "*";
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

function syncChartRangeFromSlider() {
  if (!historicalViewState.labelCount) return;
  let start = Number(dom.chartRangeStart?.value || 0);
  let end = Number(dom.chartRangeEnd?.value || 0);
  if (start > end) {
    const active = document.activeElement;
    if (active === dom.chartRangeStart) {
      end = start;
      if (dom.chartRangeEnd) dom.chartRangeEnd.value = String(end);
    } else {
      start = end;
      if (dom.chartRangeStart) dom.chartRangeStart.value = String(start);
    }
  }
  applyHistoricalChartRange(start, end, { source: "slider" });
}

function applyHistoricalChartRange(start, end, options = {}) {
  if (!historicalViewState.labelCount) return;
  const maxIndex = Math.max(0, historicalViewState.labelCount - 1);
  const s = Math.max(0, Math.min(maxIndex, Number(start)));
  const e = Math.max(0, Math.min(maxIndex, Number(end)));
  const rangeStart = Math.min(s, e);
  const rangeEnd = Math.max(s, e);
  historicalViewState.start = rangeStart;
  historicalViewState.end = rangeEnd;
  updateChartRangeLabel();
  if (dom.chartRangeStart && String(dom.chartRangeStart.value) !== String(rangeStart)) dom.chartRangeStart.value = String(rangeStart);
  if (dom.chartRangeEnd && String(dom.chartRangeEnd.value) !== String(rangeEnd)) dom.chartRangeEnd.value = String(rangeEnd);
  if (historicalViewState.syncing) return;
  historicalViewState.syncing = true;
  Object.values(charts).forEach((chart) => {
    if (!chart?.options?.scales?.x) return;
    chart.options.scales.x.min = rangeStart;
    chart.options.scales.x.max = rangeEnd;
    chart.update("none");
  });
  historicalViewState.syncing = false;
  if (options.source === "slider") {
    setStatus(`已同步圖表視窗：${dom.chartRangeLabel?.textContent || ""}`);
  }
}

function syncChartRangeFromChart(chart) {
  if (!chart?.scales?.x || historicalViewState.syncing) return;
  const x = chart.scales.x;
  const min = Number.isFinite(x.min) ? Math.round(x.min) : 0;
  const max = Number.isFinite(x.max) ? Math.round(x.max) : Math.max(0, historicalViewState.labelCount - 1);
  applyHistoricalChartRange(min, max, { source: "chart" });
}

function updateChartRangeLabel() {
  if (!dom.chartRangeLabel) return;
  if (!historicalViewState.labelCount) {
    dom.chartRangeLabel.textContent = "尚未載入";
    return;
  }
  const labels = charts.TX01?.data?.labels || [];
  const s = labels[historicalViewState.start] || labels[0] || "--";
  const e = labels[historicalViewState.end] || labels[labels.length - 1] || "--";
  dom.chartRangeLabel.textContent = `${s} ~ ${e}`;
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
      if (payload.failedFiles > 0) {
        const detail = payload.firstFailureReason ? `；首個錯誤：${payload.firstFailureReason}` : "";
        setStatus(`目前讀不到有效檔案內容（已略過 ${payload.failedFiles} 個檔案）${detail}`);
        return;
      }
      const pick = dom.stationSelect?.value;
      if (pick && pick !== "*") {
        setStatus(`測站 ${pick} 在目前區間無有效資料，請改選「全部測站」或調整月份。`);
      } else {
        setStatus("目前條件沒有有效資料（可能都是 -999x）");
      }
      return;
    }
    renderCharts(payload);
    if (payload.failedFiles > 0) {
      setStatus(`完成：${payload.points} 筆資料已匯總（略過 ${payload.failedFiles} 個失敗檔案）`);
    } else {
      setStatus(`完成：${payload.points} 筆資料已匯總`);
    }
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
  historicalViewState.labelCount = 0;
  historicalViewState.start = 0;
  historicalViewState.end = 0;
  if (dom.chartRangeStart) {
    dom.chartRangeStart.min = "0";
    dom.chartRangeStart.max = "0";
    dom.chartRangeStart.value = "0";
  }
  if (dom.chartRangeEnd) {
    dom.chartRangeEnd.min = "0";
    dom.chartRangeEnd.max = "0";
    dom.chartRangeEnd.value = "0";
  }
  updateChartRangeLabel();
  dom.chartTitle.textContent = "已清空";
}

function resolveStations() {
  const pick = dom.stationSelect.value;
  if (pick && pick !== "*") {
    return new Set([pick]);
  }
  if (!dom.countySelect) return null;
  const county = normalizeCountyName(dom.countySelect.value) || normalizeCountyName(REALTIME_COUNTY);
  if (!county || county === "*") return null;
  const ids = stationsMeta
    .filter((s) => (!s.status || s.status === "existing") && normalizeCountyName(s.county) === county)
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
  let failedFiles = 0;
  let firstFailureReason = "";

  for (let i = 0; i < files.length; i += 1) {
    const f = files[i];
    setStatus(`讀取 ${f.file} (${i + 1}/${files.length})`);
    if (rollup === "day") {
      const ok = await tryParseDailyAll(f, metricKeys, allowedStations, bucketMap);
      if (ok) continue;
    }
    try {
      const text = await fetchChanghuaText(f.path);
      parseFileAll(text, metricKeys, rollup, allowedStations, bucketMap);
    } catch (err) {
      failedFiles += 1;
      if (!firstFailureReason) {
        firstFailureReason = err?.message || String(err);
      }
      console.warn(`讀取失敗，已略過 ${f.file}:`, err?.message || err);
    }
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
    failedFiles,
    firstFailureReason,
  };
}

function parseFileAll(text, metricKeys, rollup, allowedStations, bucketMap) {
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith("*") || line.startsWith("#")) continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length <= 5) continue;
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
  const dailyPath = resolveFileUrl(`./data/changhua/daily/${fileInfo.file.replace(".auto_hr.txt", ".daily.json")}`);
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
    if (rawPath && rawPath.startsWith("./data/changhua/")) {
      const rel = rawPath.replace("./data/changhua/", "");
      return `${CHANGHUA_DATA_BASE}/${rel}`;
    }
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
  historicalViewState.labelCount = payload.labels.length;
  historicalViewState.start = 0;
  historicalViewState.end = Math.max(0, payload.labels.length - 1);
  if (dom.chartRangeStart) {
    dom.chartRangeStart.min = "0";
    dom.chartRangeStart.max = String(Math.max(0, payload.labels.length - 1));
    dom.chartRangeStart.value = "0";
  }
  if (dom.chartRangeEnd) {
    dom.chartRangeEnd.min = "0";
    dom.chartRangeEnd.max = String(Math.max(0, payload.labels.length - 1));
    dom.chartRangeEnd.value = String(Math.max(0, payload.labels.length - 1));
  }
  updateChartRangeLabel();
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
      charts[metricKey].options.scales.x.min = historicalViewState.start;
      charts[metricKey].options.scales.x.max = historicalViewState.end;
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
          plugins: {
            legend: { display: false },
            zoom: {
              zoom: {
                wheel: { enabled: true },
                drag: { enabled: true },
                mode: "x",
              },
              limits: {
                x: { min: 0, max: Math.max(0, payload.labels.length - 1) },
              },
              onZoomComplete: ({ chart }) => syncChartRangeFromChart(chart),
            },
          },
          scales: {
            x: {
              min: historicalViewState.start,
              max: historicalViewState.end,
              ticks: { maxRotation: 0, autoSkip: true },
              grid: { color: "rgba(255,255,255,0.05)" },
            },
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
  const res = await fetch(TYPHOON_COUNTIES_URL);
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
  initRadarMap();
  loadNCUEObservation();
  loadAqiData();
  loadForecast(REALTIME_COUNTY);
  loadWeatherAlerts();
  loadLiveTyphoon();
  loadRadarComposite();
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

function initRadarMap() {
  if (!dom.radarMap || realtimeState.radarMap) return;
  realtimeState.radarMap = L.map("radarMap", { zoomControl: true }).setView([23.7, 121], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(realtimeState.radarMap);
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
  if (realtimeState.radarMap) {
    realtimeState.radarMap.invalidateSize();
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
      loadRadarComposite(),
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
  if (dom.radarStatus) dom.radarStatus.textContent = "尚未載入";
  if (realtimeState.typhoonLayer && realtimeState.typhoonMap) {
    realtimeState.typhoonMap.removeLayer(realtimeState.typhoonLayer);
    realtimeState.typhoonLayer = null;
  }
  if (realtimeState.radarLayer && realtimeState.radarMap) {
    realtimeState.radarMap.removeLayer(realtimeState.radarLayer);
    realtimeState.radarLayer = null;
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
  const add = (title, options = {}) => {
    alerts.push({
      area: "彰師大",
      title: "即時提醒",
      desc: title,
      severity: "提醒",
      isLocal: true,
      levelClass: options.levelClass || "",
    });
  };
  const getAqiLevel = (value) => {
    const v = Number(value);
    if (!Number.isFinite(v)) return null;
    if (v >= 301) return { label: "危害標準", className: "local-alert--aqi-maroon" };
    if (v >= 201) return { label: "影響人體健康", className: "local-alert--aqi-purple" };
    if (v >= 151) return { label: "過高", className: "local-alert--aqi-red" };
    if (v >= 101) return { label: "偏高", className: "local-alert--aqi-orange" };
    return null;
  };
  const getPollutantLevel = (value, thresholds) => {
    const v = Number(value);
    if (!Number.isFinite(v)) return null;
    for (const t of thresholds) {
      if (v >= t.min && v <= t.max) return t.level;
    }
    if (v > thresholds[thresholds.length - 1].max) {
      return thresholds[thresholds.length - 1].level;
    }
    return null;
  };
  const aqiLevel = aqi ? getAqiLevel(aqi.aqi) : null;
  const pollutantLevels = {
    pm25: [
      { min: 30.5, max: 50.4, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 50.5, max: 125.4, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 125.5, max: 225.4, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 225.5, max: 325.4, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
    pm10: [
      { min: 76, max: 190, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 191, max: 354, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 355, max: 424, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 425, max: 504, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
    o3: [
      { min: 71, max: 85, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 86, max: 105, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 106, max: 200, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 201, max: 10000, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
    co: [
      { min: 9.5, max: 12.4, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 12.5, max: 15.4, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 15.5, max: 30.4, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 30.5, max: 40.4, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
    so2: [
      { min: 66, max: 160, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 161, max: 304, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 305, max: 604, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 605, max: 804, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
    no2: [
      { min: 101, max: 360, level: { label: "偏高", className: "local-alert--aqi-orange" } },
      { min: 361, max: 649, level: { label: "過高", className: "local-alert--aqi-red" } },
      { min: 650, max: 1249, level: { label: "影響人體健康", className: "local-alert--aqi-purple" } },
      { min: 1250, max: 1649, level: { label: "危害標準", className: "local-alert--aqi-maroon" } },
    ],
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
    if (aqiLevel) {
      add(`空氣品質${aqiLevel.label}（AQI ${aqi.aqi}）`, { levelClass: aqiLevel.className });
    }
    const pm25Level = getPollutantLevel(aqi.pm25, pollutantLevels.pm25);
    if (pm25Level) add(`PM2.5 ${pm25Level.label}（${aqi.pm25} μg/m3）`, { levelClass: pm25Level.className });
    const pm10Level = getPollutantLevel(aqi.pm10, pollutantLevels.pm10);
    if (pm10Level) add(`PM10 ${pm10Level.label}（${aqi.pm10} μg/m3）`, { levelClass: pm10Level.className });
    const o3Level = getPollutantLevel(aqi.o3, pollutantLevels.o3);
    if (o3Level) add(`O3 ${o3Level.label}（${aqi.o3} ppb）`, { levelClass: o3Level.className });
    const so2Level = getPollutantLevel(aqi.so2, pollutantLevels.so2);
    if (so2Level) add(`SO2 ${so2Level.label}（${aqi.so2} ppb）`, { levelClass: so2Level.className });
    const no2Level = getPollutantLevel(aqi.no2, pollutantLevels.no2);
    if (no2Level) add(`NO2 ${no2Level.label}（${aqi.no2} ppb）`, { levelClass: no2Level.className });
    const coLevel = getPollutantLevel(aqi.co, pollutantLevels.co);
    if (coLevel) add(`CO ${coLevel.label}（${aqi.co} ppm）`, { levelClass: coLevel.className });
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
      const itemClass = a.isLocal
        ? `alert-item local-alert ${a.levelClass || ""}`.trim()
        : "alert-item";
      return `<div class="${itemClass}">
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

function readRainElement(station, key) {
  const el =
    station?.RainfallElement ||
    station?.rainfallElement ||
    station?.RainElement ||
    station?.rainElement ||
    null;
  if (!el) return null;
  const node = el[key] ?? el[key.toLowerCase?.() ?? key];
  if (node == null) return null;
  if (typeof node === "object") {
    return node.Precipitation ?? node.precipitation ?? node.Value ?? node.value ?? null;
  }
  return node;
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
  if (!isValidObservation(temperature)) return null;
  if (!isValidObservation(humidity)) return null;
  if (!isValidObservation(windMps)) return null;
  const T = Number(temperature);
  const RH = Number(humidity);
  const V = Number(windMps);
  if (!Number.isFinite(T) || !Number.isFinite(RH) || !Number.isFinite(V)) return null;
  if (RH < 0 || RH > 100) return null;
  if (V < 0) return null;
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

function extractAqiRecords(payload) {
  if (Array.isArray(payload)) return payload;
  const records = payload?.records || payload?.data || [];
  return Array.isArray(records) ? records : [];
}

function pickAqiRecord(payload) {
  const records = Array.isArray(payload) ? payload : payload?.records || payload?.data || [];
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

// ----------------- 即時排名 -----------------

function initRankingView(view) {
  if (!view?.dom?.metric || !view?.dom?.map) return;
  buildRankingMetricOptions(view.dom.metric, view.metricKeys);
  buildCountySelect(view);
  initRankingMap(view);
  loadRankingData(view);
}

function initRankingViews() {
  Object.values(rankingViews).forEach((view) => initRankingView(view));
}

function bindRankingViewEvents(view) {
  if (!view?.dom) return;
  view.dom.reloadBtn?.addEventListener("click", () => loadRankingData(view));
  view.dom.metric?.addEventListener("change", () => {
    view.state.page = 1;
    loadRankingData(view);
  });
  view.dom.countySelect?.addEventListener("change", () => {
    view.state.page = 1;
    loadRankingData(view);
  });
  view.dom.valueHeader?.addEventListener("click", () => {
    view.state.sortDir = view.state.sortDir === "desc" ? "asc" : "desc";
    view.state.page = 1;
    renderRankingTable(view.state.entries, view.dom.metric.value, view);
  });
}

function buildRankingMetricOptions(selectEl, metricKeys) {
  if (!selectEl) return;
  const keys = Array.isArray(metricKeys) && metricKeys.length ? metricKeys : Object.keys(rankingMetrics);
  const options = keys
    .map((key) => {
      const cfg = rankingMetrics[key];
      return cfg ? `<option value="${key}">${cfg.label}</option>` : "";
    })
    .filter(Boolean);
  selectEl.innerHTML = options.join("");
  selectEl.value = keys.includes("temp") ? "temp" : keys[0] || "temp";
}

function buildDisasterMetricOptions(selectEl) {
  if (!selectEl) return;
  const options = disasterMetricKeys
    .map((key) => {
      const metric = rankingMetrics[key];
      return metric ? `<option value="${key}">${metric.label}</option>` : "";
    })
    .filter(Boolean);
  selectEl.innerHTML = options.join("");
  selectEl.value = "temp";
}

function resolveChanghuaCandidateUrls(rawPath) {
  if (!rawPath) return [];
  const normalized = String(rawPath).replace(/\\/g, "/");
  const fileName = normalized.split("/").pop() || "";
  const isHourlyFile = /^\d{6}99\.auto_hr\.txt$/i.test(fileName);
  if (normalized.startsWith("./data/changhua/")) {
    const rel = normalized.replace("./data/changhua/", "");
    return [
      `${CHANGHUA_DATA_BASE}/${rel}`,
      `${GEO_ASSETS_CDN_BASE}/changhua/${rel}`,
      `${GEO_ASSETS_PAGES_BASE}/changhua/${rel}`,
      `${window.location.origin}/data/changhua/${rel}`,
    ];
  }
  if (isHourlyFile) {
    const rel = `hourly/${fileName}`;
    return [
      `${CHANGHUA_DATA_BASE}/${rel}`,
      `${GEO_ASSETS_CDN_BASE}/changhua/${rel}`,
      `${GEO_ASSETS_PAGES_BASE}/changhua/${rel}`,
      `${window.location.origin}/data/changhua/${rel}`,
    ];
  }
  return [resolveFileUrl(normalized)];
}

async function fetchChanghuaText(rawPath) {
  const candidates = resolveChanghuaCandidateUrls(rawPath);
  let lastErr = null;
  for (const url of candidates) {
    let text = fileCache.get(url);
    if (text) return text;
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status} @ ${url}`);
        continue;
      }
      text = await res.text();
      if (!isLikelyHourlyText(text)) {
        lastErr = new Error(`內容格式異常 @ ${url}`);
        continue;
      }
      fileCache.set(url, text);
      return text;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr || new Error(`讀取失敗：${rawPath}`);
}

function isLikelyHourlyText(text) {
  if (!text || typeof text !== "string") return false;
  const sample = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 30);
  if (!sample.length) return false;
  let matched = 0;
  for (const line of sample) {
    if (/^[A-Za-z0-9]{6}\s+\d{10}\s+/.test(line)) {
      matched += 1;
    }
  }
  return matched >= Math.min(5, sample.length);
}

function buildHealthMetricOptions(selectEl) {
  if (!selectEl) return;
  const options = healthMetricKeys
    .map((key) => {
      const metric = rankingMetrics[key];
      return metric ? `<option value="${key}">${metric.label}</option>` : "";
    })
    .filter(Boolean);
  selectEl.innerHTML = options.join("");
  selectEl.value = "coldInjury";
}

function buildCountySelect(view) {
  if (!view?.dom?.countySelect) return;
  const opts = ['<option value="*">全台灣</option>']
    .concat(CWA_COUNTIES.map((c) => `<option value="${c}">${c}</option>`));
  view.dom.countySelect.innerHTML = opts.join("");
  if (view.countyFilter) {
    view.dom.countySelect.value = view.countyFilter;
  } else {
    view.dom.countySelect.value = "*";
  }
}

function initDisasterView() {
  if (!disasterView?.dom?.metric || !disasterView?.dom?.map) return;
  buildDisasterMetricOptions(disasterView.dom.metric);
  initRankingMap(disasterView);
  loadDisasterData();
}

function initHealthView() {
  if (!healthView?.dom?.metric || !healthView?.dom?.map) return;
  buildHealthMetricOptions(healthView.dom.metric);
  if (healthView.dom.mode) healthView.dom.mode.value = "window";
  if (healthView.dom.window) healthView.dom.window.value = "72";
  initRankingMap(healthView);
  toggleHealthTimelineControls();
  loadHealthData();
}

function bindDisasterViewEvents() {
  if (!disasterView?.dom) return;
  disasterView.dom.reloadBtn?.addEventListener("click", loadDisasterData);
  disasterView.dom.metric?.addEventListener("change", () => {
    disasterView.state.page = 1;
    loadDisasterData();
  });
  disasterView.dom.valueHeader?.addEventListener("click", () => {
    disasterView.state.sortDir = disasterView.state.sortDir === "desc" ? "asc" : "desc";
    disasterView.state.page = 1;
    renderRankingTable(disasterView.state.entries, disasterView.dom.metric.value, disasterView);
  });
}

function bindHealthViewEvents() {
  if (!healthView?.dom) return;
  healthView.dom.reloadBtn?.addEventListener("click", loadHealthData);
  healthView.dom.mode?.addEventListener("change", () => {
    healthView.state.page = 1;
    toggleHealthTimelineControls();
    loadHealthData();
  });
  healthView.dom.metric?.addEventListener("change", () => {
    healthView.state.page = 1;
    loadHealthData();
  });
  healthView.dom.window?.addEventListener("change", () => {
    healthView.state.page = 1;
    loadHealthData();
  });
  healthView.dom.timeline?.addEventListener("input", () => {
    const idx = Number(healthView.dom.timeline.value || 0);
    healthView.state.timelineIndex = Number.isFinite(idx) ? idx : 0;
    renderHealthTimelineFrame();
  });
  healthView.dom.valueHeader?.addEventListener("click", () => {
    healthView.state.sortDir = healthView.state.sortDir === "desc" ? "asc" : "desc";
    healthView.state.page = 1;
    renderRankingTable(healthView.state.entries, healthView.dom.metric.value, healthView);
  });
}

function toggleHealthTimelineControls() {
  const mode = healthView?.dom?.mode?.value || "window";
  if (healthView?.dom?.timelineWrap) {
    healthView.dom.timelineWrap.style.display = mode === "timeline" ? "" : "none";
  }
}

function isDisasterThreshold(metricKey, value) {
  if (value == null || !Number.isFinite(value)) return false;
  switch (metricKey) {
    case "temp":
      return value < 10 || value > 34;
    case "apparent":
      return value < 10 || value > 34;
    case "humidity":
      return value < 50;
    case "wind":
      return windToBeaufortLevel(value) >= 6;
    case "gust":
      return windToBeaufortLevel(value) >= 8;
    case "rain":
      return value > 40;
    case "rain3hr":
      return value > 100;
    case "rain24hr":
      return value > 200;
    case "aqi":
      return value >= 101;
    case "pm25":
      return value >= 35;
    case "pm10":
      return value >= DISASTER_PM10_THRESHOLD;
    case "o3":
      return value >= DISASTER_O3_THRESHOLD;
    default:
      return false;
  }
}

function buildDisasterEntries(stations, metricKey, view) {
  const baseEntries = isAqiMetric(metricKey)
    ? buildAqiEntries(stations, metricKey, view)
    : buildRankingEntries(stations, metricKey, view);
  return baseEntries.filter((entry) => isDisasterThreshold(metricKey, entry.value));
}

async function loadDisasterData() {
  if (!disasterView?.dom?.metric) return;
  const metricKey = disasterView.dom.metric.value;
  setRankingStatus(disasterView, "讀取即時資料...");
  try {
    await ensureRankingGeo(disasterView);
    if (isAqiMetric(metricKey)) {
      const data = await fetchAqiDataset();
      const records = extractAqiRecords(data);
      const entries = buildDisasterEntries(records, metricKey, disasterView);
      disasterView.state.entries = entries;
      await renderRanking(entries, metricKey, disasterView);
      setRankingDataTimeFromAqi(records, disasterView);
      setRankingStatus(disasterView, entries.length ? `已更新 ${entries.length} 筆警戒測站` : "目前無符合門檻測站");
      return;
    }
    const datasetId = metricKey.startsWith("rain") ? RAIN_DATASET : RANKING_DATASET;
    const data = await fetchCwaDataset(datasetId);
    const stations = extractCwaStations(data);
    const entries = buildDisasterEntries(stations, metricKey, disasterView);
    disasterView.state.entries = entries;
    await renderRanking(entries, metricKey, disasterView);
    setRankingDataTime(stations, disasterView);
    setRankingStatus(disasterView, entries.length ? `已更新 ${entries.length} 筆警戒測站` : "目前無符合門檻測站");
  } catch (err) {
    console.error(err);
    setRankingStatus(disasterView, err.message || "防災地圖載入失敗");
  }
}

function setRankingStatus(view, text) {
  if (view?.dom?.status) {
    view.dom.status.textContent = text;
  }
}

function isAqiMetric(metricKey) {
  return metricKey === "aqi" || metricKey === "pm25" || metricKey === "pm10" || metricKey === "o3";
}

function initRankingMap(view) {
  if (!view?.dom?.map || view.state.map) return;
  view.state.map = L.map(view.dom.map.id, { zoomControl: true }).setView(view.mapCenter, view.mapZoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(view.state.map);
}

function ensureRankingMapSized(view) {
  if (!view?.state?.map) return;
  view.state.map.invalidateSize();
}

async function ensureRankingGeo(view) {
  if (view.state.townGeo) return view.state.townGeo;
  const res = await fetch(view.geojsonUrl);
  if (!res.ok) throw new Error("無法載入邊界資料");
  view.state.townGeo = await res.json();
  if (!view.state.countyCodeMap) {
    view.state.countyCodeMap = buildCountyCodeMap(view.state.townGeo);
  }
  return view.state.townGeo;
}

async function loadRankingData(view) {
  if (!view?.dom?.metric) return;
  const metricKey = view.dom.metric.value;
  if (view.dom.countySelect) {
    const countyPick = view.dom.countySelect.value;
    view.countyFilter = countyPick && countyPick !== "*" ? countyPick : null;
  }
  setRankingStatus(view, "讀取即時資料...");
  try {
    await ensureRankingGeo(view);
    if (isAqiMetric(metricKey)) {
      const data = await fetchAqiDataset();
      const records = extractAqiRecords(data);
      const entries = buildAqiEntries(records, metricKey, view);
      view.state.entries = entries;
      await renderRanking(entries, metricKey, view);
      setRankingDataTimeFromAqi(records, view);
      setRankingStatus(view, entries.length ? `已更新 ${entries.length} 筆測站` : "找不到有效測站資料");
      focusViewOnCounty(view);
      return;
    }
    const datasetId = metricKey.startsWith("rain") ? RAIN_DATASET : RANKING_DATASET;
    const data = await fetchCwaDataset(datasetId);
    const stations = extractCwaStations(data);
    const entries = buildRankingEntries(stations, metricKey, view);
    view.state.entries = entries;
    await renderRanking(entries, metricKey, view);
    setRankingDataTime(stations, view);
    setRankingStatus(view, entries.length ? `已更新 ${entries.length} 筆測站` : "找不到有效測站資料");
    focusViewOnCounty(view);
  } catch (err) {
    console.error(err);
    setRankingStatus(view, err.message || "即時排名載入失敗");
  }
}

function buildRankingEntries(stations, metricKey, view) {
  const metric = rankingMetrics[metricKey] || rankingMetrics.temp;
  const entries = [];
  stations.forEach((station) => {
    const geo = station?.GeoInfo || station?.geoInfo || {};
    const county = normalizeCountyName(geo?.CountyName || geo?.countyName || "");
    const countyCode = geo?.CountyCode || geo?.countyCode || "";
    if (view?.countyFilter) {
      const targetCode = view.state.countyCodeMap?.[view.countyFilter] || COUNTY_CODE_MAP[view.countyFilter];
      if (county !== view.countyFilter && countyCode !== targetCode) return;
    }
    const coords = readStationCoords(geo);
    if (!coords) return;
    const value = metric.value(station);
    if (!isValidObservation(value)) return;
    const obsTime =
      station?.ObsTime?.DateTime ||
      station?.obsTime?.DateTime ||
      station?.ObsTime?.dateTime ||
      station?.obsTime?.dateTime ||
      "";
    const stationName = getStationName(station);
    entries.push({
      id: station?.StationId || station?.stationId || station?.StationID || station?.StationNo || "",
      name: stationName,
      county,
      town: geo?.TownName || geo?.townName || "",
      lat: coords.lat,
      lon: coords.lon,
      value,
      direction: metric.direction ? metric.direction(station) : null,
      temperature: toNumber(readWeatherElement(station, "AirTemperature")),
      humidity: (() => {
        let h = toNumber(readWeatherElement(station, "RelativeHumidity"));
        if (h != null && h >= 0 && h <= 1) h *= 100;
        return h;
      })(),
      obsTimeRaw: obsTime,
      time: formatObsTime(obsTime),
    });
  });
  entries.sort((a, b) => b.value - a.value);
  return entries;
}

function buildAqiEntries(records, metricKey, view) {
  const entries = [];
  records.forEach((record) => {
    const county = normalizeCountyName(record?.county || record?.County || "");
    if (view?.countyFilter && county !== view.countyFilter) return;
    const lat = toNumber(record?.latitude);
    const lon = toNumber(record?.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    let value = null;
    if (metricKey === "pm25") {
      value = toNumber(record?.["pm2.5"] ?? record?.pm25 ?? record?.pm25_avg);
    } else if (metricKey === "pm10") {
      value = toNumber(record?.pm10 ?? record?.pm10_avg);
    } else if (metricKey === "o3") {
      value = toNumber(record?.o3_8hr ?? record?.o3);
    } else {
      value = toNumber(record?.aqi ?? record?.AQI);
    }
    if (!isValidObservation(value)) return;
    entries.push({
      id: record?.siteid || record?.siteId || record?.SiteId || record?.siteID || "",
      name: record?.sitename || record?.siteName || record?.SiteName || "",
      county,
      town: "",
      lat,
      lon,
      value,
      direction: toNumber(record?.wind_direc),
      temperature: null,
      humidity: null,
      obsTimeRaw: record?.publishtime || record?.PublishTime || "",
      time: record?.publishtime || record?.PublishTime || "",
    });
  });
  entries.sort((a, b) => b.value - a.value);
  return entries;
}

function readStationCoords(geo) {
  const coords = geo?.Coordinates || geo?.coordinates || geo?.Coordinate || geo?.coordinate || [];
  const list = Array.isArray(coords) ? coords : coords?.Coordinate || coords?.coordinates || [];
  const match = list.find((c) => (c?.CoordinateName || c?.coordinateName || "").toUpperCase() === "WGS84");
  const lat = toNumber(match?.StationLatitude || match?.stationLatitude || match?.Latitude || match?.latitude);
  const lon = toNumber(match?.StationLongitude || match?.stationLongitude || match?.Longitude || match?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
}

async function renderRanking(entries, metricKey, view) {
  await ensureRankingGeo(view);
  renderRankingMap(entries, metricKey, view);
  renderRankingTable(entries, metricKey, view);
  renderRankingColorbar(metricKey, view.dom.colorbar);
}

function renderRankingMap(entries, metricKey, view) {
  if (!view?.state?.map) return;
  const metric = rankingMetrics[metricKey] || rankingMetrics.temp;
  const map = view.state.map;
  const isHealthView = view.key === "health";

  if (view.state.townLayer) {
    map.removeLayer(view.state.townLayer);
    view.state.townLayer = null;
  }
  if (view.state.stationLayer) {
    map.removeLayer(view.state.stationLayer);
    view.state.stationLayer = null;
  }

  const areaStats = new Map();
  entries.forEach((entry) => {
    const key = getAreaKey(entry, view);
    if (!key) return;
    const current = areaStats.get(key);
    if (!current || entry.value > current.value) {
      areaStats.set(key, entry);
    }
  });

  view.state.townLayer = L.geoJSON(view.state.townGeo, {
    style: (feature) => {
      const key = getAreaKeyFromFeature(feature, view);
      const best = areaStats.get(key);
      return {
        color: "#2b3a55",
        weight: 1,
        fillOpacity: isHealthView && best ? 0.45 : 0,
        fillColor: isHealthView && best ? getMetricColor(metricKey, metric, best.value) : "transparent",
      };
    },
    onEachFeature: (feature, layer) => {
      const raw = getAreaNameFromFeature(feature, view);
      const key = getAreaKeyFromFeature(feature, view);
      const best = areaStats.get(key);
      const label = buildAreaTooltip(raw, best, metricKey, metric, view);
      layer.bindTooltip(label, { sticky: true, className: "town-tooltip" });
      layer.on({
        mouseover: (e) => {
          const hoverStyle = isHealthView && best ? { weight: 2, fillOpacity: 0.7 } : { weight: 2, fillOpacity: 0.5 };
          e.target.setStyle(hoverStyle);
        },
        mouseout: (e) => {
          view.state.townLayer.resetStyle(e.target);
        },
      });
    },
  }).addTo(map);

  if (isHealthView) {
    view.state.stationLayer = L.layerGroup().addTo(map);
    return;
  }

  view.state.stationLayer = L.layerGroup().addTo(map);
  entries.forEach((entry, idx) => {
    const fill = getMetricColor(metricKey, metric, entry.value);
    let marker = null;
    if (metric.colorScale === "wind" && Number.isFinite(entry.direction) && entry.value > 0.2) {
      const rotate = ((Number(entry.direction) + 180) % 360).toFixed(0);
      const svg = `
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(14 14) rotate(${rotate}) translate(-14 -14)">
            <circle cx="14" cy="14" r="12" fill="${fill}" stroke="rgba(0,0,0,0.45)" stroke-width="1.5"/>
            <path d="M14 5 L20 18 L14 15 L8 18 Z" fill="#111" />
          </g>
        </svg>`;
      const icon = L.divIcon({
        className: "",
        html: svg,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      marker = L.marker([entry.lat, entry.lon], { icon });
    } else {
      marker = L.circleMarker([entry.lat, entry.lon], {
        radius: 6,
        color: "#111",
        weight: 1,
        fillColor: fill,
        fillOpacity: 0.92,
      });
    }
    marker.bindPopup(
      `<strong>${sanitizeText(entry.name || "測站")}</strong><br>` +
        `${sanitizeText(entry.town || "—")}<br>` +
        `${sanitizeText(formatRankingValue(metricKey, entry.value, metric.unit))}<br>` +
        `${sanitizeText(entry.time || "")}`
    );
    marker.on("click", () => {
      const sorted = sortEntries(view.state.entries, view.state.sortDir);
      const globalIdx = sorted.findIndex((item) => item.id === entry.id && item.lat === entry.lat && item.lon === entry.lon);
      highlightRankingRow(globalIdx === -1 ? idx : globalIdx, true, view);
    });
    marker.addTo(view.state.stationLayer);
    entry.marker = marker;
  });

  // Keep the initial viewport; avoid auto-fit so the map stays zoomed out.
}

function renderRankingTable(entries, metricKey, view) {
  if (!view?.dom?.tableBody) return;
  const metric = rankingMetrics[metricKey] || rankingMetrics.temp;
  if (view.dom.table) {
    view.dom.table.classList.toggle("ranking-table--no-wind", metric.colorScale !== "wind");
    view.dom.table.classList.toggle("ranking-table--thi", metricKey === "thi");
    view.dom.table.classList.toggle("ranking-table--wind", metric.colorScale === "wind");
    view.dom.table.classList.toggle("ranking-table--with-town", Boolean(view.showTownColumn));
    view.dom.table.classList.toggle("ranking-table--disaster", view.key === "disaster");
    view.dom.table.classList.toggle("ranking-table--health", view.key === "health");
    view.dom.table.classList.toggle("ranking-table--no-town", isAqiMetric(metricKey));
  }
  if (view.dom.valueHeader) {
    const label = metricKey === "thi" ? "溫濕度指數(THI)" : metric.label;
    const unitText = metric.unit ? `(${metric.unit})` : "";
    view.dom.valueHeader.textContent = `${label}${unitText}`.trim();
  }
  const sorted = sortEntries(entries, view.state.sortDir);
  const pageSize = 50;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  if (view.state.page > totalPages) view.state.page = totalPages;
  const start = (view.state.page - 1) * pageSize;
  const pageEntries = sorted.slice(start, start + pageSize);
  const rows = pageEntries.map((entry, idx) => {
    const rank = view.state.sortDir === "desc" ? start + idx + 1 : sorted.length - (start + idx);
    const valueText = isHealthMetric(metricKey)
      ? formatHealthValue(entry, metric)
      : formatRankingValue(metricKey, entry.value, metric.unit);
    const windText =
      metric.colorScale === "wind" && Number.isFinite(entry.direction)
        ? formatWindDirection(entry.direction)
        : "—";
    const tempText =
      metricKey === "thi" && Number.isFinite(entry.temperature) ? `${Number(entry.temperature).toFixed(1)}°C` : "—";
    const humidityText =
      metricKey === "thi" && Number.isFinite(entry.humidity) ? `${Number(entry.humidity).toFixed(0)}%` : "—";
    const rowColor = getMetricColor(metricKey, metric, entry.value);
    const rowHover = toRgba(rowColor, 0.16);
    const areaText = view.showTownColumn ? entry.county || "—" : entry.town || "—";
    const townText = view.showTownColumn ? entry.town || "—" : null;
    const alertText = view.key === "disaster" ? formatDisasterLevel(metricKey, entry.value) : view.key === "health" ? formatHealthWarningText(entry) : null;
    return `<tr data-rank-idx="${start + idx}" style="--row-hover:${rowHover};">
      <td>${rank}</td>
      <td>${sanitizeText(areaText)}</td>
      ${view.showTownColumn ? `<td>${sanitizeText(townText)}</td>` : ""}
      <td>${sanitizeText(entry.name || "—")}</td>
      <td>${sanitizeText(windText)}</td>
      <td>${sanitizeText(tempText)}</td>
      <td>${sanitizeText(humidityText)}</td>
      <td>${sanitizeText(valueText)}</td>
      ${view.key === "disaster" || view.key === "health" ? `<td>${sanitizeText(alertText)}</td>` : ""}
    </tr>`;
  });
  view.dom.tableBody.innerHTML = rows.join("");
  view.dom.tableBody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      const globalIdx = Number(row.dataset.rankIdx);
      highlightRankingRow(globalIdx, true, view);
    });
  });
  renderPager(view, totalPages, sorted.length);
}

function highlightRankingRow(index, panTo, view) {
  if (!view?.dom?.tableBody) return;
  const rows = Array.from(view.dom.tableBody.querySelectorAll("tr"));
  rows.forEach((row) => row.classList.remove("ranking-row--active"));
  const activeRow = rows.find((row) => Number(row.dataset.rankIdx) === index);
  if (activeRow) {
    activeRow.classList.add("ranking-row--active");
    if (panTo) activeRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  const sorted = sortEntries(view.state.entries, view.state.sortDir);
  const entry = sorted[index];
  if (entry?.marker && view.state.map) {
    entry.marker.openPopup();
    if (panTo) {
      view.state.map.setView([entry.lat, entry.lon], 11, { animate: true });
    }
  } else if (entry && view.state.map && Number.isFinite(entry.lat) && Number.isFinite(entry.lon) && panTo) {
    view.state.map.setView([entry.lat, entry.lon], 10, { animate: true });
  }
}

function normalizeAreaName(value, view) {
  if (!value) return "";
  const raw = String(value).trim();
  if (view?.areaType === "town") {
    return raw.replace("彰化縣", "").trim();
  }
  return normalizeCountyName(raw);
}

function getAreaNameFromFeature(feature, view) {
  return feature?.properties?.[view.areaProp] || feature?.properties?.name || "";
}

function getAreaKeyFromFeature(feature, view) {
  return normalizeAreaName(getAreaNameFromFeature(feature, view), view);
}

function getAreaKey(entry, view) {
  const raw = view.areaType === "county" ? entry.county : entry.town;
  return normalizeAreaName(raw, view);
}

function buildAreaTooltip(rawName, best, metricKey, metric, view) {
  const name = sanitizeText(normalizeAreaName(rawName || "", view));
  const label = name || (view.areaType === "county" ? "未知縣市" : "未知鄉鎮");
  if (!best) {
    if (isHealthMetric(metricKey)) {
      return `<strong>${label}</strong>無警示`;
    }
    return `<strong>${label}</strong>無測站資料`;
  }
  if (isHealthMetric(metricKey)) {
    const valueText = formatHealthValue(best, metric);
    return `<strong>${label}</strong>${sanitizeText(valueText)} ${sanitizeText(formatHealthWarningText(best))}`;
  }
  const valueText = formatRankingValue(metricKey, best.value, metric.unit);
  return `<strong>${label}</strong>${sanitizeText(best.name || "測站")} ${sanitizeText(valueText)}`;
}

function sortEntries(entries, dir) {
  const list = Array.from(entries || []);
  list.sort((a, b) => {
    if (dir === "asc") return a.value - b.value;
    return b.value - a.value;
  });
  return list;
}

function renderPager(view, totalPages, totalCount) {
  if (!view?.dom?.pager) return;
  const current = view.state.page;
  const prevDisabled = current <= 1 ? "disabled" : "";
  const nextDisabled = current >= totalPages ? "disabled" : "";
  const safeTotal = Number.isFinite(totalCount) ? totalCount : 0;
  view.dom.pager.innerHTML = `
    <button class="pager-btn" data-page="prev" ${prevDisabled}>上一頁</button>
    <span>第 ${current} / ${totalPages} 頁</span>
    <span class="pager-total">共 ${safeTotal} 筆</span>
    <button class="pager-btn" data-page="next" ${nextDisabled}>下一頁</button>
  `;
  view.dom.pager.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.page === "prev" && view.state.page > 1) {
        view.state.page -= 1;
      }
      if (btn.dataset.page === "next" && view.state.page < totalPages) {
        view.state.page += 1;
      }
      renderRankingTable(view.state.entries, view.dom.metric.value, view);
    });
  });
}

function buildCountyCodeMap(geo) {
  const map = {};
  (geo?.features || []).forEach((f) => {
    const name = f?.properties?.COUNTYNAME || f?.properties?.COUNTYNAME || f?.properties?.CountyName || "";
    const code = f?.properties?.COUNTYCODE || f?.properties?.CountyCode || "";
    if (name && code) {
      map[normalizeCountyName(name)] = String(code);
    }
  });
  return map;
}

function focusViewOnCounty(view) {
  if (!view?.state?.map || !view?.state?.townGeo) return;
  if (!view.countyFilter) {
    view.state.map.setView(view.mapCenter, view.mapZoom);
    return;
  }
  const target = normalizeCountyName(view.countyFilter);
  const features = view.state.townGeo.features || [];
  const bounds = L.latLngBounds();
  let matched = false;
  features.forEach((f) => {
    const countyName = normalizeCountyName(
      f?.properties?.COUNTYNAME || f?.properties?.CountyName || f?.properties?.countyName || ""
    );
    if (countyName !== target) return;
    const layer = L.geoJSON(f);
    const b = layer.getBounds();
    if (b.isValid()) {
      bounds.extend(b);
      matched = true;
    }
  });
  if (matched) {
    view.state.map.fitBounds(bounds, { padding: [20, 20] });
  } else {
    view.state.map.setView(view.mapCenter, view.mapZoom);
  }
}

function formatRankingValue(metricKey, value, unit) {
  if (value == null || !Number.isFinite(value)) return "—";
  const digits =
    metricKey === "humidity" || metricKey === "aqi" || metricKey === "pm25" || metricKey === "pm10" || metricKey === "o3"
      ? 0
      : 1;
  if (metricKey === "wind" || metricKey === "gust") {
    const label = windToBeaufort(value);
    return `${label} (${Number(value).toFixed(1)}${unit})`;
  }
  if (metricKey === "thi") {
    return `${Number(value).toFixed(digits)}`;
  }
  const suffix = unit ? unit : "";
  return `${Number(value).toFixed(digits)}${suffix}`;
}

function formatHealthValue(entry, metric) {
  if (!entry) return "—";
  if (Number.isFinite(entry.healthIndexValue)) {
    return `${Number(entry.healthIndexValue).toFixed(0)}`;
  }
  if (Number.isFinite(entry.value)) {
    return `${Number(entry.value).toFixed(0)}`;
  }
  return "—";
}

function formatHealthWarningText(entry) {
  if (!entry) return "—";
  const warning = (entry.healthWarning || "").trim();
  if (warning) return warning;
  const level = Number(entry.value || 0);
  if (level >= 4) return "高危險";
  if (level >= 3) return "危險";
  if (level >= 2) return "警戒";
  if (level >= 1) return "注意";
  return "—";
}

function formatDisasterLevel(metricKey, value) {
  if (value == null || !Number.isFinite(value)) return "—";
  switch (metricKey) {
    case "temp":
      return value < 10 ? "低溫警戒" : value > 34 ? "高溫警戒" : "—";
    case "apparent":
      return value < 10 ? "低溫警戒" : value > 34 ? "高溫警戒" : "—";
    case "humidity":
      return value < 50 ? "乾燥警戒" : "—";
    case "wind":
      return windToBeaufortLevel(value) >= 6 ? "強風警戒" : "—";
    case "gust":
      return windToBeaufortLevel(value) >= 8 ? "強陣風警戒" : "—";
    case "rain":
      return value > 40 ? "短時強降雨" : "—";
    case "rain3hr":
      return value > 100 ? "大雨警戒(3hr)" : "—";
    case "rain24hr":
      return value > 200 ? "豪雨警戒(24hr)" : "—";
    case "aqi":
      if (value >= 401) return "危害";
      if (value >= 301) return "危害";
      if (value >= 201) return "非常不健康";
      if (value >= 151) return "對所有族群不健康";
      return "對敏感族群不健康";
    case "pm25":
      return value >= 55 ? "細懸浮微粒警戒" : "細懸浮微粒注意";
    case "pm10":
      return value >= DISASTER_PM10_THRESHOLD ? "PM10警戒" : "—";
    case "o3":
      return value >= DISASTER_O3_THRESHOLD ? "臭氧警戒" : "—";
    default:
      return "—";
  }
}

function getMetricColor(metricKey, metric, value) {
  if (value == null || !Number.isFinite(value)) return "#cbd5f5";
  switch (metric.colorScale) {
    case "temp":
      return gradientColor(value, 6, 36, ["#1b6fd1", "#26b16f", "#e6e447", "#f4a13d", "#e04a3b", "#8a2bd8"]);
    case "wind":
      return windColor(value);
    case "humidity":
      return gradientColor(value, 30, 100, ["#dbeafe", "#60a5fa", "#1d4ed8"]);
    case "rain":
      return rainColor(metricKey, value);
    case "thi":
      return gradientColor(value, 40, 90, [
        "#273995",
        "#325bb3",
        "#3f7bc8",
        "#5197d6",
        "#6caed3",
        "#8ec5ca",
        "#addac1",
        "#cdeeb4",
        "#f3f5a3",
        "#fee08b",
        "#fdae61",
        "#f46d43",
        "#e34a33",
        "#d73027",
        "#a50026",
      ]);
    case "aqi":
      return aqiColor(value);
    case "pm25":
      return pm25Color(value);
    case "pm10":
      return pm10Color(value);
    case "o3":
      return o3Color(value);
    case "health":
      return healthWarningColor(value);
    default:
      return "#94a3b8";
  }
}

function healthWarningColor(value) {
  if (!Number.isFinite(value) || value <= 0) return "#d1d5db";
  const idx = Math.max(0, Math.min(HEALTH_WARNING_COLORS.length - 1, Math.round(value) - 1));
  return HEALTH_WARNING_COLORS[idx];
}

function aqiColor(value) {
  const levels = AQI_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return AQI_COLORS[i] || AQI_COLORS[AQI_COLORS.length - 1];
  }
  return AQI_COLORS[AQI_COLORS.length - 1];
}

function pm25Color(value) {
  const levels = PM25_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return PM25_COLORS[i] || PM25_COLORS[PM25_COLORS.length - 1];
  }
  return PM25_COLORS[PM25_COLORS.length - 1];
}

function pm10Color(value) {
  const levels = PM10_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return PM10_COLORS[i] || PM10_COLORS[PM10_COLORS.length - 1];
  }
  return PM10_COLORS[PM10_COLORS.length - 1];
}

function o3Color(value) {
  const levels = O3_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return O3_COLORS[i] || O3_COLORS[O3_COLORS.length - 1];
  }
  return O3_COLORS[O3_COLORS.length - 1];
}

function windColor(value) {
  const scale = [
    { max: 0.2, color: "#5f6266" },
    { max: 1.5, color: "#1ca0c9" },
    { max: 3.3, color: "#3177dc" },
    { max: 5.4, color: "#2d5a9e" },
    { max: 7.9, color: "#7fdc8f" },
    { max: 10.7, color: "#3fa514" },
    { max: 13.8, color: "#028b19" },
    { max: 17.1, color: "#fbff00" },
    { max: 20.7, color: "#ffdd00" },
    { max: 24.4, color: "#fbc04f" },
    { max: 28.4, color: "#f78255" },
    { max: 32.6, color: "#f16a3a" },
    { max: 36.9, color: "#de4a34" },
    { max: 41.4, color: "#c7372f" },
    { max: 46.1, color: "#b22e4e" },
    { max: 50.9, color: "#9a285c" },
    { max: 56.0, color: "#862377" },
  ];
  for (const step of scale) {
    if (value <= step.max) return step.color;
  }
  return "#6b1c82";
}

function rainColor(metricKey, value) {
  const levels =
    metricKey === "rain24hr"
      ? RAIN_LEVELS_24HR
      : metricKey === "rain3hr"
        ? RAIN_LEVELS_3HR
        : RAIN_LEVELS_1HR;
  const colors = RAIN_COLORS_BASE;
  if (value == null || !Number.isFinite(value)) return colors[0];
  const idx = levels.findIndex((v) => value < v);
  if (idx === -1) {
    return colors[Math.min(colors.length - 1, levels.length)];
  }
  return colors[Math.max(0, idx - 1)];
}

function gradientColor(value, min, max, stops) {
  const pct = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const idx = Math.min(stops.length - 2, Math.floor(pct * (stops.length - 1)));
  const t = pct * (stops.length - 1) - idx;
  return mixColor(stops[idx], stops[idx + 1], t);
}

function mixColor(a, b, t) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bch = Math.round(ab + (bb - ab) * t);
  return `#${toHex(r)}${toHex(g)}${toHex(bch)}`;
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const val = parseInt(raw, 16);
  return [(val >> 16) & 255, (val >> 8) & 255, val & 255];
}

function toHex(value) {
  return value.toString(16).padStart(2, "0");
}

function toRgba(hex, alpha) {
  if (!hex || typeof hex !== "string") return `rgba(47, 190, 130, ${alpha})`;
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function computeThi(temperature, humidity) {
  if (!isValidObservation(temperature) || !isValidObservation(humidity)) return null;
  const t = Number(temperature);
  const h = Number(humidity);
  if (!Number.isFinite(t) || !Number.isFinite(h)) return null;
  return (1.8 * t + 32) - (0.55 - 0.0055 * h) * (1.8 * t - 26);
}

function isValidObservation(value) {
  if (value == null) return false;
  const num = Number(value);
  if (!Number.isFinite(num)) return false;
  if (num <= -90) return false;
  return true;
}

function setRankingDataTime(stations, view) {
  if (!view?.dom?.dataTime) return;
  const latest = findLatestObsTimeFromStations(stations);
  view.dom.dataTime.textContent = latest ? latest : "";
}

function setRankingDataTimeFromAqi(records, view) {
  if (!view?.dom?.dataTime) return;
  const latest = findLatestAqiTime(records);
  view.dom.dataTime.textContent = latest ? latest : "";
}

function findLatestObsTimeFromStations(stations) {
  let latest = null;
  let latestMs = 0;
  stations.forEach((station) => {
    const raw =
      station?.ObsTime?.DateTime ||
      station?.obsTime?.DateTime ||
      station?.ObsTime?.dateTime ||
      station?.obsTime?.dateTime ||
      "";
    if (!raw) return;
    const ts = Date.parse(raw);
    if (!ts) return;
    if (ts > latestMs) {
      latestMs = ts;
      latest = formatObsTime(raw) || raw;
    }
  });
  return latest;
}

function findLatestAqiTime(records) {
  let latest = null;
  let latestMs = 0;
  records.forEach((record) => {
    const raw = record?.publishtime || record?.PublishTime || "";
    if (!raw) return;
    const parsed = parseAqiTime(raw);
    if (!parsed) return;
    const ts = parsed.getTime();
    if (ts > latestMs) {
      latestMs = ts;
      latest = formatObsTime(raw) || raw;
    }
  });
  return latest;
}

function parseAqiTime(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const text = String(value).trim();
  const normalized = text.replace(/\//g, "-");
  const iso = normalized.includes("T") ? normalized : normalized.replace(" ", "T");
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function renderRankingColorbar(metricKey, colorbarEl) {
  if (!colorbarEl) return;
  const metric = rankingMetrics[metricKey] || rankingMetrics.temp;
  const config = buildColorbarConfig(metricKey, metric);
  if (!config) {
    colorbarEl.innerHTML = "";
    return;
  }
  const stopsHtml = config.stops
    .map((stop) => `<span style="background:${stop};"></span>`)
    .join("");
  const tickData = config.ticks?.length
    ? config.ticks
        .map((label, idx) => ({
          label,
          pos: config.tickPositions?.[idx] ?? 0,
        }))
        .filter((item) => item.label !== "")
    : [];
  const marksHtml = tickData.length
    ? `<div class="colorbar-marks">${tickData.map((item) => `<span style="left:${item.pos * 100}%;"></span>`).join("")}</div>`
    : "";
  const ticksHtml = tickData.length
    ? config.orientation === "vertical"
      ? `<div class="colorbar-ticks vertical">${tickData
          .map((item) => {
            const pos = item.pos;
            const top = (1 - pos) * 100;
            const cls = pos === 0 ? "tick-bottom" : pos === 1 ? "tick-top" : "";
            return `<span class="${cls}" style="top:${top}%;">${item.label}</span>`;
          })
          .join("")}</div>`
      : `<div class="colorbar-ticks">${tickData
          .map((item) => {
            const pos = item.pos;
            const cls = pos === 0 ? "tick-left" : pos === 1 ? "tick-right" : "";
            return `<span class="${cls}" style="left:${pos * 100}%;">${item.label}</span>`;
          })
          .join("")}</div>`
    : "";
  const legendHtml = config.legend?.length
    ? `<div class="colorbar-legend">${config.legend
        .map(
          (item) =>
            `<span><i class="colorbar-swatch" style="background:${item.color};"></i>${item.label}</span>`
        )
        .join("")}</div>`
    : "";
  if (config.orientation === "vertical") {
    colorbarEl.innerHTML = `
      <div class="colorbar-title">${sanitizeText(config.title)}</div>
      <div class="colorbar-vertical">
        <div class="colorbar-strip vertical">
          <div class="colorbar-stops vertical" style="grid-template-rows: repeat(${config.stops.length}, 1fr);">
            ${stopsHtml}
          </div>
        </div>
        ${ticksHtml}
      </div>
      ${legendHtml}
    `;
    return;
  }
  colorbarEl.innerHTML = `
    <div class="colorbar-title">${sanitizeText(config.title)}</div>
    <div class="colorbar-scale">
      <div class="colorbar-strip">
        <div class="colorbar-stops" style="grid-template-columns: repeat(${config.stops.length}, 1fr);">
          ${stopsHtml}
        </div>
      </div>
      ${marksHtml}
    </div>
    ${ticksHtml}
    ${legendHtml}
  `;
}

function buildColorbarConfig(metricKey, metric) {
  if (metric.colorScale === "wind") {
    const blocks = 18;
    const windTicks = ["靜風", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"];
    const windPositions = Array.from({ length: blocks }, (_, idx) => (idx + 0.5) / blocks);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: [
        "#5f6266",
        "#1ca0c9",
        "#3177dc",
        "#2d5a9e",
        "#7fdc8f",
        "#3fa514",
        "#028b19",
        "#fbff00",
        "#ffdd00",
        "#fbc04f",
        "#f78255",
        "#f16a3a",
        "#de4a34",
        "#c7372f",
        "#b22e4e",
        "#9a285c",
        "#862377",
        "#6b1c82",
      ],
      ticks: windTicks,
      tickPositions: windPositions,
    };
  }
  if (metric.colorScale === "humidity") {
    const blocks = 6;
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#1d4ed8"],
      ticks: ["", "50", "60", "70", "80", "90"],
      tickPositions: [0, 1 / blocks, 2 / blocks, 3 / blocks, 4 / blocks, 5 / blocks],
      legend: [
        { label: "<50", color: "#dbeafe" },
        { label: "50-59", color: "#bfdbfe" },
        { label: "60-69", color: "#93c5fd" },
        { label: "70-79", color: "#60a5fa" },
        { label: "80-89", color: "#3b82f6" },
        { label: "90+", color: "#1d4ed8" },
      ],
    };
  }
  if (metric.colorScale === "rain") {
    const { levels, lastLabel } =
      metricKey === "rain24hr"
        ? { levels: RAIN_LEVELS_24HR, lastLabel: "600" }
        : metricKey === "rain3hr"
          ? { levels: RAIN_LEVELS_3HR, lastLabel: "240" }
          : { levels: RAIN_LEVELS_1HR, lastLabel: "120" };
    const ticks = levels.map((v) => String(v)).concat(lastLabel);
    const blocks = RAIN_COLORS_BASE.length;
    const positions = levels.map((_, idx) => idx / blocks).concat((blocks - 1) / blocks);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: RAIN_COLORS_BASE,
      ticks,
      tickPositions: positions,
    };
  }
  if (metric.colorScale === "aqi") {
    const blocks = AQI_COLORS.length;
    const ticks = AQI_LEVELS.map((v) => String(v));
    const positions = AQI_LEVELS.map((_, idx) => idx / blocks);
    return {
      title: `${metric.label}`,
      stops: AQI_COLORS,
      ticks,
      tickPositions: positions,
    };
  }
  if (metric.colorScale === "pm25") {
    const blocks = PM25_COLORS.length;
    const ticks = PM25_LEVELS.map((v) => String(v));
    const positions = PM25_LEVELS.map((_, idx) => idx / blocks);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: PM25_COLORS,
      ticks,
      tickPositions: positions,
    };
  }
  if (metric.colorScale === "pm10") {
    const blocks = PM10_COLORS.length;
    const ticks = PM10_LEVELS.map((v) => String(v));
    const positions = PM10_LEVELS.map((_, idx) => idx / blocks);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: PM10_COLORS,
      ticks,
      tickPositions: positions,
    };
  }
  if (metric.colorScale === "o3") {
    const blocks = O3_COLORS.length;
    const ticks = O3_LEVELS.map((v) => String(v));
    const positions = O3_LEVELS.map((_, idx) => idx / blocks);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: O3_COLORS,
      ticks,
      tickPositions: positions,
    };
  }
  if (metric.colorScale === "health") {
    const levelDefs = HEALTH_WARNING_LEVELS[metricKey] || [];
    if (!levelDefs.length) {
      return {
        title: `${metric.label}`,
        stops: HEALTH_WARNING_COLORS,
        ticks: ["注意", "警戒", "危險", "高危險"],
        tickPositions: [1 / 8, 3 / 8, 5 / 8, 7 / 8],
      };
    }
    const blocks = levelDefs.length;
    return {
      title: `${metric.label}`,
      stops: HEALTH_WARNING_COLORS.slice(0, blocks),
      ticks: levelDefs.map((def) => def.thresholdText),
      tickPositions: levelDefs.map((_, idx) => (idx + 0.5) / blocks),
      legend: levelDefs.map((def, idx) => ({
        label: `${def.label} (${def.thresholdText})`,
        color: HEALTH_WARNING_COLORS[Math.min(idx, HEALTH_WARNING_COLORS.length - 1)],
      })),
    };
  }
  if (metric.colorScale === "temp") {
    const tempBar = buildTempColorbar();
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: tempBar.stops,
      ticks: tempBar.labels,
      tickPositions: tempBar.positions,
    };
  }
  if (metric.colorScale === "thi") {
    const thiTicks = ["45", "50", "55", "60", "65", "70", "75", "80", "85"];
    const thiPositions = thiTicks.map((t) => (Number(t) - 40) / 50);
    return {
      title: `${metric.label}`,
      stops: buildGradientStops(
        [
          "#273995",
          "#325bb3",
          "#3f7bc8",
          "#5197d6",
          "#6caed3",
          "#8ec5ca",
          "#addac1",
          "#cdeeb4",
          "#f3f5a3",
          "#fee08b",
          "#fdae61",
          "#f46d43",
          "#e34a33",
          "#d73027",
          "#a50026",
        ],
        10
      ),
      ticks: thiTicks,
      tickPositions: thiPositions,
    };
  }
  return {
    title: `${metric.label} (${metric.unit})`,
    stops: ["#e2e8f0", "#94a3b8"],
  };
}

function buildGradientTicks(min, max, segments, lastPlus) {
  const labels = [];
  const positions = [];
  const step = (max - min) / segments;
  for (let i = 0; i <= segments; i += 1) {
    const raw = min + step * i;
    const value = Math.round(raw * 10) / 10;
    const label = i === segments && lastPlus ? `${value}+` : String(value);
    labels.push(label);
    positions.push(i / segments);
  }
  return { labels, positions };
}

function buildTempColorbar() {
  const labels = [];
  const positions = [];
  const stops = [];
  const min = 6;
  const max = 36;
  const palette = ["#1b6fd1", "#26b16f", "#e6e447", "#f4a13d", "#e04a3b", "#8a2bd8"];

  for (let value = min; value <= max; value += 1) {
    stops.push(gradientColor(value, min, max, palette));
  }
  stops.push(gradientColor(max + 1, min, max + 1, palette));
  const blocks = stops.length;
  for (let value = min; value <= max; value += 1) {
    labels.push(String(value));
    positions.push((value - min + 1) / blocks);
  }
  return { stops, labels, positions };
}

function buildGradientStops(colors, segments) {
  const stops = [];
  const count = Math.max(2, segments);
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    stops.push(gradientColor(t, 0, 1, colors));
  }
  return stops;
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

async function loadRadarComposite() {
  if (!dom.radarStatus) return;
  setRadarStatus("讀取雷達合成回波...");
  try {
    const payload = await fetchRadarFileDataset(RADAR_DATASET);
    const radar = parseRadarRealtime(payload);
    renderRadarOverlay(radar);
    const timeText = radar.dateTime || "";
    setRadarStatus(timeText ? `更新時間：${formatObsTime(timeText) || timeText}` : "已更新雷達回波");
  } catch (err) {
    console.error(err);
    setRadarStatus(err.message || "雷達資料讀取失敗");
  }
}

function setRadarStatus(text) {
  if (dom.radarStatus) dom.radarStatus.textContent = text;
}

async function fetchRadarFileDataset(datasetId) {
  const search = new URLSearchParams({ downloadType: "WEB", format: "JSON" });
  if (CWA_API_KEY) search.set("Authorization", CWA_API_KEY);
  const url = `${CWA_FILEAPI_BASE}/${datasetId}?${search.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`無法取得 ${datasetId}（${res.status}）`);
  }
  const data = await res.json();
  return data;
}

function renderRadarOverlay(radar) {
  const canvas = buildRadarCanvas(radar);
  const bounds = [
    [radar.startLat, radar.startLon],
    [radar.startLat + radar.gridResolution * (radar.gridY - 1), radar.startLon + radar.gridResolution * (radar.gridX - 1)],
  ];
  if (realtimeState.radarLayer && realtimeState.radarMap) {
    realtimeState.radarMap.removeLayer(realtimeState.radarLayer);
    realtimeState.radarLayer = null;
  }
  if (realtimeState.radarMap) {
    realtimeState.radarLayer = L.imageOverlay(canvas.toDataURL("image/png"), bounds, {
      opacity: 1,
      interactive: false,
    }).addTo(realtimeState.radarMap);
  }
}

function isHealthMetric(metricKey) {
  return metricKey === "coldInjury" || metricKey === "tempDiff" || metricKey === "heatInjury";
}

function getHealthDatasetId(metricKey) {
  if (metricKey === "coldInjury") return COLD_INJURY_DATASET;
  if (metricKey === "tempDiff") return TEMP_DIFF_DATASET;
  return HEAT_INJURY_DATASET;
}

function getHealthElementConfig(metricKey) {
  if (metricKey === "coldInjury") {
    return {
      indexKeys: ["ColdInjuryIndex"],
      warningKeys: ["ColdInjuryWarning"],
    };
  }
  if (metricKey === "tempDiff") {
    return {
      indexKeys: ["TemperatureDifferenceIndex", "TempDiffIndex"],
      warningKeys: ["TemperatureDifferenceWarning", "TempDiffWarning"],
    };
  }
  return {
    indexKeys: ["HeatInjuryIndex"],
    warningKeys: ["HeatInjuryWarning"],
  };
}

function pickHealthValue(obj, preferredKeys, fallbackPattern) {
  if (!obj || typeof obj !== "object") return null;
  for (const key of preferredKeys) {
    if (obj[key] !== undefined) return obj[key];
  }
  const dynamicKey = Object.keys(obj).find((key) => fallbackPattern.test(key));
  return dynamicKey ? obj[dynamicKey] : null;
}

function hasHealthWarning(raw) {
  if (raw == null) return false;
  const text = String(raw).trim();
  if (!text) return false;
  if (text === "0" || text === "null" || text === "無" || text === "無警示" || text === "正常") return false;
  return true;
}

function getHealthWarningSeverity(raw, metricKey) {
  if (!hasHealthWarning(raw)) return 0;
  const levelDefs = HEALTH_WARNING_LEVELS[metricKey] || [];
  const text = String(raw).trim();
  const matched = [...levelDefs]
    .sort((a, b) => b.level - a.level)
    .find((def) => def.keywords.some((kw) => text.includes(kw)));
  if (matched) return matched.level;
  const num = Number(raw);
  if (Number.isFinite(num) && num > 0) return Math.min(4, Math.max(1, Math.round(num)));
  if (/(高危險|紅|嚴重|極端)/.test(text)) return 4;
  if (/(危險|高度)/.test(text)) return 3;
  if (/(橙|中|警戒)/.test(text)) return 2;
  return 1;
}

function extractHealthLocations(payload) {
  const recordsLocations = payload?.records?.Locations || payload?.Records?.Locations;
  if (Array.isArray(recordsLocations)) return recordsLocations;
  const root = payload?.cwaopendata || payload;
  const resource = root?.Resources?.Resource || root?.resources?.resource || {};
  const data = resource?.Data || resource?.data || {};
  const locations = data?.Locations || data?.locations || [];
  return Array.isArray(locations) ? locations : [];
}

function extractHealthIssueTime(payload) {
  const recordsLocations = payload?.records?.Locations || payload?.Records?.Locations;
  if (Array.isArray(recordsLocations)) {
    for (const county of recordsLocations) {
      const towns = county?.Location || [];
      if (!Array.isArray(towns)) continue;
      for (const town of towns) {
        const times = town?.Time || [];
        if (!Array.isArray(times)) continue;
        const t = times.find((x) => x?.IssueTime);
        if (t?.IssueTime) return t.IssueTime;
      }
    }
  }
  const root = payload?.cwaopendata || payload;
  const resource = root?.Resources?.Resource || root?.resources?.resource || {};
  const meta = resource?.Metadata || resource?.metadata || {};
  return meta?.IssueTime || meta?.Update || root?.Sent || root?.sent || "";
}

function buildHealthEntries(locations, metricKey, windowHours = 72) {
  const { indexKeys, warningKeys } = getHealthElementConfig(metricKey);
  const entries = [];
  locations.forEach((countyBlock) => {
    const county = normalizeCountyName(countyBlock?.CountyName || countyBlock?.countyName || "");
    const towns = countyBlock?.Location || countyBlock?.location || [];
    if (!Array.isArray(towns)) return;
    towns.forEach((town) => {
      const townName = town?.TownName || town?.townName || "";
      const lat = toNumber(town?.Latitude || town?.latitude);
      const lon = toNumber(town?.Longitude || town?.longitude);
      if (!townName || !Number.isFinite(lat) || !Number.isFinite(lon)) return;
      const times = town?.Time || town?.time || [];
      if (!Array.isArray(times)) return;
      const parsedIssueMs = times
        .map((t) => Date.parse(t?.IssueTime || t?.issueTime || ""))
        .filter((ms) => Number.isFinite(ms));
      const baseIssueMs = parsedIssueMs.length ? Math.min(...parsedIssueMs) : null;
      const cutoffMs = Number.isFinite(baseIssueMs) ? baseIssueMs + Number(windowHours) * 3600 * 1000 : null;

      let best = null;
      times.forEach((t) => {
        const issueTime = t?.IssueTime || t?.issueTime || "";
        if (cutoffMs != null) {
          const ms = Date.parse(issueTime);
          if (!Number.isFinite(ms) || ms > cutoffMs) return;
        }
        const elements = t?.WeatherElements || t?.weatherElements || {};
        const warningRaw = pickHealthValue(elements, warningKeys, /Warning/i);
        if (!hasHealthWarning(warningRaw)) return;
        const severity = getHealthWarningSeverity(warningRaw, metricKey);
        const indexRaw = pickHealthValue(elements, indexKeys, /Index/i);
        const indexValue = toNumber(indexRaw);
        if (!best) {
          best = { severity, warningRaw, indexValue, issueTime };
          return;
        }
        const bestIdx = Number.isFinite(best.indexValue) ? best.indexValue : -Infinity;
        const currentIdx = Number.isFinite(indexValue) ? indexValue : -Infinity;
        if (severity > best.severity || (severity === best.severity && currentIdx > bestIdx)) {
          best = { severity, warningRaw, indexValue, issueTime };
        }
      });

      if (!best) return;
      entries.push({
        id: town?.Geocode || `${county}-${townName}`,
        name: townName,
        county,
        town: townName,
        lat,
        lon,
        value: best.severity,
        healthIndexValue: Number.isFinite(best.indexValue) ? best.indexValue : null,
        healthWarning: String(best.warningRaw ?? "").trim(),
        direction: null,
        temperature: null,
        humidity: null,
        obsTimeRaw: best.issueTime,
        time: formatObsTime(best.issueTime) || best.issueTime || "",
      });
    });
  });
  entries.sort((a, b) => {
    if (b.value !== a.value) return b.value - a.value;
    const ai = Number.isFinite(a.healthIndexValue) ? a.healthIndexValue : -Infinity;
    const bi = Number.isFinite(b.healthIndexValue) ? b.healthIndexValue : -Infinity;
    return bi - ai;
  });
  return entries;
}

function getHealthWindowTimes(times, windowHours = 72) {
  const parsedIssueMs = times
    .map((t) => Date.parse(t?.IssueTime || t?.issueTime || ""))
    .filter((ms) => Number.isFinite(ms));
  const baseIssueMs = parsedIssueMs.length ? Math.min(...parsedIssueMs) : null;
  const cutoffMs = Number.isFinite(baseIssueMs) ? baseIssueMs + Number(windowHours) * 3600 * 1000 : null;
  if (cutoffMs == null) return [...times];
  return times.filter((t) => {
    const ms = Date.parse(t?.IssueTime || t?.issueTime || "");
    return Number.isFinite(ms) && ms <= cutoffMs;
  });
}

function buildHealthTimeline(locations, metricKey, windowHours = 72) {
  const { indexKeys, warningKeys } = getHealthElementConfig(metricKey);
  const timelineEntries = new Map();
  locations.forEach((countyBlock) => {
    const county = normalizeCountyName(countyBlock?.CountyName || countyBlock?.countyName || "");
    const towns = countyBlock?.Location || countyBlock?.location || [];
    if (!Array.isArray(towns)) return;
    towns.forEach((town) => {
      const townName = town?.TownName || town?.townName || "";
      const lat = toNumber(town?.Latitude || town?.latitude);
      const lon = toNumber(town?.Longitude || town?.longitude);
      if (!townName || !Number.isFinite(lat) || !Number.isFinite(lon)) return;
      const times = town?.Time || town?.time || [];
      if (!Array.isArray(times)) return;
      const filteredTimes = getHealthWindowTimes(times, windowHours);
      filteredTimes.forEach((t) => {
        const issueTime = t?.IssueTime || t?.issueTime || "";
        const elements = t?.WeatherElements || t?.weatherElements || {};
        const warningRaw = pickHealthValue(elements, warningKeys, /Warning/i);
        if (!hasHealthWarning(warningRaw)) return;
        const severity = getHealthWarningSeverity(warningRaw, metricKey);
        const indexRaw = pickHealthValue(elements, indexKeys, /Index/i);
        const indexValue = toNumber(indexRaw);
        const arr = timelineEntries.get(issueTime) || [];
        arr.push({
          id: town?.Geocode || `${county}-${townName}`,
          name: townName,
          county,
          town: townName,
          lat,
          lon,
          value: severity,
          healthIndexValue: Number.isFinite(indexValue) ? indexValue : null,
          healthWarning: String(warningRaw ?? "").trim(),
          direction: null,
          temperature: null,
          humidity: null,
          obsTimeRaw: issueTime,
          time: formatObsTime(issueTime) || issueTime || "",
        });
        timelineEntries.set(issueTime, arr);
      });
    });
  });
  const timelineKeys = Array.from(timelineEntries.keys()).sort((a, b) => {
    const ams = Date.parse(a);
    const bms = Date.parse(b);
    if (Number.isFinite(ams) && Number.isFinite(bms)) return ams - bms;
    return String(a).localeCompare(String(b));
  });
  timelineKeys.forEach((k) => {
    const arr = timelineEntries.get(k) || [];
    arr.sort((a, b) => {
      if (b.value !== a.value) return b.value - a.value;
      const ai = Number.isFinite(a.healthIndexValue) ? a.healthIndexValue : -Infinity;
      const bi = Number.isFinite(b.healthIndexValue) ? b.healthIndexValue : -Infinity;
      return bi - ai;
    });
    timelineEntries.set(k, arr);
  });
  return { timelineKeys, timelineEntries };
}

function renderHealthTimelineFrame() {
  const metricKey = healthView?.dom?.metric?.value;
  if (!metricKey) return;
  const keys = healthView.state.timelineKeys || [];
  const idx = Math.max(0, Math.min(keys.length - 1, Number(healthView.state.timelineIndex || 0)));
  const key = keys[idx];
  const entries = key ? healthView.state.timelineEntries.get(key) || [] : [];
  healthView.state.entries = entries;
  renderRankingMap(entries, metricKey, healthView);
  renderRankingTable(entries, metricKey, healthView);
  renderRankingColorbar(metricKey, healthView.dom.colorbar);
  if (healthView.dom.timeline) {
    healthView.dom.timeline.value = String(idx);
  }
  const label = key ? (formatObsTime(key) || key) : "--";
  if (healthView.dom.timelineLabel) {
    healthView.dom.timelineLabel.textContent = label;
  }
  if (healthView.dom.dataTime) {
    healthView.dom.dataTime.textContent = label;
  }
  const windowHours = Number(healthView.dom.window?.value || 72);
  setRankingStatus(healthView, entries.length ? `時間軸 ${label}：${entries.length} 筆警示鄉鎮（${windowHours}小時）` : `時間軸 ${label}：目前無警示鄉鎮（${windowHours}小時）`);
}

async function loadHealthData() {
  if (!healthView?.dom?.metric) return;
  const metricKey = healthView.dom.metric.value;
  const windowHours = Number(healthView.dom.window?.value || 72);
  const mode = healthView.dom.mode?.value || "window";
  setRankingStatus(healthView, `讀取健康氣象預報（${windowHours}小時）...`);
  try {
    await ensureRankingGeo(healthView);
    const datasetId = getHealthDatasetId(metricKey);
    const data = await fetchCwaDataset(datasetId);
    const locations = extractHealthLocations(data);
    if (mode === "timeline") {
      const { timelineKeys, timelineEntries } = buildHealthTimeline(locations, metricKey, windowHours);
      healthView.state.timelineKeys = timelineKeys;
      healthView.state.timelineEntries = timelineEntries;
      healthView.state.timelineIndex = 0;
      if (healthView.dom.timeline) {
        healthView.dom.timeline.min = "0";
        healthView.dom.timeline.max = String(Math.max(0, timelineKeys.length - 1));
        healthView.dom.timeline.step = "1";
        healthView.dom.timeline.value = "0";
      }
      renderHealthTimelineFrame();
    } else {
      const entries = buildHealthEntries(locations, metricKey, windowHours);
      healthView.state.entries = entries;
      healthView.state.timelineKeys = [];
      healthView.state.timelineEntries = new Map();
      await renderRanking(entries, metricKey, healthView);
      const latest = formatObsTime(extractHealthIssueTime(data)) || extractHealthIssueTime(data) || "";
      healthView.dom.dataTime.textContent = latest;
      if (healthView.dom.timelineLabel) healthView.dom.timelineLabel.textContent = "--";
      setRankingStatus(healthView, entries.length ? `已更新 ${entries.length} 筆警示鄉鎮（${windowHours}小時）` : `目前無警示鄉鎮（${windowHours}小時）`);
    }
  } catch (err) {
    console.error(err);
    setRankingStatus(healthView, err.message || "健康氣象地圖載入失敗");
  }
}

function parseRadarRealtime(payload) {
  const root = payload?.cwaopendata || payload?.records || payload?.Records || payload;
  const dataset = root?.dataset || payload?.dataset || {};
  const info = dataset?.datasetInfo || dataset?.DatasetInfo || {};
  const paramSet = info?.parameterSet || info?.ParameterSet || {};
  const startLon = Number(paramSet.StartPointLongitude ?? paramSet.startPointLongitude);
  const startLat = Number(paramSet.StartPointLatitude ?? paramSet.startPointLatitude);
  const gridResolution = Number(paramSet.GridResolution ?? paramSet.gridResolution);
  const gridX = Number(paramSet.GridDimensionX ?? paramSet.gridDimensionX);
  const gridY = Number(paramSet.GridDimensionY ?? paramSet.gridDimensionY);
  const dateTime = paramSet.DateTime || paramSet.dateTime || root?.sent || "";
  const contents = dataset?.contents || dataset?.Contents || {};
  const content = contents.content || contents.Content || "";
  if (!content || !Number.isFinite(startLon) || !Number.isFinite(startLat) || !Number.isFinite(gridResolution)) {
    throw new Error("雷達資料格式不完整");
  }
  return {
    startLon,
    startLat,
    gridResolution,
    gridX,
    gridY,
    dateTime,
    content,
  };
}

function buildRadarCanvas(radar) {
  const canvas = document.createElement("canvas");
  canvas.width = radar.gridX;
  canvas.height = radar.gridY;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(radar.gridX, radar.gridY);
  const values = radar.content.split(",");
  const total = radar.gridX * radar.gridY;
  for (let i = 0; i < total && i < values.length; i += 1) {
    const raw = Number(values[i]);
    const x = i % radar.gridX;
    const y = Math.floor(i / radar.gridX);
    const drawY = radar.gridY - 1 - y;
    const idx = (drawY * radar.gridX + x) * 4;
    if (!Number.isFinite(raw) || raw <= -90) {
      imageData.data[idx + 3] = 0;
      continue;
    }
    const color = radarColor(raw);
    imageData.data[idx] = color[0];
    imageData.data[idx + 1] = color[1];
    imageData.data[idx + 2] = color[2];
    imageData.data[idx + 3] = 200;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function radarColor(value) {
  for (let i = 0; i < RADAR_LEVELS.length; i += 1) {
    if (value <= RADAR_LEVELS[i]) return hexToRgb(RADAR_COLORS[i]);
  }
  return hexToRgb(RADAR_COLORS[RADAR_COLORS.length - 1]);
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

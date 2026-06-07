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
  reloadLightningBtn: document.getElementById("reloadLightningBtn"),
  clearRealtimeBtn: document.getElementById("clearRealtimeBtn"),
  liveTyphoonMap: document.getElementById("liveTyphoonMap"),
  typhoonLiveList: document.getElementById("typhoonLiveList"),
  radarMap: document.getElementById("radarMap"),
  radarStatus: document.getElementById("radarStatus"),
  lightningMap: document.getElementById("lightningMap"),
  lightningStatus: document.getElementById("lightningStatus"),
  lightningSummary: document.getElementById("lightningSummary"),
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
  rankingDataSource: document.getElementById("rankingDataSource"),
  rankingPager: document.getElementById("rankingPager"),
  rankingMap: document.getElementById("rankingMap"),
  reloadRankingBtn: document.getElementById("reloadRankingBtn"),
  rankingColorbar: document.getElementById("rankingColorbar"),
  changhuaAlertReloadBtn: document.getElementById("changhuaAlertReloadBtn"),
  changhuaAlertTabStatus: document.getElementById("changhuaAlertTabStatus"),
  changhuaAlertTypeList: document.getElementById("changhuaAlertTypeList"),
  changhuaAlertTownList: document.getElementById("changhuaAlertTownList"),
  changhuaAlertMap: document.getElementById("changhuaAlertMap"),
  changhuaAlertTableTitle: document.getElementById("changhuaAlertTableTitle"),
  changhuaAlertTableCount: document.getElementById("changhuaAlertTableCount"),
  changhuaAlertValueHeader: document.getElementById("changhuaAlertValueHeader"),
  changhuaAlertTableBody: document.getElementById("changhuaAlertTableBody"),
  taiwanRankingMetric: document.getElementById("taiwanRankingMetric"),
  taiwanRankingStatus: document.getElementById("taiwanRankingStatus"),
  taiwanRankingTableBody: document.getElementById("taiwanRankingTableBody"),
  taiwanRankingCounty: document.getElementById("taiwanRankingCounty"),
  taiwanRankingValueHeader: document.getElementById("taiwanRankingValueHeader"),
  taiwanRankingTable: document.getElementById("taiwanRankingTable"),
  taiwanRankingDataTime: document.getElementById("taiwanRankingDataTime"),
  taiwanRankingDataSource: document.getElementById("taiwanRankingDataSource"),
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
  disasterDataSource: document.getElementById("disasterDataSource"),
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
  healthDataSource: document.getElementById("healthDataSource"),
  healthPager: document.getElementById("healthPager"),
  healthMap: document.getElementById("healthMap"),
  healthReloadBtn: document.getElementById("healthReloadBtn"),
  healthColorbar: document.getElementById("healthColorbar"),
  healthTimelineWrap: document.getElementById("healthTimelineWrap"),
  healthTimeline: document.getElementById("healthTimeline"),
  healthTimelineLabel: document.getElementById("healthTimelineLabel"),
  healthTimelinePlayBtn: document.getElementById("healthTimelinePlayBtn"),
  industryWeatherIndustry: document.getElementById("industryWeatherIndustry"),
  industryWeatherAnimalWrap: document.getElementById("industryWeatherAnimalWrap"),
  industryWeatherAnimal: document.getElementById("industryWeatherAnimal"),
  industryWeatherTown: document.getElementById("industryWeatherTown"),
  industryWeatherTime: document.getElementById("industryWeatherTime"),
  industryWeatherTimelineWrap: document.getElementById("industryWeatherTimelineWrap"),
  industryWeatherTimeline: document.getElementById("industryWeatherTimeline"),
  industryWeatherTimelineLabel: document.getElementById("industryWeatherTimelineLabel"),
  industryWeatherTimelinePlayBtn: document.getElementById("industryWeatherTimelinePlayBtn"),
  industryWeatherReloadBtn: document.getElementById("industryWeatherReloadBtn"),
  industryWeatherStatus: document.getElementById("industryWeatherStatus"),
  industryWeatherMap: document.getElementById("industryWeatherMap"),
  industryWeatherDataTime: document.getElementById("industryWeatherDataTime"),
  industryWeatherInfo: document.getElementById("industryWeatherInfo"),
  industryWeatherLegend: document.getElementById("industryWeatherLegend"),
  industryWeatherThresholdBody: document.getElementById("industryWeatherThresholdBody"),
  townForecastMode: document.getElementById("townForecastMode"),
  townForecastMetric: document.getElementById("townForecastMetric"),
  townForecastTown: document.getElementById("townForecastTown"),
  townForecastTimelineWrap: document.getElementById("townForecastTimelineWrap"),
  townForecastTimeline: document.getElementById("townForecastTimeline"),
  townForecastTimelineLabel: document.getElementById("townForecastTimelineLabel"),
  townForecastTimelinePlayBtn: document.getElementById("townForecastTimelinePlayBtn"),
  townForecastReloadBtn: document.getElementById("townForecastReloadBtn"),
  townForecastStatus: document.getElementById("townForecastStatus"),
  townForecastMap: document.getElementById("townForecastMap"),
  townForecastDataTime: document.getElementById("townForecastDataTime"),
  townForecastInfo: document.getElementById("townForecastInfo"),
  townForecastLegend: document.getElementById("townForecastLegend"),
  townForecastTimelineTable: document.getElementById("townForecastTimelineTable"),
  townForecastQpesums: document.getElementById("townForecastQpesums"),
  townForecastQpesumsTime: document.getElementById("townForecastQpesumsTime"),
  visitTotal: document.getElementById("visitTotal"),
  visitToday: document.getElementById("visitToday"),
  visitStatus: document.getElementById("visitStatus"),
  reloadMarineBtn: document.getElementById("reloadMarineBtn"),
  marineStatus: document.getElementById("marineStatus"),
  marineDataTime: document.getElementById("marineDataTime"),
  marineTableBody: document.getElementById("marineTableBody"),
  marineDate1: document.getElementById("marineDate1"),
  marineDate2: document.getElementById("marineDate2"),
  marineDate3: document.getElementById("marineDate3"),
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
  lightningMap: null,
  lightningLayer: null,
  radarTime: null,
  countiesGeo: null,
  latestObservation: null,
  latestAqi: null,
  latestLightning: null,
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

const changhuaAlertState = {
  map: null,
  townLayer: null,
  stationLayer: null,
  townGeo: null,
  countyCodeMap: null,
  alerts: [],
  selectedType: "",
  selectedTown: "",
  sortDir: "desc",
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
  timelineTimer: null,
  timelinePlaying: false,
};

const industryWeatherState = {
  map: null,
  townLayer: null,
  townGeo: null,
  selectedTownKey: "",
  selectedTownName: "",
  townData: [],
  sourceMode: "idle",
  latestTime: "",
  forecastFrames: [],
  forecastByTown: new Map(),
  forecastIndex: 0,
  forecastTimer: null,
  forecastPlaying: false,
};

const townForecastState = {
  map: null,
  townLayer: null,
  qpesumsLayer: null,
  detailChart: null,
  townGeo: null,
  selectedTownKey: "",
  selectedTownName: "",
  townData: [],
  forecastByTown: new Map(),
  forecastFrames: [],
  forecastIndex: 0,
  forecastTimer: null,
  forecastPlaying: false,
  latestTime: "",
  activeForecastDataset: "F-D0047-019",
  qpesums: null,
  primaryDatasetBlocked: false,
  qpesumsBlocked: false,
};

const CWA_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/rest/datastore";
const CWA_FILEAPI_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/fileapi/v1/opendataapi";
const GEO_ASSETS_BASE = "https://raw.githubusercontent.com/qaz7000810/geo-assets/main";
const GEO_ASSETS_CDN_BASE = "https://cdn.jsdelivr.net/gh/qaz7000810/geo-assets@main";
const GEO_ASSETS_PAGES_BASE = "https://qaz7000810.github.io/geo-assets";
const CHANGHUA_DATA_BASE = `${GEO_ASSETS_BASE}/changhua`;
const TYPHOON_COUNTIES_URL = `${GEO_ASSETS_BASE}/typhoon/counties.geojson`;
const RADAR_DATASET = "O-A0059-001";
const LIGHTNING_DATASET = "O-A0039-001";
const LIGHTNING_SAMPLE_URL = "./data/lightning/O-A0039-001.kmz";
const NCUE_COORDS = { lat: 24.0816, lon: 120.5584 };
const LIGHTNING_ALERT_RADIUS_KM = 10;
const LIGHTNING_ALERT_RECENT_MINUTES = 60;
const TAIWAN_MAIN_ISLAND_BOUNDS = [
  [21.75, 119.9],
  [25.45, 122.15],
];
const RADAR_LEVELS = [0, 5, 10, 20, 30, 40, 50, 60];
const RADAR_COLORS = ["#d2f5ff", "#9be7ff", "#5bc0ff", "#1f78ff", "#00d26a", "#f6f930", "#ff8c1a", "#ff2d2d"];
const CWA_API_KEY = "";
const NCUE_STATION_KEYWORDS = ["彰師大", "彰化師大", "國立彰化師範大學", "NCUE"];
const AQI_ENDPOINT = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/aqi";
const AIRBOX_PM25_ENDPOINT = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/airbox";
const AQI_SITE_KEYWORDS = ["彰化"];
const AQI_API_KEY = "";
const REALTIME_COUNTY = "彰化縣";
const RANKING_DATASET = "O-A0003-001";
const NON_RAIN_FALLBACK_DATASET = "O-A0001-001";
const RAIN_DATASET = "O-A0002-001";
const TOWN_FORECAST_DATASET = "F-D0047-017";
const CHANGHUA_TOWN_FORECAST_DATASET = "F-D0047-019";
const QPESUMS_FORECAST_DATASET = "F-B0046-001";
const COLD_INJURY_DATASET = "F-A0085-003";
const TEMP_DIFF_DATASET = "F-A0085-005";
const HEAT_INJURY_DATASET = "M-A0085-001";
const VISIT_COUNTER_NAMESPACE = "ncueweather-qaz7000810";
const VISIT_COUNTER_TOTAL_KEY = "visit-total";
const VISIT_COUNTER_BASE = "https://faein.climate-quiz-yuchen.workers.dev/api/v1/visit";
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
const PM25_LEVELS = [0, 12.5, 30.5, 50.5, 125.5, 225.5];
const PM25_COLORS = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const PM10_LEVELS = [0, 31, 76, 191, 355, 425];
const PM10_COLORS = ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const O3_LEVELS = [0, 101, 135, 205, 405];
const O3_COLORS = ["#00e400", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"];
const NO2_LEVELS = [0, 22, 101, 361, 650, 1250];
const NO2_COLORS = [...AQI_COLORS];
const SO2_LEVELS = [0, 9, 66, 161, 305, 605];
const SO2_COLORS = [...AQI_COLORS];
const CO_LEVELS = [0, 4.5, 9.5, 12.5, 15.5, 30.5];
const CO_COLORS = [...AQI_COLORS];
const AIR_QUALITY_LEVEL_LABELS = ["良好", "普通", "注意", "警戒", "嚴重", "危害"];
const O3_LEVEL_LABELS = ["良好", "注意", "警戒", "嚴重", "危害"];
const DISASTER_TEMP_LOW_THRESHOLD = 12;
const DISASTER_TEMP_HIGH_THRESHOLD = 35;
const DISASTER_APPARENT_TEMP_LOW_THRESHOLD = 10;
const DISASTER_APPARENT_TEMP_HIGH_THRESHOLD = 37;
const DISASTER_HUMIDITY_LOW_THRESHOLD = 45;
const DISASTER_HUMIDITY_FOG_THRESHOLD = 97;
const DISASTER_RAIN_THRESHOLD = 40;
const DISASTER_RAIN_3HR_THRESHOLD = 100;
const DISASTER_RAIN_24HR_THRESHOLD = 200;
const DISASTER_PM10_THRESHOLD = 255;
const DISASTER_O3_THRESHOLD = 101;
const DAILY_TEMP_DIFF_LEVELS = [0, 5, 7, 9, 11, 13, 15, 17];
const DAILY_TEMP_DIFF_COLORS = ["#22c55e", "#84cc16", "#eab308", "#f59e0b", "#f97316", "#ef4444", "#c026d3", "#7c3aed"];
const DAILY_TEMP_DIFF_LABELS = ["<=4", "5-6", "7-8", "9-10", "11-12", "13-14", "15-16", ">=17"];
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

const INDUSTRY_WEATHER_NEUTRAL_COLOR = "#cbd5e1";
const INDUSTRY_WEATHER_LEVELS = [
  { key: "normal", label: "正常", color: "#2fbe82" },
  { key: "attention", label: "注意 / 輕度", color: "#f2c94c" },
  { key: "alert", label: "警戒 / 中度", color: "#f39c34" },
  { key: "danger", label: "危險 / 嚴重", color: "#d14343" },
  { key: "extreme", label: "極危險", color: "#8b1e3f" },
];
const INDUSTRY_PLACEHOLDER_COPY = {
  agriculture: "農業氣象功能建置中",
  fishery: "漁業氣象功能建置中",
};
const LIVESTOCK_ANIMALS = {
  cattle: {
    label: "牛",
    metric: "thi",
    metricLabel: "THI",
    thresholds: [
      { min: -Infinity, max: 72, level: "normal", label: "正常", description: "THI < 72" },
      { min: 72, max: 80, level: "attention", label: "注意 / 輕度", description: "THI ≥ 72" },
      { min: 80, max: 90, level: "alert", label: "警戒 / 中度", description: "THI ≥ 80" },
      { min: 90, max: 99, level: "danger", label: "嚴重 / 高度", description: "THI ≥ 90" },
      { min: 99, max: Infinity, level: "extreme", label: "危險", description: "THI ≥ 99" },
    ],
  },
  chicken: {
    label: "雞",
    metric: "thi_temp",
    metricLabel: "THI / 氣溫",
    thresholds: [
      { minThi: null, minTemp: null, level: "normal", label: "正常", description: "THI < 72 且氣溫 < 30°C" },
      { minThi: 72, minTemp: 30, level: "attention", label: "注意 / 輕度", description: "THI ≥ 72 或氣溫 ≥ 30°C" },
      { minThi: 80, minTemp: 32, level: "alert", label: "警戒 / 中度", description: "THI ≥ 80 或氣溫 ≥ 32°C" },
      { minThi: 90, minTemp: 35, level: "danger", label: "嚴重 / 高度", description: "THI ≥ 90 或氣溫 ≥ 35°C" },
      { minThi: 99, minTemp: 37, level: "extreme", label: "危險", description: "THI ≥ 99 或氣溫 ≥ 37°C" },
    ],
  },
  pig: {
    label: "豬",
    metric: "thi_temp",
    metricLabel: "THI / 氣溫",
    thresholds: [
      { minThi: null, minTemp: null, level: "normal", label: "正常", description: "THI < 75 且氣溫 < 30°C" },
      { minThi: 75, minTemp: 30, level: "attention", label: "注意 / 輕度", description: "THI ≥ 75 或氣溫 ≥ 30°C" },
      { minThi: 79, minTemp: 32, level: "alert", label: "警戒 / 中度", description: "THI ≥ 79 或氣溫 ≥ 32°C" },
      { minThi: 84, minTemp: 35, level: "danger", label: "嚴重 / 高度", description: "THI ≥ 84 或氣溫 ≥ 35°C" },
      { minThi: 90, minTemp: 37, level: "extreme", label: "危險", description: "THI ≥ 90 或氣溫 ≥ 37°C" },
    ],
  },
  goat: {
    label: "羊",
    metric: "thi_temp",
    metricLabel: "THI / 氣溫",
    thresholds: [
      { minThi: null, minTemp: null, level: "normal", label: "正常", description: "THI < 75 且氣溫 < 30°C" },
      { minThi: 75, minTemp: 30, level: "attention", label: "注意 / 輕度", description: "THI ≥ 75 或氣溫 ≥ 30°C" },
      { minThi: 79, minTemp: 32, level: "alert", label: "警戒 / 中度", description: "THI ≥ 79 或氣溫 ≥ 32°C" },
      { minThi: 84, minTemp: 35, level: "danger", label: "嚴重 / 高度", description: "THI ≥ 84 或氣溫 ≥ 35°C" },
      { minThi: 90, minTemp: 37, level: "extreme", label: "危險", description: "THI ≥ 90 或氣溫 ≥ 37°C" },
    ],
  },
  duck: {
    label: "鴨",
    metric: "temp",
    metricLabel: "氣溫",
    thresholds: [
      { min: -Infinity, max: 30, level: "normal", label: "正常", description: "氣溫 < 30°C" },
      { min: 30, max: 32, level: "attention", label: "注意 / 輕度", description: "氣溫 ≥ 30°C" },
      { min: 32, max: 35, level: "alert", label: "警戒 / 中度", description: "氣溫 ≥ 32°C" },
      { min: 35, max: 37, level: "danger", label: "嚴重 / 高度", description: "氣溫 ≥ 35°C" },
      { min: 37, max: Infinity, level: "extreme", label: "危險", description: "氣溫 ≥ 37°C" },
    ],
  },
  goose: {
    label: "鵝",
    metric: "temp_dual",
    metricLabel: "氣溫",
    thresholds: [
      { min: 18, max: 28, level: "normal", label: "正常", description: "18°C < 氣溫 < 28°C" },
      { minTemp: 28, maxTemp: 16, level: "attention", label: "注意 / 輕度", description: "氣溫 ≥ 28°C 或 ≤ 16°C" },
      { minTemp: 30, maxTemp: 14, level: "alert", label: "警戒 / 中度", description: "氣溫 ≥ 30°C 或 ≤ 14°C" },
      { minTemp: 32, maxTemp: 12, level: "danger", label: "嚴重 / 高度", description: "氣溫 ≥ 32°C 或 ≤ 12°C" },
      { minTemp: 35, maxTemp: 10, level: "extreme", label: "危險", description: "氣溫 ≥ 35°C 或 ≤ 10°C" },
    ],
  },
};

const rankingMetrics = {
  temp: {
    label: "即時氣溫",
    unit: "°C",
    value: (station) => normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 }),
    direction: null,
    colorScale: "temp",
  },
  tempHighLow: {
    label: "溫差",
    unit: "℃",
    value: (station) => {
      const { low, high } = readDailyTemperatureExtremes(station);
      return Number.isFinite(low) && Number.isFinite(high) ? high - low : null;
    },
    direction: null,
    colorScale: "tempDiff",
  },
  tempDailyLow: {
    label: "最低溫",
    unit: "°C",
    value: (station) => readDailyTemperatureExtremes(station).low,
    direction: null,
    colorScale: "temp",
  },
  tempDailyHigh: {
    label: "最高溫",
    unit: "°C",
    value: (station) => readDailyTemperatureExtremes(station).high,
    direction: null,
    colorScale: "temp",
  },
  apparent: {
    label: "體感溫度",
    unit: "°C",
    value: (station) => {
      const temp = normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 });
      let humidity = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
      if (humidity != null && humidity >= 0 && humidity <= 1) humidity *= 100;
      const windSpeed = normalizeObservationNumber(readWeatherElement(station, "WindSpeed"), { min: 0 });
      return calcApparentTemp(temp, humidity, windSpeed);
    },
    direction: null,
    colorScale: "temp",
  },
  humidity: {
    label: "相對濕度",
    unit: "%",
    value: (station) => {
      let h = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
      if (h != null && h <= 1) h *= 100;
      return h;
    },
    direction: null,
    colorScale: "humidity",
  },
  wind: {
    label: "平均風速",
    unit: "m/s",
    value: (station) => normalizeObservationNumber(readWeatherElement(station, "WindSpeed"), { min: 0 }),
    direction: (station) => normalizeObservationNumber(readWeatherElement(station, "WindDirection"), { min: 0, max: 360 }),
    colorScale: "wind",
  },
  gust: {
    label: "最大陣風",
    unit: "m/s",
    value: (station) =>
      normalizeObservationNumber(readWeatherNested(station, "GustInfo.PeakGustSpeed"), { min: 0 }) ??
      normalizeObservationNumber(readWeatherElement(station, "PeakGustSpeed"), { min: 0 }) ??
      normalizeObservationNumber(readWeatherElement(station, "GustWindSpeed"), { min: 0 }),
    direction: (station) =>
      normalizeObservationNumber(readWeatherNested(station, "GustInfo.Occurred_at.WindDirection"), { min: 0, max: 360 }) ??
      normalizeObservationNumber(readWeatherElement(station, "WindDirection"), { min: 0, max: 360 }),
    colorScale: "wind",
  },
  rain: {
    label: "1小時雨量",
    unit: "mm",
    value: (station) =>
      normalizeObservationNumber(readRainElement(station, "Past1hr"), { min: 0 }) ??
      normalizeObservationNumber(readRainElement(station, "Now"), { min: 0 }),
    direction: null,
    colorScale: "rain",
  },
  rain3hr: {
    label: "3小時雨量",
    unit: "mm",
    value: (station) => normalizeObservationNumber(readRainElement(station, "Past3hr"), { min: 0 }),
    direction: null,
    colorScale: "rain",
  },
  rain24hr: {
    label: "24小時雨量",
    unit: "mm",
    value: (station) => normalizeObservationNumber(readRainElement(station, "Past24hr"), { min: 0 }),
    direction: null,
    colorScale: "rain",
  },
  lightning: {
    label: "雷擊預警",
    unit: "筆",
    value: () => null,
    direction: null,
    colorScale: "lightning",
  },
  dailyTempDiff: {
    label: "日最大溫差",
    unit: "℃",
    value: (station) => {
      const { low, high } = readDailyTemperatureExtremes(station);
      return Number.isFinite(low) && Number.isFinite(high) ? high - low : null;
    },
    direction: null,
    colorScale: "tempDiff",
  },
  thi: {
    label: "溫濕度指數 (THI)",
    unit: "",
    value: (station) => {
      const temp = normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 });
      let humidity = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
      if (humidity != null && humidity <= 1) humidity *= 100;
      return computeThi(temp, humidity);
    },
    direction: null,
    colorScale: "thi",
  },
  aqi: {
    label: "AQI（環境部）",
    unit: "",
    value: () => null,
    direction: null,
    colorScale: "aqi",
  },
  pm25: {
    label: "PM2.5（環境部）",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm25",
  },
  pm25Airbox: {
    label: "PM2.5（空氣盒子）",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm25",
  },
  pm10Airbox: {
    label: "PM10（空氣盒子）",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm10",
  },
  pm1Airbox: {
    label: "PM1（空氣盒子）",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm25",
  },
  pm10: {
    label: "PM10（環境部）",
    unit: "μg/m3",
    value: () => null,
    direction: null,
    colorScale: "pm10",
  },
  o3: {
    label: "臭氧（環境部）",
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

const rankingMetricKeys = ["temp", "apparent", "tempDailyLow", "tempDailyHigh", "tempHighLow", "humidity", "wind", "gust", "rain", "rain3hr", "rain24hr", "thi", "aqi", "pm25", "pm10", "o3", "pm1Airbox", "pm25Airbox", "pm10Airbox"];
const taiwanMetricKeys = [...rankingMetricKeys];

const disasterMetricKeys = ["temp", "apparent", "tempDailyLow", "tempDailyHigh", "dailyTempDiff", "humidity", "wind", "gust", "rain", "rain3hr", "rain24hr", "lightning", "aqi", "pm25", "pm10", "o3", "pm1Airbox", "pm25Airbox", "pm10Airbox"];
const healthMetricKeys = ["coldInjury", "tempDiff", "heatInjury"];
const compactMetricLabels = {
  temp: "氣溫",
  apparent: "體感",
  tempDailyLow: "最低溫",
  tempDailyHigh: "最高溫",
  tempHighLow: "溫差",
  dailyTempDiff: "溫差",
  humidity: "濕度",
  wind: "平均風",
  gust: "陣風",
  rain: "雨量(1h)",
  rain3hr: "雨量(3h)",
  rain24hr: "雨量(24h)",
  thi: "溫濕指數",
  lightning: "雷擊",
  aqi: "AQI(環)",
  pm25: "PM2.5(環)",
  pm10: "PM10(環)",
  o3: "臭氧(環)",
  pm1Airbox: "PM1(空)",
  pm25Airbox: "PM2.5(空)",
  pm10Airbox: "PM10(空)",
};
const COUNTY_GROUPS = {
  新竹: ["新竹市", "新竹縣"],
  嘉義: ["嘉義市", "嘉義縣"],
};

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
    dataSource: dom.disasterDataSource,
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
    dataSource: dom.healthDataSource,
    pager: dom.healthPager,
    map: dom.healthMap,
    reloadBtn: dom.healthReloadBtn,
    colorbar: dom.healthColorbar,
    timelineWrap: dom.healthTimelineWrap,
    timeline: dom.healthTimeline,
    timelineLabel: dom.healthTimelineLabel,
    playBtn: dom.healthTimelinePlayBtn,
  },
  state: healthState,
  geojsonUrl: "./data/changhua/changhua_townships.geojson",
  areaProp: "名稱",
  areaType: "town",
  showTownColumn: false,
  countyFilter: REALTIME_COUNTY,
  mapCenter: [23.99, 120.46],
  mapZoom: 11,
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
      dataSource: dom.rankingDataSource,
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
      dataSource: dom.taiwanRankingDataSource,
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

const changhuaAlertView = {
  key: "changhua-alerts",
  dom: {
    map: dom.changhuaAlertMap,
    status: dom.changhuaAlertTabStatus,
    typeList: dom.changhuaAlertTypeList,
    townList: dom.changhuaAlertTownList,
    tableTitle: dom.changhuaAlertTableTitle,
    tableCount: dom.changhuaAlertTableCount,
    valueHeader: dom.changhuaAlertValueHeader,
    tableBody: dom.changhuaAlertTableBody,
    reloadBtn: dom.changhuaAlertReloadBtn,
  },
  state: changhuaAlertState,
  geojsonUrl: "./data/changhua/changhua_townships.geojson",
  areaProp: "名稱",
  areaType: "town",
  countyFilter: REALTIME_COUNTY,
  mapCenter: [23.98, 120.46],
  mapZoom: 10,
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindTabs();
  bindEvents();
  loadVisitorCounters();
  await loadIndex();
  await loadStationsMeta();
  buildCountyOptions();
  updateRangeLabel();
  updateLoadButtonState();
  setStatus("請先選測站或縣市與時間區間，再點重新載入。");
  initRealtimeView();
  initRankingViews();
  initChanghuaAlertView();
  initDisasterView();
  initHealthView();
  initTownForecastView();
  initIndustryWeatherView();
  initMarineView();
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
      if (target === "changhua-alerts") {
        requestAnimationFrame(() => {
          ensureRankingMapSized(changhuaAlertView);
          renderChanghuaAlertMap();
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
      if (target === "industry-weather") {
        requestAnimationFrame(() => {
          ensureIndustryWeatherMapSized();
        });
      }
      if (target === "town-forecast") {
        requestAnimationFrame(() => {
          ensureTownForecastMapSized();
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
  dom.reloadLightningBtn?.addEventListener("click", loadLightningData);
  dom.reloadNCUEBtn?.addEventListener("click", loadNCUEObservation);
  dom.reloadAqiBtn?.addEventListener("click", loadAqiData);
  dom.clearRealtimeBtn?.addEventListener("click", clearRealtimeDisplay);
  bindRankingViewEvents(rankingViews.changhua);
  bindRankingViewEvents(rankingViews.taiwan);
  bindDisasterViewEvents();
  bindHealthViewEvents();
  bindTownForecastEvents();
  bindIndustryWeatherEvents();
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

async function loadVisitorCounters() {
  if (!dom.visitTotal || !dom.visitToday || !dom.visitStatus) return;
  dom.visitStatus.textContent = "計數更新中…";
  try {
    const todayKey = buildTodayCounterKey();
    const [total, today] = await Promise.all([
      hitVisitCounterApi(VISIT_COUNTER_TOTAL_KEY),
      hitVisitCounterApi(todayKey),
    ]);
    dom.visitTotal.textContent = formatCounterValue(total);
    dom.visitToday.textContent = formatCounterValue(today);
    dom.visitStatus.textContent = "已更新";
  } catch (err) {
    console.warn("visit counter remote failed, fallback to local:", err);
    const local = hitLocalCounter();
    dom.visitTotal.textContent = formatCounterValue(local.total);
    dom.visitToday.textContent = formatCounterValue(local.today);
    dom.visitStatus.textContent = "本機計數（網路計數不可用）";
  }
}

async function hitVisitCounterApi(key) {
  const endpoint = `${VISIT_COUNTER_BASE}/hit/${encodeURIComponent(VISIT_COUNTER_NAMESPACE)}/${encodeURIComponent(key)}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`counter api ${res.status}`);
  }
  const data = await res.json();
  const value = Number(data?.value ?? data?.count ?? data?.data?.value ?? data?.data?.count ?? 0);
  if (!Number.isFinite(value)) {
    throw new Error("counter api invalid payload");
  }
  return value;
}

function buildTodayCounterKey() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find((p) => p.type === "year")?.value || String(d.getFullYear());
  const m = parts.find((p) => p.type === "month")?.value || String(d.getMonth() + 1).padStart(2, "0");
  const day = parts.find((p) => p.type === "day")?.value || String(d.getDate()).padStart(2, "0");
  return `visit-${y}${m}${day}`;
}

function formatCounterValue(v) {
  return Number.isFinite(v) ? v.toLocaleString("zh-TW") : "--";
}

function hitLocalCounter() {
  const base = `${VISIT_COUNTER_NAMESPACE}:local`;
  const todayKey = buildTodayCounterKey();
  const dayStoreKey = `${base}:${todayKey}`;
  const totalStoreKey = `${base}:total`;
  const sessionHitKey = `${base}:session-hit:${todayKey}`;
  const alreadyHit = sessionStorage.getItem(sessionHitKey) === "1";

  let total = Number(localStorage.getItem(totalStoreKey) || 0);
  let today = Number(localStorage.getItem(dayStoreKey) || 0);
  if (!Number.isFinite(total) || total < 0) total = 0;
  if (!Number.isFinite(today) || today < 0) today = 0;

  if (!alreadyHit) {
    total += 1;
    today += 1;
    localStorage.setItem(totalStoreKey, String(total));
    localStorage.setItem(dayStoreKey, String(today));
    sessionStorage.setItem(sessionHitKey, "1");
  }

  return { total, today };
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
  initLightningMap();
  loadNCUEObservation();
  loadAqiData();
  loadForecast(REALTIME_COUNTY);
  loadWeatherAlerts();
  loadLiveTyphoon();
  loadRadarComposite();
  loadLightningData();
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

function initLightningMap() {
  if (!dom.lightningMap || realtimeState.lightningMap) return;
  realtimeState.lightningMap = L.map("lightningMap", { zoomControl: true, preferCanvas: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(realtimeState.lightningMap);
  resetLightningMapView();
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
  if (realtimeState.lightningMap) {
    realtimeState.lightningMap.invalidateSize();
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
      loadLightningData(),
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
  if (dom.lightningStatus) dom.lightningStatus.textContent = "尚未載入";
  realtimeState.latestLightning = null;
  updateLightningSummary();
  if (realtimeState.typhoonLayer && realtimeState.typhoonMap) {
    realtimeState.typhoonMap.removeLayer(realtimeState.typhoonLayer);
    realtimeState.typhoonLayer = null;
  }
  if (realtimeState.radarLayer && realtimeState.radarMap) {
    realtimeState.radarMap.removeLayer(realtimeState.radarLayer);
    realtimeState.radarLayer = null;
  }
  if (realtimeState.lightningLayer && realtimeState.lightningMap) {
    realtimeState.lightningMap.removeLayer(realtimeState.lightningLayer);
    realtimeState.lightningLayer = null;
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
    if (v >= 301) return { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" };
    if (v >= 201) return { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" };
    if (v >= 151) return { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" };
    if (v >= 101) return { label: "不良 (過敏體質者注意)", className: "local-alert--aqi-orange" };
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
      { min: 36, max: 55, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 56, max: 150, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 151, max: 250, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 251, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
    pm10: [
      { min: 101, max: 255, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 256, max: 355, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 356, max: 425, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 426, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
    o3: [
      { min: 101, max: 134, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 135, max: 204, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 205, max: 404, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 405, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
    co: [
      { min: 9.5, max: 12.4, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 12.5, max: 15.4, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 15.5, max: 30.4, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 30.5, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
    so2: [
      { min: 76, max: 185, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 186, max: 304, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 305, max: 604, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 605, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
    no2: [
      { min: 361, max: 649, level: { label: "偏高 (過敏體質者注意)", className: "local-alert--aqi-orange" } },
      { min: 650, max: 1249, level: { label: "過高 (所有人員應注意)", className: "local-alert--aqi-red" } },
      { min: 1250, max: 1649, level: { label: "嚴重 (已達影響健康標準)", className: "local-alert--aqi-purple" } },
      { min: 1650, max: 10000, level: { label: "危害 (已達危害健康標準)", className: "local-alert--aqi-maroon" } },
    ],
  };

  if (obs) {
    if (Number.isFinite(obs.temp) && obs.temp >= DISASTER_TEMP_HIGH_THRESHOLD) add(`溫度 ≥ ${DISASTER_TEMP_HIGH_THRESHOLD}（目前溫度偏高）`);
    if (Number.isFinite(obs.temp) && obs.temp <= DISASTER_TEMP_LOW_THRESHOLD) add(`溫度 ≤ ${DISASTER_TEMP_LOW_THRESHOLD}（目前溫度偏低）`);
    if (Number.isFinite(obs.apparent) && obs.apparent >= DISASTER_APPARENT_TEMP_HIGH_THRESHOLD) add(`體感溫度 ≥ ${DISASTER_APPARENT_TEMP_HIGH_THRESHOLD}（目前體感溫度偏高）`);
    if (Number.isFinite(obs.apparent) && obs.apparent <= DISASTER_APPARENT_TEMP_LOW_THRESHOLD) add(`體感溫度 ≤ ${DISASTER_APPARENT_TEMP_LOW_THRESHOLD}（目前體感溫度偏低）`);
    if (Number.isFinite(obs.humidity) && obs.humidity <= DISASTER_HUMIDITY_LOW_THRESHOLD) add(`濕度 ≤ ${DISASTER_HUMIDITY_LOW_THRESHOLD}%（目前濕度偏低）`);
    if (Number.isFinite(obs.humidity) && obs.humidity > DISASTER_HUMIDITY_FOG_THRESHOLD) add(`濕度 > ${DISASTER_HUMIDITY_FOG_THRESHOLD}%（可能起霧或下雨）`);
    const windLevel = windToBeaufortLevel(obs.windSpeed);
    const gustLevel = windToBeaufortLevel(obs.gust);
    if (Number.isFinite(windLevel) && windLevel >= 4) add("風速 ≥ 4級（目前風速偏大）");
    if (Number.isFinite(gustLevel) && gustLevel >= 6) add("陣風 ≥ 6級（目前陣風偏大）");
    if (Number.isFinite(obs.rain) && obs.rain > DISASTER_RAIN_THRESHOLD) add(`雨量 > ${DISASTER_RAIN_THRESHOLD}（目前雨量偏大）`);
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
    if (o3Level) add(`O3(1hr) ${o3Level.label}（${aqi.o3} ppb）`, { levelClass: o3Level.className });
    const so2Level = getPollutantLevel(aqi.so2, pollutantLevels.so2);
    if (so2Level) add(`SO2 ${so2Level.label}（${aqi.so2} ppb）`, { levelClass: so2Level.className });
    const no2Level = getPollutantLevel(aqi.no2, pollutantLevels.no2);
    if (no2Level) add(`NO2 ${no2Level.label}（${aqi.no2} ppb）`, { levelClass: no2Level.className });
    const coLevel = getPollutantLevel(aqi.co, pollutantLevels.co);
    if (coLevel) add(`CO ${coLevel.label}（${aqi.co} ppm）`, { levelClass: coLevel.className });
  }

  const lightningAlert = buildLocalLightningAlert(realtimeState.latestLightning, obs);
  if (lightningAlert) {
    add(lightningAlert, { levelClass: "local-alert--aqi-red" });
  }

  return alerts;
}

function buildLocalLightningAlert(lightning, obs) {
  const center = {
    lat: Number(obs?.lat ?? NCUE_COORDS.lat),
    lon: Number(obs?.lon ?? NCUE_COORDS.lon),
  };
  const nearby = findLightningAlertPoints(lightning, {
    center,
    radiusKm: LIGHTNING_ALERT_RADIUS_KM,
    recentMinutes: LIGHTNING_ALERT_RECENT_MINUTES,
    groundOnly: true,
  });
  if (!nearby.length) return "";
  const nearest = nearby[0];
  const ageText = Number.isFinite(nearest.ageMinutes) ? `，約 ${Math.round(nearest.ageMinutes)} 分鐘前` : "";
  return `雷擊預警：彰師大 ${LIGHTNING_ALERT_RADIUS_KM} 公里內偵測到對地閃電 ${nearby.length} 筆（最近 ${nearest.distanceKm.toFixed(1)} 公里${ageText}）`;
}

function buildTownLightningAlerts(lightning, view) {
  const features = view?.state?.townGeo?.features || [];
  const targetCounty = normalizeCountyName(REALTIME_COUNTY);
  return features
    .filter((feature) => isFeatureInTargetCounty(feature, view, targetCounty))
    .map((feature) => {
      const town = getTownFeatureName(feature);
      if (!town) return null;
      const center = getIndustryFeatureCenter(feature);
      const points = findLightningAlertPoints(lightning, {
        center,
        radiusKm: LIGHTNING_ALERT_RADIUS_KM,
        recentMinutes: LIGHTNING_ALERT_RECENT_MINUTES,
        groundOnly: true,
      });
      return points.length ? { town, count: points.length, nearest: points[0] } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.count - a.count || a.town.localeCompare(b.town, "zh-Hant"));
}

function buildLightningDisasterEntries(lightning, view) {
  const features = view?.state?.townGeo?.features || [];
  return features
    .filter((feature) => shouldIncludeFeatureForView(feature, view))
    .map((feature, index) => {
      const town = getTownFeatureName(feature);
      if (!town) return null;
      const county = getFeatureCountyName(feature) || normalizeCountyName(view?.countyFilter || "") || REALTIME_COUNTY;
      const center = getIndustryFeatureCenter(feature);
      const points = findLightningAlertPoints(lightning, {
        center,
        radiusKm: LIGHTNING_ALERT_RADIUS_KM,
        recentMinutes: LIGHTNING_ALERT_RECENT_MINUTES,
        groundOnly: true,
      });
      if (!points.length) return null;
      const nearest = points[0];
      const ageText = Number.isFinite(nearest.ageMinutes) ? `約 ${Math.round(nearest.ageMinutes)} 分鐘前` : "";
      return {
        id: `lightning-${town}-${index}`,
        name: `${town}中心點 ${LIGHTNING_ALERT_RADIUS_KM} 公里內`,
        county,
        town,
        lat: center.lat,
        lon: center.lon,
        value: points.length,
        time: ageText ? `最近雷擊：${ageText}` : "",
        nearestDistanceKm: nearest.distanceKm,
        nearestAgeMinutes: nearest.ageMinutes,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.value - a.value || a.town.localeCompare(b.town, "zh-Hant"));
}

function shouldIncludeFeatureForView(feature, view) {
  const countyFilter = normalizeCountyName(view?.countyFilter || "");
  if (!countyFilter) return true;
  return isFeatureInTargetCounty(feature, view, countyFilter);
}

function isFeatureInTargetCounty(feature, view, targetCounty) {
  const county = getFeatureCountyName(feature);
  if (county) return county === targetCounty;
  if (normalizeCountyName(view?.countyFilter || "") === targetCounty) return true;
  return String(view?.geojsonUrl || "").includes("changhua");
}

function getFeatureCountyName(feature) {
  return normalizeCountyName(
    feature?.properties?.COUNTYNAME ||
      feature?.properties?.CountyName ||
      feature?.properties?.countyName ||
      ""
  );
}

function getTownFeatureName(feature) {
  return normalizeIndustryTownName(String(
    feature?.properties?.TOWNNAME ||
      feature?.properties?.TownName ||
      feature?.properties?.townName ||
      feature?.properties?.[TOWN_NAME_FIELD] ||
      feature?.properties?.name ||
      ""
  ).trim());
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

function getStationId(station) {
  return station?.StationId || station?.stationId || station?.StationID || station?.StationNo || "";
}

function getStationMergeKey(station) {
  const id = String(getStationId(station) || "").trim();
  if (id) return `id:${id}`;

  const geo = station?.GeoInfo || station?.geoInfo || {};
  const county = normalizeCountyName(geo?.CountyName || geo?.countyName || "");
  const town = String(geo?.TownName || geo?.townName || "").trim();
  const name = getStationName(station).trim();
  const coords = readStationCoords(geo);
  const coordKey = coords ? `${coords.lat},${coords.lon}` : "";
  return `meta:${county}|${town}|${name}|${coordKey}`;
}

function mergeCwaStations(primaryStations, secondaryStations) {
  const merged = [];
  const seen = new Set();
  [primaryStations, secondaryStations].forEach((list) => {
    (list || []).forEach((station) => {
      const key = getStationMergeKey(station);
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      merged.push(station);
    });
  });
  return merged;
}

async function fetchMergedRealtimeStationBundle() {
  const [primaryResult, fallbackResult] = await Promise.allSettled([
    fetchCwaDataset(RANKING_DATASET),
    fetchCwaDataset(NON_RAIN_FALLBACK_DATASET),
  ]);
  const primaryStations = primaryResult.status === "fulfilled" ? extractCwaStations(primaryResult.value) : [];
  const fallbackStations = fallbackResult.status === "fulfilled" ? extractCwaStations(fallbackResult.value) : [];
  if (!primaryStations.length && !fallbackStations.length) {
    throw primaryResult.status === "rejected"
      ? primaryResult.reason
      : fallbackResult.status === "rejected"
        ? fallbackResult.reason
        : new Error("找不到即時測站資料");
  }
  return {
    primary: primaryStations,
    fallback: fallbackStations,
    merged: mergeCwaStations(primaryStations, fallbackStations),
  };
}

async function fetchMergedRealtimeStations() {
  const bundle = await fetchMergedRealtimeStationBundle();
  return bundle.merged;
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

function readDailyTemperatureExtremes(station) {
  const low =
    normalizeObservationNumber(readWeatherNested(station, "DailyExtreme.DailyLow.TemperatureInfo.AirTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherNested(station, "DailyLow.TemperatureInfo.AirTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherElement(station, "DailyLowTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherElement(station, "MinTemperature"), { min: -80, max: 80 });
  const high =
    normalizeObservationNumber(readWeatherNested(station, "DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherNested(station, "DailyHigh.TemperatureInfo.AirTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherElement(station, "DailyHighTemperature"), { min: -80, max: 80 }) ??
    normalizeObservationNumber(readWeatherElement(station, "MaxTemperature"), { min: -80, max: 80 });
  return { low, high };
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
  if (typeof value === "string" && value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeObservationNumber(value, options = {}) {
  const num = toNumber(value);
  if (!isValidObservation(num)) return null;
  if (Number.isFinite(options.min) && num < options.min) return null;
  if (Number.isFinite(options.max) && num > options.max) return null;
  return num;
}

function formatValue(value, unit = "", digits = 1) {
  if (!isValidObservation(value)) return "—";
  const num = Number(value);
  const fixed = typeof digits === "number" ? num.toFixed(digits) : String(num);
  return `${fixed}${unit}`;
}

function formatObsTime(value) {
  if (!value) return "";
  const raw = String(value).trim();
  if (/[zZ]$|[+-]\d{2}:\d{2}$/.test(raw)) {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
      return formatDateInTaipei(parsed);
    }
  }
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2})/);
  if (!match) return raw.replace("T", " ").replace(/[-/]/g, "/");
  const [, y, m, d, t] = match;
  return `${y}/${m}/${d} ${t}`;
}

function formatDateInTaipei(date) {
  try {
    return new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date).replace(/\//g, "/");
  } catch (_) {
    const utcMs = date.getTime();
    const taipei = new Date(utcMs + 8 * 3600 * 1000);
    const y = taipei.getUTCFullYear();
    const m = String(taipei.getUTCMonth() + 1).padStart(2, "0");
    const d = String(taipei.getUTCDate()).padStart(2, "0");
    const hh = String(taipei.getUTCHours()).padStart(2, "0");
    const mm = String(taipei.getUTCMinutes()).padStart(2, "0");
    const ss = String(taipei.getUTCSeconds()).padStart(2, "0");
    return `${y}/${m}/${d} ${hh}:${mm}:${ss}`;
  }
}

function formatWindDirection(value) {
  if (!isValidObservation(value)) return "—";
  const deg = Number(value);
  if (!Number.isFinite(deg) || deg < 0 || deg > 360) return "—";
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

function getWindDirectionLabel(value) {
  if (!isValidObservation(value)) return "—";
  const deg = Number(value);
  if (!Number.isFinite(deg) || deg < 0 || deg > 360) return "—";
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
  return dirs[idx];
}

function getTemperatureComfortLabel(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 34) return "炎熱";
  if (v >= 28) return "悶熱";
  if (v >= 20) return "舒適";
  if (v >= 12) return "涼爽";
  return "寒冷";
}

function temperatureComfortColor(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 34) return "#ff0000";
  if (v >= 28) return "#ffff00";
  if (v >= 20) return "#00e400";
  if (v >= 12) return "#14b5df";
  return "#0877c9";
}

function getHumidityComfortLabel(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 95) return "高溼";
  if (v >= 80) return "偏溼";
  if (v >= 60) return "舒適";
  if (v >= 40) return "偏乾";
  return "乾燥";
}

function humidityComfortColor(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 95) return "#ff0000";
  if (v >= 80) return "#ffff00";
  if (v >= 60) return "#00e400";
  if (v >= 40) return "#14b5df";
  return "#0877c9";
}

function realtimeRain24hrColor(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 80) return "#8f3f97";
  if (v >= 50) return "#ff0000";
  if (v >= 30) return "#ff7e00";
  if (v >= 1) return "#ffff00";
  return "#00e400";
}

function realtimeWindColor(value) {
  if (!isValidObservation(value)) return "";
  const v = Number(value);
  if (v >= 20.8) return "#8f3f97";
  if (v >= 13.9) return "#ff0000";
  if (v >= 8.0) return "#ff7e00";
  if (v >= 3.4) return "#ffff00";
  return "#00e400";
}

function windToBeaufort(mps) {
  if (!isValidObservation(mps)) return "--";
  const v = Number(mps);
  if (!Number.isFinite(v) || v < 0) return "--";
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
  if (!isValidObservation(mps)) return NaN;
  const v = Number(mps);
  if (!Number.isFinite(v) || v < 0) return NaN;
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
  const coords = readStationCoords(station?.GeoInfo || station?.geoInfo || {});
  const temp = normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 });
  let humidity = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
  if (humidity != null && humidity <= 1) humidity *= 100;
  const windSpeed = normalizeObservationNumber(readWeatherElement(station, "WindSpeed"), { min: 0 });
  const windDir = normalizeObservationNumber(readWeatherElement(station, "WindDirection"), { min: 0, max: 360 });
  const gustRaw =
    normalizeObservationNumber(readWeatherNested(station, "GustInfo.PeakGustSpeed"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherNested(station, "Max10MinAverage.WindSpeed"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "Max10MinAverage"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "Max10MinAverageWindSpeed"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "Max10MinWindSpeed"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "GustWindSpeed"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "PeakGustSpeed"), { min: 0 });
  const rain =
    normalizeObservationNumber(readWeatherElement(station, "NowPrecipitation"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "Precipitation"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "HourlyPrecipitation"), { min: 0 });
  const dailyRain =
    normalizeObservationNumber(readWeatherElement(station, "DailyRainfall"), { min: 0 }) ??
    normalizeObservationNumber(readWeatherElement(station, "Precipitation"), { min: 0 });
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
    lat: coords?.lat ?? NCUE_COORDS.lat,
    lon: coords?.lon ?? NCUE_COORDS.lon,
  };
  const rows = [
    { label: "測站", value: name },
    { label: "觀測時間", value: obsTimeFormatted || "—" },
    { label: "氣溫", value: formatValue(temp, "°C", 1), tone: { color: temperatureComfortColor(temp), label: getTemperatureComfortLabel(temp) } },
    { label: "體感溫度", value: formatValue(apparent, "°C", 1), tone: { color: temperatureComfortColor(apparent), label: getTemperatureComfortLabel(apparent) } },
    { label: "相對濕度", value: formatValue(humidity, "%", 0), tone: { color: humidityComfortColor(humidity), label: getHumidityComfortLabel(humidity) } },
    { label: "風向", value: isValidObservation(windDir) ? `${Number(windDir).toFixed(0)}°` : "—", tone: { color: "#334155", label: getWindDirectionLabel(windDir) } },
    {
      label: "風速",
      value: formatValue(windSpeed, " m/s", 1),
      tone: { color: realtimeWindColor(windSpeed), label: windLevel !== "--" ? windLevel : "" },
    },
    {
      label: "陣風",
      value: formatValue(gustRaw, " m/s", 1),
      tone: { color: realtimeWindColor(gustRaw), label: gustLevel !== "--" ? gustLevel : "" },
    },
    { label: "日累積雨量", value: formatValue(dailyRain, " mm", 1), tone: { color: realtimeRain24hrColor(dailyRain) } },
    { label: "天氣現象", value: weather ? String(weather) : "—" },
  ];
  dom.ncueObservation.innerHTML = rows
    .map((row) => renderRealtimeDataRow(row))
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

async function fetchAirboxPm25Dataset() {
  const res = await fetch(AIRBOX_PM25_ENDPOINT);
  if (!res.ok) {
    throw new Error(`空氣盒子 PM2.5 讀取失敗 (${res.status})`);
  }
  return res.json();
}

function extractAirboxRecords(payload) {
  const records = payload?.feeds || payload?.value || payload?.records || payload?.data || [];
  return Array.isArray(records) ? records : [];
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
  const aqiVal = toNumber(record.aqi ?? record.AQI);
  realtimeState.latestAqi = {
    aqi: aqiVal,
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
  const publishTime = formatObsTime(record.publishtime || record.PublishTime || "") || record.publishtime || record.PublishTime || "—";
  const rows = [
    { label: "測站", value: record.sitename || record.siteName || record.SiteName || "彰化" },
    { label: "發布時間", value: publishTime },
    { label: "狀態", value: record.status || record.Status || "—" },
    { label: "AQI", value: aqiVal != null ? String(aqiVal) : "—", tone: getRealtimeAqiTone("aqi", aqiVal) },
    { label: "PM2.5", value: pm25Val != null ? `${pm25Val} (μg/m3)` : "—", tone: getRealtimeAqiTone("pm25", pm25Val) },
    { label: "PM10", value: pm10Val != null ? `${pm10Val} (μg/m3)` : "—", tone: getRealtimeAqiTone("pm10", pm10Val) },
    { label: "O3(1hr)", value: o3Val != null ? `${o3Val} (ppb)` : "—", tone: getRealtimeAqiTone("o3", o3Val) },
    { label: "NO2", value: no2Val != null ? `${no2Val} (ppb)` : "—", tone: getRealtimeAqiTone("no2", no2Val) },
    { label: "SO2", value: so2Val != null ? `${so2Val} (ppb)` : "—", tone: getRealtimeAqiTone("so2", so2Val) },
    { label: "CO", value: coVal != null ? `${coVal} (ppm)` : "—", tone: getRealtimeAqiTone("co", coVal) },
  ];
  dom.aqiObservation.innerHTML = rows
    .map((row) => renderRealtimeDataRow(row))
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

function initChanghuaAlertView() {
  if (!changhuaAlertView.dom.map) return;
  initRankingMap(changhuaAlertView);
  changhuaAlertView.dom.reloadBtn?.addEventListener("click", loadChanghuaAlertTab);
  changhuaAlertView.dom.valueHeader?.addEventListener("click", () => {
    changhuaAlertView.state.sortDir = changhuaAlertView.state.sortDir === "desc" ? "asc" : "desc";
    renderChanghuaAlertTable();
  });
  changhuaAlertView.dom.valueHeader?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    changhuaAlertView.state.sortDir = changhuaAlertView.state.sortDir === "desc" ? "asc" : "desc";
    renderChanghuaAlertTable();
  });
  loadChanghuaAlertTab();
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
    const metricKey = view.dom.metric.value;
    if (isDailyTempDiffMetric(metricKey)) return;
    toggleRankingSort(view, metricKey);
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
  renderMetricButtonList(selectEl, keys);
}

function buildDisasterMetricOptions(selectEl) {
  if (!selectEl) return;
  const keys = disasterMetricKeys;
  const options = keys
    .map((key) => {
      const metric = rankingMetrics[key];
      return metric ? `<option value="${key}">${metric.label}</option>` : "";
    })
    .filter(Boolean);
  selectEl.innerHTML = options.join("");
  selectEl.value = "temp";
  renderMetricButtonList(selectEl, keys);
}

function isDailyTempDiffMetric(metricKey) {
  return metricKey === "tempHighLow" || metricKey === "dailyTempDiff";
}

function renderMetricButtonList(selectEl, metricKeys) {
  const control = selectEl.closest(".control");
  if (!control) return;
  control.classList.add("metric-control");
  let list = control.querySelector(".metric-button-list");
  if (!list) {
    list = document.createElement("div");
    list.className = "metric-button-list";
    selectEl.insertAdjacentElement("afterend", list);
  }
  selectEl.classList.add("metric-select-hidden");
  const activeValue = selectEl.value;
  list.innerHTML = metricKeys
    .map((key) => {
      const metric = rankingMetrics[key];
      if (!metric) return "";
      const active = key === activeValue ? " active" : "";
      const label = compactMetricLabels[key] || metric.label;
      return `<button class="metric-filter-btn${active}" type="button" data-metric-key="${sanitizeText(key)}">${sanitizeText(label)}</button>`;
    })
    .join("");
  list.querySelectorAll("[data-metric-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextValue = btn.dataset.metricKey || "";
      if (!nextValue || selectEl.value === nextValue) return;
      selectEl.value = nextValue;
      list.querySelectorAll(".metric-filter-btn").forEach((item) => item.classList.toggle("active", item === btn));
      selectEl.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
}

function toggleRankingSort(view, metricKey) {
  if (!view) return;
  view.state.sortDir = view.state.sortDir === "desc" ? "asc" : "desc";
  view.state.page = 1;
  renderRankingTable(view.state.entries, metricKey, view);
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
  const opts = ['<option value="*">全台灣</option>'];
  const addedGroups = new Set();
  CWA_COUNTIES.forEach((county) => {
    const groupName = getCountyGroupName(county);
    if (groupName) {
      if (addedGroups.has(groupName)) return;
      addedGroups.add(groupName);
      opts.push(`<option value="${groupName}">${groupName}</option>`);
      return;
    }
    opts.push(`<option value="${county}">${county}</option>`);
  });
  view.dom.countySelect.innerHTML = opts.join("");
  if (view.countyFilter) {
    view.dom.countySelect.value = getCountyGroupName(view.countyFilter) || view.countyFilter;
  } else {
    view.dom.countySelect.value = "*";
  }
  renderCountyButtonList(view.dom.countySelect);
}

function getCountyGroupName(county) {
  const normalized = normalizeCountyName(county);
  return Object.entries(COUNTY_GROUPS).find(([, counties]) => counties.includes(normalized))?.[0] || "";
}

function getCountyFilterTargets(filterValue) {
  const normalized = normalizeCountyName(filterValue || "");
  if (!normalized || normalized === "*") return [];
  return COUNTY_GROUPS[normalized] || [normalized];
}

function formatCountyButtonLabel(value, text) {
  const normalized = normalizeCountyName(value || text || "");
  if (!normalized || normalized === "*") return "全臺";
  if (COUNTY_GROUPS[normalized]) return normalized;
  return normalized.replace(/[縣市]$/, "");
}

function renderCountyButtonList(selectEl) {
  const control = selectEl.closest(".control");
  if (!control) return;
  control.classList.add("county-control");
  let list = control.querySelector(".county-button-list");
  if (!list) {
    list = document.createElement("div");
    list.className = "county-button-list";
    selectEl.insertAdjacentElement("afterend", list);
  }
  selectEl.classList.add("county-select-hidden");
  const options = Array.from(selectEl.options || []);
  list.innerHTML = options
    .map((option) => {
      const active = option.value === selectEl.value ? " active" : "";
      const label = formatCountyButtonLabel(option.value, option.textContent);
      return `<button class="county-filter-btn${active}" type="button" data-county-value="${sanitizeText(option.value)}">${sanitizeText(label)}</button>`;
    })
    .join("");
  list.querySelectorAll("[data-county-value]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextValue = btn.dataset.countyValue || "";
      if (!nextValue || selectEl.value === nextValue) return;
      selectEl.value = nextValue;
      list.querySelectorAll(".county-filter-btn").forEach((item) => item.classList.toggle("active", item === btn));
      selectEl.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
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

function initIndustryWeatherView() {
  if (!dom.industryWeatherMap || !dom.industryWeatherIndustry) return;
  renderIndustryWeatherLegend();
  renderIndustryWeatherThresholdTable();
  syncIndustryWeatherControls();
  initIndustryWeatherMap();
  loadIndustryWeatherData();
}

function initTownForecastView() {
  if (!dom.townForecastMap || !dom.townForecastMode) return;
  syncTownForecastControls();
  initTownForecastMap();
  loadTownForecastData();
}

function bindDisasterViewEvents() {
  if (!disasterView?.dom) return;
  disasterView.dom.reloadBtn?.addEventListener("click", loadDisasterData);
  disasterView.dom.metric?.addEventListener("change", () => {
    disasterView.state.page = 1;
    loadDisasterData();
  });
  disasterView.dom.valueHeader?.addEventListener("click", () => {
    const metricKey = disasterView.dom.metric.value;
    if (isDailyTempDiffMetric(metricKey)) return;
    toggleRankingSort(disasterView, metricKey);
  });
}

function bindHealthViewEvents() {
  if (!healthView?.dom) return;
  healthView.dom.reloadBtn?.addEventListener("click", () => {
    stopHealthTimelinePlayback();
    loadHealthData();
  });
  healthView.dom.mode?.addEventListener("change", () => {
    healthView.state.page = 1;
    stopHealthTimelinePlayback();
    toggleHealthTimelineControls();
    loadHealthData();
  });
  healthView.dom.metric?.addEventListener("change", () => {
    healthView.state.page = 1;
    stopHealthTimelinePlayback();
    loadHealthData();
  });
  healthView.dom.window?.addEventListener("change", () => {
    healthView.state.page = 1;
    stopHealthTimelinePlayback();
    loadHealthData();
  });
  healthView.dom.timeline?.addEventListener("input", () => {
    const idx = Number(healthView.dom.timeline.value || 0);
    healthView.state.timelineIndex = Number.isFinite(idx) ? idx : 0;
    renderHealthTimelineFrame();
  });
  healthView.dom.playBtn?.addEventListener("click", toggleHealthTimelinePlayback);
  healthView.dom.valueHeader?.addEventListener("click", () => {
    healthView.state.sortDir = healthView.state.sortDir === "desc" ? "asc" : "desc";
    healthView.state.page = 1;
    renderRankingTable(healthView.state.entries, healthView.dom.metric.value, healthView);
  });
}

function bindIndustryWeatherEvents() {
  dom.industryWeatherIndustry?.addEventListener("change", () => {
    syncIndustryWeatherControls();
    ensureIndustryWeatherSelection();
    renderIndustryWeatherMap();
    renderIndustryWeatherInfo();
  });
  dom.industryWeatherAnimal?.addEventListener("change", () => {
    syncIndustryWeatherControls();
    if (getIndustryWeatherTimeMode() === "realtime") {
      ensureIndustryWeatherSelection();
      renderIndustryWeatherMap();
      renderIndustryWeatherInfo();
      return;
    }
    loadIndustryWeatherData();
  });
  dom.industryWeatherTime?.addEventListener("change", loadIndustryWeatherData);
  dom.industryWeatherTimeline?.addEventListener("input", () => {
    const idx = Number(dom.industryWeatherTimeline?.value || 0);
    industryWeatherState.forecastIndex = Number.isFinite(idx) ? idx : 0;
    stopIndustryWeatherPlayback();
    syncIndustryWeatherForecastFrame();
  });
  dom.industryWeatherTimelinePlayBtn?.addEventListener("click", toggleIndustryWeatherPlayback);
  dom.industryWeatherTown?.addEventListener("change", () => {
    const townKey = dom.industryWeatherTown?.value || "";
    if (!townKey) return;
    industryWeatherState.selectedTownKey = townKey;
    industryWeatherState.selectedTownName = townKey;
    renderIndustryWeatherMap();
    renderIndustryWeatherInfo();
  });
  dom.industryWeatherReloadBtn?.addEventListener("click", loadIndustryWeatherData);
}

function bindTownForecastEvents() {
  dom.townForecastMode?.addEventListener("change", () => {
    stopTownForecastPlayback();
    townForecastState.forecastIndex = 0;
    syncTownForecastControls();
    loadTownForecastData();
  });
  dom.townForecastMetric?.addEventListener("change", () => {
    renderTownForecastMap();
    renderTownForecastInfo();
    renderTownForecastLegend();
  });
  dom.townForecastTown?.addEventListener("change", () => {
    const townKey = dom.townForecastTown?.value || "";
    if (!townKey) return;
    townForecastState.selectedTownKey = townKey;
    townForecastState.selectedTownName = townKey;
    renderTownForecastMap();
    renderTownForecastInfo();
  });
  dom.townForecastTimeline?.addEventListener("input", () => {
    const idx = Number(dom.townForecastTimeline?.value || 0);
    townForecastState.forecastIndex = Number.isFinite(idx) ? idx : 0;
    stopTownForecastPlayback();
    syncTownForecastFrame();
  });
  dom.townForecastTimelinePlayBtn?.addEventListener("click", toggleTownForecastPlayback);
  dom.townForecastReloadBtn?.addEventListener("click", loadTownForecastData);
}

function syncTownForecastControls() {
  const isQpesums = getTownForecastMode().key === "qpesums";
  const metricControl = dom.townForecastMetric?.closest(".control");
  const townControl = dom.townForecastTown?.closest(".control");
  if (metricControl) metricControl.style.display = isQpesums ? "none" : "";
  if (townControl) townControl.style.display = isQpesums ? "none" : "";
  if (dom.townForecastTimelineWrap) dom.townForecastTimelineWrap.style.display = isQpesums ? "none" : "";
}

const TOWN_FORECAST_MODES = {
  day1: { key: "day1", label: "未來1天逐1小時", hours: 24, stepHours: 1, datasetId: TOWN_FORECAST_DATASET },
  day3: { key: "day3", label: "未來3天逐3小時", hours: 72, stepHours: 3, datasetId: TOWN_FORECAST_DATASET },
  day7: { key: "day7", label: "未來7天逐12小時", hours: 168, stepHours: 12, datasetId: CHANGHUA_TOWN_FORECAST_DATASET },
  qpesums: { key: "qpesums", label: "QPESUMS未來1小時定量降水", hours: 1, stepHours: 1, datasetId: QPESUMS_FORECAST_DATASET },
};

const TOWN_FORECAST_METRICS = {
  temperature: { label: "溫度", unit: "°C", precision: 1, colors: ["#e8f7ff", "#8fd3ff", "#ffd166", "#ef476f"], min: 10, max: 38 },
  humidity: { label: "相對溼度", unit: "%", precision: 0, colors: ["#fff7bc", "#a1dab4", "#41b6c4", "#225ea8"], min: 35, max: 100 },
  pop: { label: "降雨機率", unit: "%", precision: 0, colors: ["#f7fbff", "#bdd7e7", "#6baed6", "#08519c"], min: 0, max: 100 },
  windSpeed: { label: "風速", unit: "m/s", precision: 1, colors: ["#edf8fb", "#b3cde3", "#8c96c6", "#88419d"], min: 0, max: 15 },
  comfort: { label: "舒適度指數", unit: "", precision: 0, colors: ["#f7fbff", "#c7e9b4", "#fed976", "#f03b20"], min: 0, max: 100 },
  apparentTemperature: { label: "體感溫度", unit: "°C", precision: 1, colors: ["#e8f7ff", "#8fd3ff", "#ffd166", "#ef476f"], min: 10, max: 42 },
  uvIndex: { label: "紫外線指數", unit: "", precision: 0, colors: ["#2dc937", "#e7b416", "#db7b2b", "#cc3232"], min: 0, max: 11 },
  maxTemperature: { label: "最高溫", unit: "°C", precision: 1, colors: ["#e8f7ff", "#8fd3ff", "#ffd166", "#ef476f"], min: 10, max: 40 },
  minTemperature: { label: "最低溫", unit: "°C", precision: 1, colors: ["#2166ac", "#67a9cf", "#fddbc7", "#b2182b"], min: 5, max: 32 },
  maxApparentTemperature: { label: "最高體感溫度", unit: "°C", precision: 1, colors: ["#e8f7ff", "#8fd3ff", "#ffd166", "#ef476f"], min: 10, max: 45 },
  minApparentTemperature: { label: "最低體感溫度", unit: "°C", precision: 1, colors: ["#2166ac", "#67a9cf", "#fddbc7", "#b2182b"], min: 5, max: 35 },
  qpesumsRain: { label: "QPESUMS未來1小時降雨量", unit: "mm", precision: 1, colors: RAIN_COLORS_BASE, min: 0, max: 120 },
};

const TOWN_FORECAST_ELEMENT_ALIASES = {
  temperature: ["溫度", "平均溫度", "Temperature", "T"],
  humidity: ["相對濕度", "相對溼度", "平均相對濕度", "RelativeHumidity", "RH"],
  pop: ["降雨機率", "3小時降雨機率", "12小時降雨機率", "ProbabilityOfPrecipitation", "PoP", "POP"],
  windSpeed: ["風速", "WindSpeed", "WS"],
  comfort: ["舒適度指數", "舒適度", "最大舒適度指數", "最小舒適度指數", "ComfortIndex", "CI"],
  apparentTemperature: ["體感溫度", "ApparentTemperature", "AT"],
  uvIndex: ["紫外線指數", "紫外線", "UVIndex", "UVI"],
  maxTemperature: ["最高溫度", "最高溫", "MaxTemperature", "MaxT"],
  minTemperature: ["最低溫度", "最低溫", "MinTemperature", "MinT"],
  maxApparentTemperature: ["最高體感溫度", "MaxApparentTemperature", "MaxAT"],
  minApparentTemperature: ["最低體感溫度", "MinApparentTemperature", "MinAT"],
  weather: ["天氣現象", "Weather"],
  weatherCode: ["天氣現象", "WeatherCode"],
};

const TOWN_FORECAST_INFO_ORDER = [
  "temperature",
  "apparentTemperature",
  "humidity",
  "pop",
  "comfort",
  "uvIndex",
  "maxTemperature",
  "minTemperature",
  "maxApparentTemperature",
  "minApparentTemperature",
  "windSpeed",
  "qpesumsRain",
];

function initTownForecastMap() {
  if (!dom.townForecastMap || townForecastState.map) return;
  townForecastState.map = L.map(dom.townForecastMap.id, { zoomControl: true }).setView([23.98, 120.46], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(townForecastState.map);
}

function ensureTownForecastMapSized() {
  if (!townForecastState.map) return;
  townForecastState.map.invalidateSize(false);
  if (townForecastState.townGeo) fitTownForecastBounds();
}

function setTownForecastStatus(text) {
  if (dom.townForecastStatus) dom.townForecastStatus.textContent = text;
}

async function ensureTownForecastGeo() {
  if (townForecastState.townGeo) return townForecastState.townGeo;
  const res = await fetch("./data/changhua/changhua_townships.geojson");
  if (!res.ok) throw new Error("無法載入彰化鄉鎮邊界");
  townForecastState.townGeo = await res.json();
  return townForecastState.townGeo;
}

async function loadTownForecastData() {
  if (!dom.townForecastMap) return;
  const mode = getTownForecastMode();
  setTownForecastStatus(`讀取彰化鄉鎮預報（${mode.label}）...`);
  stopTownForecastPlayback();
  try {
    await ensureTownForecastGeo();
    if (mode.key === "qpesums") {
      await loadTownForecastQpesumsMode(mode);
      return;
    }
    const [forecastPayload, qpesumsPayload] = await Promise.allSettled([
      fetchTownForecastDataset(mode),
      fetchQpesumsForecastDataset(),
    ]);
    if (forecastPayload.status !== "fulfilled") throw forecastPayload.reason;
    const rows = buildTownForecastData(forecastPayload.value.payload, mode);
    if (!rows.length) throw new Error("彰化鄉鎮預報資料不足");
    townForecastState.townData = rows;
    townForecastState.activeForecastDataset = forecastPayload.value.datasetId;
    townForecastState.latestTime = findForecastIssueTime(forecastPayload.value.payload) || "";
    townForecastState.qpesums = qpesumsPayload.status === "fulfilled" && qpesumsPayload.value
      ? buildQpesumsSummary(qpesumsPayload.value)
      : null;
    configureTownForecastTimeline();
    populateTownForecastOptions();
    ensureTownForecastSelection();
    renderTownForecastMap();
    renderTownForecastInfo();
    renderTownForecastLegend();
    updateTownForecastDataTime();
    fitTownForecastBounds();
    const fallbackText = townForecastState.activeForecastDataset === mode.datasetId ? "" : `；${mode.datasetId} 暫不可用，目前使用 ${townForecastState.activeForecastDataset}`;
    setTownForecastStatus(`已更新 ${rows.length} 個彰化鄉鎮（${mode.label}）${fallbackText}`);
  } catch (err) {
    console.error(err);
    setTownForecastStatus(err.message || "鄉鎮預報資料載入失敗");
  }
}

async function loadTownForecastQpesumsMode(mode) {
  setTownForecastStatus(`讀取${mode.label}...`);
  const payload = await fetchQpesumsForecastDataset();
  const summary = payload ? buildQpesumsSummary(payload) : null;
  if (!summary) throw new Error("QPESUMS 資料暫不可用");
  townForecastState.qpesums = summary;
  townForecastState.forecastByTown = new Map();
  townForecastState.forecastFrames = summary.time ? [summary.time] : [];
  townForecastState.forecastIndex = 0;
  townForecastState.activeForecastDataset = QPESUMS_FORECAST_DATASET;
  townForecastState.latestTime = formatObsTime(summary.time) || summary.time || "";
  townForecastState.townData = [];
  configureTownForecastTimeline();
  populateTownForecastOptions();
  ensureTownForecastSelection();
  renderTownForecastMap();
  renderTownForecastInfo();
  renderTownForecastLegend();
  updateTownForecastDataTime();
  fitTownForecastBounds();
  setTownForecastStatus(`已更新 ${summary.count || 0} 個彰化周邊有效格點（${mode.label}）`);
}

async function fetchTownForecastDataset(mode) {
  const preferredDataset = mode?.datasetId || TOWN_FORECAST_DATASET;
  if (preferredDataset === TOWN_FORECAST_DATASET) {
    const payload = await fetchCwaDataset(TOWN_FORECAST_DATASET);
    return { datasetId: TOWN_FORECAST_DATASET, payload };
  }
  if (!townForecastState.primaryDatasetBlocked) {
    try {
      const payload = await fetchCwaDataset(preferredDataset);
      return { datasetId: preferredDataset, payload };
    } catch (err) {
      townForecastState.primaryDatasetBlocked = true;
    }
  }
  const payload = await fetchCwaDataset(TOWN_FORECAST_DATASET);
  return { datasetId: TOWN_FORECAST_DATASET, payload };
}

async function fetchQpesumsForecastDataset() {
  if (townForecastState.qpesumsBlocked) return null;
  try {
    const buffer = await fetchCwaFileDataset(QPESUMS_FORECAST_DATASET, "JSON");
    const text = new TextDecoder("utf-8").decode(buffer);
    return JSON.parse(text);
  } catch (err) {
    try {
      return await fetchCwaDataset(QPESUMS_FORECAST_DATASET);
    } catch (fallbackErr) {
      townForecastState.qpesumsBlocked = true;
      return null;
    }
  }
}

function buildTownForecastData(payload, mode) {
  const locations = extractTownForecastLocations(payload);
  const forecastByTown = new Map();
  const frameSet = new Set();
  locations.forEach((location) => {
    const townName = normalizeIndustryTownName(location?.LocationName || location?.locationName || location?.name || "");
    if (!townName) return;
    const timeline = buildTownForecastTimelineForLocation(location, mode);
    if (!timeline.length) return;
    forecastByTown.set(townName, timeline);
    timeline.forEach((entry) => frameSet.add(entry.dataTime));
  });
  townForecastState.forecastByTown = forecastByTown;
  townForecastState.forecastFrames = selectTownForecastFrames(Array.from(frameSet).sort(), mode);
  townForecastState.forecastIndex = Math.max(0, Math.min(townForecastState.forecastIndex, townForecastState.forecastFrames.length - 1));
  return buildTownForecastRowsForFrame(townForecastState.forecastFrames[townForecastState.forecastIndex]);
}

function buildTownForecastTimelineForLocation(location, mode) {
  const elementSeries = {};
  Object.keys(TOWN_FORECAST_ELEMENT_ALIASES).forEach((key) => {
    elementSeries[key] = buildTownForecastElementSeries(location, TOWN_FORECAST_ELEMENT_ALIASES[key], key);
  });
  const lat = toNumber(location?.Latitude || location?.latitude || location?.lat);
  const lon = toNumber(location?.Longitude || location?.longitude || location?.lon || location?.lng);
  const keys = Array.from(new Set(Object.values(elementSeries).flatMap((series) => series.map((item) => item.dataTime)))).sort();
  const now = new Date();
  return keys
    .filter((dataTime) => isTownForecastFrameInMode(dataTime, mode, now))
    .map((dataTime) => {
      const row = { dataTime, lat, lon };
      Object.keys(elementSeries).forEach((key) => {
        row[key] = readTownForecastValueAtTime(elementSeries[key], dataTime) ?? null;
      });
      row.label = formatObsTime(dataTime) || dataTime;
      return row;
    })
    .filter((row) => Object.keys(TOWN_FORECAST_METRICS).some((key) => row[key] != null));
}

function buildTownForecastElementSeries(location, elementNames, valueKey) {
  const series = [];
  const weatherElements =
    (Array.isArray(location?.WeatherElement) && location.WeatherElement) ||
    (Array.isArray(location?.weatherElement) && location.weatherElement) ||
    (Array.isArray(location?.Element) && location.Element) ||
    (Array.isArray(location?.element) && location.element) ||
    [];
  const targets = weatherElements.filter((element) => {
    const name = String(element?.ElementName || element?.elementName || element?.name || "").trim();
    return elementNames.includes(name);
  });
  targets.forEach((target) => {
    const times = Array.isArray(target?.Time) ? target.Time : Array.isArray(target?.time) ? target.time : [];
    times.forEach((entry) => {
      const dataTime = entry?.DataTime || entry?.dataTime || entry?.StartTime || entry?.startTime || entry?.Time || entry?.time;
      if (!dataTime) return;
      const value = readTownForecastElementValue(entry, valueKey);
      if (value != null && value !== "") {
        series.push({
          dataTime,
          endTime: entry?.EndTime || entry?.endTime || "",
          value,
        });
      }
    });
  });
  return series.sort((a, b) => Date.parse(a.dataTime) - Date.parse(b.dataTime));
}

function readTownForecastValueAtTime(series, dataTime) {
  const exact = (series || []).find((item) => item.dataTime === dataTime);
  if (exact) return exact.value;
  const ts = Date.parse(dataTime || "");
  if (!Number.isFinite(ts)) return null;
  const interval = (series || []).find((item) => {
    const start = Date.parse(item.dataTime || "");
    const end = Date.parse(item.endTime || "");
    return Number.isFinite(start) && Number.isFinite(end) && ts >= start && ts < end;
  });
  return interval?.value ?? null;
}

function readTownForecastElementValue(entry, valueKey) {
  const numericKeys = [
    valueKey,
    "Value",
    "value",
    "Measure",
    "measure",
    "Weather",
    "WeatherCode",
    "Temperature",
    "RelativeHumidity",
    "ProbabilityOfPrecipitation",
    "WindSpeed",
    "ComfortIndex",
    "ApparentTemperature",
    "UVIndex",
    "MaxTemperature",
    "MinTemperature",
    "MaxApparentTemperature",
    "MinApparentTemperature",
  ];
  const containers = [
    entry?.ElementValue,
    entry?.elementValue,
    entry?.Parameter,
    entry?.parameter,
    entry?.WeatherElement,
    entry?.weatherElement,
  ].filter(Boolean);
  for (const container of containers) {
    const list = Array.isArray(container) ? container : [container];
    for (const item of list) {
      for (const key of numericKeys) {
        if (item?.[key] != null) {
          const numeric = toNumber(item[key]);
          return Number.isFinite(numeric) ? numeric : String(item[key]);
        }
      }
      const fallbackKey = Object.keys(item || {}).find((key) => item[key] != null && key !== "Measures" && key !== "measures");
      if (fallbackKey) {
        const numeric = toNumber(item[fallbackKey]);
        return Number.isFinite(numeric) ? numeric : String(item[fallbackKey]);
      }
    }
  }
  const direct = entry?.value ?? entry?.Value ?? null;
  const numeric = toNumber(direct);
  return Number.isFinite(numeric) ? numeric : direct;
}

function isTownForecastFrameInMode(dataTime, mode, now) {
  const ts = Date.parse(dataTime || "");
  if (!Number.isFinite(ts)) return false;
  const base = now instanceof Date ? now.getTime() : Date.now();
  if (ts < base || ts > base + mode.hours * 3600 * 1000) return false;
  return true;
}

function selectTownForecastFrames(frames, mode) {
  const sorted = (frames || []).filter(Boolean).sort();
  if (mode.stepHours <= 1 || sorted.length <= 1) return sorted;
  const selected = [];
  let lastMs = null;
  const stepMs = mode.stepHours * 3600 * 1000;
  sorted.forEach((frame) => {
    const ts = Date.parse(frame);
    if (!Number.isFinite(ts)) return;
    if (lastMs == null || ts - lastMs >= stepMs - 60 * 1000) {
      selected.push(frame);
      lastMs = ts;
    }
  });
  return selected.length ? selected : sorted;
}

function buildTownForecastRowsForFrame(frameTime) {
  const rows = [];
  for (const [townName, timeline] of townForecastState.forecastByTown.entries()) {
    const source = (timeline || []).find((entry) => entry.dataTime === frameTime) || timeline?.[0];
    if (!source) continue;
    rows.push({
      townKey: townName,
      townName,
      ...source,
    });
  }
  return rows;
}

function configureTownForecastTimeline() {
  const total = townForecastState.forecastFrames.length;
  if (!dom.townForecastTimeline) return;
  dom.townForecastTimeline.min = "0";
  dom.townForecastTimeline.max = String(Math.max(0, total - 1));
  dom.townForecastTimeline.step = "1";
  dom.townForecastTimeline.value = String(townForecastState.forecastIndex);
  syncTownForecastFrame();
  updateTownForecastPlaybackButton();
}

function syncTownForecastFrame() {
  const frameTime = townForecastState.forecastFrames[townForecastState.forecastIndex];
  if (!frameTime) return;
  townForecastState.townData = buildTownForecastRowsForFrame(frameTime);
  if (dom.townForecastTimeline) dom.townForecastTimeline.value = String(townForecastState.forecastIndex);
  if (dom.townForecastTimelineLabel) dom.townForecastTimelineLabel.textContent = formatObsTime(frameTime) || frameTime;
  ensureTownForecastSelection();
  renderTownForecastMap();
  renderTownForecastInfo();
}

function updateTownForecastPlaybackButton() {
  const btn = dom.townForecastTimelinePlayBtn;
  if (!btn) return;
  btn.disabled = (townForecastState.forecastFrames?.length || 0) <= 1;
  btn.textContent = townForecastState.forecastPlaying ? "暫停" : "播放";
}

function stopTownForecastPlayback() {
  if (townForecastState.forecastTimer) {
    clearInterval(townForecastState.forecastTimer);
    townForecastState.forecastTimer = null;
  }
  townForecastState.forecastPlaying = false;
  updateTownForecastPlaybackButton();
}

function startTownForecastPlayback() {
  const total = townForecastState.forecastFrames?.length || 0;
  if (total <= 1) return;
  stopTownForecastPlayback();
  townForecastState.forecastPlaying = true;
  townForecastState.forecastTimer = setInterval(() => {
    const count = townForecastState.forecastFrames?.length || 0;
    if (count <= 1) {
      stopTownForecastPlayback();
      return;
    }
    townForecastState.forecastIndex = (townForecastState.forecastIndex + 1) % count;
    syncTownForecastFrame();
  }, 1300);
  updateTownForecastPlaybackButton();
}

function toggleTownForecastPlayback() {
  if (townForecastState.forecastPlaying) {
    stopTownForecastPlayback();
    return;
  }
  startTownForecastPlayback();
}

function getTownForecastMode() {
  return TOWN_FORECAST_MODES[dom.townForecastMode?.value || "day1"] || TOWN_FORECAST_MODES.day1;
}

function getTownForecastMetricKey() {
  if (getTownForecastMode().key === "qpesums") return "qpesumsRain";
  return dom.townForecastMetric?.value || "temperature";
}

function populateTownForecastOptions() {
  if (!dom.townForecastTown) return;
  const towns = (townForecastState.townData || []).map((item) => item.townKey).filter(Boolean);
  dom.townForecastTown.innerHTML = towns.length
    ? towns.map((town) => `<option value="${town}">${sanitizeText(town)}</option>`).join("")
    : '<option value="">暫無資料</option>';
  syncTownForecastSelect();
}

function ensureTownForecastSelection() {
  const list = townForecastState.townData || [];
  if (!list.length) {
    townForecastState.selectedTownKey = "";
    townForecastState.selectedTownName = "";
    syncTownForecastSelect();
    return;
  }
  const matched = list.find((item) => item.townKey === townForecastState.selectedTownKey);
  if (matched) {
    townForecastState.selectedTownName = matched.townName;
    syncTownForecastSelect();
    return;
  }
  const preferred = list.find((item) => item.townKey === "彰化市") || list[0];
  townForecastState.selectedTownKey = preferred.townKey;
  townForecastState.selectedTownName = preferred.townName;
  syncTownForecastSelect();
}

function syncTownForecastSelect() {
  if (!dom.townForecastTown || !townForecastState.selectedTownKey) return;
  dom.townForecastTown.value = townForecastState.selectedTownKey;
}

function getSelectedTownForecastRow() {
  return (townForecastState.townData || []).find((item) => item.townKey === townForecastState.selectedTownKey) || null;
}

function renderTownForecastMap() {
  if (!townForecastState.map || !townForecastState.townGeo) return;
  if (getTownForecastMode().key === "qpesums") {
    renderQpesumsGridMap();
    return;
  }
  const map = townForecastState.map;
  clearQpesumsGridLayer();
  if (townForecastState.townLayer) {
    map.removeLayer(townForecastState.townLayer);
    townForecastState.townLayer = null;
  }
  const current = getSelectedTownForecastRow();
  const metricKey = getTownForecastMetricKey();
  const metric = TOWN_FORECAST_METRICS[metricKey] || TOWN_FORECAST_METRICS.temperature;
  townForecastState.townLayer = L.geoJSON(townForecastState.townGeo, {
    style: (feature) => {
      const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
      const row = (townForecastState.townData || []).find((item) => item.townKey === townName);
      const selected = current && current.townKey === townName;
      return {
        color: selected ? "#0f172a" : "#2b3a55",
        weight: selected ? 2.5 : 1,
        fillOpacity: row ? 0.72 : 0.18,
        fillColor: getTownForecastMetricColor(metricKey, row?.[metricKey]),
      };
    },
    onEachFeature: (feature, layer) => {
      const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
      const row = (townForecastState.townData || []).find((item) => item.townKey === townName);
      const value = formatTownForecastValue(metricKey, row?.[metricKey]);
      layer.bindTooltip(
        `<strong>${sanitizeText(townName)}</strong>${sanitizeText(metric.label)}：${sanitizeText(value)}`,
        { sticky: true, className: "industry-map-tooltip" }
      );
      layer.on("click", () => {
        townForecastState.selectedTownKey = townName;
        townForecastState.selectedTownName = townName;
        syncTownForecastSelect();
        renderTownForecastMap();
        renderTownForecastInfo();
      });
    },
  }).addTo(map);
}

function clearQpesumsGridLayer() {
  if (townForecastState.qpesumsLayer && townForecastState.map) {
    townForecastState.map.removeLayer(townForecastState.qpesumsLayer);
    townForecastState.qpesumsLayer = null;
  }
}

function renderQpesumsGridMap() {
  const map = townForecastState.map;
  if (!map || !townForecastState.townGeo) return;
  if (townForecastState.townLayer) {
    map.removeLayer(townForecastState.townLayer);
    townForecastState.townLayer = null;
  }
  clearQpesumsGridLayer();

  const summary = townForecastState.qpesums;
  const points = summary?.points || [];
  townForecastState.qpesumsLayer = L.layerGroup().addTo(map);
  points.forEach((point) => {
    const halfLat = (summary.latResolution || 0.0125) / 2;
    const halfLon = (summary.lonResolution || 0.0125) / 2;
    const rect = L.rectangle(
      [
        [point.lat - halfLat, point.lon - halfLon],
        [point.lat + halfLat, point.lon + halfLon],
      ],
      {
        stroke: false,
        fillColor: getTownForecastMetricColor("qpesumsRain", point.value),
        fillOpacity: point.value > 0 ? 0.8 : 0.18,
        interactive: true,
      }
    );
    rect.bindTooltip(
      `<strong>QPESUMS格點</strong>${sanitizeText(formatTownForecastValue("qpesumsRain", point.value))}<br>${sanitizeText(formatObsTime(summary.time) || summary.time || "")}`,
      { sticky: true, className: "industry-map-tooltip" }
    );
    rect.addTo(townForecastState.qpesumsLayer);
  });

  townForecastState.townLayer = L.geoJSON(townForecastState.townGeo, {
    style: () => ({
      color: "#1f2937",
      weight: 1,
      fillOpacity: 0,
      fillColor: "transparent",
    }),
    onEachFeature: (feature, layer) => {
      const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
      layer.bindTooltip(`<strong>${sanitizeText(townName)}</strong>`, { sticky: true, className: "industry-map-tooltip" });
    },
  }).addTo(map);
}

function renderTownForecastInfo() {
  if (!dom.townForecastInfo) return;
  const mode = getTownForecastMode();
  if (mode.key === "qpesums") {
    const summary = townForecastState.qpesums;
    if (!summary) {
      dom.townForecastInfo.innerHTML = '<div class="industry-text-card"><p>QPESUMS 資料暫不可用。</p></div>';
      renderTownForecastTimelineTable();
      return;
    }
    dom.townForecastInfo.innerHTML = `
      <div class="industry-summary">
        <div>
          <p class="eyebrow">${sanitizeText(QPESUMS_FORECAST_DATASET)}</p>
          <h3>${sanitizeText(mode.label)}</h3>
          <p class="subtitle">${sanitizeText(formatObsTime(summary.time) || summary.time || "—")}｜原始格點值</p>
        </div>
        <div class="industry-risk-badge">
          <span class="industry-risk-dot" style="background:${getTownForecastMetricColor("qpesumsRain", summary.max)};"></span>
          <span>最大 ${sanitizeText(formatTownForecastValue("qpesumsRain", summary.max))}</span>
        </div>
      </div>
      <div class="industry-info-grid">
        <div class="industry-info-card"><span>平均降水</span><strong>${sanitizeText(formatTownForecastValue("qpesumsRain", summary.mean))}</strong></div>
        <div class="industry-info-card"><span>最大降水</span><strong>${sanitizeText(formatTownForecastValue("qpesumsRain", summary.max))}</strong></div>
        <div class="industry-info-card"><span>資料時間</span><strong>${sanitizeText(formatObsTime(summary.time) || summary.time || "—")}</strong></div>
      </div>
      <div class="industry-text-card">
        <p><strong>資料來源：</strong>${QPESUMS_FORECAST_DATASET}；地圖直接顯示原始格點值，單位 mm。</p>
      </div>
    `;
    renderTownForecastTimelineTable();
    return;
  }
  const town = getSelectedTownForecastRow();
  if (!town) {
    dom.townForecastInfo.innerHTML = '<div class="industry-text-card"><p>請點選地圖查看詳細資訊。</p></div>';
    return;
  }
  const metricKey = getTownForecastMetricKey();
  const metric = TOWN_FORECAST_METRICS[metricKey] || TOWN_FORECAST_METRICS.temperature;
  const qpesumsValue = getTownQpesumsValue(town);
  dom.townForecastInfo.innerHTML = `
    <div class="industry-summary">
      <div>
        <p class="eyebrow">彰化縣 ${sanitizeText(town.townName)}</p>
        <h3>${sanitizeText(mode.label)}</h3>
        <p class="subtitle">${sanitizeText(metric.label)}｜${sanitizeText(formatObsTime(town.dataTime) || town.dataTime || "—")}</p>
      </div>
      <div class="industry-risk-badge">
        <span class="industry-risk-dot" style="background:${getTownForecastMetricColor(metricKey, town?.[metricKey])};"></span>
        <span>${sanitizeText(formatTownForecastValue(metricKey, town?.[metricKey]))}</span>
      </div>
    </div>
    <div class="industry-info-grid">
      ${TOWN_FORECAST_INFO_ORDER.map((key) => {
        const value = key === "qpesumsRain" ? qpesumsValue : town?.[key];
        return `
        <div class="industry-info-card">
          <span>${sanitizeText(TOWN_FORECAST_METRICS[key].label)}</span>
          <strong>${sanitizeText(formatTownForecastValue(key, value))}</strong>
        </div>
      `;
      }).join("")}
    </div>
    <div class="industry-text-card">
      <p><strong>資料來源：</strong>${sanitizeText(townForecastState.activeForecastDataset || CHANGHUA_TOWN_FORECAST_DATASET)} 鄉鎮預報；QPESUMS 取自 ${QPESUMS_FORECAST_DATASET}。</p>
    </div>
  `;
  renderTownForecastTimelineTable();
}

function renderTownForecastTimelineTable() {
  if (!dom.townForecastTimelineTable) return;
  destroyTownForecastDetailChart();
  if (getTownForecastMode().key === "qpesums") {
    const rows = (townForecastState.qpesums?.points || [])
      .slice()
      .sort((a, b) => toNumber(b.value) - toNumber(a.value))
      .slice(0, 100);
    dom.townForecastTimelineTable.innerHTML = rows.length ? `
      <table class="town-forecast-table">
        <thead>
          <tr>
            <th>緯度</th>
            <th>經度</th>
            <th>格點值</th>
            <th>資料時間</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${sanitizeText(Number(row.lat).toFixed(4))}</td>
              <td>${sanitizeText(Number(row.lon).toFixed(4))}</td>
              <td>${sanitizeText(formatTownForecastValue("qpesumsRain", row.value))}</td>
              <td>${sanitizeText(formatObsTime(townForecastState.qpesums?.time) || townForecastState.qpesums?.time || "—")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : '<div class="town-forecast-empty">暫無 QPESUMS 資料。</div>';
    return;
  }
  const mode = getTownForecastMode();
  const timeline = townForecastState.forecastByTown.get(townForecastState.selectedTownKey) || [];
  if (!timeline.length) {
    dom.townForecastTimelineTable.innerHTML = '<div class="town-forecast-empty">暫無序列資料。</div>';
    return;
  }
  const frameSet = new Set(townForecastState.forecastFrames || []);
  const rows = timeline
    .filter((row) => !frameSet.size || frameSet.has(row.dataTime))
    .slice(0, 36);
  if (mode.key === "day7") {
    renderTownForecastSevenDayTable(rows);
    return;
  }
  renderTownForecastChart(rows, mode);
}

function renderTownForecastChart(rows, mode) {
  const selected = getSelectedTownForecastRow();
  const title = `${mode.label} - 彰化縣${townForecastState.selectedTownName || selected?.townName || ""}`;
  const summary = selected ? buildTownForecastSummaryHtml(selected) : "";
  dom.townForecastTimelineTable.innerHTML = `
    <div class="town-forecast-detail">
      <h3>${sanitizeText(title)}</h3>
      ${summary}
      <div class="town-forecast-chart-wrap">
        <div class="town-forecast-icons" aria-label="天氣現象">
          ${renderTownForecastWeatherIcons(rows)}
        </div>
        <canvas id="townForecastDetailChart"></canvas>
      </div>
      ${buildTownForecastDetailTableHtml(rows)}
    </div>
  `;
  const canvas = document.getElementById("townForecastDetailChart");
  renderTownForecastChartCanvas(rows, canvas);
}

function renderTownForecastChartCanvas(rows, canvas = document.getElementById("townForecastDetailChart")) {
  if (!canvas || typeof Chart === "undefined") {
    renderTownForecastFallbackTable(rows);
    return;
  }
  const labels = rows.map((row) => getTownForecastMode().key === "day7" ? `${formatForecastDateLabel(row.dataTime)} ${formatForecastPeriodLabel(row.dataTime)}` : formatForecastHourLabel(row.dataTime));
  townForecastState.detailChart = new Chart(canvas, {
    data: {
      labels,
      datasets: [
        {
          type: "line",
          label: "溫度",
          data: rows.map((row) => toNumber(row.temperature)),
          borderColor: "#9ca3af",
          backgroundColor: "#9ca3af",
          tension: 0.25,
          yAxisID: "temp",
        },
        {
          type: "line",
          label: "體感溫度",
          data: rows.map((row) => toNumber(row.apparentTemperature)),
          borderColor: "#f59e0b",
          backgroundColor: "#f59e0b",
          tension: 0.25,
          yAxisID: "temp",
        },
        {
          type: "bar",
          label: "降雨機率",
          data: rows.map((row) => toNumber(row.pop)),
          backgroundColor: "rgba(37, 99, 235, 0.82)",
          borderColor: "#2563eb",
          yAxisID: "pop",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const unit = ctx.dataset.yAxisID === "pop" ? "%" : "°C";
              return `${ctx.dataset.label}: ${Number.isFinite(ctx.parsed.y) ? ctx.parsed.y : "—"}${unit}`;
            },
          },
        },
      },
      scales: {
        temp: {
          type: "linear",
          position: "left",
          title: { display: true, text: "溫度 (°C)" },
          ticks: { callback: (value) => `${value}°C` },
        },
        pop: {
          type: "linear",
          position: "right",
          min: 0,
          max: 100,
          grid: { drawOnChartArea: false },
          title: { display: true, text: "降雨機率 (%)" },
          ticks: { callback: (value) => `${value}%` },
        },
      },
    },
  });
}

function renderTownForecastSevenDayTable(rows) {
  const selected = getSelectedTownForecastRow();
  const title = `未來7天逐12小時 - 彰化縣${townForecastState.selectedTownName || selected?.townName || ""}`;
  dom.townForecastTimelineTable.innerHTML = `
    <div class="town-forecast-detail">
      <h3>${sanitizeText(title)}</h3>
      ${selected ? buildTownForecastSummaryHtml(selected) : ""}
      <div class="town-forecast-chart-wrap">
        <div class="town-forecast-icons" aria-label="天氣現象">
          ${renderTownForecastWeatherIcons(rows)}
        </div>
        <canvas id="townForecastDetailChart"></canvas>
      </div>
      <table class="town-forecast-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>星期</th>
            <th>時段</th>
            <th>天氣</th>
            <th>降雨機率</th>
            <th>最低溫</th>
            <th>最高溫</th>
            <th>相對溼度</th>
            <th>風速</th>
            <th>紫外線</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${sanitizeText(formatForecastDateLabel(row.dataTime))}</td>
              <td>${sanitizeText(formatForecastWeekday(row.dataTime))}</td>
              <td>${sanitizeText(formatForecastPeriodLabel(row.dataTime))}</td>
              <td>${sanitizeText(row.weather || "—")}</td>
              <td>${sanitizeText(formatTownForecastValue("pop", row.pop))}</td>
              <td>${sanitizeText(formatTownForecastValue("minTemperature", row.minTemperature))}</td>
              <td>${sanitizeText(formatTownForecastValue("maxTemperature", row.maxTemperature))}</td>
              <td>${sanitizeText(formatTownForecastValue("humidity", row.humidity))}</td>
              <td>${sanitizeText(formatTownForecastValue("windSpeed", row.windSpeed))}</td>
              <td>${sanitizeText(formatTownForecastValue("uvIndex", row.uvIndex))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  renderTownForecastChartCanvas(rows);
}

function buildTownForecastDetailTableHtml(rows) {
  return `
    <table class="town-forecast-table town-forecast-table--detail">
      <thead>
        <tr>
          <th>時間</th>
          <th>天氣</th>
          <th>溫度</th>
          <th>體感溫度</th>
          <th>相對溼度</th>
          <th>降雨機率</th>
          <th>風速</th>
          <th>舒適度</th>
          <th>紫外線</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${sanitizeText(formatObsTime(row.dataTime) || row.dataTime || "—")}</td>
            <td>${sanitizeText(`${getTownForecastWeatherIcon(row.weatherCode, row.weather)} ${row.weather || "—"}`)}</td>
            <td>${sanitizeText(formatTownForecastValue("temperature", row.temperature))}</td>
            <td>${sanitizeText(formatTownForecastValue("apparentTemperature", row.apparentTemperature))}</td>
            <td>${sanitizeText(formatTownForecastValue("humidity", row.humidity))}</td>
            <td>${sanitizeText(formatTownForecastValue("pop", row.pop))}</td>
            <td>${sanitizeText(formatTownForecastValue("windSpeed", row.windSpeed))}</td>
            <td>${sanitizeText(formatTownForecastValue("comfort", row.comfort))}</td>
            <td>${sanitizeText(formatTownForecastValue("uvIndex", row.uvIndex))}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderTownForecastWeatherIcons(rows) {
  const count = rows.length || 1;
  return rows.map((row, idx) => {
    const icon = getTownForecastWeatherIcon(row.weatherCode, row.weather);
    const left = count === 1 ? 50 : (idx / (count - 1)) * 100;
    return `<span style="left:${left}%;" title="${sanitizeText(row.weather || "")}">${sanitizeText(icon)}</span>`;
  }).join("");
}

function getTownForecastWeatherIcon(code, weatherText) {
  const numericCode = Number.parseInt(String(code || "").replace(/\D/g, ""), 10);
  const text = String(weatherText || "");
  if (Number.isFinite(numericCode)) {
    if (numericCode <= 2) return "☀️";
    if (numericCode <= 4) return "🌤️";
    if (numericCode <= 7) return "☁️";
    if (numericCode <= 14) return "🌧️";
    if (numericCode <= 18) return "⛈️";
    if (numericCode <= 22) return "🌫️";
  }
  if (/雷/.test(text)) return "⛈️";
  if (/雨/.test(text)) return "🌧️";
  if (/陰|雲/.test(text)) return "☁️";
  if (/晴/.test(text)) return "☀️";
  return "☁️";
}

function renderTownForecastFallbackTable(rows) {
  dom.townForecastTimelineTable.innerHTML = `
    <table class="town-forecast-table">
      <thead>
        <tr>
          <th>時間</th>
          <th>溫度</th>
          <th>相對溼度</th>
          <th>降雨機率</th>
          <th>風速</th>
          <th>體感溫度</th>
          <th>紫外線</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${sanitizeText(formatObsTime(row.dataTime) || row.dataTime || "—")}</td>
            <td>${sanitizeText(formatTownForecastValue("temperature", row.temperature))}</td>
            <td>${sanitizeText(formatTownForecastValue("humidity", row.humidity))}</td>
            <td>${sanitizeText(formatTownForecastValue("pop", row.pop))}</td>
            <td>${sanitizeText(formatTownForecastValue("windSpeed", row.windSpeed))}</td>
            <td>${sanitizeText(formatTownForecastValue("apparentTemperature", row.apparentTemperature))}</td>
            <td>${sanitizeText(formatTownForecastValue("uvIndex", row.uvIndex))}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function buildTownForecastSummaryHtml(row) {
  const items = [
    ["氣溫", formatTownForecastValue("temperature", row.temperature)],
    ["降雨機率", formatTownForecastValue("pop", row.pop)],
    ["體感溫度", formatTownForecastValue("apparentTemperature", row.apparentTemperature)],
    ["相對溼度", formatTownForecastValue("humidity", row.humidity)],
    ["平均風速", formatTownForecastValue("windSpeed", row.windSpeed)],
    ["舒適度指數", formatTownForecastValue("comfort", row.comfort)],
  ];
  return `
    <div class="town-forecast-summary-strip">
      ${items.map(([label, value]) => `
        <div>
          <span>${sanitizeText(label)}</span>
          <strong>${sanitizeText(value)}</strong>
        </div>
      `).join("")}
    </div>
    <div class="town-forecast-data-time">資料時間：${sanitizeText(formatObsTime(row.dataTime) || row.dataTime || "—")}</div>
  `;
}

function destroyTownForecastDetailChart() {
  if (townForecastState.detailChart) {
    townForecastState.detailChart.destroy();
    townForecastState.detailChart = null;
  }
}

function formatForecastHourLabel(dataTime) {
  const date = new Date(dataTime || "");
  if (Number.isNaN(date.getTime())) return dataTime || "";
  return `${String(date.getHours()).padStart(2, "0")}:00`;
}

function formatForecastDateLabel(dataTime) {
  const date = new Date(dataTime || "");
  if (Number.isNaN(date.getTime())) return dataTime || "";
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function formatForecastWeekday(dataTime) {
  const date = new Date(dataTime || "");
  if (Number.isNaN(date.getTime())) return "—";
  return ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
}

function formatForecastPeriodLabel(dataTime) {
  const date = new Date(dataTime || "");
  if (Number.isNaN(date.getTime())) return "—";
  const hour = date.getHours();
  if (hour >= 6 && hour < 18) return "白天";
  return "晚上";
}

function renderTownForecastLegend() {
  if (!dom.townForecastLegend) return;
  const metricKey = getTownForecastMetricKey();
  renderColorbarConfig(buildTownForecastColorbarConfig(metricKey), dom.townForecastLegend);
}

function buildTownForecastColorbarConfig(metricKey) {
  const metric = TOWN_FORECAST_METRICS[metricKey] || TOWN_FORECAST_METRICS.temperature;
  if (["temperature", "apparentTemperature", "maxTemperature", "maxApparentTemperature"].includes(metricKey)) {
    const tempBar = buildTempColorbar();
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: tempBar.stops,
      ticks: tempBar.labels,
      tickPositions: tempBar.positions,
      scaleMin: 6,
      scaleMax: 36,
    };
  }
  if (["minTemperature", "minApparentTemperature"].includes(metricKey)) {
    const ticks = buildGradientTicks(metric.min, metric.max, 6, false);
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: buildGradientStops(["#2166ac", "#67a9cf", "#fddbc7", "#b2182b"], 18),
      ticks: ticks.labels,
      tickPositions: ticks.positions,
      scaleMin: metric.min,
      scaleMax: metric.max,
    };
  }
  if (metricKey === "humidity") {
    return buildColorbarConfig("humidity", { label: metric.label, unit: metric.unit, colorScale: "humidity" });
  }
  if (metricKey === "qpesumsRain") {
    return buildColorbarConfig("rain", { label: metric.label, unit: metric.unit, colorScale: "rain" });
  }
  if (metricKey === "windSpeed") {
    return buildColorbarConfig("wind", { label: metric.label, unit: metric.unit, colorScale: "wind" });
  }
  const ticks = buildGradientTicks(metric.min, metric.max, 4, metricKey === "uvIndex");
  return {
    title: metric.unit ? `${metric.label} (${metric.unit})` : metric.label,
    stops: buildGradientStops(metric.colors, 12),
    ticks: ticks.labels,
    tickPositions: ticks.positions,
    scaleMin: metric.min,
    scaleMax: metric.max,
  };
}

function renderTownForecastQpesums() {
  if (!dom.townForecastQpesums) return;
  const summary = townForecastState.qpesums;
  if (dom.townForecastQpesumsTime) dom.townForecastQpesumsTime.textContent = summary?.time ? formatObsTime(summary.time) || summary.time : "";
  if (!summary) {
    dom.townForecastQpesums.innerHTML = '<div class="industry-text-card"><p>QPESUMS 資料暫不可用。</p></div>';
    return;
  }
  dom.townForecastQpesums.innerHTML = `
    <div class="industry-info-grid">
      <div class="industry-info-card"><span>彰化格點數</span><strong>${sanitizeText(String(summary.count || 0))}</strong></div>
      <div class="industry-info-card"><span>平均降水</span><strong>${formatValue(summary.mean, "mm", 1)}</strong></div>
      <div class="industry-info-card"><span>最大降水</span><strong>${formatValue(summary.max, "mm", 1)}</strong></div>
      <div class="industry-info-card"><span>資料時間</span><strong>${sanitizeText(formatObsTime(summary.time) || summary.time || "—")}</strong></div>
    </div>
    <div class="industry-text-card">
      <p>右側鄉鎮面板會以鄉鎮中心最近格點顯示未來1小時定量降水。</p>
    </div>
  `;
}

function updateTownForecastDataTime() {
  if (!dom.townForecastDataTime) return;
  const suffix = townForecastState.activeForecastDataset || CHANGHUA_TOWN_FORECAST_DATASET;
  dom.townForecastDataTime.textContent = townForecastState.latestTime ? `${townForecastState.latestTime}｜${suffix}` : suffix;
}

function getTownForecastMetricColor(metricKey, value) {
  const metric = TOWN_FORECAST_METRICS[metricKey] || TOWN_FORECAST_METRICS.temperature;
  const config = buildTownForecastColorbarConfig(metricKey);
  const stops = config?.stops?.length ? config.stops : metric.colors;
  const numeric = toNumber(value);
  if (!Number.isFinite(numeric)) return INDUSTRY_WEATHER_NEUTRAL_COLOR;
  const min = Number.isFinite(config?.scaleMin) ? config.scaleMin : metric.min;
  const max = Number.isFinite(config?.scaleMax) ? config.scaleMax : metric.max;
  const ratio = Math.max(0, Math.min(0.999, (numeric - min) / Math.max(1, max - min)));
  const idx = Math.min(stops.length - 1, Math.floor(ratio * stops.length));
  return stops[idx];
}

function formatTownForecastValue(metricKey, value) {
  const metric = TOWN_FORECAST_METRICS[metricKey] || TOWN_FORECAST_METRICS.temperature;
  const numeric = toNumber(value);
  if (Number.isFinite(numeric)) return formatValue(numeric, metric.unit, metric.precision);
  return value != null && String(value).trim() ? String(value) : "—";
}

function fitTownForecastBounds() {
  if (!townForecastState.map || !townForecastState.townGeo) return;
  const bounds = L.geoJSON(townForecastState.townGeo).getBounds();
  if (bounds.isValid()) {
    townForecastState.map.fitBounds(bounds, { padding: [20, 20], maxZoom: 11, animate: false });
  }
}

function buildQpesumsSummary(payload) {
  const root =
    payload?.cwaopendata?.Dataset ||
    payload?.cwaopendata?.dataset ||
    payload?.records ||
    payload?.Records ||
    payload?.dataset ||
    payload?.Dataset ||
    payload ||
    {};
  const info = findQpesumsGridInfo(root);
  if (!info.values.length || !Number.isFinite(info.startLon) || !Number.isFinite(info.startLat)) return null;
  const points = [];
  const xCount = info.xCount || Math.round(Math.sqrt(info.values.length));
  const yCount = info.yCount || Math.ceil(info.values.length / Math.max(1, xCount));
  for (let y = 0; y < yCount; y += 1) {
    for (let x = 0; x < xCount; x += 1) {
      const idx = y * xCount + x;
      const value = info.values[idx];
      if (!Number.isFinite(value) || value <= -90) continue;
      const lon = info.startLon + x * info.lonResolution;
      const lat = info.startLat + y * info.latResolution;
      if (lat < 23.75 || lat > 24.25 || lon < 120.15 || lon > 120.75) continue;
      points.push({ lat, lon, value });
    }
  }
  const values = points.map((point) => point.value);
  return {
    time: info.time,
    points,
    lonResolution: info.lonResolution,
    latResolution: info.latResolution,
    count: values.length,
    mean: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null,
    max: values.length ? Math.max(...values) : null,
  };
}

function buildTownForecastRowsFromQpesums(summary) {
  return (townForecastState.townGeo?.features || []).map((feature, index) => {
    const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
    const center = getIndustryFeatureCenter(feature);
    const nearest = findNearestQpesumsPoint(summary?.points || [], center.lat, center.lon);
    return {
      townKey: townName,
      townName,
      lat: center.lat,
      lon: center.lon,
      dataTime: summary?.time || "",
      qpesumsRain: nearest?.value ?? null,
      qpesumsDistanceKm: nearest?.dist ?? null,
      source: "qpesums",
    };
  }).filter((row) => row.townKey);
}

function findQpesumsGridInfo(root) {
  const candidates = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (
      node.StartPointLongitude != null ||
      node.startPointLongitude != null ||
      node.GridDimensionX != null ||
      node.gridDimensionX != null ||
      node.parameterSet?.StartPointLongitude != null ||
      node.parameterSet?.startPointLongitude != null
    ) {
      candidates.push(node);
    }
    Object.values(node).forEach((value) => {
      if (value && typeof value === "object") {
        if (Array.isArray(value)) value.slice(0, 20).forEach(walk);
        else walk(value);
      }
    });
  };
  walk(root);
  const source = candidates[0] || root;
  const params = source.parameterSet || source.ParameterSet || source;
  const contentNode =
    source.contents ||
    source.Contents ||
    root.contents ||
    root.Contents ||
    source;
  const resolution = parseGridResolution(params.GridResolution || params.gridResolution || params.GridResol || params.gridResol);
  const content = contentNode.content || contentNode.Content || params.content || params.Content || source.Precipitation || source.precipitation || source.Data || source.data || "";
  return {
    startLon: toNumber(params.StartPointLongitude || params.startPointLongitude || params.startLon || params.longitude),
    startLat: toNumber(params.StartPointLatitude || params.startPointLatitude || params.startLat || params.latitude),
    lonResolution: resolution.lon || 0.0125,
    latResolution: resolution.lat || 0.0125,
    xCount: Math.trunc(toNumber(params.GridDimensionX || params.gridDimensionX || params.DimensionX || params.xCount) || 0),
    yCount: Math.trunc(toNumber(params.GridDimensionY || params.gridDimensionY || params.DimensionY || params.yCount) || 0),
    time: params.DateTime || params.dateTime || params.DataTime || params.dataTime || "",
    values: parseQpesumsValues(content),
  };
}

function parseGridResolution(value) {
  if (Array.isArray(value)) return { lon: toNumber(value[0]) || 0.0125, lat: toNumber(value[1]) || 0.0125 };
  const text = String(value || "");
  const nums = text.match(/-?\d+(?:\.\d+)?/g)?.map(Number).filter(Number.isFinite) || [];
  return { lon: nums[0] || 0.0125, lat: nums[1] || nums[0] || 0.0125 };
}

function parseQpesumsValues(content) {
  if (Array.isArray(content)) return content.flat(Infinity).map(toNumber).filter(Number.isFinite);
  if (content && typeof content === "object") return parseQpesumsValues(Object.values(content));
  return String(content || "")
    .match(/-?\d+(?:\.\d+)?(?:E[+-]?\d+)?/gi)
    ?.map(Number)
    .filter(Number.isFinite) || [];
}

function getTownQpesumsValue(town) {
  return findNearestQpesumsPoint(townForecastState.qpesums?.points || [], town?.lat, town?.lon)?.value ?? null;
}

function findNearestQpesumsPoint(points, lat, lon) {
  if (!points.length || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  let best = null;
  points.forEach((point) => {
    const dist = distanceKm(lat, lon, point.lat, point.lon);
    if (!best || dist < best.dist) best = { ...point, dist };
  });
  return best;
}

function syncIndustryWeatherControls() {
  const industry = dom.industryWeatherIndustry?.value || "livestock";
  const animal = dom.industryWeatherAnimal?.value || "cattle";
  if (dom.industryWeatherAnimalWrap) {
    dom.industryWeatherAnimalWrap.style.display = industry === "livestock" ? "" : "none";
  }
}

function initIndustryWeatherMap() {
  if (!dom.industryWeatherMap || industryWeatherState.map) return;
  industryWeatherState.map = L.map(dom.industryWeatherMap.id, { zoomControl: true }).setView([23.98, 120.46], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 12,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(industryWeatherState.map);
}

function ensureIndustryWeatherMapSized() {
  if (!industryWeatherState.map) return;
  industryWeatherState.map.invalidateSize(false);
  if (industryWeatherState.townGeo) {
    fitIndustryWeatherBounds();
  }
}

function setIndustryWeatherStatus(text) {
  if (dom.industryWeatherStatus) dom.industryWeatherStatus.textContent = text;
}

async function ensureIndustryWeatherGeo() {
  if (industryWeatherState.townGeo) return industryWeatherState.townGeo;
  const res = await fetch("./data/changhua/changhua_townships.geojson");
  if (!res.ok) throw new Error("無法載入彰化鄉鎮邊界");
  industryWeatherState.townGeo = await res.json();
  return industryWeatherState.townGeo;
}

async function loadIndustryWeatherData() {
  if (!dom.industryWeatherMap) return;
  const timeMode = getIndustryWeatherTimeMode();
  setIndustryWeatherStatus(`讀取彰化產業氣象資料（${getIndustryWeatherTimeLabel(timeMode)}）...`);
  try {
    const geo = await ensureIndustryWeatherGeo();
    let townData = [];
    industryWeatherState.forecastFrames = [];
    industryWeatherState.forecastByTown = new Map();
    industryWeatherState.forecastIndex = 0;
    stopIndustryWeatherPlayback();
    if (timeMode === "realtime") {
      const stations = await fetchMergedRealtimeStations();
      townData = buildIndustryTownDataFromStations(stations, geo);
      if (!townData.length) throw new Error("彰化即時測站資料不足");
      industryWeatherState.latestTime = findLatestObsTimeFromStations(stations) || "";
      toggleIndustryWeatherTimeline(false);
    } else {
      const data = await fetchCwaDataset(TOWN_FORECAST_DATASET);
      townData = buildIndustryTownDataFromForecast(data, timeMode);
      if (!townData.length) throw new Error("彰化鄉鎮預報資料不足");
      industryWeatherState.latestTime = findForecastIssueTime(data) || "";
      toggleIndustryWeatherTimeline(true);
    }
    industryWeatherState.townData = townData;
    industryWeatherState.sourceMode = "cwa";
    populateIndustryTownOptions();
    if (timeMode !== "realtime") {
      configureIndustryWeatherTimeline();
    }
    ensureIndustryWeatherSelection();
    renderIndustryWeatherMap();
    renderIndustryWeatherInfo();
    updateIndustryWeatherDataTime();
    fitIndustryWeatherBounds();
    setIndustryWeatherStatus(`已更新 ${townData.length} 個彰化鄉鎮（${getIndustryWeatherTimeLabel(timeMode)}）`);
  } catch (err) {
    console.warn("industry weather fallback to mock:", err);
    try {
      const geo = await ensureIndustryWeatherGeo();
      industryWeatherState.townData = buildMockIndustryTownData(geo);
      industryWeatherState.sourceMode = "mock";
      industryWeatherState.latestTime = formatDateInTaipei(new Date());
      stopIndustryWeatherPlayback();
      toggleIndustryWeatherTimeline(false);
      populateIndustryTownOptions();
      ensureIndustryWeatherSelection();
      renderIndustryWeatherMap();
      renderIndustryWeatherInfo();
      updateIndustryWeatherDataTime();
      fitIndustryWeatherBounds();
      setIndustryWeatherStatus(`正式資料暫不可用，已改用 mock 資料（${getIndustryWeatherTimeLabel(timeMode)}）`);
    } catch (fallbackErr) {
      console.error(fallbackErr);
      setIndustryWeatherStatus(fallbackErr.message || "農漁牧氣象資料載入失敗");
    }
  }
}

function configureIndustryWeatherTimeline() {
  const total = industryWeatherState.forecastFrames.length;
  if (!dom.industryWeatherTimeline) return;
  dom.industryWeatherTimeline.min = "0";
  dom.industryWeatherTimeline.max = String(Math.max(0, total - 1));
  dom.industryWeatherTimeline.step = "1";
  dom.industryWeatherTimeline.value = String(industryWeatherState.forecastIndex);
  syncIndustryWeatherForecastFrame();
  updateIndustryWeatherPlaybackButton();
}

function buildIndustryTownDataFromStations(stations, geo) {
  const changhuaStations = (stations || [])
    .map((station) => {
      const geoInfo = station?.GeoInfo || station?.geoInfo || {};
      const county = normalizeCountyName(geoInfo?.CountyName || geoInfo?.countyName || "");
      if (county !== REALTIME_COUNTY) return null;
      const coords = readStationCoords(geoInfo);
      const temp = normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 });
      let humidity = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
      if (humidity != null && humidity >= 0 && humidity <= 1) humidity *= 100;
      if (!coords || !isValidObservation(temp)) return null;
      const obsTime =
        station?.ObsTime?.DateTime ||
        station?.obsTime?.DateTime ||
        station?.ObsTime?.dateTime ||
        station?.obsTime?.dateTime ||
        "";
      return {
        id: station?.StationId || station?.stationId || station?.StationID || "",
        name: getStationName(station),
        town: normalizeIndustryTownName(geoInfo?.TownName || geoInfo?.townName || ""),
        lat: coords.lat,
        lon: coords.lon,
        temp,
        humidity: isValidObservation(humidity) ? humidity : null,
        thi: computeLivestockThi(temp, humidity),
        obsTime,
      };
    })
    .filter(Boolean);

  const allStations = changhuaStations.filter((station) => isValidObservation(station.temp));
  if (!allStations.length) return [];

  return (geo?.features || []).map((feature) => {
    const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
    const center = getIndustryFeatureCenter(feature);
    const inTown = allStations.filter((station) => station.town === townName);
    const aggregate = inTown.length
      ? summarizeIndustryStations(inTown)
      : interpolateIndustryStationValue(allStations, center.lat, center.lon);
    return {
      townKey: townName,
      townName,
      lat: center.lat,
      lon: center.lon,
      temperature: aggregate.temperature,
      humidity: aggregate.humidity,
      thi: computeLivestockThi(aggregate.temperature, aggregate.humidity),
      stationCount: inTown.length || aggregate.stationCount,
      source: inTown.length ? "station" : "interpolated",
      obsTime: aggregate.obsTime,
    };
  });
}

function buildIndustryTownDataFromForecast(payload, timeMode) {
  const locations = extractTownForecastLocations(payload);
  const forecastByTown = new Map();
  const frameSet = new Set();
  const result = [];
  locations.forEach((location) => {
    const townName = normalizeIndustryTownName(
      location?.LocationName ||
      location?.locationName ||
      location?.name ||
      ""
    );
    if (!townName) return;
    const timeline = buildForecastTimelineForLocation(location)
      .filter((entry) => isForecastEntryInWindow(entry?.dataTime, timeMode, new Date()));
    if (!timeline.length) return;
    forecastByTown.set(townName, timeline);
    timeline.forEach((entry) => frameSet.add(entry.dataTime));
    const picked = pickForecastEntryForMode(timeline, timeMode);
    if (!picked) return;
    result.push({
      townKey: townName,
      townName,
      lat: toNumber(
        location?.Latitude ||
        location?.latitude ||
        location?.lat
      ),
      lon: toNumber(
        location?.Longitude ||
        location?.longitude ||
        location?.lon ||
        location?.lng
      ),
      temperature: picked.temperature,
      humidity: picked.humidity,
      thi: computeLivestockThi(picked.temperature, picked.humidity),
      stationCount: 0,
      source: "forecast",
      obsTime: picked.dataTime,
      forecastLabel: picked.label,
      worstForecast: picked,
    });
  });
  industryWeatherState.forecastByTown = forecastByTown;
  industryWeatherState.forecastFrames = Array.from(frameSet).sort();
  industryWeatherState.forecastIndex = Math.max(0, Math.min(industryWeatherState.forecastIndex, industryWeatherState.forecastFrames.length - 1));
  const frameData = buildIndustryTownDataForForecastFrame(industryWeatherState.forecastFrames[industryWeatherState.forecastIndex], result);
  return frameData.length ? frameData : result;
}

function buildIndustryTownDataForForecastFrame(frameTime, fallbackRows = []) {
  if (!frameTime) return fallbackRows;
  const rows = [];
  for (const [townName, timeline] of industryWeatherState.forecastByTown.entries()) {
    const matched = (timeline || []).find((entry) => entry.dataTime === frameTime);
    const worst = pickForecastEntryForMode(timeline, getIndustryWeatherTimeMode());
    const source = matched || worst;
    if (!source) continue;
    rows.push({
      townKey: townName,
      townName,
      lat: source.lat,
      lon: source.lon,
      temperature: source.temperature,
      humidity: source.humidity,
      thi: computeLivestockThi(source.temperature, source.humidity),
      stationCount: 0,
      source: "forecast",
      obsTime: source.dataTime,
      forecastLabel: formatIndustryForecastLabel(frameTime, getIndustryWeatherTimeMode()),
      worstForecast: worst,
    });
  }
  if (rows.length) return rows;
  return fallbackRows;
}

function extractTownForecastLocations(payload) {
  const dataset =
    payload?.cwaopendata?.Dataset ||
    payload?.records ||
    payload?.Records ||
    payload?.dataset ||
    payload?.Dataset ||
    {};
  const containers = [
    dataset?.Locations,
    dataset?.locations,
    dataset?.locations?.[0],
    dataset?.Locations?.[0],
  ].filter(Boolean);
  for (const container of containers) {
    const list =
      container?.Location ||
      container?.location ||
      container?.Locations ||
      container?.locations ||
      [];
    if (Array.isArray(list) && list.length) return list;
  }
  if (Array.isArray(dataset?.location) && dataset.location.length) return dataset.location;
  if (Array.isArray(dataset?.Location) && dataset.Location.length) return dataset.Location;
  return [];
}

function buildForecastTimelineForLocation(location) {
  const tempMap = buildForecastElementTimeMap(location, ["溫度", "Temperature"], "Temperature");
  const humidityMap = buildForecastElementTimeMap(location, ["相對濕度", "RelativeHumidity"], "RelativeHumidity");
  const lat = toNumber(location?.Latitude || location?.latitude || location?.lat);
  const lon = toNumber(location?.Longitude || location?.longitude || location?.lon || location?.lng);
  const keys = Array.from(new Set([...tempMap.keys(), ...humidityMap.keys()])).sort();
  return keys.map((dataTime) => {
    const temperature = tempMap.get(dataTime);
    const humidity = humidityMap.get(dataTime);
    return {
      dataTime,
      lat,
      lon,
      temperature,
      humidity,
      thi: computeLivestockThi(temperature, humidity),
    };
  }).filter((item) => isValidObservation(item.temperature) || isValidObservation(item.thi));
}

function buildForecastElementTimeMap(location, elementNames, valueKey) {
  const map = new Map();
  const weatherElements =
    (Array.isArray(location?.WeatherElement) && location.WeatherElement) ||
    (Array.isArray(location?.weatherElement) && location.weatherElement) ||
    (Array.isArray(location?.Element) && location.Element) ||
    (Array.isArray(location?.element) && location.element) ||
    [];
  const target = weatherElements.find((element) => {
    const name = String(
      element?.ElementName ||
      element?.elementName ||
      element?.name ||
      ""
    ).trim();
    return elementNames.includes(name);
  });
  const times = Array.isArray(target?.Time) ? target.Time : Array.isArray(target?.time) ? target.time : [];
  times.forEach((entry) => {
    const dataTime =
      entry?.DataTime ||
      entry?.dataTime ||
      entry?.StartTime ||
      entry?.startTime ||
      entry?.Time ||
      entry?.time;
    const value = toNumber(readForecastElementValue(entry, valueKey));
    if (dataTime && Number.isFinite(value)) {
      map.set(dataTime, value);
    }
  });
  return map;
}

function readForecastElementValue(entry, valueKey) {
  const directObject =
    entry?.ElementValue ||
    entry?.elementValue ||
    entry?.Parameter ||
    entry?.parameter ||
    null;
  if (directObject && !Array.isArray(directObject)) {
    if (directObject[valueKey] != null) return directObject[valueKey];
    const keys = Object.keys(directObject);
    if (keys.length) return directObject[keys[0]];
  }
  const valueArray =
    (Array.isArray(entry?.ElementValue) && entry.ElementValue) ||
    (Array.isArray(entry?.elementValue) && entry.elementValue) ||
    [];
  if (valueArray.length) {
    const first = valueArray[0] || {};
    if (first[valueKey] != null) return first[valueKey];
    if (first?.value != null) return first.value;
    const keys = Object.keys(first);
    if (keys.length) return first[keys[0]];
  }
  return entry?.value ?? null;
}

function pickForecastEntryForMode(timeline, timeMode) {
  const now = new Date();
  const filtered = (timeline || []).filter((entry) => isForecastEntryInWindow(entry?.dataTime, timeMode, now));
  const source = filtered.length ? filtered : timeline || [];
  if (!source.length) return null;
  const animalKey = dom.industryWeatherAnimal?.value || "cattle";
  const ranked = source
    .map((entry) => {
      const display = evaluateLivestockRisk(animalKey, entry);
      return {
        ...entry,
        riskRank: getIndustryRiskRank(display.levelKey),
        display,
      };
    })
    .sort((a, b) => {
      if (b.riskRank !== a.riskRank) return b.riskRank - a.riskRank;
      const aMetric = getIndustryMetricValueForAnimal(animalKey, a);
      const bMetric = getIndustryMetricValueForAnimal(animalKey, b);
      if (Number.isFinite(bMetric) && Number.isFinite(aMetric) && bMetric !== aMetric) return bMetric - aMetric;
      return Date.parse(a.dataTime) - Date.parse(b.dataTime);
    });
  const selected = ranked[0];
  return {
    ...selected,
    label: formatIndustryForecastLabel(selected.dataTime, timeMode),
  };
}

function getIndustryMetricValueForAnimal(animalKey, entry) {
  const config = LIVESTOCK_ANIMALS[animalKey] || LIVESTOCK_ANIMALS.cattle;
  return config.metric === "thi" || config.metric === "thi_temp" ? entry?.thi : entry?.temperature;
}

function isForecastEntryInWindow(dataTime, timeMode, now) {
  const ts = Date.parse(dataTime || "");
  if (!Number.isFinite(ts)) return false;
  const base = now instanceof Date ? now : new Date();
  if (timeMode === "future36") {
    return ts >= base.getTime() && ts <= base.getTime() + 36 * 3600 * 1000;
  }
  return ts >= base.getTime();
}

function formatIndustryForecastLabel(dataTime, timeMode) {
  const formatted = formatObsTime(dataTime);
  if (!formatted) return getIndustryWeatherTimeLabel(timeMode);
  return `${getIndustryWeatherTimeLabel(timeMode)}｜${formatted}`;
}

function findForecastIssueTime(payload) {
  return (
    formatObsTime(payload?.cwaopendata?.Dataset?.DatasetInfo?.IssueTime) ||
    formatObsTime(payload?.records?.DatasetInfo?.IssueTime) ||
    formatObsTime(payload?.records?.datasetInfo?.issueTime) ||
    formatObsTime(payload?.cwaopendata?.Sent) ||
    ""
  );
}

function getIndustryWeatherTimeMode() {
  return dom.industryWeatherTime?.value || "realtime";
}

function toggleIndustryWeatherTimeline(show) {
  if (dom.industryWeatherTimelineWrap) {
    dom.industryWeatherTimelineWrap.style.display = show ? "" : "none";
  }
  if (!show && dom.industryWeatherTimelineLabel) {
    dom.industryWeatherTimelineLabel.textContent = "--";
  }
  if (!show) {
    stopIndustryWeatherPlayback();
  }
  updateIndustryWeatherPlaybackButton();
}

function syncIndustryWeatherForecastFrame() {
  const frameTime = industryWeatherState.forecastFrames[industryWeatherState.forecastIndex];
  if (!frameTime) return;
  industryWeatherState.townData = buildIndustryTownDataForForecastFrame(frameTime, industryWeatherState.townData);
  if (dom.industryWeatherTimeline) {
    dom.industryWeatherTimeline.value = String(industryWeatherState.forecastIndex);
  }
  if (dom.industryWeatherTimelineLabel) {
    dom.industryWeatherTimelineLabel.textContent = formatObsTime(frameTime) || frameTime;
  }
  ensureIndustryWeatherSelection();
  renderIndustryWeatherMap();
  renderIndustryWeatherInfo();
}

function updateIndustryWeatherPlaybackButton() {
  const btn = dom.industryWeatherTimelinePlayBtn;
  if (!btn) return;
  const enabled = getIndustryWeatherTimeMode() === "future36" && (industryWeatherState.forecastFrames?.length || 0) > 1;
  btn.disabled = !enabled;
  btn.textContent = industryWeatherState.forecastPlaying ? "暫停" : "播放";
}

function stopIndustryWeatherPlayback() {
  if (industryWeatherState.forecastTimer) {
    clearInterval(industryWeatherState.forecastTimer);
    industryWeatherState.forecastTimer = null;
  }
  industryWeatherState.forecastPlaying = false;
  updateIndustryWeatherPlaybackButton();
}

function startIndustryWeatherPlayback() {
  const total = industryWeatherState.forecastFrames?.length || 0;
  if (getIndustryWeatherTimeMode() !== "future36" || total <= 1) {
    stopIndustryWeatherPlayback();
    return;
  }
  stopIndustryWeatherPlayback();
  industryWeatherState.forecastPlaying = true;
  industryWeatherState.forecastTimer = setInterval(() => {
    const count = industryWeatherState.forecastFrames?.length || 0;
    if (count <= 1) {
      stopIndustryWeatherPlayback();
      return;
    }
    industryWeatherState.forecastIndex = (industryWeatherState.forecastIndex + 1) % count;
    syncIndustryWeatherForecastFrame();
  }, 1400);
  updateIndustryWeatherPlaybackButton();
}

function toggleIndustryWeatherPlayback() {
  if (industryWeatherState.forecastPlaying) {
    stopIndustryWeatherPlayback();
    return;
  }
  startIndustryWeatherPlayback();
}

function getIndustryWeatherTimeLabel(timeMode) {
  switch (timeMode) {
    case "future36":
      return "未來36小時";
    case "realtime":
    default:
      return "即時";
  }
}

function summarizeIndustryStations(stations) {
  const count = Math.max(1, stations.length);
  const temperature = stations.reduce((sum, station) => sum + Number(station.temp || 0), 0) / count;
  const humidityValues = stations.map((station) => station.humidity).filter(isValidObservation);
  const humidity = humidityValues.length
    ? humidityValues.reduce((sum, value) => sum + Number(value || 0), 0) / humidityValues.length
    : null;
  const latest = stations
    .map((station) => station.obsTime)
    .filter(Boolean)
    .sort((a, b) => Date.parse(b) - Date.parse(a))[0] || "";
  return {
    temperature,
    humidity,
    stationCount: count,
    obsTime: latest,
  };
}

function interpolateIndustryStationValue(stations, lat, lon) {
  const ranked = stations
    .map((station) => {
      const dist = distanceKm(lat, lon, station.lat, station.lon);
      return {
        ...station,
        distance: Number.isFinite(dist) ? Math.max(dist, 0.5) : 999,
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
  const weights = ranked.map((station) => 1 / (station.distance * station.distance));
  const totalWeight = weights.reduce((sum, value) => sum + value, 0) || 1;
  const temperature = ranked.reduce((sum, station, idx) => sum + station.temp * weights[idx], 0) / totalWeight;
  const humidityTerms = ranked.filter((station) => isValidObservation(station.humidity));
  const humidity = humidityTerms.length
    ? humidityTerms.reduce((sum, station) => sum + station.humidity * (1 / (Math.max(distanceKm(lat, lon, station.lat, station.lon), 0.5) ** 2)), 0) /
      humidityTerms.reduce((sum, station) => sum + (1 / (Math.max(distanceKm(lat, lon, station.lat, station.lon), 0.5) ** 2)), 0)
    : null;
  return {
    temperature,
    humidity,
    stationCount: ranked.length,
    obsTime: ranked.map((station) => station.obsTime).filter(Boolean).sort((a, b) => Date.parse(b) - Date.parse(a))[0] || "",
  };
}

function buildMockIndustryTownData(geo) {
  return (geo?.features || []).map((feature, index) => {
    const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
    const center = getIndustryFeatureCenter(feature);
    const seed = hashString(townName || String(index));
    const temperature = 27 + (seed % 90) / 10;
    const humidity = 58 + (seed % 35);
    return {
      townKey: townName,
      townName,
      lat: center.lat,
      lon: center.lon,
      temperature,
      humidity,
      thi: computeLivestockThi(temperature, humidity),
      stationCount: 0,
      source: "mock",
      obsTime: "",
    };
  });
}

function ensureIndustryWeatherSelection() {
  const list = industryWeatherState.townData || [];
  if (!list.length) {
    industryWeatherState.selectedTownKey = "";
    industryWeatherState.selectedTownName = "";
    syncIndustryTownSelect();
    return;
  }
  const matched = list.find((item) => item.townKey === industryWeatherState.selectedTownKey);
  if (matched) {
    industryWeatherState.selectedTownName = matched.townName;
    syncIndustryTownSelect();
    return;
  }
  const preferred = list.find((item) => item.townKey === "彰化市") || list[0];
  industryWeatherState.selectedTownKey = preferred.townKey;
  industryWeatherState.selectedTownName = preferred.townName;
  syncIndustryTownSelect();
}

function getSelectedIndustryTown() {
  return (industryWeatherState.townData || []).find((item) => item.townKey === industryWeatherState.selectedTownKey) || null;
}

function renderIndustryWeatherMap() {
  if (!industryWeatherState.map || !industryWeatherState.townGeo) return;
  const map = industryWeatherState.map;
  if (industryWeatherState.townLayer) {
    map.removeLayer(industryWeatherState.townLayer);
    industryWeatherState.townLayer = null;
  }
  const current = getSelectedIndustryTown();
  industryWeatherState.townLayer = L.geoJSON(industryWeatherState.townGeo, {
    style: (feature) => {
      const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
      const row = (industryWeatherState.townData || []).find((item) => item.townKey === townName);
      const display = buildIndustryTownDisplay(row);
      const selected = current && current.townKey === townName;
      return {
        color: selected ? "#0f172a" : "#2b3a55",
        weight: selected ? 2.5 : 1,
        fillOpacity: row ? 0.72 : 0.18,
        fillColor: display.color,
      };
    },
    onEachFeature: (feature, layer) => {
      const townName = normalizeIndustryTownName(feature?.properties?.[TOWN_NAME_FIELD] || "");
      const row = (industryWeatherState.townData || []).find((item) => item.townKey === townName);
      const display = buildIndustryTownDisplay(row);
      layer.bindTooltip(
        `<strong>${sanitizeText(townName)}</strong>${sanitizeText(display.tooltip)}`,
        { sticky: true, className: "industry-map-tooltip" }
      );
      layer.on("click", () => {
        industryWeatherState.selectedTownKey = townName;
        industryWeatherState.selectedTownName = townName;
        syncIndustryTownSelect();
        renderIndustryWeatherMap();
        renderIndustryWeatherInfo();
      });
    },
  }).addTo(map);
}

function renderIndustryWeatherInfo() {
  if (!dom.industryWeatherInfo) return;
  const town = getSelectedIndustryTown();
  const industry = dom.industryWeatherIndustry?.value || "livestock";
  const animalKey = dom.industryWeatherAnimal?.value || "cattle";
  const animalConfig = LIVESTOCK_ANIMALS[animalKey] || LIVESTOCK_ANIMALS.cattle;
  if (!town) {
    dom.industryWeatherInfo.innerHTML = '<div class="industry-text-card"><p>請點選地圖查看詳細資訊。</p></div>';
    return;
  }
  const display = buildIndustryTownDisplay(town);
  const industryLabel = industry === "livestock" ? "畜牧業" : industry === "agriculture" ? "農業" : "漁業";
  const animalLabel = industry === "livestock" ? animalConfig.label : "—";
  const metricLabel = industry === "livestock" ? getLivestockMetricLabel(animalConfig) : "氣溫";
  const timeMode = getIndustryWeatherTimeMode();
  const worstLabel = town?.worstForecast?.label || "—";
  const worstDisplay = town?.worstForecast
    ? evaluateLivestockRisk(animalKey, town.worstForecast)
    : null;
  const sourceText =
    industryWeatherState.sourceMode === "cwa"
      ? town.source === "forecast"
        ? `取自 ${TOWN_FORECAST_DATASET} 鄉鎮逐時預報`
        : town.source === "station"
          ? "取自鄉鎮內即時測站"
          : "以鄰近彰化測站內插估算"
      : "目前為 mock 示意資料";
  const thresholdText = industry === "livestock" ? display.thresholdText : "農業 / 漁業門檻功能預留中";
  const descText =
    industry === "livestock"
      ? display.description
      : INDUSTRY_PLACEHOLDER_COPY[industry] || "功能建置中";
  dom.industryWeatherInfo.innerHTML = `
    <div class="industry-summary">
      <div>
        <p class="eyebrow">彰化縣 ${sanitizeText(town.townName)}</p>
        <h3>${sanitizeText(industryLabel)}</h3>
        <p class="subtitle">${industry === "livestock" ? `${sanitizeText(animalLabel)}｜${sanitizeText(metricLabel)}｜${sanitizeText(getIndustryWeatherTimeLabel(timeMode))}` : sanitizeText(descText)}</p>
      </div>
      <div class="industry-risk-badge">
        <span class="industry-risk-dot" style="background:${display.color};"></span>
        <span>${sanitizeText(display.levelLabel)}</span>
      </div>
    </div>
    <div class="industry-info-grid">
      <div class="industry-info-card">
        <span>目前氣溫</span>
        <strong>${formatValue(town.temperature, "°C", 1)}</strong>
      </div>
      <div class="industry-info-card">
        <span>相對濕度</span>
        <strong>${isValidObservation(town.humidity) ? formatValue(town.humidity, "%", 0) : "—"}</strong>
      </div>
      <div class="industry-info-card">
        <span>THI</span>
        <strong>${isValidObservation(town.thi) ? Number(town.thi).toFixed(1) : "—"}</strong>
      </div>
      <div class="industry-info-card">
        <span>${timeMode === "realtime" ? "觀測時間" : "預報時段"}</span>
        <strong>${sanitizeText(town.forecastLabel || formatObsTime(town.obsTime) || "—")}</strong>
      </div>
      <div class="industry-info-card">
        <span>資料來源</span>
        <strong>${sanitizeText(sourceText)}</strong>
      </div>
    </div>
    ${timeMode !== "realtime" ? `
    <div class="industry-text-card">
      <p><strong>期間最危險時段：</strong>${sanitizeText(worstLabel)}${worstDisplay ? `｜${sanitizeText(worstDisplay.levelLabel)}` : ""}</p>
    </div>` : ""}
    <div class="industry-text-card">
      <p><strong>風險說明：</strong>${sanitizeText(descText)}</p>
    </div>
    <div class="industry-text-card">
      <p><strong>門檻說明：</strong>${sanitizeText(thresholdText)}</p>
    </div>
  `;
}

function renderIndustryWeatherLegend() {
  if (!dom.industryWeatherLegend) return;
  dom.industryWeatherLegend.innerHTML = INDUSTRY_WEATHER_LEVELS.map((item) => `
    <div class="industry-legend-item">
      <span class="swatch" style="background:${item.color};"></span>
      <span>${sanitizeText(item.label)}</span>
    </div>
  `).join("");
}

function renderIndustryWeatherThresholdTable() {
  if (!dom.industryWeatherThresholdBody) return;
  const animalOrder = ["cattle", "pig", "goat", "chicken", "duck", "goose"];
  dom.industryWeatherThresholdBody.innerHTML = animalOrder.map((key) => {
    const config = LIVESTOCK_ANIMALS[key];
    const steps = config.thresholds || [];
    return `
      <tr>
        <td>${sanitizeText(config.label)}</td>
        <td>${sanitizeText(getLivestockMetricLabel(config))}</td>
        <td>${sanitizeText(steps[0]?.description || "—")}</td>
        <td>${sanitizeText(steps[1]?.description || "—")}</td>
        <td>${sanitizeText(steps[2]?.description || "—")}</td>
        <td>${sanitizeText(steps[3]?.description || "—")}</td>
        <td>${sanitizeText(steps[4]?.description || "—")}</td>
      </tr>
    `;
  }).join("");
}

function updateIndustryWeatherDataTime() {
  if (!dom.industryWeatherDataTime) return;
  const suffix = industryWeatherState.sourceMode === "mock" ? "mock" : "即時";
  dom.industryWeatherDataTime.textContent = industryWeatherState.latestTime ? `${industryWeatherState.latestTime}｜${suffix}` : suffix;
}

function populateIndustryTownOptions() {
  if (!dom.industryWeatherTown) return;
  const towns = (industryWeatherState.townData || []).map((item) => item.townKey).filter(Boolean);
  if (!towns.length) {
    dom.industryWeatherTown.innerHTML = '<option value="">暫無資料</option>';
    return;
  }
  dom.industryWeatherTown.innerHTML = towns
    .map((town) => `<option value="${town}">${sanitizeText(town)}</option>`)
    .join("");
  syncIndustryTownSelect();
}

function syncIndustryTownSelect() {
  if (!dom.industryWeatherTown) return;
  if (!industryWeatherState.selectedTownKey) return;
  dom.industryWeatherTown.value = industryWeatherState.selectedTownKey;
}

function buildIndustryTownDisplay(row) {
  const industry = dom.industryWeatherIndustry?.value || "livestock";
  const animalKey = dom.industryWeatherAnimal?.value || "cattle";
  if (!row) {
    return {
      color: INDUSTRY_WEATHER_NEUTRAL_COLOR,
      levelLabel: "無資料",
      description: "暫無資料",
      thresholdText: "暫無資料",
      tooltip: "無資料",
    };
  }
  if (industry !== "livestock") {
    return {
      color: INDUSTRY_WEATHER_NEUTRAL_COLOR,
      levelLabel: "功能建置中",
      description: INDUSTRY_PLACEHOLDER_COPY[industry] || "功能建置中",
      thresholdText: "待後續串接正式門檻與資料源",
      tooltip: `${formatValue(row.temperature, "°C", 1)} / ${isValidObservation(row.humidity) ? formatValue(row.humidity, "%", 0) : "濕度—"}`,
    };
  }
  const config = LIVESTOCK_ANIMALS[animalKey] || LIVESTOCK_ANIMALS.cattle;
  const result = evaluateLivestockRisk(animalKey, row);
  const metricText = formatLivestockMetricText(config, row);
  return {
    ...result,
    tooltip: `${result.label}｜${metricText}`,
  };
}

function getLivestockMetricLabel(config) {
  return config?.metricLabel || (config?.metric === "thi" ? "THI" : "氣溫");
}

function formatLivestockMetricText(config, row) {
  const thiText = isValidObservation(row?.thi) ? `THI ${Number(row.thi).toFixed(1)}` : "THI —";
  const tempText = isValidObservation(row?.temperature) ? `${Number(row.temperature).toFixed(1)}°C` : "氣溫—";
  switch (config?.metric) {
    case "thi_temp":
      return `${thiText} / ${tempText}`;
    case "thi":
      return thiText;
    case "temp":
    case "temp_dual":
    default:
      return tempText;
  }
}

function evaluateLivestockRisk(animalKey, entry) {
  const config = LIVESTOCK_ANIMALS[animalKey] || LIVESTOCK_ANIMALS.cattle;
  const steps = config.thresholds || [];
  const thi = entry?.thi;
  const temperature = entry?.temperature;
  const hasThi = isValidObservation(thi);
  const hasTemp = isValidObservation(temperature);
  const hasRequiredMetric =
    config.metric === "thi"
      ? hasThi
      : config.metric === "thi_temp"
        ? (hasThi || hasTemp)
        : hasTemp;
  if (!hasRequiredMetric) {
    return {
      color: INDUSTRY_WEATHER_NEUTRAL_COLOR,
      levelKey: "normal",
      levelLabel: "無資料",
      label: "無資料",
      description: "暫無可用觀測資料",
      thresholdText: "暫無資料",
    };
  }
  const matched = [...steps].reverse().find((step) => {
    if (step.level === "normal") {
      if (config.metric === "thi") return hasThi && Number(thi) < (step.max ?? Infinity);
      if (config.metric === "thi_temp") {
        const thiOk = !Number.isFinite(step.minThi) || !hasThi || Number(thi) < Number(step.minThi);
        const tempOk = !Number.isFinite(step.minTemp) || !hasTemp || Number(temperature) < Number(step.minTemp);
        return thiOk && tempOk;
      }
      if (config.metric === "temp_dual") {
        return hasTemp &&
          (!Number.isFinite(step.min) || Number(temperature) > Number(step.min)) &&
          (!Number.isFinite(step.max) || Number(temperature) < Number(step.max));
      }
      return hasTemp && Number(temperature) < (step.max ?? Infinity);
    }
    if (config.metric === "thi") {
      return hasThi && Number(thi) >= (step.min ?? -Infinity) && Number(thi) < (step.max ?? Infinity);
    }
    if (config.metric === "thi_temp") {
      const thiHit = Number.isFinite(step.minThi) && hasThi && Number(thi) >= Number(step.minThi);
      const tempHit = Number.isFinite(step.minTemp) && hasTemp && Number(temperature) >= Number(step.minTemp);
      return thiHit || tempHit;
    }
    if (config.metric === "temp_dual") {
      const hotHit = Number.isFinite(step.minTemp) && hasTemp && Number(temperature) >= Number(step.minTemp);
      const coldHit = Number.isFinite(step.maxTemp) && hasTemp && Number(temperature) <= Number(step.maxTemp);
      return hotHit || coldHit;
    }
    return hasTemp && Number(temperature) >= (step.min ?? -Infinity) && Number(temperature) < (step.max ?? Infinity);
  }) || steps[0];
  const palette = INDUSTRY_WEATHER_LEVELS.find((item) => item.key === matched.level);
  return {
    color: palette?.color || INDUSTRY_WEATHER_NEUTRAL_COLOR,
    levelKey: matched.level,
    levelLabel: matched.label,
    label: matched.label,
    description: matched.label,
    thresholdText: `${config.label} ${matched.description} 屬${matched.label}`,
  };
}

function getIndustryRiskRank(levelKey) {
  const order = ["normal", "attention", "alert", "danger", "extreme"];
  const idx = order.indexOf(levelKey || "normal");
  return idx === -1 ? 0 : idx;
}

function normalizeIndustryTownName(value) {
  return String(value || "").replace(/^彰化縣/, "").trim();
}

function getIndustryFeatureCenter(feature) {
  const bounds = L.geoJSON(feature).getBounds();
  const center = bounds.getCenter();
  return { lat: center.lat, lon: center.lng };
}

function fitIndustryWeatherBounds() {
  if (!industryWeatherState.map || !industryWeatherState.townGeo) return;
  const bounds = L.geoJSON(industryWeatherState.townGeo).getBounds();
  if (bounds.isValid()) {
    industryWeatherState.map.fitBounds(bounds, {
      padding: [20, 20],
      maxZoom: 11,
      animate: false,
    });
  }
}

function computeLivestockThi(temperature, humidity) {
  return computeThi(temperature, humidity);
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const r = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}

function hashString(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function toggleHealthTimelineControls() {
  const mode = healthView?.dom?.mode?.value || "window";
  if (healthView?.dom?.timelineWrap) {
    healthView.dom.timelineWrap.style.display = mode === "timeline" ? "" : "none";
  }
  if (mode !== "timeline") {
    stopHealthTimelinePlayback();
  }
  updateHealthTimelinePlaybackButton();
}

function updateHealthTimelinePlaybackButton() {
  const btn = healthView?.dom?.playBtn;
  if (!btn) return;
  const hasFrames = (healthView.state.timelineKeys || []).length > 1;
  const isTimelineMode = (healthView?.dom?.mode?.value || "window") === "timeline";
  btn.disabled = !isTimelineMode || !hasFrames;
  btn.textContent = healthView.state.timelinePlaying ? "暫停" : "播放";
}

function stopHealthTimelinePlayback() {
  if (healthView.state.timelineTimer) {
    clearInterval(healthView.state.timelineTimer);
    healthView.state.timelineTimer = null;
  }
  healthView.state.timelinePlaying = false;
  updateHealthTimelinePlaybackButton();
}

function startHealthTimelinePlayback() {
  const keys = healthView.state.timelineKeys || [];
  if ((healthView?.dom?.mode?.value || "window") !== "timeline" || keys.length <= 1) {
    stopHealthTimelinePlayback();
    return;
  }
  stopHealthTimelinePlayback();
  healthView.state.timelinePlaying = true;
  healthView.state.timelineTimer = setInterval(() => {
    const total = healthView.state.timelineKeys?.length || 0;
    if (total <= 1) {
      stopHealthTimelinePlayback();
      return;
    }
    healthView.state.timelineIndex = (Number(healthView.state.timelineIndex || 0) + 1) % total;
    renderHealthTimelineFrame();
  }, 1200);
  updateHealthTimelinePlaybackButton();
}

function toggleHealthTimelinePlayback() {
  if (healthView.state.timelinePlaying) {
    stopHealthTimelinePlayback();
    return;
  }
  startHealthTimelinePlayback();
}

function isDisasterThreshold(metricKey, value) {
  if (!isValidObservation(value)) return false;
  switch (metricKey) {
    case "lightning":
      return value > 0;
    case "temp":
      return value <= DISASTER_TEMP_LOW_THRESHOLD || value >= DISASTER_TEMP_HIGH_THRESHOLD;
    case "tempDailyLow":
      return value <= DISASTER_TEMP_LOW_THRESHOLD;
    case "tempDailyHigh":
      return value >= DISASTER_TEMP_HIGH_THRESHOLD;
    case "dailyTempDiff":
      return value > 10;
    case "apparent":
      return value <= DISASTER_APPARENT_TEMP_LOW_THRESHOLD || value >= DISASTER_APPARENT_TEMP_HIGH_THRESHOLD;
    case "humidity":
      return value <= DISASTER_HUMIDITY_LOW_THRESHOLD || value > DISASTER_HUMIDITY_FOG_THRESHOLD;
    case "wind":
      return windToBeaufortLevel(value) >= 6;
    case "gust":
      return windToBeaufortLevel(value) >= 8;
    case "rain":
      return value > DISASTER_RAIN_THRESHOLD;
    case "rain3hr":
      return value > DISASTER_RAIN_3HR_THRESHOLD;
    case "rain24hr":
      return value > DISASTER_RAIN_24HR_THRESHOLD;
    case "aqi":
      return value >= 101;
    case "pm25":
    case "pm25Airbox":
      return value >= 30.5;
    case "pm10Airbox":
      return value >= DISASTER_PM10_THRESHOLD;
    case "pm1Airbox":
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
  let baseEntries = [];
  if (isAirboxMetric(metricKey)) {
    baseEntries = buildAirboxEntries(stations, metricKey, view);
  } else if (isAqiMetric(metricKey)) {
    baseEntries = buildAqiEntries(stations, metricKey, view);
  } else {
    baseEntries = buildRankingEntries(stations, metricKey, view);
  }
  return baseEntries.filter((entry) => isDisasterThreshold(metricKey, entry.value));
}

function formatAlertEntryValue(metricKey, value) {
  const metric = rankingMetrics[metricKey] || {};
  return formatRankingValue(metricKey, value, metric.unit || "");
}

function normalizeAlertType(metricKey, rawType) {
  let type = rawType || "預警";
  if (metricKey === "apparent") {
    if (type.includes("高溫")) type = "體感高溫警戒";
    if (type.includes("低溫")) type = "體感低溫警戒";
  }
  if (metricKey === "aqi" && /(不良|偏高|過高|嚴重|危害)/.test(type)) return "空氣品質(AQI)";
  if (metricKey === "pm1Airbox" && type.includes("細懸浮微粒")) return "PM1";
  if ((metricKey === "pm25" || metricKey === "pm25Airbox") && /(偏高|過高|嚴重|危害)/.test(type)) return "PM2.5";
  if ((metricKey === "pm10" || metricKey === "pm10Airbox") && /(偏高|過高|嚴重|危害)/.test(type)) return "PM10";
  if (metricKey === "o3" && /(偏高|過高|嚴重|危害)/.test(type)) return "O3";
  return type;
}

async function loadDisasterData() {
  if (!disasterView?.dom?.metric) return;
  const metricKey = disasterView.dom.metric.value;
  setRankingStatus(disasterView, "讀取即時資料...");
  try {
    await ensureRankingGeo(disasterView);
    if (isLightningMetric(metricKey)) {
      const { lightning } = await fetchLightningData();
      realtimeState.latestLightning = lightning;
      const entries = buildLightningDisasterEntries(lightning, disasterView);
      disasterView.state.entries = entries;
      await renderRanking(entries, metricKey, disasterView);
      setRankingDataTimeFromLightning(lightning, disasterView);
      setRankingDataSource(disasterView, metricKey);
      setRankingStatus(disasterView, entries.length ? `已更新 ${entries.length} 個鄉鎮雷擊預警` : "目前無雷擊預警");
      return;
    }
    if (isAirboxMetric(metricKey)) {
      const data = await fetchAirboxPm25Dataset();
      const records = extractAirboxRecords(data);
      const entries = buildDisasterEntries(records, metricKey, disasterView);
      disasterView.state.entries = entries;
      await renderRanking(entries, metricKey, disasterView);
      setRankingDataTimeFromAirbox(records, disasterView);
      setRankingDataSource(disasterView, metricKey);
      setRankingStatus(disasterView, entries.length ? `已更新 ${entries.length} 筆警戒測站` : "目前無符合門檻測站");
      return;
    }
    if (isAqiMetric(metricKey)) {
      const data = await fetchAqiDataset();
      const records = extractAqiRecords(data);
      const entries = buildDisasterEntries(records, metricKey, disasterView);
      disasterView.state.entries = entries;
      await renderRanking(entries, metricKey, disasterView);
      setRankingDataTimeFromAqi(records, disasterView);
      setRankingDataSource(disasterView, metricKey);
      setRankingStatus(disasterView, entries.length ? `已更新 ${entries.length} 筆警戒測站` : "目前無符合門檻測站");
      return;
    }
    const stations = metricKey.startsWith("rain")
      ? extractCwaStations(await fetchCwaDataset(RAIN_DATASET))
      : await fetchMergedRealtimeStations();
    const entries = buildDisasterEntries(stations, metricKey, disasterView);
    disasterView.state.entries = entries;
    await renderRanking(entries, metricKey, disasterView);
    setRankingDataTime(stations, disasterView);
    setRankingDataSource(disasterView, metricKey);
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

function isAirboxMetric(metricKey) {
  return metricKey === "pm25Airbox" || metricKey === "pm10Airbox" || metricKey === "pm1Airbox";
}

function isLightningMetric(metricKey) {
  return metricKey === "lightning";
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

  if (document.getElementById("changhuaAlertSection")) {
    loadAndDisplayChanghuaAlerts(view);
  }

  try {
    await ensureRankingGeo(view);
    if (isAirboxMetric(metricKey)) {
      const data = await fetchAirboxPm25Dataset();
      const records = extractAirboxRecords(data);
      const entries = buildAirboxEntries(records, metricKey, view);
      view.state.entries = entries;
      await renderRanking(entries, metricKey, view);
      setRankingDataTimeFromAirbox(records, view);
      setRankingDataSource(view, metricKey);
      setRankingStatus(view, entries.length ? `已更新 ${entries.length} 筆測站` : "找不到有效測站資料");
      focusViewOnCounty(view);
      return;
    }
    if (isAqiMetric(metricKey)) {
      const data = await fetchAqiDataset();
      const records = extractAqiRecords(data);
      const entries = buildAqiEntries(records, metricKey, view);
      view.state.entries = entries;
      await renderRanking(entries, metricKey, view);
      setRankingDataTimeFromAqi(records, view);
      setRankingDataSource(view, metricKey);
      setRankingStatus(view, entries.length ? `已更新 ${entries.length} 筆測站` : "找不到有效測站資料");
      focusViewOnCounty(view);
      return;
    }
    let stations = [];
    let timeStations = [];
    if (metricKey.startsWith("rain")) {
      stations = extractCwaStations(await fetchCwaDataset(RAIN_DATASET));
      timeStations = stations;
    } else {
      const bundle = await fetchMergedRealtimeStationBundle();
      stations = bundle.merged;
      timeStations = view.key === "changhua" && bundle.primary.length ? bundle.primary : bundle.merged;
    }
    const entries = buildRankingEntries(stations, metricKey, view);
    view.state.entries = entries;
    await renderRanking(entries, metricKey, view);
    setRankingDataTime(timeStations, view);
    setRankingDataSource(view, metricKey);
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
  const countyTargets = getCountyFilterTargets(view?.countyFilter);
  stations.forEach((station) => {
    const geo = station?.GeoInfo || station?.geoInfo || {};
    const county = normalizeCountyName(geo?.CountyName || geo?.countyName || "");
    const countyCode = geo?.CountyCode || geo?.countyCode || "";
    if (countyTargets.length) {
      const targetCodes = countyTargets.map((target) => view.state.countyCodeMap?.[target] || COUNTY_CODE_MAP[target]).filter(Boolean);
      if (!countyTargets.includes(county) && !targetCodes.includes(countyCode)) return;
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
    const dailyTemps = readDailyTemperatureExtremes(station);
    const dailyTempDiff =
      Number.isFinite(dailyTemps.low) && Number.isFinite(dailyTemps.high)
        ? dailyTemps.high - dailyTemps.low
        : null;
    entries.push({
      id: station?.StationId || station?.stationId || station?.StationID || station?.StationNo || "",
      name: stationName,
      county,
      town: geo?.TownName || geo?.townName || "",
      lat: coords.lat,
      lon: coords.lon,
      value,
      sortValue: metricKey === "tempHighLow" ? dailyTempDiff : value,
      direction: metric.direction ? metric.direction(station) : null,
      temperature: normalizeObservationNumber(readWeatherElement(station, "AirTemperature"), { min: -80, max: 80 }),
      dailyLowTemp: dailyTemps.low,
      dailyHighTemp: dailyTemps.high,
      humidity: (() => {
        let h = normalizeObservationNumber(readWeatherElement(station, "RelativeHumidity"), { min: 0, max: 100 });
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
  const countyTargets = getCountyFilterTargets(view?.countyFilter);
  records.forEach((record) => {
    const county = normalizeCountyName(record?.county || record?.County || "");
    if (countyTargets.length && !countyTargets.includes(county)) return;
    const lat = toNumber(record?.latitude);
    const lon = toNumber(record?.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    let value = null;
    if (metricKey === "pm25") {
      value = toNumber(record?.["pm2.5"] ?? record?.pm25 ?? record?.pm25_avg);
    } else if (metricKey === "pm10") {
      value = toNumber(record?.pm10 ?? record?.pm10_avg);
    } else if (metricKey === "o3") {
      value = toNumber(record?.o3);
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

function buildAirboxEntries(records, metricKey, view) {
  const entries = [];
  const countyTargets = getCountyFilterTargets(view?.countyFilter);
  records.forEach((record) => {
    const thing = record?.Thing || record?.thing || {};
    const obs = Array.isArray(record?.Observations) ? record.Observations[0] : null;
    const value = toNumber(readAirboxMetricValue(record, metricKey) ?? obs?.result ?? record?.result);
    if (!isValidObservation(value)) return;

    const coords = readAirboxCoords(record, thing);
    if (!coords) return;

    let county = normalizeCountyName(
      extractCountyFromAirboxText(record?.name) ||
      extractCountyFromAirboxText(record?.SiteName) ||
      extractCountyFromAirboxText(record?.SiteAddr) ||
      pickThingText(thing, ["county", "County", "city", "City", "縣市", "縣市別"]) ||
      mapAirboxAreaToCounty(record?.area) ||
      pickThingText(record, ["county", "County", "city", "City", "縣市", "縣市別"]) ||
      ""
    );
    let town =
      extractTownFromAirboxName(record?.name) ||
      extractTownFromAirboxName(record?.SiteName) ||
      pickThingText(thing, ["town", "Town", "district", "District", "site", "Site", "鄉鎮", "行政區"]) ||
      pickThingText(record, ["town", "Town", "district", "District", "site", "Site", "鄉鎮", "行政區"]) ||
      "";

    if (!county || !town) {
      const area = resolveAreaByPoint(view?.state?.townGeo, coords.lon, coords.lat, view);
      if (area?.county && !county) county = area.county;
      if (area?.town && !town) town = area.town;
    }

    if (countyTargets.length && !countyTargets.includes(county)) return;

    const obsTime = record?.timestamp || obs?.phenomenonTime || obs?.resultTime || record?.phenomenonTime || "";
    entries.push({
      id: record?.device_id || thing?.["@iot.id"] || record?.["@iot.id"] || record?.id || "",
      name:
        record?.name ||
        record?.SiteName ||
        pickThingText(thing, ["station", "Station", "name", "Name", "device_id", "DeviceID"]) ||
        thing?.name ||
        "空氣盒子",
      county,
      town,
      lat: coords.lat,
      lon: coords.lon,
      value,
      direction: null,
      temperature: null,
      humidity: null,
      obsTimeRaw: obsTime,
      time: formatObsTime(obsTime) || obsTime,
    });
  });
  entries.sort((a, b) => b.value - a.value);
  return entries;
}

function readAirboxMetricValue(record, metricKey) {
  switch (metricKey) {
    case "pm10Airbox":
      return record?.s_d1;
    case "pm1Airbox":
      return record?.s_d2;
    case "pm25Airbox":
    default:
      return record?.s_d0 ?? record?.c_d0;
  }
}

function pickThingText(source, keys) {
  if (!source) return "";
  const props = source?.properties || {};
  for (const key of keys) {
    const value = source?.[key] ?? props?.[key];
    if (value != null && String(value).trim()) return String(value).trim();
  }
  return "";
}

function readAirboxCoords(record, thing) {
  const locations = thing?.Locations || thing?.locations || record?.Locations || record?.locations || [];
  const loc = Array.isArray(locations) ? locations[0] : null;
  const coords = loc?.location?.coordinates;
  if (Array.isArray(coords) && coords.length >= 2) {
    const lon = toNumber(coords[0]);
    const lat = toNumber(coords[1]);
    if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
  }

  const lat = toNumber(
    record?.gps_lat ||
    pickThingText(thing, ["latitude", "Latitude", "lat", "Lat", "緯度"]) ||
    pickThingText(record, ["latitude", "Latitude", "lat", "Lat", "緯度"])
  );
  const lon = toNumber(
    record?.gps_lon ||
    pickThingText(thing, ["longitude", "Longitude", "lon", "Lon", "lng", "Lng", "經度"]) ||
    pickThingText(record, ["longitude", "Longitude", "lon", "Lon", "lng", "Lng", "經度"])
  );
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
}

function mapAirboxAreaToCounty(area) {
  const key = String(area || "").trim().toLowerCase();
  const map = {
    keelung: "基隆市",
    taipei: "臺北市",
    new_taipei: "新北市",
    taoyuan: "桃園市",
    hsinchu_city: "新竹市",
    hsinchu_county: "新竹縣",
    miaoli: "苗栗縣",
    taichung: "臺中市",
    taichuang: "臺中市",
    changhua: "彰化縣",
    nantou: "南投縣",
    yunlin: "雲林縣",
    chiayi_city: "嘉義市",
    chiayi_county: "嘉義縣",
    tainan: "臺南市",
    kaohsiung: "高雄市",
    pingtung: "屏東縣",
    yilan: "宜蘭縣",
    ilan: "宜蘭縣",
    hualien: "花蓮縣",
    taitung: "臺東縣",
    penghu: "澎湖縣",
    kinmen: "金門縣",
    lienchiang: "連江縣",
  };
  return map[key] || "";
}

function extractTownFromAirboxName(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const match = text.match(/(.*?[鄉鎮市區])/);
  return match ? match[1] : "";
}

function extractCountyFromAirboxText(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const match = text.match(/(基隆市|臺北市|台北市|新北市|桃園市|新竹市|新竹縣|苗栗縣|臺中市|台中市|彰化縣|南投縣|雲林縣|嘉義市|嘉義縣|臺南市|台南市|高雄市|屏東縣|宜蘭縣|花蓮縣|臺東縣|台東縣|澎湖縣|金門縣|連江縣)/);
  return match ? normalizeCountyName(match[1]) : "";
}

function resolveAreaByPoint(geo, lon, lat, view) {
  if (!geo?.features?.length || !Number.isFinite(lon) || !Number.isFinite(lat)) return null;
  const pt = [Number(lon), Number(lat)];
  for (const feature of geo.features) {
    if (!geometryContainsPoint(feature?.geometry, pt)) continue;
    return {
      county: normalizeCountyName(
        feature?.properties?.COUNTYNAME ||
        feature?.properties?.CountyName ||
        feature?.properties?.countyName ||
        view?.countyFilter ||
        ""
      ),
      town:
        feature?.properties?.TOWNNAME ||
        feature?.properties?.TownName ||
        feature?.properties?.townName ||
        feature?.properties?.[TOWN_NAME_FIELD] ||
        feature?.properties?.name ||
        "",
    };
  }
  return null;
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
        `${sanitizeText(formatRankingEntryValue(metricKey, entry, metric))}<br>` +
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
    view.dom.table.classList.toggle("ranking-table--temp-diff", metricKey === "dailyTempDiff" || metricKey === "tempHighLow");
    const headerCells = view.dom.table.querySelectorAll("thead th");
    const tempHeaderIndex = view.showTownColumn ? 5 : 4;
    const tempHeader = headerCells[tempHeaderIndex];
    if (tempHeader) {
      const isTempDiffMetric = isDailyTempDiffMetric(metricKey);
      tempHeader.textContent = isTempDiffMetric ? "溫差" : "溫度";
      tempHeader.classList.toggle("sortable-header", isTempDiffMetric);
      tempHeader.tabIndex = isTempDiffMetric ? 0 : -1;
      tempHeader.setAttribute("role", isTempDiffMetric ? "button" : "columnheader");
      tempHeader.title = isTempDiffMetric
        ? view.state.sortDir === "desc"
          ? "目前由溫差大到小排序，點擊改為由小到大"
          : "目前由溫差小到大排序，點擊改為由大到小"
        : "";
      tempHeader.onclick = isTempDiffMetric ? () => toggleRankingSort(view, metricKey) : null;
      tempHeader.onkeydown = isTempDiffMetric
        ? (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            toggleRankingSort(view, metricKey);
          }
        : null;
    }
  }
  if (view.dom.valueHeader) {
    view.dom.valueHeader.textContent = formatRankingHeader(metricKey, metric);
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
      : formatRankingEntryValue(metricKey, entry, metric);
    const windText =
      metric.colorScale === "wind" && Number.isFinite(entry.direction)
        ? formatWindDirection(entry.direction)
        : "—";
    const tempText =
      (metricKey === "dailyTempDiff" || metricKey === "tempHighLow") && Number.isFinite(entry.value)
        ? `${Number(entry.value).toFixed(1)}℃`
        : metricKey === "thi" && Number.isFinite(entry.temperature)
          ? `${Number(entry.temperature).toFixed(1)}°C`
          : "—";
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
  const valueText = formatRankingEntryValue(metricKey, best, metric);
  return `<strong>${label}</strong>${sanitizeText(best.name || "測站")} ${sanitizeText(valueText)}`;
}

function formatRankingHeader(metricKey, metric) {
  if (metricKey === "tempHighLow") return "最低溫 - 最高溫 (℃)";
  if (metricKey === "dailyTempDiff") return "最低溫 - 最高溫 (℃)";
  const label = metricKey === "thi" ? "溫濕度指數(THI)" : metric.label;
  const unitText = metric.unit ? `(${metric.unit})` : "";
  return `${label}${unitText}`.trim();
}

function sortEntries(entries, dir) {
  const list = Array.from(entries || []);
  list.sort((a, b) => {
    const av = Number.isFinite(a?.sortValue) ? a.sortValue : a.value;
    const bv = Number.isFinite(b?.sortValue) ? b.sortValue : b.value;
    if (dir === "asc") return av - bv;
    return bv - av;
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
  const targets = getCountyFilterTargets(view.countyFilter);
  const features = view.state.townGeo.features || [];
  const bounds = L.latLngBounds();
  let matched = false;
  features.forEach((f) => {
    const countyName = normalizeCountyName(
      f?.properties?.COUNTYNAME || f?.properties?.CountyName || f?.properties?.countyName || ""
    );
    if (!targets.includes(countyName)) return;
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

function formatTemperatureC(value) {
  if (!Number.isFinite(value)) return "—";
  return `${Number(value).toFixed(1)}℃`;
}

function formatRankingEntryValue(metricKey, entry, metric) {
  if ((metricKey === "tempHighLow" || metricKey === "dailyTempDiff") && entry) {
    const low = Number(entry.dailyLowTemp);
    const high = Number(entry.dailyHighTemp);
    if (Number.isFinite(low) && Number.isFinite(high)) {
      return `${formatTemperatureC(low)} - ${formatTemperatureC(high)}`;
    }
  }
  return formatRankingValue(metricKey, entry?.value, metric?.unit || "");
}

function formatRankingValue(metricKey, value, unit) {
  if (!isValidObservation(value)) return "—";
  if (metricKey === "lightning") {
    const suffix = unit ? unit : "";
    return `${Number(value).toFixed(0)}${suffix}`;
  }
  const digits =
    metricKey === "humidity" || metricKey === "aqi" || metricKey === "pm25" || metricKey === "pm25Airbox" || metricKey === "pm10Airbox" || metricKey === "pm1Airbox" || metricKey === "pm10" || metricKey === "o3"
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
  if (!isValidObservation(value)) return "—";
  switch (metricKey) {
    case "lightning":
      return "雷擊預警";
    case "temp":
      return value <= DISASTER_TEMP_LOW_THRESHOLD ? "低溫警戒" : value >= DISASTER_TEMP_HIGH_THRESHOLD ? "高溫警戒" : "—";
    case "tempDailyLow":
      return value <= DISASTER_TEMP_LOW_THRESHOLD ? "低溫警戒" : "—";
    case "tempDailyHigh":
      return value >= DISASTER_TEMP_HIGH_THRESHOLD ? "高溫警戒" : "—";
    case "dailyTempDiff":
      return value > 10 ? "溫差警戒" : "—";
    case "apparent":
      return value <= DISASTER_APPARENT_TEMP_LOW_THRESHOLD ? "低溫警戒" : value >= DISASTER_APPARENT_TEMP_HIGH_THRESHOLD ? "高溫警戒" : "—";
    case "humidity":
      return value <= DISASTER_HUMIDITY_LOW_THRESHOLD ? "乾燥警戒" : value > DISASTER_HUMIDITY_FOG_THRESHOLD ? "雨霧警戒" : "—";
    case "wind":
      return windToBeaufortLevel(value) >= 6 ? "強風警戒" : "—";
    case "gust":
      return windToBeaufortLevel(value) >= 8 ? "強陣風警戒" : "—";
    case "rain":
      return value > DISASTER_RAIN_THRESHOLD ? "短時強降雨" : "—";
    case "rain3hr":
      return value > DISASTER_RAIN_3HR_THRESHOLD ? "大雨警戒(3hr)" : "—";
    case "rain24hr":
      return value > DISASTER_RAIN_24HR_THRESHOLD ? "豪雨警戒(24hr)" : "—";
    case "aqi":
      if (value >= 301) return "危害 (已達危害健康標準)";
      if (value >= 201) return "嚴重(已達影響健康標準)";
      if (value >= 151) return "過高(所有人員應注意)";
      if (value >= 101) return "不良 (過敏體質者注意)";
      return null;
    case "pm25":
      if (value >= 225.5) return "危害 (已達危害健康標準)";
      if (value >= 125.5) return "嚴重(已達影響健康標準)";
      if (value >= 50.5) return "過高(所有人員應注意)";
      if (value >= 30.5) return "偏高 (過敏體質者注意)";
      return null;
    case "pm25Airbox":
      if (value >= 225.5) return "危害 (已達危害健康標準)";
      if (value >= 125.5) return "嚴重(已達影響健康標準)";
      if (value >= 50.5) return "過高(所有人員應注意)";
      if (value >= 30.5) return "偏高 (過敏體質者注意)";
      return null;
    case "pm1Airbox":
      return value >= 55 ? "細懸浮微粒警戒" : "細懸浮微粒注意";
    case "pm10Airbox":
    case "pm10":
      if (value >= 425) return "危害 (已達危害健康標準)";
      if (value >= 355) return "嚴重(已達影響健康標準)";
      if (value >= 191) return "過高(所有人員應注意)";
      if (value >= 76) return "偏高 (過敏體質者注意)";
      return null;
    case "o3":
      if (value >= 405) return "危害 (已達危害健康標準)";
      if (value >= 205) return "嚴重(已達影響健康標準)";
      if (value >= 135) return "過高(所有人員應注意)";
      if (value >= 101) return "偏高 (過敏體質者注意)";
      return null;
    default:
      return "—";
  }
}

function getMetricColor(metricKey, metric, value) {
  if (!isValidObservation(value)) return "#cbd5f5";
  switch (metric.colorScale) {
    case "lightning":
      return lightningColor(value);
    case "temp":
      return gradientColor(value, 6, 36, ["#1b6fd1", "#26b16f", "#e6e447", "#f4a13d", "#e04a3b", "#8a2bd8"]);
    case "tempDiff":
      return dailyTempDiffColor(value);
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

function dailyTempDiffColor(value) {
  if (!Number.isFinite(value)) return "#d1d5db";
  const idx = DAILY_TEMP_DIFF_LEVELS.findLastIndex((level) => value >= level);
  const safeIdx = Math.max(0, Math.min(DAILY_TEMP_DIFF_COLORS.length - 1, idx));
  return DAILY_TEMP_DIFF_COLORS[safeIdx];
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

function no2Color(value) {
  const levels = NO2_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return NO2_COLORS[i] || NO2_COLORS[NO2_COLORS.length - 1];
  }
  return NO2_COLORS[NO2_COLORS.length - 1];
}

function so2Color(value) {
  const levels = SO2_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return SO2_COLORS[i] || SO2_COLORS[SO2_COLORS.length - 1];
  }
  return SO2_COLORS[SO2_COLORS.length - 1];
}

function coColor(value) {
  const levels = CO_LEVELS.slice(1);
  for (let i = 0; i < levels.length; i += 1) {
    if (value <= levels[i]) return CO_COLORS[i] || CO_COLORS[CO_COLORS.length - 1];
  }
  return CO_COLORS[CO_COLORS.length - 1];
}

function pollutantLevelLabel(value, levels, labels = AIR_QUALITY_LEVEL_LABELS) {
  if (!Number.isFinite(value)) return "";
  const thresholds = levels.slice(1);
  for (let i = 0; i < thresholds.length; i += 1) {
    if (value <= thresholds[i]) return labels[i] || labels[labels.length - 1] || "";
  }
  return labels[labels.length - 1] || "";
}

function getRealtimeAqiTone(metricKey, value) {
  if (!Number.isFinite(value)) return null;
  switch (metricKey) {
    case "aqi":
      return { color: aqiColor(value), label: pollutantLevelLabel(value, AQI_LEVELS) };
    case "pm25":
      return { color: pm25Color(value), label: pollutantLevelLabel(value, PM25_LEVELS) };
    case "pm10":
      return { color: pm10Color(value), label: pollutantLevelLabel(value, PM10_LEVELS) };
    case "o3":
      return { color: o3Color(value), label: pollutantLevelLabel(value, O3_LEVELS, O3_LEVEL_LABELS) };
    case "no2":
      return { color: no2Color(value), label: pollutantLevelLabel(value, NO2_LEVELS) };
    case "so2":
      return { color: so2Color(value), label: pollutantLevelLabel(value, SO2_LEVELS) };
    case "co":
      return { color: coColor(value), label: pollutantLevelLabel(value, CO_LEVELS) };
    default:
      return null;
  }
}

function renderRealtimeDataRow(row) {
  const label = sanitizeText(row.label);
  const value = sanitizeText(row.value);
  if (!row.tone) {
    const alertClass = row.alert ? " data-row-alert" : "";
    return `<div class="data-row${alertClass}"><span>${label}</span><strong>${value}</strong></div>`;
  }
  const color = row.tone.color || "#334155";
  const readableColor = darkenHex(color, 0.6);
  const badgeBg = toRgba(color, 0.14);
  const badgeBorder = toRgba(readableColor, 0.4);
  const badgeLabel = sanitizeText(row.tone.label || "");
  return `
    <div class="data-row data-row-pollutant">
      <span>${label}</span>
      <div class="data-value-group">
        <strong style="color:${readableColor}; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.65);">${value}</strong>
        ${badgeLabel ? `<span class="aqi-badge" style="background:${badgeBg}; border-color:${badgeBorder}; color:${readableColor}; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);">${badgeLabel}</span>` : ""}
      </div>
    </div>`;
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

function darkenHex(hex, factor = 0.7) {
  if (!hex || typeof hex !== "string") return "#334155";
  const [r, g, b] = hexToRgb(hex);
  const ratio = Math.max(0, Math.min(1, factor));
  return `#${toHex(Math.round(r * ratio))}${toHex(Math.round(g * ratio))}${toHex(Math.round(b * ratio))}`;
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
  if (typeof value === "string" && value.trim() === "") return false;
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

function setRankingDataTimeFromLightning(lightning, view) {
  if (!view?.dom?.dataTime) return;
  view.dom.dataTime.textContent = lightning?.rangeText || lightning?.latestTime || "";
}

function setRankingDataTimeFromAirbox(records, view) {
  if (!view?.dom?.dataTime) return;
  const latest = findLatestAirboxTime(records);
  view.dom.dataTime.textContent = latest ? latest : "";
}

function setRankingDataSource(view, metricKey) {
  const el = view?.dom?.dataSource;
  if (!el) return;
  el.textContent = getRankingDataSourceText(metricKey);
}

function getRankingDataSourceText(metricKey) {
  if (isLightningMetric(metricKey)) {
    return `資料來源：${LIGHTNING_DATASET} 落雷資料。`;
  }
  if (metricKey?.startsWith("rain")) {
    return `資料來源：${RAIN_DATASET} 雨量觀測。`;
  }
  if (isAqiMetric(metricKey)) {
    return "資料來源：環境部 AQI 即時資料。";
  }
  if (isAirboxMetric(metricKey)) {
    return "資料來源：空氣盒子即時資料。";
  }
  return `資料來源：${RANKING_DATASET} 即時氣象；缺值輔以 ${NON_RAIN_FALLBACK_DATASET}。`;
}

function setHealthDataSource(metricKey) {
  const el = healthView?.dom?.dataSource;
  if (!el) return;
  const datasetId = getHealthDatasetId(metricKey);
  const metric = rankingMetrics[metricKey];
  el.textContent = `資料來源：${datasetId} ${metric?.label || "健康氣象"}。`;
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

function findLatestAirboxTime(records) {
  let latest = null;
  let latestMs = 0;
  records.forEach((record) => {
    const obs = Array.isArray(record?.Observations) ? record.Observations[0] : null;
    const raw = record?.timestamp || obs?.phenomenonTime || obs?.resultTime || record?.phenomenonTime || "";
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
  renderColorbarConfig(buildColorbarConfig(metricKey, metric), colorbarEl);
}

function lightningColor(value) {
  if (value >= 5) return "#b91c1c";
  if (value >= 3) return "#ef4444";
  if (value >= 2) return "#f97316";
  return "#facc15";
}

function renderColorbarConfig(config, colorbarEl) {
  if (!colorbarEl) return;
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
  if (metric.colorScale === "lightning") {
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: ["#facc15", "#f97316", "#ef4444", "#b91c1c"],
      ticks: ["1", "2", "3", "5+"],
      tickPositions: [0.125, 0.375, 0.625, 0.875],
      legend: [
        { label: "1", color: "#facc15" },
        { label: "2", color: "#f97316" },
        { label: "3-4", color: "#ef4444" },
        { label: "5+", color: "#b91c1c" },
      ],
    };
  }
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
    const levels = metricKey === "pm1Airbox" ? [0, 10, 20, 30, 80, 150] : PM25_LEVELS;
    const blocks = PM25_COLORS.length;
    const ticks = levels.map((v) => String(v));
    const positions = levels.map((_, idx) => idx / blocks);
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
    const ticks = ["0", "101", "135", "205", "405"];
    const positions = [0, 1 / blocks, 2 / blocks, 3 / blocks, 4 / blocks];
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: O3_COLORS,
      ticks,
      tickPositions: positions,
      legend: [
        { label: "<101", color: O3_COLORS[0] },
        { label: "101-134", color: O3_COLORS[1] },
        { label: "135-204", color: O3_COLORS[2] },
        { label: "205-404", color: O3_COLORS[3] },
        { label: "405+", color: O3_COLORS[4] },
      ],
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
  if (metric.colorScale === "tempDiff") {
    const blocks = DAILY_TEMP_DIFF_LEVELS.length;
    return {
      title: `${metric.label} (${metric.unit})`,
      stops: DAILY_TEMP_DIFF_COLORS,
      ticks: DAILY_TEMP_DIFF_LABELS,
      tickPositions: DAILY_TEMP_DIFF_LEVELS.map((_, idx) => (idx + 0.5) / blocks),
      legend: DAILY_TEMP_DIFF_LEVELS.map((level, idx) => ({
        label: DAILY_TEMP_DIFF_LABELS[idx] || String(level),
        color: DAILY_TEMP_DIFF_COLORS[idx],
      })),
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

async function loadLightningData() {
  if (!dom.lightningStatus) return;
  setLightningStatus("讀取落雷資料...");
  try {
    const { lightning, source } = await fetchLightningData();
    realtimeState.latestLightning = lightning;
    renderLightningData(lightning);
    const rangeText = lightning.rangeText || lightning.latestTime || "";
    const sourceText = source === "sample" ? "（範例檔）" : "";
    const label = rangeText ? `更新時間：${rangeText}${sourceText}` : `已更新落雷資料${sourceText}`;
    setLightningStatus(`${label}，共 ${lightning.points.length} 筆`);
    if (realtimeState.alertCache) renderAlerts(realtimeState.alertCache);
  } catch (err) {
    console.error(err);
    realtimeState.latestLightning = null;
    renderLightningData({ points: [], title: "", rangeText: "", latestTime: "" });
    setLightningStatus(err.message || "落雷資料讀取失敗");
    if (realtimeState.alertCache) renderAlerts(realtimeState.alertCache);
  }
}

function buildRainTownAlerts(entries) {
  const byTown = new Map();
  entries.forEach((entry) => {
    const rain = Number(entry.value);
    if (!Number.isFinite(rain) || rain <= 0) return;
    const town = String(entry.town || "").trim();
    if (!town) return;
    const current = byTown.get(town);
    if (!current || rain > current.value) {
      byTown.set(town, {
        town,
        value: rain,
        station: entry.name || "",
        time: entry.time || "",
        lat: entry.lat,
        lon: entry.lon,
      });
    }
  });
  return Array.from(byTown.values()).sort((a, b) => b.value - a.value || a.town.localeCompare(b.town, "zh-Hant"));
}

async function fetchLightningKmz() {
  try {
    return { buffer: await fetchCwaFileDataset(LIGHTNING_DATASET, "KMZ"), source: "live" };
  } catch (liveErr) {
    console.warn("lightning live dataset fallback to sample:", liveErr);
    const res = await fetch(LIGHTNING_SAMPLE_URL);
    if (!res.ok) {
      throw liveErr;
    }
    return { buffer: await res.arrayBuffer(), source: "sample" };
  }
}

async function fetchLightningData() {
  const { buffer: kmzBuffer, source } = await fetchLightningKmz();
  const kmlText = await extractKmlFromKmz(kmzBuffer);
  return { lightning: parseLightningKml(kmlText), source };
}

function setLightningStatus(text) {
  if (dom.lightningStatus) dom.lightningStatus.textContent = text;
}

async function fetchCwaFileDataset(datasetId, format = "KMZ") {
  const search = new URLSearchParams({ downloadType: "WEB", format });
  if (CWA_API_KEY) search.set("Authorization", CWA_API_KEY);
  const url = `${CWA_FILEAPI_BASE}/${datasetId}?${search.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`無法取得 ${datasetId}（${res.status}）`);
  }
  return res.arrayBuffer();
}

async function extractKmlFromKmz(arrayBuffer) {
  if (!window.JSZip) {
    throw new Error("缺少 KMZ 解壓縮套件，無法讀取落雷資料");
  }
  const zip = await window.JSZip.loadAsync(arrayBuffer);
  const kmlFile = Object.values(zip.files).find((file) => !file.dir && /\.kml$/i.test(file.name));
  if (!kmlFile) {
    throw new Error("落雷 KMZ 中找不到 KML 檔");
  }
  return kmlFile.async("text");
}

function parseLightningKml(kmlText) {
  const doc = new DOMParser().parseFromString(kmlText, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("落雷 KML 格式錯誤");
  }
  const title = getXmlText(doc, "Document > name") || getXmlText(doc, "name");
  const placemarks = Array.from(doc.getElementsByTagNameNS("*", "Placemark"));
  const points = placemarks
    .map((placemark, index) => parseLightningPlacemark(placemark, index))
    .filter(Boolean);
  const latest = points
    .map((p) => Date.parse(p.timestamp || ""))
    .filter((ms) => Number.isFinite(ms))
    .sort((a, b) => b - a)[0];
  return {
    title,
    rangeText: extractLightningRangeText(title),
    latestTime: Number.isFinite(latest) ? formatObsTime(new Date(latest).toISOString()) : "",
    latestMs: Number.isFinite(latest) ? latest : null,
    points,
  };
}

function parseLightningPlacemark(placemark, index) {
  const name = getXmlText(placemark, "name");
  const description = getXmlText(placemark, "description");
  const timestamp = getXmlText(placemark, "when");
  const coordText = getXmlText(placemark, "coordinates");
  const [lonRaw, latRaw] = String(coordText || "").trim().split(",");
  const lon = Number(lonRaw);
  const lat = Number(latRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  const typeMatch = description.match(/閃電種類:\s*([^\r\n]+)/);
  const timeMatch = description.match(/時間:\s*([^\r\n]+)/);
  const type = (typeMatch?.[1] || (name.includes("對地") ? "對地" : name.includes("雲間") ? "雲間" : "")).trim();
  const timeText = (timeMatch?.[1] || "").trim();
  return {
    id: `${type || "lightning"}-${index}`,
    name,
    type,
    timeText,
    timestamp,
    lat,
    lon,
  };
}

function renderLightningData(lightning) {
  const points = Array.isArray(lightning?.points) ? lightning.points : [];
  updateLightningSummary(points);
  if (realtimeState.lightningLayer && realtimeState.lightningMap) {
    realtimeState.lightningMap.removeLayer(realtimeState.lightningLayer);
    realtimeState.lightningLayer = null;
  }
  if (!realtimeState.lightningMap || !points.length) return;
  const latestMs =
    Number.isFinite(lightning?.latestMs)
      ? lightning.latestMs
      : points
          .map((p) => Date.parse(p.timestamp || ""))
          .filter((ms) => Number.isFinite(ms))
          .sort((a, b) => b - a)[0];
  const markers = points.map((point) => {
    const isGround = point.type.includes("對地");
    const pointMs = Date.parse(point.timestamp || "");
    const ageMinutes = Number.isFinite(latestMs) && Number.isFinite(pointMs) ? Math.max(0, (latestMs - pointMs) / 60000) : null;
    const ageClass = getLightningAgeClass(ageMinutes);
    const shapeClass = isGround ? "lightning-marker-ground" : "lightning-marker-cloud";
    const iconSize = isGround ? [18, 18] : [15, 15];
    const marker = L.marker([point.lat, point.lon], {
      icon: L.divIcon({
        className: "",
        html: `<span class="lightning-marker ${shapeClass} ${ageClass}"></span>`,
        iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
      }),
    });
    const time = point.timestamp ? formatObsTime(point.timestamp) : point.timeText;
    const ageText = Number.isFinite(ageMinutes) ? `<br>距最新資料：約 ${Math.round(ageMinutes)} 分鐘` : "";
    marker.bindPopup(`<strong>${sanitizeText(point.type || "閃電")}</strong><br>時間：${sanitizeText(time || "—")}${ageText}<br>經緯度：${point.lon.toFixed(3)}, ${point.lat.toFixed(3)}`);
    return marker;
  });
  realtimeState.lightningLayer = L.layerGroup(markers).addTo(realtimeState.lightningMap);
  resetLightningMapView();
}

function getLightningAgeClass(ageMinutes) {
  if (!Number.isFinite(ageMinutes)) return "lightning-age-3";
  if (ageMinutes <= 5) return "lightning-age-0";
  if (ageMinutes <= 10) return "lightning-age-1";
  if (ageMinutes <= 30) return "lightning-age-2";
  return "lightning-age-3";
}

function getLightningLatestMs(lightning) {
  if (Number.isFinite(lightning?.latestMs)) return lightning.latestMs;
  return (Array.isArray(lightning?.points) ? lightning.points : [])
    .map((p) => Date.parse(p.timestamp || ""))
    .filter((ms) => Number.isFinite(ms))
    .sort((a, b) => b - a)[0];
}

function isGroundLightning(point) {
  return String(point?.type || point?.name || "").includes("對地");
}

function findLightningAlertPoints(lightning, options = {}) {
  const points = Array.isArray(lightning?.points) ? lightning.points : [];
  const center = options.center || NCUE_COORDS;
  const radiusKm = Number(options.radiusKm ?? LIGHTNING_ALERT_RADIUS_KM);
  const recentMinutes = Number(options.recentMinutes ?? LIGHTNING_ALERT_RECENT_MINUTES);
  const latestMs = getLightningLatestMs(lightning);
  if (!points.length || !Number.isFinite(center.lat) || !Number.isFinite(center.lon)) return [];
  return points
    .map((point) => {
      const pointMs = Date.parse(point.timestamp || "");
      const ageMinutes = Number.isFinite(latestMs) && Number.isFinite(pointMs) ? Math.max(0, (latestMs - pointMs) / 60000) : null;
      return {
        ...point,
        ageMinutes,
        distanceKm: distanceKm(center.lat, center.lon, point.lat, point.lon),
      };
    })
    .filter((point) => {
      if (options.groundOnly && !isGroundLightning(point)) return false;
      if (!Number.isFinite(point.distanceKm) || point.distanceKm > radiusKm) return false;
      if (Number.isFinite(recentMinutes) && Number.isFinite(point.ageMinutes) && point.ageMinutes > recentMinutes) return false;
      return true;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm || (a.ageMinutes ?? Infinity) - (b.ageMinutes ?? Infinity));
}

function resetLightningMapView() {
  if (!realtimeState.lightningMap) return;
  realtimeState.lightningMap.fitBounds(TAIWAN_MAIN_ISLAND_BOUNDS, { padding: [18, 18] });
}

function updateLightningSummary(points = []) {
  if (!dom.lightningSummary) return;
  const ground = points.filter((p) => p.type.includes("對地")).length;
  const cloud = points.filter((p) => p.type.includes("雲間")).length;
  const hasData = points.length > 0;
  dom.lightningSummary.innerHTML = `
    <span>總筆數：${hasData ? points.length : "--"}</span>
    <span>對地：${hasData ? ground : "--"}</span>
    <span>雲間：${hasData ? cloud : "--"}</span>
  `;
}

function extractLightningRangeText(title) {
  const match = String(title || "").match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s*~\s*\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})/);
  return match ? match[1].replace(/-/g, "/") : "";
}

function getXmlText(node, selector) {
  const found = node.querySelector(selector);
  return found ? found.textContent.trim() : "";
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
  const targetCounty = healthView.countyFilter ? normalizeCountyName(healthView.countyFilter) : null;
  locations.forEach((countyBlock) => {
    const county = normalizeCountyName(countyBlock?.CountyName || countyBlock?.countyName || "");
    if (targetCounty && county !== targetCounty) return;
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
  const targetCounty = healthView.countyFilter ? normalizeCountyName(healthView.countyFilter) : null;
  locations.forEach((countyBlock) => {
    const county = normalizeCountyName(countyBlock?.CountyName || countyBlock?.countyName || "");
    if (targetCounty && county !== targetCounty) return;
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
  stopHealthTimelinePlayback();
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
      setHealthDataSource(metricKey);
      updateHealthTimelinePlaybackButton();
    } else {
      const entries = buildHealthEntries(locations, metricKey, windowHours);
      healthView.state.entries = entries;
      healthView.state.timelineKeys = [];
      healthView.state.timelineEntries = new Map();
      await renderRanking(entries, metricKey, healthView);
      const latest = formatObsTime(extractHealthIssueTime(data)) || extractHealthIssueTime(data) || "";
      healthView.dom.dataTime.textContent = latest;
      setHealthDataSource(metricKey);
      if (healthView.dom.timelineLabel) healthView.dom.timelineLabel.textContent = "--";
      updateHealthTimelinePlaybackButton();
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
  const tropicalCyclones = records?.TropicalCyclones?.TropicalCyclone;
  if (!list.length && Array.isArray(tropicalCyclones)) {
    tropicalCyclones.forEach((item) => {
      const fixes = Array.isArray(item?.AnalysisData?.Fix) ? item.AnalysisData.Fix : [];
      const forecastFixes = Array.isArray(item?.ForecastData?.Fix) ? item.ForecastData.Fix : [];
      const latest = fixes[fixes.length - 1] || {};
      list.push({
        name: item.CwaTyphoonName || item.CwaTdName || item.TyphoonName || item.name || item.id,
        id: item.CwaTyNo || item.CwaTdNo || item.TyphoonName || item.id,
        year: item.Year || "",
        englishName: item.TyphoonName || "",
        status: latest.MaxWindSpeed ? `最大風速 ${latest.MaxWindSpeed} m/s` : "",
        time: latest.DateTime || item.UpdateTime || item.issueTime,
        text: getLocalizedValue(latest.MovingPrediction) || formatTyphoonMotion(latest),
        current: parseTyphoonFix(latest),
        track: fixes.map(parseTrackPoint).filter(Boolean),
        forecastTrack: forecastFixes.map(parseForecastTrackPoint).filter(Boolean),
      });
    });
  }
  return list;
}

function getLocalizedValue(value) {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  const picked = value.find((item) => String(item?.lang || "").toLowerCase().includes("zh")) || value[0];
  return picked?.value || "";
}

function formatTyphoonMotion(fix) {
  const direction = fix?.MovingDirection || "";
  const speed = fix?.MovingSpeed || "";
  if (direction && speed) return `移動方向 ${direction}，移動速度 ${speed} km/h`;
  if (direction) return `移動方向 ${direction}`;
  if (speed) return `移動速度 ${speed} km/h`;
  return "";
}

function parseForecastTrackPoint(point) {
  const parsed = parseTyphoonFix(point);
  if (!parsed) return null;
  const probabilityRadiusKm = Number(point?.Radius70PercentProbability);
  return {
    ...parsed,
    forecastHour: point?.ForecastHour || "",
    initialTime: point?.InitialTime || "",
    probabilityRadiusKm: Number.isFinite(probabilityRadiusKm) ? probabilityRadiusKm : null,
    maxWindSpeed: point?.MaxWindSpeed || "",
    pressure: point?.Pressure || "",
  };
}

function parseTyphoonFix(point) {
  const parsed = parseTrackPoint(point);
  if (!parsed) return null;
  return {
    ...parsed,
    maxWindSpeed: point?.MaxWindSpeed || "",
    maxGustSpeed: point?.MaxGustSpeed || "",
    pressure: point?.Pressure || "",
    movingSpeed: point?.MovingSpeed || "",
    movingDirection: point?.MovingDirection || "",
    circle15Radius: point?.Circle15ms?.Radius || "",
    circle25Radius: point?.Circle25ms?.Radius || "",
  };
}

function formatTyphoonCoord(point) {
  if (!point) return "";
  return `${Number(point.lat).toFixed(1)}°N，${Number(point.lon).toFixed(1)}°E`;
}

function formatTyphoonWindCircle(point) {
  const values = [];
  if (point?.circle15Radius) values.push(`15m/s ${point.circle15Radius} km`);
  if (point?.circle25Radius) values.push(`25m/s ${point.circle25Radius} km`);
  return values.join(" / ");
}

function renderTyphoonDetailRows(t) {
  const current = t.current || t.track?.[t.track.length - 1];
  const rows = [
    ["目前位置", formatTyphoonCoord(current)],
    ["中心氣壓", current?.pressure ? `${current.pressure} hPa` : ""],
    ["近中心最大風速", current?.maxWindSpeed ? `${current.maxWindSpeed} m/s` : ""],
    ["瞬間最大陣風", current?.maxGustSpeed ? `${current.maxGustSpeed} m/s` : ""],
    ["25 m/s 風圈", current?.circle25Radius ? `${current.circle25Radius} km` : ""],
  ].filter(([, value]) => value);
  if (!rows.length) return "";
  return `<dl class="typhoon-detail-grid">
    ${rows.map(([label, value]) => `<div><dt>${sanitizeText(label)}</dt><dd>${sanitizeText(value)}</dd></div>`).join("")}
  </dl>`;
}

function renderTyphoonForecastTable(t) {
  const rows = (t.forecastTrack || []).slice(0, 8);
  if (!rows.length) return "";
  return `<div class="typhoon-forecast-wrap">
    <div class="typhoon-section-title">路徑潛勢預報</div>
    <table class="typhoon-forecast-table">
      <thead>
        <tr>
          <th>時效</th>
          <th>位置</th>
          <th>風速</th>
          <th>氣壓</th>
          <th>暴風圈半徑</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((point) => `<tr>
          <td>${sanitizeText(point.forecastHour ? `+${point.forecastHour}h` : "--")}</td>
          <td>${sanitizeText(formatTyphoonCoord(point) || "--")}</td>
          <td>${sanitizeText(point.maxWindSpeed ? `${point.maxWindSpeed} m/s` : "--")}</td>
          <td>${sanitizeText(point.pressure ? `${point.pressure} hPa` : "--")}</td>
          <td>${sanitizeText(formatTyphoonWindCircle(point) || "--")}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`;
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
          ${t.id ? `<span class="badge">#${sanitizeText(t.id)}</span>` : ""}
          ${t.englishName ? `<span class="badge">${sanitizeText(t.englishName)}</span>` : ""}
        </div>
        ${t.time ? `<div class="forecast-range">分析時間：${sanitizeText(t.time)}</div>` : ""}
        ${t.text ? `<p class="alert-desc">${sanitizeText(t.text)}</p>` : ""}
        ${renderTyphoonDetailRows(t)}
        ${renderTyphoonForecastTable(t)}
      </div>`;
    })
    .join("");

  // 繪製第一筆可用的分析路徑與預報路徑潛勢。
  const typhoon = list.find((t) => (t.track && t.track.length) || (t.forecastTrack && t.forecastTrack.length));
  if (typhoon && realtimeState.typhoonMap) {
    const layers = [];
    if (typhoon.track?.length) {
      layers.push(
        L.polyline(
          typhoon.track.map((p) => [p.lat, p.lon]),
          { color: "#2563eb", weight: 4, opacity: 0.9 }
        ).bindTooltip("分析路徑")
      );
    }
    if (typhoon.forecastTrack?.length) {
      const forecastLinePoints = (typhoon.track?.length ? [typhoon.track[typhoon.track.length - 1]] : []).concat(typhoon.forecastTrack);
      layers.push(
        L.polyline(
          forecastLinePoints.map((p) => [p.lat, p.lon]),
          { color: "#f97316", weight: 3, opacity: 0.9, dashArray: "8 8" }
        ).bindTooltip("路徑潛勢預報")
      );
      typhoon.forecastTrack.forEach((point) => {
        const label = `${point.forecastHour ? `${point.forecastHour}小時` : "預報點"}${point.probabilityRadiusKm ? `｜70%半徑 ${point.probabilityRadiusKm} km` : ""}`;
        layers.push(
          L.circleMarker([point.lat, point.lon], {
            radius: 4,
            color: "#c2410c",
            weight: 1,
            fillColor: "#f97316",
            fillOpacity: 0.95,
          }).bindTooltip(label)
        );
        if (Number.isFinite(point.probabilityRadiusKm) && point.probabilityRadiusKm > 0) {
          layers.push(
            L.circle([point.lat, point.lon], {
              radius: point.probabilityRadiusKm * 1000,
              color: "#f97316",
              weight: 1,
              opacity: 0.45,
              fillColor: "#fed7aa",
              fillOpacity: 0.12,
            }).bindTooltip(label)
          );
        }
      });
    }
    realtimeState.typhoonLayer = L.featureGroup(layers).addTo(realtimeState.typhoonMap);
    try {
      const bounds = L.latLngBounds(layers.flatMap((layer) => {
        const b = layer.getBounds?.();
        if (b?.isValid()) return [b.getSouthWest(), b.getNorthEast()];
        const latLng = layer.getLatLng?.();
        return latLng ? [latLng] : [];
      }));
      if (bounds.isValid()) {
        realtimeState.typhoonMap.fitBounds(bounds, { padding: [20, 20] });
      }
    } catch (_) {
      // ignore
    }
  }
  requestAnimationFrame(() => ensureRealtimeMapSized());
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
    Number(p.lat ?? p.latitude ?? p.Latitude ?? p.CoordinateLatitude ?? p.LAT ?? p.latitute ?? p.Lat ?? p.緯度);
  const lon =
    Number(p.lon ?? p.longitude ?? p.Longitude ?? p.CoordinateLongitude ?? p.LON ?? p.lonitude ?? p.Lon ?? p.經度);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    lat,
    lon,
    time: p.time || p.dateTime || p.DateTime || p.datetime,
  };
}

function sanitizeText(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

// ----------------- 彰化氣象預警 -----------------

let isChanghuaAlertLoading = false;

async function buildChanghuaAlertDataset(view) {
  const [cwaStations, rainData, aqiData, lightningResult] = await Promise.all([
    fetchMergedRealtimeStations().catch(() => []),
    fetchCwaDataset(RAIN_DATASET).catch(() => null),
    fetchAqiDataset().catch(() => null),
    fetchLightningData().catch(() => null),
  ]);

  const rainStations = rainData ? extractCwaStations(rainData) : [];
  const aqiRecords = aqiData ? extractAqiRecords(aqiData) : [];
  const lightning = lightningResult?.lightning || realtimeState.latestLightning;
  if (lightningResult?.lightning) realtimeState.latestLightning = lightningResult.lightning;

  await ensureRankingGeo(view);
  const mockView = {
    countyFilter: REALTIME_COUNTY,
    state: {
      townGeo: view.state.townGeo,
      countyCodeMap: view.state.countyCodeMap || disasterView.state.countyCodeMap,
    },
  };

  const items = [];
  const addItem = (type, town, options = {}) => {
    const safeTown = String(town || "").trim();
    if (!type || !safeTown) return;
    items.push({
      type,
      town: safeTown,
      name: options.name || options.station || "",
      valueText: options.valueText || "",
      time: options.time || "",
      metricKey: options.metricKey || "",
      value: options.value,
      lat: options.lat,
      lon: options.lon,
    });
  };

  buildRainTownAlerts(buildRankingEntries(rainStations, "rain", mockView)).forEach((item) => {
    addItem("降雨提醒 (過去一小時)", item.town, {
      name: item.station || "",
      valueText: formatAlertEntryValue("rain", item.value),
      time: item.time || "",
      metricKey: "rain",
      value: item.value,
      lat: item.lat,
      lon: item.lon,
    });
  });

  const processEntries = (stations, metrics) => {
    metrics.forEach((metricKey) => {
      buildDisasterEntries(stations, metricKey, mockView).forEach((entry) => {
        const rawType = formatDisasterLevel(metricKey, entry.value);
        if (rawType === "—") return;
        const type = normalizeAlertType(metricKey, rawType);
        addItem(type, entry.town || entry.name, {
          name: entry.name || "",
          valueText: formatAlertEntryValue(metricKey, entry.value),
          time: entry.time || "",
          metricKey,
          value: entry.value,
          lat: entry.lat,
          lon: entry.lon,
        });
      });
    });
  };

  processEntries(cwaStations, ["temp", "apparent", "humidity", "wind", "gust"]);
  processEntries(rainStations, ["rain", "rain3hr", "rain24hr"]);
  processEntries(aqiRecords, ["aqi", "pm25", "pm10", "o3"]);

  buildTownLightningAlerts(lightning, view).forEach((item) => {
    addItem("雷擊預警", item.town, {
      name: `${item.town}中心點 ${LIGHTNING_ALERT_RADIUS_KM} 公里內`,
      valueText: `${item.count}筆`,
      metricKey: "lightning",
      value: item.count,
    });
  });

  return items;
}

function groupAlertItems(items) {
  const grouped = new Map();
  (items || []).forEach((item) => {
    if (!grouped.has(item.type)) grouped.set(item.type, new Set());
    grouped.get(item.type).add(item.town);
  });
  return grouped;
}

async function loadChanghuaAlertTab() {
  const view = changhuaAlertView;
  if (!view.dom.status) return;
  setRankingStatus(view, "讀取彰化縣即時預警...");
  try {
    const items = await buildChanghuaAlertDataset(view);
    view.state.alerts = items;
    const grouped = groupAlertItems(items);
    const firstType = grouped.keys().next().value || "";
    if (!grouped.has(view.state.selectedType)) {
      view.state.selectedType = firstType;
      view.state.selectedTown = "";
    }
    renderChanghuaAlertTab();
    setRankingStatus(view, items.length ? `已更新 ${items.length} 筆預警觀測資料` : "目前無即時預警");
  } catch (err) {
    console.error("彰化即時預警載入失敗:", err);
    setRankingStatus(view, err.message || "彰化即時預警載入失敗");
  }
}

function getSelectedChanghuaAlertItems() {
  const { alerts, selectedType, selectedTown } = changhuaAlertState;
  return (alerts || []).filter((item) => {
    if (selectedType && item.type !== selectedType) return false;
    if (selectedTown && item.town !== selectedTown) return false;
    return true;
  });
}

function getChanghuaAlertValueHeaderLabel(items) {
  const metricKey = items.find((item) => item.metricKey)?.metricKey || "";
  switch (metricKey) {
    case "temp":
    case "apparent":
      return "溫度";
    case "humidity":
      return "濕度";
    case "wind":
      return "風速";
    case "gust":
      return "陣風";
    case "rain":
    case "rain3hr":
    case "rain24hr":
      return "雨量";
    case "lightning":
      return "雷擊數";
    case "aqi":
      return "AQI";
    case "pm25":
    case "pm25Airbox":
      return "PM2.5";
    case "pm10":
    case "pm10Airbox":
      return "PM10";
    case "o3":
      return "O3";
    default:
      return "指標";
  }
}

function sortChanghuaAlertItems(items, sortDir) {
  const direction = sortDir === "asc" ? 1 : -1;
  return [...items].sort((a, b) => {
    const av = Number(a.value);
    const bv = Number(b.value);
    const aValid = Number.isFinite(av);
    const bValid = Number.isFinite(bv);
    if (aValid && bValid && av !== bv) return (av - bv) * direction;
    if (aValid !== bValid) return aValid ? -1 : 1;
    return String(a.town || "").localeCompare(String(b.town || ""), "zh-Hant");
  });
}

function renderChanghuaAlertTab() {
  renderChanghuaAlertFilters();
  renderChanghuaAlertMap();
  renderChanghuaAlertTable();
}

function renderChanghuaAlertFilters() {
  const view = changhuaAlertView;
  const grouped = groupAlertItems(view.state.alerts);
  if (view.dom.typeList) {
    if (!grouped.size) {
      view.dom.typeList.innerHTML = `<span class="hint">目前無即時預警</span>`;
    } else {
      view.dom.typeList.innerHTML = Array.from(grouped.entries())
        .map(([type, towns]) => {
          const active = type === view.state.selectedType ? " active" : "";
          return `<button class="alert-filter-btn${active}" type="button" data-alert-type="${sanitizeText(type)}">${sanitizeText(type)}：${towns.size}</button>`;
        })
        .join("");
      view.dom.typeList.querySelectorAll("[data-alert-type]").forEach((btn) => {
        btn.addEventListener("click", () => {
          view.state.selectedType = btn.dataset.alertType || "";
          view.state.selectedTown = "";
          renderChanghuaAlertTab();
        });
      });
    }
  }

  const towns = view.state.selectedType && grouped.has(view.state.selectedType)
    ? Array.from(grouped.get(view.state.selectedType)).sort((a, b) => a.localeCompare(b, "zh-Hant"))
    : [];
  if (view.dom.townList) {
    view.dom.townList.innerHTML = towns.length
      ? [`<button class="alert-town-btn${view.state.selectedTown ? "" : " active"}" type="button" data-alert-town="">全部鄉鎮</button>`]
          .concat(towns.map((town) => `<button class="alert-town-btn${town === view.state.selectedTown ? " active" : ""}" type="button" data-alert-town="${sanitizeText(town)}">${sanitizeText(town)}</button>`))
          .join("")
      : "";
    view.dom.townList.querySelectorAll("[data-alert-town]").forEach((btn) => {
      btn.addEventListener("click", () => {
        view.state.selectedTown = btn.dataset.alertTown || "";
        renderChanghuaAlertTab();
      });
    });
  }
}

function renderChanghuaAlertMap() {
  const view = changhuaAlertView;
  const map = view.state.map;
  if (!map || !view.state.townGeo) return;
  if (view.state.townLayer) {
    map.removeLayer(view.state.townLayer);
    view.state.townLayer = null;
  }
  if (view.state.stationLayer) {
    map.removeLayer(view.state.stationLayer);
    view.state.stationLayer = null;
  }

  const items = getSelectedChanghuaAlertItems();
  const townSet = new Set(items.map((item) => item.town));
  const bounds = L.latLngBounds();
  view.state.townLayer = L.geoJSON(view.state.townGeo, {
    style: (feature) => {
      const town = getTownFeatureName(feature);
      const isAlertTown = townSet.has(town);
      const isSelectedTown = view.state.selectedTown && town === view.state.selectedTown;
      return {
        color: isAlertTown ? "#b91c1c" : "#64748b",
        weight: isAlertTown ? 2 : 1,
        fillColor: isAlertTown ? "#ef4444" : "transparent",
        fillOpacity: isSelectedTown ? 0.48 : isAlertTown ? 0.28 : 0,
      };
    },
    onEachFeature: (feature, layer) => {
      const town = getTownFeatureName(feature);
      const isAlertTown = townSet.has(town);
      layer.options.className = "alert-town-feature";
      layer.bindTooltip(`<strong>${sanitizeText(town)}</strong><br>${isAlertTown ? sanitizeText(view.state.selectedType || "即時預警") : "無此警戒"}`, { sticky: true, className: "town-tooltip" });
      layer.on("click", () => {
        if (!isAlertTown) return;
        view.state.selectedTown = town;
        renderChanghuaAlertTab();
      });
      const b = layer.getBounds?.();
      if (isAlertTown && b?.isValid()) bounds.extend(b);
    },
  }).addTo(map);

  view.state.stationLayer = L.layerGroup().addTo(map);
  items.forEach((item) => {
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const metric = rankingMetrics[item.metricKey] || rankingMetrics.temp;
    const fill = getMetricColor(item.metricKey || "temp", metric, item.value);
    const marker = L.circleMarker([lat, lon], {
      radius: 6,
      color: "#111",
      weight: 1,
      fillColor: fill,
      fillOpacity: 0.92,
    });
    marker.bindPopup(
      `<strong>${sanitizeText(item.name || "測站")}</strong><br>` +
        `${sanitizeText(item.town || "—")}<br>` +
        `${sanitizeText(item.type || "即時預警")}<br>` +
        `${sanitizeText(item.valueText || "—")}<br>` +
        `${sanitizeText(item.time || "")}`
    );
    marker.on("click", () => {
      if (!item.town) return;
      view.state.selectedTown = item.town;
      renderChanghuaAlertTab();
    });
    marker.addTo(view.state.stationLayer);
    bounds.extend([lat, lon]);
  });

  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });
  } else {
    map.setView(view.mapCenter, view.mapZoom);
  }
}

function renderChanghuaAlertTable() {
  const view = changhuaAlertView;
  const items = getSelectedChanghuaAlertItems();
  const sortedItems = sortChanghuaAlertItems(items, view.state.sortDir);
  if (view.dom.tableTitle) {
    const townPart = view.state.selectedTown ? `｜${view.state.selectedTown}` : "";
    view.dom.tableTitle.textContent = `${view.state.selectedType || "彰化縣即時預警"}${townPart}`;
  }
  if (view.dom.tableCount) view.dom.tableCount.textContent = items.length ? `${items.length} 筆` : "";
  if (view.dom.valueHeader) {
    const label = getChanghuaAlertValueHeaderLabel(items);
    const arrow = view.state.sortDir === "asc" ? "▲" : "▼";
    view.dom.valueHeader.textContent = `${label} ${arrow}`;
    view.dom.valueHeader.title = view.state.sortDir === "desc" ? "目前由高到低排序，點擊改為由低到高" : "目前由低到高排序，點擊改為由高到低";
    view.dom.valueHeader.setAttribute("aria-sort", view.state.sortDir === "desc" ? "descending" : "ascending");
  }
  if (!view.dom.tableBody) return;
  view.dom.tableBody.innerHTML = items.length
    ? sortedItems
        .map((item) => `<tr>
          <td>${sanitizeText(item.town)}</td>
          <td>${sanitizeText(item.name || item.type)}</td>
          <td>${sanitizeText(item.valueText || "—")}</td>
          <td>${sanitizeText(item.time || "—")}</td>
        </tr>`)
        .join("")
    : `<tr><td colspan="4">目前沒有符合條件的預警資料</td></tr>`;
}

async function loadAndDisplayChanghuaAlerts(view) {
  const alertContent = document.getElementById("changhuaAlertContent");
  if (!alertContent) return;
  
  if (isChanghuaAlertLoading) return;
  isChanghuaAlertLoading = true;
  
  alertContent.innerHTML = `<span style="color: #666;">載入預警資料中...</span>`;

  try {
    const alertsMap = groupAlertItems(await buildChanghuaAlertDataset(view));

    if (alertsMap.size === 0) {
      alertContent.innerHTML = `<span style="color: #333;">目前無即時預警</span>`;
      isChanghuaAlertLoading = false;
      return;
    }

    let tagsHtml = `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">`;
    let detailsHtml = `<div>`;

    let i = 0;
    for (const [alertType, townsSet] of alertsMap.entries()) {
      const towns = Array.from(townsSet).join("、") || "無";
      const id = `changhua-alert-detail-${i}`;
      
      tagsHtml += `
        <button class="alert-tag-btn" data-target="${id}" style="padding: 4px 12px; border-radius: 999px; background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; cursor: pointer; font-size: 0.9rem; font-weight: bold; transition: background 0.2s;">
          ${alertType} : ${townsSet.size}
        </button>
      `;
      
      detailsHtml += `
        <div id="${id}" class="alert-detail-box" style="display: none; padding: 0.75rem; background: #fff8f8; border-left: 3px solid #ef5350; border-radius: 4px; margin-bottom: 0.5rem; color: #b71c1c; font-size: 0.95rem;">
          <strong style="display: inline-block; width: auto;">${alertType}：</strong><span>${towns}</span>
        </div>
      `;
      i++;
    }

    tagsHtml += `</div>`;
    detailsHtml += `</div>`;

    alertContent.innerHTML = tagsHtml + detailsHtml;

    // Add toggle events
    const btns = alertContent.querySelectorAll(".alert-tag-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const targetEl = document.getElementById(targetId);
        const isVisible = targetEl.style.display !== "none";
        
        // Hide all
        alertContent.querySelectorAll(".alert-detail-box").forEach(el => el.style.display = "none");
        btns.forEach(b => b.style.background = "#ffebee");

        if (!isVisible) {
          targetEl.style.display = "block";
          btn.style.background = "#ffcdd2";
        }
      });
      
      btn.addEventListener("mouseover", () => {
        if (btn.style.background !== "rgb(255, 205, 210)") btn.style.background = "#ffcdd2";
      });
      btn.addEventListener("mouseout", () => {
        const targetEl = document.getElementById(btn.getAttribute("data-target"));
        if (!targetEl || targetEl.style.display === "none") {
          btn.style.background = "#ffebee";
        }
      });
    });

  } catch (err) {
    console.error("預警資料載入失敗:", err);
    alertContent.innerHTML = `<span style="color: #d32f2f;">無法載入預警資料</span>`;
  } finally {
    isChanghuaAlertLoading = false;
  }
}

// ----------------- 海象資訊 -----------------

function initMarineView() {
  if (!dom.marineTableBody) return;
  dom.reloadMarineBtn?.addEventListener("click", loadMarineData);
  loadMarineData();
}

async function loadMarineData() {
  if (!dom.marineStatus) return;
  dom.marineStatus.textContent = "讀取海象資訊...";
  try {
    const data = await fetchCwaDataset("F-A0021-001");
    const parsed = parseMarineData(data);
    renderMarineData(parsed);
    const now = new Date();
    if (dom.marineDataTime) dom.marineDataTime.textContent = formatObsTime(now.toISOString());
    dom.marineStatus.textContent = "已更新";
  } catch (err) {
    console.error(err);
    dom.marineStatus.textContent = err.message || "海象資訊載入失敗";
  }
}

function parseMarineData(payload) {
  const locations = payload?.records?.location || payload?.cwaopendata?.dataset?.location || [];
  const targets = ["伸港", "線西", "鹿港", "福興", "芳苑", "大城"];
  const results = [];
  const allDates = new Set();
  
  const d = new Date();
  let todayStr = "";
  try {
    const parts = new Intl.DateTimeFormat("zh-TW", {
      timeZone: "Asia/Taipei",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(d);
    const y = parts.find(p => p.type === "year").value;
    const m = parts.find(p => p.type === "month").value;
    const day = parts.find(p => p.type === "day").value;
    todayStr = `${y}/${m}/${day}`;
  } catch (e) {
    todayStr = d.toISOString().substring(0, 10).replace(/-/g, "/");
  }

  locations.forEach(loc => {
    const locName = loc.locationName || loc.LocationName || "";
    const matchedTarget = targets.find(t => locName.includes(t));
    if (!matchedTarget) return;

    const days = {};
    
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      let dt = node.dataTime || node.DataTime;
      let type = null;
      if (dt && Array.isArray(node.parameter)) {
         const p = node.parameter.find(p => p.parameterValue === "滿潮" || p.parameterValue === "乾潮" || (p.parameterName === "Tide" && (p.parameterValue === "滿潮" || p.parameterValue === "乾潮")));
         if (p) type = p.parameterValue === "滿潮" || p.parameterValue === "乾潮" ? p.parameterValue : type;
      }
      
      let height = null;
      if (dt && type) {
         let tideHeightNodes = [];
         if (node.tideHeights && Array.isArray(node.tideHeights.tideHeight)) tideHeightNodes = node.tideHeights.tideHeight;
         else if (node.TideHeights && Array.isArray(node.TideHeights.TideHeight)) tideHeightNodes = node.TideHeights.TideHeight;
         else if (Array.isArray(node.tideHeight)) tideHeightNodes = node.tideHeight;
         else if (Array.isArray(node.TideHeight)) tideHeightNodes = node.TideHeight;
         
         const localHeightNode = tideHeightNodes.find(n => {
            const text = String(n.description || n.Description || n.measure || n.Measure || "").toLowerCase();
            return text.includes("當地") || text.includes("local");
         });
         if (localHeightNode) {
             height = localHeightNode.value || localHeightNode.Value || localHeightNode.dataValue;
         } else if (tideHeightNodes.length > 0) {
             height = tideHeightNodes[0].value || tideHeightNodes[0].Value || tideHeightNodes[0].dataValue;
         }
      }

      if (dt && type) {
        const match = dt.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
        if (match) {
          const dateStr = match[1].replace(/-/g, "/");
          const timeStr = match[2];
          if (dateStr >= todayStr) {
            allDates.add(dateStr);
            if (!days[dateStr]) days[dateStr] = { "滿潮": [], "乾潮": [] };
            
            let displayStr = timeStr;
            if (height != null) {
               const num = Number(height);
               if (Number.isFinite(num)) {
                  const sign = num > 0 ? "+" : "";
                  displayStr = `${timeStr}<br><span style="font-size: 0.85em; color: var(--muted);">( ${sign}${num} )</span>`;
               }
            }
            
            days[dateStr][type].push(displayStr);
          }
        }
      } else {
         Object.values(node).forEach(v => {
           if (Array.isArray(v)) v.forEach(walk);
           else if (typeof v === "object") walk(v);
         });
      }
    };
    walk(loc);
    results.push({ name: matchedTarget, locName, days });
  });

  const sortedDates = Array.from(allDates).sort().slice(0, 3);
  results.sort((a, b) => targets.indexOf(a.name) - targets.indexOf(b.name));

  return { dates: sortedDates, locations: results };
}

function renderMarineData(parsed) {
  if (!dom.marineTableBody) return;
  const { dates, locations } = parsed;
  
  if (dom.marineDate1) dom.marineDate1.textContent = dates[0] || "第一天";
  if (dom.marineDate2) dom.marineDate2.textContent = dates[1] || "第二天";
  if (dom.marineDate3) dom.marineDate3.textContent = dates[2] || "第三天";

  if (!locations.length) {
    dom.marineTableBody.innerHTML = '<tr><td colspan="5" style="padding: 20px;">找不到彰化沿海潮汐資料（F-A0021-001）</td></tr>';
    return;
  }

  dom.marineTableBody.innerHTML = locations.map((loc, index) => {
    const getTides = (type, d) => (d && loc.days[d]?.[type]?.length) ? loc.days[d][type].join("<br><br>") : "--";
    const bgStyle = index % 2 === 0 ? "background: transparent;" : "background: rgba(247, 249, 255, 0.6);";
    return `<tr style="${bgStyle}"><td rowspan="2" style="vertical-align: middle; font-weight: bold; border-bottom: 1px solid var(--border); border-right: 1px solid var(--border);">${sanitizeText(loc.name)}</td><td style="color: #ef4444; font-weight: 700;">滿潮</td><td>${getTides("滿潮", dates[0])}</td><td>${getTides("滿潮", dates[1])}</td><td>${getTides("滿潮", dates[2])}</td></tr>
            <tr style="${bgStyle}"><td style="color: #3b82f6; font-weight: 700; border-bottom: 1px solid var(--border);">乾潮</td><td style="border-bottom: 1px solid var(--border);">${getTides("乾潮", dates[0])}</td><td style="border-bottom: 1px solid var(--border);">${getTides("乾潮", dates[1])}</td><td style="border-bottom: 1px solid var(--border);">${getTides("乾潮", dates[2])}</td></tr>`;
  }).join("");
}

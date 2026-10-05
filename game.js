'use strict';
// IRON DUEL: TANK COMMANDERS - lokálna 2-hráčová tanková strieľačka (HTML5 canvas)

// ilustrované panoramatické pozadie prihlásenia/domovskej obrazovky/nastavenia zápasu (vložené do každého .menuBg pri štarte)
const MENU_BG_SVG = '<svg viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
  '<defs>' +
  '<linearGradient id="mg-sky" x1="0" y1="0" x2="1" y2="0">' +
  '<stop offset="0" stop-color="#0a1030"/><stop offset=".14" stop-color="#1b2a55"/>' +
  '<stop offset=".32" stop-color="#5a4a7a"/><stop offset=".45" stop-color="#e8935a"/>' +
  '<stop offset=".58" stop-color="#ffd9a0"/><stop offset=".74" stop-color="#8fd0f2"/>' +
  '<stop offset="1" stop-color="#3ea8ff"/>' +
  '</linearGradient>' +
  '<radialGradient id="mg-sun" cx=".5" cy=".5" r=".5">' +
  '<stop offset="0" stop-color="#fff6d8"/><stop offset=".5" stop-color="#ffd9a0" stop-opacity=".8"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>' +
  '</radialGradient>' +
  '<radialGradient id="mg-lava" cx=".5" cy=".5" r=".5">' +
  '<stop offset="0" stop-color="#fff3b0"/><stop offset=".4" stop-color="#ff7a1f"/><stop offset="1" stop-color="#ff7a1f" stop-opacity="0"/>' +
  '</radialGradient>' +
  '</defs>' +
  '<rect x="0" y="0" width="1600" height="520" fill="url(#mg-sky)"/>' +
  '<g opacity=".8">' +
  '<circle cx="120" cy="70" r="1.4" fill="#fff"/><circle cx="200" cy="110" r="1" fill="#fff"/><circle cx="60" cy="140" r="1.2" fill="#fff"/>' +
  '<circle cx="260" cy="60" r="1" fill="#fff"/><circle cx="160" cy="40" r="1.3" fill="#fff"/><circle cx="300" cy="130" r="1" fill="#fff"/>' +
  '</g>' +
  '<g opacity=".35" fill="none" stroke-width="14" stroke-linecap="round">' +
  '<path d="M20,150 C110,90 190,170 300,100" stroke="#7cffb0"/>' +
  '<path d="M10,190 C120,130 210,200 320,140" stroke="#4ad8ff"/>' +
  '</g>' +
  '<circle cx="560" cy="150" r="50" fill="url(#mg-sun)"/><circle cx="560" cy="150" r="24" fill="#fff6d8"/>' +
  '<polygon points="0,300 90,190 170,250 260,160 340,240 420,180 500,290 0,290" fill="#3a4468" opacity=".55"/>' +
  '<polygon points="0,300 40,320 90,260 150,230 170,250 210,210 260,160 300,210 340,240 400,200 420,180 470,260 500,290 0,290" fill="#2a3050" opacity=".8"/>' +
  '<polygon points="60,250 90,190 120,250" fill="#eef2fb"/><polygon points="230,215 260,160 290,215" fill="#eef2fb"/>' +
  '<path d="M300,340 Q380,300 460,335 Q540,310 620,338 Q700,315 760,340 L760,420 L300,420 Z" fill="#d9b26a"/>' +
  '<path d="M320,360 Q400,335 480,358 Q560,340 640,360 L640,420 L320,420 Z" fill="#c9964a" opacity=".8"/>' +
  '<polygon points="800,420 880,150 960,420" fill="#5a3a2e"/>' +
  '<polygon points="835,420 880,230 925,420" fill="#3a241c"/>' +
  '<path d="M880,150 L862,260 L892,300 L874,360 L900,420" fill="none" stroke="url(#mg-lava)" stroke-width="10"/>' +
  '<circle cx="880" cy="150" r="34" fill="url(#mg-lava)"/>' +
  '<g fill="#26331f">' +
  '<polygon points="1000,420 1030,330 1060,420"/><polygon points="1040,420 1075,300 1110,420"/>' +
  '<polygon points="1090,420 1120,340 1150,420"/><polygon points="1140,420 1175,310 1210,420"/>' +
  '<polygon points="1190,420 1220,335 1250,420"/><polygon points="1240,420 1270,320 1300,420"/>' +
  '</g>' +
  '<g fill="#324222">' +
  '<polygon points="1015,420 1045,350 1075,420"/><polygon points="1065,420 1100,330 1135,420"/>' +
  '<polygon points="1115,420 1150,355 1185,420"/><polygon points="1165,420 1200,340 1235,420"/>' +
  '</g>' +
  '<rect x="1300" y="330" width="300" height="70" fill="#4a9ec9" opacity=".8"/>' +
  '<rect x="1300" y="380" width="300" height="140" fill="#e8d3a0"/>' +
  '<circle cx="1560" cy="350" r="26" fill="#fff6d8" opacity=".8"/>' +
  '<g stroke="#5a3a20" stroke-width="5" fill="none"><path d="M1400,420 L1400,360"/><path d="M1500,420 L1500,355"/></g>' +
  '<g fill="#2f7a3f"><ellipse cx="1400" cy="352" rx="34" ry="12"/><ellipse cx="1420" cy="345" rx="30" ry="10"/><ellipse cx="1380" cy="345" rx="26" ry="9"/>' +
  '<ellipse cx="1500" cy="347" rx="32" ry="11"/><ellipse cx="1520" cy="340" rx="26" ry="9"/></g>' +
  '<polygon points="0,420 200,380 400,410 620,385 820,415 1040,390 1260,410 1440,395 1600,415 1600,520 0,520" fill="#141c14" opacity=".9"/>' +
  '<g opacity=".9">' +
  '<g transform="translate(90,392) scale(.6)"><rect x="-16" y="-6" width="32" height="14" rx="3" fill="#b8433a"/><rect x="-6" y="-16" width="14" height="12" rx="2" fill="#b8433a"/><rect x="6" y="-13" width="16" height="4" fill="#b8433a"/></g>' +
  '<g transform="translate(1230,382) scale(.6)"><rect x="-16" y="-6" width="32" height="14" rx="3" fill="#3e8bff"/><rect x="-6" y="-16" width="14" height="12" rx="2" fill="#3e8bff"/><rect x="6" y="-13" width="16" height="4" fill="#3e8bff"/></g>' +
  '</g>' +
  '</svg>';

const W = 1280, H = 720;
let WORLD_W = W;   // šírka HERNÉHO SVETA (terén, kamera, dekorácie) - zvyčajne = W, no pri "Veľkej mape" je väčšia; W samotné ostáva vždy pevné rozlíšenie plátna/HUD
const GRAVITY = 400;
const POWER_MIN = 15, POWER_SPEED = 45;   // sila výstrelu v % (a jej zmena za sekundu)
const POWER_MUL_MIN = 0.4, POWER_MUL_MAX = 1.65;   // pri 100 % sile letí strela citeľne silnejšie/ďalej než len "základná" rýchlosť zbrane
function powerMul(power) { return POWER_MUL_MIN + (POWER_MUL_MAX - POWER_MUL_MIN) * (clamp(power, POWER_MIN, 100) - POWER_MIN) / (100 - POWER_MIN); }
let WIN_ROUNDS = 5;
const SHOP_TIME = 90;
const SHIELD_CAP = 5;
const START_MONEY = 500;
const TANK_SPEED = 70;
const AIM_SPEED = 70;      // stupňov / s
const BASE_HP = 100;
const MONEY_PER_DMG = 3;
const WIN_BONUS = 300, LOSE_BONUS = 150;   // základ, rastie s číslom kola
const ROUND_SCALE = 50;                     // +€50 víťazovi za každé ďalšie kolo
const DIRECT_BONUS = 25, KILL_BONUS = 100, BUILD_BONUS = 20, STREAK_BONUS = 50, TREE_BONUS = 8;
const MAX_LEVEL = 20;
const HP_PER_LEVEL = 5, HP_PER_ARMOR = 15;
const FUEL_START = 100, FUEL_CAP = 150, FUEL_PER_PX = 0.12, FUEL_ROUND_REFILL = 60, FUEL_BUY = 50, FUEL_BUY_COST = 60;

// 10 úrovní štítov (od 1 = základný po 10 = SUPER) – farba podľa sily
const TIER_COLORS = ['#9aa5b1', '#5fd35f', '#2fd0c8', '#4aa8ff', '#7a6bff', '#c15bff', '#ff5fb0', '#ff9a3c', '#ffd54a', '#ffffff'];
const SHIELD_NAMES = ['Základný', 'Zosilnený', 'Kompozitný', 'Reaktívny', 'Energetický', 'Plazmový', 'Kvantový', 'Fázový', 'Titánový', 'SUPER ŠTÍT'];
const SHIELD_UNLOCK = [3, 4, 5, 6, 8, 10, 12, 14, 17, 20];   // potrebný level veliteľa (žiadny štít pred LV3, SUPER ŠTÍT až na maxLV)
const WLV_UNLOCK = [2, 5, 8, 12, 16];   // potrebný level veliteľa na každú ďalšiu úroveň sily zbrane
const SHIELDS = SHIELD_NAMES.map((name, i) => ({
  lvl: i + 1, name, cap: 20 + 15 * i, cost: Math.round(60 * Math.pow(i + 1, 1.5) / 10) * 10, unlock: SHIELD_UNLOCK[i], color: TIER_COLORS[i],
}));
const tierCss = k => k >= 10 ? 'hsl(' + ((performance.now() * 0.14) % 360) + ',100%,68%)' : TIER_COLORS[k - 1];
const xpToNext = lvl => 120 + 60 * (lvl - 1);
const levelBonus = lvl => 100 + 50 * lvl;   // € za dosiahnutie levelu
const REPORT_LABELS = {
  hits: 'Zásahy', direct: 'Priame zásahy', build: 'Zničené budovy', kill: 'Zničenie tanku',
  win: 'Víťazstvo kola', hp: 'Zvyšné životy', streak: 'Séria víťazstiev', lose: 'Útecha', level: 'Bonus za level', quest: 'Vedľajšia misia',
};
// ---------- vedľajšie misie kola (mini úlohy naviac – bonus € a XP) ----------
const QUESTS = [
  { id: 'direct', desc: 'Zasiahni súpera priamym zásahom', xp: 40, money: 80, done: t => (t.rep.direct || 0) > 0 },
  { id: 'build', desc: 'Znič budovu alebo prekážku', xp: 35, money: 70, done: t => (t.rep.build || 0) > 0 },
  { id: 'kill', desc: 'Znič nepriateľský tank', xp: 60, money: 120, done: t => (t.rep.kill || 0) > 0 },
  { id: 'unscathed', desc: 'Preži kolo bez toho, aby si dostal zásah', xp: 45, money: 90, done: t => !t.tookDmg },
  { id: 'fuel', desc: 'Skonči kolo aspoň s polovicou paliva', xp: 25, money: 50, done: t => t.fuel >= fuelCap(t) * 0.5 },
];
const pickQuest = () => QUESTS[Math.floor(Math.random() * QUESTS.length)];

const AMMO = {
  ap:        { name: 'Standard AP',      icon: 'AP', speed: 640, dmg: 30, splash: 26,  crater: 16,  cd: 0.7, color: '#ffd54a' },
  missile:   { name: 'Rakéta',           icon: 'RK', speed: 700, dmg: 42, splash: 44,  crater: 28,  color: '#ff9a4a' },
  he:        { name: 'Trhavá HE',        icon: 'HE', speed: 620, dmg: 50, splash: 75,  crater: 50,  color: '#ff7043' },
  bounce:    { name: 'Odrazová',         icon: 'BN', speed: 600, dmg: 30, splash: 42,  crater: 24,  color: '#66e0ff', bounces: 3 },
  ricochet:  { name: 'Rikošet',          icon: 'RC', speed: 660, dmg: 26, splash: 24,  crater: 14,  color: '#c9ff4a', bounces: 5 },
  dirt:      { name: 'Zemná bomba',      icon: 'ZB', speed: 600, dmg: 0,  splash: 0,   crater: 0,   color: '#b58a5a', dirt: 70 },
  tele:      { name: 'Teleport',         icon: 'TP', speed: 640, dmg: 0,  splash: 0,   crater: 0,   color: '#c9a7ff', tele: true },
  repair:    { name: 'Servisná súprava', icon: '✚',  speed: 0,   dmg: 0,  splash: 0,   crater: 0,   color: '#6bffb0', heal: 60, cap: 5 },
  repairBig: { name: 'Mega oprava',      icon: '✚2', speed: 0,   dmg: 0,  splash: 0,   crater: 0,   color: '#7affc9', heal: 100, cap: 3 },
  laser:     { name: 'Laser',            icon: 'LS', speed: 0,   dmg: 22, splash: 0,   crater: 8,   color: '#ff4dff' },
  emp:       { name: 'EMP',              icon: 'EM', speed: 640, dmg: 8,  splash: 34,  crater: 10,  color: '#8cff7a', stun: true },
  empBig:    { name: 'EMP delo',         icon: 'E2', speed: 620, dmg: 14, splash: 55,  crater: 16,  color: '#4dffb0', stun: true, cap: 4 },
  pine:      { name: 'Ananás',           icon: 'AN', speed: 600, dmg: 16, splash: 30,  crater: 12,  color: '#ffb300', cluster: 9 },
  chain:     { name: 'Reťazovka',        icon: 'CH', speed: 600, dmg: 10, splash: 22,  crater: 10,  color: '#ffa54a', cluster: 14, cap: 6 },
  shower:    { name: 'Sprcha',           icon: 'SP', speed: 620, dmg: 0,  splash: 0,   crater: 0,   color: '#7ad7ff', apexSplit: 5 },
  meteor:    { name: 'Meteorický roj',   icon: 'MT', speed: 640, dmg: 0,  splash: 0,   crater: 0,   color: '#9adfff', apexSplit: 8, cap: 3 },
  volcano:   { name: 'Sopečná bomba',    icon: 'VB', speed: 600, dmg: 20, splash: 50,  crater: 38,  color: '#ff5a1f', volcano: 11, cap: 5 },
  firestorm: { name: 'Ohnivá búrka',     icon: 'FB', speed: 590, dmg: 24, splash: 55,  crater: 42,  color: '#ff6a1f', volcano: 18, cap: 3 },
  seismic:   { name: 'Zemetrasná nálož', icon: 'SZ', speed: 560, dmg: 34, splash: 60,  crater: 95,  color: '#8a6a3a', cap: 6 },
  airstrike: { name: 'Letecký útok',     icon: 'LU', speed: 640, dmg: 0,  splash: 0,   crater: 0,   color: '#ff4d4d', strike: 6, cap: 3 },
  carpet:    { name: 'Koberec bômb',     icon: 'KB', speed: 640, dmg: 0,  splash: 0,   crater: 0,   color: '#ff3d3d', strike: 10, cap: 2 },
  nukeS:     { name: 'Malá atómovka',    icon: '☢1', speed: 560, dmg: 90, splash: 130, crater: 95,  color: '#fff27a', flash: 0.75, cap: 3 },
  nukeL:     { name: 'Veľká atómovka',   icon: '☢2', speed: 540, dmg: 150, splash: 210, crater: 150, color: '#ffffff', flash: 1, cap: 2 },
  // generálske dary z kampane (exkluzívne - nedajú sa kúpiť v obchode, dostaneš ich len za dokončenie planéty od jej generála)
  liberCannon: { name: 'Oslobodzovacie delo', icon: 'LD', speed: 640, dmg: 0,  splash: 0,  crater: 0,  color: '#ffd54a', strike: 8,  cap: 2 },
  gravBlast:   { name: 'Azimutov gravitačný náboj', icon: 'AG', speed: 600, dmg: 20, splash: 65, crater: 22, color: '#8cff7a', stun: true, cap: 3 },
  alienSwarm:  { name: 'Novin alienský roj', icon: 'NR', speed: 600, dmg: 14, splash: 26, crater: 12, color: '#c9ff4a', cluster: 20, cap: 2 },
  alterStorm:  { name: 'Alterova plazmová búrka', icon: 'AB', speed: 580, dmg: 28, splash: 65, crater: 55, color: '#c15bff', volcano: 22, cap: 2 },
  // podmunícia (nedá sa kúpiť)
  bomblet:   { name: 'Bombička', icon: '', speed: 1, dmg: 10, splash: 30, crater: 12, color: '#ffcc55' },
  shard:     { name: 'Črep',     icon: '', speed: 1, dmg: 22, splash: 36, crater: 16, color: '#7ad7ff' },
  lava:      { name: 'Láva',     icon: '', speed: 1, dmg: 12, splash: 28, crater: 10, color: '#ff6a2a' },
  bomb:      { name: 'Bomba',    icon: '', speed: 1, dmg: 34, splash: 48, crater: 24, color: '#ff9d4a' },
};
const ORDER = ['ap', 'missile', 'he', 'bounce', 'ricochet', 'dirt', 'tele', 'repair', 'repairBig', 'laser', 'emp', 'empBig', 'pine', 'chain', 'shower', 'meteor', 'volcano', 'firestorm', 'airstrike', 'carpet', 'seismic', 'nukeS', 'nukeL', 'liberCannon', 'gravBlast', 'alienSwarm', 'alterStorm'];
const capOf = id => AMMO[id].cap || 9;

// ---------- úrovne zbraní (vylepšenie poškodenia za peniaze, kupuje sa v obchode) ----------
const WLV_IDS = ['ap', 'missile', 'he', 'bounce', 'ricochet', 'emp', 'empBig', 'pine', 'chain', 'volcano', 'seismic', 'nukeS', 'nukeL', 'laser'];
const WLV_MAX = 5, WLV_DMG_STEP = 0.18;
const wlvCost = lvl => Math.round((350 + 300 * lvl) / 10) * 10;
const wlvOf = (t, id) => (t && t.wlv && t.wlv[id]) || 0;
const dmgMul = (t, id) => 1 + WLV_DMG_STEP * wlvOf(t, id);

// ---------- obtiažnosť (mení silu a nárazovosť vetra) ----------
const DIFFICULTY = {
  easy:   { name: 'Ľahká',    windMul: 0.4,  gustMul: 0.5 },
  normal: { name: 'Normálna', windMul: 0.8,  gustMul: 0.8 },
  hard:   { name: 'Ťažká',    windMul: 1.25, gustMul: 1.1 },
};
const diffOf = () => DIFFICULTY[setup.difficulty] || DIFFICULTY.normal;

// Biómy: každý mení vietor (sila, nárazovosť), odpor vzduchu, gravitáciu, krátery, jazdu a trajektóriu striel
const BIOMES = {
  meadow: { name: 'Lúka', icon: '🌿', windMul: 1, gust: 0.15, drag: 0.03, grav: 1, crater: 1, move: 1, fuel: 1, ice: false, bounce: 0.8, altWind: 0, obst: 0.75,
    sky: ['#0f1b3a', '#3b5d8f', '#d99a6c'], hills: ['#1c2a44', '#243654', '#2e4265'], ground: ['#5f8a35', '#6b5535', '#2f2219'], edge: '#8fc04a', gtop: 330, gmid: 0.12, sun: '#ffe9a8', weather: 'pollen',
    desc: 'Mierne kopce a slabý vietor. Základné podmienky bez prekvapení.' },
  desert: { name: 'Púšť', icon: '🏜', windMul: 1.3, gust: 0.85, drag: 0, grav: 1, crater: 1.35, move: 0.8, fuel: 1.3, ice: false, bounce: 0.7, altWind: 0, obst: 0.5,
    sky: ['#3a2a5a', '#e39a5b', '#f6d28a'], hills: ['#8a5a3a', '#a56d42', '#c08350'], ground: ['#e2b866', '#c9964a', '#7a5628'], edge: '#f2d48a', gtop: 330, gmid: 0.12, sun: '#fff2c0', weather: 'dust',
    desc: 'Duny a plošiny. Silný nárazový vietor: počas letu sa mení a môže zmeniť aj smer. Mäkký piesok = väčšie krátery. Jazda je o 20 % pomalšia a stojí o 30 % viac paliva.' },
  winter: { name: 'Zima', icon: '❄', windMul: 1, gust: 0.6, drag: 0.12, grav: 1, crater: 0.7, move: 1.05, fuel: 1, ice: true, bounce: 0.95, altWind: 0, obst: 0.6,
    sky: ['#1d2b4a', '#6f8fb5', '#dbe8f2'], hills: ['#5c7194', '#7b91b2', '#9fb3cc'], ground: ['#f4f8fc', '#c7d6e6', '#5d7189'], edge: '#ffffff', gtop: 330, gmid: 0.12, sun: '#f0f6ff', weather: 'snow',
    desc: 'Hustý studený vzduch brzdí strely (kratší dolet) a víchrica nárazuje. Zamrznutá zem: menšie krátery, odrazové strely sa odrážajú takmer bez straty a tanky sa šmýkajú (aj zo svahov).' },
  forest: { name: 'Les', icon: '🌲', windMul: 0.35, gust: 0.1, drag: 0.06, grav: 1, crater: 0.9, move: 0.9, fuel: 1, ice: false, bounce: 0.75, altWind: 0, obst: 0.5, trees: true,
    sky: ['#0d2a2a', '#2f6b55', '#a9c98a'], hills: ['#123a2c', '#1b4c38', '#25623f'], ground: ['#3f7a34', '#4f3c25', '#22180f'], edge: '#6fbf4a', gtop: 330, gmid: 0.12, sun: '#f2ffd0', weather: 'leaf',
    desc: 'Stromy tlmia vietor (len 35 %), vlhký vzduch však strely mierne brzdí. Strela, ktorá preletí korunou stromu, sa spomalí (−22 %) a strom zničí. Mäkká pôda, pomalšia jazda.' },
  mountains: { name: 'Hory', icon: '⛰', windMul: 1.05, gust: 0.3, drag: 0, grav: 0.92, crater: 1, move: 0.95, fuel: 1.15, ice: false, bounce: 0.8, altWind: 0.6, obst: 0.35,
    sky: ['#0a1230', '#455b8a', '#c9a99a'], hills: ['#2b3552', '#3a4668', '#4c5a80'], ground: ['#f0f3f7', '#7d8595', '#2e2f38'], edge: '#dfe6ef', gtop: 250, gmid: 0.25, sun: '#f5e6d0', weather: 'mist',
    desc: 'Vysoký reliéf: strmé štíty a hlboké údolia (strelám treba oblúk). Riedky vzduch: gravitácia −8 % (strely letia ďalej), no vo výške fúka až o 90 % silnejší vietor. Jazda stojí o 15 % viac paliva.' },
  canyon: { name: 'Kaňon', icon: '🪨', windMul: 1.1, gust: 0.15, drag: 0, grav: 1, crater: 1.1, move: 0.85, fuel: 1.1, ice: false, bounce: 0.85, altWind: 0.25, obst: 0.55,
    sky: ['#241a3a', '#6a4a6f', '#d98a5b'], hills: ['#3a2b3f', '#4c3a52', '#5f4866'], ground: ['#9c6b45', '#7a4f31', '#3a2418'], edge: '#c98a52', gtop: 300, gmid: 0.15, sun: '#ffcf9a', weather: 'dust',
    desc: 'Úzke skalnaté rokliny plné balvanov. Vietor je usmernený tunelom – silný a takmer stály (málo nárazový), no vo výške ešte zosilnie. Veľa prekážok, treba mieriť cez ne.' },
  swamp: { name: 'Bažina', icon: '🐊', windMul: 0.75, gust: 0.3, drag: 0.18, grav: 1, crater: 1.5, move: 0.7, fuel: 1.4, ice: false, bounce: 0.55, altWind: 0, obst: 0.4,
    sky: ['#111f1a', '#2e4a3a', '#8fae7a'], hills: ['#16261f', '#1e3428', '#274232'], ground: ['#4a5330', '#3a3a20', '#1c1a10'], edge: '#5a6b3a', gtop: 340, gmid: 0.14, sun: '#d8f0b0', weather: 'mist',
    desc: 'Mäkká bahnitá pôda – obrovské krátery, ale hustá para strely brzdí (kratší dolet). Slabší, no premenlivý vietor. Jazda je pomalá a žerie o 40 % viac paliva.' },
  volcano: { name: 'Sopka', icon: '🌋', windMul: 0.95, gust: 0.45, drag: 0.05, grav: 1, crater: 1.25, move: 0.85, fuel: 1.15, ice: false, bounce: 0.7, altWind: 0.2, obst: 0.55,
    sky: ['#2a0f0f', '#5a2318', '#c9601f'], hills: ['#241414', '#33201c', '#402a22'], ground: ['#3a2620', '#241614', '#100a08'], edge: '#7a3010', gtop: 330, gmid: 0.12, sun: '#ffb066', weather: 'dust',
    desc: 'Stuhnutá láva a popolčeková pôda. Vietor je stredne silný, krátery väčšie (mäkký popol). Jazda po sutine je pomalšia.' },
  beach: { name: 'Pláž', icon: '🏖', windMul: 1.1, gust: 0.4, drag: 0.02, grav: 1, crater: 0.9, move: 1, fuel: 0.95, ice: false, bounce: 0.85, altWind: 0, obst: 0.35,
    sky: ['#0d2a4a', '#3f8fc9', '#bdeaf2'], hills: ['#0e3a55', '#155073', '#1d6690'], ground: ['#f2e0ad', '#dcc27f', '#8a6a3a'], edge: '#fff3cc', gtop: 340, gmid: 0.12, sun: '#fff6d0', weather: 'pollen',
    desc: 'Otvorená rovná pláž pri mori. Stály morský vánok, takmer bez nárazov – ideálne miesto na precvičenie mierenia.' },
  ruins: { name: 'Ruiny', icon: '🏚', windMul: 0.9, gust: 0.4, drag: 0.1, grav: 1, crater: 1.15, move: 0.75, fuel: 1.25, ice: false, bounce: 0.6, altWind: 0.1, obst: 0.7,
    sky: ['#241f28', '#5a4a45', '#c99a68'], hills: ['#332c30', '#453a3c', '#584a48'], ground: ['#6b6560', '#4f4a44', '#2a2620'], edge: '#948a7e', gtop: 330, gmid: 0.12, sun: '#e8b878', weather: 'dust',
    desc: 'Zbúrané mesto plné sutín a barikád. Prach v ovzduší mierne brzdí strely a vietor je premenlivý. Veľa prekážok komplikuje priamu paľbu, no ponúka aj kryt. Jazda po troskách je pomalšia.' },
  // mimozemské biómy kampane (mimo náhodného výberu rýchleho zápasu – pozri BIOME_KEYS nižšie)
  moon: { name: 'Mesiac', icon: '🌑', windMul: 0, gust: 0, drag: 0, grav: 0.42, crater: 1.6, move: 1.2, fuel: 0.85, ice: false, bounce: 0.55, altWind: 0, obst: 0.45,
    sky: ['#000000', '#0a0a16', '#1c1c28'], hills: ['#2a2a30', '#3a3a42', '#4a4a52'], ground: ['#9a9a9e', '#6e6e74', '#38383c'], edge: '#c8c8cc', gtop: 330, gmid: 0.1, sun: '#fff8e0', weather: 'none',
    desc: 'Nulová atmosféra: žiadny vietor, len tvoja presnosť. Nízka gravitácia poriadne predĺži dolet striel a sypký regolit znamená obrovské krátery.' },
  mars: { name: 'Mars', icon: '🔴', windMul: 1.5, gust: 0.9, drag: 0, grav: 0.62, crater: 1.15, move: 0.9, fuel: 1.1, ice: false, bounce: 0.75, altWind: 0, obst: 0.5,
    sky: ['#2a1008', '#8a4a28', '#e0a868'], hills: ['#4a2416', '#5e3020', '#72402a'], ground: ['#c1613a', '#9c4a2c', '#5c2a18'], edge: '#ff8a5a', gtop: 330, gmid: 0.12, sun: '#ffb878', weather: 'dust',
    desc: 'Riedka atmosféra: slabšia gravitácia predĺži dolet striel, no časté piesočné búrky ich počas letu nepredvídateľne zahýbajú.' },
  venus: { name: 'Venuša', icon: '🟠', windMul: 1.7, gust: 0.95, drag: 0.1, grav: 1.1, crater: 0.9, move: 0.65, fuel: 1.5, ice: false, bounce: 0.6, altWind: 0.1, obst: 0.5,
    sky: ['#2a1806', '#8a5a1a', '#e8b84a'], hills: ['#4a2e0e', '#5e3a14', '#72481c'], ground: ['#8a5a1e', '#6a4214', '#3a260c'], edge: '#f0c050', gtop: 330, gmid: 0.12, sun: '#ffd878', weather: 'dust',
    desc: 'Hustá toxická atmosféra: najsilnejší a najstálejší vietor spomedzi všetkých planét, vysoký tlak skracuje dolet a extrémna horúčava spomaľuje jazdu aj spotrebúva o 50 % viac paliva.' },
};
const BIOME_KEYS = Object.keys(BIOMES).filter(k => k !== 'moon' && k !== 'mars' && k !== 'venus');   // mimozemské biómy sú len pre kampaň, nie pre náhodný výber v rýchlom zápase
const missionWorld = m => m.terrain === 'moon' ? 'moon' : m.terrain === 'mars' ? 'mars' : m.terrain === 'venus' ? 'venus' : 'earth';
const WORLD_META = { earth: { name: 'Zem', icon: '🌍' }, moon: { name: 'Mesiac', icon: '🌑' }, mars: { name: 'Mars', icon: '🔴' }, venus: { name: 'Venuša', icon: '🟠' } };
let biomeKey = 'meadow';
const biome = () => BIOMES[biomeKey];

const SHOP_ITEMS = [
  { id: 'missile',   label: 'Rakéta ×3',            desc: 'Silnejšia a rýchlejšia strela',                cost: 280,  qty: 3, kind: 'ammo' },
  { id: 'he',        label: 'HE ×3',                desc: 'Trhavá – plošné poškodenie, krátery',          cost: 150,  qty: 3, kind: 'ammo' },
  { id: 'bounce',    label: 'Odrazová ×3',          desc: 'Odráža sa od terénu a ocele',                  cost: 180,  qty: 3, kind: 'ammo' },
  { id: 'ricochet',  label: 'Rikošet ×3',           desc: 'Odrazí sa až 5×, ideálna do úzkych roklín',    cost: 320,  qty: 3, kind: 'ammo', unlock: 2 },
  { id: 'dirt',      label: 'Zemná bomba ×3',       desc: 'Vytvorí kopec – kryt, alebo pohreb súpera',    cost: 200,  qty: 3, kind: 'ammo' },
  { id: 'tele',      label: 'Teleport ×2',          desc: 'Strela, ktorá ťa presunie na miesto dopadu',   cost: 350,  qty: 2, kind: 'ammo' },
  { id: 'repair',    label: 'Servisná súprava ×2',  desc: '+60 životov (minie celý ťah)',                 cost: 400,  qty: 2, kind: 'ammo' },
  { id: 'repairBig', label: 'Mega oprava ×2',       desc: '+100 životov (minie celý ťah)',                cost: 700,  qty: 2, kind: 'ammo', unlock: 11 },
  { id: 'laser',     label: 'Laser ×2',             desc: 'Okamžitý lúč, ignoruje vietor',                cost: 250,  qty: 2, kind: 'ammo' },
  { id: 'emp',       label: 'EMP ×2',               desc: 'Súper v ďalšom ťahu nemôže jazdiť ani mieriť', cost: 200,  qty: 2, kind: 'ammo' },
  { id: 'empBig',    label: 'EMP delo ×2',          desc: 'Väčší dosah, aj poškodí aj ochromí súpera',    cost: 550,  qty: 2, kind: 'ammo', unlock: 7 },
  { id: 'pine',      label: 'Ananás ×2',            desc: 'Po dopade sa rozpadne na 9 malých bômb',       cost: 450,  qty: 2, kind: 'ammo', unlock: 3 },
  { id: 'chain',     label: 'Reťazovka ×2',         desc: 'Rozpadne sa na 14 bômb – zaplaví široké okolie', cost: 500,  qty: 2, kind: 'ammo', unlock: 4 },
  { id: 'shower',    label: 'Sprcha ×2',            desc: 'V najvyššom bode sa rozdelí na 5 striel',      cost: 600,  qty: 2, kind: 'ammo', unlock: 5 },
  { id: 'meteor',    label: 'Meteorický roj ×2',    desc: 'V najvyššom bode sa rozdelí na 8 striel',      cost: 1000, qty: 2, kind: 'ammo', unlock: 15 },
  { id: 'volcano',   label: 'Sopečná bomba ×2',     desc: 'Vyvrhne fontánu lávových bômb',                cost: 750,  qty: 2, kind: 'ammo', unlock: 6 },
  { id: 'firestorm', label: 'Ohnivá búrka ×2',      desc: 'Väčšia sopečná fontána, priame poškodenie navyše', cost: 950, qty: 2, kind: 'ammo', unlock: 13 },
  { id: 'seismic',   label: 'Zemetrasná nálož ×2',  desc: 'Obrovský kráter, prekreslí terén pod súperom',  cost: 700,  qty: 2, kind: 'ammo', unlock: 10 },
  { id: 'airstrike', label: 'Letecký útok ×1',      desc: 'Po dopade zavolá 6 bômb z neba',               cost: 1300, qty: 1, kind: 'ammo', unlock: 8 },
  { id: 'carpet',    label: 'Koberec bômb ×1',      desc: 'Po dopade zavolá 10 bômb z neba',              cost: 1600, qty: 1, kind: 'ammo', unlock: 17 },
  { id: 'nukeS',     label: 'Malá atómovka ×1',     desc: 'Obrovský výbuch, ničí terén aj budovy',        cost: 900,  qty: 1, kind: 'ammo', unlock: 9 },
  { id: 'nukeL',     label: 'Veľká atómovka ×1',    desc: 'Skoro celá mapa v plameňoch',                  cost: 2200, qty: 1, kind: 'ammo', unlock: 12 },
  { id: 'fuel',   label: 'Palivo +' + FUEL_BUY, desc: 'Doplní nádrž (jazda spotrebúva palivo)', cost: FUEL_BUY_COST, kind: 'fuel' },
  { id: 'tank',   label: 'Väčšia nádrž', desc: '+50 kapacity paliva (max 4)', kind: 'up', lvlKey: 'fuelLvl', max: 4, costFn: l => 200 + 150 * l },
  { id: 'speed',  label: 'Pásy a motor', desc: '+20 % rýchlosť, lepšie stúpanie (max 3)', kind: 'up', lvlKey: 'speedLvl', max: 3, costFn: l => 300 + 200 * l },
  { id: 'armor',  label: 'Brnenie',      desc: '+' + HP_PER_ARMOR + ' max. životov za úroveň (max 10)', kind: 'up', lvlKey: 'armorLvl', max: 10, costFn: l => 150 + 120 * l, colored: true },
];
const AMMO_CAP = 9;   // predvolený strop; jednotlivé zbrane majú vlastný (capOf)

const cv = document.getElementById('game');
const ctx = cv.getContext('2d');
// --- grafika: predrenderované vrstvy (obloha, terén, škvrny po výbuchoch), sprity tankov, adaptívna kvalita ---
const M = 40;                                    // rezerva okolo scény kvôli trasenie obrazovky (vodorovne)
let VM = M;                                       // zvislá rezerva vrstiev oblohy/terénu - pri oddialenej kamere (veľká mapa) treba vidieť viac aj nahor/nadol, nielen do strán
let gfx = 'auto', quality = 2, SCALE = Math.min(2, window.devicePixelRatio || 1), MAXP = 700;
let skyL = null, terL = null, scorchL = null, vigL = null, terDirty = true, skyDirty = true, specks = [], stars = [], skyIsDark = false;
let showFps = false, fpsEma = 16.7;
const sprites = {};
function mkLayer(w, h) {
  const c = document.createElement('canvas'); c.width = Math.ceil(w * SCALE); c.height = Math.ceil(h * SCALE);
  const x = c.getContext('2d'); x.setTransform(SCALE, 0, 0, SCALE, 0, 0); return { c, x };
}
function mkWorldLayers() {   // vrstvy a pole terénu podľa aktuálnej šírky SVETA (WORLD_W) - znova sa vytvoria pri zmene veľkosti mapy aj kvality
  const fitZoom = Math.min(1, W / WORLD_W);   // rovnaké priblíženie, aké si kamera natrvalo drží (vidno celú mapu)
  VM = Math.ceil(M + Math.max(0, (H / fitZoom - H) / 2));   // pri oddialení (veľká mapa) je vidno aj viac nahor/nadol, nielen do šírky
  ground = new Float32Array(WORLD_W + 1);
  skyL = mkLayer(WORLD_W + 2 * M, H + 2 * VM); terL = mkLayer(WORLD_W + 2 * M, H + 2 * VM); scorchL = mkLayer(WORLD_W + 2 * M, H + 2 * VM);
  skyDirty = terDirty = true;
}
function setupCanvas() {
  cv.width = Math.round(W * SCALE); cv.height = Math.round(H * SCALE);
  vigL = mkLayer(W, H);
  const g = vigL.x.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 0.95);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.42)'); vigL.x.fillStyle = g; vigL.x.fillRect(0, 0, W, H);
  mkWorldLayers();
  for (const k in sprites) delete sprites[k];
}
function setQuality(q) { quality = q; SCALE = q >= 2 ? Math.min(2, window.devicePixelRatio || 1) : 1; MAXP = [180, 380, 700][q]; setupCanvas(); }
function applyGfx() { gfx = setup.gfx; setQuality({ auto: 2, high: 2, mid: 1, low: 0 }[gfx] ?? 2); }
const hash1 = n => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };
function shade(hex, amt) {
  const v = parseInt(hex.slice(1), 16), f = c => Math.max(0, Math.min(255, Math.round(c + amt)));
  return 'rgb(' + f(v >> 16) + ',' + f((v >> 8) & 255) + ',' + f(v & 255) + ')';
}
const $ = id => document.getElementById(id);

// ---------- stav ----------
let state = 'menu';            // menu | shop | play | roundEnd | matchEnd
let tanks = [];
let ground = new Float32Array(WORLD_W + 1);
let obstacles = [];
let projectiles = [];
let particles = [];
let beams = [];
let hills = [];
let clouds = [];
let wind = 0, gustPhase = 0;
let trees = [], decor = [], weather = [], sun = { x: 900, y: 150 };
let emitters = [], strikes = [], rings = [], glows = [], flash = 0, treadMarks = [];
let ammoMenu = { id: -1, t: 0 };   // zoznam zbraní, ktorý sa ukáže po zmene munície   // sopka, letecký útok, rázová vlna, záblesk
let round = 1;
let shopTimer = 0, endTimer = 0, shopPlayer = 0;
let ready = [];
let paused = false;
const TURN_TIME = 30;
let turnIdx = 0, turnPhase = 'aim', turnTimer = 0, settle = 0;   // ťahový režim: aim = hráč mieri, resolve = strela letí
let shake = 0;
let time = 0;
let lastResult = '';
// ---------- kamera (statická, vždy vycentrovaná tak, aby bolo vidno celú mapu a všetkých hráčov) ----------
let cam = { x: W / 2, y: H / 2, zoom: 1 };
let lastImpact = null;

const held = [{}, {}, {}, {}];   // dotykové tlačidlá
const kb = [{}, {}, {}, {}];     // klávesnica

// ---------- nastavenie hráčov a uloženie hry ----------
const PALETTE = ['#3e8bff', '#e5484d', '#3fbf5f', '#f2c230', '#b06cff', '#ff8a3d', '#2fd0c8', '#ff5fb0', '#9aa5b1', '#8bd450'];
const KEYSETS = [
  { left: 'KeyA', right: 'KeyD', up: 'KeyW', down: 'KeyS', fire: 'KeyF', ammo: 'KeyG', pdown: 'KeyQ', pup: 'KeyE', hint: 'A D jazda · W S náklon · Q E sila · F streľba · G munícia' },
  { left: 'ArrowLeft', right: 'ArrowRight', up: 'ArrowUp', down: 'ArrowDown', fire: 'Enter', ammo: 'ShiftRight', pdown: 'Comma', pup: 'Period', hint: '← → jazda · ↑ ↓ náklon · , . sila · Enter streľba · pravý Shift munícia' },
  { left: 'KeyJ', right: 'KeyL', up: 'KeyI', down: 'KeyK', fire: 'KeyU', ammo: 'KeyO', pdown: 'KeyN', pup: 'KeyM', hint: 'J L jazda · I K náklon · N M sila · U streľba · O munícia' },
  { left: 'Numpad4', right: 'Numpad6', up: 'Numpad8', down: 'Numpad5', fire: 'Numpad0', ammo: 'NumpadDecimal', pdown: 'Numpad7', pup: 'Numpad9', hint: 'Numpad 4 6 jazda · 8 5 náklon · 7 9 sila · 0 streľba · . munícia' },
];
const SAVE_KEY = 'ironDuelSave_v1', SETUP_KEY = 'ironDuelSetup_v1';
const esc = str => String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lum = c => { const v = parseInt(c.slice(1), 16); return (0.299 * (v >> 16) + 0.587 * ((v >> 8) & 255) + 0.114 * (v & 255)) / 255; };
const isColor = c => typeof c === 'string' && /^#[0-9a-f]{6}$/i.test(c);
let setup = { n: 2, rounds: 5, terrain: 'random', difficulty: 'normal', gfx: 'auto', sound: true, mapSize: 'normal', players: PALETTE.slice(0, 4).map((c, i) => ({ name: 'Hráč ' + (i + 1), color: c, nick: null, bot: 0 })) };
try {
  const v = JSON.parse(localStorage.getItem(SETUP_KEY));
  if (v && (v.terrain === 'random' || BIOMES[v.terrain])) setup.terrain = v.terrain;
  if (v && DIFFICULTY[v.difficulty]) setup.difficulty = v.difficulty;
  if (v && ['normal', 'large'].includes(v.mapSize)) setup.mapSize = v.mapSize;
  if (v && ['auto', 'high', 'mid', 'low'].includes(v.gfx)) setup.gfx = v.gfx;
  if (v && typeof v.sound === 'boolean') setup.sound = v.sound;
  if (v && Array.isArray(v.players) && v.players.length === 4) {
    setup.n = clampInt(v.n, 2, 4, 2); setup.rounds = clampInt(v.rounds, 1, 15, 5);
    setup.players = v.players.map((p, i) => ({ name: String(p.name || 'Hráč ' + (i + 1)).slice(0, 14), color: isColor(p.color) ? p.color : PALETTE[i], nick: typeof p.nick === 'string' ? p.nick : null, bot: clampInt(p.bot, 0, 3, 0) }));
  }
} catch (_) {}
// ---------- profily podľa prezývky (bez účtu a hesla, uložené len v tomto prehliadači) ----------
const PROF_KEY = 'ironDuelProfiles_v1';
const NICK_RE = /^[\p{L}\p{N}][\p{L}\p{N} _.\-]{1,13}$/u;
let profiles = {};
try { const v = JSON.parse(localStorage.getItem(PROF_KEY)); if (v && typeof v === 'object' && !Array.isArray(v)) profiles = v; } catch (_) {}
const nickKey = str => 'n_' + str.trim().toLowerCase();      // predpona chráni pred kľúčmi ako __proto__
const newProfile = (nick, color) => ({ nick, color, created: Date.now(), matches: 0, wins: 0, rounds: 0, kills: 0, bestLevel: 1, level: 1, xp: 0, last: 0, storyLoadout: null, story: null, achievements: [], perks: {} });

// ---------- veliteľské vylepšenia (trvalý "skill tree" naprieč všetkými zápasmi, mimo bežného výzbroje v obchode) ----------
// Body sa NIKDE neukladajú samostatne - vždy sa dopočítajú z (najvyššia dosiahnutá hodnosť - 1) mínus už minuté, takže
// existujúcim hráčom s vysokou hodnosťou sa body objavia hneď pri prvom otvorení obrazovky, bez potreby akejkoľvek migrácie.
const PERKS = [
  { id: 'cash', icon: '💰', title: 'Štartovací kapitál', desc: '+100 peňazí na začiatku zápasu za úroveň', maxRank: 3 },
  { id: 'armor', icon: '🛡️', title: 'Veterán brnenia', desc: '+1 úroveň brnenia zadarmo na začiatku zápasu za úroveň', maxRank: 2 },
  { id: 'fuel', icon: '⛽', title: 'Palivové nádrže', desc: '+1 úroveň paliva zadarmo na začiatku zápasu za úroveň', maxRank: 2 },
  { id: 'xp', icon: '⭐', title: 'Skúsený veliteľ', desc: '+10 % XP zo zápasov za úroveň', maxRank: 3 },
  { id: 'income', icon: '💵', title: 'Vojnová ekonomika', desc: '+10 % peňazí za zásahy a výhry za úroveň', maxRank: 2 },
];
const perkRank = (p, id) => (p && p.perks && p.perks[id]) | 0;
const perkPointsSpent = p => !p || !p.perks ? 0 : Object.values(p.perks).reduce((s, v) => s + (v | 0), 0);
const perkPointsAvailable = p => !p ? 0 : Math.max(0, (p.bestLevel || 1) - 1 - perkPointsSpent(p));

// ---------- Supabase (účet cez Google) - profil/postup prihláseného hráča sa zrkadlí aj do cloudu, nielen do localStorage ----------
const SUPABASE_URL = 'https://axrplnzgqrltmabhljih.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cnBsbnpncXJsdG1hYmhsamloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNDkwNDcsImV4cCI6MjEwNjYyNTA0N30.-k5o7PDqziM09j0naC7jyIdzGf42Fc6jDL-5DORxsXI';
let sb = null;
try { if (window.supabase && window.supabase.createClient) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch (_) {}
let cloudUser = null;   // { id, nick } keď je hráč prihlásený cez Google; inak null = hosť/len lokálny profil v tomto prehliadači
let loginError = '';
function cloudProfileRowToLocal(row) {
  return {
    nick: row.nick, color: isColor(row.color) ? row.color : PALETTE[0], created: row.created_at ? Date.parse(row.created_at) : Date.now(),
    matches: row.matches || 0, wins: row.wins || 0, rounds: row.rounds || 0, kills: row.kills || 0,
    bestLevel: row.best_level || 1, level: row.level || 1, xp: row.xp || 0, last: row.last_played_at ? Date.parse(row.last_played_at) : 0,
    storyLoadout: row.story_loadout || null,
    story: { unlocked: clampInt(row.story_unlocked, 1, STORY_MISSIONS.length, 1), done: Array.isArray(row.story_done) ? row.story_done.map(Boolean) : [] },
    achievements: Array.isArray(row.achievements) ? row.achievements.slice() : [],
    perks: row.perks && typeof row.perks === 'object' && !Array.isArray(row.perks) ? Object.assign({}, row.perks) : {},
  };
}
async function cloudFetchProfile(userId) {
  try { const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single(); return error ? null : data; }
  catch (_) { return null; }
}
function cloudPush() {   // write-through: po uložení lokálneho profilu potichu zapíš aj do Supabase, keď je niekto prihlásený cez Google
  if (!cloudUser || !sb) return;
  const p = profiles[nickKey(cloudUser.nick)]; if (!p) return;
  const payload = {
    color: p.color, matches: p.matches, wins: p.wins, rounds: p.rounds, kills: p.kills,
    best_level: p.bestLevel, level: p.level, xp: p.xp,
    last_played_at: p.last ? new Date(p.last).toISOString() : null,
    story_loadout: p.storyLoadout, story_unlocked: p.story ? p.story.unlocked : 1, story_done: p.story ? p.story.done : [],
    achievements: Array.isArray(p.achievements) ? p.achievements : [],
    perks: p.perks && typeof p.perks === 'object' ? p.perks : {},
  };
  sb.from('profiles').update(payload).eq('id', cloudUser.id).then(({ error }) => {
    if (!error) return;
    console.warn('Supabase sync zlyhal:', error.message);
    if (/perks/i.test(error.message || '') || /column/i.test(error.message || '')) {
      // stĺpec "perks" ešte nie je v databáze (SQL skript sa ešte nespustil) - skús to znova bez neho, nech sa aspoň ostatné štatistiky nestratia
      const fallback = Object.assign({}, payload); delete fallback.perks;
      sb.from('profiles').update(fallback).eq('id', cloudUser.id).then(({ error: e2 }) => { if (e2) console.warn('Supabase sync (fallback) zlyhal:', e2.message); });
    }
  });
}
const hasRealProgress = p => !!p && (p.matches > 0 || (p.story && p.story.unlocked > 1) || p.storyLoadout);
const progressScore = p => !p ? -1 : (p.story ? p.story.unlocked : 1) * 1000000 + (p.matches || 0) * 1000 + (p.kills || 0);   // na porovnanie "koľko postupu" má profil - kto má viac, ten je lepší kandidát na import
function findMigratableLocalProfile(excludeKey) {   // nájde lokálny (hosťovský) profil v tomto prehliadači s najväčším postupom - na migráciu do čerstvého Google účtu
  let best = null;
  for (const k in profiles) {
    if (k === excludeKey || !Object.prototype.hasOwnProperty.call(profiles, k)) continue;
    const p = profiles[k];
    if (!hasRealProgress(p)) continue;
    if (!best || (p.story ? p.story.unlocked : 1) > (best.story ? best.story.unlocked : 1) || p.matches > best.matches) best = p;
  }
  return best;
}
async function enterCloudSession(user) {   // zavolá sa po úspešnom Google prihlásení (aj pri obnovení už prihlásenej relácie)
  const row = await cloudFetchProfile(user.id);
  if (!row) return false;   // DB riadok ešte nevznikol (trigger beží tesne po registrácii) - skús znova nabudúce
  const key = nickKey(row.nick);
  const prevNick = setup.players[0].nick;   // prezývka aktívna v tomto prehliadači TESNE pred Google prihlásením (napr. stará hosťovská) - na migráciu postupu
  const prevLocal = (prevNick && hasRealProgress(getProfile(prevNick))) ? getProfile(prevNick) : findMigratableLocalProfile(key);   // ak nebola aktívna žiadna (napr. si sa medzitým odhlásil), skús nájsť akýkoľvek lokálny profil s postupom
  const cloudIsFresh = !row.matches && !row.wins && clampInt(row.story_unlocked, 1, STORY_MISSIONS.length, 1) <= 1 && !row.story_loadout;
  if (cloudIsFresh && hasRealProgress(prevLocal)) {   // čerstvý/prázdny cloud profil, ale v tomto prehliadači existuje staršia rozohratá hosťovská prezývka - prenes JEJ postup
    profiles[key] = Object.assign({}, prevLocal, { nick: row.nick, color: isColor(row.color) ? row.color : prevLocal.color });   // prenes doterajší lokálny postup do nového Google účtu
    cloudUser = { id: user.id, nick: row.nick };
    cloudPush();
  } else {
    const prevP = profiles[key];   // denná/týždenná výzva sa do cloudu neukladá (nemá tam stĺpec) - zachovaj ju z lokálneho uloženia, inak by sa pri každom obnovení relácie vynulovala
    profiles[key] = cloudProfileRowToLocal(row);
    if (prevP && prevP.daily) profiles[key].daily = prevP.daily;
    if (prevP && prevP.weekly) profiles[key].weekly = prevP.weekly;
    cloudUser = { id: user.id, nick: row.nick };
  }
  setup.players[0].nick = row.nick; setup.players[0].name = row.nick;
  if (isColor(profiles[key].color)) setup.players[0].color = profiles[key].color;
  saveSetup();
  refreshStoryProgressSource();
  return true;
}

// ---------- výbava v kampani (munícia a vylepšenia, ktoré hráč neminul, prenesené do ďalšej misie) ----------
function storyLoadoutSnapshot(t) {
  return {
    money: t.money,
    ammo: Object.fromEntries(ORDER.filter(k => k !== 'ap').map(k => [k, t.ammo[k] === Infinity ? 0 : t.ammo[k]])),
    speedLvl: t.speedLvl, armorLvl: t.armorLvl, fuelLvl: t.fuelLvl,
    wlv: Object.assign({}, t.wlv), shields: t.shields.slice(),
  };
}
function applyStoryLoadout(t, lo) {
  if (!lo) return;
  t.money += lo.money || 0;
  if (lo.ammo) ORDER.forEach(k => { if (k !== 'ap' && typeof lo.ammo[k] === 'number') t.ammo[k] = Math.min(capOf(k), Math.max(t.ammo[k] || 0, lo.ammo[k])); });
  t.speedLvl = Math.max(t.speedLvl, clampInt(lo.speedLvl, 0, 3, 0));
  t.armorLvl = Math.max(t.armorLvl, clampInt(lo.armorLvl, 0, 10, 0));
  t.fuelLvl = Math.max(t.fuelLvl, clampInt(lo.fuelLvl, 0, 4, 0));
  if (lo.wlv) WLV_IDS.forEach(k => { t.wlv[k] = Math.max(t.wlv[k] || 0, clampInt(lo.wlv[k], 0, WLV_MAX, 0)); });
  if (Array.isArray(lo.shields)) for (let i = 0; i < t.shields.length; i++) t.shields[i] = Math.max(t.shields[i], clampInt(lo.shields[i], 0, SHIELD_CAP, 0));
}
function saveStoryLoadout(t) {
  if (!t.nick) return;
  const key = nickKey(t.nick);
  const p = Object.prototype.hasOwnProperty.call(profiles, key) ? profiles[key] : (profiles[key] = newProfile(t.nick, t.color));
  p.storyLoadout = storyLoadoutSnapshot(t);
  saveProfiles();
}
function saveProfiles() { try { localStorage.setItem(PROF_KEY, JSON.stringify(profiles)); } catch (_) {} cloudPush(); }
const getProfile = nick => (nick && Object.prototype.hasOwnProperty.call(profiles, nickKey(nick))) ? profiles[nickKey(nick)] : null;
const statsLine = p => 'Zápasy ' + p.matches + ' · Výhry ' + p.wins + (p.matches ? ' (' + Math.round(100 * p.wins / p.matches) + ' %)' : '') +
  ' · Kolá ' + p.rounds + ' · Zničené tanky ' + p.kills + ' · Veliteľská hodnosť LV ' + (p.level || 1);
// veliteľská hodnosť (level/XP) sa ukladá na profil podľa prezývky a prenáša sa do KAŽDÉHO ďalšieho zápasu (kampaň, multiplayer aj proti počítaču) – rastie hraním, nezačína sa vždy odznova
function syncProfileLevel(t) {
  if (!t.nick) return;
  const key = nickKey(t.nick);
  const p = Object.prototype.hasOwnProperty.call(profiles, key) ? profiles[key] : (profiles[key] = newProfile(t.nick, t.color));
  p.level = t.level; p.xp = t.xp; p.bestLevel = Math.max(p.bestLevel || 1, t.level); p.last = Date.now();
  saveProfiles();
  checkAchievements(t.nick);
}
// ---------- denná výzva (jedna spoločná výzva pre všetkých na daný deň, odvodená z dátumu - netreba po nej siahať na server) ----------
const DAILY_CHALLENGES = [
  { id: 'win1', icon: '🏆', title: 'Vyhraj 1 zápas', target: 1, key: 'wins', xp: 40 },
  { id: 'kills5', icon: '💥', title: 'Znič 5 tankov', target: 5, key: 'kills', xp: 35 },
  { id: 'matches2', icon: '⚔️', title: 'Odohraj 2 zápasy', target: 2, key: 'matches', xp: 30 },
  { id: 'rounds8', icon: '🔄', title: 'Odohraj 8 kôl', target: 8, key: 'rounds', xp: 30 },
  { id: 'wins2', icon: '🥇', title: 'Vyhraj 2 zápasy', target: 2, key: 'wins', xp: 60 },
  { id: 'kills12', icon: '☠️', title: 'Znič 12 tankov', target: 12, key: 'kills', xp: 55 },
];
function todayKey() { const d = new Date(); return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0'); }
function dailyChallengeForToday() {
  const dk = todayKey(); let h = 0;
  for (let i = 0; i < dk.length; i++) h = (h * 31 + dk.charCodeAt(i)) | 0;
  return DAILY_CHALLENGES[Math.abs(h) % DAILY_CHALLENGES.length];
}
function ensureDaily(p) {   // vráti true, ak práve začal nový deň (postup sa vynuloval)
  const dk = todayKey();
  if (!p.daily || p.daily.date !== dk) { p.daily = { date: dk, wins: 0, matches: 0, kills: 0, rounds: 0, claimed: false }; return true; }
  return false;
}
// ---------- týždenná výzva (rovnaký princíp ako denná, len na celý ISO týždeň a s väčšou odmenou; čisto lokálne, bez cloud stĺpca) ----------
const WEEKLY_CHALLENGES = [
  { id: 'wwins5', icon: '🏆', title: 'Vyhraj 5 zápasov', target: 5, key: 'wins', xp: 220 },
  { id: 'wkills30', icon: '💥', title: 'Znič 30 tankov', target: 30, key: 'kills', xp: 200 },
  { id: 'wmatches10', icon: '⚔️', title: 'Odohraj 10 zápasov', target: 10, key: 'matches', xp: 180 },
  { id: 'wrounds40', icon: '🔄', title: 'Odohraj 40 kôl', target: 40, key: 'rounds', xp: 190 },
  { id: 'wwins8', icon: '🥇', title: 'Vyhraj 8 zápasov', target: 8, key: 'wins', xp: 280 },
  { id: 'wkills50', icon: '☠️', title: 'Znič 50 tankov', target: 50, key: 'kills', xp: 260 },
];
function weekKey() {   // ISO-ish týždeň (pondelok ako začiatok), odvodený z UTC dátumu - rovnaký pre všetkých hráčov bez servera
  const d = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
  const day = (d.getUTCDay() + 6) % 7;   // 0 = pondelok
  d.setUTCDate(d.getUTCDate() - day);    // posuň na pondelok tohto týždňa
  return d.getUTCFullYear() + '-W' + d.getUTCMonth() + '-' + d.getUTCDate();
}
function weeklyChallengeForToday() {
  const wk = weekKey(); let h = 0;
  for (let i = 0; i < wk.length; i++) h = (h * 31 + wk.charCodeAt(i)) | 0;
  return WEEKLY_CHALLENGES[Math.abs(h) % WEEKLY_CHALLENGES.length];
}
function ensureWeekly(p) {   // vráti true, ak práve začal nový týždeň (postup sa vynuloval)
  const wk = weekKey();
  if (!p.weekly || p.weekly.date !== wk) { p.weekly = { date: wk, wins: 0, matches: 0, kills: 0, rounds: 0, claimed: false }; return true; }
  return false;
}
// ---------- priatelia (len pre hráčov prihlásených cez Google - potrebuje stabilné id na prepojenie účtov; tabuľka "friends" v Supabase) ----------
// pozvánkový odkaz má tvar .../index.html?friend=Prezývka - keď ho niekto otvorí a je prihlásený, hneď sa pridáte navzájom (žiadne schvaľovanie, netreba to komplikovať)
let pendingFriendInvite = null;
try {
  const _qp = new URLSearchParams(location.search);
  if (_qp.has('friend')) {
    pendingFriendInvite = (_qp.get('friend') || '').trim().slice(0, 14) || null;
    _qp.delete('friend');
    const _qs = _qp.toString();
    history.replaceState(null, '', location.pathname + (_qs ? '?' + _qs : '') + location.hash);
  }
} catch (_) {}
let friendInviteNoticeShown = false;
async function processPendingFriendInvite() {   // zavolá sa vždy po vstupe na domovskú obrazovku - no-op, ak nič nečaká alebo hráč nie je prihlásený cez Google
  if (!pendingFriendInvite) return;
  if (!cloudUser || !sb) {
    if (!friendInviteNoticeShown) { friendInviteNoticeShown = true; banner('👥 Prihlás sa cez Google, nech sa pridá priateľ z odkazu.', 3400); }
    return;   // pendingFriendInvite ostáva čakať - spracuje sa hneď po prihlásení v tejto návšteve
  }
  const targetNick = pendingFriendInvite; pendingFriendInvite = null;   // spracuj len raz
  if (nickKey(targetNick) === nickKey(cloudUser.nick)) return;   // sám so sebou kamarátstvo netreba
  try {
    const { data: row, error } = await sb.from('profiles').select('id,nick').ilike('nick', targetNick).single();
    if (error || !row) { banner('⚠️ Hráč "' + esc(targetNick) + '" z odkazu sa nenašiel.', 3000); return; }
    const { error: insErr } = await sb.from('friends').insert({ user_id: cloudUser.id, friend_id: row.id });
    if (insErr) { if (!/duplicate|unique|conflict/i.test(insErr.message || '')) console.warn('Pridanie priateľa zlyhalo:', insErr.message); return; }
    banner('👥 Pridaný priateľ: ' + row.nick, 3200);
    if ($('friends').classList.contains('show')) renderFriends();
  } catch (e) { console.warn('Pridanie priateľa zlyhalo:', e); }
}
function grantProfileXp(p, amount) {   // rovnaká logika levelovania ako addXp(), len priamo na uloženom profile (mimo živého zápasu)
  if (!p || p.level >= MAX_LEVEL) return;
  p.xp = (p.xp || 0) + amount;
  while (p.level < MAX_LEVEL && p.xp >= xpToNext(p.level)) { p.xp -= xpToNext(p.level); p.level++; p.bestLevel = Math.max(p.bestLevel || 1, p.level); }
  if (p.level >= MAX_LEVEL) p.xp = 0;
}
function recordStats(winner) {
  const done = [];
  const dc = dailyChallengeForToday(), wc = weeklyChallengeForToday();
  const dailyWins = [], weeklyWins = [];
  tanks.forEach(t => {
    if (!t.nick) return;
    const key = nickKey(t.nick);
    const p = Object.prototype.hasOwnProperty.call(profiles, key) ? profiles[key] : (profiles[key] = newProfile(t.nick, t.color));
    p.matches++; if (t === winner) p.wins++;
    p.rounds += t.wins; p.kills += t.kills || 0; p.bestLevel = Math.max(p.bestLevel, t.level); p.last = Date.now();
    ensureDaily(p);
    p.daily.matches++; if (t === winner) p.daily.wins++;
    p.daily.rounds += t.wins; p.daily.kills += t.kills || 0;
    if (!p.daily.claimed && (p.daily[dc.key] || 0) >= dc.target) { p.daily.claimed = true; grantProfileXp(p, dc.xp); dailyWins.push(t.nick); }
    ensureWeekly(p);
    p.weekly.matches++; if (t === winner) p.weekly.wins++;
    p.weekly.rounds += t.wins; p.weekly.kills += t.kills || 0;
    if (!p.weekly.claimed && (p.weekly[wc.key] || 0) >= wc.target) { p.weekly.claimed = true; grantProfileXp(p, wc.xp); weeklyWins.push(t.nick); }
    done.push(t.nick);
  });
  saveProfiles();
  done.forEach(checkAchievements);
  if (dailyWins.length) setTimeout(() => banner('🗓️ Denná výzva splnená: ' + dc.title + ' (+' + dc.xp + ' XP)', 3200), 400);
  if (weeklyWins.length) setTimeout(() => banner('📅 Týždenná výzva splnená: ' + wc.title + ' (+' + wc.xp + ' XP)', 3400), dailyWins.length ? 900 : 400);
  return done;
}
function clampInt(v, a, b, d) { v = parseInt(v, 10); return isNaN(v) ? d : Math.max(a, Math.min(b, v)); }
function fixColors() {   // každý hráč musí mať inú farbu
  const used = new Set();
  setup.players.forEach(p => {
    if (used.has(p.color.toLowerCase())) p.color = PALETTE.find(c => !used.has(c.toLowerCase())) || p.color;
    used.add(p.color.toLowerCase());
  });
}
function saveSetup() { try { localStorage.setItem(SETUP_KEY, JSON.stringify(setup)); } catch (_) {} }
function saveGame() {
  if (state !== 'shop') return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      v: 1, savedAt: Date.now(), round, winRounds: WIN_ROUNDS, lastResult,
      players: tanks.map(t => ({
        name: t.name, nick: t.nick, kills: t.kills || 0, color: t.color, money: t.money, bot: t.bot, ammo: Object.fromEntries(ORDER.filter(k => k !== 'ap').map(k => [k, t.ammo[k]])),
        speedLvl: t.speedLvl, armorLvl: t.armorLvl, fuelLvl: t.fuelLvl, wlv: t.wlv, wins: t.wins, streak: t.streak, level: t.level, xp: t.xp,
        shields: t.shields, fuel: t.fuel, repLast: t.repLast,
      })),
    }));
  } catch (_) {}
}
function readSave() {
  try {
    const v = JSON.parse(localStorage.getItem(SAVE_KEY));
    return v && v.v === 1 && Array.isArray(v.players) && v.players.length >= 2 && v.players.length <= 4 ? v : null;
  } catch (_) { return null; }
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (_) {} }

// ---------- príbehový režim (kampaň proti PC súperom, misia po misii) ----------
const STORY_MISSIONS = [
  { title: 'Prvá paľba', terrain: 'meadow', bots: [{ lvl: 1, name: 'Rekrut Krtko' }], rounds: 1, money: 500,
    text: 'Vitaj vo Velení, veliteľ. Na cvičisku ťa čaká iba opotrebovaný tréningový tank.',
    win: 'Prvé víťazstvo je za tebou. Veliteľstvo ťa posiela na ostrejší výcvik.',
    lose: 'Aj cvičný súper ťa prekvapil? Skús to znova – bez paniky.' },
  { title: 'Pobrežná hliadka', terrain: 'beach', bots: [{ lvl: 1, name: 'Desiatnik Príboj' }], rounds: 1, money: 550,
    text: 'Pokojné pobrežie so stálym vánkom od mora. Ideálne miesto vyskúšať si mierenie skôr, než sa počasie skomplikuje.',
    win: 'Pobrežie je zabezpečené. Ďalej ťa čaká horúca púšť.',
    lose: 'Aj na pokojnej pláži sa dá prehrať. Sleduj vietor pozorne.' },
  { title: 'Piesočná búrka', terrain: 'desert', bots: [{ lvl: 1, name: 'Seržant Piesok' }], rounds: 1, money: 600,
    text: 'V púšti fúka zradný, nárazový vietor. Priprav sa naň skôr, než stlačíš spúšť.',
    win: 'Duny sú za tebou. Ale niekde na severe sa sťahujú mračná.',
    lose: 'Vietor v púšti odfúkol tvoju strelu inam. Sleduj žltý terč predpokladaného dopadu.' },
  { title: 'Ľadová hranica', terrain: 'winter', bots: [{ lvl: 2, name: 'Kapitán Mráz' }], rounds: 1, money: 700,
    text: 'Zamrznutá zem, šmykľavé pásy a skúsenejší súper. Kapitán Mráz nezaváha.',
    win: 'Kapitán Mráz skladá zbrane. Pred tebou je hustý les.',
    lose: 'Ľad ťa poriadne rozhodil. Priprav sa a skús inú muníciu.' },
  { title: 'Šero hlbokého lesa', terrain: 'forest', bots: [{ lvl: 2, name: 'Nadporučík Lístie' }], rounds: 1, money: 800,
    text: 'Koruny stromov tlmia vietor, ale spomalia aj tvoju strelu. Miier presnejšie.',
    win: 'Les prešiel do ticha. Pred tebou sa dvíhajú hory.',
    lose: 'Strom ti prekazil výstrel? Skús vyššiu balistickú dráhu.' },
  { title: 'Horský priesmyk', terrain: 'mountains', bots: [{ lvl: 2, name: 'Major Štít' }], rounds: 2, money: 900,
    text: 'Riedky vzduch, hlboké údolia a vietor, ktorý vo výške búši dvojnásobnou silou.',
    win: 'Major Štít ustupuje do hôr. Zvyšky jeho jednotky sa skrývajú v kaňone.',
    lose: 'Hory sú nemilosrdné – sleduj terč dopadu aj pri dlhých výstreloch.' },
  { title: 'Kaňon duchov', terrain: 'canyon', bots: [{ lvl: 3, name: 'Plukovníčka Skala' }], rounds: 2, money: 1050,
    text: 'V úzkej rokline fúka vietor ako z tunela – silno a takmer stále rovnako.',
    win: 'Plukovníčka Skala je porazená. Ostáva už len bažina za riekou.',
    lose: 'Skalná plukovníčka ťa zatlačila. Skús si najprv kúpiť lepší štít.' },
  { title: 'Bažina zabudnutých', terrain: 'swamp', bots: [{ lvl: 3, name: 'Generál Bahno' }], rounds: 2, money: 1200,
    text: 'Mäkká pôda tlmí výbuchy, no hustá para skracuje dolet striel.',
    win: 'Generál Bahno mizne v hmle. Zostáva posledná, rozhodujúca bitka.',
    lose: 'Bažina spomalila tvoj postup. Vylepši si palivo a skús to znova.' },
  { title: 'Ohnivá pevnosť', terrain: 'volcano', bots: [{ lvl: 3, name: 'Podplukovník Popol' }], rounds: 2, money: 1350,
    text: 'Sopečná pôda praská pod pásmi a vzduch sa chveje horúčavou. Nepriateľ sa ukrýva medzi prúdmi stuhnutej lávy.',
    win: 'Sopka stíchla. Zostáva už len zbúrané mesto pred bránami veliteľstva.',
    lose: 'Lávové polia neodpúšťajú chyby. Priprav sa lepšie a skús to znova.' },
  { title: 'Mesto v troskách', terrain: 'ruins', bots: [{ lvl: 3, name: 'Kapitán Sutina' }], rounds: 2, money: 1450,
    text: 'Zbúrané ulice plné sutín ponúkajú kryt aj nepriateľovi – priamy výstrel bude ťažký.',
    win: 'Mesto je oslobodené. Prieskum hlási ďalšie nepriateľské oddiely medzi dunami.',
    lose: 'Sutiny ti zablokovali výstrel? Skús oblúkovejšiu dráhu alebo inú muníciu.' },
  { title: 'Búrka nad dunami', terrain: 'desert', bots: [{ lvl: 3, name: 'Plukovník Prach' }], rounds: 2, money: 1600,
    text: 'Ďalšia jednotka sa ukrýva medzi dunami. Plukovník Prach pozná v púšti každú zákrutu a čaká na tvoju chybu.',
    win: 'Plukovník Prach ustupuje. Podľa hlásení sa pri pobreží zoskupujú hneď dve jednotky naraz.',
    lose: 'Púšť si ťa podala znova. Priprav lepšiu výzbroj a skús to odznova.' },
  { title: 'Spojenecký úder', terrain: 'beach', bots: [{ lvl: 3, name: 'Kapitán Vlna' }, { lvl: 3, name: 'Poručík Príliv' }], rounds: 2, money: 1800,
    text: 'Dvaja velitelia bránia pobrežie naraz – Kapitán Vlna útočí zblízka, Poručík Príliv strieľa na diaľku. Rozdeľ ich pozornosť.',
    win: 'Pobrežná základňa padla. Prieskumné drony hlásia presun nepriateľa do hôr.',
    lose: 'Dvaja súperi naraz sú tvrdý oriešok – skús si najprv doplniť štít aj muníciu.' },
  { title: 'Obkľúčenie v horách', terrain: 'mountains', bots: [{ lvl: 3, name: 'Majorka Blesk' }, { lvl: 3, name: 'Nadporučík Hrom' }], rounds: 2, money: 1950,
    text: 'Vysoko v horách ťa čakajú dvaja skúsení delostrelci – vietor tu búši dvojnásobnou silou a únik nie je kam.',
    win: 'Horská pevnosť je dobytá. Zvyšky nepriateľa sa sťahujú do zamrznutých plání na sever.',
    lose: 'Blesk a Hrom ťa zahnali do kúta. Priprav si palivo aj krytie skôr, než znova vyrazíš.' },
  { title: 'Vánica na fronte', terrain: 'winter', bots: [{ lvl: 3, name: 'Brigádna generálka Vánica' }, { lvl: 3, name: 'Kapitán Ľadovec' }], rounds: 2, money: 2100,
    text: 'V hustej metelici bránia dvaja velitelia zamrznutú základňu. Šmykľavý ľad sťaží jazdu obom stranám rovnako.',
    win: 'Zamrznutý front je prelomený. Pred bránami veliteľstva sa zoskupuje posledná obrana.',
    lose: 'Vánica ti vzala výhľad aj presnosť. Skús to znova, veliteľ.' },
  { title: 'Obrana priesmyku', terrain: 'mountains', bots: [{ lvl: 3, name: 'Maršal Železo' }, { lvl: 3, name: 'Kapitánka Oceľ' }], rounds: 2, money: 2250,
    text: 'Maršal Železo a Kapitánka Oceľ bránia posledný priesmyk pred samotným veliteľstvom. Toto už nie je cvičenie.',
    win: 'Maršal Železo skladá zbrane. Priesmyk je voľný – pred tebou je už len generálny štáb nepriateľa.',
    lose: 'Aj maršali občas prehrajú svoju prvú bitku. Skús to znova, veliteľ.' },
  { title: 'Generálny štáb', terrain: 'ruins', bots: [{ lvl: 3, name: 'Generálmajor Ruina' }, { lvl: 3, name: 'Kapitán Dym' }, { lvl: 3, name: 'Poručíčka Iskra' }], rounds: 2, money: 2500,
    text: 'Traja velitelia naraz bránia zbúrané veliteľské centrum. Sutiny ponúkajú kryt im aj tebe – vyber si ciele múdro.',
    win: 'Generálny štáb je rozprášený. Ostáva už len posledná obranná línia okolo kaňonu.',
    lose: 'Traja súperi naraz sú nemilosrdní. Doplň si zásoby a skús to znova.' },
  { title: 'Obrana kaňonu', terrain: 'canyon', bots: [{ lvl: 3, name: 'Plukovník Cyklón' }, { lvl: 3, name: 'Majorka Ozvena' }, { lvl: 3, name: 'Kapitán Balvan' }], rounds: 2, money: 2750,
    text: 'Posledná obranná línia sa ukrýva v úzkej rokline. Vietor tu fúka ako z tunela a súperi majú kryt za každým balvanom.',
    win: 'Kaňon je dobytý. Zostáva už len samotná sopka, kde sa ukrýva najvyššie velenie.',
    lose: 'Ozvena kaňonu ti sťažila mierenie. Priprav si presnejšiu muníciu a skús to znova.' },
  { title: 'Tiene hlbokého lesa', terrain: 'forest', bots: [{ lvl: 3, name: 'Major Tieň' }, { lvl: 3, name: 'Kapitánka Ihličie' }, { lvl: 3, name: 'Poručík Konár' }], rounds: 2, money: 2850,
    text: 'Nepriateľ sa stiahol hlboko do lesa a kryje sa za každým kmeňom. Traja skúsení velitelia na teba čakajú v tichu medzi stromami.',
    win: 'Les je vyčistený. Prieskum hlási poslednú líniu nepriateľa v bažinatej nížine.',
    lose: 'Les ťa pohltil skôr, než si stihol poriadne zamieriť. Priprav sa lepšie a skús to znova.' },
  { title: 'Posledná bažina', terrain: 'swamp', bots: [{ lvl: 3, name: 'Generálka Hmla' }, { lvl: 3, name: 'Major Bahno' }, { lvl: 3, name: 'Kapitán Para' }], rounds: 2, money: 2950,
    text: 'Hustá para a mäkká pôda skrývajú poslednú líniu nepriateľa pred sopkou. Traja velitelia bránia každý meter bahna.',
    win: 'Bažina je za tebou. Pred veliteľstvom nepriateľa ostáva už len sopka.',
    lose: 'Bažina ťa spomalila v nesprávnej chvíli. Doplň si palivo a skús to znova.' },
  { title: 'Posledná bašta Zeme', terrain: 'volcano', bots: [{ lvl: 3, name: 'Maršal Popolec' }, { lvl: 3, name: 'Generálka Magma' }, { lvl: 3, name: 'Najvyšší veliteľ Vulkán' }], rounds: 3, money: 3100,
    text: 'Toto je posledná pozemská bašta nepriateľa, hlboko v sopke. Traja najvyšší velitelia naraz – daj do toho úplne všetko, veliteľ.',
    win: 'Posledná bašta padla, veliteľ! Pozemská vojna je vyhratá. Prieskumné satelity však práve zachytili vysielanie nepriateľských posíl – vysoko nad nami, na Mesiaci. Priprav sa opustiť Zem.',
    lose: 'Aj najvyšší velitelia sa dajú poraziť – nabudúce to dokážeš, veliteľ.' },
  // ---------- MESIAC: nízka gravitácia, nulová atmosféra (žiadny vietor), obrovské krátery ----------
  { title: 'Pristátie na Mori pokoja', terrain: 'moon', bots: [{ lvl: 1, name: 'Vojak Prach' }], rounds: 1, money: 3200,
    text: 'Prvý krok na cudzom svete, veliteľ. Nulová atmosféra – žiadny vietor ťa už nerozhodí, no nízka gravitácia poriadne predĺži dolet každej strely.',
    win: 'Mesačná základňa je zriadená. Prieskum hlási pohyb pri najbližšom kráteri.',
    lose: 'Aj bez vetra sa dá minúť – priestrel bol tentoraz príliš dlhý. Priprav sa na nízku gravitáciu a skús to znova.' },
  { title: 'Kráterové pole', terrain: 'moon', bots: [{ lvl: 2, name: 'Veliteľ Kráter' }], rounds: 1, money: 3350,
    text: 'Pole hlbokých kráterov sťažuje priamu paľbu, no sypký regolit znamená obrovské výbuchy pri zásahu.',
    win: 'Kráterové pole je tvoje. Pred tebou je tieň krátera Tycho.',
    lose: 'Kráter ti zakryl výhľad na súpera. Skús oblúkovejšiu dráhu.' },
  { title: 'Tieň krátera Tycho', terrain: 'moon', bots: [{ lvl: 2, name: 'Kapitánka Regolith' }], rounds: 2, money: 3500,
    text: 'V hlbokom tieni krátera Tycho sa ukrýva skúsená veliteľka. Nízka gravitácia tu hrá v prospech toho, kto ju vie využiť.',
    win: 'Tycho je dobytý. Ďalej ťa čaká opustená základňa v Mori daždov.',
    lose: 'Tieň krátera ťa oklamal pri odhade vzdialenosti. Skús to znova, veliteľ.' },
  { title: 'Základňa v Mori daždov', terrain: 'moon', bots: [{ lvl: 2, name: 'Major Apollo' }, { lvl: 2, name: 'Poručík Modul' }], rounds: 2, money: 3700,
    text: 'Dvaja velitelia naraz bránia opustenú pozemskú základňu. Bez vetra je mierenie presné – ale aj súper mieri rovnako dobre.',
    win: 'Základňa je dobytá späť. Pred tebou sa dvíha vysočina Copernicus.',
    lose: 'Dvaja súperi naraz v nízkej gravitácii sú zradní. Doplň si muníciu a skús to znova.' },
  { title: 'Vysočina Copernicus', terrain: 'moon', bots: [{ lvl: 3, name: 'Plukovníčka Vysočina' }, { lvl: 3, name: 'Kapitán Krík' }], rounds: 2, money: 3900,
    text: 'Rozbitá vysočina plná balvanov z dávneho dopadu. Dvaja skúsení velitelia poznajú každý úkryt.',
    win: 'Vysočina Copernicus je dobytá. Zvyšky nepriateľa ustupujú na odvrátenú stranu.',
    lose: 'Balvany ti zablokovali priamy výstrel. Skús inú muníciu alebo vyšší oblúk.' },
  { title: 'Temná strana', terrain: 'moon', bots: [{ lvl: 3, name: 'Generál Zatmenie' }, { lvl: 3, name: 'Majorka Prázdno' }], rounds: 2, money: 4100,
    text: 'Na odvrátenej strane Mesiaca niet spojenia so Zemou – si tu sám, veliteľ. Dvaja velitelia bránia temnotu zúfalo.',
    win: 'Temná strana je oslobodená. Prieskum hlási posledný kráter plný nepriateľov.',
    lose: 'V temnote sa ťažko mieri. Priprav si osvetľovaciu muníciu a skús to znova.' },
  { title: 'Posledný kráter', terrain: 'moon', bots: [{ lvl: 3, name: 'Plukovník Kráter' }, { lvl: 3, name: 'Majorka Trosky' }, { lvl: 3, name: 'Kapitán Úlomok' }], rounds: 2, money: 4350,
    text: 'Traja velitelia naraz bránia posledný veľký kráter. Nízka gravitácia znamená, že aj ich strely letia nebezpečne ďaleko.',
    win: 'Kráter je dobytý. Zostáva už len obrana hlavnej mesačnej základne.',
    lose: 'Traja súperi v nízkej gravitácii sú nemilosrdní. Doplň si štít a skús to znova.' },
  { title: 'Obrana mesačnej základne', terrain: 'moon', bots: [{ lvl: 3, name: 'Generálka Oběžná' }, { lvl: 3, name: 'Major Raketa' }, { lvl: 3, name: 'Kapitánka Modul' }], rounds: 2, money: 4600,
    text: 'Hlavná nepriateľská základňa na Mesiaci sa bráni zo všetkých strán. Traja velitelia, nulový vietor, žiadne výhovorky.',
    win: 'Mesačná základňa padla. Rádio však zachytáva podivný signál – odniekiaľ z hlbokého vesmíru.',
    lose: 'Základňa je tvrdý oriešok. Vylepši si zbrane a skús to znova, veliteľ.' },
  { title: 'Predvoj invázie', terrain: 'moon', bots: [{ lvl: 3, name: 'Veliteľ Signál' }, { lvl: 3, name: 'Majorka Echo' }, { lvl: 3, name: 'Kapitán Vlna' }], rounds: 2, money: 4850,
    text: 'Podivný signál priviedol na Mesiac predvoj niečoho väčšieho. Traja velitelia bránia vysielač zúfalo – vedia, že prichádza pomoc.',
    win: 'Predvoj je zničený, no signál smeruje ďalej – k červenej planéte. Mars čaká, veliteľ.',
    lose: 'Predvoj bol len ochutnávka. Priprav sa poriadne a skús to znova.' },
  { title: 'Generál Armstrong', terrain: 'moon', bots: [{ lvl: 3, name: 'Generál Armstrong' }, { lvl: 3, name: 'Plukovníčka Kráter' }, { lvl: 3, name: 'Major Modul' }], rounds: 3, money: 5200,
    text: 'Posledná bitka o Mesiac. Generál Armstrong velí osobne – traja najskúsenejší velitelia naraz, daj do toho všetko.',
    win: 'Mesiac je slobodný, veliteľ! Signál z hlbokého vesmíru však vedie priamo na Mars – a to, čo tam čaká, nie je ľudské. Priprav sa na let.',
    lose: 'Aj generáli sa dajú poraziť. Nabudúce to dokážeš, veliteľ.' },
  // ---------- MARS: slabšia gravitácia, riedka atmosféra s nepredvídateľnými piesočnými búrkami, mimozemská flotila ----------
  { title: 'Červený piesok', terrain: 'mars', bots: [{ lvl: 2, name: 'Prieskumník Vryn' }], rounds: 1, money: 5500, bonusAmmo: { laser: 3, empBig: 2 },
    text: 'Vítaj na Marse, veliteľ. Prvý kontakt s mimozemskou technikou – naše laboratóriá ti na cestu pribalili zopár kusov upravenej alienskej výzbroje. Riedka atmosféra predĺži dolet, no piesočné búrky strely nepredvídateľne zahýbajú.',
    win: 'Prieskumník Vryn je zničený. Nová výzbroj funguje. Pred tebou je dunová bašta.',
    lose: 'Marťanský piesok ťa prekvapil. Sleduj žltý terč predpokladaného dopadu pozornejšie.' },
  { title: 'Dunová bašta', terrain: 'mars', bots: [{ lvl: 2, name: 'Veliteľ Kaas' }], rounds: 2, money: 5750,
    text: 'Mimozemský veliteľ sa zahrabal medzi červené duny. Jeho tank nevyzerá ako nič, čo si kedy videl.',
    win: 'Dunová bašta padla. Prieskum hlási signál z hlbín planéty.',
    lose: 'Marťanská búrka ti zmenila smer strely priamo nad cieľom. Skús to znova.' },
  { title: 'Signál z hlbín', terrain: 'mars', bots: [{ lvl: 3, name: 'Entita Mora' }, { lvl: 3, name: 'Droid Skelt' }], rounds: 2, money: 6000,
    text: 'Dvaja mimozemskí velitelia bránia vstup do podzemného komplexu. Ich zbrane sú nebezpečne presné aj v slabšej gravitácii.',
    win: 'Signál umlkol. Nad planinou sa však sťahuje obrovská piesočná búrka.',
    lose: 'Entita Mora a Droid Skelt sú zohratý pár. Doplň si štít a skús to znova.' },
  { title: 'Búrka nad planinou', terrain: 'mars', bots: [{ lvl: 3, name: 'Veliteľka Sarn' }, { lvl: 3, name: 'Zberač Thuul' }], rounds: 2, money: 6300,
    text: 'Piesočná búrka zuří naplno – vietor mení smer uprostred letu strely. Dvaja velitelia to využívajú na maximum.',
    win: 'Búrka utíchla, veliteľstvo padlo. Pred tebou je kaňon plný tieňov.',
    lose: 'Búrka je nevyspytateľná. Sleduj ju pozorne a prispôsob muníciu.' },
  { title: 'Kaňon tieňov', terrain: 'mars', bots: [{ lvl: 3, name: 'Strážca Oyrn' }, { lvl: 3, name: 'Entita Kessa' }], rounds: 2, money: 6600,
    text: 'Obrovský marťanský kaňon skrýva dvoch strážcov v tieni útesov. Slabšia gravitácia predĺži každý výstrel ponad okraj.',
    win: 'Kaňon tieňov je prekonaný. Prieskum hlási podzemné hniezdo neďaleko.',
    lose: 'Tiene kaňonu skrývajú viac, než sa zdá. Skús inú muníciu a vyšší oblúk.' },
  { title: 'Podzemné hniezdo', terrain: 'mars', bots: [{ lvl: 3, name: 'Veliteľ Zharn' }, { lvl: 3, name: 'Droid Myx' }, { lvl: 3, name: 'Entita Prask' }], rounds: 2, money: 6950,
    text: 'Traja mimozemskí velitelia bránia hniezdo hlboko pod povrchom. Ich flotila sa tu pripravuje na niečo väčšie.',
    win: 'Hniezdo je zničené. Nad planinou sa však zhromažďuje celý roj.',
    lose: 'Traja súperi naraz pod povrchom sú nemilosrdní. Priprav sa lepšie a skús to znova.' },
  { title: 'Roj', terrain: 'mars', bots: [{ lvl: 3, name: 'Roj-Matka Kallax' }, { lvl: 3, name: 'Droid Vesh' }, { lvl: 3, name: 'Droid Noor' }], rounds: 2, money: 7300,
    text: 'Roj-Matka Kallax velí celému mimozemskému zoskupeniu. Traja súperi, nevyspytateľný vietor, žiadny priestor na chybu.',
    win: 'Roj je rozprášený. Zostáva už len obliehanie základne Olympus.',
    lose: 'Roj útočí koordinovane. Doplň si zásoby a skús to znova, veliteľ.' },
  { title: 'Obliehanie základne Olympus', terrain: 'mars', bots: [{ lvl: 3, name: 'Veliteľka Thyra' }, { lvl: 3, name: 'Entita Volk' }, { lvl: 3, name: 'Droid Ress' }], rounds: 3, money: 7700,
    text: 'Základňa Olympus je postavená v tieni najvyššej hory slnečnej sústavy. Traja velitelia ju bránia so všetkým, čo majú.',
    win: 'Olympus padol. Pred veliteľstvom nepriateľa ostáva už len samotná brána.',
    lose: 'Olympus je tvrdý oriešok. Vylepši si zbrane a skús to znova.' },
  { title: 'Brána', terrain: 'mars', bots: [{ lvl: 3, name: 'Strážca Brány Ixal' }, { lvl: 3, name: 'Entita Sovrax' }, { lvl: 3, name: 'Droid Quor' }], rounds: 3, money: 8100,
    text: 'Za touto bránou čaká najvyššie velenie celej mimozemskej invázie. Traja strážcovia ju bránia do posledného.',
    win: 'Brána je prelomená. Najvyšší veliteľ Thessarax ťa už čaká.',
    lose: 'Brána sa nedá prelomiť narýchlo. Priprav sa poriadne na posledný útok.' },
  { title: 'Najvyšší Overlord Thessarax', terrain: 'mars', bots: [{ lvl: 3, name: 'Overlord Thessarax' }, { lvl: 3, name: 'Entita Kallax' }, { lvl: 3, name: 'Droid Vryn' }], rounds: 3, money: 8500,
    text: 'Posledná bitka celej kampane. Overlord Thessarax velí osobne, po boku dvoch najsilnejších entít flotily. Daj do toho úplne všetko, veliteľ.',
    win: 'Overlord Thessarax je porazený! Zem, Mesiac aj Mars sú slobodné. Veliteľstvo však zachytáva posledný, najsilnejší signál – prichádza z Venuše.',
    lose: 'Aj overlordi sa dajú poraziť. Nabudúce to dokážeš, veliteľ – pre celú slnečnú sústavu.' },
  // ---------- VENUŠA: hustá toxická atmosféra, extrémny tlak a vietor, posledná a najťažšia flotila ----------
  { title: 'Zostup do oblakov', terrain: 'venus', bots: [{ lvl: 2, name: 'Strážca Oblakov Vex' }], rounds: 2, money: 8900,
    text: 'Posledný signál viedol na Venušu. Hustá sírová atmosféra pohlcuje svetlo aj zvuk a tlak drví všetko, čo nie je poriadne obrnené.',
    win: 'Strážca Oblakov je zničený. Pod mrakmi sa skrýva povrch plný stuhnutej lávy.',
    lose: 'Hustá atmosféra ťa zaskočila – strely sa tu správajú úplne inak. Priprav sa a skús to znova.' },
  { title: 'Sírová búrka', terrain: 'venus', bots: [{ lvl: 2, name: 'Veliteľka Kyselina' }], rounds: 2, money: 9100,
    text: 'Vietor tu fúka extrémnou, takmer nepretržitou silou a mení smer bez varovania. Veliteľka Kyselina to pozná dokonale.',
    win: 'Búrka utíchla. Prieskumné senzory hlásia ďalšiu jednotku pri lávových poliach.',
    lose: 'Sírová búrka ťa odfúkla od cieľa. Sleduj žltý terč dopadu pozornejšie než inde.' },
  { title: 'Roztavená planina', terrain: 'venus', bots: [{ lvl: 3, name: 'Major Vulkanit' }], rounds: 2, money: 9350,
    text: 'Povrch je posiaty čerstvou lávou, ktorá žiari aj cez hustý opar. Major Vulkanit sa v tomto pekle cíti ako doma.',
    win: 'Vulkanit je porazený. Veliteľstvo nepriateľa je už nablízku.',
    lose: 'Žiara lávy ťa oslepila v nesprávnej chvíli. Priprav si lepší štít.' },
  { title: 'Údolie tlaku', terrain: 'venus', bots: [{ lvl: 3, name: 'Kapitán Perihélium' }, { lvl: 3, name: 'Poručíčka Koróna' }], rounds: 2, money: 9600,
    text: 'V tomto údolí je atmosférický tlak najvyšší na celej planéte. Dvaja velitelia ho využívajú na krátke, no smrtiace výstrely.',
    win: 'Údolie je dobyté. Zostáva preniknúť k samotnému jadru základne.',
    lose: 'Tlak tu skresľuje každý výstrel. Doplň si zásoby a skús to znova.' },
  { title: 'Jadro základne', terrain: 'venus', bots: [{ lvl: 3, name: 'Generál Žiara' }, { lvl: 3, name: 'Majorka Opar' }], rounds: 2, money: 9900,
    text: 'Jadro nepriateľskej základne je ukryté hlboko pod mrakmi. Generál Žiara a Majorka Opar ho bránia bez zľutovania.',
    win: 'Jadro je zničené. Nad planinou sa sťahuje posledná obranná flotila.',
    lose: 'Opar ti vzal výhľad presne na poslednú sekundu. Skús to znova, veliteľ.' },
  { title: 'Posledná flotila', terrain: 'venus', bots: [{ lvl: 3, name: 'Plukovník Sopúch' }, { lvl: 3, name: 'Kapitánka Para' }, { lvl: 3, name: 'Droid Sykot' }], rounds: 2, money: 10200,
    text: 'Traja velitelia naraz bránia posledné prístupové cesty k veliteľstvu. Hustá para im dáva dokonalý kryt.',
    win: 'Flotila je rozprášená. K veliteľstvu nepriateľa už nič nestojí v ceste.',
    lose: 'Traja súperi v hustej pare sú nemilosrdní. Priprav sa lepšie a skús to znova.' },
  { title: 'Predsieň veliteľstva', terrain: 'venus', bots: [{ lvl: 3, name: 'Majorka Vrenie' }, { lvl: 3, name: 'Kapitán Škvára' }, { lvl: 3, name: 'Entita Popol' }], rounds: 3, money: 10500,
    text: 'Vzduch sa tu takmer varí. Traja strážcovia bránia poslednú prístupovú cestu do útrob veliteľstva.',
    win: 'Predsieň je dobytá. Pred tebou je už len samotné veliteľstvo invázie.',
    lose: 'Vrúca atmosféra ťa vyčerpala skôr, než si to čakal. Doplň si palivo a skús to znova.' },
  { title: 'Útroby veliteľstva', terrain: 'venus', bots: [{ lvl: 3, name: 'Generálka Výheň' }, { lvl: 3, name: 'Plukovník Dusík' }, { lvl: 3, name: 'Droid Kyslík' }], rounds: 3, money: 10800,
    text: 'Hlboko pod oblakmi sa skrýva srdce celej invázie. Traja najskúsenejší velitelia ho bránia do posledného dychu.',
    win: 'Útroby veliteľstva sú dobyté. Zostáva už len samotná najvyššia veliteľka.',
    lose: 'Výheň, dusík, kyslík – táto atmosféra neodpúšťa chyby. Priprav sa a skús to znova.' },
  { title: 'Trón oblakov', terrain: 'venus', bots: [{ lvl: 3, name: 'Najvyššia Veliteľka Lucifer' }, { lvl: 3, name: 'Strážca Koróna' }, { lvl: 3, name: 'Entita Vex' }], rounds: 3, money: 11100,
    text: 'Na vrchole najvyššej hory planéty, nad oblakmi, sídli Najvyššia Veliteľka Lucifer. Toto je jej posledná bašta.',
    win: 'Trón oblakov padá. Lucifer ustupuje do posledného, zúfalého postavenia.',
    lose: 'Trón oblakov sa nedá dobyť narýchlo. Vylepši si výzbroj a skús to znova.' },
  { title: 'Najvyššia Veliteľka Lucifer', terrain: 'venus', bots: [{ lvl: 3, name: 'Najvyššia Veliteľka Lucifer' }, { lvl: 3, name: 'Entita Koróna' }, { lvl: 3, name: 'Entita Vex' }], rounds: 3, money: 12000, bonusAmmo: { laser: 4, empBig: 3 },
    text: 'Posledná bitka úplne celej kampane. Veliteľstvo ti na poslednú cestu pribalilo svoju najsilnejšiu výzbroj. Lucifer velí osobne, po boku dvoch svojich najvernejších entít. Toto je ono, veliteľ.',
    win: 'Najvyššia Veliteľka Lucifer je porazená! Zem, Mesiac, Mars aj Venuša sú slobodné. Si najlepší tankový veliteľ v histórii celej slnečnej sústavy.',
    lose: 'Aj najvyššie veliteľky sa dajú poraziť. Nabudúce to dokážeš, veliteľ – toto je posledný krok.' },
];
// ---------- generáli kampane: pred prvou misiou planéty ťa uvítajú a vysvetlia príbeh, po poslednej misii planéty ťa odmenia
// exkluzívnou zbraňou, ktorá sa nedá kúpiť. Príbeh nadväzuje presne na text misií vyššie (zrada generála Armstronga na
// Mesiaci, mimozemská flotila Overlorda Thessaraxa na Marse, ktorá dostávala rozkazy priamo od Lucifer na Venuši). ----------
const GENERALS = {
  earth: { name: 'Generálka Zora', title: 'Veliteľka pozemských síl', icon: '🎖️',
    intro: [
      'Vitaj vo Velení, veliteľ. Som generálka Zora a od tejto chvíle preberáš prvú líniu obrany Zeme.',
      'Pred troma týždňami zaútočila na naše základne súkromná armáda, ktorá si hovorí Železná aliancia. Vypálili sklad paliva pri hraniciach a zotročili posádku – musíme ich zastaviť skôr, než postúpia hlbšie do vnútrozemia.',
      'Budeš postupovať líniu po línii, až k ich veleniu ukrytému v sopke. Ja ťa povedem na každom kroku. Veľa šťastia, veliteľ.',
    ],
    outro: [
      'Dokázal si to, veliteľ. Posledná bašta Železnej aliancie padla a Zem je znova slobodná.',
      'Pri výsluchu zajatých dôstojníkov sme zistili znepokojivú vec – Železná aliancia nikdy nekonala sama. Niekto ich zásoboval technológiou, akú sme tu ešte nevideli. A ten signál vedie na Mesiac.',
      'Toto je môj posledný dar, veliteľ – Oslobodzovacie delo, vyvinuté práve pre teba. Zvyšok tejto vojny už povedie môj kolega, generál Azimut z Mesačnej základne. Veľa šťastia tam hore.',
    ],
    reward: { ammoId: 'liberCannon', qty: 2, xp: 400 } },
  moon: { name: 'Generál Azimut', title: 'Veliteľ Mesačnej základne', icon: '🛰️',
    intro: [
      'Vitaj na Mesiaci, veliteľ. Som generál Azimut – Zora mi o tebe už všetko povedala.',
      'Zvyšky Železnej aliancie sa stiahli sem a opevnili sa v kráteroch. Velí im muž, ktorého poznám len ako generála Armstronga – bývalý spojenec, ktorý zradil a predal naše tajomstvá neznámej mocnosti.',
      'Nulová atmosféra tu znamená žiadny vietor, no nízka gravitácia poriadne predĺži dolet tvojich striel. Priprav sa a poď mi pomôcť dostať späť náš mesačný domov.',
    ],
    outro: [
      'Armstrong je porazený, Mesiac je náš. Dobrá práca, veliteľ.',
      'Signál, ktorý sme zachytili z jeho vysielača, nemá ľudský pôvod – opakujem, nemá ľudský pôvod. Vedie priamo na Mars a ja sám neviem, čo tam na teba čaká.',
      'Zober si toto – gravitačný náboj, posledná vec, čo sme na základni ešte stihli zostrojiť. Na Marse ťa už čaká generálka Nova, naša najlepšia veliteľka prieskumu. Nech sa ti darí, veliteľ.',
    ],
    reward: { ammoId: 'gravBlast', qty: 3, xp: 550 } },
  mars: { name: 'Generálka Nova', title: 'Veliteľka prieskumnej flotily', icon: '🔴',
    intro: [
      'Vitaj na Marse, veliteľ. Som generálka Nova – poviem to rovno: to, čo tu nájdeme, zmení všetko, čo sme si mysleli o tejto vojne.',
      'Signál z Mesiaca patrí mimozemskej flotile, ktorá sa tu už dávno skrýva pod povrchom. Všetko nasvedčuje tomu, že práve ONI od začiatku vyzbrojovali a riadili Železnú alianciu na Zemi – my sme celý čas bojovali proti bábkam.',
      'Ich veliteľ si hovorí Overlord Thessarax. Poď, ukážeme mu, že Zem sa nevzdáva ľahko.',
    ],
    outro: [
      'Thessarax je zničený, veliteľ. Celá slnečná sústava si teraz môže konečne vydýchnuť – aspoň na chvíľu.',
      'V jeho troskách sme našli súradnice posledného, najsilnejšieho signálu zo všetkých. Smeruje na Venušu – a podľa všetkého tam Thessarax dostával rozkazy, nie ich vydával.',
      'Toto si zaslúžiš – alienský roj, postavený z korisnej technológie, akú si nikto na Zemi nevie ani len predstaviť. Na Venuši nie si sám, veliteľ. Niekto tam na teba už čaká.',
    ],
    reward: { ammoId: 'alienSwarm', qty: 2, xp: 700 } },
  venus: { name: 'Veliteľ Alter', title: 'Vodca venušského odboja', icon: '👽',
    intro: [
      'Vitaj na Venuši, pozemšťan. Volám sa Alter – som posledný veliteľ odboja môjho ľudu.',
      'Tá istá mocnosť, ktorú ste porazili na Marse, dobyla aj môj svet. Ich najvyššia veliteľka Lucifer vládne z trónu nad oblakmi už celé desaťročia – zotročila môj národ a z Venuše robila základňu pre ďalšie výboje, vrátane toho na Zemi.',
      'Bojujem sám už príliš dlho. S tebou po boku máme konečne šancu to ukončiť – raz a navždy, pre oba naše svety.',
    ],
    outro: [
      'Je po všetkom. Lucifer je porazená a môj ľud je po prvýkrát za desaťročia slobodný.',
      'Nikdy nezabudnem, čo si pre nás urobil, veliteľ. Zem, Mesiac, Mars aj Venuša ti budú navždy vďačné.',
      'Toto je moje posledné a najcennejšie poďakovanie – plazmová búrka, zbraň môjho vlastného ľudu. Nech ťa navždy chráni, priateľ. Si najlepší tankový veliteľ v histórii celej slnečnej sústavy.',
    ],
    reward: { ammoId: 'alterStorm', qty: 2, xp: 1000 } },
};
function ensureStoryFlags(progress) {   // lazy-init, rovnaký bezpečný vzor ako ensureDaily/ensureWeekly - nič nevymaže existujúci postup
  if (!progress.introSeen) progress.introSeen = {};
  if (!progress.rewarded) progress.rewarded = {};
  return progress;
}
function catchUpWorldRewards(p) {   // hráči, ktorí planétu dokončili ešte pred touto aktualizáciou, dostanú darček generála dodatočne
  if (!p || !p.story) return false;
  const flags = ensureStoryFlags(p.story);
  let changed = false;
  Object.keys(GENERALS).forEach(w => {
    const wm = worldMissions(w); if (!wm.length) return;
    const lastI = wm[wm.length - 1].i;
    if (p.story.unlocked > lastI && !flags.rewarded[w]) {
      flags.rewarded[w] = true;
      const rw = GENERALS[w].reward;
      if (!p.storyLoadout) p.storyLoadout = { money: 0, ammo: {}, speedLvl: 0, armorLvl: 0, fuelLvl: 0, wlv: {}, shields: new Array(10).fill(0) };
      if (!p.storyLoadout.ammo) p.storyLoadout.ammo = {};
      p.storyLoadout.ammo[rw.ammoId] = Math.min(capOf(rw.ammoId), (p.storyLoadout.ammo[rw.ammoId] || 0) + rw.qty);
      changed = true;
    }
  });
  return changed;
}
function showGeneralDialog(world, kind, onDone) {
  const g = GENERALS[world];
  if (net.active || !g || !g[kind] || !g[kind].length) { if (onDone) onDone(); return; }
  $('genDlgIcon').textContent = g.icon;
  $('genDlgName').textContent = g.name;
  $('genDlgTitle').textContent = g.title;
  $('genDlgText').innerHTML = g[kind].map(p => '<p>' + esc(p) + '</p>').join('');
  const rw = kind === 'outro' ? g.reward : null;
  $('genDlgReward').style.display = rw ? '' : 'none';
  if (rw) $('genDlgReward').innerHTML = '🎁 Nová zbraň: <b>' + esc(AMMO[rw.ammoId].name) + ' ×' + rw.qty + '</b> · +' + rw.xp + ' XP';
  if (genDlgHandler) $('genDlgNext').removeEventListener('click', genDlgHandler);
  genDlgHandler = () => { hide('generalDlg'); $('genDlgNext').removeEventListener('click', genDlgHandler); genDlgHandler = null; if (onDone) onDone(); };
  $('genDlgNext').addEventListener('click', genDlgHandler);
  show('generalDlg');
}
let genDlgHandler = null;
// POZOR pre budúce úpravy kampane: postup prihláseného hráča sa odteraz ukladá v jeho PROFILE (PROF_KEY), nie pod touto
// verziovanou kľúčou - takže ho pridávanie/úprava misií už nevymaže. Nové misie preto VŽDY len PRIPÁJAJ na koniec zoznamu
// danej planéty (alebo pridaj celú novú planétu na koniec) - nikdy nevkladaj ani neprehadzuj misie v strede existujúceho
// zoznamu, lebo uložené indexy "unlocked"/"done" by sa už nezhodovali so starými misiami.
const STORY_KEY = 'ironDuelStory_v4';   // už len záložné/hosťovské úložisko (nie je prihlásený nikto) a jednorazový zdroj pri migrácii do profilu
function defaultStoryProgress() { return { unlocked: 1, done: [] }; }
function loadLegacyGlobalStoryProgress() {
  try {
    const v = JSON.parse(localStorage.getItem(STORY_KEY));
    if (v && typeof v === 'object') return { unlocked: clampInt(v.unlocked, 1, STORY_MISSIONS.length, 1), done: Array.isArray(v.done) ? v.done.map(Boolean) : [] };
  } catch (_) {}
  return null;
}
function storyProgressForNick(nick) {   // postup kampane patrí k profilu prezývky - prežije aj moje budúce zásahy do kampane
  const key = nickKey(nick);
  const p = Object.prototype.hasOwnProperty.call(profiles, key) ? profiles[key] : (profiles[key] = newProfile(nick, PALETTE[0]));
  if (!p.story) { p.story = loadLegacyGlobalStoryProgress() || defaultStoryProgress(); saveProfiles(); }   // jednorazová migrácia starého spoločného postupu
  return p.story;
}
let story = { active: false, idx: null, progress: null };
function refreshStoryProgressSource() {   // volať vždy po zmene prihlásenia hráča v slote 0 - kampaň patrí aktuálne prihlásenému hráčovi
  const nick = setup.players[0].nick;
  story.progress = nick ? storyProgressForNick(nick) : (loadLegacyGlobalStoryProgress() || defaultStoryProgress());
  if (nick) {   // hráči, čo planétu dokončili ešte pred pridaním generálov, dostanú ich darček dodatočne (bez animácie dialógu, len potichu do výzbroje)
    const p = getProfile(nick);
    if (p && catchUpWorldRewards(p)) { saveProfiles(); setTimeout(() => banner('🎖️ Generáli ti do výzbroje poslali darčeky za už dokončené planéty!', 3600), 600); }
  }
}
refreshStoryProgressSource();
function saveStoryProgress() {
  if (setup.players[0].nick) { saveProfiles(); return; }   // story.progress JE priamo profiles[key].story
  try { localStorage.setItem(STORY_KEY, JSON.stringify(story.progress)); } catch (_) {}
}
function startStoryMission(idx) {
  const m = STORY_MISSIONS[idx];
  if (!m || idx >= story.progress.unlocked) return;
  goFullscreen();
  const w = missionWorld(m);
  if (worldMissions(w)[0].i === idx) {   // prvá misia planéty - ak ešte generál nepozdravil, najprv jeho úvod, misia sa spustí až po "Pokračovať"
    const flags = ensureStoryFlags(story.progress);
    if (!flags.introSeen[w]) {
      flags.introSeen[w] = true; saveStoryProgress();
      hide('story'); hide('menu');
      showGeneralDialog(w, 'intro', () => startStoryMissionReal(idx));
      return;
    }
  }
  startStoryMissionReal(idx);
}
function startStoryMissionReal(idx) {
  const m = STORY_MISSIONS[idx];
  stopGlobeLoop();
  hide('story'); hide('dialog'); hide('generalDlg'); hide('menu'); hide('end');
  initAudio(); fixColors(); saveSetup();
  setup.terrain = m.terrain; WIN_ROUNDS = m.rounds;
  applyMapSize('normal');   // príbehové misie sú vyladené na normálnu mapu, nezávisle od toho, čo má hráč nastavené v menu
  story.active = true; story.idx = idx;
  document.body.classList.add('storymode');
  const human = Object.assign({}, setup.players[0], { bot: 0 }), used = new Set([human.color.toLowerCase()]);
  const botCfgs = m.bots.map(b => {
    const color = PALETTE.find(c => !used.has(c.toLowerCase())) || human.color;
    used.add(color.toLowerCase());
    return { name: b.name, color, nick: null, bot: b.lvl };
  });
  tanks = [makeTank(0, human), ...botCfgs.map((p, i) => makeTank(i + 1, p))];
  tanks.forEach(t => t.money = m.money);
  const prof = human.nick ? getProfile(human.nick) : null;   // munícia a vylepšenia, ktoré hráč neminul v predošlej misii, pokračujú aj sem
  if (prof && prof.storyLoadout) applyStoryLoadout(tanks[0], prof.storyLoadout);
  if (m.bonusAmmo) Object.entries(m.bonusAmmo).forEach(([k, v]) => { tanks[0].ammo[k] = Math.min(capOf(k), (tanks[0].ammo[k] || 0) + v); });   // mimozemská výzbroj darom pri prvej misii na Marse
  round = 1; lastResult = '';
  buildPads(); enterShop();
  const w = missionWorld(m), localIdx = worldMissions(w).findIndex(x => x.i === idx) + 1;
  $('shopTitle').textContent = WORLD_META[w].icon + ' ' + WORLD_META[w].name + ' · Misia ' + localIdx + '/' + worldMissions(w).length + ': ' + m.title + ' · ' + biome().icon + ' ' + biome().name;
}
function storyMissionSub(m) {
  const B = BIOMES[m.terrain];
  return B.icon + ' ' + B.name + ' · ' + (m.bots.length > 1 ? ('Boss · ' + m.bots.length + ' súperi') : ('PC ' + ['', 'ľahký', 'stredný', 'ťažký'][m.bots[0].lvl])) + ' · do ' + m.rounds + ' ' + (m.rounds === 1 ? 'víťazstva' : 'víťazstiev');
}
// ---------- 3D zemeguľa kampane (ťahaním otáčateľná, ukazuje aj uzamknuté levely) ----------
const GLOBE = { world: 'earth', yaw: .6, pitch: -.25, vYaw: .08, vPitch: 0, zoom: 1, dragging: false, autoSpin: true, raf: null, canvas: null, ctx: null, pins: [], W: 0, H: 0, R: 0, stars: null, cloudDrift: 0 };
// svetelný model každej planéty: pevný smer "slnka" (nezávislý od rotácie gule) vytvára putujúcu hranicu dňa/noci pri otáčaní;
// ambient = jas nočnej strany, term = šírka prechodu (ostrý na Mesiaci bez atmosféry, mäkký na Zemi), atmo/atmoR = farba a dosah žiary, sheen = lesk oceánov/ľadu, rim = okrajové stmavnutie
const WORLD_LIGHT = {
  earth: { dx: .55, dy: .33, dz: .76, ambient: .22, term: .32, atmo: 'rgba(90,155,255,.35)', atmoR: 1.3, sheen: .22, rim: .35, rimCol: '0,0,0' },
  moon:  { dx: .6, dy: .18, dz: .78, ambient: .035, term: .05, atmo: 'rgba(140,140,160,.07)', atmoR: 1.08, sheen: .03, rim: .55, rimCol: '0,0,0' },
  mars:  { dx: .52, dy: .28, dz: .81, ambient: .14, term: .16, atmo: 'rgba(224,150,96,.26)', atmoR: 1.2, sheen: .07, rim: .4, rimCol: '40,14,4' },
  venus: { dx: .5, dy: .3, dz: .8, ambient: .5, term: .7, atmo: 'rgba(232,184,74,.55)', atmoR: 1.42, sheen: .04, rim: .25, rimCol: '60,30,0' },   // hustý mrak rozptyľuje svetlo takmer rovnomerne - vysoký ambient, veľmi mäkký/široký terminátor
};
// reálne AI-generované textúry (Hugging Face) pre glóbus kampane - vzorkujú sa podľa lat/lon namiesto procedurálneho farbenia;
// Zem = skutočná plochá mapa sveta, ostatné planéty = bezšvová (tileable) fotografia povrchu "z vtáčej perspektívy" (model FLUX.1-schnell odmieta kresliť
// Mesiac/Mars/Venušu ako plochú mapu, vždy ich vykreslí ako guľu - preto sa tu použila téma "seamless texture" miesto "planet map", ktorá spoľahlivo vyjde plocho).
// ak sa obrázok nenačíta (pomalé pripojenie, chýbajúci súbor a pod.), globeCellColor ticho ostane na procedurálnom farbení ako predtým
const PLANET_TEX = {
  earth: { img: new Image(), loaded: false, data: null, w: 0, h: 0, src: 'assets/planets/earth.png' },
  moon:  { img: new Image(), loaded: false, data: null, w: 0, h: 0, src: 'assets/planets/moon.jpg' },
  mars:  { img: new Image(), loaded: false, data: null, w: 0, h: 0, src: 'assets/planets/mars.jpg' },
  venus: { img: new Image(), loaded: false, data: null, w: 0, h: 0, src: 'assets/planets/venus.jpg' },
};
Object.keys(PLANET_TEX).forEach(world => {
  const t = PLANET_TEX[world];
  t.img.onload = () => {
    try {
      const c = document.createElement('canvas'); c.width = t.img.naturalWidth; c.height = t.img.naturalHeight;
      const cx2 = c.getContext('2d'); cx2.drawImage(t.img, 0, 0);
      t.data = cx2.getImageData(0, 0, c.width, c.height).data; t.w = c.width; t.h = c.height; t.loaded = true;
      GLOBE_CELL_CACHE.clear();   // ak sa textúra načíta až po prvom vykreslení glóbusu, vynúti prekreslenie s reálnymi farbami
    } catch (e) { /* CORS/canvas chyba pri čítaní pixelov - ticho ostane procedurálne */ }
  };
  t.img.src = t.src;
});
function planetTexColor(world, latDeg, lonDeg) {   // RGB pole z reálnej textúry na danej planéte, alebo null ak sa ešte nenačítala
  const t = PLANET_TEX[world]; if (!t || !t.loaded) return null;
  const u = ((lonDeg + 180) / 360 % 1 + 1) % 1, v = Math.max(0, Math.min(1, (90 - latDeg) / 180));
  const px = Math.min(t.w - 1, Math.max(0, Math.floor(u * t.w)));
  const py = Math.min(t.h - 1, Math.max(0, Math.floor(v * t.h)));
  const i = (py * t.w + px) * 4;
  return [t.data[i], t.data[i + 1], t.data[i + 2]];
}
function globeBump(latDeg, lonDeg) {   // pseudonáhodné "krátery"/hrbole pre Mesiac a Mars - mimo zemského biómového tieňovania
  // dve mierky kráterov (veľké riedke + malé husté) namiesto jednej - povrch pôsobí hustejšie posiaty a menej "dierovaný"
  const big = hash2(Math.round(latDeg * 1.7) + 11, Math.round(lonDeg * 1.7) + 29);
  const small = hash2(Math.round(latDeg * 4.3) - 7, Math.round(lonDeg * 4.3) + 61);
  let bump = big > .88 ? -.4 : big > .81 ? .24 : 0;
  if (small > .9) bump += small > .96 ? -.22 : .14;   // jemnejšie drobné krátery navrch
  return bump;
}
// kontinenty podľa biómu (osobitne pre každú planétu kampane), nech sú misie rovnakého terénu zoskupené na vlastnej časti glóbusu
const GLOBE_ANCHORS_BY_WORLD = {
  earth: {
    winter:    { lat: 80, lon: 20,   r: 34 },   // polárna ľadová oblasť
    mountains: { lat: 18, lon: 108,  r: 30 },
    desert:    { lat: -6, lon: -58,  r: 27 },
    ruins:     { lat: 42, lon: -98,  r: 24 },
    canyon:    { lat: -34, lon: 158, r: 25 },
    beach:     { lat: 4,  lon: 172,  r: 22 },
    volcano:   { lat: -58, lon: -18, r: 25 },   // juh, "ohnivý kruh"
    forest:    { lat: 50, lon: -42,  r: 21 },
    swamp:     { lat: -15, lon: 62,  r: 20 },
    meadow:    { lat: 26, lon: -160, r: 20 },
  },
  moon: { moon: { lat: 10, lon: 0, r: 200 } },   // jediný bióm pokrýva prakticky celú guľu
  mars: { mars: { lat: 10, lon: 0, r: 200 } },
  venus: { venus: { lat: 10, lon: 0, r: 200 } },
};
function hash2(a, b) { const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return s - Math.floor(s); }
function fbm2(a, b, oct) {   // niekoľko vrstiev hash2 šumu na rôznej mierke spolu ("fractal brownian motion") - oveľa organickejšie/detailnejšie tvary (pobrežia, krátery, terén) než jediný hash
  let v = 0, amp = 0.5, freq = 1, norm = 0;
  for (let i = 0; i < oct; i++) { v += amp * hash2(a * freq + i * 101, b * freq - i * 57); norm += amp; amp *= 0.5; freq *= 2.17; }
  return v / norm;
}
function sphericalOffset(latDeg, lonDeg, bearingDeg, distDeg) {   // bod vo zvolenej vzdialenosti/smere od kotvy (veľkokruh)
  const lat0 = latDeg * Math.PI / 180, lon0 = lonDeg * Math.PI / 180, br = bearingDeg * Math.PI / 180, d = distDeg * Math.PI / 180;
  const lat = Math.asin(Math.sin(lat0) * Math.cos(d) + Math.cos(lat0) * Math.sin(d) * Math.cos(br));
  const lon = lon0 + Math.atan2(Math.sin(br) * Math.sin(d) * Math.cos(lat0), Math.cos(d) - Math.sin(lat0) * Math.sin(lat));
  return { lat: lat * 180 / Math.PI, lon: lon * 180 / Math.PI };
}
function worldMissions(w) { return STORY_MISSIONS.map((m, i) => ({ m, i })).filter(({ m }) => missionWorld(m) === w); }   // {m,i} s GLOBÁLNYM indexom i (do story.progress)
function worldLocalNum(i) { const w = missionWorld(STORY_MISSIONS[i]); return worldMissions(w).findIndex(x => x.i === i) + 1; }   // poradie misie v rámci jej planéty (1..20/10/10), nie globálny index
function worldUnlocked(w) { const wm = worldMissions(w); return !wm.length || wm[0].i < story.progress.unlocked; }
function profileWorldUnlocked(prof, w) { const wm = worldMissions(w); return !wm.length || wm[0].i < (prof.story ? prof.story.unlocked : 1); }   // rovnaké ako worldUnlocked(), ale pre ľubovoľný profil (nielen aktuálne zobrazenú kampaň)

// ---------- odznaky (achievementy) - uložené v profile (profiles[key].achievements), zrkadlené aj do Supabase ako pri zvyšku profilu ----------
const ACHIEVEMENTS = [
  { id: 'prve_vitazstvo', icon: '🥇', title: 'Prvé víťazstvo', desc: 'Vyhraj svoj prvý zápas.', check: p => p.wins >= 1 },
  { id: 'desiatka', icon: '🏅', title: 'Desiatka', desc: 'Vyhraj 10 zápasov.', check: p => p.wins >= 10 },
  { id: 'veteran', icon: '🎖️', title: 'Veterán', desc: 'Odohraj 25 zápasov.', check: p => p.matches >= 25 },
  { id: 'nicitel', icon: '💥', title: 'Ničiteľ', desc: 'Znič 50 nepriateľských tankov.', check: p => p.kills >= 50 },
  { id: 'elitny_nicitel', icon: '☠️', title: 'Elitný ničiteľ', desc: 'Znič 200 nepriateľských tankov.', check: p => p.kills >= 200 },
  { id: 'lv5', icon: '⭐', title: 'Hodnosť LV 5', desc: 'Dosiahni veliteľskú hodnosť 5.', check: p => (p.bestLevel || 1) >= 5 },
  { id: 'lv10', icon: '🌟', title: 'Hodnosť LV 10', desc: 'Dosiahni veliteľskú hodnosť 10.', check: p => (p.bestLevel || 1) >= 10 },
  { id: 'lv20', icon: '💫', title: 'Hodnosť LV 20', desc: 'Dosiahni veliteľskú hodnosť 20.', check: p => (p.bestLevel || 1) >= 20 },
  { id: 'zem_dobyta', icon: '🌍', title: 'Zem dobytá', desc: 'Dokonči kampaň na Zemi.', check: p => profileWorldUnlocked(p, 'moon') },
  { id: 'mesiac_dobyty', icon: '🌑', title: 'Mesiac dobytý', desc: 'Dokonči kampaň na Mesiaci.', check: p => profileWorldUnlocked(p, 'mars') },
  { id: 'mars_dobyty', icon: '🔴', title: 'Mars dobytý', desc: 'Dokonči kampaň na Marse.', check: p => profileWorldUnlocked(p, 'venus') },
  { id: 'cela_kampan', icon: '🏆', title: 'Veliteľ slnečnej sústavy', desc: 'Dokonči celú kampaň - Zem, Mesiac, Mars aj Venušu.', check: p => !!p.story && p.story.unlocked >= STORY_MISSIONS.length },
  { id: 'vytrvalec', icon: '⏱️', title: 'Vytrvalec', desc: 'Odohraj 150 kôl.', check: p => p.rounds >= 150 },
];
function checkAchievements(nick) {   // zavolá sa po každej zmene štatistík - potichu odomkne nové odznaky a ukáže banner
  if (!nick) return;
  const p = profiles[nickKey(nick)]; if (!p) return;
  if (!Array.isArray(p.achievements)) p.achievements = [];
  const have = new Set(p.achievements), newly = [];
  ACHIEVEMENTS.forEach(a => { if (!have.has(a.id) && a.check(p)) { p.achievements.push(a.id); have.add(a.id); newly.push(a); } });
  if (newly.length) {
    saveProfiles();
    newly.forEach((a, i) => setTimeout(() => banner(a.icon + ' Nový odznak: ' + a.title, 3200), 1400 + i * 1900));
  }
}
function globeMissionPts() {   // rozmiestnenie misií aktuálnej planéty podľa biómových "kontinentov", nie náhodne po guli
  const anchors = GLOBE_ANCHORS_BY_WORLD[GLOBE.world], perBiome = {};
  return worldMissions(GLOBE.world).map(({ m, i }) => {
    const key = anchors[m.terrain] ? m.terrain : Object.keys(anchors)[0], a = anchors[key];
    const j = perBiome[key] = (perBiome[key] || 0);
    perBiome[key]++;
    const bearing = (j * 137.508) % 360, dist = a.r * (j === 0 ? 0.08 : 0.42);
    const pos = sphericalOffset(a.lat, a.lon, bearing, dist);
    return { m, i, lat: pos.lat * Math.PI / 180, lon: pos.lon * Math.PI / 180 };
  });
}
function globeRotate(p) {   // premietne bod gule (lat/lon) do rotovaného 3D priestoru (yaw okolo Y, potom pitch okolo X)
  const x = Math.cos(p.lat) * Math.sin(p.lon + GLOBE.yaw);
  const y0 = Math.sin(p.lat), z0 = Math.cos(p.lat) * Math.cos(p.lon + GLOBE.yaw);
  const cp = Math.cos(GLOBE.pitch), sp = Math.sin(GLOBE.pitch);
  return { x, y: y0 * cp - z0 * sp, z: y0 * sp + z0 * cp };
}
function globeResize() {
  const wrap = $('globeWrap'); if (!wrap || !GLOBE.canvas) return;
  const r = wrap.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
  GLOBE.W = Math.max(1, Math.round(r.width)); GLOBE.H = Math.max(1, Math.round(r.height));
  GLOBE.canvas.width = GLOBE.W * dpr; GLOBE.canvas.height = GLOBE.H * dpr;
  GLOBE.canvas.style.width = GLOBE.W + 'px'; GLOBE.canvas.style.height = GLOBE.H + 'px';
  GLOBE.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  GLOBE.R = Math.min(GLOBE.W, GLOBE.H) * .38 * GLOBE.zoom;
  if (!GLOBE.stars) GLOBE.stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + .3, a: Math.random() * .6 + .3 }));
}
function globeTerrainAt(latDeg, lonDeg) {   // ktorý biómový "kontinent" (ak žiadny, oceán) na aktuálnej planéte, s roztrhaným pobrežím cez šum
  const anchors = GLOBE_ANCHORS_BY_WORLD[GLOBE.world];
  const soleKeys = Object.keys(anchors);
  if (soleKeys.length === 1) return soleKeys[0];   // Mesiac/Mars: jediný povrch pokrýva celú guľu, žiadny "oceán"
  let best = null, bestRatio = Infinity;
  for (const key in anchors) {
    const a = anchors[key];
    let dLon = Math.abs(lonDeg - a.lon); if (dLon > 180) dLon = 360 - dLon;
    const dLat = latDeg - a.lat, ang = Math.sqrt(dLat * dLat + dLon * dLon * Math.pow(Math.cos(latDeg * Math.PI / 180), 2));
    const jag = 0.74 + 0.5 * fbm2(latDeg / 6, lonDeg / 6, 3);   // 3 vrstvy šumu namiesto jednej - menej "kruhové" kontinenty, viac fraktálových zálivov/polostrovov
    const ratio = ang / (a.r * jag);
    if (ratio < bestRatio) { bestRatio = ratio; best = key; }
  }
  return bestRatio <= 1 ? best : null;
}
const GLOBE_CELL_CACHE = new Map();
function globeCellColor(latDeg, lonDeg) {
  const ck = Math.round(latDeg) + ',' + Math.round(lonDeg);
  if (GLOBE_CELL_CACHE.has(ck)) return GLOBE_CELL_CACHE.get(ck);
  const key = globeTerrainAt(latDeg, lonDeg);
  const n = fbm2(latDeg / 3, lonDeg / 3, 3);   // 3-vrstvový šum namiesto jedného hash-u - terén pôsobí zrnitejšie/detailnejšie, menej "flekaté"
  let col;
  if (key) {
    const g = BIOMES[key].ground;
    col = n > .66 ? g[0] : n > .33 ? g[1] : g[2];
  } else {
    const depth = .35 + .5 * fbm2(latDeg / 5 + 50, lonDeg / 5 + 50, 2);
    col = depth > .6 ? '#123a68' : depth > .35 ? '#0c2a50' : '#081c38';
  }
  if (GLOBE.world === 'earth' && Math.abs(latDeg) > 80) col = n > .5 ? '#eef6ff' : '#dcebfb';   // trvalé ľadové čiapky na póloch (len Zem)
  if (GLOBE.world === 'mars' && Math.abs(latDeg) > 68) {   // polárne čiapky zo suchého ľadu (len Mars) - svetlejšie a menej ostro ohraničené než zemské
    const capN = fbm2(latDeg / 4 + 200, lonDeg / 4 + 200, 2), edge = (Math.abs(latDeg) - 68) / 22 + capN * .4 - .2;
    if (edge > .15) col = capN > .5 ? '#fdeee0' : '#f0d8c4';
  }
  if (GLOBE.world === 'venus') {   // husté prúdiace mraky v pásoch podľa šírky (super-rotujúca atmosféra) namiesto jednoliatej farby
    const band = Math.sin(latDeg * Math.PI / 180 * 5 + fbm2(lonDeg / 10, 0, 2) * 3) * .5 + .5;
    const g = BIOMES.venus.ground, mix = Math.max(0, Math.min(1, band * .6 + n * .4));
    col = mix > .66 ? g[0] : mix > .33 ? g[1] : g[2];
  }
  GLOBE_CELL_CACHE.set(ck, col);
  return col;
}
function hex2rgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function drawGlobe() {
  const ctx = GLOBE.ctx; if (!ctx || !GLOBE.W) return;
  const cx = GLOBE.W / 2, cy = GLOBE.H / 2, R = GLOBE.R;
  ctx.clearRect(0, 0, GLOBE.W, GLOBE.H);
  ctx.save();
  GLOBE.stars.forEach(s => { ctx.globalAlpha = s.a; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x * GLOBE.W, s.y * GLOBE.H, s.r, 0, 7); ctx.fill(); });
  ctx.restore();
  const WL = WORLD_LIGHT[GLOBE.world] || WORLD_LIGHT.earth;
  const glow = ctx.createRadialGradient(cx, cy, R * .92, cx, cy, R * WL.atmoR);
  glow.addColorStop(0, WL.atmo); glow.addColorStop(1, WL.atmo.replace(/[\d.]+\)$/, '0)'));
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * WL.atmoR, 0, 7); ctx.fill();
  ctx.save();   // orezanie na kruh gule, nech sú rohy políčok terénu čisté
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
  ctx.fillStyle = '#081634'; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
  const latStep = quality >= 2 ? 5 : quality === 1 ? 7 : 9;   // jemnejšie políčka pri vyššej kvalite grafiky (detailnejšia guľa), hrubšie na slabších zariadeniach kvôli výkonu
  for (let la = -90 + latStep / 2; la < 90; la += latStep) {
    const lonN = Math.max(10, Math.round(46 * Math.cos(la * Math.PI / 180)));
    const lonStep = 360 / lonN;
    for (let lo = -180 + lonStep / 2; lo < 180; lo += lonStep) {
      const corners = [
        { lat: (la - latStep / 2) * Math.PI / 180, lon: (lo - lonStep / 2) * Math.PI / 180 },
        { lat: (la - latStep / 2) * Math.PI / 180, lon: (lo + lonStep / 2) * Math.PI / 180 },
        { lat: (la + latStep / 2) * Math.PI / 180, lon: (lo + lonStep / 2) * Math.PI / 180 },
        { lat: (la + latStep / 2) * Math.PI / 180, lon: (lo - lonStep / 2) * Math.PI / 180 },
      ].map(globeRotate);
      const avgZ = (corners[0].z + corners[1].z + corners[2].z + corners[3].z) / 4;
      if (avgZ < -.04) continue;
      const avgX = (corners[0].x + corners[1].x + corners[2].x + corners[3].x) / 4;
      const avgY = (corners[0].y + corners[1].y + corners[2].y + corners[3].y) / 4;
      const texRGB = planetTexColor(GLOBE.world, la, lo);
      let col;
      if (texRGB) {
        col = texRGB;
        if (GLOBE.world === 'earth' && Math.abs(la) > 78) {   // textúra spoľahlivo nepokrýva samotné póly - preleješ ich ľadovou čiapkou ako predtým
          const n = fbm2(la / 3, lo / 3, 3), icy = n > .5 ? [238, 246, 255] : [220, 235, 251];
          const m = Math.min(1, (Math.abs(la) - 78) / 10);
          col = [col[0] * (1 - m) + icy[0] * m, col[1] * (1 - m) + icy[1] * m, col[2] * (1 - m) + icy[2] * m];
        }
      } else {
        col = hex2rgb(globeCellColor(la, lo));
      }
      // osvetlenie podľa pevného smeru "slnka" (nie podľa kamery) - pri rotácii gule po nej putuje hranica dňa a noci
      const ndotl = avgX * WL.dx + avgY * WL.dy + avgZ * WL.dz;
      let t = Math.max(0, Math.min(1, (ndotl + WL.term) / (2 * WL.term))); t = t * t * (3 - 2 * t);
      let light = WL.ambient + (1 - WL.ambient) * t;
      if (GLOBE.world !== 'earth') light *= 1 + globeBump(la, lo);   // krátery: tmavé dná, svetlé okraje
      light = Math.max(.02, Math.min(1.25, light));
      ctx.fillStyle = 'rgb(' + Math.min(255, col[0] * light | 0) + ',' + Math.min(255, col[1] * light | 0) + ',' + Math.min(255, col[2] * light | 0) + ')';
      ctx.beginPath();
      ctx.moveTo(cx + corners[0].x * R, cy - corners[0].y * R);
      for (let k = 1; k < 4; k++) ctx.lineTo(cx + corners[k].x * R, cy - corners[k].y * R);
      ctx.closePath(); ctx.fill();
    }
  }
  if (GLOBE.world === 'earth') {   // priesvitná vrstva mrakov, unáša sa po inej dráhe ako povrch (paralaxa)
    const cLatStep = 13;
    for (let la = -84 + cLatStep / 2; la < 90; la += cLatStep) {
      const lonN = Math.max(6, Math.round(22 * Math.cos(la * Math.PI / 180))), lonStep = 360 / lonN;
      for (let lo = -180 + lonStep / 2; lo < 180; lo += lonStep) {
        const cn = hash2(Math.round(la / cLatStep) + 7, Math.round((lo + GLOBE.cloudDrift) / lonStep) + 91);
        if (cn < .58) continue;
        const p = globeRotate({ lat: la * Math.PI / 180, lon: (lo + GLOBE.cloudDrift) * Math.PI / 180 });
        if (p.z < -.08) continue;
        const sun = Math.max(.3, Math.min(1, .5 + (p.x * WL.dx + p.y * WL.dy + p.z * WL.dz)));
        const rr = R * (.05 + .05 * (cn - .58));
        ctx.globalAlpha = (cn - .58) * 1.1 * (.35 + .5 * sun);
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(cx + p.x * R, cy - p.y * R, rr, 0, 7); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }
  ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(10,16,32,.18)';
  for (let g = 0; g < 12; g++) {   // poludníky (jemné, len na odlíšenie zakrivenia)
    const lon0 = g * Math.PI / 6; ctx.beginPath(); let on = false;
    for (let la = -90; la <= 90; la += 4) {
      const p = globeRotate({ lat: la * Math.PI / 180, lon: lon0 });
      if (p.z < -.08) { on = false; continue; }
      const x = cx + p.x * R, y = cy - p.y * R;
      on ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), on = true);
    }
    ctx.stroke();
  }
  const unlocked = GLOBE.pins.filter(p => p.i < story.progress.unlocked);
  ctx.lineWidth = 2;
  for (let k = 0; k < unlocked.length - 1; k++) {   // cesta medzi odomknutými misiami, tlmená na odvrátenej strane
    const a = globeRotate(unlocked[k]), b = globeRotate(unlocked[k + 1]);
    let mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, mz = (a.z + b.z) / 2;
    const len = Math.hypot(mx, my, mz) || 1; mx /= len; my /= len; mz /= len;
    const vis = Math.min(a.z, b.z, mz);
    ctx.strokeStyle = 'rgba(255,213,74,' + Math.max(0, .12 + vis * .6).toFixed(2) + ')';
    ctx.beginPath();
    ctx.moveTo(cx + a.x * R, cy - a.y * R);
    ctx.quadraticCurveTo(cx + mx * R * 1.08, cy - my * R * 1.08, cx + b.x * R, cy - b.y * R);
    ctx.stroke();
  }
  ctx.restore();
  const sheen = ctx.createRadialGradient(cx - R * .4, cy - R * .45, 0, cx - R * .4, cy - R * .45, R * 1.1);
  sheen.addColorStop(0, 'rgba(255,255,255,' + WL.sheen.toFixed(2) + ')'); sheen.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sheen; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
  const rim = ctx.createRadialGradient(cx, cy, R * .88, cx, cy, R);
  rim.addColorStop(0, 'rgba(' + WL.rimCol + ',0)'); rim.addColorStop(1, 'rgba(' + WL.rimCol + ',' + WL.rim.toFixed(2) + ')');
  ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
}
function layoutGlobePins() {
  const cx = GLOBE.W / 2, cy = GLOBE.H / 2, R = GLOBE.R;
  GLOBE.pins.forEach(p => {
    const rp = globeRotate(p), x = cx + rp.x * R, y = cy - rp.y * R, front = rp.z > -.12;
    const scale = .6 + .5 * Math.max(0, (rp.z + 1) / 2), opacity = front ? Math.min(1, .35 + (rp.z + 1) / 2) : 0;
    p.el.style.transform = 'translate(-50%,-50%) translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + scale.toFixed(2) + ')';
    p.el.style.opacity = opacity.toFixed(2);
    p.el.style.zIndex = String(1000 + Math.round(rp.z * 100));
    p.el.style.pointerEvents = front ? 'auto' : 'none';
  });
}
function globeFrame() {
  if (!GLOBE.dragging) {
    GLOBE.yaw += GLOBE.vYaw; GLOBE.pitch = Math.max(-1.1, Math.min(1.1, GLOBE.pitch + GLOBE.vPitch));
    GLOBE.vYaw *= .96; GLOBE.vPitch *= .9;
    if (GLOBE.autoSpin && Math.abs(GLOBE.vYaw) < .0009) GLOBE.vYaw = .0009;
    else if (!GLOBE.autoSpin && Math.abs(GLOBE.vYaw) < .0015) GLOBE.vYaw = 0;
  }
  GLOBE.cloudDrift += .012;   // oblaky sa posúvajú po vlastnej (pomalšej) dráhe nezávisle od otáčania Zeme
  drawGlobe(); layoutGlobePins();
  GLOBE.raf = requestAnimationFrame(globeFrame);
}
function startGlobeLoop() { if (GLOBE.raf) return; globeResize(); globeFrame(); }
function stopGlobeLoop() { if (GLOBE.raf) { cancelAnimationFrame(GLOBE.raf); GLOBE.raf = null; } }
function initGlobeInput() {
  const wrap = $('globeWrap');
  let active = null, lastX = 0, lastY = 0, lastT = 0, vhist = [];
  wrap.addEventListener('pointerdown', e => {
    if (e.target.closest('.missionPin')) return;   // necháva kliknutie na pine prejsť bez spustenia ťahania
    active = e.pointerId; GLOBE.dragging = true; GLOBE.autoSpin = false;
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now(); vhist = [];
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', e => {
    if (active === null || e.pointerId !== active) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY, now = performance.now(), dt = Math.max(1, now - lastT);
    GLOBE.yaw += dx * .006; GLOBE.pitch = Math.max(-1.1, Math.min(1.1, GLOBE.pitch + dy * .006));
    vhist.push({ vy: dx * .006 / dt * 16, vp: dy * .006 / dt * 16 }); if (vhist.length > 6) vhist.shift();
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  });
  const onUp = e => {
    if (active === null || e.pointerId !== active) return;
    active = null; GLOBE.dragging = false;
    if (vhist.length) {
      const s = vhist.reduce((a, v) => ({ vy: a.vy + v.vy, vp: a.vp + v.vp }), { vy: 0, vp: 0 });
      GLOBE.vYaw = s.vy / vhist.length; GLOBE.vPitch = s.vp / vhist.length;
    }
  };
  wrap.addEventListener('pointerup', onUp); wrap.addEventListener('pointercancel', onUp);
  wrap.addEventListener('wheel', e => { e.preventDefault(); GLOBE.zoom = Math.max(.6, Math.min(1.6, GLOBE.zoom * (1 - e.deltaY * .001))); globeResize(); }, { passive: false });
  $('globeReset').addEventListener('click', () => { GLOBE.yaw = .6; GLOBE.pitch = -.25; GLOBE.vYaw = .08; GLOBE.vPitch = 0; GLOBE.zoom = 1; GLOBE.autoSpin = true; globeResize(); });
}
function focusFrontierWorld() {   // pri (znova) otvorení kampane naskoč na planétu, kde je ďalšia misia
  GLOBE.world = missionWorld(STORY_MISSIONS[clampInt(story.progress.unlocked - 1, 0, STORY_MISSIONS.length - 1, 0)]);
}
function switchGlobeWorld(w) {
  if (w === GLOBE.world || !worldUnlocked(w)) return;
  GLOBE.world = w; GLOBE_CELL_CACHE.clear();
  GLOBE.vYaw = .0009; GLOBE.vPitch = 0; GLOBE.autoSpin = true;   // yaw/pitch nastaví renderStoryList priamym natočením na ďalšiu misiu
  renderStoryList();
}
function renderStoryList() {
  const wrap = $('storyList');
  if (!GLOBE.canvas) {
    wrap.innerHTML = '<div class="worldTabs" id="worldTabs"></div><div class="globeWrap" id="globeWrap"><canvas id="globeCanvas"></canvas><div class="globePins" id="globePins"></div>' +
      '<div class="globeHint">🖱️ Ťahaj a otáčaj glóbus · 🔒 uzamknutá misia</div>' +
      '<button type="button" class="globeReset" id="globeReset" aria-label="Resetovať pohľad">⟲</button></div>';
    GLOBE.canvas = $('globeCanvas'); GLOBE.ctx = GLOBE.canvas.getContext('2d');
    initGlobeInput();
    if (window.ResizeObserver) new ResizeObserver(() => globeResize()).observe($('globeWrap'));   // vždy prepočíta podľa skutočnej veľkosti (rieši to, že pri prvom zobrazení ešte nemusí byť layout hotový)
    $('worldTabs').addEventListener('click', e => { const b = e.target.closest('[data-world]'); if (b && !b.disabled) switchGlobeWorld(b.dataset.world); });
  }
  $('worldTabs').innerHTML = ['earth', 'moon', 'mars', 'venus'].map(w => {
    const unlocked = worldUnlocked(w), on = w === GLOBE.world;
    return '<button type="button" class="worldTab' + (on ? ' on' : '') + (unlocked ? '' : ' locked') + '" data-world="' + w + '"' + (unlocked ? '' : ' disabled') + '>' +
      WORLD_META[w].icon + ' ' + WORLD_META[w].name + (unlocked ? '' : ' 🔒') + '</button>';
  }).join('');
  const pinsHost = $('globePins'); pinsHost.innerHTML = '';
  GLOBE.pins = globeMissionPts().map(p => {
    const unlocked = p.i < story.progress.unlocked, done = !!story.progress.done[p.i];
    const pc = done ? '#5fd35f' : unlocked ? '#ffd54a' : '#555';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'missionPin' + (unlocked ? '' : ' locked');
    btn.style.setProperty('--pc', pc); btn.setAttribute('aria-label', p.m.title);
    if (unlocked) btn.dataset.mission = p.i;
    btn.innerHTML = (done ? '<span class="chk">✓</span>' : '') + '<span class="num">' + (unlocked ? worldLocalNum(p.i) : '🔒') + '</span><span class="ic">' + BIOMES[p.m.terrain].icon + '</span>';
    pinsHost.appendChild(btn); p.el = btn; return p;
  });
  const frontier = clampInt(story.progress.unlocked - 1, 0, STORY_MISSIONS.length - 1, 0);
  const target = GLOBE.pins.find(p => p.i === frontier) || GLOBE.pins[GLOBE.pins.length - 1] || GLOBE.pins[0];
  if (target) {
    $('storyDetail').innerHTML = '<b>' + worldLocalNum(target.i) + '. ' + esc(target.m.title) + '</b><br>' + esc(storyMissionSub(target.m)) + '<br>' + esc(target.m.text);
    GLOBE.yaw = -target.lon; GLOBE.pitch = Math.max(-1.1, Math.min(1.1, target.lat));   // glóbus sa hneď natočí na ďalšiu misiu, nech ju netreba hľadať ťahaním
  }
  startGlobeLoop();
}
$('homeStoryBtn').addEventListener('click', () => { hide('home'); focusFrontierWorld(); renderStoryList(); show('story'); });
$('storyClose').addEventListener('click', () => { stopGlobeLoop(); hide('story'); show('home'); });
function showStoryDetail(i) {
  const m = STORY_MISSIONS[i];
  $('storyDetail').innerHTML = '<b>' + worldLocalNum(i) + '. ' + esc(m.title) + '</b><br>' + esc(storyMissionSub(m)) + '<br>' + esc(m.text);
}
$('storyList').addEventListener('click', e => {
  const r = e.target.closest('[data-mission]'); if (!r) return;
  const i = +r.dataset.mission, m = STORY_MISSIONS[i];
  showStoryDetail(i);
  ask(m.text + ' Spustiť misiu "' + m.title + '"?', () => startStoryMission(i));
});
$('storyList').addEventListener('mouseover', e => {
  const r = e.target.closest('[data-mission]'); if (!r) return;
  showStoryDetail(+r.dataset.mission);
});
$('storyNextBtn').addEventListener('click', () => startStoryMission(story.idx + 1));
$('storyRetryBtn').addEventListener('click', () => startStoryMission(story.idx));
$('storyBackBtn').addEventListener('click', () => { hide('end'); focusFrontierWorld(); renderStoryList(); show('story'); });

// ---------- online multiplayer (2-4 zariadení, izba so slotmi) ----------
// Model: presne jedno zariadenie je vždy "na ťahu" (aj v obchode) a jediné mení stav;
// ostatné iba prijímajú a vykresľujú posledný synchronizovaný stav. Žiadne dve zariadenia
// nikdy nesimulujú fyziku súčasne, takže sa nemôže nič rozísť.
let dbCap = null, dbCapTried = false;
const net = { active: false, spectator: false, code: null, myIdx: 0, maxN: 2, players: [], shopStep: 0, unsub: null, busy: false, queued: false, err: '' };
let netLiveTimer = 0;   // throttle pre priebežné publikovanie mierenia/letu strely počas ťahu (nie len na začiatku/konci)
async function ensureDb() {
  if (dbCap || dbCapTried) return dbCap;
  dbCapTried = true;
  try {
    if (window.__firestoreDb) { dbCap = window.__firestoreDb; }   // vlastný web hosting (Firebase)
    else if (window.claude && window.claude.use) { dbCap = await window.claude.use('db'); }   // Claude Artifact
  } catch (_) { dbCap = null; }
  return dbCap;
}
ensureDb();
function netIsMine() {
  if (!net.active) return true;
  if (state === 'shop') return net.myIdx === net.shopStep;
  if (state === 'play' || state === 'roundEnd') return turnIdx === net.myIdx;
  return true;
}
function netJoinedCount() { return net.players.filter(p => p && p.name).length; }
function slotsToArray(slots, maxN) { return Array.from({ length: maxN }, (_, i) => (slots && slots[i]) || null); }
function genRoomCode() { const AB = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let s = ''; for (let i = 0; i < 5; i++) s += AB[Math.floor(Math.random() * AB.length)]; return s; }
function serializeTank(t) {
  return {
    id: t.id, color: t.color, name: t.name, nick: t.nick, kills: t.kills || 0, money: t.money,
    ammo: Object.fromEntries(ORDER.map(k => [k, t.ammo[k] === Infinity ? 'inf' : t.ammo[k]])),
    bot: t.bot, speedLvl: t.speedLvl, armorLvl: t.armorLvl, fuelLvl: t.fuelLvl, wlv: Object.assign({}, t.wlv),
    wins: t.wins, streak: t.streak, level: t.level, xp: t.xp, shields: t.shields.slice(), shT: t.shT, shieldMax: t.shieldMax,
    fuel: t.fuel, rep: Object.assign({}, t.rep), repLast: Object.assign({}, t.repLast),
    x: t.x, y: t.y, vx: t.vx, power: t.power, tilt: t.tilt, face: t.face, ang: t.ang, hp: t.hp, shield: t.shield, sel: t.sel,
    dead: !!t.dead, fired: !!t.fired, stun: !!t.stun, questId: t.quest ? t.quest.id : null, questDone: !!t.questDone, tookDmg: !!t.tookDmg,
  };
}
function rehydrateTank(d) {
  const t = makeTank(d.id, { name: d.name, color: d.color, nick: d.nick, bot: d.bot | 0 });
  Object.assign(t, d);
  t.ammo = {}; ORDER.forEach(k => { t.ammo[k] = d.ammo[k] === 'inf' ? Infinity : (d.ammo[k] || 0); });
  t.wlv = Object.assign({}, d.wlv); t.shields = (d.shields || new Array(10).fill(0)).slice();
  t.quest = d.questId ? QUESTS.find(q => q.id === d.questId) : null;
  return t;
}
function serializeState() {
  return {
    biomeKey, worldW: WORLD_W, ground: Array.from(ground),
    obstacles: obstacles.map(o => ({ x: o.x, w: o.w, base: o.base, h: o.h, steel: o.steel, hp: o.hp, maxHp: o.maxHp || (o.steel ? 260 : 80), seed: o.seed })),
    trees: trees.map(tr => ({ x: tr.x, y0: tr.y0, h: tr.h, w: tr.w })),
    wind, gustPhase, round, winRounds: WIN_ROUNDS, state, turnIdx, turnPhase, turnTimer, shopTimer,
    ready: ready.slice(), lastResult, shopStep: net.shopStep, tanks: tanks.map(serializeTank),
    projectiles: projectiles.map(p => ({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10, type: p.type })),
  };
}
let netLastBiome = null;
function applyState(d) {
  WORLD_W = d.worldW || W;   // musí byť nastavené PRED genArena(), nech si pole terénu aj vrstvy vyrobí v správnej veľkosti
  if (netLastBiome !== d.biomeKey) { genArena(d.biomeKey); netLastBiome = d.biomeKey; }
  if (ground.length !== d.ground.length) { WORLD_W = d.ground.length - 1; mkWorldLayers(); }   // poistka pre nesúlad veľkosti (napr. starý klient)
  ground.set(d.ground); obstacles = d.obstacles; trees = d.trees; wind = d.wind; gustPhase = d.gustPhase; terDirty = true;
  tanks = d.tanks.map(rehydrateTank);
  round = d.round; WIN_ROUNDS = d.winRounds; state = d.state; turnIdx = d.turnIdx; turnPhase = d.turnPhase; turnTimer = d.turnTimer;
  shopTimer = d.shopTimer; ready = d.ready.slice(); lastResult = d.lastResult || ''; net.shopStep = d.shopStep || 0;
  projectiles = (d.projectiles || []).map(p => ({ x: p.x, y: p.y, type: p.type }));   // len na vykreslenie/kameru, pasívne zariadenie fyziku nesimuluje
}
function syncPassiveUI() {   // pasívne zariadenie: prekresli obrazovky podľa prijatého stavu (samo nič nesimuluje)
  document.body.dataset.state = state;
  if (state === 'shop') { shopPlayer = net.spectator ? net.shopStep : net.myIdx; renderShop(); show('shop'); hide('end'); }
  else if (state === 'matchEnd') {
    hide('shop');
    const w = tanks.find(t => t.wins >= WIN_ROUNDS) || tanks.slice().sort((a, b) => b.wins - a.wins)[0];
    $('endTitle').textContent = w.name + ' vyhráva zápas!'; $('endTitle').style.color = w.color;
    $('endSub').innerHTML = 'Zápas skončil.';
    $('endNormalBtns').style.display = ''; $('endStoryBtns').style.display = 'none';
    show('end');
  } else { hide('shop'); hide('end'); }
}
async function netPublish() {
  if (!net.active || !dbCap || !net.code) return;
  if (net.busy) { net.queued = true; return; }
  net.busy = true;
  try {
    await dbCap.doc('rooms/' + net.code).update({
      status: 'playing', updatedAt: Date.now(), data: serializeState(),
    });
  } catch (_) {}
  net.busy = false;
  if (net.queued) { net.queued = false; netPublish(); }
}
function netUpdateWaitBanner() {
  const w = $('netWait'), mine = netIsMine();
  if (!net.active || mine) { w.style.display = 'none'; return; }
  w.style.display = 'flex';
  const idx = state === 'shop' ? net.shopStep : turnIdx;
  const oppName = (tanks[idx] && tanks[idx].name) || 'Súper';
  const prefix = net.spectator ? '👁️ ' : (state === 'shop' ? '🛒 ' : '⏳ ');
  w.textContent = prefix + esc(oppName) + (state === 'shop' ? ' nakupuje výzbroj…' : ' je na ťahu…');
}
function startOnlineMatch() {
  const n = netJoinedCount();
  if (n < 2) return;
  fixColors(); saveSetup();
  story.active = false; document.body.classList.remove('storymode');
  WIN_ROUNDS = setup.rounds; net.shopStep = 0;
  applyMapSize(setup.mapSize);   // platí veľkosť mapy hostiteľa, hosťom sa ďalej synchronizuje cez worldW v stave zápasu
  tanks = net.players.slice(0, n).map((p, i) => makeTank(i, { name: p.name, color: p.color, nick: i === net.myIdx ? setup.players[0].nick : null, bot: 0 }));
  round = 1; lastResult = '';
  buildPads();
  enterShop();
  netPublish();
}
function joinOnlineAsGuest(data) {
  applyState(data);
  buildPads();
  hide('menu'); hide('online'); hide('pause');
  syncPassiveUI();
}
async function hostCreateRoom() {
  const db = await ensureDb();
  if (!db) { ask('Online multiplayer sa na tomto zariadení nedá spustiť (chýba pripojenie k Claude db).', () => {}); return; }
  fixColors(); saveSetup();
  net.active = true; net.myIdx = 0; net.code = genRoomCode(); net.maxN = setup.n; net.shopStep = 0;
  net.players = Array.from({ length: net.maxN }, (_, i) => i === 0 ? { name: setup.players[0].name, color: setup.players[0].color } : null);
  try {
    await db.doc('rooms/' + net.code).set({ status: 'waiting', maxN: net.maxN, slots: { 0: net.players[0] }, terrain: setup.terrain, difficulty: setup.difficulty, rounds: setup.rounds, createdAt: Date.now(), updatedAt: Date.now() });
  } catch (e) { ask('Izbu sa nepodarilo vytvoriť. Skús to znova.', () => {}); net.active = false; return; }
  hide('online'); renderSetup(); show('menu');
  netSubscribe();
}
async function guestJoinRoom(code) {
  code = String(code || '').toUpperCase().trim();
  const db = await ensureDb();
  if (!db) { ask('Online multiplayer sa na tomto zariadení nedá spustiť (chýba pripojenie k Claude db).', () => {}); return; }
  if (!code) { renderOnlineScreen('Zadaj kód izby.'); return; }
  let snap;
  try { snap = await db.doc('rooms/' + code).get(); } catch (e) { renderOnlineScreen('Chyba pripojenia, skús znova.'); return; }
  if (!snap.exists) { renderOnlineScreen('Izba "' + code + '" neexistuje.'); return; }
  const d = snap.data();
  if (d.status !== 'waiting') { renderOnlineScreen('Izba "' + code + '" už spustila zápas.'); return; }
  const arr = slotsToArray(d.slots, d.maxN);
  const openIdx = arr.findIndex(p => !p || !p.name);
  if (openIdx < 0) { renderOnlineScreen('Izba "' + code + '" je už plná.'); return; }
  fixColors(); saveSetup();
  const used = new Set(arr.filter(p => p && p.name).map(p => p.color.toLowerCase()));
  let myColor = setup.players[0].color;
  if (used.has(myColor.toLowerCase())) myColor = PALETTE.find(c => !used.has(c.toLowerCase())) || myColor;
  const me = { name: setup.players[0].name, color: myColor };
  arr[openIdx] = me;
  net.active = true; net.myIdx = openIdx; net.code = code; net.maxN = d.maxN; net.players = arr; net.shopStep = 0;
  try { await db.doc('rooms/' + code).update({ ['slots.' + openIdx]: me, updatedAt: Date.now() }); } catch (_) {}
  hide('online'); renderSetup(); show('menu');
  netSubscribe();
}
function netSubscribe() {
  if (net.unsub) net.unsub();
  net.unsub = dbCap.doc('rooms/' + net.code).onSnapshot(snap => {
    if (!snap.exists) return;
    const d = snap.data();
    if (d.status === 'waiting') {
      net.maxN = d.maxN; net.players = slotsToArray(d.slots, d.maxN);
      if (state === 'menu') renderSetup();
      return;
    }
    if (d.status === 'playing' && d.data) {
      if (state === 'menu') { joinOnlineAsGuest(d.data); return; }
      if (!netIsMine()) { applyState(d.data); syncPassiveUI(); }
    }
  }, () => { net.err = 'Spojenie s izbou sa prerušilo.'; });
}
function netLeave() {
  if (net.unsub) { net.unsub(); net.unsub = null; }
  net.active = false; net.spectator = false; net.code = null; net.shopStep = 0; net.players = [];
}
// divák: pripojí sa na izbu s myIdx = -1, ktorý sa nikdy nerovná žiadnemu skutočnému indexu hráča (0-3) ani net.shopStep/turnIdx -
// vďaka tomu netIsMine() vráti vždy false a CELÁ existujúca "pasívne zariadenie len prijíma a vykresľuje" logika (zámky nákupu, ovládacie pady, ťah)
// funguje pre diváka úplne zadarmo, bez špeciálnych vetiev v hernej logike. Divák nikdy nezapisuje nič do izby (ani do slots).
async function spectateRoom(code) {
  code = String(code || '').toUpperCase().trim();
  const db = await ensureDb();
  if (!db) { ask('Online multiplayer sa na tomto zariadení nedá spustiť (chýba pripojenie k Claude db).', () => {}); return; }
  if (!code) { renderOnlineScreen('Zadaj kód izby, ktorú chceš sledovať.'); return; }
  let snap;
  try { snap = await db.doc('rooms/' + code).get(); } catch (e) { renderOnlineScreen('Chyba pripojenia, skús znova.'); return; }
  if (!snap.exists) { renderOnlineScreen('Izba "' + code + '" neexistuje.'); return; }
  const d = snap.data();
  net.active = true; net.spectator = true; net.myIdx = -1; net.code = code; net.maxN = d.maxN; net.players = slotsToArray(d.slots, d.maxN); net.shopStep = 0;
  hide('online');
  if (d.status === 'playing' && d.data) { joinOnlineAsGuest(d.data); }
  else { renderSetup(); show('menu'); }   // zápas sa ešte nespustil - počkaj v lobby, netSubscribe ťa prepne automaticky hneď ako hostiteľ odštartuje
  netSubscribe();
}
function renderOnlineScreen(msg) {
  show('online');
  const b = $('onlineBody');
  b.innerHTML = '<p>Zahraj si duel až so 4 hráčmi na iných telefónoch či počítačoch – všetci otvoríte tento istý odkaz. Jeden vytvorí izbu a nastaví si hráčov/kolá/terén presne ako pri lokálnej hre, ostatní sa pripoja kódom.</p>' +
    '<div class="row gap"><button class="btn" id="onlineHostBtn">🆕 Vytvoriť izbu</button></div>' +
    '<div class="row gap"><input class="pname" id="onlineCodeInput" placeholder="Kód izby (napr. AB3K9)" maxlength="6" style="max-width:220px;text-transform:uppercase">' +
    '<button class="btn alt" id="onlineJoinBtn">Pripojiť sa</button>' +
    '<button class="btn alt" id="onlineSpecBtn">👁️ Sledovať</button></div>' +
    (msg ? '<p class="msg" style="color:var(--gold)">' + esc(msg) + '</p>' : '') +
    '<p><small>Vyžaduje prihlásenie do Claude – ostatní hráči musia byť v rovnakej organizácii/účte (napr. tvoje ďalšie telefóny, prihlásené rovnakým spôsobom). "Sledovať" ťa pripojí ako diváka - vidíš zápas naživo, ale nehráš (ani rozohraný).</small></p>';
  $('onlineHostBtn').onclick = hostCreateRoom;
  $('onlineJoinBtn').onclick = () => guestJoinRoom($('onlineCodeInput').value);
  $('onlineSpecBtn').onclick = () => spectateRoom($('onlineCodeInput').value);
}
$('homeOnlineBtn').addEventListener('click', () => { hide('home'); renderOnlineScreen(); });
$('onlineClose').addEventListener('click', () => { netLeave(); hide('online'); show('home'); });

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const gy = x => ground[clamp(Math.round(x), 0, WORLD_W)];

// ---------- zvuk ----------
let actx = null;
function initAudio() {
  if (actx) return;
  try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; }
  if (actx) startMusic();
}
let musicGain = null;
function startMusic() {   // jemné ambientné podložie (pár detunovaných sínusoviek s pomalým LFO driftom), nenápadné pozadie namiesto ticha
  if (!actx || musicGain) return;
  musicGain = actx.createGain(); musicGain.gain.value = 0; musicGain.connect(actx.destination);
  musicGain.gain.linearRampToValueAtTime(setup.sound ? 0.028 : 0, actx.currentTime + 2);
  [55, 82.41, 110.3].forEach((f, i) => {
    const o = actx.createOscillator(), g = actx.createGain(), lfo = actx.createOscillator(), lg = actx.createGain();
    o.type = 'sine'; o.frequency.value = f; g.gain.value = i === 0 ? 1 : 0.45;
    lfo.frequency.value = 0.025 + i * 0.011; lg.gain.value = 2.2;
    lfo.connect(lg).connect(o.detune); lfo.start();
    o.connect(g).connect(musicGain); o.start();
  });
}
function setMusicVolume() { if (musicGain) musicGain.gain.linearRampToValueAtTime(setup.sound ? 0.028 : 0, actx.currentTime + 0.6); }
function vibrate(ms) {   // jemná haptická odozva na mobile (na desktope navigator.vibrate chýba alebo nič nerobí - bezpečné zavolať vždy)
  if (!setup.sound) return;
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (_) {}
}
let activeSnd = 0, noiseBuf = null;
function tone(f0, f1, dur, type = 'square', vol = 0.06) {
  if (!setup.sound || !actx || activeSnd > 26) return;
  const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur);
  activeSnd++; o.onended = () => activeSnd--;
}
function noise(dur, vol = 0.15, cutoff = 900) {
  if (!setup.sound || !actx || activeSnd > 26) return;
  if (!noiseBuf) {
    const n = actx.sampleRate * 2; noiseBuf = actx.createBuffer(1, n, actx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  }
  dur = Math.min(dur, 1.6);
  const t = actx.currentTime, src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
  f.type = 'lowpass'; f.frequency.value = cutoff; src.buffer = noiseBuf;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(actx.destination);
  src.start(t, Math.random() * (1.95 - dur), dur);
  activeSnd++; src.onended = () => activeSnd--;
}

// ---------- tanky ----------
function makeTank(id, cfg) {
  cfg = cfg || setup.players[id];
  const prof = cfg.nick ? getProfile(cfg.nick) : null;   // prihlásený hráč pokračuje na svojej uloženej veliteľskej hodnosti (level/XP)
  return {
    id, color: cfg.color, name: cfg.name, nick: cfg.nick || null, kills: 0, artPivotH: tankArtPivotH(cfg.color),
    money: START_MONEY + 100 * perkRank(prof, 'cash'), ammo: Object.fromEntries(ORDER.map(k => [k, k === 'ap' ? Infinity : 0])), bot: cfg.bot | 0, botSt: null, hudRects: [],
    speedLvl: 0, armorLvl: perkRank(prof, 'armor'), fuelLvl: perkRank(prof, 'fuel'), wlv: Object.fromEntries(WLV_IDS.map(k => [k, 0])), wins: 0, streak: 0,
    level: prof ? clampInt(prof.level, 1, MAX_LEVEL, 1) : 1, xp: prof ? Math.max(0, +prof.xp || 0) : 0, shields: new Array(10).fill(0), shT: 0, shieldMax: 0,
    fuel: FUEL_START, noFuelT: 0, rep: {}, repLast: {},
    x: 0, y: 0, vx: 0, power: 100, tilt: 0, face: 1, ang: 50,
    hp: BASE_HP, shield: 0, sel: 'ap', cd: 0, emp: 0, dead: false, prevAmmoBtn: '',
  };
}
const maxHp = t => BASE_HP + HP_PER_ARMOR * t.armorLvl + HP_PER_LEVEL * (t.level - 1);
const fuelCap = t => FUEL_CAP + 50 * t.fuelLvl;

function reward(t, amount, key) {
  if (!t || amount <= 0) return;
  if (t.nick && key !== 'level') amount = Math.round(amount * (1 + 0.1 * perkRank(getProfile(t.nick), 'income')));   // "Vojnová ekonomika" - bonus len na zárobky za hru, nie na odmenu za level-up
  t.money += amount; t.rep[key] = (t.rep[key] || 0) + amount;
}
function addXp(t, n) {
  if (!t || t.level >= MAX_LEVEL) return;
  if (t.nick) n = Math.round(n * (1 + 0.1 * perkRank(getProfile(t.nick), 'xp')));   // "Skúsený veliteľ" - bonus XP
  t.xp += n; t.rep.xp = (t.rep.xp || 0) + n;
  while (t.level < MAX_LEVEL && t.xp >= xpToNext(t.level)) {
    t.xp -= xpToNext(t.level); t.level++;
    reward(t, levelBonus(t.level), 'level');
    (t.rep.levels = t.rep.levels || []).push(t.level);
    floatText(t.x, t.y - 70, 'LEVEL ' + t.level + '!', '#ffd54a');
    tone(500, 1400, 0.4, 'triangle', 0.08);
  }
  if (t.level >= MAX_LEVEL) t.xp = 0;
  syncProfileLevel(t);   // veliteľská hodnosť sa hneď ukladá na profil, nech sa neresetuje pri ďalšom zápase (kampaň/multiplayer/vs. počítač)
}

function placeTank(t, x) {
  t.x = x; t.y = groundAvg(x); t.tilt = tiltAt(x);
  t.face = x < WORLD_W / 2 ? 1 : -1; t.ang = t.face > 0 ? 50 : 130;
  t.dead = false; t.cd = 0; t.emp = 0; t.stun = false; t.fired = false; t.sel = 'ap';
}
function groundAvg(x) { return (gy(x - 18) + gy(x + 18)) / 2; }
function tiltAt(x) { return Math.atan2(gy(x + 18) - gy(x - 18), 36); }
function pivot(t) { const h = t.artPivotH || 22; return { x: t.x + h * Math.sin(t.tilt), y: t.y - h * Math.cos(t.tilt) }; }
function muzzle(t) {
  const p = pivot(t), a = t.ang * Math.PI / 180, art = tankArt[TANK_COLOR_NAME[String(t.color).toLowerCase()]];
  const L = 36 * ((art && art.loaded) ? TANK_TARGET_W / 76 : 1);
  return { x: p.x + Math.cos(a) * L, y: p.y - Math.sin(a) * L, dx: Math.cos(a), dy: -Math.sin(a) };
}

// ---------- terén a prekážky ----------
const noiseTbl = () => Array.from({ length: 64 }, () => Math.random() * 2 - 1);
function vnoise(tbl, x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f), a = tbl[i & 63], b = tbl[(i + 1) & 63]; return a + (b - a) * u; }
function applyMapSize(size) { WORLD_W = size === 'large' ? 2048 : W; }   // nastaví šírku sveta pred genArena() - samotné prekreslenie/realokáciu vrstiev si už genArena rieši sama
function pickBiome() {
  if (setup.terrain !== 'random' && BIOMES[setup.terrain]) return setup.terrain;
  const others = BIOME_KEYS.filter(k => k !== biomeKey);
  return others[Math.floor(Math.random() * others.length)];
}
function rollWind() { wind = Math.round(rand(-48, 48) * biome().windMul * diffOf().windMul); gustPhase = rand(0, 6.28); }
function genArena(key) {
  if (ground.length !== WORLD_W + 1) mkWorldLayers();   // mapa väčšej/inej veľkosti ako doteraz - treba znova vytvoriť pole terénu aj vrstvy
  biomeKey = key; const B = BIOMES[key];
  const T = [noiseTbl(), noiseTbl(), noiseTbl(), noiseTbl()], off = rand(0, 30);
  const nz = (k, per, x) => vnoise(T[k], x / per + off);
  const prm = { meadow: [475, 100, 520, 46, 210, 14, 85], desert: [500, 92, 620, 40, 260, 9, 95], winter: [480, 100, 560, 46, 240, 10, 95], forest: [470, 92, 480, 42, 190, 10, 75], canyon: [470, 120, 540, 55, 220, 14, 90], swamp: [470, 55, 600, 26, 260, 8, 55], volcano: [460, 105, 500, 48, 200, 12, 90], beach: [500, 55, 560, 22, 240, 8, 65], ruins: [475, 90, 480, 50, 200, 16, 80], moon: [475, 85, 460, 55, 190, 22, 65], mars: [480, 95, 520, 46, 220, 13, 85] }[key];
  for (let x = 0; x <= WORLD_W; x++) {
    let y;
    if (key === 'mountains') {   // hrebeňový šum = ostré štíty a hlboké údolia
      const r = (k, per) => clamp((1 - Math.abs(nz(k, per, x)) - 0.25) / 0.7, 0, 1);
      y = 650 - 340 * r(0, 320) - 95 * r(1, 120) - 26 * r(2, 48);
    } else {
      y = prm[0] + prm[1] * nz(0, prm[2], x) + prm[3] * nz(1, prm[4], x) + prm[5] * nz(2, prm[6], x);
      if (key === 'desert') {   // terasovité plošiny (mesa)
        const st = 46, t = (y - 300) / st, fl = Math.floor(t), sm = clamp((t - fl - 0.4) / 0.2, 0, 1);
        y = y * 0.4 + ((fl + sm * sm * (3 - 2 * sm)) * st + 300) * 0.6;
      }
    }
    ground[x] = clamp(y, 230, 650);
  }
  const sx = spawnXs(tanks.length);
  sx.forEach(x => flatten(x, 45, 75));

  obstacles = [];
  for (let i = 0; i < sx.length - 1; i++) {   // prekážky medzi štartovými pozíciami
    const lo = sx[i] + 95, hi = sx[i + 1] - 95, cnt = Math.min(3, Math.floor((hi - lo) / 110));
    for (let k = 0; k < cnt; k++) {
      const s0 = lo + (hi - lo) * k / cnt, s1 = lo + (hi - lo) * (k + 1) / cnt;
      if (Math.random() > B.obst) continue;
      const w = rand(46, 70); if (s1 - s0 < w + 10) continue;
      const x0 = rand(s0, s1 - w), steel = Math.random() < 0.3, y0 = ground[Math.round(x0 + w / 2)];
      for (let x = Math.floor(x0 - 6); x <= Math.ceil(x0 + w + 6); x++) ground[clamp(x, 0, WORLD_W)] = y0;
      obstacles.push({ x: x0, w, base: y0, h: steel ? rand(40, 72) : rand(70, 120), steel, hp: steel ? 260 : 80, maxHp: steel ? 260 : 80, seed: Math.random() });
    }
  }

  trees = []; decor = [];   // stromy (v lese fungujú ako prekážka) a dekorácie
  const free = x => sx.every(q => Math.abs(x - q) > 95) && obstacles.every(o => x < o.x - 25 || x > o.x + o.w + 25);
  const put = (cnt, make) => { for (let i = 0, tries = 0; i < cnt && tries < cnt * 8; tries++) { const x = rand(20, WORLD_W - 20); if (!free(x)) continue; make(x, ground[Math.round(x)]); i++; } };
  if (B.trees) put(12 + Math.floor(Math.random() * 6), (x, y0) => trees.push({ x, y0, h: rand(62, 112), w: rand(34, 50) }));
  const D = { meadow: [['bush', 12], ['rock', 4]], desert: [['cactus', 9], ['rock', 6]], winter: [['pine', 10], ['rock', 4]], forest: [['bush', 10], ['rock', 3]], mountains: [['pine', 8], ['rock', 8]], canyon: [['rock', 16]], swamp: [['bush', 15], ['rock', 3]], volcano: [['rock', 14]], beach: [['bush', 6], ['rock', 3]], ruins: [['rock', 22]], moon: [['rock', 20]], mars: [['rock', 12]] }[key];
  D.forEach(([type, cnt]) => put(cnt, (x, y0) => { if (key === 'mountains' && type === 'pine' && y0 < 430) return; decor.push({ type, x, y0, s: rand(0.7, 1.3) }); }));

  hills = [];
  for (let i = 0; i < 3; i++) hills.push({ a: rand(40, 90) * (key === 'mountains' ? 1.7 : 1), f: rand(0.002, 0.006), p: rand(0, 6.28), base: 380 + i * 25, col: B.hills[i] });
  clouds = [];
  for (let i = 0; i < 6; i++) clouds.push({ x: rand(0, WORLD_W), y: rand(40, 220), s: rand(0.6, 1.4) });
  sun = { x: rand(WORLD_W * 0.172, WORLD_W * 0.828), y: rand(125, 200) };
  weather = [];
  const wn = { snow: 130, dust: 70, leaf: 38, mist: 9, pollen: 26 }[B.weather] || 0;
  for (let i = 0; i < wn; i++) weather.push({ x: rand(0, WORLD_W), y: B.weather === 'mist' ? rand(300, 560) : rand(0, H * 0.92), s: rand(0.6, 1.6), ph: rand(0, 6.28) });
  skyDirty = terDirty = true;
  if (scorchL) scorchL.x.clearRect(0, 0, WORLD_W + 2 * M, H + 2 * VM);
  const wScale = WORLD_W / W;   // na väčšej mape pridaj úmerne viac prachu/hviezd, nech dekorácia nepôsobí riedko
  specks = Array.from({ length: Math.round((quality >= 1 ? 1300 : 450) * wScale) }, () => ({ x: rand(-M, WORLD_W + M), y: rand(230, H + M), r: rand(1, 2.6), a: Math.random() < 0.5 ? rand(0.05, 0.16) : -rand(0.05, 0.2) }));
  stars = Array.from({ length: Math.round(110 * wScale) }, () => ({ x: rand(0, WORLD_W), y: rand(0, 330), r: rand(0.5, 1.5), a: rand(0.25, 0.9), ph: rand(0, 6.28), tw: rand(0.5, 1.8) }));
  rollWind();
}
const spawnXs = n => {
  if (WORLD_W === W) return n === 2 ? [135, 1145] : n === 3 ? [135, 640, 1145] : [135, 468, 812, 1145];   // pri normálnej mape presne pôvodné hodnoty (nič sa vizuálne nemení)
  const margin = 135;
  return Array.from({ length: n }, (_, i) => Math.round(margin + (WORLD_W - 2 * margin) * i / (n - 1)));
};
function flatten(cx, half, fade) {
  const y = ground[cx];
  for (let x = cx - half - fade; x <= cx + half + fade; x++) {
    const d = Math.abs(x - cx), w = d <= half ? 1 : 1 - (d - half) / fade;
    ground[x] = ground[x] * (1 - w) + y * w;
  }
}
function obTop(o) { return o.base - o.h; }
function carve(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(WORLD_W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    if (ground[x] >= cy - dy && ground[x] < cy + dy) ground[x] = Math.min(H, cy + dy);
  }
  decor = decor.filter(d => Math.abs(gy(d.x) - d.y0) < 14);
  trees = trees.filter(tr => Math.abs(gy(tr.x) - tr.y0) < 20);
  terDirty = true;
}
function scorch(x, y, r) {   // škvrna po výbuchu (kreslí sa do samostatnej vrstvy)
  if (!scorchL) return;
  const c = scorchL.x, g = c.createRadialGradient(x + M, y + VM, r * 0.15, x + M, y + VM, r);
  g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.beginPath(); c.arc(x + M, y + VM, r, 0, 6.3); c.fill();
}
function addTreadMark(x, y, tilt) {   // stopa po páse tanku – kreslí sa priamo každý frame (nezapaľuje sa do vrstvy), sama dočasne zmizne
  treadMarks.push({ x, y, tilt: tilt || 0, t: 0 });
  if (treadMarks.length > 420) treadMarks.splice(0, treadMarks.length - 420);
}

// ---------- priebeh hry ----------
function startMatch(force) {
  if (force !== true && readSave()) { ask('Uložená hra sa prepíše novým zápasom. Pokračovať?', () => startMatch(true)); return; }
  story.active = false; story.idx = null; document.body.classList.remove('storymode');
  initAudio();
  fixColors(); saveSetup();
  WIN_ROUNDS = setup.rounds;
  applyMapSize(setup.mapSize);
  tanks = setup.players.slice(0, setup.n).map((p, i) => makeTank(i, p));
  round = 1; lastResult = '';
  buildPads();
  enterShop();
  hide('menu'); hide('end');
}
function continueGame() {
  const sv = readSave(); if (!sv) return;
  story.active = false; story.idx = null; document.body.classList.remove('storymode');
  initAudio();
  applyMapSize(setup.mapSize);   // uložená hra si veľkosť mapy nepamätá (rovnako ako terén/biome) - použije sa aktuálne nastavenie
  WIN_ROUNDS = sv.winRounds || 5; round = sv.round || 1; lastResult = sv.lastResult || '';
  tanks = sv.players.map((p, i) => {
    const t = makeTank(i, { name: String(p.name).slice(0, 14), color: isColor(p.color) ? p.color : PALETTE[i], nick: typeof p.nick === 'string' ? p.nick : null, bot: p.bot | 0 });
    t.kills = p.kills | 0;
    ORDER.forEach(k => { if (k !== 'ap') t.ammo[k] = ((p.ammo || {})[k] | 0); });
    Object.assign(t, {
      money: +p.money || 0, speedLvl: p.speedLvl | 0, armorLvl: p.armorLvl | 0, fuelLvl: p.fuelLvl | 0, wins: p.wins | 0, streak: p.streak | 0,
      level: clamp(p.level | 0 || 1, 1, MAX_LEVEL), xp: +p.xp || 0, fuel: +p.fuel || 0, repLast: p.repLast || {},
      wlv: Object.fromEntries(WLV_IDS.map(k => [k, clamp((p.wlv || {})[k] | 0, 0, WLV_MAX)])),
      shields: Array.isArray(p.shields) && p.shields.length === 10 ? p.shields.map(v => v | 0) : new Array(10).fill(0),
    });
    return t;
  });
  buildPads();
  enterShop(true);
  hide('menu'); hide('end');
}
function toMenu() {
  paused = false; state = 'menu';
  story.active = false; story.idx = null; document.body.classList.remove('storymode');
  if (net.active) netLeave();   // odhlás sa z odberu izby, nech sa nezbiera "duch" pripojenia po návrate domov (platí pre hráča aj diváka)
  ['shop', 'end', 'pause', 'story', 'menu'].forEach(hide); $('banner').style.display = 'none';
  refreshContinue(); renderSetup(); renderHome(); show('home');
}
function enterShop(resume) {
  genArena(pickBiome());
  projectiles = []; particles = []; beams = []; emitters = []; strikes = []; rings = []; glows = []; flash = 0; treadMarks = [];
  const sx = spawnXs(tanks.length);
  tanks.forEach((t, i) => placeTank(t, sx[i]));
  tanks.forEach(t => {
    t.hp = maxHp(t); t.shield = 0;
    if (resume) return;
    if (round > 1) t.fuel = Math.min(fuelCap(t), t.fuel + FUEL_ROUND_REFILL);
    t.repLast = t.rep; t.rep = {};
  });
  if (!resume) tanks.forEach(t => { if (t.bot) botShop(t); });
  tanks.forEach(t => { t.quest = pickQuest(); t.questDone = false; t.tookDmg = false; });
  state = 'shop'; shopTimer = SHOP_TIME; ready = tanks.map(t => !!t.bot); shopPlayer = Math.max(0, tanks.findIndex(t => !t.bot));
  if (net.active) { net.shopStep = 0; shopPlayer = net.myIdx; }
  $('shopTitle').textContent = 'Arzenál – kolo ' + round + ' · ' + biome().icon + ' ' + biome().name + (lastResult ? ' · ' + lastResult : '');
  renderShop(); show('shop');
  if (net.active) netPublish();
}
function beginTurn(i) {
  turnIdx = i; turnPhase = 'aim'; turnTimer = TURN_TIME; settle = 0;
  const t = tanks[i];
  t.fired = false; t.stun = t.emp > 0; t.emp = 0; ammoMenu.t = 0;
  t.botSt = t.bot ? { wait: 0.9, plan: null, hold: 0 } : null;
  rollWind();                                              // vietor sa mení každý ťah
  for (let k = 0; k < 4; k++) { held[k] = {}; kb[k] = {}; }
  floatText(t.x, t.y - 70, t.stun ? 'OMRÁČENÝ – iba streľba' : 'NA RADE', t.stun ? '#8cff7a' : '#fff');
  tone(700, 900, 0.08, 'triangle', 0.05);
}
function nextTurn() {
  const n = tanks.length;
  for (let k = 1; k <= n; k++) {
    const j = (turnIdx + k) % n;
    if (!tanks[j].dead) { beginTurn(j); if (net.active) netPublish(); return; }
  }
}
// ---------- počítačový súper ----------
function simShot(t, type, ang, pw) {
  const a = AMMO[type], rad = ang * Math.PI / 180, pv = pivot(t);
  const m = { x: pv.x + Math.cos(rad) * 36, y: pv.y - Math.sin(rad) * 36 }, sp = a.speed * powerMul(pw);
  const p = { x: m.x, y: m.y, vx: Math.cos(rad) * sp, vy: -Math.sin(rad) * sp, type, life: 0 };
  for (let i = 0; i < 160; i++) {
    stepShot(p, 1 / 30);
    if (p.x < 0 || p.x > WORLD_W || p.y > H) return { x: p.x, y: Math.min(p.y, H) };
    if (p.y >= gy(p.x)) return { x: p.x, y: p.y };
    if (tanks.some(o => !o.dead && (o !== t || p.life > 0.25) && inTank(o, p.x, p.y))) return { x: p.x, y: p.y };
    if (obstacles.some(o => p.x >= o.x && p.x <= o.x + o.w && p.y >= obTop(o) && p.y <= o.base)) return { x: p.x, y: p.y };
  }
  return { x: p.x, y: p.y };
}
function botPlan(t) {
  const foes = tanks.filter(o => o !== t && !o.dead);
  if (!foes.length) return null;
  const target = foes.reduce((b, o) => Math.abs(o.x - t.x) < Math.abs(b.x - t.x) ? o : b);
  const lvl = t.bot, dist = Math.abs(target.x - t.x), tx = target.x, ty = target.y - 14;
  let ammo = 'ap';
  if (t.hp < maxHp(t) * 0.35 && t.ammo.repair > 0) return { ammo: 'repair', ang: t.ang, power: t.power };
  const pref = ['nukeL', 'nukeS', 'carpet', 'firestorm', 'airstrike', 'volcano', 'meteor', 'seismic', 'pine', 'chain', 'shower', 'empBig', 'he', 'missile', 'ricochet', 'laser', 'bounce', 'emp', 'ap'];
  const cand = pref.filter(id => t.ammo[id] > 0 && (!id.startsWith('nuke') || dist > AMMO[id].splash * 0.85 + 60));
  if (cand.length) ammo = Math.random() < [0.45, 0.75, 0.95][lvl - 1] ? cand[0] : cand[Math.floor(Math.random() * cand.length)];
  const jitter = sd => (Math.random() + Math.random() - 1) * sd * 1.6;
  const sdA = [6, 2.5, 0.8][lvl - 1], sdP = [12, 5, 2][lvl - 1];
  if (ammo === 'laser') {
    const pv = pivot(t), ang = Math.atan2(-(ty - pv.y), tx - pv.x) * 180 / Math.PI;
    return { ammo, ang: clamp(ang + jitter(sdA), 0, 180), power: 100 };
  }
  let best = { d: 1e9, ang: 45, power: 100 };
  for (let e = 8; e <= 88; e += 2) for (let pw = 30; pw <= 100; pw += 5) {
    const ang = tx >= t.x ? e : 180 - e, land = simShot(t, ammo, ang, pw), d = Math.hypot(land.x - tx, land.y - ty);
    if (d < best.d) best = { d, ang, power: pw };
  }
  return { ammo, ang: clamp(best.ang + jitter(sdA), 0, 180), power: clamp(best.power + jitter(sdP), POWER_MIN, 100) };
}
function botUpdate(t, dt) {
  const b = t.botSt; if (!b) return;
  if (!b.plan) {
    b.wait -= dt; if (b.wait > 0) return;
    b.plan = botPlan(t) || { ammo: 'ap', ang: t.ang, power: t.power };
    if (t.ammo[b.plan.ammo] > 0) t.sel = b.plan.ammo;
    b.hold = 0.6;
  }
  if (!t.stun) {
    const da = b.plan.ang - t.ang, dp = b.plan.power - t.power;
    t.ang += clamp(da, -AIM_SPEED * 2 * dt, AIM_SPEED * 2 * dt);
    t.power += clamp(dp, -POWER_SPEED * 3 * dt, POWER_SPEED * 3 * dt);
    if (Math.abs(da) > 0.5 || Math.abs(dp) > 0.5) return;
  }
  b.hold -= dt;
  if (b.hold <= 0) fire(t);
}
function botShop(t) {
  for (let k = SHIELDS.length; k >= 1; k--) {   // najsilnejší dostupný štít
    const sh = SHIELDS[k - 1];
    if (t.level >= sh.unlock && t.money - sh.cost >= 150 && t.shields[k - 1] < 1) { t.money -= sh.cost; t.shields[k - 1]++; break; }
  }
  for (let pass = 0; pass < 3; pass++) ['nukeL', 'nukeS', 'carpet', 'firestorm', 'airstrike', 'volcano', 'meteor', 'seismic', 'pine', 'chain', 'shower', 'empBig', 'he', 'missile', 'ricochet', 'laser', 'emp', 'bounce', 'repair', 'repairBig'].forEach(id => {
    const it = SHOP_ITEMS.find(i => i.id === id);
    if ((!it.unlock || t.level >= it.unlock) && t.money >= it.cost + 100 && t.ammo[id] < 2 * it.qty + 1 && Math.random() < 0.55) { t.money -= it.cost; t.ammo[id] = Math.min(capOf(id), t.ammo[id] + it.qty); }
  });
  if (t.armorLvl < 6 && t.money >= 150 + 120 * t.armorLvl + 400) { t.money -= 150 + 120 * t.armorLvl; t.armorLvl++; }
  WLV_IDS.forEach(id => {
    const lvl = wlvOf(t, id), cost = wlvCost(lvl);
    if (lvl < WLV_MAX && t.level >= WLV_UNLOCK[lvl] && t.money >= cost + 200 && Math.random() < 0.3) { t.money -= cost; t.wlv = t.wlv || {}; t.wlv[id] = lvl + 1; }
  });
}
function tryFire(p) { if (tanks[p] && !tanks[p].bot) fire(tanks[p]); }
function startPlay() {
  tanks.forEach(t => {
    t.hp = maxHp(t);
    let k = 0;   // nasadí sa najsilnejší vlastnený štít (spotrebuje sa 1 ks)
    for (let i = SHIELDS.length - 1; i >= 0; i--) if (t.shields[i] > 0) { k = i + 1; t.shields[i]--; break; }
    t.shT = k; t.shieldMax = k ? SHIELDS[k - 1].cap : 0; t.shield = t.shieldMax;
    t.sel = 'ap'; t.cd = 0; t.stun = false; t.fired = false;
  });
  hide('shop'); state = 'play';
  beginTurn((round - 1) % tanks.length);   // začína postupne každý hráč
  banner(biome().icon + ' ' + biome().name + ' · KOLO ' + round + ' – ' + tanks[turnIdx].name + ' začína!', 1600);
  if (net.active) netPublish();
}
function checkRoundEnd() {
  if (state !== 'play') return;
  const alive = tanks.filter(t => !t.dead);
  if (alive.length > 1) return;
  state = 'roundEnd'; endTimer = 3;
  if (alive.length === 1) {
    const w = alive[0], losers = tanks.filter(t => t !== w);
    w.wins++; w.streak++; losers.forEach(l => l.streak = 0);
    reward(w, WIN_BONUS + ROUND_SCALE * (round - 1), 'win');
    reward(w, Math.round(w.hp / 2), 'hp');
    if (w.streak >= 2) reward(w, STREAK_BONUS * (w.streak - 1), 'streak');
    addXp(w, 150);
    losers.forEach(l => { reward(l, LOSE_BONUS + ROUND_SCALE / 2 * (round - 1), 'lose'); addXp(l, 40); });
    lastResult = 'víťaz kola: ' + w.name;
    banner(w.name + ' vyhráva kolo!', 2800);
  } else {
    tanks.forEach(t => { t.streak = 0; reward(t, LOSE_BONUS + ROUND_SCALE / 2 * (round - 1), 'lose'); addXp(t, 40); });
    lastResult = 'Remíza';
    banner('Remíza!', 2800);
  }
  tanks.forEach(t => {   // vyhodnotenie vedľajšej misie kola (bonus € a XP)
    if (t.quest && !t.questDone && t.quest.done(t)) {
      t.questDone = true;
      reward(t, t.quest.money, 'quest'); addXp(t, t.quest.xp);
      floatText(t.x, t.y - 90, '✓ misia: ' + t.quest.desc, '#ffd54a');
    }
  });
}
function afterRoundEnd() {
  const w = tanks.find(t => t.wins >= WIN_ROUNDS);
  if (w) {
    state = 'matchEnd'; clearSave(); hide('pause');
    $('endNormalBtns').style.display = ''; $('endStoryBtns').style.display = 'none';
    if (story.active) {
      const m = STORY_MISSIONS[story.idx], won = w === tanks[0];
      let worldReward = null;
      if (won) {
        story.progress.unlocked = Math.max(story.progress.unlocked, story.idx + 2); story.progress.done[story.idx] = true;
        const wld = missionWorld(m), wm = worldMissions(wld), flags = ensureStoryFlags(story.progress);
        if (wm[wm.length - 1].i === story.idx && !flags.rewarded[wld]) {   // posledná misia planéty - darček od jej generála
          flags.rewarded[wld] = true;
          const rw = GENERALS[wld].reward;
          tanks[0].ammo[rw.ammoId] = Math.min(capOf(rw.ammoId), (tanks[0].ammo[rw.ammoId] || 0) + rw.qty);
          addXp(tanks[0], rw.xp);
          worldReward = wld;
        }
        saveStoryProgress(); saveStoryLoadout(tanks[0]);
      }
      recordStats(w);   // misie v kampani sa teraz tiež počítajú do štatistík profilu (zápasy/výhry/kolá)
      $('endTitle').textContent = won ? 'Misia splnená!' : 'Misia zlyhala';
      $('endTitle').style.color = won ? '#5fd35f' : '#e5484d';
      $('endSub').innerHTML = esc(won ? m.win : m.lose);
      $('endNormalBtns').style.display = 'none'; $('endStoryBtns').style.display = 'flex';
      $('storyNextBtn').style.display = (won && STORY_MISSIONS[story.idx + 1]) ? '' : 'none';
      show('end'); if (net.active) netPublish();
      if (worldReward) showGeneralDialog(worldReward, 'outro');
      return;
    }
    const saved = recordStats(w);
    $('endTitle').textContent = w.name + ' vyhráva zápas!';
    $('endTitle').style.color = w.color;
    const rank = tanks.slice().sort((x, y) => y.wins - x.wins || y.level - x.level);
    $('endSub').innerHTML = 'Konečné poradie po ' + round + ' kolách<br>' + rank.map((t, i) =>
      (['🥇', '🥈', '🥉', '4.'][i]) + ' <span style="color:' + t.color + '">' + esc(t.name) + '</span> · ★' + t.wins + ' · LV ' + t.level + ' · €' + t.money + ' · brnenie L' + t.armorLvl).join('<br>') +
      (saved.length ? '<br><small>Štatistiky uložené pre: ' + saved.map(esc).join(', ') + '</small>' : '');
    show('end');
    if (net.active) netPublish();
  } else { round++; enterShop(); }
}

// ---------- strelba a výbuchy ----------
function cycleAmmo(t, dir) {
  dir = dir || 1;
  if (t.dead || t.bot || state !== 'play' || t.id !== turnIdx || turnPhase !== 'aim') return;
  let i = ORDER.indexOf(t.sel);
  for (let k = 1; k <= ORDER.length; k++) {
    const L = ORDER.length, n = ORDER[(((i + k * dir) % L) + L) % L];
    if (t.ammo[n] > 0) { t.sel = n; break; }
  }
  tone(600, 900, 0.05, 'triangle', 0.05); showAmmoMenu(t);
}
function windAt(p) {
  const B = biome();
  const gustF = 1 + B.gust * diffOf().gustMul * Math.sin(p.life * 2.6 + gustPhase);   // nárazový vietor
  const alt = B.altWind ? 1 + B.altWind * clamp((520 - p.y) / 320, 0, 1) : 1;      // vo výške silnejší vietor
  return wind * gustF * alt * (p.type === 'bounce' ? 0.6 : 1);
}
function stepShot(p, dt) {   // spoločná fyzika pre strelu aj náhľad dráhy
  const B = biome();
  p.vy += GRAVITY * B.grav * dt; p.vx += windAt(p) * dt;
  const k = Math.max(0, 1 - B.drag * dt); p.vx *= k; p.vy *= k;
  p.x += p.vx * dt; p.y += p.vy * dt; p.life += dt;
}
function showAmmoMenu(t) { ammoMenu = { id: t.id, t: 2.6 }; }
function selectAmmo(t, k) {
  if (t.dead || t.bot || state !== 'play' || t.id !== turnIdx || turnPhase !== 'aim' || !(t.ammo[k] > 0)) return;
  t.sel = k; tone(600, 900, 0.05, 'triangle', 0.05); showAmmoMenu(t);
}
function spawnProj(x, y, vx, vy, type, owner, arm) { projectiles.push({ x, y, vx, vy, type, owner, bounces: 0, life: 0, arm: arm || 0 }); }
function addDirt(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(WORLD_W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, top = cy - Math.sqrt(Math.max(0, r * r - dx * dx));
    if (ground[x] > top) ground[x] = Math.max(200, top);
  }
  decor = decor.filter(d => Math.abs(gy(d.x) - d.y0) < 14);
  trees = trees.filter(tr => Math.abs(gy(tr.x) - tr.y0) < 20);
  terDirty = true;
}
function teleportTank(id, x) {
  const t = tanks[id]; if (!t || t.dead) return;
  const nx = clamp(x, 24, WORLD_W - 24);
  if (blocked(t, nx)) { floatText(t.x, t.y - 50, 'Blokované!', '#ff9a3c'); return; }
  for (let i = 0; i < 24; i++) spark(t.x + rand(-16, 16), t.y - rand(0, 34), rand(-60, 60), rand(-120, 20), '#c9a7ff', rand(0.3, 0.7), 3, 0);
  t.x = nx; t.y = groundAvg(nx); t.vx = 0;
  for (let i = 0; i < 24; i++) spark(t.x + rand(-16, 16), t.y - rand(0, 34), rand(-60, 60), rand(-120, 20), '#e6d6ff', rand(0.3, 0.7), 3, 0);
  tone(200, 1500, 0.3, 'sine', 0.08);
}
function nukeFx(x, y, a) {
  flash = Math.max(flash, a.flash);
  rings.push({ x, y, r: 10, max: a.splash * 1.35, life: 0.9, max_life: 0.9 });
  for (let i = 0; i < 90; i++) { const ang = rand(0, 6.28), v = rand(80, 520); spark(x, y, Math.cos(ang) * v, Math.sin(ang) * v - 120, ['#ffffff', '#ffe08a', '#ff8a2a', '#ff4d1a'][i % 4], rand(0.7, 1.6), rand(4, 12), 300, 'glow'); }
  for (let i = 0; i < 40; i++) spark(x + rand(-14, 14), y - i * 7, rand(-25, 25), rand(-260, -120), 'rgba(80,70,65,.75)', rand(1.2, 2.4), rand(10, 22), -10);
  for (let i = 0; i < 34; i++) spark(x + rand(-70, 70), y - 260 - rand(0, 40), rand(-170, 170), rand(-50, 20), 'rgba(140,110,90,.7)', rand(1.2, 2.2), rand(10, 20), -6);
  noise(1.4, 0.5, 250); tone(70, 18, 1.2, 'sawtooth', 0.14); vibrate([40, 30, 90]);
  shake = Math.max(shake, 32);
}
function fire(t) {
  if (t.dead || state !== 'play' || t.id !== turnIdx || turnPhase !== 'aim' || t.fired) return;
  if (!(t.ammo[t.sel] > 0)) t.sel = 'ap';
  const type = t.sel, a = AMMO[type], m = muzzle(t);
  if (t.ammo[type] !== Infinity) t.ammo[type]--;
  if (!(t.ammo[type] > 0)) t.sel = 'ap';
  t.fired = true; turnPhase = 'resolve'; settle = 0; t.recoil = 1;   // po výstrele už hráč nemôže konať
  if (type === 'laser') { fireLaser(t, m); return; }
  if (a.heal) {   // servisná súprava: oprava namiesto výstrelu
    const before = t.hp; t.hp = Math.min(maxHp(t), t.hp + a.heal);
    floatText(t.x, t.y - 50, '+' + Math.round(t.hp - before) + ' HP', '#6bffb0');
    for (let i = 0; i < 20; i++) spark(t.x + rand(-22, 22), t.y - rand(0, 34), rand(-20, 20), rand(-90, -20), '#6bffb0', rand(0.5, 1), 3, 0);
    tone(500, 1000, 0.3, 'triangle', 0.08); return;
  }
  const sp = a.speed * powerMul(t.power);
  projectiles.push({ x: m.x, y: m.y, vx: m.dx * sp, vy: m.dy * sp, type, owner: t.id, bounces: a.bounces || 0, life: 0 });
  tone(220, 70, 0.18, 'sawtooth', 0.07); noise(0.08, 0.08, 1500); vibrate(10);
  for (let i = 0; i < 6; i++) spark(m.x, m.y, m.dx * 120 + rand(-60, 60), m.dy * 120 + rand(-60, 60), '#ffd27a', 0.25, 3, 300, 'glow');
  glows.push({ x: m.x, y: m.y, r: 26, life: 0.12, max: 0.12, color: '#ffe9a0' });
  shake = Math.max(shake, 2);
}
function fireLaser(t, m) {
  tone(1400, 200, 0.35, 'sawtooth', 0.07);
  let x = m.x, y = m.y, hit = false;
  for (let i = 0; i < 1800; i++) {
    x += m.dx * 2; y += m.dy * 2;
    if (x < 0 || x > WORLD_W || y > H || y < -300) break;
    if (y >= gy(x)) { carve(x, y, AMMO.laser.crater * biome().crater); hit = true; break; }
    const e = tanks.find(o => o !== t && !o.dead && inTank(o, x, y));
    if (e) { damage(e, AMMO.laser.dmg * dmgMul(t, 'laser'), t.id, x, y, true); hit = true; break; }
  }
  beams.push({ x1: m.x, y1: m.y, x2: x, y2: y, life: 0.2, color: AMMO.laser.color });
  if (hit) for (let i = 0; i < 14; i++) spark(x, y, rand(-160, 160), rand(-200, 40), AMMO.laser.color, 0.5, 3, 300, 'glow');
  shake = Math.max(shake, 3);
}
function inTank(t, x, y) { return x >= t.x - 24 && x <= t.x + 24 && y >= t.y - 34 && y <= t.y + 2; }

function spark(x, y, vx, vy, color, life, size, grav = 300, fx) {
  if (particles.length >= MAXP) return;
  particles.push({ x, y, vx, vy, life, max: life, size, color, grav, fx: fx || (color.charCodeAt(3) === 97 ? 'smoke' : '') });   // rgba(...) = dym
}
function floatText(x, y, text, color) {
  particles.push({ x, y, vx: 0, vy: -40, life: 1, max: 1, size: 18, color, grav: 0, text });
}
function damage(t, d, ownerId, x, y, direct) {
  if (t.dead || d <= 0) return;
  t.tookDmg = true;
  d = Math.min(d, t.hp + t.shield);   // odmena len za skutočne spôsobené poškodenie
  let dealt = d;
  const absorbed = t.shield > 0 ? Math.min(t.shield, d) : 0;
  if (absorbed) { t.shield -= absorbed; dealt = d - absorbed; }
  t.hp -= dealt;
  const owner = tanks[ownerId];
  if (owner && ownerId !== t.id) {
    reward(owner, Math.round(d * MONEY_PER_DMG), 'hits'); addXp(owner, d);
    if (direct) reward(owner, DIRECT_BONUS, 'direct');
  }
  floatText(x, y - 20, '-' + Math.round(d), absorbed && !dealt ? (SHIELDS[t.shT - 1] || {}).color || '#8cf' : '#fff');
  if (t.hp <= 0) killTank(t, ownerId);
}
function killTank(t, ownerId) {
  t.hp = 0; t.dead = true;
  const owner = tanks[ownerId];
  if (owner && ownerId !== t.id) { reward(owner, KILL_BONUS, 'kill'); addXp(owner, 50); owner.kills = (owner.kills || 0) + 1; }
  for (let i = 0; i < 60; i++) {
    const a = rand(0, 6.28), v = rand(60, 380);
    spark(t.x, t.y - 14, Math.cos(a) * v, Math.sin(a) * v - 100, ['#ff7043', '#ffd54a', '#444', '#ff3d00'][i % 4], rand(.5, 1.4), rand(3, 8), 300, i % 4 === 2 ? '' : 'glow');
  }
  noise(0.7, 0.3, 500); tone(120, 30, 0.6, 'sawtooth', 0.1); vibrate(80);
  shake = 14;
  checkRoundEnd();
}
function explosion(x, y, type, ownerId) {
  const a = AMMO[type];
  lastImpact = { x, y, t: 1.1, mag: a.splash || 0 };
  const owner = tanks[ownerId], dmg = a.dmg * dmgMul(owner, type);
  if (a.dirt) { addDirt(x, y, a.dirt); for (let i = 0; i < 24; i++) spark(x, y, rand(-140, 140), rand(-220, -30), '#b58a5a', rand(0.4, 0.9), rand(3, 7)); noise(0.3, 0.2, 500); return; }
  if (a.tele) { teleportTank(ownerId, x); return; }
  if (a.strike) { strikes.push({ x, t: 1.3, n: a.strike, owner: ownerId }); tone(900, 300, 0.3, 'square', 0.05); return; }
  carve(x, y, a.crater * biome().crater);
  scorch(x, y, Math.max(20, a.crater * biome().crater * 1.6));
  if (a.crater >= 35 && owner) reward(owner, Math.round(a.crater / 8), 'terrain');   // veľký kráter = malý bonus za pretvarovanie terénu
  glows.push({ x, y, r: 40 + a.splash * 1.3, life: 0.4, max: 0.4, color: a.color });
  if (a.splash >= 18) rings.push({ x, y, r: a.splash * 0.3, max: a.splash * 1.15, life: 0.35 + Math.min(0.3, a.splash / 400), max_life: 0.35 + Math.min(0.3, a.splash / 400) });
  trees.filter(tr => Math.hypot(tr.x - x, tr.y0 - tr.h / 2 - y) < a.splash + 25).forEach(tr => killTree(tr, ownerId));
  tanks.forEach(t => {
    if (t.dead) return;
    const d = Math.hypot(x - t.x, y - (t.y - 14));
    if (d < a.splash + 18) {
      const f = 1 - clamp((d - 18) / a.splash, 0, 1) * 0.65;
      if (a.stun) { t.emp = 1; floatText(t.x, t.y - 50, 'EMP!', '#8cff7a'); }
      damage(t, dmg * f, ownerId, t.x, t.y - 20, f >= 0.9);
    }
  });
  obstacles.forEach(o => {   // oceľové prekážky sú teraz tiež zničiteľné (len oveľa odolnejšie) – nič nie je naveky nepriestrelné
    const dx = Math.max(o.x - x, 0, x - (o.x + o.w)), dy = Math.max(obTop(o) - y, 0, y - o.base);
    if (Math.hypot(dx, dy) < a.splash) { o.hp -= dmg * (o.steel ? 0.6 : 1); if (o.hp <= 0) destroyObstacle(o, ownerId); }
  });
  const n = Math.round(10 + a.splash / 3);
  for (let i = 0; i < n; i++) {
    const ang = rand(0, 6.28), v = rand(40, 100 + a.splash * 3);
    spark(x, y, Math.cos(ang) * v, Math.sin(ang) * v - 60, i % 3 ? a.color : '#ffedb0', rand(.3, .8), rand(2, 2 + a.splash / 14), 300, 'glow');
  }
  for (let i = 0; i < 6; i++) spark(x, y, rand(-30, 30), rand(-70, -20), 'rgba(90,90,90,.7)', rand(.6, 1.1), rand(5, 10), -20);
  const B2 = biome(), nd = Math.round(3 + a.splash / 16);   // rozlietané kusy zeme/skaly, tromfnú sa a padajú s rotáciou
  for (let i = 0; i < nd && particles.length < MAXP; i++) {
    const ang = rand(-2.55, -0.6), v = rand(90, 160 + a.splash * 1.3), life = rand(0.55, 1.2);
    particles.push({ x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, life, max: life, size: rand(3.5, 8), color: shade(B2.ground[1], rand(-25, 25)), grav: 480, fx: 'debris', rot: rand(0, 6.28), vrot: rand(-9, 9) });
  }
  noise(0.25 + a.splash / 200, 0.2, 700); tone(140, 40, 0.25, 'sine', 0.1); vibrate(Math.min(55, 12 + a.splash / 4));
  shake = Math.max(shake, a.splash / 6);
  if (a.cluster) for (let i = 0; i < a.cluster; i++) {   // ananás sa rozpadne na malé bombičky
    const ang = -Math.PI / 2 + rand(-1.05, 1.05), v = rand(160, 330);
    spawnProj(x, y - 6, Math.cos(ang) * v, Math.sin(ang) * v, 'bomblet', ownerId, 0.18);
  }
  if (a.volcano) emitters.push({ x, t: 0, left: a.volcano, owner: ownerId });
  if (a.flash) nukeFx(x, y, a);
}
function updateSpecials(dt) {
  emitters.forEach(e => {
    e.t += dt;
    while (e.t >= 0.11 && e.left > 0) { e.t -= 0.11; e.left--; spawnProj(e.x + rand(-6, 6), gy(e.x) - 6, rand(-150, 150), -rand(340, 520), 'lava', e.owner, 0.2); tone(180, 90, 0.08, 'sawtooth', 0.04); }
  });
  emitters = emitters.filter(e => e.left > 0);
  strikes.forEach(st => {
    st.t -= dt;
    if (st.t <= 0) { for (let i = 0; i < st.n; i++) spawnProj(st.x + (i - (st.n - 1) / 2) * 38 + rand(-8, 8), -40 - i * 20, 0, 260, 'bomb', st.owner, 0.05); tone(300, 80, 0.5, 'sawtooth', 0.06); st.done = true; }
  });
  strikes = strikes.filter(st => !st.done);
  glows.forEach(g => g.life -= dt); glows = glows.filter(g => g.life > 0);
  rings.forEach(r => { r.life -= dt; r.r += (r.max - r.r) * Math.min(1, dt * 5); });
  rings = rings.filter(r => r.life > 0);
  flash = Math.max(0, flash - dt * 1.4);
  treadMarks.forEach(m => m.t += dt); treadMarks = treadMarks.filter(m => m.t < 16);
}
function killTree(tr, ownerId) {
  trees = trees.filter(k => k !== tr);
  if (ownerId != null && tanks[ownerId]) reward(tanks[ownerId], TREE_BONUS, 'build');
  for (let i = 0; i < 14; i++) spark(tr.x + rand(-tr.w / 2, tr.w / 2), tr.y0 - rand(tr.h * 0.2, tr.h), rand(-90, 90), rand(-160, 20), ['#2a7040', '#35853f', '#1f5a32', '#6b4a2b'][i % 4], rand(0.5, 1.1), rand(3, 6));
}
function destroyObstacle(o, ownerId) {
  obstacles = obstacles.filter(k => k !== o);
  reward(tanks[ownerId], BUILD_BONUS, 'build');
  for (let i = 0; i < 30; i++) spark(o.x + rand(0, o.w), o.base - rand(0, o.h), rand(-140, 140), rand(-260, 0), ['#8a7a6a', '#5f5347', '#b09c85'][i % 3], rand(.6, 1.3), rand(3, 8));
  noise(0.5, 0.25, 500);
}

// ---------- aktualizácia ----------
function inputOf(p) {
  const a = held[p], k = kb[p];
  return { left: a.left || k.left, right: a.right || k.right, up: a.up || k.up, down: a.down || k.down, fire: a.fire || k.fire, pup: a.pup || k.pup, pdown: a.pdown || k.pdown };
}
function blocked(t, nx) {
  if (tanks.some(o => o !== t && !o.dead && Math.abs(nx - o.x) < 50)) return true;
  return obstacles.some(o => nx + 22 > o.x && nx - 22 < o.x + o.w && obTop(o) < t.y - 4);
}
const dustCol = () => ({ desert: 'rgba(225,195,140,.55)', winter: 'rgba(240,246,252,.6)', mountains: 'rgba(160,160,170,.5)' }[biomeKey] || 'rgba(150,125,90,.5)');
function updateTank(t, dt) {
  if (t.dead) return;
  const B = biome();
  let dir = 0;
  if (state === 'play' && t.id === turnIdx && turnPhase === 'aim') {
    const inp = t.bot ? {} : inputOf(t.id);
    if (t.bot) botUpdate(t, dt);
    const rot = t.stun ? 0 : (inp.up ? 1 : 0) - (inp.down ? 1 : 0);
    if (rot) t.ang = clamp(t.ang + rot * (t.face > 0 ? 1 : -1) * AIM_SPEED * dt, 0, 180);
    const pw = t.stun ? 0 : (inp.pup ? 1 : 0) - (inp.pdown ? 1 : 0);
    if (pw) t.power = clamp(t.power + pw * POWER_SPEED * dt, POWER_MIN, 100);
    dir = t.stun ? 0 : (inp.right ? 1 : 0) - (inp.left ? 1 : 0);
    if (dir && t.fuel <= 0) {
      dir = 0; t.noFuelT -= dt;
      if (t.noFuelT <= 0) { t.noFuelT = 1.2; floatText(t.x, t.y - 50, 'BEZ PALIVA!', '#ff9a3c'); }
    }
  }
  const slope = (gy(t.x + 18) - gy(t.x - 18)) / 36;   // >0 = klesá doprava
  const sp = TANK_SPEED * (1 + 0.2 * t.speedLvl) * B.move, limit = 1.05 + 0.08 * t.speedLvl;
  let vx = 0;
  if (B.ice) {   // ľad: zotrvačnosť a sklz zo svahov
    const up = -slope * dir;
    const target = dir ? dir * sp * clamp(1 - 0.5 * Math.max(0, up), 0.3, 1.3) : 0;
    t.vx += (target - t.vx) * Math.min(1, dt * (dir ? 2.5 : 0.7)) + slope * 70 * dt;
    t.vx = clamp(t.vx, -sp * 1.6, sp * 1.6);
    if (t.vx * -slope > limit * Math.abs(t.vx)) t.vx = 0;
    vx = t.vx;
  } else {
    t.vx = 0;
    const up = -slope * dir;
    if (dir && up < limit) vx = dir * sp * clamp(1 - 0.5 * Math.max(0, up), 0.3, 1.3);
  }
  if (vx) {
    const nx = clamp(t.x + vx * dt, 24, WORLD_W - 24);
    if (!blocked(t, nx)) {
      if (dir) t.fuel = Math.max(0, t.fuel - Math.abs(nx - t.x) * FUEL_PER_PX * B.fuel * (1 + 0.5 * Math.max(0, -slope * dir)));
      t.trackPhase = (t.trackPhase || 0) + (nx - t.x);
      if (quality > 0 && Math.random() < dt * 14) spark(t.x - Math.sign(vx) * 24 + rand(-4, 4), t.y, rand(-20, 20) - vx * 0.3, rand(-40, -12), dustCol(), 0.5, rand(3, 6), 40);
      if (quality > 0) {   // koľajové stopy po pásoch, miznú po chvíli
        t.treadAcc = (t.treadAcc || 0) + Math.abs(nx - t.x);
        if (t.treadAcc >= 9) { t.treadAcc = 0; addTreadMark(t.x, t.y, t.tilt); }
      }
      t.x = nx;
    } else t.vx = 0;
  }
  t.recoil = Math.max(0, (t.recoil || 0) - dt * 4);
  if (quality > 0 && t.hp < maxHp(t) * 0.35 && Math.random() < dt * 6) spark(t.x + rand(-8, 8), t.y - 28, rand(-10, 10), rand(-50, -25), t.hp < maxHp(t) * 0.18 ? 'rgba(30,30,30,.7)' : 'rgba(90,90,90,.6)', 1.2, rand(5, 9), -15);
  // pripnutie k terénu
  const g = groundAvg(t.x);
  if (t.y < g) t.y = Math.min(g, t.y + 420 * dt); else t.y = Math.max(g, t.y - 320 * dt);
  const tt = tiltAt(t.x); t.tilt += (tt - t.tilt) * Math.min(1, dt * 10);
  if ((t.emp > 0 || t.stun) && Math.random() < 0.5) spark(t.x + rand(-20, 20), t.y - rand(4, 34), rand(-30, 30), rand(-60, -10), '#bfff9a', .25, 2, 0);
}
function updateProjectiles(dt) {
  for (const p of projectiles) {
    const a = AMMO[p.type];
    const speed = Math.hypot(p.vx, p.vy);
    const steps = Math.max(1, Math.ceil(speed * dt / 4)), sdt = dt / steps;
    for (let s = 0; s < steps && !p.gone; s++) {
      stepShot(p, sdt);
      const pa = AMMO[p.type];
      if (pa.apexSplit && !p.split && p.vy > 0) {   // sprcha sa v najvyššom bode rozdelí
        p.split = true; p.gone = true; tone(700, 300, 0.2, 'square', 0.05);
        for (let i = 0; i < pa.apexSplit; i++) spawnProj(p.x, p.y, p.vx * 0.9 + (i - (pa.apexSplit - 1) / 2) * 75, p.vy + 20, 'shard', p.owner, 0.12);
        break;
      }
      if (p.y > H + 60 || p.life > 8) { p.gone = true; break; }
      if (p.x < 0 || p.x > WORLD_W) {
        if (p.bounces > 0) { p.vx = -p.vx * 0.8; p.x = clamp(p.x, 1, WORLD_W - 1); p.bounces--; bounceFx(p); continue; }
        p.gone = true; break;
      }
      // tanky
      for (const t of tanks) {
        if (!t.dead && p.life >= (p.arm || 0) && (t.id !== p.owner || p.life > 0.25) && inTank(t, p.x, p.y)) { explosion(p.x, p.y, p.type, p.owner); p.gone = true; break; }
      }
      if (p.gone) break;
      // prekážky
      for (const o of obstacles) {
        if (p.x >= o.x && p.x <= o.x + o.w && p.y >= obTop(o) && p.y <= o.base) {
          if (o.steel && p.bounces > 0) {
            const px = p.x - sdt * 0 - p.vx * sdt, fromSide = px < o.x || px > o.x + o.w;
            if (fromSide) { p.vx = -p.vx * 0.8; p.x += p.vx * sdt * 2; } else { p.vy = -p.vy * 0.8; p.y += p.vy * sdt * 2; }
            p.bounces--; bounceFx(p);
          } else { explosion(p.x, p.y, p.type, p.owner); p.gone = true; }
          break;
        }
      }
      if (p.gone) break;
      for (const tr of trees) {   // koruna stromu strelu spomalí a strom padne
        if (p.x >= tr.x - tr.w / 2 && p.x <= tr.x + tr.w / 2 && p.y >= tr.y0 - tr.h && p.y <= tr.y0 - tr.h * 0.15) { p.vx *= 0.78; p.vy *= 0.78; killTree(tr, p.owner); tone(300, 160, 0.1, 'triangle', 0.05); break; }
      }
      // terén
      const g = gy(p.x);
      if (p.y >= g) {
        if (p.bounces > 0) {
          const nx0 = gy(p.x - 3) - gy(p.x + 3), ny0 = 6;           // normála k terénu (smeruje nahor)
          const len = Math.hypot(nx0, ny0), nx = nx0 / len, ny = -ny0 / len;
          const dot = p.vx * nx + p.vy * ny;
          const rst = biome().bounce; p.vx = (p.vx - 2 * dot * nx) * rst; p.vy = (p.vy - 2 * dot * ny) * rst;
          p.y = g - 2; p.bounces--; bounceFx(p);
        } else { explosion(p.x, clamp(p.y, 0, H), p.type, p.owner); p.gone = true; }
      }
    }
    if (!p.gone) {
      const tr = p.tr || (p.tr = []); tr.push(p.x, p.y); if (tr.length > 20) tr.splice(0, 2);
      if (quality > 1 && a.speed && Math.random() < 0.4) spark(p.x, p.y, rand(-10, 10), rand(-10, 10), a.color, .25, 2, 0, 'glow');
    }
  }
  projectiles = projectiles.filter(p => !p.gone);
}
function bounceFx(p) {
  tone(500, 900, 0.08, 'triangle', 0.06);
  for (let i = 0; i < 6; i++) spark(p.x, p.y, rand(-90, 90), rand(-120, 0), AMMO.bounce.color, .3, 2);
}
function updateCamera(dt) {
  if (lastImpact) { lastImpact.t -= dt; if (lastImpact.t <= 0) lastImpact = null; }
  // žiadne priblíženie na aktuálny ťah/strelu - kamera stále statická a vycentrovaná, nech je vidno celú mapu a všetkých hráčov naraz
  const tx = WORLD_W / 2, ty = H / 2, tz = Math.min(1, W / WORLD_W);
  const k = 1 - Math.pow(0.0025, Math.min(0.1, dt));   // plynulé tlmené dorovnanie (framerate-nezávislé), hlavne pri zmene veľkosti mapy
  cam.x += (tx - cam.x) * k; cam.y += (ty - cam.y) * k; cam.zoom += (tz - cam.zoom) * k;
  const halfW = W / cam.zoom / 2, halfH = H / cam.zoom / 2;
  cam.x = clamp(cam.x, halfW, WORLD_W - halfW); cam.y = clamp(cam.y, halfH, H - halfH);
}
function update(dt) {
  if (paused) return;
  time += dt;
  updateCamera(dt);
  if (ammoMenu.t > 0) ammoMenu.t -= dt;
  if (document.body.dataset.state !== state) document.body.dataset.state = state;
  shake = Math.max(0, shake - dt * 30);
  weather.forEach(p => {
    const kind = biome().weather;
    if (kind === 'snow') { p.y += (40 + 30 * p.s) * dt; p.x += (wind * 0.5 + Math.sin(time + p.ph) * 12) * dt; }
    else if (kind === 'dust') { p.x += (wind * 2.2 + (wind >= 0 ? 40 : -40)) * dt; p.y += Math.sin(time * 2 + p.ph) * 10 * dt; }
    else if (kind === 'leaf') { p.y += 22 * dt; p.x += (wind * 0.6 + Math.sin(time * 1.5 + p.ph) * 25) * dt; }
    else if (kind === 'pollen') { p.y += Math.sin(time * 0.8 + p.ph) * 6 * dt; p.x += (wind * 0.3 + 8) * dt; }
    else if (kind === 'mist') p.x += (wind * 0.25 + 6) * dt;
    if (p.x > WORLD_W + 60) p.x = -60; if (p.x < -60) p.x = WORLD_W + 60; if (p.y > H + 10) p.y = -10;
  });
  clouds.forEach(c => { c.x += wind * 0.05 * dt + 3 * dt; if (c.x > WORLD_W + 120) c.x = -120; if (c.x < -120) c.x = WORLD_W + 120; });

  if (state === 'shop') {
    shopTimer -= dt;
    $('shopTimer').textContent = Math.max(0, Math.ceil(shopTimer));
    if (shopTimer <= 0 || ready.every(Boolean)) startPlay();
  }
  if (state === 'play' || state === 'roundEnd') {
    tanks.forEach(t => updateTank(t, dt));
    updateProjectiles(dt); updateSpecials(dt);
    if (state === 'play') {
      if (turnPhase === 'aim') {
        turnTimer -= dt;
        if (turnTimer <= 0) { floatText(tanks[turnIdx].x, tanks[turnIdx].y - 70, 'Čas vypršal', '#ff9a3c'); nextTurn(); }
      } else if (projectiles.length === 0 && beams.length === 0 && emitters.length === 0 && strikes.length === 0) { settle += dt; if (settle >= 0.9) nextTurn(); }
      else settle = 0;
    }
    // podkopané budovy sa zrútia
    obstacles.slice().forEach(o => { if (!o.steel && gy(o.x + o.w / 2) > o.base + 30) destroyObstacle(o); });
    tanks.forEach(t => { if (t.dead && Math.random() < 0.3) spark(t.x + rand(-14, 14), t.y - 20, rand(-8, 8), rand(-50, -20), 'rgba(60,60,60,.8)', 1, rand(4, 9), -10); });
    if (state === 'roundEnd') { endTimer -= dt; if (endTimer <= 0) afterRoundEnd(); }
    if (net.active && state === 'play') {   // priebežne posiela mierenie aj let strely, nech to súper vidí naživo, nie iba na začiatku/konci ťahu
      netLiveTimer -= dt;
      if (netLiveTimer <= 0) { netLiveTimer = 0.15; netPublish(); }
    }
  } else if (state === 'shop') {
    tanks.forEach(t => { t.tilt = tiltAt(t.x); t.y = groundAvg(t.x); });
  }
  let pw = 0;   // aktualizácia častíc na mieste (bez alokácií)
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]; p.life -= dt; if (p.life <= 0) continue;
    p.vy += p.grav * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.fx === 'smoke') p.size += 9 * dt; if (p.vrot) p.rot += p.vrot * dt;
    particles[pw++] = p;
  }
  particles.length = pw;
  beams.forEach(b => b.life -= dt); beams = beams.filter(b => b.life > 0);
  updatePadLabels();
}

// ---------- kreslenie ----------
function draw() {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  if (shake > 0) ctx.translate(rand(-shake, shake), rand(-shake, shake));
  ctx.translate(W / 2, H / 2); ctx.scale(cam.zoom, cam.zoom); ctx.translate(-cam.x, -cam.y);
  drawSky(); drawTerrain(); drawTreadMarks(); drawDecor(); trees.forEach(drawTree); obstacles.forEach(drawObstacle);
  tanks.forEach(drawTank);
  drawTurnMarker();
  drawWeather();
  drawProjectiles(); drawBeams(); drawParticles(); drawSpecials();
  ctx.restore();
  ctx.drawImage(vigL.c, 0, 0, W, H);
  drawHud();
  if (showFps) { ctx.fillStyle = '#7CFC7C'; ctx.font = '11px monospace'; ctx.textAlign = 'left'; ctx.fillText(Math.round(1000 / fpsEma) + ' fps · kvalita ' + quality + ' · ×' + SCALE.toFixed(1) + ' · ' + particles.length + ' častíc', 8, H - 8); }
}
function drawTurnMarker() {
  if (state !== 'play') return;
  const t = tanks[turnIdx]; if (!t || t.dead) return;
  drawAimAids(t);
  const y = t.y - 96 + Math.sin(time * 5) * 4;
  ctx.fillStyle = t.color; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(t.x, y + 14); ctx.lineTo(t.x - 10, y); ctx.lineTo(t.x + 10, y); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.textAlign = 'center'; ctx.font = 'bold 12px system-ui'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.8)';
  const label = turnPhase === 'aim' ? 'NA RADE' + (t.stun ? ' (omráčený)' : '') : 'strela letí…';
  ctx.strokeText(label, t.x, y - 5); ctx.fillStyle = '#fff'; ctx.fillText(label, t.x, y - 5);
}
function buildSky() {
  const B = biome(), x = skyL.x;
  x.setTransform(SCALE, 0, 0, SCALE, 0, 0); x.clearRect(0, 0, WORLD_W + 2 * M, H + 2 * VM);
  x.save(); x.translate(M, VM);
  const g = x.createLinearGradient(0, -VM, 0, H + VM);
  g.addColorStop(0, B.sky[0]); g.addColorStop(0.55, B.sky[1]); g.addColorStop(1, B.sky[2]);
  x.fillStyle = g; x.fillRect(-M, -VM, WORLD_W + 2 * M, H + 2 * VM);
  skyIsDark = lum(B.sky[0]) < 0.25;   // hviezdy sa teraz kreslia animovane (blikanie + paralax) v drawSky(), nie sem natrvalo
  if (biomeKey === 'winter') {   // polárna žiara
    for (let k = 0; k < 3; k++) {
      const ag = x.createLinearGradient(0, 40 + k * 30, 0, 230 + k * 30);
      ag.addColorStop(0, 'rgba(90,255,190,0)'); ag.addColorStop(0.5, 'rgba(90,255,190,' + (0.17 - k * 0.04) + ')'); ag.addColorStop(1, 'rgba(120,120,255,0)');
      x.fillStyle = ag; x.beginPath(); x.moveTo(-M, 60 + k * 30);
      for (let px = -M; px <= WORLD_W + M; px += 20) x.lineTo(px, 90 + k * 30 + Math.sin(px * 0.006 + k * 1.7) * 40);
      x.lineTo(WORLD_W + M, 250 + k * 30); x.lineTo(-M, 250 + k * 30); x.closePath(); x.fill();
    }
  }
  const sg = x.createRadialGradient(sun.x, sun.y, 4, sun.x, sun.y, 90);
  sg.addColorStop(0, B.sun); sg.addColorStop(0.3, B.sun + 'cc'); sg.addColorStop(1, B.sun + '00');
  x.fillStyle = sg; x.fillRect(sun.x - 100, sun.y - 100, 200, 200);
  hills.forEach(h => {
    const hg = x.createLinearGradient(0, h.base - h.a, 0, h.base + 140);
    hg.addColorStop(0, h.col); hg.addColorStop(1, shade(h.col, -28));
    x.fillStyle = hg; x.beginPath(); x.moveTo(-M, H + VM);
    for (let px = -M; px <= WORLD_W + M; px += 16) x.lineTo(px, h.base + h.a * Math.sin(px * h.f + h.p));
    x.lineTo(WORLD_W + M, H + VM); x.fill();
  });
  x.restore(); skyDirty = false;
}
function drawSky() {
  if (skyDirty) buildSky();
  ctx.drawImage(skyL.c, -M, -VM, WORLD_W + 2 * M, H + 2 * VM);
  if (skyIsDark) {   // hviezdy blikajú a posúvajú sa pomalšie než kamera (paralax = pôsobia vzdialenejšie)
    const px = cam.x * 0.72;
    ctx.fillStyle = '#fff';
    stars.forEach(st => {
      const tw = 0.7 + 0.3 * Math.sin(time * st.tw + st.ph), sx = ((st.x + px) % WORLD_W + WORLD_W) % WORLD_W;
      ctx.globalAlpha = st.a * (1 - st.y / 380) * tw;
      ctx.beginPath(); ctx.arc(sx, st.y, st.r, 0, 6.3); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = 'rgba(255,255,255,.16)';
  clouds.forEach(c => { ctx.beginPath(); ctx.ellipse(c.x, c.y, 70 * c.s, 18 * c.s, 0, 0, 6.3); ctx.ellipse(c.x + 30 * c.s, c.y - 10 * c.s, 40 * c.s, 16 * c.s, 0, 0, 6.3); ctx.ellipse(c.x - 34 * c.s, c.y - 4 * c.s, 34 * c.s, 13 * c.s, 0, 0, 6.3); ctx.fill(); });
}
function buildTerrain() {
  const B = biome(), x = terL.x;
  x.setTransform(SCALE, 0, 0, SCALE, 0, 0); x.clearRect(0, 0, WORLD_W + 2 * M, H + 2 * VM);
  x.save(); x.translate(M, VM);
  const trace = (off, step, wob) => {
    x.beginPath(); x.moveTo(-M, ground[0] + off);
    for (let px = 0; px <= WORLD_W; px += step) x.lineTo(px, ground[px] + off + (wob ? Math.sin(px * 0.02 + wob * 2) * 5 : 0));
    x.lineTo(WORLD_W + M, ground[WORLD_W] + off);
  };
  const g = x.createLinearGradient(0, B.gtop, 0, H);
  g.addColorStop(0, B.ground[0]); g.addColorStop(B.gmid, B.ground[1]); g.addColorStop(1, B.ground[2]);
  x.fillStyle = g; trace(0, 2); x.lineTo(WORLD_W + M, H + VM); x.lineTo(-M, H + VM); x.closePath(); x.fill();
  x.globalCompositeOperation = 'source-atop';   // textúra len vo vnútri terénu
  x.lineWidth = 1.3; x.strokeStyle = 'rgba(0,0,0,.075)';
  for (let k = 1; k <= 6; k++) { trace(k * 38, 8, k); x.stroke(); }
  specks.forEach(sp => { x.fillStyle = sp.a > 0 ? 'rgba(255,255,255,' + sp.a + ')' : 'rgba(0,0,0,' + (-sp.a) + ')'; x.fillRect(sp.x, sp.y, sp.r, sp.r); });
  x.strokeStyle = 'rgba(0,0,0,.22)'; x.lineWidth = 16; trace(10, 4); x.stroke();      // tieň pod hranou
  x.drawImage(scorchL.c, -M, -VM, WORLD_W + 2 * M, H + 2 * VM);                                // škvrny po výbuchoch
  x.globalCompositeOperation = 'source-over';
  x.strokeStyle = B.edge; x.lineWidth = 4; trace(0, 2); x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.28)'; x.lineWidth = 1.4; trace(-1.5, 2); x.stroke();
  if (biomeKey === 'meadow' || biomeKey === 'forest') {   // steblá trávy
    x.strokeStyle = B.edge; x.lineWidth = 1.5; x.beginPath();
    for (let px = 2; px < WORLD_W; px += 5) { const h = 3 + hash1(px) * 5, y = ground[px]; x.moveTo(px, y); x.lineTo(px + (hash1(px + 7) - 0.5) * 4, y - h); }
    x.stroke();
  } else if (biomeKey === 'winter') {                      // snehové hrudy
    x.fillStyle = 'rgba(255,255,255,.95)';
    for (let px = 3; px < WORLD_W; px += 9) { x.beginPath(); x.arc(px, ground[px] - 0.5, 2 + hash1(px) * 2.5, 0, 6.3); x.fill(); }
  }
  x.restore(); terDirty = false;
}
function drawTerrain() {
  if (terDirty) buildTerrain();
  ctx.drawImage(terL.c, -M, -VM, WORLD_W + 2 * M, H + 2 * VM);
}
function drawTreadMarks() {   // stopy po pásoch na zemi – kreslia sa priamo nad terénom, postupne vyblednú a zmiznú
  if (!treadMarks.length) return;
  ctx.fillStyle = 'rgba(15,12,10,.5)';
  treadMarks.forEach(m => {
    const f = clamp(1 - m.t / 16, 0, 1); if (f <= 0) return;
    ctx.globalAlpha = f * 0.4;
    ctx.save(); ctx.translate(m.x, m.y + 2); ctx.rotate(m.tilt);
    ctx.fillRect(-10, -1, 20, 2);
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}
function drawTree(tr) {
  const x = tr.x, y = gy(tr.x), h = tr.h, w = tr.w, cols = ['#1f5a32', '#2a7040', '#35853f'];
  let tg = ctx.createLinearGradient(x - 3, 0, x + 3, 0); tg.addColorStop(0, '#2e2013'); tg.addColorStop(0.5, '#4a3320'); tg.addColorStop(1, '#2e2013');
  ctx.fillStyle = tg; ctx.fillRect(x - 3, y - h * 0.25, 6, h * 0.25 + 2);
  for (let i = 0; i < 3; i++) {
    const ty = y - h * (0.2 + i * 0.27), bw = w * (1 - i * 0.22);
    let g = ctx.createLinearGradient(x - bw / 2, ty, x + bw / 2, ty); g.addColorStop(0, shade(cols[i], -20)); g.addColorStop(0.45, cols[i]); g.addColorStop(1, shade(cols[i], 22));
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - bw / 2, ty); ctx.lineTo(x + bw / 2, ty); ctx.lineTo(x, ty - h * 0.34); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 1; ctx.stroke();
  }
}
function drawDecor() {
  const snowy = biomeKey === 'winter';
  decor.forEach(d => {
    const y = gy(d.x), sc = d.s;
    ctx.save(); ctx.translate(d.x, y + 1);
    if (d.type === 'cactus') {
      const base = '#4f8a3a', g = ctx.createLinearGradient(-4 * sc, 0, 4 * sc, 0); g.addColorStop(0, shade(base, -22)); g.addColorStop(0.5, base); g.addColorStop(1, shade(base, 20));
      ctx.fillStyle = g;
      roundRect(-4 * sc, -36 * sc, 8 * sc, 36 * sc, 4 * sc); ctx.fill();
      roundRect(-15 * sc, -26 * sc, 6 * sc, 14 * sc, 3 * sc); ctx.fill(); ctx.fillRect(-15 * sc, -16 * sc, 11 * sc, 5 * sc);
      roundRect(9 * sc, -30 * sc, 6 * sc, 16 * sc, 3 * sc); ctx.fill(); ctx.fillRect(4 * sc, -19 * sc, 11 * sc, 5 * sc);
      ctx.strokeStyle = shade(base, -35); ctx.lineWidth = 0.8;
      ctx.beginPath(); for (let yy = -33; yy < -3; yy += 5 * sc) { ctx.moveTo(-4 * sc, yy); ctx.lineTo(-1 * sc, yy); ctx.moveTo(1 * sc, yy - 2); ctx.lineTo(4 * sc, yy - 2); } ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(-3.2 * sc, -34 * sc, 1.2 * sc, 30 * sc);
    } else if (d.type === 'pine') {
      let tg = ctx.createLinearGradient(-2 * sc, 0, 2 * sc, 0); tg.addColorStop(0, '#2e2013'); tg.addColorStop(1, '#4a3320');
      ctx.fillStyle = tg; ctx.fillRect(-2 * sc, -10 * sc, 4 * sc, 10 * sc);
      for (let i = 0; i < 3; i++) {
        const ty = -8 * sc - i * 14 * sc, bw = (26 - i * 6) * sc, base = snowy ? '#e7eef6' : '#25623f';
        const g = ctx.createLinearGradient(-bw / 2, ty, bw / 2, ty); g.addColorStop(0, shade(base, -18)); g.addColorStop(0.5, base); g.addColorStop(1, shade(base, 18));
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-bw / 2, ty); ctx.lineTo(bw / 2, ty); ctx.lineTo(0, ty - 20 * sc); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.2)'; ctx.lineWidth = 1; ctx.stroke();
        if (snowy) { ctx.fillStyle = '#2f5a48'; ctx.beginPath(); ctx.moveTo(-bw / 2 + 3, ty); ctx.lineTo(bw / 2 - 3, ty); ctx.lineTo(0, ty - 10 * sc); ctx.closePath(); ctx.fill(); }
      }
    } else if (d.type === 'bush') {
      const base = biomeKey === 'meadow' ? '#3f8a34' : '#2d6b35';
      [[-9, -7, 8], [0, -10, 10], [10, -6, 8]].forEach(([bx, by, r]) => {
        const g = ctx.createRadialGradient((bx - r * 0.3) * sc, (by - r * 0.3) * sc, r * 0.15 * sc, bx * sc, by * sc, r * sc);
        g.addColorStop(0, shade(base, 30)); g.addColorStop(1, shade(base, -15));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx * sc, by * sc, r * sc, 0, 6.3); ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = 1; ctx.stroke();
      });
    } else {
      const base = snowy ? '#b8c6d6' : biomeKey === 'desert' ? '#a5814f' : '#6b7280';
      const g = ctx.createLinearGradient(-14 * sc, -14 * sc, 15 * sc, 0); g.addColorStop(0, shade(base, 25)); g.addColorStop(0.55, base); g.addColorStop(1, shade(base, -30));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(-14 * sc, 0); ctx.lineTo(-9 * sc, -11 * sc); ctx.lineTo(3 * sc, -14 * sc); ctx.lineTo(13 * sc, -5 * sc); ctx.lineTo(15 * sc, 0); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-9 * sc, -11 * sc); ctx.lineTo(3 * sc, -14 * sc); ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.moveTo(3 * sc, -14 * sc); ctx.lineTo(13 * sc, -5 * sc); ctx.lineTo(15 * sc, 0); ctx.lineTo(6 * sc, -3 * sc); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  });
}
function drawWeather() {
  const kind = biome().weather;
  weather.forEach(p => {
    if (kind === 'snow') { ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 * p.s, 0, 6.3); ctx.fill(); }
    else if (kind === 'dust') { ctx.strokeStyle = 'rgba(232,192,120,.45)'; ctx.lineWidth = 1.5 * p.s; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - (wind >= 0 ? 1 : -1) * (12 + Math.abs(wind) * 0.25), p.y); ctx.stroke(); }
    else if (kind === 'leaf') { ctx.fillStyle = p.ph > 3 ? 'rgba(112,160,60,.8)' : 'rgba(170,120,50,.8)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, 3.5 * p.s, 1.8 * p.s, p.ph + time, 0, 6.3); ctx.fill(); }
    else if (kind === 'pollen') { ctx.fillStyle = 'rgba(255,240,150,.45)'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * p.s, 0, 6.3); ctx.fill(); }
    else if (kind === 'mist') { ctx.fillStyle = 'rgba(235,240,250,.07)'; ctx.beginPath(); ctx.ellipse(p.x, p.y, 200 * p.s, 26 * p.s, 0, 0, 6.3); ctx.fill(); }
  });
}
function drawAimAids(t) {
  if (turnPhase !== 'aim') return;
  const bw = 46;
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(t.x - bw / 2, t.y + 10, bw, 6);
  ctx.fillStyle = 'hsl(' + (120 - t.power * 1.1) + ',90%,55%)'; ctx.fillRect(t.x - bw / 2, t.y + 10, bw * t.power / 100, 6);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'center'; ctx.fillText(Math.round(t.power) + '%', t.x, t.y + 27);
}
function drawObstacle(o) {
  const top = obTop(o);
  if (o.steel) {
    const dmg = 1 - o.hp / (o.maxHp || 260);
    let g = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    g.addColorStop(0, shade('#8b93a3', -dmg * 45)); g.addColorStop(0.12, shade('#c6ced8', -dmg * 45));
    g.addColorStop(0.5, shade('#7d8794', -dmg * 45)); g.addColorStop(1, shade('#565f6c', -dmg * 45));
    ctx.fillStyle = g; ctx.fillRect(o.x, top, o.w, o.h);
    ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(o.x, top, o.w, 2);   // horný lesk
    ctx.strokeStyle = '#4a525e'; ctx.lineWidth = 3; ctx.strokeRect(o.x, top, o.w, o.h);
    ctx.beginPath();
    for (let y = top + 14; y < o.base; y += 22) { ctx.moveTo(o.x, y); ctx.lineTo(o.x + o.w, y); }
    ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath();
    for (let y = top + 15; y < o.base; y += 22) { ctx.moveTo(o.x, y); ctx.lineTo(o.x + o.w, y); }
    ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#c6ced8'; ctx.fillRect(o.x + 4, top + 4, 5, o.h - 8);
    ctx.fillStyle = '#3b414c';   // nity v rohoch panelov
    for (let y = top + 14; y < o.base; y += 22) { [o.x + 7, o.x + o.w - 7].forEach(bx => { ctx.beginPath(); ctx.arc(bx, y - 7, 1.8, 0, 6.3); ctx.fill(); }); }
    ctx.fillStyle = 'rgba(255,255,255,.35)';
    for (let y = top + 14; y < o.base; y += 22) { [o.x + 6.4, o.x + o.w - 7.6].forEach(bx => { ctx.beginPath(); ctx.arc(bx, y - 7.5, 0.6, 0, 6.3); ctx.fill(); }); }
    if (dmg > 0.35) {   // oceľ tiež popraská, keď schytá dosť zásahov
      ctx.strokeStyle = '#ff9a3c'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(o.x + o.w * .25, top); ctx.lineTo(o.x + o.w * .5, top + o.h * .45); ctx.lineTo(o.x + o.w * .3, o.base); ctx.stroke();
    }
    if (dmg > 0.7) { ctx.beginPath(); ctx.moveTo(o.x + o.w * .8, top + 4); ctx.lineTo(o.x + o.w * .55, top + o.h * .6); ctx.stroke(); }
  } else {
    const dmg = 1 - o.hp / (o.maxHp || 80);
    let g = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    g.addColorStop(0, shade('#8a6a52', -dmg * 35)); g.addColorStop(0.5, shade('#a2836a', -dmg * 35)); g.addColorStop(1, shade('#8a6a52', -dmg * 35));
    ctx.fillStyle = g; ctx.fillRect(o.x, top, o.w, o.h);
    ctx.strokeStyle = 'rgba(0,0,0,.22)'; ctx.lineWidth = 1;   // zvislé škáry medzi doskami
    ctx.beginPath(); for (let px = o.x + 10; px < o.x + o.w; px += 11) { ctx.moveTo(px, top + 2); ctx.lineTo(px, o.base - 2); } ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 1;   // vodorovné vlákna dreva
    ctx.beginPath(); for (let yy = top + 6; yy < o.base; yy += 6) { ctx.moveTo(o.x + 2, yy); ctx.lineTo(o.x + o.w - 2, yy + 1.5); } ctx.stroke();
    ctx.fillStyle = '#6d4f3b'; ctx.fillRect(o.x - 4, top - 8, o.w + 8, 10);
    ctx.strokeStyle = 'rgba(255,255,255,.15)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(o.x - 4, top - 7.5); ctx.lineTo(o.x + o.w + 4, top - 7.5); ctx.stroke();
    ctx.fillStyle = '#ffe28a';
    for (let yy = top + 16; yy < o.base - 18; yy += 26) for (let xx = o.x + 8; xx < o.x + o.w - 12; xx += 20) ctx.fillRect(xx, yy, 10, 12);
    ctx.fillStyle = 'rgba(0,0,0,.4)';   // klince na kovových sponách rohov
    [[o.x + 3, top + 3], [o.x + o.w - 3, top + 3], [o.x + 3, o.base - 5], [o.x + o.w - 3, o.base - 5]].forEach(([bx, by]) => { ctx.beginPath(); ctx.arc(bx, by, 1.4, 0, 6.3); ctx.fill(); });
    ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.lineWidth = 2;
    if (dmg > 0.2) { ctx.beginPath(); ctx.moveTo(o.x + o.w * .3, top); ctx.lineTo(o.x + o.w * .45, top + o.h * .5); ctx.lineTo(o.x + o.w * .35, o.base); ctx.stroke(); }
    if (dmg > 0.55) { ctx.beginPath(); ctx.moveTo(o.x + o.w * .8, top + 6); ctx.lineTo(o.x + o.w * .6, top + o.h * .6); ctx.stroke(); }
  }
}
function roundRect(x, y, w, h, r, c) {
  c = c || ctx;
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
// ---------- AI-generované sprity tankov (trup + veža s hlavňou ako samostatná otočná vrstva) ----------
const TANK_COLOR_NAME = {
  '#3e8bff': 'blue', '#e5484d': 'red', '#3fbf5f': 'green', '#f2c230': 'gold', '#b06cff': 'purple',
  '#ff8a3d': 'orange', '#2fd0c8': 'teal', '#ff5fb0': 'pink', '#9aa5b1': 'gray', '#8bd450': 'lime',
};
// Realistickejší sprite set (2025-10) je prekreslený z jednej spoločnej flat-side-view predlohy a len prefarbený
// pre každú farbu (HSV hue/sat swap pri zachovaní tieňovania) – preto majú všetky farby rovnaké rozmery/pivot.
const TANK_ART_SHARED = { hullW: 400, hullH: 101, pivotX: 175, turretSide: 437 };
const TANK_ART_META = {
  blue: TANK_ART_SHARED, red: TANK_ART_SHARED, green: TANK_ART_SHARED, gold: TANK_ART_SHARED, purple: TANK_ART_SHARED,
  orange: TANK_ART_SHARED, teal: TANK_ART_SHARED, pink: TANK_ART_SHARED, gray: TANK_ART_SHARED, lime: TANK_ART_SHARED,
};
const TANK_TARGET_W = 130;   // cieľová šírka trupu na obrazovke (px); zväčšené z 76, nech je detailnejší realistický sprite čitateľný
function tankArtScale(colorName) { const m = TANK_ART_META[colorName]; return m ? TANK_TARGET_W / m.hullW : 0; }
function tankArtPivotH(colorHex) {
  const name = TANK_COLOR_NAME[String(colorHex).toLowerCase()], m = TANK_ART_META[name];
  return m ? m.hullH * tankArtScale(name) : 22;
}
const tankArt = {};
Object.keys(TANK_ART_META).forEach(name => {
  const meta = TANK_ART_META[name], hull = new Image(), turret = new Image();
  const rec = Object.assign({ hull, turret, loaded: false, scale: tankArtScale(name) }, meta);
  let ready = 0;
  const onOne = () => { if (++ready === 2) rec.loaded = true; };
  hull.onload = onOne; turret.onload = onOne;
  hull.src = 'assets/tanks/tank_hull_' + name + '.png';
  turret.src = 'assets/tanks/tank_turret_' + name + '.png';
  tankArt[name] = rec;
});
function tankSprite(color, dead) {   // trup tanku sa vykreslí raz pre každú farbu (záložný procedurálny variant)
  const key = color + (dead ? '!' : '');
  if (sprites[key]) return sprites[key];
  const w = 72, h = 58, L = mkLayer(w, h), x = L.x, base = dead ? '#3d3d3d' : color;
  x.translate(w / 2, h - 6);
  let g = x.createLinearGradient(0, -12, 0, 2); g.addColorStop(0, '#2c313c'); g.addColorStop(1, '#0e1016');
  x.fillStyle = g; roundRect(-28, -12, 56, 14, 7, x); x.fill(); x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 1; x.stroke();
  x.save(); roundRect(-28, -12, 56, 14, 7, x); x.clip();   // textúra článkov pásu
  x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1;
  x.beginPath(); for (let i = -30; i <= 30; i += 4) { x.moveTo(i, -12); x.lineTo(i - 2.5, 2); } x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.08)'; x.lineWidth = 1;
  x.beginPath(); for (let i = -29; i <= 30; i += 4) { x.moveTo(i, -12); x.lineTo(i - 2.5, 2); } x.stroke();
  x.restore();
  for (let i = -20; i <= 20; i += 10) {
    const wg = x.createRadialGradient(i - 1, -6, 1, i, -5, 5.5); wg.addColorStop(0, '#8b93a6'); wg.addColorStop(1, '#3a404f');
    x.fillStyle = wg; x.beginPath(); x.arc(i, -5, 5, 0, 6.3); x.fill();
    x.fillStyle = '#1b1f28'; x.beginPath(); x.arc(i, -5, 1.8, 0, 6.3); x.fill();
    x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 1.6; x.beginPath(); x.arc(i, -12.5, 6.4, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();   // blatník nad kolesom
  }
  g = x.createLinearGradient(0, -25, 0, -10); g.addColorStop(0, shade(base, 45)); g.addColorStop(0.5, base); g.addColorStop(1, shade(base, -55));
  x.fillStyle = g; x.beginPath(); x.moveTo(-24, -11); x.lineTo(-22, -22); x.lineTo(-14, -25); x.lineTo(14, -25); x.lineTo(22, -22); x.lineTo(26, -11); x.closePath(); x.fill();
  x.strokeStyle = 'rgba(0,0,0,.45)'; x.lineWidth = 1.2; x.stroke();
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.moveTo(-20, -23); x.lineTo(-13, -24.3); x.lineTo(13, -24.3); x.lineTo(19, -22.5); x.stroke();
  x.strokeStyle = 'rgba(0,0,0,.18)'; x.lineWidth = 1; x.beginPath(); x.moveTo(-21, -17); x.lineTo(23, -17); x.stroke();   // panelový šev
  x.fillStyle = shade(base, -50); x.fillRect(-23, -14.5, 6, 3); x.fillRect(17, -14.5, 6, 3);   // vetracie mriežky vzadu
  x.fillStyle = 'rgba(0,0,0,.35)'; [-18, -8, 8, 18].forEach(i => {
    x.beginPath(); x.arc(i, -15, 1.1, 0, 6.3); x.fill();
    x.fillStyle = 'rgba(255,255,255,.3)'; x.beginPath(); x.arc(i - 0.35, -15.35, 0.4, 0, 6.3); x.fill(); x.fillStyle = 'rgba(0,0,0,.35)';
  });
  x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(-21, -20, 1.6, 0, 6.3); x.fill(); x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 0.6; x.stroke();   // predné svetlo
  const tg = x.createRadialGradient(-3, -31, 2, 0, -25, 13); tg.addColorStop(0, shade(base, 60)); tg.addColorStop(1, shade(base, -45));
  x.fillStyle = tg; x.beginPath(); x.ellipse(0, -24, 12, 10, 0, Math.PI, 0); x.closePath(); x.fill();
  x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 1; x.stroke();
  x.fillStyle = shade(base, -35); x.fillRect(-11, -25.5, 3.5, 2.4); x.fillRect(7.5, -25.5, 3.5, 2.4);   // vetráky na veži
  x.strokeStyle = shade(base, -60); x.lineWidth = 1.6; x.beginPath(); x.moveTo(9, -32); x.lineTo(15, -41); x.stroke();   // anténa
  x.fillStyle = shade(base, -60); x.beginPath(); x.arc(15, -41, 0.9, 0, 6.3); x.fill();
  x.fillStyle = shade(base, -30); x.beginPath(); x.ellipse(-3, -31, 4, 1.8, 0, 0, 6.3); x.fill();
  x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 0.8; x.beginPath(); x.moveTo(-6, -31.5); x.lineTo(-6.8, -33.5); x.stroke();   // rukoväť poklopu
  if (dead) { x.strokeStyle = 'rgba(0,0,0,.7)'; x.lineWidth = 1.4; x.beginPath(); x.moveTo(-10, -25); x.lineTo(-3, -17); x.lineTo(-8, -12); x.moveTo(8, -25); x.lineTo(13, -16); x.stroke(); }
  return (sprites[key] = L);
}
function drawTank(t) {
  const dead = t.dead;
  const art = tankArt[TANK_COLOR_NAME[String(t.color).toLowerCase()]];
  const useArt = art && art.loaded;
  ctx.save(); ctx.translate(t.x, t.y + 1); ctx.rotate(t.tilt);
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(0, 2, 31, 4.5, 0, 0, 6.3); ctx.fill();   // tieň
  if (useArt) {
    if (dead) ctx.filter = 'grayscale(1) brightness(.55)';
    const s = art.scale;
    ctx.drawImage(art.hull, -art.pivotX * s, -art.hullH * s, art.hullW * s, art.hullH * s);
    if (dead) ctx.filter = 'none';
  } else {
    ctx.drawImage(tankSprite(t.color, dead).c, -36, -52, 72, 58);
    ctx.fillStyle = 'rgba(0,0,0,.5)';   // pohyb pásov
    const ph = (((t.trackPhase || 0) % 6) + 6) % 6;
    for (let i = -26; i < 26; i += 6) ctx.fillRect(i + ph, -1, 2, 3);
    if (!dead && t.armorLvl > 0) {   // farebný pás brnenia podľa úrovne
      ctx.fillStyle = tierCss(t.armorLvl); ctx.fillRect(-19, -13.5, 38, 3);
      for (let i = 0; i < t.armorLvl; i++) ctx.fillRect(-18 + i * 3.6, -27, 2, 3);
    }
  }
  ctx.restore();
  if (dead) return;
  const p = pivot(t), a = t.ang * Math.PI / 180, ux = Math.cos(a), uy = -Math.sin(a), rc = (t.recoil || 0) * 7, x0 = p.x - ux * rc, y0 = p.y - uy * rc, L = 36;
  if (useArt) {
    const ts = art.turretSide * art.scale;
    ctx.save(); ctx.translate(x0, y0); ctx.rotate(-a);
    ctx.drawImage(art.turret, -ts / 2, -ts / 2, ts, ts);
    ctx.restore();
  } else {
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#161a22'; ctx.lineWidth = 8.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + ux * L, y0 + uy * L); ctx.stroke();
  ctx.strokeStyle = '#59627a'; ctx.lineWidth = 5.5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + ux * L, y0 + uy * L); ctx.stroke();
  ctx.strokeStyle = t.color; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + ux * L, y0 + uy * L); ctx.stroke();
  ctx.lineCap = 'butt'; ctx.strokeStyle = '#11141b'; ctx.lineWidth = 11;
  ctx.beginPath(); ctx.moveTo(x0 + ux * (L - 7), y0 + uy * (L - 7)); ctx.lineTo(x0 + ux * (L - 1), y0 + uy * (L - 1)); ctx.stroke();
  ctx.fillStyle = '#20242e'; ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, 6.3); ctx.fill();
  }
  if (t.shield > 0) {
    const T = t.shT || 1, col = tierCss(T), frac = clamp(t.shield / (t.shieldMax || 1), 0.25, 1), ss = TANK_TARGET_W / 76;
    const pulse = frac * (0.55 + 0.25 * Math.sin(time * 6));
    ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = 2 + T * 0.35;
    ctx.beginPath(); ctx.arc(t.x, t.y - 16 * ss, (36 + (T >= 10 ? 4 : 0)) * ss, 0, 6.3);
    ctx.globalAlpha = pulse * 0.2; ctx.fill();
    ctx.globalAlpha = pulse; ctx.stroke();
    if (T >= 7) { ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(t.x, t.y - 16 * ss, (42 + (T >= 10 ? 4 : 0)) * ss, 0, 6.3); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }
}
function drawProjectiles() {
  const R = { he: 6, nukeS: 8, nukeL: 11, pine: 6, bomblet: 3, shard: 3.5, lava: 4, bomb: 5, missile: 5 };
  ctx.globalCompositeOperation = 'lighter';
  projectiles.forEach(p => {   // žiarivá stopa
    const tr = p.tr; if (!tr || tr.length < 4) return;
    ctx.strokeStyle = AMMO[p.type].color; ctx.lineCap = 'round';
    for (let i = 2; i < tr.length; i += 2) {
      const f = i / tr.length; ctx.globalAlpha = f * 0.55; ctx.lineWidth = 1 + f * (R[p.type] || 4.5) * 0.9;
      ctx.beginPath(); ctx.moveTo(tr[i - 2], tr[i - 1]); ctx.lineTo(tr[i], tr[i + 1]); ctx.stroke();
    }
  });
  ctx.lineCap = 'butt';
  projectiles.forEach(p => {
    const r = R[p.type] || 4.5, col = AMMO[p.type].color;
    ctx.globalAlpha = 0.28; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, r * (p.type.startsWith('nuke') ? 3.2 : 2.3), 0, 6.3); ctx.fill();
  });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  projectiles.forEach(p => {
    const a = AMMO[p.type], r = R[p.type] || 4.5;
    ctx.fillStyle = a.color; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.3); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.arc(p.x - r * 0.3, p.y - r * 0.3, r * 0.4, 0, 6.3); ctx.fill();
    if (p.type === 'pine') { ctx.fillStyle = '#3a9a3a'; ctx.beginPath(); ctx.moveTo(p.x - 3, p.y - 5); ctx.lineTo(p.x, p.y - 11); ctx.lineTo(p.x + 3, p.y - 5); ctx.fill(); }
    if (p.type.startsWith('nuke')) { ctx.fillStyle = '#c1121f'; ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'center'; ctx.fillText('☢', p.x, p.y + 3.5); }
  });
}
function drawSpecials() {
  ctx.globalCompositeOperation = 'lighter';
  glows.forEach(gl => {   // žiara výbuchu
    const f = gl.life / gl.max, r = gl.r * (1.3 - f * 0.5), g = ctx.createRadialGradient(gl.x, gl.y, 1, gl.x, gl.y, r);
    g.addColorStop(0, 'rgba(255,240,200,' + (0.9 * f) + ')'); g.addColorStop(0.35, gl.color + '99'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = f; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gl.x, gl.y, r, 0, 6.3); ctx.fill();
  });
  emitters.forEach(e => {
    const y = gy(e.x), r = 18 + Math.sin(time * 20) * 4, g = ctx.createRadialGradient(e.x, y, 2, e.x, y, r + 14);
    g.addColorStop(0, '#fff2a0'); g.addColorStop(0.4, '#ff7a1f'); g.addColorStop(1, 'rgba(255,60,0,0)');
    ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(e.x, y, r + 14, 0, 6.3); ctx.fill();
  });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  strikes.forEach(st => {
    ctx.strokeStyle = 'rgba(255,70,70,' + (0.5 + 0.4 * Math.sin(time * 14)) + ')'; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(st.x, 120); ctx.lineTo(st.x, gy(st.x)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#ff5b5b'; ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'center'; ctx.fillText('⚠ ' + st.t.toFixed(1), st.x, 140);
  });
  rings.forEach(r => {
    ctx.globalAlpha = clamp(r.life / r.max_life, 0, 1) * 0.8; ctx.strokeStyle = '#fff2c0'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.3); ctx.stroke(); ctx.globalAlpha = 1;
  });
  if (flash > 0) { ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, flash) + ')'; ctx.fillRect(-M, -M, W + 2 * M, H + 2 * M); }
}
function drawBeams() {
  beams.forEach(b => {
    const f = clamp(b.life / 0.2, 0, 1);
    ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; ctx.strokeStyle = b.color;
    ctx.globalAlpha = f * 0.25; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(b.x1, b.y1); ctx.lineTo(b.x2, b.y2); ctx.stroke();
    ctx.globalAlpha = f * 0.6; ctx.lineWidth = 7; ctx.stroke();
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = f; ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.globalAlpha = 1; ctx.lineCap = 'butt';
  });
}
function drawParticles() {
  for (let i = 0; i < particles.length; i++) {   // dym a úlomky
    const p = particles[i]; if (p.text || p.fx === 'glow') continue;
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1) * (p.fx === 'smoke' ? 0.85 : 1); ctx.fillStyle = p.color;
    if (p.fx === 'smoke') { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.6, 0, 6.3); ctx.fill(); }
    else if (p.fx === 'debris') { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot || 0); ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size); ctx.restore(); }
    else ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.globalCompositeOperation = 'lighter';   // iskry a oheň sa sčítavajú
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]; if (p.fx !== 'glow') continue;
    const f = clamp(p.life / p.max, 0, 1); ctx.globalAlpha = f; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1, p.size * (0.4 + f * 0.6)), 0, 6.3); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < particles.length; i++) {   // texty (poškodenie...)
    const p = particles[i]; if (!p.text) continue;
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1); ctx.fillStyle = p.color; ctx.font = 'bold ' + p.size + 'px system-ui'; ctx.textAlign = 'center'; ctx.strokeStyle = '#000'; ctx.lineWidth = 3;
    ctx.strokeText(p.text, p.x, p.y); ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}
function drawAmmoMenu(hw, hgap) {   // všetky zbrane hráča s celými názvami
  if (ammoMenu.t <= 0) return;
  const t = tanks[ammoMenu.id]; if (!t || t.bot) return;
  const list = ORDER.filter(k => t.ammo[k] > 0), rowH = 22;
  const cols = list.length > 16 ? 3 : list.length > 8 ? 2 : 1, per = Math.ceil(list.length / cols);
  const w = cols === 1 ? Math.max(hw, 270) : cols === 2 ? 520 : 740, h = per * rowH + 32, cw = (w - 12) / cols;
  const x = clamp(20 + t.id * (hw + hgap), 10, W - w - 10), y = 16 + 112 + 6;
  ctx.globalAlpha = Math.min(1, ammoMenu.t * 2.5);
  ctx.fillStyle = 'rgba(8,12,22,.94)'; roundRect(x, y, w, h, 10); ctx.fill(); ctx.strokeStyle = t.color; ctx.lineWidth = 2; ctx.stroke();
  ctx.textAlign = 'left'; ctx.font = '11px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.fillText('Zbrane · pravé tlačidlo = ďalšia (Shift = späť)', x + 12, y + 18);
  list.forEach((k, i) => {
    const c = Math.floor(i / per), rx = x + 6 + c * cw, ry = y + 26 + (i % per) * rowH, sel = k === t.sel, a = AMMO[k];
    if (sel) { ctx.fillStyle = 'rgba(255,255,255,.16)'; roundRect(rx, ry - 2, cw - 4, rowH - 2, 6); ctx.fill(); }
    ctx.fillStyle = a.color; ctx.beginPath(); ctx.arc(rx + 14, ry + 9, 5, 0, 6.3); ctx.fill();
    ctx.font = (sel ? 'bold ' : '') + '14px system-ui'; ctx.textAlign = 'left'; ctx.fillStyle = sel ? '#fff' : 'rgba(255,255,255,.75)';
    ctx.fillText(a.name, rx + 28, ry + 14);
    ctx.textAlign = 'right'; ctx.fillStyle = sel ? '#ffd54a' : 'rgba(255,255,255,.55)';
    ctx.fillText(t.ammo[k] === Infinity ? '∞' : '×' + t.ammo[k], rx + cw - 12, ry + 14);
    t.hudRects.push({ k, x0: rx, x1: rx + cw - 4, y0: ry - 2, y1: ry + rowH - 4 });
  });
  ctx.globalAlpha = 1;
}
function drawHud() {
  if (state === 'menu') return;
  const n = tanks.length, hw = Math.min(300, (W - 40 - (n - 1) * 24) / n), hgap = (W - 40 - n * hw) / (n - 1);
  tanks.forEach((t, i) => {
    const w = hw, x = 20 + i * (hw + hgap), y = 16, bw = w - 24;
    const act = state === 'play' && i === turnIdx;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = act ? 18 : 10; ctx.shadowOffsetY = 4;
    const pg = ctx.createLinearGradient(0, y, 0, y + 112); pg.addColorStop(0, 'rgba(30,42,70,.82)'); pg.addColorStop(1, 'rgba(8,12,22,.74)');
    ctx.fillStyle = pg; roundRect(x, y, w, 112, 10); ctx.fill();
    ctx.restore();
    if (act) { ctx.save(); ctx.shadowColor = t.color; ctx.shadowBlur = 14; roundRect(x, y, w, 112, 10); ctx.strokeStyle = t.color; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); }
    else { roundRect(x, y, w, 112, 10); ctx.strokeStyle = t.color; ctx.lineWidth = 2; ctx.stroke(); }
    ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.font = 'bold 15px system-ui';
    ctx.fillText(t.name, x + 12, y + 22);
    const nameW = ctx.measureText(t.name).width;
    ctx.fillStyle = '#ffd54a'; ctx.font = 'bold 12px system-ui';
    ctx.fillText('LV ' + t.level, x + 12 + nameW + 8, y + 22);
    ctx.fillStyle = t.color; ctx.fillText('★' + t.wins, x + 12 + nameW + 8 + ctx.measureText('LV ' + t.level).width + 8, y + 22);
    ctx.font = 'bold 15px system-ui'; ctx.textAlign = 'right'; ctx.fillText('€' + t.money, x + w - 12, y + 22);
    const mh = maxHp(t);
    ctx.fillStyle = 'rgba(255,255,255,.15)'; roundRect(x + 12, y + 30, bw, 12, 5); ctx.fill();
    ctx.fillStyle = t.hp / mh > .5 ? '#5fd35f' : t.hp / mh > .25 ? '#f0c040' : '#e5484d';
    const hpW = bw * clamp(t.hp / mh, 0, 1); if (hpW > 1) { roundRect(x + 12, y + 30, hpW, 12, 5); ctx.fill(); }
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(t.hp) + ' / ' + mh, x + w / 2, y + 40);
    if (t.shield > 0) {   // štít - farba podľa úrovne
      ctx.fillStyle = tierCss(t.shT); ctx.fillRect(x + 12, y + 45, bw * clamp(t.shield / (t.shieldMax || 1), 0, 1), 5);
      ctx.textAlign = 'right'; ctx.font = 'bold 10px system-ui'; ctx.fillText('ŠTÍT L' + t.shT + ' · ' + Math.ceil(t.shield), x + w - 12, y + 68);
    }
    const fcap = fuelCap(t), lowFuel = t.fuel < fcap * 0.2;
    ctx.fillStyle = 'rgba(255,255,255,.12)'; roundRect(x + 12, y + 53, bw * 0.55, 5, 2.5); ctx.fill();
    ctx.fillStyle = lowFuel && Math.floor(time * 4) % 2 ? '#ff3d00' : '#ff9a3c';
    const fW = bw * 0.55 * clamp(t.fuel / fcap, 0, 1); if (fW > 1) { roundRect(x + 12, y + 53, fW, 5, 2.5); ctx.fill(); }
    ctx.textAlign = 'left'; ctx.font = '10px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.75)';
    ctx.fillText('PALIVO ' + Math.ceil(t.fuel) + '/' + fcap, x + 12, y + 68);
    ctx.font = '13px system-ui';
    let ax = x + 12, full = false; t.hudRects = [];
    ORDER.forEach(k => {
      if (t.ammo[k] <= 0 || full) return;
      const sel = t.sel === k;
      const label = AMMO[k].icon + (t.ammo[k] === Infinity ? '∞' : '×' + t.ammo[k]);
      ctx.font = (sel ? 'bold ' : '') + '13px system-ui';
      const lw = ctx.measureText(label).width;
      if (ax + lw > x + w - 74) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillText('…', ax, y + 84); full = true; return; }
      ctx.fillStyle = sel ? AMMO[k].color : 'rgba(255,255,255,.5)';
      ctx.fillText(label, ax, y + 84);
      t.hudRects.push({ k, x0: ax - 3, x1: ax + lw + 3, y0: y + 70, y1: y + 88 });
      ax += lw + 12;
    });
    ctx.textAlign = 'right'; ctx.font = '13px system-ui';
    const angTxt = Math.round(t.ang) + '° · ', pw = Math.round(t.power), pwCol = pw >= 90 ? '#ff5f4a' : pw >= 60 ? '#ffd54a' : '#9fd0ff';
    ctx.fillStyle = pwCol; const pwTxt = pw + '%', pwW = ctx.measureText(pwTxt).width;
    ctx.fillText(pwTxt, x + w - 12, y + 84);
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText(angTxt, x + w - 12 - pwW, y + 84);
    const cur = AMMO[t.sel]; ctx.textAlign = 'left'; ctx.font = 'bold 12px system-ui'; ctx.fillStyle = cur.color;
    ctx.fillText('▶ ' + cur.name + (t.ammo[t.sel] === Infinity ? '' : ' ×' + t.ammo[t.sel]), x + 12, y + 101);
    ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(x + 12, y + 106, bw, 3);
    ctx.fillStyle = '#ffd54a'; ctx.fillRect(x + 12, y + 106, bw * (t.level >= MAX_LEVEL ? 1 : clamp(t.xp / xpToNext(t.level), 0, 1)), 3);
  });
  // stred
  ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.font = 'bold 26px system-ui';
  drawAmmoMenu(hw, hgap);
  const off = n === 2 ? 0 : 78;
  if (n === 2) ctx.fillText(tanks[0].wins + '  :  ' + tanks[1].wins, W / 2, 42);
  ctx.font = '13px system-ui'; ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.fillText('KOLO ' + round + ' · do ' + WIN_ROUNDS + ' víťazstiev · ' + biome().icon + ' ' + biome().name, W / 2, 62 + off);
  const wx = W / 2, wy = 84 + off, wl = clamp(wind, -120, 120) * 0.66, B = biome();
  ctx.fillText('VIETOR ' + Math.abs(wind) + (B.gust >= 0.9 ? ' · víchrica (mení smer)' : B.gust >= 0.5 ? ' · nárazový' : '') + (B.altWind ? ' · vo výške silnejší' : ''), wx, wy + 14);
  ctx.strokeStyle = '#9fd0ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx, wy - 4); ctx.lineTo(wx + wl * 0.8, wy - 4); ctx.stroke();
  if (wl) { const d = Math.sign(wl); ctx.beginPath(); ctx.moveTo(wx + wl * 0.8, wy - 4); ctx.lineTo(wx + wl * 0.8 - d * 8, wy - 9); ctx.lineTo(wx + wl * 0.8 - d * 8, wy + 1); ctx.fillStyle = '#9fd0ff'; ctx.fill(); }
  if (state === 'play') {   // kto je na rade + čas ťahu
    const t = tanks[turnIdx];
    ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'center';
    const low = turnPhase === 'aim' && turnTimer <= 5;
    ctx.fillStyle = low && Math.floor(time * 4) % 2 ? '#ff4d3c' : t.color;
    ctx.fillText('NA RADE: ' + t.name + (turnPhase === 'aim' ? ' · ' + Math.max(0, Math.ceil(turnTimer)) + ' s' : ''), W / 2, 116 + off);
  }
}

// ---------- UI ----------
function show(id) { $(id).classList.add('show'); }
function hide(id) { $(id).classList.remove('show'); }
let bannerT = 0;
function banner(text, ms) {
  const b = $('banner'); b.textContent = text; b.classList.remove('show'); void b.offsetWidth; b.classList.add('show');
  clearTimeout(bannerT); bannerT = setTimeout(() => b.classList.remove('show'), ms);
}
const chipColor = k => k >= 10 ? 'linear-gradient(90deg,#ff5f5f,#ffd54a,#5fd35f,#4aa8ff,#c15bff)' : TIER_COLORS[k - 1];
function itemCost(t, it) { return it.kind === 'up' ? it.costFn(t[it.lvlKey]) : it.cost; }
function itemState(t, it) {
  if (it.kind === 'ammo') return { off: t.ammo[it.id] >= capOf(it.id), tag: 'máš ' + t.ammo[it.id] };
  if (it.kind === 'fuel') return { off: t.fuel >= fuelCap(t), tag: Math.floor(t.fuel) + '/' + fuelCap(t) };
  const lvl = t[it.lvlKey];
  const dot = it.colored && lvl > 0 ? '<i class="dot" style="background:' + chipColor(lvl) + '"></i>' : '';
  return { off: lvl >= it.max, tag: dot + 'úroveň ' + lvl + '/' + it.max };
}
function reportHtml(t) {
  const r = t.repLast || {}, keys = Object.keys(REPORT_LABELS).filter(k => r[k] > 0);
  if (!keys.length) return '';
  const total = keys.reduce((n, k) => n + r[k], 0);
  return '<div class="rep"><b>Odmeny z posledného kola</b>' +
    keys.map(k => '<div><span>' + REPORT_LABELS[k] + '</span><span>+€' + r[k] + '</span></div>').join('') +
    '<div class="tot"><span>Spolu</span><span>+€' + total + '</span></div>' +
    (r.xp ? '<div><span>Skúsenosti</span><span>+' + Math.round(r.xp) + ' XP</span></div>' : '') +
    ((r.levels || []).length ? '<div class="lvl">LEVEL UP → ' + r.levels.join(', ') + '</div>' : '') + '</div>';
}
const icon = (txt, col) => '<i class="ic" style="--c:' + col + '">' + txt + '</i>';
const ringIcon = k => '<i class="ic ring' + (k >= 10 ? ' super' : '') + '" style="--c:' + chipColor(k) + '"></i>';
function shopRows(t) {
  const weapons = ORDER.map(k => {
    const a = AMMO[k];
    if (k === 'ap') return { id: 'ap', ic: icon('AP', a.color), name: a.name, sub: 'základná, neobmedzená', price: 0, pack: '–', owned: '∞', fixed: true };
    const it = SHOP_ITEMS.find(i => i.id === k);
    if (!it) {   // exkluzívna generálska zbraň - nedá sa kúpiť, v obchode sa ukáže len vtedy, keď ju už hráč dostal
      if (!(t.ammo[k] > 0)) return null;
      return { id: k, ic: icon(a.icon, a.color), name: a.name, sub: 'Dar generála – nedá sa kúpiť', price: 0, pack: '–', owned: t.ammo[k], fixed: true };
    }
    return { id: k, ic: icon(a.icon, a.color), name: a.name, sub: it.desc, price: it.cost, pack: it.qty, owned: t.ammo[k], off: t.ammo[k] >= capOf(k), lock: it.unlock && t.level < it.unlock ? it.unlock : 0 };
  }).filter(Boolean);
  const gear = SHOP_ITEMS.filter(i => i.kind !== 'ammo').map(it => {
    const st = itemState(t, it);
    const own = it.kind === 'fuel' ? Math.floor(t.fuel) : t[it.lvlKey];
    const emoji = { fuel: '⛽', tank: '🛢', speed: '⚙', armor: '🛡' }[it.id];
    return { id: it.id, ic: it.id === 'armor' && t.armorLvl ? '<i class="ic" style="--c:' + chipColor(t.armorLvl) + '">' + emoji + '</i>' : '<i class="ic" style="--c:#8a93a6">' + emoji + '</i>',
      name: it.label, sub: it.desc, price: itemCost(t, it), pack: it.kind === 'fuel' ? FUEL_BUY : '+1', owned: own, ownedMax: it.kind === 'fuel' ? fuelCap(t) : it.max, off: st.off };
  });
  let next = 0; for (let i = SHIELDS.length - 1; i >= 0; i--) if (t.shields[i] > 0) { next = i + 1; break; }
  const shields = SHIELDS.map(sh => ({
    id: 'sh' + sh.lvl, ic: ringIcon(sh.lvl), name: 'L' + sh.lvl + ' ' + sh.name, sub: '+' + sh.cap + ' ochrany' + (next === sh.lvl ? ' · ▶ nasadí sa v ďalšom kole' : ''),
    price: sh.cost, pack: 1, owned: t.shields[sh.lvl - 1], off: t.shields[sh.lvl - 1] >= SHIELD_CAP, lock: t.level < sh.unlock ? sh.unlock : 0, next: next === sh.lvl,
  }));
  const wlevels = WLV_IDS.map(id => {
    const a = AMMO[id], lvl = wlvOf(t, id);
    return { id: 'wl_' + id, ic: icon(a.icon, a.color), name: 'LV zbrane: ' + a.name, sub: '+' + Math.round(WLV_DMG_STEP * 100) + ' % poškodenia/úroveň (teraz +' + Math.round(WLV_DMG_STEP * 100 * lvl) + ' %)',
      price: wlvCost(lvl), pack: 1, owned: lvl, ownedMax: WLV_MAX, off: lvl >= WLV_MAX, lock: lvl < WLV_MAX && t.level < WLV_UNLOCK[lvl] ? WLV_UNLOCK[lvl] : 0 };
  });
  return { weapons, gear, shields, wlevels };
}
function rowHtml(t, r) {
  const afford = t.money >= r.price, dis = r.fixed || r.off || r.lock || !afford;
  return '<div class="ri' + (dis ? ' dis' : '') + (r.fixed ? ' fixed' : '') + (r.next ? ' next' : '') + (!afford && !r.off && !r.fixed && !r.lock ? ' poor' : '') + '"' +
    (dis ? '' : ' data-p="' + t.id + '" data-buy="' + r.id + '"') + '>' + r.ic +
    '<span class="nm">' + r.name + (r.lock ? ' 🔒 LV' + r.lock : '') + '<small>' + r.sub + '</small></span>' +
    '<span class="c">' + (r.price ? '€' + r.price : '0') + '</span><span class="c">' + r.pack + '</span>' +
    '<span class="c own' + (r.owned > 0 || r.owned === '∞' ? ' has' : '') + '">' + r.owned + (r.ownedMax ? '<small>/' + r.ownedMax + '</small>' : '') + '</span></div>';
}
const rowHead = title => '<div class="rh"><span>' + title + '</span><span class="c">Cena</span><span class="c">Bal.</span><span class="c">Máš</span></div>';
function renderShop() {
  $('saveQuit').style.display = net.spectator ? 'none' : '';
  const t = tanks[shopPlayer], rows = shopRows(t);
  $('shopTabs').innerHTML = tanks.map(k => {
    const on = k.id === shopPlayer;
    return '<button class="tab' + (on ? ' on' : '') + '" data-tab="' + k.id + '" style="border-color:' + k.color + ';' + (on ? 'background:' + k.color + ';color:' + (lum(k.color) > 0.6 ? '#111' : '#fff') : '') + '">' +
      esc(k.name) + ' · €' + k.money + (ready[k.id] ? ' ✓' : '') + '</button>';
  }).join('');
  const top = $('shopBody').querySelector('.tbl') ? $('shopBody').scrollTop : 0;
  const B = biome();
  $('shopBody').innerHTML =
    '<div class="biome">' + B.icon + ' Mapa: <b>' + B.name + '</b> · Obtiažnosť: <b>' + diffOf().name + '</b> – ' + B.desc + '</div>' +
    '<div class="ph"><div><div class="pm" style="color:var(--gold)">€' + t.money + '</div><div class="pn" style="color:' + t.color + '">' + esc(t.name) + '</div>' +
    '<div class="meta">LV ' + t.level + ' · XP ' + (t.level >= MAX_LEVEL ? 'MAX' : Math.floor(t.xp) + '/' + xpToNext(t.level)) + ' · max. životy ' + maxHp(t) + ' · palivo ' + Math.floor(t.fuel) + '/' + fuelCap(t) + '</div>' +
    (t.quest ? '<div class="quest">🎯 Vedľajšia misia: <b>' + esc(t.quest.desc) + '</b> · +€' + t.quest.money + ' · +' + t.quest.xp + ' XP</div>' : '') + '</div>' + reportHtml(t) + '</div>' +
    '<div class="tbl"><div class="col">' + rowHead('Zbrane') + rows.weapons.map(r => rowHtml(t, r)).join('') +
    rowHead('Úrovne zbraní (+poškodenie)') + rows.wlevels.map(r => rowHtml(t, r)).join('') + '</div>' +
    '<div class="col">' + rowHead('Štíty L1–L10') + rows.shields.map(r => rowHtml(t, r)).join('') +
    rowHead('Palivo a vylepšenia') + rows.gear.map(r => rowHtml(t, r)).join('') + '</div></div>' +
    '<div class="shopActionBar"><button class="startbtn" data-ready="' + t.id + '"' + (ready[t.id] ? ' disabled' : '') + '>' + (ready[t.id] ? 'PRIPRAVENÝ ✓' : 'START!') + '</button></div>';
  $('shopBody').scrollTop = top;
  saveGame();
}
function buy(p, id) {
  const t = tanks[p];
  if (t.bot) return;
  if (id.startsWith('wl_')) {
    const wid = id.slice(3), lvl = wlvOf(t, wid), cost = wlvCost(lvl);
    if (lvl >= WLV_MAX || t.level < WLV_UNLOCK[lvl] || t.money < cost) return;
    t.money -= cost; t.wlv = t.wlv || {}; t.wlv[wid] = lvl + 1;
    tone(700 + lvl * 90, 1100 + lvl * 100, 0.1, 'triangle', 0.07);
    renderShop(); return;
  }
  if (/^sh\d+$/.test(id)) {
    const sh = SHIELDS[+id.slice(2) - 1];
    if (t.level < sh.unlock || t.money < sh.cost || t.shields[sh.lvl - 1] >= SHIELD_CAP) return;
    t.money -= sh.cost; t.shields[sh.lvl - 1]++;
    tone(500 + sh.lvl * 60, 900 + sh.lvl * 90, 0.12, 'triangle', 0.07);
    renderShop(); return;
  }
  const it = SHOP_ITEMS.find(i => i.id === id);
  if (!it) return;
  if (it.unlock && t.level < it.unlock) return;
  const c = itemCost(t, it), st = itemState(t, it);
  if (st.off || t.money < c) return;
  t.money -= c;
  if (it.kind === 'ammo') t.ammo[id] = Math.min(capOf(id), t.ammo[id] + it.qty);
  else if (it.kind === 'fuel') t.fuel = Math.min(fuelCap(t), t.fuel + FUEL_BUY);
  else { t[it.lvlKey]++; if (id === 'armor') t.hp = maxHp(t); }
  tone(800, 1200, 0.08, 'triangle', 0.06);
  renderShop();
}
$('shop').addEventListener('click', e => {
  const tab = e.target.closest('[data-tab]');
  if (net.spectator && tab) { shopPlayer = +tab.dataset.tab; renderShop(); return; }   // divák si smie prezerať výzbroj ktoréhokoľvek hráča, len nič nekupuje
  if (net.active && !netIsMine()) return;   // pasívne zariadenie nič nemení
  if (tab) { if (!net.active) { shopPlayer = +tab.dataset.tab; renderShop(); } return; }
  const rd = e.target.closest('[data-ready]');
  if (rd && !rd.disabled) {
    const p = +rd.dataset.ready;
    if (net.active && p !== net.myIdx) return;
    ready[p] = true;
    if (net.active) {
      for (let k = 1; k < tanks.length; k++) { const q = (p + k) % tanks.length; if (!ready[q]) { net.shopStep = q; break; } }
      netPublish();
      renderShop();
      return;
    }
    for (let k = 1; k < tanks.length; k++) { const q = (p + k) % tanks.length; if (!ready[q]) { shopPlayer = q; break; } }
    renderShop(); return;
  }
  const row = e.target.closest('[data-buy]');
  if (row) { if (net.active && +row.dataset.p !== net.myIdx) return; buy(+row.dataset.p, row.dataset.buy); }
});
let dlgYes = null;   // vlastný potvrdzovací dialóg (okná confirm() sa v niektorých prehliadačoch a vložených stránkach nezobrazujú)
function ask(text, onYes) { $('dlgText').textContent = text; dlgYes = onYes; show('dialog'); }
$('dlgYes').addEventListener('click', () => { hide('dialog'); const f = dlgYes; dlgYes = null; if (f) f(); });
$('dlgNo').addEventListener('click', () => { hide('dialog'); dlgYes = null; });
function goFullscreen() {
  try {
    const el = document.documentElement;
    if (!document.fullscreenElement && (el.requestFullscreen || el.webkitRequestFullscreen)) (el.requestFullscreen || el.webkitRequestFullscreen).call(el).catch(() => {});
  } catch (_) {}
}
function toggleFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (_) {}
  } else goFullscreen();
}
$('fsBtn').addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', resize); document.addEventListener('webkitfullscreenchange', resize);
$('startBtn').addEventListener('click', () => { goFullscreen(); startMatch(); });
$('againBtn').addEventListener('click', () => { goFullscreen(); startMatch(true); });
$('menuBtn').addEventListener('click', toMenu);
// ---------- zdieľanie highlightu zápasu (snímka bojiska z plátna hry + poskladaný výsledkový pruh) ----------
function wrapCanvasText(c, text, x, y, maxW, lh, maxLines) {
  const words = String(text).split(' '); let line = '', yy = y, n = 0;
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (c.measureText(test).width > maxW && line) {
      c.fillText(line, x, yy); yy += lh; n++;
      if (maxLines && n >= maxLines - 1) { line = w; break; }
      line = w;
    } else line = test;
  }
  if (line) c.fillText(line, x, yy);
}
function composeMatchImage() {
  const W = cv.width, H = cv.height;
  const out = document.createElement('canvas'); out.width = W; out.height = H;
  const o = out.getContext('2d');
  o.drawImage(cv, 0, 0, W, H);
  const barH = Math.round(H * 0.24);
  const grad = o.createLinearGradient(0, H - barH, 0, H);
  grad.addColorStop(0, 'rgba(5,8,14,0)'); grad.addColorStop(.4, 'rgba(5,8,14,.88)'); grad.addColorStop(1, 'rgba(5,8,14,.96)');
  o.fillStyle = grad; o.fillRect(0, H - barH, W, barH);
  o.textAlign = 'left';
  o.fillStyle = '#ffd54a'; o.font = '700 17px system-ui,sans-serif';
  o.fillText('🎖️ IRON DUEL: TANK COMMANDERS', 32, H - barH + 32);
  o.fillStyle = $('endTitle').style.color || '#fff';
  o.font = '800 38px "Black Ops One",system-ui,sans-serif';
  o.fillText($('endTitle').textContent || '', 32, H - barH + 80);
  const subText = ($('endSub').textContent || '').replace(/\s+/g, ' ').trim();
  o.fillStyle = '#cfd4e0'; o.font = '400 17px system-ui,sans-serif';
  wrapCanvasText(o, subText, 32, H - barH + 112, W - 64, 24, 4);
  return out;
}
async function shareMatchImage() {
  try { await document.fonts.ready; } catch (_) {}
  let out;
  try { out = composeMatchImage(); } catch (e) { console.warn('Príprava snímky zlyhala:', e); banner('⚠️ Snímku sa nepodarilo pripraviť.', 2400); return; }
  out.toBlob(async blob => {
    if (!blob) { banner('⚠️ Snímku sa nepodarilo pripraviť.', 2400); return; }
    const file = (typeof File !== 'undefined') ? new File([blob], 'iron-duel-vysledok.png', { type: 'image/png' }) : null;
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Iron Duel: Tank Commanders', text: $('endTitle').textContent || '' }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; /* inak pokračuj na stiahnutie ako zálohu */ }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'iron-duel-vysledok.png'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    banner('💾 Snímka stiahnutá', 2000);
  }, 'image/png');
}
$('endShareBtn').addEventListener('click', shareMatchImage);
$('contBtn').addEventListener('click', () => { goFullscreen(); continueGame(); });
$('delBtn').addEventListener('click', () => ask('Zmazať uloženú hru?', () => { clearSave(); refreshContinue(); renderHome(); }));
$('saveQuit').addEventListener('click', () => { saveGame(); toMenu(); });
$('menuBackBtn').addEventListener('click', () => { if (net.active) netLeave(); hide('menu'); renderHome(); show('home'); });
$('settingsBackBtn').addEventListener('click', () => { hide('settings'); show('home'); });
$('creditsBackBtn').addEventListener('click', () => { hide('credits'); show('home'); });

// ---------- prihlásenie cez Google (Supabase Auth) alebo hosťovský vstup bez účtu, a domovská obrazovka ----------
function renderLogin() { $('loginMsg').textContent = loginError || ''; }
function enterHome() {
  hide('login'); refreshContinue(); renderHome(); show('home');
  maybeShowTutorial(); processPendingFriendInvite();
}
// ---------- krátky návod pre nových hráčov (zobrazí sa raz automaticky, potom dostupný kedykoľvek cez Nastavenia) ----------
const TUTORIAL_KEY = 'ironDuelTutorialSeen_v1';
const TUTORIAL_STEPS = [
  { icon: '🎖️', title: 'Vitaj, veliteľ!', text: 'Iron Duel je ťahový delostrelecký súboj tankov. Cieľ je jednoduchý: znič súperove tanky skôr, než oni zničia teba.' },
  { icon: '🎯', title: 'Mierenie a streľba', text: '▲ ▼ nakláňajú hlaveň, posuvník dole nastavuje silu výstrelu a tlačidlo STRELA vystrelí. ◀ ▶ pohybujú tankom, kým máš palivo.' },
  { icon: '💥', title: 'Munícia', text: 'Tlačidlo s muníciou (napr. "AP") prepína typy striel - každá má iný efekt (väčší kráter, EMP, laser, oprava...). Vyber podľa situácie.' },
  { icon: '🌬️', title: 'Vietor a terén', text: 'Sleduj smer a silu vetra v HUD - ovplyvní dráhu strely. Každý biom (púšť, hory, mesiac...) mení fyziku inak, popis nájdeš pred misiou.' },
  { icon: '📖', title: 'Kampaň', text: 'V kampani postupne dobýjaš Zem, Mesiac, Mars a Venušu. Za víťazstvá získavaš peniaze a XP, ktoré míňaš na vylepšenia medzi misiami.' },
  { icon: '🏆', title: 'Rebríček a odznaky', text: 'Prihlás sa cez Google, nech sa tvoj postup ukladá do cloudu, dostaneš sa do globálneho rebríčka a začneš zbierať odznaky za úspechy.' },
];
let tutStep = 0, tutReturnTo = null;
function renderTutorial() {
  const s = TUTORIAL_STEPS[tutStep];
  $('tutBody').innerHTML = '<div style="font-size:40px;text-align:center;margin-bottom:8px">' + s.icon + '</div><h2 style="text-align:center;margin:0 0 8px">' + esc(s.title) + '</h2><p style="text-align:center">' + esc(s.text) + '</p>';
  $('tutDots').textContent = (tutStep + 1) + ' / ' + TUTORIAL_STEPS.length;
  $('tutNextBtn').textContent = tutStep === TUTORIAL_STEPS.length - 1 ? 'Hotovo ✔' : 'Ďalej ▶';
}
function openTutorial(returnTo) { tutStep = 0; tutReturnTo = returnTo || null; renderTutorial(); show('tutorial'); }
function closeTutorial() {
  try { localStorage.setItem(TUTORIAL_KEY, '1'); } catch (_) {}
  hide('tutorial');
  if (tutReturnTo) { show(tutReturnTo); tutReturnTo = null; }
}
function maybeShowTutorial() {
  let seen = false;
  try { seen = localStorage.getItem(TUTORIAL_KEY) === '1'; } catch (_) {}
  if (!seen) openTutorial();
}
$('tutNextBtn').addEventListener('click', () => { if (tutStep < TUTORIAL_STEPS.length - 1) { tutStep++; renderTutorial(); } else closeTutorial(); });
$('tutSkipBtn').addEventListener('click', closeTutorial);
$('tutBtn').addEventListener('click', () => { hide('settings'); openTutorial('settings'); });
let importCandidateNick = null;   // keď je hráč prihlásený cez Google a v TOMTO zariadení existuje iný (hosťovský) profil s väčším postupom - jeho meno, nech ho ponúkneme na ručný import do cloud účtu
function renderHome() {
  const nick = setup.players[0].nick, prof = nick ? getProfile(nick) : null;
  $('homeGreet').textContent = nick ? ((cloudUser ? 'Prihlásený cez Google ako ' : 'Hráš ako ') + nick + (prof ? ' · veliteľská hodnosť LV ' + (prof.level || 1) : '')) : '';
  const sv = readSave();
  $('homeContBtn').style.display = sv ? '' : 'none';
  if (sv) $('homeContBtn').textContent = '▶ Pokračovať: kolo ' + sv.round + ' · ' + sv.players.length + ' hráči';
  renderHomeDaily(prof);
  renderHomeWeekly(prof);
  importCandidateNick = null;
  const importBtn = $('homeImportBtn');
  if (cloudUser) {
    const cand = findMigratableLocalProfile(nickKey(cloudUser.nick));
    if (cand && hasRealProgress(cand) && progressScore(cand) > progressScore(prof)) {
      importCandidateNick = cand.nick;
      importBtn.textContent = '⬇️ Načítať postup "' + cand.nick + '" (LV ' + (cand.level || 1) + ') z tohto zariadenia';
      importBtn.style.display = '';
    } else importBtn.style.display = 'none';
  } else importBtn.style.display = 'none';
}
function renderHomeDaily(prof) {
  const card = $('homeDailyCard');
  if (!prof) { card.style.display = 'none'; return; }
  if (ensureDaily(prof)) saveProfiles();   // nový deň - vynulovaný postup sa hneď aj uloží (vrátane cloudu)
  const dc = dailyChallengeForToday(), have = prof.daily[dc.key] || 0, pct = Math.min(100, Math.round(100 * have / dc.target));
  const done = prof.daily.claimed;
  card.className = done ? 'done' : '';
  card.style.display = '';
  card.innerHTML = '<div>' + dc.icon + ' <b>Denná výzva:</b> ' + esc(dc.title) + (done ? ' ✔' : ' (' + Math.min(have, dc.target) + '/' + dc.target + ')') + (done ? '' : ' · +' + dc.xp + ' XP') + '</div>' +
    '<div class="dcBar"><div class="dcFill" style="width:' + pct + '%"></div></div>';
}
function renderHomeWeekly(prof) {
  const card = $('homeWeeklyCard');
  if (!prof) { card.style.display = 'none'; return; }
  if (ensureWeekly(prof)) saveProfiles();   // nový týždeň - vynulovaný postup sa hneď aj uloží (vrátane cloudu)
  const wc = weeklyChallengeForToday(), have = prof.weekly[wc.key] || 0, pct = Math.min(100, Math.round(100 * have / wc.target));
  const done = prof.weekly.claimed;
  card.className = done ? 'done' : '';
  card.style.display = '';
  card.innerHTML = '<div>' + wc.icon + ' <b>Týždenná výzva:</b> ' + esc(wc.title) + (done ? ' ✔' : ' (' + Math.min(have, wc.target) + '/' + wc.target + ')') + (done ? '' : ' · +' + wc.xp + ' XP') + '</div>' +
    '<div class="dcBar"><div class="dcFill" style="width:' + pct + '%"></div></div>';
}
$('googleLoginBtn').addEventListener('click', () => {
  if (!sb) { loginError = 'Prihlásenie cez Google momentálne nie je dostupné (skontroluj internetové pripojenie).'; renderLogin(); return; }
  loginError = ''; renderLogin();
  sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } })
    .then(({ error }) => { if (error) { loginError = 'Prihlásenie zlyhalo: ' + error.message; renderLogin(); } });
});
$('guestLoginBtn').addEventListener('click', () => {
  setup.players[0].nick = null; saveSetup(); refreshStoryProgressSource(); enterHome();
});
$('homePlayBtn').addEventListener('click', () => { hide('home'); refreshContinue(); renderSetup(); show('menu'); });
$('homeContBtn').addEventListener('click', () => { hide('home'); goFullscreen(); continueGame(); });
$('homeSettingsBtn').addEventListener('click', () => { hide('home'); show('settings'); });
$('homeCreditsBtn').addEventListener('click', () => { hide('home'); show('credits'); });
$('homeAchBtn').addEventListener('click', () => { hide('home'); renderAchievements(); show('achievements'); });
$('achBackBtn').addEventListener('click', () => { hide('achievements'); show('home'); });
$('homeImportBtn').addEventListener('click', () => {
  if (!importCandidateNick || !cloudUser) return;
  const cand = getProfile(importCandidateNick);
  if (!cand) return;
  ask('Načítať postup "' + importCandidateNick + '" (LV ' + (cand.level || 1) + ') z tohto zariadenia do tvojho Google účtu? Doterajší postup v cloude (na iných zariadeniach) sa tým prepíše.', () => {
    const key = nickKey(cloudUser.nick);
    const cur = profiles[key];
    profiles[key] = Object.assign({}, cand, { nick: cloudUser.nick, color: (cur && isColor(cur.color)) ? cur.color : cand.color });
    saveProfiles();   // uloží lokálne a (cloudPush vo vnútri) pretlačí do Supabase, teda aj na ostatné zariadenia
    setup.players[0].nick = cloudUser.nick; setup.players[0].name = cloudUser.nick; saveSetup();
    refreshStoryProgressSource();
    renderHome();
    banner('✅ Postup z tohto zariadenia bol načítaný do tvojho účtu', 3200);
  });
});
function renderAchievements() {
  const nick = setup.players[0].nick, p = nick ? getProfile(nick) : null;
  const have = new Set(p && Array.isArray(p.achievements) ? p.achievements : []);
  $('achSummary').textContent = nick ? ('Odomknuté: ' + have.size + ' / ' + ACHIEVEMENTS.length) : 'Prihlás sa (alebo hraj ako hosť s uloženým postupom), nech sa ti odznaky začnú ukladať.';
  $('achList').innerHTML = ACHIEVEMENTS.map(a => {
    const on = have.has(a.id);
    return '<div class="achRow' + (on ? ' on' : '') + '"><div class="achIcon">' + a.icon + '</div><div class="achBody"><div class="achTitle">' + esc(a.title) + '</div><div class="achDesc">' + esc(a.desc) + '</div></div><div class="achCheck">' + (on ? '✔' : '🔒') + '</div></div>';
  }).join('');
}
$('homePerksBtn').addEventListener('click', () => { hide('home'); renderPerks(); show('perks'); });
$('perksBackBtn').addEventListener('click', () => { hide('perks'); show('home'); });
function renderPerks() {
  const nick = setup.players[0].nick, p = nick ? getProfile(nick) : null;
  if (!p) { $('perksSummary').innerHTML = 'Prihlás sa (alebo hraj ako hosť s uloženým postupom), nech si môžeš odomykať veliteľské vylepšenia.'; $('perksList').innerHTML = ''; return; }
  const avail = perkPointsAvailable(p);
  $('perksSummary').innerHTML = 'Trvalé vylepšenia tvojho veliteľa, platia vo VŠETKÝCH zápasoch (nie je to výzbroj z obchodu). Za každú dosiahnutú hodnosť nad 1 dostaneš 1 bod. Dostupné body: <b>' + avail + '</b>';
  $('perksList').innerHTML = PERKS.map(perk => {
    const rank = perkRank(p, perk.id), maxed = rank >= perk.maxRank, can = !maxed && avail > 0;
    return '<div class="achRow' + (rank ? ' on' : '') + '"><div class="achIcon">' + perk.icon + '</div><div class="achBody"><div class="achTitle">' + esc(perk.title) + '</div><div class="achDesc">' + esc(perk.desc) + '</div><div class="ranks">Úroveň ' + rank + ' / ' + perk.maxRank + '</div></div>' +
      '<button class="perkBuy" data-perk="' + perk.id + '"' + (can ? '' : ' disabled') + '>' + (maxed ? 'MAX' : '+1 (1 bod)') + '</button></div>';
  }).join('');
}
$('perksList').addEventListener('click', e => {
  const btn = e.target.closest('[data-perk]'); if (!btn || btn.disabled) return;
  const nick = setup.players[0].nick, p = nick ? getProfile(nick) : null; if (!p) return;
  const perk = PERKS.find(x => x.id === btn.dataset.perk); if (!perk) return;
  const rank = perkRank(p, perk.id);
  if (rank >= perk.maxRank || perkPointsAvailable(p) <= 0) return;
  p.perks = p.perks || {}; p.perks[perk.id] = rank + 1;
  saveProfiles(); renderPerks();
});
$('homeFriendsBtn').addEventListener('click', () => { hide('home'); renderFriends(); show('friends'); });
$('friendsBackBtn').addEventListener('click', () => { hide('friends'); show('home'); });
async function renderFriends() {
  const summaryEl = $('friendsSummary'), linkWrap = $('friendsLink'), listEl = $('friendsList');
  if (!cloudUser || !sb) {
    summaryEl.innerHTML = 'Priatelia fungujú len pre hráčov prihlásených cez Google - potrebujeme spoľahlivo prepojiť dva účty.';
    linkWrap.style.display = 'none'; listEl.innerHTML = '';
    return;
  }
  const link = location.origin + location.pathname + '?friend=' + encodeURIComponent(cloudUser.nick);
  summaryEl.innerHTML = 'Pošli tento odkaz kamarátovi. Keď ho otvorí a prihlási sa cez Google, pridáte sa navzájom medzi priateľov.';
  linkWrap.style.display = ''; $('friendsLinkInput').value = link;
  listEl.innerHTML = '<p>Načítavam…</p>';
  try {
    const { data, error } = await sb.from('friends').select('user_id,friend_id').or('user_id.eq.' + cloudUser.id + ',friend_id.eq.' + cloudUser.id);
    if (error) throw error;
    const ids = Array.from(new Set((data || []).map(r => r.user_id === cloudUser.id ? r.friend_id : r.user_id)));
    if (!ids.length) { listEl.innerHTML = '<p>Zatiaľ nemáš žiadnych priateľov. Zdieľaj svoj odkaz vyššie!</p>'; return; }
    const { data: profs, error: e2 } = await sb.from('profiles').select('id,nick,color,level,wins,matches').in('id', ids);
    if (e2) throw e2;
    const sorted = (profs || []).slice().sort((a, b) => (b.level || 1) - (a.level || 1) || (b.wins || 0) - (a.wins || 0));
    listEl.innerHTML = sorted.map(p => '<div class="achRow on"><div class="achIcon">👤</div><div class="achBody"><div class="achTitle"><i class="dot" style="background:' + (isColor(p.color) ? p.color : '#888') + '"></i>' + esc(p.nick) + '</div><div class="achDesc">Veliteľská hodnosť LV ' + (p.level || 1) + ' · ' + (p.wins || 0) + ' výhier · ' + (p.matches || 0) + ' zápasov</div></div>' +
      '<button class="perkBuy" data-unfriend="' + p.id + '" style="background:#3a3f4e;color:#eef2f8">Odobrať</button></div>').join('');
  } catch (e) { listEl.innerHTML = '<p class="muted">Zoznam priateľov sa nepodarilo načítať (skontroluj internet).</p>'; }
}
$('friendsList').addEventListener('click', e => {
  const btn = e.target.closest('[data-unfriend]'); if (!btn) return;
  const fid = btn.dataset.unfriend;
  ask('Odobrať tohto priateľa?', () => {
    sb.from('friends').delete().or('and(user_id.eq.' + cloudUser.id + ',friend_id.eq.' + fid + '),and(user_id.eq.' + fid + ',friend_id.eq.' + cloudUser.id + ')')
      .then(({ error }) => { if (error) console.warn('Odobratie priateľa zlyhalo:', error.message); renderFriends(); });
  });
});
$('friendsCopyBtn').addEventListener('click', () => {
  const inp = $('friendsLinkInput'); inp.select(); inp.setSelectionRange(0, 999);
  (navigator.clipboard ? navigator.clipboard.writeText(inp.value) : Promise.reject()).then(() => banner('🔗 Odkaz skopírovaný', 1600)).catch(() => { try { document.execCommand('copy'); banner('🔗 Odkaz skopírovaný', 1600); } catch (_) {} });
});
$('homeLogoutBtn').addEventListener('click', () => {
  ask('Naozaj sa chceš odhlásiť?', () => {
    if (cloudUser && sb) { sb.auth.signOut(); }   // onAuthStateChange nižšie dorieši UI prepnutie na #login
    else { logoutSlot(0); refreshStoryProgressSource(); hide('home'); renderLogin(); show('login'); }
  });
});
if (sb) {
  sb.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session && session.user) {
      enterCloudSession(session.user).then(ok => { if (ok) enterHome(); });
    } else if (event === 'SIGNED_OUT') {
      cloudUser = null; setup.players[0].nick = null; saveSetup(); refreshStoryProgressSource();
      hide('home'); renderLogin(); show('login');
    }
  });
}
$('pauseBtn').addEventListener('click', () => setPause(true));
$('resumeBtn').addEventListener('click', () => setPause(false));
$('quitBtn').addEventListener('click', toMenu);
function setPause(v) {
  if (v && state !== 'play' && state !== 'roundEnd') return;
  paused = v; if (v) show('pause'); else hide('pause');
  if (!v) last = performance.now();
}
function refreshContinue() {
  const sv = readSave();
  $('contBtn').style.display = sv ? '' : 'none'; $('delBtn').style.display = sv ? '' : 'none';
  if (sv) $('contBtn').textContent = 'Pokračovať: kolo ' + sv.round + ' · ' + sv.players.length + ' hráči · ' + new Date(sv.savedAt).toLocaleString('sk-SK', { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
}
const slotMsg = [];
function setColor(i, c) {
  const slot = setup.players[i]; slot.color = c;
  const p = getProfile(slot.nick); if (p) { p.color = c; saveProfiles(); }
  saveSetup();
}
function loginSlot(i, text) {
  const nick = String(text).trim().replace(/\s+/g, ' ');
  if (!NICK_RE.test(nick)) { slotMsg[i] = 'Prezývka: 2–14 znakov (písmená, čísla, medzera, _ . -).'; return renderSetup(); }
  if (setup.players[i].bot) return;
  const key = nickKey(nick), act = setup.players.slice(0, setup.n);
  if (act.some((q, j) => j !== i && q.nick && nickKey(q.nick) === key)) { slotMsg[i] = 'Táto prezývka je už prihlásená v inom slote.'; return renderSetup(); }
  let p = getProfile(nick), created = false;
  if (!p) { p = profiles[key] = newProfile(nick, setup.players[i].color); created = true; }
  const slot = setup.players[i];
  slot.nick = p.nick; slot.name = p.nick;
  if (!act.some((q, j) => j !== i && q.color.toLowerCase() === p.color.toLowerCase())) slot.color = p.color;
  else p.color = slot.color;
  saveProfiles(); saveSetup();
  slotMsg[i] = created ? 'Nový profil vytvorený – vitaj, ' + p.nick + '!' : 'Vitaj späť, ' + p.nick + '!';
  renderSetup();
}
function logoutSlot(i) { setup.players[i].nick = null; slotMsg[i] = ''; saveSetup(); renderSetup(); }
function renderSetup() {
  fixColors();
  const slot0nick = setup.players[0].nick;
  setup.players.forEach(p => { if (p.nick && !getProfile(p.nick)) p.nick = null; });   // profil bol zmazaný
  if (setup.players[0].nick !== slot0nick) refreshStoryProgressSource();
  $('nickList').innerHTML = Object.values(profiles).map(p => '<option value="' + esc(p.nick) + '">').join('');
  const n = net.active ? net.maxN : setup.n, guestLocked = net.active && net.myIdx !== 0;
  $('nBtns').innerHTML = [2, 3, 4].map(k => '<button class="nb' + (n === k ? ' on' : '') + '"' + (guestLocked ? ' disabled' : '') + ' data-n="' + k + '">' + k + ' hráči</button>').join('');
  $('roundsSel').value = String(setup.rounds);
  $('terrainSel').value = setup.terrain; $('diffSel').value = setup.difficulty; $('gfxSel').value = setup.gfx;
  $('mapSizeSel').value = setup.mapSize;
  $('roundsSel').disabled = guestLocked; $('terrainSel').disabled = guestLocked; $('diffSel').disabled = guestLocked; $('mapSizeSel').disabled = guestLocked;
  if (net.active) { renderOnlineLobby(); return; }
  $('startBtn').style.display = ''; $('onlineActions').style.display = 'none';
  const act = setup.players.slice(0, setup.n);
  $('setupRows').innerHTML = act.map((p, i) => {
    const taken = new Set(act.filter((_, j) => j !== i).map(q => q.color.toLowerCase())), prof = getProfile(p.nick);
    const status = (prof ? '<b class="ok">✔ Prihlásený</b> · ' + esc(statsLine(prof)) : 'Hosť – štatistiky sa neukladajú. Zadaj prezývku a prihlás sa.') +
      (slotMsg[i] ? '<br><b class="msg">' + esc(slotMsg[i]) + '</b>' : '');
    const artName = TANK_COLOR_NAME[p.color.toLowerCase()];
    const mtHtml = artName ? '<span class="mt art"><img src="assets/tanks/tank_hull_' + artName + '.png" alt="" draggable="false"></span>' : '<span class="mt"><i></i></span>';
    return '<div class="prow" style="--pc:' + p.color + '">' + mtHtml +
      '<input class="pname" data-i="' + i + '" maxlength="14" list="nickList" autocomplete="off" placeholder="Prezývka" value="' + esc(p.name) + '"' + (prof || p.bot ? ' readonly' : '') + ' aria-label="Prezývka hráča ' + (i + 1) + '">' +
      '<button class="lgn' + (prof ? ' out' : '') + '" data-i="' + i + '" data-act="' + (prof ? 'out' : 'in') + '"' + (p.bot ? ' disabled' : '') + '>' + (prof ? 'Odhlásiť' : 'Prihlásiť') + '</button>' +
      '<div class="sw"><select class="bsel" data-i="' + i + '" title="Typ hráča">' + ['Človek', 'PC ľahký', 'PC stredný', 'PC ťažký'].map((n, k) => '<option value="' + k + '"' + (p.bot === k ? ' selected' : '') + '>' + n + '</option>').join('') + '</select>' + PALETTE.map(c => '<button class="swb' + (c.toLowerCase() === p.color.toLowerCase() ? ' sel' : '') + '" data-i="' + i + '" data-c="' + c + '" style="background:' + c + '"' + (taken.has(c.toLowerCase()) ? ' disabled' : '') + ' title="Farba tanku"></button>').join('') +
      '<input type="color" class="cust" data-i="' + i + '" value="' + p.color + '" title="Vlastná farba"></div>' +
      '<small class="hint">' + (p.bot ? 'Počítačový súper – hrá aj nakupuje sám.' : status + '<br>' + KEYSETS[i].hint + ' · alebo dotykové tlačidlá') + '</small></div>';
  }).join('');
}
function renderOnlineLobby() {   // rovnaká obrazovka ako lokálne "Hrať teraz", len zoznam hráčov nahradí živý zoznam pripojených
  $('startBtn').style.display = 'none'; $('contBtn').style.display = 'none';
  const oa = $('onlineActions'); oa.style.display = '';
  const n = netJoinedCount(), isHost = net.myIdx === 0;
  oa.innerHTML = '<div class="pm" style="text-align:center;letter-spacing:.15em;color:var(--gold)">' + esc(net.code) + '</div>' +
    (isHost
      ? '<button class="btn" id="onlineStartBtn"' + (n < 2 ? ' disabled' : '') + '>▶ ŠTART zápasu (' + n + '/' + net.maxN + ')</button>'
      : '<p>' + (net.spectator ? '👁️ Sleduješ izbu, zápas sa ešte nespustil…' : 'Čaká sa, kým hostiteľ spustí zápas…') + ' (' + n + '/' + net.maxN + ' pripojených)</p>');
  if (isHost) $('onlineStartBtn').addEventListener('click', () => { goFullscreen(); hide('online'); hide('menu'); startOnlineMatch(); });
  $('setupRows').innerHTML = net.players.map((p, i) => {
    const filled = p && p.name, pc = filled ? p.color : '#555';
    return '<div class="prow" style="--pc:' + pc + '"><span class="mt"><i></i></span>' +
      '<b style="padding:6px 0;color:' + (filled ? pc : 'var(--muted)') + '">' + (filled ? esc(p.name) : 'Čaká sa na hráča…') + '</b>' +
      (i === net.myIdx ? '<span style="color:var(--gold);font-weight:800">(ty)</span>' : '<span></span>') +
      '<small class="hint">' + (i === 0 ? 'Hostiteľ' : (filled ? 'Pripojený' : 'Voľný slot')) + '</small></div>';
  }).join('');
}
$('setupRows').addEventListener('click', e => {
  const l = e.target.closest('.lgn');
  if (l) { const i = +l.dataset.i; if (l.dataset.act === 'out') logoutSlot(i); else loginSlot(i, document.querySelector('.pname[data-i="' + i + '"]').value); return; }
  const b = e.target.closest('.swb'); if (!b || b.disabled) return;
  setColor(+b.dataset.i, b.dataset.c); renderSetup();
});
$('setupRows').addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList.contains('pname') && !e.target.readOnly) { e.preventDefault(); loginSlot(+e.target.dataset.i, e.target.value); }
});
$('setupRows').addEventListener('input', e => {
  if (e.target.classList.contains('pname') && !e.target.readOnly) { const i = +e.target.dataset.i; setup.players[i].name = e.target.value.slice(0, 14) || 'Hráč ' + (i + 1); slotMsg[i] = ''; saveSetup(); }
});
$('setupRows').addEventListener('change', e => {
  if (e.target.classList.contains('bsel')) {
    const i = +e.target.dataset.i, p = setup.players[i], v = +e.target.value;
    p.bot = v;
    if (v) { p.nick = null; if (/^Hráč \d$/.test(p.name)) p.name = 'PC ' + (i + 1); } else if (/^PC \d$/.test(p.name)) p.name = 'Hráč ' + (i + 1);
    saveSetup(); renderSetup(); return;
  }
  if (!e.target.classList.contains('cust')) return;
  const i = +e.target.dataset.i, c = e.target.value, act = setup.players.slice(0, setup.n);
  if (isColor(c) && !act.some((q, j) => j !== i && q.color.toLowerCase() === c.toLowerCase())) setColor(i, c);
  renderSetup();
});
// rebríček
function renderBoard() {
  $('boardBody').innerHTML = '<p>Načítavam rebríček…</p>';
  renderBoardGlobal();
}
function localBoardRowsHtml() {
  const list = Object.entries(profiles).map(([k, p]) => [k, p]).sort((a, b) => b[1].wins - a[1].wins || b[1].rounds - a[1].rounds || b[1].matches - a[1].matches);
  return list.length ? '<table class="bt"><tr><th>#</th><th>Prezývka</th><th>Zápasy</th><th>Výhry</th><th>%</th><th>Kolá</th><th>Tanky</th><th>Max LV</th><th></th></tr>' +
    list.map(([k, p], i) => '<tr><td>' + (i + 1) + '</td><td><i class="dot" style="background:' + (isColor(p.color) ? p.color : '#888') + '"></i>' + esc(p.nick) + '</td><td>' + p.matches + '</td><td>' + p.wins + '</td><td>' +
      (p.matches ? Math.round(100 * p.wins / p.matches) : 0) + '</td><td>' + p.rounds + '</td><td>' + p.kills + '</td><td>' + p.bestLevel + '</td><td><button class="x" data-del="' + esc(k) + '" title="Zmazať profil">✕</button></td></tr>').join('') + '</table>'
    : '<p>Zatiaľ tu nie je žiadny profil. Odohraj zápas, nech sa ti začne zbierať štatistika.</p>';
}
async function renderBoardGlobal() {   // globálny rebríček zo Supabase (verejne čitateľná tabuľka profiles) - zoradený podľa veliteľskej hodnosti a výhier; keď je offline/nedostupný, potichu padne späť na lokálny zoznam
  let rows = null;
  if (sb) {
    try {
      const { data, error } = await sb.from('profiles').select('nick,color,level,wins,matches,rounds,kills,best_level').order('level', { ascending: false }).order('wins', { ascending: false }).limit(50);
      if (!error && Array.isArray(data)) rows = data;
    } catch (_) {}
  }
  const myKey = cloudUser ? nickKey(cloudUser.nick) : (setup.players[0].nick ? nickKey(setup.players[0].nick) : null);
  const globalHtml = rows
    ? (rows.length ? '<table class="bt"><tr><th>#</th><th>Prezývka</th><th>LV</th><th>Výhry</th><th>Zápasy</th><th>%</th><th>Kolá</th><th>Tanky</th></tr>' +
        rows.map((p, i) => '<tr' + (myKey && nickKey(p.nick) === myKey ? ' class="me"' : '') + '><td>' + (i + 1) + '</td><td><i class="dot" style="background:' + (isColor(p.color) ? p.color : '#888') + '"></i>' + esc(p.nick) + '</td><td>' + (p.level || 1) + '</td><td>' + p.wins + '</td><td>' + p.matches + '</td><td>' +
          (p.matches ? Math.round(100 * p.wins / p.matches) : 0) + '</td><td>' + p.rounds + '</td><td>' + p.kills + '</td></tr>').join('') + '</table>'
      : '<p>Zatiaľ tu nie je žiadny hráč s Google účtom. Buď prvý!</p>')
    : '<p class="muted">Globálny rebríček sa nepodarilo načítať (skontroluj internet). Zobrazujem len profily v tomto zariadení.</p>';
  $('boardBody').innerHTML = globalHtml + '<div class="boardSub">Profily v tomto zariadení</div>' + localBoardRowsHtml();
}
$('boardBtn').addEventListener('click', () => { hide('settings'); renderBoard(); show('board'); });
$('boardClose').addEventListener('click', () => { hide('board'); show('settings'); });
$('boardBody').addEventListener('click', e => {
  const x = e.target.closest('[data-del]'); if (!x) return;
  const k = x.dataset.del;
  if (Object.prototype.hasOwnProperty.call(profiles, k)) {
    ask('Zmazať profil "' + profiles[k].nick + '" aj so štatistikami?', () => { delete profiles[k]; saveProfiles(); renderBoard(); renderSetup(); });
  }
});
$('nBtns').addEventListener('click', e => {
  const b = e.target.closest('.nb'); if (!b || b.disabled) return;
  const k = +b.dataset.n;
  if (net.active) {
    if (net.myIdx !== 0 || k < netJoinedCount()) return;   // len hostiteľ, a nikdy pod počet už pripojených
    net.maxN = k; net.players = Array.from({ length: k }, (_, i) => net.players[i] || null);
    if (dbCap && net.code) dbCap.doc('rooms/' + net.code).update({ maxN: k, updatedAt: Date.now() }).catch(() => {});
    renderSetup(); return;
  }
  setup.n = k; saveSetup(); renderSetup();
});
$('terrainSel').innerHTML = '<option value="random">Náhodný</option>' + BIOME_KEYS.map(k => '<option value="' + k + '">' + BIOMES[k].icon + ' ' + BIOMES[k].name + '</option>').join('');
$('terrainSel').addEventListener('change', e => { setup.terrain = e.target.value; saveSetup(); });
$('mapSizeSel').addEventListener('change', e => { setup.mapSize = e.target.value; saveSetup(); });
$('diffSel').addEventListener('change', e => { setup.difficulty = e.target.value; saveSetup(); });
$('gfxSel').addEventListener('change', e => { setup.gfx = e.target.value; saveSetup(); applyGfx(); });
$('roundsSel').addEventListener('change', e => { setup.rounds = +e.target.value; saveSetup(); });
$('padBtn').addEventListener('click', () => {
  const off = document.body.classList.toggle('nopad');
  $('padBtn').textContent = 'Dotykové ovládanie: ' + (off ? 'vyp' : 'zap');
});
if (!window.matchMedia('(pointer: coarse)').matches) { document.body.classList.add('nopad'); $('padBtn').textContent = 'Dotykové ovládanie: vyp'; }
$('soundBtn').textContent = '🔊 Zvuk a vibrácie: ' + (setup.sound ? 'zap' : 'vyp');
$('soundBtn').addEventListener('click', () => {
  setup.sound = !setup.sound; saveSetup();
  $('soundBtn').textContent = '🔊 Zvuk a vibrácie: ' + (setup.sound ? 'zap' : 'vyp');
  if (setup.sound) initAudio();
  setMusicVolume();
});

// dotykové ovládače
const padButtons = [], padEls = [];
function buildPads() {
  const n = tanks.length;
  document.querySelectorAll('.pad').forEach(e => e.remove());
  padButtons.length = 0; padEls.length = 0;
  const shown = tanks.map((t, p) => (t.bot || (net.active && p !== net.myIdx)) ? null : p).filter(p => p !== null);
  const sn = shown.length;
  tanks.forEach((t, p) => {
    if (t.bot) return;
    if (net.active && p !== net.myIdx) return;
    const si = shown.indexOf(p);
    padButtons[p] = {};
    const pad = document.createElement('div'); pad.className = 'pad';
    pad.style.setProperty('--pc', t.color); pad.style.setProperty('--pn', sn);
    pad.dataset.si = si; pad.dataset.sn = sn;

    const mkBtn = (a, label, cls) => {
      const b = document.createElement('button'); b.textContent = label; b.className = a + (cls ? ' ' + cls : ''); padButtons[p][a] = b;
      const down = e => { e.preventDefault(); initAudio(); try { b.setPointerCapture(e.pointerId); } catch (_) {} held[p][a] = true; b.classList.add('on'); if (a === 'ammo') cycleAmmo(tanks[p]); if (a === 'fire') tryFire(p); };
      const up = () => { held[p][a] = false; b.classList.remove('on'); };
      b.addEventListener('pointerdown', down);
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, up));
      b.addEventListener('contextmenu', e => e.preventDefault());
      return b;
    };

    const row = document.createElement('div'); row.className = 'padRow';
    const move = document.createElement('div'); move.className = 'padGroup padMove';
    move.append(mkBtn('left', '◀'), mkBtn('right', '▶'));
    const center = document.createElement('div'); center.className = 'padGroup padCenter';
    center.append(mkBtn('fire', 'STRELA', 'fireBtn'), mkBtn('ammo', 'AP', 'ammoBtn'));
    const aim = document.createElement('div'); aim.className = 'padGroup padAim';
    aim.append(mkBtn('up', '▲'), mkBtn('down', '▼'));
    row.append(move, center, aim);

    const power = document.createElement('div'); power.className = 'padPower';
    const slider = document.createElement('input');
    slider.type = 'range'; slider.className = 'powerSlider'; slider.min = POWER_MIN; slider.max = 100; slider.step = 1; slider.value = 100;
    slider.addEventListener('pointerdown', () => initAudio());
    slider.addEventListener('input', () => {
      const tt = tanks[p];
      if (!(state === 'play' && tt.id === turnIdx && turnPhase === 'aim' && !tt.stun)) { slider.value = Math.round(tt.power); return; }
      tt.power = clamp(+slider.value, POWER_MIN, 100);
    });
    padButtons[p].powerSlider = slider;
    const info = document.createElement('span'); info.className = 'pinfo'; info.textContent = '100%'; padButtons[p].pinfo = info;
    power.append(slider, info);

    pad.append(row, power);
    padEls[p] = pad; document.body.appendChild(pad);
  });
  positionPads();
}
function positionPads() {   // vypočíta left tak, aby pad nikdy nepretiekol cez okraj obrazovky (podľa jeho SKUTOČNEJ šírky)
  const vw = window.innerWidth || W;
  document.querySelectorAll('.pad').forEach(pad => {
    const si = +pad.dataset.si, sn = +pad.dataset.sn;
    if (sn <= 1) { pad.style.left = '50vw'; return; }
    const halfPx = pad.offsetWidth / 2 + 6;
    const marginPct = Math.min(45, halfPx / vw * 100);
    pad.style.left = (marginPct + si * (100 - 2 * marginPct) / (sn - 1)) + 'vw';
  });
}
function updatePadLabels() {
  tanks.forEach((t, p) => {
    const txt = AMMO[t.sel].icon + (t.ammo[t.sel] === Infinity ? '' : ' ×' + t.ammo[t.sel]);
    const pw = Math.round(t.power), pwTxt = pw + '%';
    if (padButtons[p] && padButtons[p].pinfo && t.prevPw !== pwTxt) {
      t.prevPw = pwTxt; padButtons[p].pinfo.textContent = pwTxt;
      padButtons[p].pinfo.style.color = pw >= 90 ? '#ff5f4a' : pw >= 60 ? '#ffd54a' : '#9fd0ff';
      if (padButtons[p].powerSlider) {
        const sl = padButtons[p].powerSlider, pct = (pw - POWER_MIN) / (100 - POWER_MIN) * 100;
        const col = pw >= 90 ? '#ff5f4a' : pw >= 60 ? '#ffd54a' : '#9fd0ff';
        sl.style.background = 'linear-gradient(to right,' + col + ' 0%,' + col + ' ' + pct + '%,rgba(255,255,255,.22) ' + pct + '%,rgba(255,255,255,.22) 100%)';
        if (document.activeElement !== sl) sl.value = pw;
      }
    }
    const idle = !(state === 'play' && p === turnIdx && turnPhase === 'aim' && !t.dead);
    if (padEls[p] && t.prevIdle !== idle) { t.prevIdle = idle; padEls[p].classList.toggle('idle', idle); }
    if (padButtons[p] && t.prevAmmoBtn !== txt) { t.prevAmmoBtn = txt; padButtons[p].ammo.textContent = txt; }
  });
}

// klávesnica
const KEYMAP = {}, AMMOKEY = {};
KEYSETS.forEach((k, p) => { ['left', 'right', 'up', 'down', 'fire', 'pup', 'pdown'].forEach(a => KEYMAP[k[a]] = [p, a]); AMMOKEY[k.ammo] = p; });
addEventListener('keydown', e => {
  if (e.target.closest && e.target.closest('input,select,textarea')) return;   // píše sa prezývka
  initAudio();
  if (e.code === 'F3') { e.preventDefault(); showFps = !showFps; return; }
  if (e.code === 'Escape') { if (!e.repeat) setPause(!paused); return; }
  const m = KEYMAP[e.code];
  if (m) {
    if (net.active && m[0] !== net.myIdx) return;
    if (state === 'play') e.preventDefault();
    if (m[1] === 'fire') { if (!e.repeat) tryFire(m[0]); return; }   // jeden výstrel na stlačenie
    kb[m[0]][m[1]] = true; return;
  }
  if (e.repeat) return;
  const ap = AMMOKEY[e.code];
  if (ap !== undefined && tanks[ap]) { e.preventDefault(); cycleAmmo(tanks[ap]); }
});
addEventListener('keyup', e => { const m = KEYMAP[e.code]; if (m) kb[m[0]][m[1]] = false; });
addEventListener('blur', () => { for (let i = 0; i < kb.length; i++) kb[i] = {}; });

// mierenie ťahaním prsta pri tanku
const drags = new Map();
function toScreen(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; }
function toWorld(e) { const s = toScreen(e); return { x: cam.x + (s.x - W / 2) / cam.zoom, y: cam.y + (s.y - H / 2) / cam.zoom }; }
function aimAt(t, pt) {
  const p = pivot(t);
  let a = Math.atan2(-(pt.y - p.y), pt.x - p.x) * 180 / Math.PI;
  if (a < 0) a = pt.x > p.x ? 0 : 180;
  t.ang = clamp(a, 0, 180);
}
function mouseAim(e) {   // myš: smer podľa kurzora; silu si hráč volí sám (SILA−/SILA+, koliesko myši)
  if (net.active && !netIsMine()) return;
  const t = tanks[turnIdx];
  if (state !== 'play' || turnPhase !== 'aim' || !t || t.dead || t.stun || t.bot) return;
  aimAt(t, toWorld(e));
}
cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('wheel', e => {
  if (net.active && !netIsMine()) return;
  const t = tanks[turnIdx];
  if (state === 'play' && turnPhase === 'aim' && t && !t.dead && !t.stun && !t.bot) { t.power = clamp(t.power + (e.deltaY < 0 ? 3 : -3), POWER_MIN, 100); e.preventDefault(); }
}, { passive: false });
cv.addEventListener('pointerdown', e => {
  initAudio();
  if (state !== 'play') return;
  if (net.active && !netIsMine()) return;
  const at = tanks[turnIdx];
  if (at && !at.bot && turnPhase === 'aim') {   // klik na ikonu munície v HUD
    const hp = toScreen(e), r = at.hudRects.find(q => hp.x >= q.x0 && hp.x <= q.x1 && hp.y >= q.y0 && hp.y <= q.y1);
    if (r) { selectAmmo(at, r.k); return; }
  }
  if (e.pointerType === 'mouse') {   // ľavé tlačidlo = výstrel, pravé = zmena munície
    if (e.button === 0) { mouseAim(e); tryFire(turnIdx); } else if (e.button === 2) cycleAmmo(tanks[turnIdx], e.shiftKey ? -1 : 1);
    return;
  }
  const pt = toWorld(e); let best = null, bd = 260;
  tanks.forEach(t => { const d = Math.hypot(pt.x - t.x, pt.y - (t.y - 20)); if (!t.dead && !t.bot && t.id === turnIdx && turnPhase === 'aim' && d < bd) { bd = d; best = t; } });
  if (best && !best.stun) { drags.set(e.pointerId, best); aimAt(best, pt); cv.setPointerCapture(e.pointerId); }
});
cv.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { mouseAim(e); return; } const t = drags.get(e.pointerId); if (t && !t.stun && state === 'play' && turnPhase === 'aim' && t.id === turnIdx) aimAt(t, toWorld(e)); });
['pointerup', 'pointercancel'].forEach(ev => cv.addEventListener(ev, e => drags.delete(e.pointerId)));

// zmena veľkosti (celá obrazovka bez okrajov, aj keď mobil skryje/zobrazí lištu prehliadača)
function resize() {
  const vv = window.visualViewport, vw = (vv && vv.width) || innerWidth, vh = (vv && vv.height) || innerHeight;
  // na šírku (bežná hracia poloha) vyplní celú obrazovku bez čiernych pruhov (mierne orezané hore/dole);
  // na výšku radšej nič neoreže (vľavo/vpravo je HUD aj ovládanie), takže tam ostáva doskalovanie na celú šírku/výšku bez orezu
  const s = vw >= vh ? Math.max(vw / W, vh / H) : Math.min(vw / W, vh / H);
  cv.style.width = Math.ceil(W * s) + 'px'; cv.style.height = Math.ceil(H * s) + 'px';
  positionPads();
  if (GLOBE.canvas) globeResize();
}
addEventListener('resize', resize);
addEventListener('orientationchange', () => setTimeout(resize, 250));
if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
resize();

// ---------- hlavná slučka ----------
fixColors();
tanks = setup.players.slice(0, setup.n).map((p, i) => makeTank(i, p));
applyGfx();
genArena(pickBiome()); spawnXs(tanks.length).forEach((x, i) => placeTank(tanks[i], x));
buildPads(); refreshContinue(); renderSetup();
document.querySelectorAll('.menuBg').forEach(el => {
  if (el.closest('#home') || el.closest('#login')) return;   // tieto majú skutočnú AI fotku kokpitu z Hugging Face (CSS background-image), nie kreslenú panorámu
  el.innerHTML = MENU_BG_SVG;   // ručne kreslená panoráma bojiska - zvyšné obrazovky (nastavenia, kredity, výber zápasu...)
  el.appendChild(menuFleetEl());   // tmavá "kolóna" AI tankov pozdĺž spodku obrazovky - dekorácia z vygenerovaných spritov
});
function menuFleetEl() {   // zakaždým trochu iné rozostavenie tankov, nech obrazovka pôsobí živo
  const names = Object.keys(TANK_ART_META), n = 6, wrap = document.createElement('div');
  wrap.className = 'menuFleet';
  for (let i = 0; i < n; i++) {
    const name = names[Math.floor(hash1(i * 37.1 + 2) * names.length) % names.length];
    const left = 4 + (i / n) * 100 + hash1(i * 11.3) * (90 / n - 10), w = 90 + hash1(i * 5.2) * 70, flip = hash1(i * 7.7) > 0.5;
    const im = document.createElement('img');
    im.src = 'assets/tanks/tank_hull_' + name + '.png'; im.alt = ''; im.draggable = false;
    im.style.left = left + '%'; im.style.width = w + 'px'; im.style.zIndex = Math.round(w);
    im.style.transform = 'translateX(-50%)' + (flip ? ' scaleX(-1)' : '');
    wrap.appendChild(im);
  }
  return wrap;
}
(async () => {   // zisti, či už existuje prihlásená Google (Supabase) relácia z predošlej návštevy, inak záložne skontroluj starý lokálny/hosťovský stav
  if (sb) {
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session && session.user) {
        const ok = await enterCloudSession(session.user);
        if (ok) { hide('login'); refreshContinue(); renderHome(); show('home'); maybeShowTutorial(); processPendingFriendInvite(); return; }
      }
    } catch (e) { console.warn('Supabase relácia sa nepodarilo overiť:', e); }
  }
  if (setup.players[0].nick && getProfile(setup.players[0].nick)) { refreshStoryProgressSource(); hide('login'); renderHome(); show('home'); maybeShowTutorial(); processPendingFriendInvite(); }
  else { setup.players[0].nick = null; refreshStoryProgressSource(); renderLogin(); }
})();
let last = performance.now(), slowMs = 0;
function loop(now) {
  const raw = Math.min(now - last, 100), dt = Math.min(0.033, raw / 1000); last = now;
  if (net.active && !netIsMine()) { updateCamera(dt); draw(); netUpdateWaitBanner(); requestAnimationFrame(loop); return; }
  netUpdateWaitBanner();
  update(dt); draw();
  fpsEma += (raw - fpsEma) * 0.05;
  if (gfx === 'auto' && !paused && document.visibilityState === 'visible') {   // adaptívna kvalita
    slowMs = fpsEma > 30 ? slowMs + raw : 0;
    if (slowMs > 2500 && quality > 0) { setQuality(quality - 1); genArenaKeepLook(); slowMs = 0; fpsEma = 16.7; }
  }
  requestAnimationFrame(loop);
}
function genArenaKeepLook() { skyDirty = terDirty = true; }
if ('serviceWorker' in navigator && window.isSecureContext && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) navigator.serviceWorker.register('sw.js').catch(() => {});
requestAnimationFrame(loop);

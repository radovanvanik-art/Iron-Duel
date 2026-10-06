// Iron Duel: Tank Commanders - service worker (umožňuje "Pridať na plochu" a hranie bez pripojenia)
// POZOR: SW_VERSION treba zvýšiť pri KAŽDEJ zmene game.js/index.html (rovnako ako game.js?v=N v index.html),
// inak by hráčom na telefóne mohla zostať navždy uložená stará verzia hry v cache.
const SW_VERSION = 'v35';
const CACHE_NAME = 'iron-duel-' + SW_VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/end-bg.jpg',
  './assets/end-bg-win.jpg',
  './assets/end-bg-lose.jpg',
  './assets/story-map-bg.jpg',
  './assets/planets/earth.png',
  './assets/planets/moon.jpg',
  './assets/planets/mars.jpg',
  './assets/planets/venus.jpg',
  './assets/menu-cockpit.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// HTML/JS (index.html, game.js) = network-first, nech hráč vždy dostane najnovšiu verziu hneď ako je online -
// cache slúži len ako záloha pre offline hranie. Statické obrázky = cache-first (nemenia sa).
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // externé CDN (Supabase JS, Firebase, fonty) necháme ísť priamo na sieť

  const isCode = url.pathname.endsWith('.html') || url.pathname.endsWith('/') || url.pathname.endsWith('game.js') || url.pathname.endsWith('manifest.json');
  if (isCode) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); return res; }).catch(() => cached))
    );
  }
});

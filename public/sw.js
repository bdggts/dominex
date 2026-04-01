// Dominex Arena Service Worker - Offline Support
var CACHE_NAME = 'dominex-v4';
var ASSETS = [
  '/arena',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/chars/scorpion.png',
  '/chars/subzero.png',
  '/chars/liukang.png',
  '/chars/raiden.png',
  '/chars/reptile.png',
  '/chars/kitana.png',
  '/chars/cyrax.png',
  '/chars/sektor.png',
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS).catch(function() {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; })
             .map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Network first, fallback to cache
  e.respondWith(
    fetch(e.request).then(function(res) {
      // Cache successful responses
      if (res.status === 200) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
      }
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});

// sw.js
const CACHE_NAME = 'boboy-menu-v2';
const OFFLINE_URL = '/offline.html';

// Добавьте все необходимые ресурсы
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/data.js',
  '/offline.html',
  '/BOBOY_logo_basic_blue (1).png',
  '/Лагман Уйгурский.webp',
  '/шашлыки.webp',
  '/казан-кабоб.webp',
  '/Plov.webp',
  '/4.webp',
  '/10.webp',
  '/6.webp',
  '/img399.webp'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function(response) {
          // Кешируем только успешные ответы и статические ресурсы
          if (response.status === 200 && 
             (event.request.destination === 'image' || 
              event.request.destination === 'script' ||
              event.request.destination === 'style')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        }).catch(function() {
          // Для страниц возвращаем offline страницу
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});
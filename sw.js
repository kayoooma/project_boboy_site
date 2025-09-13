// sw.js
const CACHE_NAME = 'boboy-menu-v1';
const OFFLINE_URL = '/offline.html'; // Добавьте offline.html в ваш проект
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/data.js',
  '/BOBOY_logo_basic_blue (1).png',
  '/Лагман Уйгурский.webp',
  '/шашлыки.webp',
  '/казан-кабоб.webp',
  '/4.webp',
  '/10.webp',
  '/6.webp',
  '/img399.webp',
  OFFLINE_URL
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
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', function(event) {
  // Пропускаем не-GET запросы и запросы из других источников
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем закешированную версию или делаем запрос
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(function(response) {
          // Клонируем ответ, так как он может быть использован только один раз
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        }).catch(function(error) {
          console.log('Fetch failed; returning offline page instead.', error);
          
          // Для HTML-запросов возвращаем offline страницу
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
          
          // Для других типов запросов возвращаем соответствующий ответ
          return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});
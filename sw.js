const CACHE_NAME = 'boboy-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/main.js',
  '/data.js',
  '/js/appUtils.js',
  '/js/appState.js',
  '/js/menuData.js',
  '/js/renderer.js',
  '/js/heroSlider.js',
  '/js/modals.js',
  '/js/navigation.js',
  '/js/language.js',
  '/js/decor.js',
  '/js/gestures.js',
  '/js/utils.js',
  '/BOBOY_logo_(favicon).webp'
];

self.addEventListener('install', function(event) {
  self.skipWaiting(); // Принудительная активация нового SW
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.filter(url => {
          // Пропускаем несуществующие ресурсы
          return !url.includes('казан-кабоб') && 
                 !url.includes('Лагман Уйгурский');
        }));
      })
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
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
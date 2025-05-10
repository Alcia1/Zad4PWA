self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-cache').then(function(cache) {
        const filesToCache = [
          '/',
          '/index.html',
          '/shopping.html',
          '/weather.html',
          '/scripts/script.js',
          '/scripts/script_weather.js',
          '/css/style.css',
          '/img/favicon.png',
          '/img/sun.png',
          '/img/icon192.png',
          '/img/icon512.png'
        ];
  
        return Promise.all(
          filesToCache.map(url =>
            fetch(url)
              .then(response => {
                if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
                return cache.put(url, response.clone());
              })
          )
        );
      })
    );
    self.skipWaiting();
  });
  

  
  self.addEventListener('activate', function(event) {
    event.waitUntil(clients.claim()); // przejmuje kontrolę nad otwartymi zakładkami
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
        .catch(() => caches.match('/index.html')) // fallback na offline
    );
  });
  
// sw.js

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/",
      })
      .then((registration) => {
        console.log("SW zarejestrowany! Scope:", registration.scope);
      });
  }

  self.addEventListener("install", (event) => {
    // Kod wykonywany podczas instalacji
    console.log("SW zainstalowany!");
  });

  self.addEventListener("install", (event) => {
    function onInstall() {
      return caches
        .open("static")
        .then((cache) =>
          cache.addAll([
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
          ])
        );
    }
   
    event.waitUntil(onInstall(event));
  });

  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          //entry found in cache
          return event.respondWith(response);
        }
        return fetch(event.request);
      })
    );
  });

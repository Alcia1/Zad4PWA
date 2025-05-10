// sw.js



self.addEventListener('install', function(event) {

    event.waitUntil(

        caches.open('my-cache').then(function(cache) {

            return cache.addAll([

                '/',

                '/css',

                '/img',

                '/scripts',

                '/index.html',

                '/shopping.html',

                '/weather.html',

                '/scritps/script.js',

                '/scripts/script_weather.js',

                '/css/style.css',
                
                '/img/favicon.png',

                '/img/sun.png',

                '/img/icon192.png',

                '/img/icon512.png'
            ]);

        })

    );

});

self.addEventListener('fetch', function(event) {

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);

        })

    );

});
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('surprise-wish-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/src/main.jsx',
        '/src/App.jsx',
        '/src/config.js',
        '/src/constants.js',
        '/src/components/CountdownPage.jsx',
        '/src/components/RevealPage.jsx',
        '/src/components/MessagePage.jsx',
        '/src/components/FeedbackPage.jsx',
        '/src/components/PhotoPage.jsx',
        '/src/components/Heart.jsx',
        '/src/components/Confetti.jsx',
        '/src/components/icons/Cake.jsx',
        '/src/components/icons/LightBulb.jsx',
        '/public/sfx/iwbysar.mp3',
        '/public/images/image1.jpg', // Assuming this is the image used in config
        '/manifest.json',
        '/icons/icon-192x192.png', // Placeholder, user needs to create
        '/icons/icon-512x512.png'  // Placeholder, user needs to create
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
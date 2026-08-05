const CACHE_NAME = "notes-app-v2"; // 🔥 version change

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./write.html", // 🔥 जरूरी
  "./manifest.json"
];

/* 🧠 INSTALL */
self.addEventListener("install", e => {
  self.skipWaiting(); // 🔥 तुरंत update

  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

/* 🚀 ACTIVATE */
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🧹 old cache delete
          }
        })
      );
    })
  );

  self.clients.claim(); // 🔥 तुरंत control
});

/* 🌐 FETCH */
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

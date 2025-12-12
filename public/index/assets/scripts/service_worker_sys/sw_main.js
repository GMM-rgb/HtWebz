let requestInstallData = [
    "/",
    "index.html",
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("AppInstallData").then(thisCacheData =>
            thisCacheData.addAll(requestInstallData),
        ),
    );
}, { passive: true, once: true });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If cached response exists, return it, otherwise fetch from network host
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener("offline", (e) => {

}, { passive: true, capture: true});

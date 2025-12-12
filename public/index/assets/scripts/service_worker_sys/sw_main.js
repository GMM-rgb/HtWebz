let requestInstallData = [
  "/",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("AppInstallData").then(thisCacheData =>
      thisCacheData.addAll(requestInstallData),
    ),
  );
}, { passive: true });

self.addEventListener("appinstalled", (e) => {
  console.log(e.target);
});

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
  console.log("Disconnected from internet. [Offline]");
  self.addEventListener("online", (e) => {
    e.stopPropagation();
    console.log("Connected to internet. [Online]");
  }, { once: true });
}, { passive: true, capture: true});

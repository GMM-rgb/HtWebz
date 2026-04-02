const DownloadAssetServices = new ServiceWorker();

DownloadAssetServices.postMessage();

self.addEventListener("loadstart", (LoadEvent) => {
    if (LoadEvent !== undefined && LoadEvent instanceof Event) {
        
    }
}, {once: true, passive: true});

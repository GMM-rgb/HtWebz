navigator.serviceWorker.register("/index/assets/scripts/service_worker_sys/sw_main.js", { scope: '/index/assets/scripts/service_worker_sys/' })
.then(worker => {
    console.log(`ServiceWorker "Main" successfully registered & operational.\t\n${worker.scope}`)
}).catch((err) => {
    console.error(`ServiceWorker "Main" failed to register:\n${err}`);
});

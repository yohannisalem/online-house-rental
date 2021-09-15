/* function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "https://spyna.it/icons/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification); */
console.log("Service Worker Loaded...");
var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
  '/',
  '/tenantscreen',
  '/src/components/screen/SwiperSlider.js',
  '/src/components/screen/TenantScreen.js',
  '/src/components/screen/RelatedHouses.js',
  '/src/components/screen/HouseDetails.js',
  '/src/components/screen/FileUploads.js',
  '/src/components/screen/ContractForm.js',
  '/src/components/screen/HouseInTheSameDistrict.js',
  '/src/components/pages/Home.js'
  
];
self.addEventListener("push", e => {
  const { image, tag, url, title, text } = e.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "https://spyna.it/icons/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
   
  e.waitUntil(self.registration.showNotification(
        title, // title of the notification
        options
    ));
});
self.addEventListener("notificationclick", event=>{
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
})

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});
/* self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
      caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
      })
  );
}); */
/* self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('my-pwa-cache-v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
}); */
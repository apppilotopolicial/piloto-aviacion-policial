const CACHE = 'tripulante-aviacion-policial-v48';
const ASSETS = ['./','./index.html','./styles.css?v=47','./app.js?v=47','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./selected-wings-icon.png','./brand-wings.svg','./hero-aviation.svg','./hero-photo.jpg','./peso-balance-template.pdf','./left_base_top.png','./left_base_bottom.png','./left_0254_top.png','./left_0254_bottom.png','./left_3018_top.png','./left_3018_bottom.png'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
      return response;
    }).catch(() => caches.match(event.request, {ignoreSearch:true}).then(cached => cached || caches.match('./index.html')))
  );
});

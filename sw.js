/* Service worker ringan untuk instalasi PWA Logbook Puskesmas Lanjut.
   Tidak menyimpan respons Supabase, data pegawai, sesi login, atau API.
   File HTML utama selalu diminta ke server agar pembaruan aplikasi tidak tertahan cache. */
const CACHE_NAME = 'logbook-puskesmas-static-v1';
const STATIC_FILES = [
  './manifest.webmanifest',
  './favicon.ico',
  './puskesmas-icon-48.png',
  './puskesmas-icon-180.png',
  './puskesmas-icon-192.png',
  './puskesmas-icon-512.png',
  './puskesmas-icon-maskable-512.png',
  './offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('logbook-puskesmas-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Jangan cache Supabase/CDN/API.

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(async () => {
        const cachedOffline = await caches.match('./offline.html');
        return cachedOffline || new Response('Koneksi internet diperlukan untuk membuka aplikasi dan menyinkronkan data.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      })
    );
    return;
  }

  const path = url.pathname;
  if (/\/(manifest\.webmanifest|favicon\.ico|puskesmas-icon-[^/]+\.png)$/.test(path)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});

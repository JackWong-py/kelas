// Kelas service worker: keeps the app (and its fonts) available offline.
// App files: served from cache instantly, refreshed in the background,
// so a new version you push shows up on the next open.
const CACHE = "kelas-v1";
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isApp = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  // Everything else (e.g. the PDF reader from the CDN) goes straight to the network.
  if (!isApp && !isFont) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Opening the app (any page URL) -> use the cached index.html when offline.
    const key = req.mode === "navigate" ? "./index.html" : req;
    const cached = await cache.match(key, { ignoreSearch: req.mode === "navigate" });

    const network = fetch(req)
      .then((res) => {
        if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone());
        return res;
      })
      .catch(() => null);

    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    const res = await network;
    return res || new Response("Offline", { status: 503, statusText: "Offline" });
  })());
});

const staticPonde = "ponde-site-v1"
const assets = [
  "/",
  "/index.html",
  "/global.css",
  "/services/db.js",
  "/services/qr_scanner.js",
  "/services/utils.js",
  "/third_party/pouchdb-7.2.1.min.js",
  "/third_party/qr_code.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticPonde).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
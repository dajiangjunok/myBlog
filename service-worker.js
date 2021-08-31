/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "398d4b395998347902b891f78023c22e"
  },
  {
    "url": "assets/css/0.styles.4085d3b1.css",
    "revision": "28bfbdeeecf2770912c9a43f06cd4748"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "54644040ff0f7684ef3bda0df2daaf33"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.51d4c912.js",
    "revision": "85c5173abfcf804857d901c58d0b4b7f"
  },
  {
    "url": "assets/js/11.a12dc2bb.js",
    "revision": "f995d14137db185404544f21a9ad5c06"
  },
  {
    "url": "assets/js/12.5ca44a0f.js",
    "revision": "4f8c3f22c85352ee3963bf4680880569"
  },
  {
    "url": "assets/js/13.e1b9aa28.js",
    "revision": "eb192581158cdeadbe80a2143c4202b1"
  },
  {
    "url": "assets/js/2.e2ffaaa2.js",
    "revision": "c3a48064534584e4b0cad07b56f0953f"
  },
  {
    "url": "assets/js/3.9c6e4881.js",
    "revision": "c8269c354acc98ba842c451ff0c479f4"
  },
  {
    "url": "assets/js/4.1fbd249c.js",
    "revision": "54aed5ac23430a63032a18a2cb572fd3"
  },
  {
    "url": "assets/js/5.7f158b4b.js",
    "revision": "f1cd2a6c8f0d2dc2676452b64b245eec"
  },
  {
    "url": "assets/js/6.38e63dc5.js",
    "revision": "c96f84cb2027db514135bc3922c50556"
  },
  {
    "url": "assets/js/7.3379f57d.js",
    "revision": "4e39ae281fc15d6bf943085c3d03321c"
  },
  {
    "url": "assets/js/8.3a1c4dfc.js",
    "revision": "9f2a9359d563bf746a4fca6dafd10008"
  },
  {
    "url": "assets/js/9.b270ad82.js",
    "revision": "362584ddede4346fe564e8f582ab011b"
  },
  {
    "url": "assets/js/app.2c391c40.js",
    "revision": "8dafb43f1c2253620c3148c119abccad"
  },
  {
    "url": "config.html",
    "revision": "bf2f13ebf7f65c49162628d725718d1e"
  },
  {
    "url": "guide/index.html",
    "revision": "4dee78e4f23ac87409a656a3a9a698a0"
  },
  {
    "url": "icons/128.png",
    "revision": "ee1ba9378d4dc46526c4c94246ff1c4e"
  },
  {
    "url": "icons/144.png",
    "revision": "ce1da2ab6e394e3a08028aa3f6ecbed7"
  },
  {
    "url": "icons/192.png",
    "revision": "38a608dd673ec9795b5faf776e391d95"
  },
  {
    "url": "icons/256.png",
    "revision": "d4030916d69e576bab130d65d37ba9c4"
  },
  {
    "url": "icons/512.png",
    "revision": "9d99d649ecd57f3362e59817268cf9f0"
  },
  {
    "url": "index.html",
    "revision": "ba8a44c4311b9dd508cee136fac74fdb"
  },
  {
    "url": "logo.png",
    "revision": "7248a2cc7e2b3220d2aa0b0f04457097"
  },
  {
    "url": "note/index.html",
    "revision": "00cac79db0af0358b77281c95af896d5"
  },
  {
    "url": "vuepress/index.html",
    "revision": "ad6a7e1d2ac814ae8f0e6127fa8a4c3c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

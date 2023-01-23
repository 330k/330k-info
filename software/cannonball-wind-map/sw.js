"use strict";
const CACHE_NAME = "cannonball-wind-map";
const urlsToCache = [
  //"icons/01d.svg",
];
//installイベントの場合
//前述のファイルパスをすべてキャッシュに登録する
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
   );
});
//fetchイベントの場合
//ウェブサイトへのアクセスが成功すれば取得できた内容をキャッシュに保存した上でアプリで表示する。
//ウェブサイトへのアクセスが失敗すれば保存されているキャッシュをアプリで表示する。
self.addEventListener("fetch", function(event) {
  event.respondWith(async function() {
      try{
        var res = await fetch(event.request);
        var cache = await caches.open(CACHE_NAME);
        cache.put(event.request.url, res.clone());
        return res;
      }
      catch(error){
      console.log("Using cache");
      return caches.match(event.request);
    }
  }());
});
/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","cd3f9437d234d5a19d42518361cf4690"],["/Ajax原理、优缺点及应用场景.html","e5e02a5bccfef7c9a5a7afe59817d8fa"],["/Ajax原理、优缺点及应用场景.js","20a6bd9e658ac9fd81a168927d05edce"],["/JavaScript函数学习总结-一-函数定义.html","02ad60d57049122e91797e8b58d06d93"],["/JavaScript函数学习总结-一-函数定义.js","11d856ae8012b834a3ffc652aea2ec21"],["/JavaScript对象的深浅复制.html","af7af311c6623514c1780483228f4740"],["/JavaScript对象的深浅复制.js","cc29f793162e962e8454952ae93c7762"],["/Node学习笔记-初识Node.html","6043d1b8618c38ff92284faeafd48487"],["/Node学习笔记-初识Node.js","ef924cbcd1f6653c3f2e5bae33067fbb"],["/PICIDAE_COMMON.js","8c2da4e96c8752546820586d81cc18cb"],["/PICIDAE_ENTRY.js","2c21be2388fab1d586dfdd3e7de0b6d9"],["/about.html","39c3b0a15dedbfcbd66a947afcf10a5e"],["/about.js","1de653d4f566caf4b837ab81f9e3e134"],["/css居中小结.html","cdfbe48e1deb45117b6ccadbd763fbb4"],["/css居中小结.js","cb26a3e6fd3c524ab4272323e547aea1"],["/fle学习总结.html","c29d2aebc03f7cba061d6dfa2da57e43"],["/fle学习总结.js","04a83b78816a65fa0eabfad5f13c6095"],["/footer定位引发的一些思考.html","83b93c6096f7e6a557f39dc71e63a6fe"],["/footer定位引发的一些思考.js","d94901d63f82b5763012a48d9022d6d1"],["/hexo安装总结.html","d2bb838c6625c82652456475d775129c"],["/hexo安装总结.js","9dcf56d26fb78ea83bc208a627c8fdd6"],["/index.html","edc94114960a76c4a7d8368367a7cf1f"],["/js中创建对象的几种方式.html","b4c29f9661e111e476271d9ee100a61c"],["/js中创建对象的几种方式.js","65f837331cee32c2e6145ef3d8982236"],["/picidae.html","074978c983c7db3015056162544b1155"],["/picidae.js","cc7b258bbfd0e5cc6e9b5d935b9db129"],["/posts/1.html","829999e9be885d1d3e7c24a064a824e2"],["/posts/2.html","db1507fced56b92d15ab2ef71691d235"],["/posts/3.html","1e17c640e6545e305cd051b9d6c599d3"],["/posts/4.html","9c90fde7100545f72f01822ee882f0ea"],["/style.css","ab2c81851d1a73e410ed4bb4ee54c6dd"],["/tags.html","4658bca1110956cabca69987eed91bb8"],["/tags/Ajax.html","8fc255134a7caca0942b3dcfb38bedc5"],["/tags/Http.html","3f0752f5abfbb8f30e174b74493efffe"],["/tags/Https.html","bef8778a0037fa236e37fdba2abb10c5"],["/tags/JavaScript.html","a7d7e3cb2556b3824d57d22f549c1402"],["/tags/Node.html","a62c131ecc673e62bef5cfe18408723e"],["/tags/css.html","1ca6646b57da46900bf61c0fa5a562b4"],["/tags/hexo.html","cf969b3b4c5dd9c64f744ade0cc60d63"],["/tags/less.html","263747febc18494ff9d805b6bd4387fa"],["/tags/position.html","3174bb76ce5851d0cf3296b406d9c2f7"],["/tags/sass.html","fac0eca289931408504c123f5523d958"],["/tags/定位.html","411d0a95e96d6668fa674b23edfdbf43"],["/tags/布局.html","c60486a8af1477a2cbe69787e1b5861a"],["/tags/性能优化.html","774bc7aefb56f1a665b4bdbd5c532e83"],["/tags/相对高度.html","18123fa67834f5f68d6b2d645fcddf55"],["/tags/碎碎念.html","c92c4bc8b0c9d31a0676dd1e8badc5d8"],["/tags/移动端.html","bd529dc05eb85d5b4d65175ae9ccf8b2"],["/tags/随笔.html","8145ac465c6df34755b3e55b55d8a20a"],["/三栏布局那些事儿-1.html","09192f125fcd849765de6063812e0106"],["/三栏布局那些事儿-1.js","c56e3538a5e534c9887ef56406f43db9"],["/从网络通信角度谈web性能优化.html","7175d2bf73cc72583815ab176ae11f5a"],["/从网络通信角度谈web性能优化.js","29ab2c4c99dfbf247ce42c724b806a6b"],["/动态样式语言LESS.html","caff7eca5fd7a45289fef6907110f1b1"],["/动态样式语言LESS.js","5cbc92381f0cf2016b012d5be18d12a5"],["/带你从Http转入Https的完整攻略.html","f76ab306d00cf7e8e8a38609df9ac9ce"],["/带你从Http转入Https的完整攻略.js","c9be1e00753728fd1deb1b13f72c25a2"],["/浅析js闭包.html","66b07627367bdfa4df583f5778e92988"],["/浅析js闭包.js","810c3bff976dcc0e05e3c945f615a4a0"],["/细谈sass和less中的变量及其作用域.html","4deccd0e07215c1683050c9b6c80b7e3"],["/细谈sass和less中的变量及其作用域.js","8e37d9a2a9af0d3d6d99ede7dd19f326"],["/聊聊点击穿透.html","296588cc1c865c15c917a2dd0dbe291b"],["/聊聊点击穿透.js","7e5e7729687b8507c0d0fd256b6f2434"],["/致2017.html","017481d58fcec73aff60f4609c44182e"],["/致2017.js","4decfd264670bc1c7283a8c9cc092472"],["/谈谈JS中的高级函数.html","b1d01fa9664109df2ee6ed4549ae55f9"],["/谈谈JS中的高级函数.js","98a3c80b036cbf5a6de106c534f31aa9"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  return;
                  // throw new Error('Request for ' + cacheKey + ' returned a ' +
                  //  'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    if (!shouldRespond) {
      shouldRespond = [
        url.replace(/\/*$/, '.html'),
        url.replace(/\/*$/, '/index.html'),
        url
      ].some(function (maybeUrl) {
        if (urlsToCacheKeys.has(maybeUrl)) {
          url = maybeUrl
          return true
        }
      })
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});








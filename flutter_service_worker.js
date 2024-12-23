'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "c133730174d7aeae7b4a03b6052e7d67",
"version.json": "11bc367431a2f35bbb8df43d775383d1",
"index.html": "fe475ee6cd728b1b873557e6e8b0dd4c",
"/": "fe475ee6cd728b1b873557e6e8b0dd4c",
"main.dart.js": "d2ff0385bf98f96191c039765dc48226",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "69b20482648f799248d5325b9b4a24b3",
".git/config": "5fb1e6c32dc66d7244a0e51dd8c43787",
".git/objects/61/4b34bd3628f6002309c8b62a1d8d4e937557fa": "a08eebdd78cccb8d71127cacb12d1b77",
".git/objects/3e/01ec646db8211db4bfd2df6c3e2b15614dee8b": "375b51cf08a3aef6afab03c9f902301f",
".git/objects/6f/10b0fd7f7f64958f05c1b332747fc5a1f5f396": "b9ec877976c4607ee74e0e40e2ec3017",
".git/objects/9b/325a42e4424bd2e3beb1956b1ccee27f073482": "0b44e71696ddca3e1292da961f169518",
".git/objects/6a/1c6b45951c27bc11a2dab245978e7c7af07e45": "0d6d3db3b9f6405c066f67d7b1554ff9",
".git/objects/94/3ce1e3127ee82519b96e98e5208efd1037120b": "121df00e2188e4d6a2fc2938737455bc",
".git/objects/34/ec6d0c8e00bef0473b96539042dcd45efa2a4f": "c44d87b1badc56e9db716a87e0965937",
".git/objects/33/5a3dce313198c4f67876bf80723c3dbbee3b53": "9fddaeba4ac80af195e8e99a295a1ab0",
".git/objects/a4/e8bdf54b6be1f007f768374561e35a86e34ca6": "461e920ccfc5554b964ff345f9d9ff0a",
".git/objects/d9/8c8b425eee3e0dc3548c06b6c702b5d3409462": "4da8225739df99aafef2cb222815b997",
".git/objects/be/cd0543d7c297583dace0460e3289b6aee13cc8": "2d9a97a6b34ed20b6f9fc630f39b11f4",
".git/objects/df/f48751789379b9f0b7a0eca11bc69c71fc06d6": "97db7f4f4f8e695eb8fdf6f737b74d32",
".git/objects/b4/f2c31e8377bfe44e0d486de7cdd887a58e727d": "ccbe4b9fa3460ee141d9ed4cb72136fd",
".git/objects/bd/f3272848d8352ebf99ced51b10d5bcfa895354": "2e6d67eb900e44842b0aecffe2e54d0b",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/bc/27b06973af27877f0cd32b952718b23b879213": "cd827b2553de72af8c54640652585d84",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/1b4b2baf4958504776cede767ce75825e3d917": "c8ef82433549a64cf768fbf5bee43bf9",
".git/objects/c8/939c844405dce2a3d39ea209f0eddd4eed6529": "049d470faaa6f9092a3e2dcbee25ca58",
".git/objects/c6/06caa16378473a4bb9e8807b6f43e69acf30ad": "ed187e1b169337b5fbbce611844136c6",
".git/objects/ec/361605e9e785c47c62dd46a67f9c352731226b": "d1eafaea77b21719d7c450bcf18236d6",
".git/objects/27/a297abdda86a3cbc2d04f0036af1e62ae008c7": "51d74211c02d96c368704b99da4022d5",
".git/objects/1f/45b5bcaac804825befd9117111e700e8fcb782": "7a9d811fd6ce7c7455466153561fb479",
".git/objects/73/7f149c855c9ccd61a5e24ce64783eaf921c709": "1d813736c393435d016c1bfc46a6a3a6",
".git/objects/74/ec5876502ad697e4e1b55a404d4702f7fbb28a": "2f4e34f472a68a3abf29bd7be0834985",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/2a/72ed5b85d5d46fd9e4610f514262fe39cfeae2": "445b50aa7130435790494dd892262f32",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/09/a5022513f176257f264fab9f336aee93d73458": "c698121d7dadacd592e2586b2fbd5513",
".git/objects/31/31edb4fce99e4029f351407eb74b7266041c14": "9ddace948d2623baaabb5e587f798dfd",
".git/objects/53/fb1cd6fbaa7c1ef3aa246db47435e52160e167": "c216c2f93f1b17fa3288c257ddd79942",
".git/objects/37/7dda5881b526eddaca2067c279954a87786c02": "b16d2b9977b74a8e29137a9d4d70660a",
".git/objects/6d/5f0fdc7ccbdf7d01fc607eb818f81a0165627e": "2b2403c52cb620129b4bbc62f12abd57",
".git/objects/01/467643dee877ec0196b1cac30248e2f6a06b8d": "2bea0a104916a8bfdaaff5bc82573164",
".git/objects/97/8a4d89de1d1e20408919ec3f54f9bba275d66f": "dbaa9c6711faa6123b43ef2573bc1457",
".git/objects/63/6931bcaa0ab4c3ff63c22d54be8c048340177b": "8cc9c6021cbd64a862e0e47758619fb7",
".git/objects/63/f6d0dce509e56ad92ec5f45a637af6a3acf883": "96eadca9a82257d0b6257aad30728ebc",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/ba/5317db6066f0f7cfe94eec93dc654820ce848c": "9b7629bf1180798cf66df4142eb19a4e",
".git/objects/a0/dc9b6cce4d50457d54c8b1e87a0b1d52d8c259": "cd4f0349a4bb32a60ce12af46d9d2ea6",
".git/objects/b1/5ad935a6a00c2433c7fadad53602c1d0324365": "8f96f41fe1f2721c9e97d75caa004410",
".git/objects/b1/afd5429fbe3cc7a88b89f454006eb7b018849a": "e4c2e016668208ba57348269fcb46d7b",
".git/objects/b1/b11752411f1f69732ac90b55d3d480f6a8e617": "8c5d332b7191ece14d0c66720884cb91",
".git/objects/dc/db44761a50a110d5617a25bdeb589e0386de90": "25d47f91d5731b2a6472783f27872ded",
".git/objects/d5/d5bd2a7329db45e29c6e7c8b738611ad74e981": "b9b85df1b7a9559c9fefa6eebc150418",
".git/objects/af/31ef4d98c006d9ada76f407195ad20570cc8e1": "a9d4d1360c77d67b4bb052383a3bdfd9",
".git/objects/af/dc16bbae19b5f3fdd4761c1db7b7b663048a57": "e4dbfac73ca0795a289f90b660b2a71e",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b0/128c2b7d5dcda753da0c55e308ecc8a6bbffcb": "c5b0d1adbe0a66c9d5b9a3bea4806d98",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/c3/e81f822689e3b8c05262eec63e4769e0dea74c": "8c6432dca0ea3fdc0d215dcc05d00a66",
".git/objects/fa/598e0ddfc4a4f118c84bd01e79a2a96db05395": "2f04249e466df728b33bbaa87969764b",
".git/objects/ff/a65120e75a56b50809ea671b062fb233eed476": "c3f880bcf14874575f179ebff4781da7",
".git/objects/e9/a2b8986a732b23084082538419f5e318ace9ba": "8c1f268d087beef946fc735c62865533",
".git/objects/f1/f68df27e7e077d3ec02ec18e5e753725d529b8": "04877decb56f8bfa147cbd4654e10958",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/2d/fcdbe9f2df0332cee24295b9c0a4cdbf2478b7": "b40637ed7a305a7a7296f4f96b139cc1",
".git/objects/83/6545e7b8c42136d77e3ee7077e5c40dff2ed6c": "7377d90928ecc4c751987a7baf0761b7",
".git/objects/4f/346c3e43f95e778d7cef3cb6ceede9cd2bf1c8": "99981890f1649c8ef95c28d9e5a27d4e",
".git/objects/12/5acbd35f9c6224c5f9fd0d1582d01de09ee350": "891d0a910767ff0195dfdfcbd8bc6401",
".git/objects/85/6a39233232244ba2497a38bdd13b2f0db12c82": "eef4643a9711cce94f555ae60fecd388",
".git/objects/49/f911afe79e0eebdab6460f2c9b07922c333346": "1093f4ceba3692bf5f615a3529360bdc",
".git/objects/14/c92c89c946eaa86d1c831c49e62442a0a8377f": "4802e26b421f01c34262bd69f9c7a2e9",
".git/objects/25/8b3eee70f98b2ece403869d9fe41ff8d32b7e1": "05e38b9242f2ece7b4208c191bc7b258",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "5748cfc67b13872575d868cf2e345e7e",
".git/logs/refs/heads/main": "d6b8a76a6594a9b3011f755e3b083331",
".git/logs/refs/remotes/origin/main": "d613cf622a7fac6cf0e0216735ef026b",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/main": "74c1ef9a4248829cf948b6701e5c34a1",
".git/refs/remotes/origin/main": "74c1ef9a4248829cf948b6701e5c34a1",
".git/index": "00f6d4dbfbfde21b1888f545bf60ad0f",
".git/COMMIT_EDITMSG": "55a98d2f133bb742c384632fefda4f24",
"assets/AssetManifest.json": "495a3ffc58457cc5e70b39055381f003",
"assets/NOTICES": "e66ce20751c03180742a75243d9d9cc6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "005ce3b67aaa7b94d6fe67ebdc0a0384",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "9b9d0efc13e27deb050153a1ac3e162d",
"assets/fonts/MaterialIcons-Regular.otf": "9c896e1bab6d1e8571bf88be18be4b32",
"assets/assets/img/vocations/algo_wizard.jpg": "b4f64b992f8fed6c82e7aef9278e6c48",
"assets/assets/img/vocations/code_junkie.jpg": "89fd4a69972a79ba7086a9577b0dfad3",
"assets/assets/img/vocations/ux_ninja.jpg": "f2436369e0ae83013a9d60357b7dae26",
"assets/assets/img/vocations/terminal_raider.jpg": "3de6d593f4b637b23895ce6bd37340ab",
"assets/assets/img/skills/gamify.jpg": "8014e5f2d5a92b5ebfa7f93f9a43c07a",
"assets/assets/img/skills/l_touch.jpg": "141065209f27a63771bd08823f8d9d8b",
"assets/assets/img/skills/f_clear.jpg": "e62be2648c28bc7279c45ffcd3e30975",
"assets/assets/img/skills/r_wave.jpg": "600a7843940f192cad0920479cabe1b5",
"assets/assets/img/skills/d_pattern.jpg": "ed74fe6ff03f3b4dbdfd38c26414fc37",
"assets/assets/img/skills/encapsulate.jpg": "ac97d677975a47f6e99287d623492c8f",
"assets/assets/img/skills/wireframe.jpg": "10760ec684b40ab56a121cb9b68b9793",
"assets/assets/img/skills/h_map.jpg": "af1e474e5040ee1e53bd005ce53f6278",
"assets/assets/img/skills/c_paste.jpg": "b6344972a722299fa369d69b29e8cc64",
"assets/assets/img/skills/s_shell.jpg": "3288d7f268b9c5c11acc371632ff3765",
"assets/assets/img/skills/s_blast.jpg": "ddb93258659fb4c1e306f7f572ac8905",
"assets/assets/img/skills/h_beam.jpg": "34b98c34835ec48147cc6da68c13a009",
"assets/assets/img/skills/bf_bolt.jpg": "5357eae9a826c582d8918891b38ac505",
"assets/assets/img/skills/i_loop.jpg": "9f90a7cfdc4495cfb9517702b5ce8a64",
"assets/assets/img/skills/backtrack.jpg": "ed679022b2fba75752636a034e8f2670",
"assets/assets/img/skills/t_cast.jpg": "c435ea6d0180dd206c058eb259830fc0",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

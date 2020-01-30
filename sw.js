//imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/inge/ico.jpeg',
    'img/inge/iee.jpg',
    'img/inge/iciv.jpeg',
    'img/inge/ime.jpeg',
    'img/humanidades/arqui.jpg',
    'img/humanidades/di.png',
    'img/humanidades/pedagogia.jpg',
    'img/cienciasS/agro.jpg',
    'img/cienciasS/cp.png',
    'img/cienciasS/derecho.png',
    'img/cienciasS/eco.jpg',
    'img/cienciasS/relaciones.jpeg',
    'img/cienciasS/sociologia.jpeg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Bad+Script&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap',
    'https://fonts.googleapis.com/css?family=Montserrat&display=swap',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animated.css'
];

self.addEventListener('install', e => {


    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});

// Comenzando con un cache only, siempre se debe dar una respuesta del e.respondWith

self.addEventListener('fetch', e => {

    // verificar en el cache si existe la request
    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res
        } else {
            return fetch(e.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }
    });

    e.respondWith(respuesta)
});
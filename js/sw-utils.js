// Archivo auxiliar del sw

// Guardar en el cache dinamico
function actualizaCacheDinamico(dynamicCache, req, res) {

    // Si la respuesta es ok, significa que hay datos y se deben almacenar en el cache
    if (res.ok) {

        return caches.open(dynamicCache).then(cache => {

            cache.put(req, res.clone());

            return res.clone();

        });
    } else {
        // Si no viene nada
        return res;
    }


}
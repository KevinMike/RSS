function resolverDespuesDe2Segundos(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function añadir1(x) {
    var a = resolverDespuesDe2Segundos(20);
    var b = resolverDespuesDe2Segundos(30);
    return x + await a + await b;
}

var f = añadir1(10);
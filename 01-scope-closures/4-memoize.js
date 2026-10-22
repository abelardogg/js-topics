/**
 * 4 · memoize(fn)
 *
 * Cache para funciones de UN argumento: si el argumento ya se vio, devuelve
 * el resultado guardado sin volver a ejecutar `fn`.
 *
 * Pista: `Map`, no un objeto plano. Un objeto convierte sus claves a string
 * (el 1 y el "1" acabarian en la misma casilla) y arrastra el prototipo.
 *
 * ESPERADO
 *   const double = memoize(n => { calls++; return n * 2; });
 *   double(4), double(4)           -> 8, 8
 *   calls                          -> 1
 *
 *   double(1); double(2); double(1);
 *   calls                          -> 2            <- args distintos, llamadas distintas
 *
 *   const kind = memoize(v => typeof v);
 *   kind(1)                        -> 'number'
 *   kind('1')                      -> 'string'     <- 1 y "1" son claves distintas
 *
 *   const zero = memoize(() => { calls++; return 0; });
 *   zero('k'); zero('k');
 *   calls                          -> 1            <- 0, '', null, undefined,
 *                                                     false y NaN se cachean
 *
 *   fn('toString'), fn('constructor')              <- claves asi no deben chocar
 *   dos memoize() distintos no comparten cache
 *
 * CORRE SOLO ESTE:  npm run test:01:4
 */
export function memoize(fn) {
  throw new Error('TODO: memoize');
}

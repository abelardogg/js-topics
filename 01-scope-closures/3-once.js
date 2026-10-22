/**
 * 3 · once(fn)
 *
 * Devuelve una funcion que ejecuta `fn` solo la PRIMERA vez y de ahi en
 * adelante devuelve siempre ese primer resultado, sin volver a llamar a `fn`.
 *
 * Ojo: debe funcionar aunque `fn` devuelva undefined, asi que no puedes usar
 * el resultado guardado como bandera de "ya corrio". Reenvia todos los
 * argumentos de la primera llamada.
 *
 * ESPERADO
 *   const init = once(() => { calls++; return 'ready'; });
 *   init(), init(), init()         -> 'ready', 'ready', 'ready'
 *   calls                          -> 1
 *
 *   const fn = once((...args) => args.join('-'));
 *   fn('a', 'b')                   -> 'a-b'        <- reenvia argumentos
 *
 *   const dup = once(x => x * 2);
 *   dup(3)                         -> 6
 *   dup(100)                       -> 6            <- ignora los args nuevos
 *
 *   const noop = once(() => { calls++; });         <- devuelve undefined
 *   noop(), noop()                 -> undefined, undefined
 *   calls                          -> 1            <- undefined tambien cuenta
 *
 *   dos once() distintos no comparten nada
 *
 * CORRE SOLO ESTE:  npm run test:01:3
 */
export function once(fn) {
  throw new Error('TODO: once');
}

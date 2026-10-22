/**
 * 6 · createIdGenerator(prefix)  ·  MINI RETO
 *
 * Devuelve una FUNCION que en cada llamada da el siguiente id, y esa misma
 * funcion lleva un metodo extra `.reset()` que vuelve el contador a cero.
 *
 * (Si, una funcion puede tener propiedades: en JS las funciones son objetos.)
 *
 * ESPERADO
 *   const nextId = createIdGenerator('u');
 *   typeof nextId                  -> 'function'
 *   nextId()                       -> 'u-1'        <- empieza en 1, no en 0
 *   nextId()                       -> 'u-2'
 *   nextId()                       -> 'u-3'
 *
 *   createIdGenerator('order')()   -> 'order-1'
 *
 *   typeof nextId.reset            -> 'function'
 *   nextId(); nextId(); nextId.reset();
 *   nextId()                       -> 'u-1'
 *
 *   reset() en un generador recien creado no rompe nada
 *   dos generadores son independientes (el reset de uno no toca al otro)
 *
 * CORRE SOLO ESTE:  npm run test:01:6
 */
export function createIdGenerator(prefix) {
  throw new Error('TODO: createIdGenerator');
}

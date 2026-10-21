/**
 * Sesion 01 · Scope y closures
 *
 * Este es el UNICO archivo que editas. No toques exercises.test.js.
 * Corre: npm run test:01
 */

/* ------------------------------------------------------------------ *
 * 1a. fixLoop  ·  ENCONTRAR EL BUG
 *
 * Deberia devolver un array de 3 funciones que al llamarlas den 0, 1 y 2.
 * Ahora las tres devuelven 3. Arreglalo como quieras.
 * ------------------------------------------------------------------ */
export function fixLoop() {
  const fns = [];
  for (var i = 0; i < 3; i++) {

    let f = ()=>i;

    fns.push(f);
  }
  return fns;
}

/* ------------------------------------------------------------------ *
 * 1b. fixLoopB  ·  EL MISMO BUG, OTRA SALIDA
 *
 * Mismo objetivo: 0, 1, 2. La restriccion es que el `var i` se queda.
 * No puedes cambiarlo por `let` ni sacar el contador del loop; el test
 * revisa que la palabra `var` siga en esta funcion.
 *
 * O sea: si la caja `i` es una sola para todo el loop, que mas puedes
 * cambiar para que cada funcion se lleve su propio numero en la mochila?
 * ------------------------------------------------------------------ */
export function fixLoopB() {
  const fns = [];
  for (var i = 0; i < 3; i++) {
        fns.push(()=>{i});

  }
  return fns;
}

/* ------------------------------------------------------------------ *
 * 2. createCounter(start = 0)
 *
 * Devuelve un objeto con tres metodos:
 *   increment() -> suma 1 y devuelve el valor nuevo
 *   decrement() -> resta 1 y devuelve el valor nuevo
 *   value()     -> devuelve el valor actual sin modificarlo
 *
 * El contador debe ser PRIVADO: nadie de afuera puede leerlo ni escribirlo
 * directamente (nada de `counter.count`). Dos contadores no se pisan.
 * ------------------------------------------------------------------ */
export function createCounter(start = 0) {
  throw new Error('TODO: createCounter');
}

/* ------------------------------------------------------------------ *
 * 3. once(fn)
 *
 * Devuelve una funcion que ejecuta `fn` solo la PRIMERA vez y de ahi en
 * adelante devuelve siempre ese primer resultado, sin volver a llamar a `fn`.
 *
 * Ojo: debe funcionar aunque `fn` devuelva undefined (no uses el resultado
 * como bandera). Reenvia todos los argumentos de la primera llamada.
 * ------------------------------------------------------------------ */
export function once(fn) {
  throw new Error('TODO: once');
}

/* ------------------------------------------------------------------ *
 * 4. memoize(fn)
 *
 * Cache para funciones de UN argumento: si el argumento ya se vio, devuelve
 * el resultado guardado sin volver a ejecutar `fn`.
 *
 * Requisitos:
 *   - `1` y `"1"` son claves distintas.
 *   - Resultados falsy (0, '', null, undefined, false) tambien se cachean.
 * Pista: `Map` (no un objeto plano).
 * ------------------------------------------------------------------ */
export function memoize(fn) {
  throw new Error('TODO: memoize');
}

/* ------------------------------------------------------------------ *
 * 5. getGreeter(user)  ·  ENCONTRAR EL BUG
 *
 * Deberia devolver una funcion que al llamarla diga `Hello, <nombre>`.
 * Ahora revienta (o dice "Hello, undefined") porque se pierde el `this`.
 * Arreglalo SIN cambiar el objeto `user` que te pasan.
 * ------------------------------------------------------------------ */
export function getGreeter(user) {
  return user.greet;
}

/* ------------------------------------------------------------------ *
 * 6. createIdGenerator(prefix)  ·  MINI RETO
 *
 * Devuelve una FUNCION `next` que en cada llamada da el siguiente id:
 *   const nextId = createIdGenerator('u');
 *   nextId(); // 'u-1'
 *   nextId(); // 'u-2'
 *
 * Esa misma funcion lleva un metodo extra `next.reset()` que vuelve el
 * contador a cero (la siguiente llamada da 'u-1' otra vez).
 * Dos generadores son independientes.
 * ------------------------------------------------------------------ */
export function createIdGenerator(prefix) {
  throw new Error('TODO: createIdGenerator');
}

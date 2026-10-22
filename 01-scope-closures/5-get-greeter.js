/**
 * 5 · getGreeter(user)  ·  ENCONTRAR EL BUG
 *
 * Debe devolver una funcion que al llamarla diga `Hello, <nombre>`.
 * Ahora revienta (o dice "Hello, undefined") porque se pierde el `this`.
 * Arreglalo SIN modificar el objeto `user` que te pasan.
 *
 * El user que usan los tests:
 *   { name: 'Ada', greet() { return `Hello, ${this.name}`; } }
 *
 * ESPERADO
 *   const greeter = getGreeter(user);
 *   typeof greeter                 -> 'function'
 *   greeter()                      -> 'Hello, Ada'
 *
 *   const wrapper = { run: greeter };
 *   wrapper.run()                  -> 'Hello, Ada'  <- no depende del llamador
 *
 *   dos users distintos no se mezclan
 *   user.greet sigue siendo el mismo metodo         <- no lo reasignes
 *   Object.keys(user) no cambia                     <- no le agregues props
 *   user.greet() sigue funcionando
 *
 * CORRE SOLO ESTE:  npm run test:01:5
 */
export function getGreeter(user) {
  return user.greet;
}

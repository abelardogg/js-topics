/**
 * 2 · createCounter(start = 0)
 *
 * Devuelve un objeto con tres metodos:
 *   increment() -> suma 1 al valor GUARDADO y devuelve como quedo
 *   decrement() -> resta 1 al valor GUARDADO y devuelve como quedo
 *   value()     -> devuelve el valor actual sin modificarlo
 *
 * El numero tiene que RECORDARSE entre llamadas: vive en el scope de
 * createCounter (su mochila), no se recalcula. Debe ser PRIVADO: nadie de
 * afuera puede leerlo ni escribirlo (nada de `counter.count`).
 * Dos contadores no se pisan.
 *
 * ESPERADO
 *   createCounter().value()                  -> 0
 *   createCounter(10).value()                -> 10
 *   createCounter(-3).value()                -> -3
 *
 *   const c = createCounter(5);
 *   c.increment()                            -> 6
 *   c.increment()                            -> 7      <- no 6 otra vez
 *   c.decrement()                            -> 6
 *   c.value()                                -> 6
 *   c.value()                                -> 6      <- leer no modifica
 *
 *   const a = createCounter(), b = createCounter();
 *   a.increment(); a.increment();
 *   a.value()                                -> 2
 *   b.value()                                -> 0      <- b no se entera
 *
 *   Object.keys(createCounter())             -> ['increment','decrement','value']
 *                                               (en cualquier orden, y nada mas)
 *
 * PISTA DE OPERADOR: `x++` devuelve el valor VIEJO y luego suma; `++x` suma
 * y devuelve el NUEVO. Aqui se quiere el nuevo.
 *
 * CORRE SOLO ESTE:  npm run test:01:2
 */
export function createCounter(start = 0) {
  const obj = {
    increment: function () {
      return start + 1;
    },
    decrement: function () {
      return start - 1;
    },
    value: function () {
      return start;
    },
  };

  return obj;
}

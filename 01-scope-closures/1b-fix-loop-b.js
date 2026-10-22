/**
 * 1b · fixLoopB  ·  EL MISMO BUG, OTRA SALIDA
 *
 * Mismo objetivo que 1a, pero el `var i` se queda. No puedes cambiarlo por
 * `let` ni sacar el contador del loop: un test revisa que la palabra `var`
 * siga en esta funcion.
 *
 * Si la caja `i` es una sola para todo el loop, que mas puedes cambiar para
 * que cada funcion se lleve su propio numero en la mochila?
 *
 * ESPERADO
 *   fixLoopB().map(f => f())    -> [0, 1, 2]
 *   fixLoopB.toString()         -> contiene la palabra `var`
 *
 * CORRE SOLO ESTE:  npm run test:01:1b
 */
export function fixLoopB() {
  const fns = [];
  for (var i = 0; i < 3; i++) {
    const current = i;
    fns.push(function () {
      return current;
    });
  }
  return fns;
}

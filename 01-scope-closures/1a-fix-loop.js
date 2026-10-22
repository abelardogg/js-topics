/**
 * 1a · fixLoop  ·  ENCONTRAR EL BUG
 *
 * Devuelve un array de 3 funciones. Al llamarlas deben dar 0, 1 y 2.
 * Ahora las tres devuelven 3. Arreglalo como quieras.
 *
 * ESPERADO
 *   fixLoop().length            -> 3
 *   fixLoop().map(f => f())     -> [0, 1, 2]
 *   fns[2](); fns[0]()          -> 2, luego 0   (el orden no importa)
 *   fns[1](); fns[1]()          -> 1, luego 1   (llamar dos veces da lo mismo)
 *
 * CORRE SOLO ESTE:  npm run test:01:1a
 */
export function fixLoop() {
  const fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(function () {
      return i;
    });
  }
  return fns;
}

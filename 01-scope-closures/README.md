# 01 · Scope y closures

> Teoria en 5 minutos. Leela, cierra el archivo y resuelve `exercises.js`.

## 1. `var` vs `let` / `const`

`var` tiene **scope de funcion**. `let` y `const` tienen **scope de bloque** (`{ ... }`).

```js
for (var i = 0; i < 3; i++) { /* ... */ }
console.log(i); // 3  -> sobrevivio al loop

for (let j = 0; j < 3; j++) { /* ... */ }
console.log(j); // ReferenceError
```

La clave para el ejercicio 1: con `var` existe **una sola** variable `i` para todo el
loop; con `let` el motor crea **una nueva** `j` en cada iteracion (*binding* por
iteracion). Por eso las funciones creadas dentro del loop con `var` terminan todas
mirando la misma caja, y esa caja al final vale 3.

## 2. Closure

Analogia: cuando defines una funcion, se va con una **mochila** donde guarda las
variables del lugar donde nacio. No una foto de los valores, sino el acceso vivo a
las cajas. Si alguien cambia la caja despues, la funcion ve el valor nuevo.

```js
function makeAdder(n) {
  return (x) => x + n; // la flecha lleva `n` en la mochila
}
const add5 = makeAdder(5);
add5(2); // 7
```

Eso es todo lo que es un closure: **funcion + su mochila**.

**Efecto secundario (costo):** la mochila mantiene vivas esas variables mientras la
funcion exista. Un closure que captura un array de 10k elementos impide que el GC lo
libere. Fuente clasica de fugas en listeners e intervalos que nunca se limpian.

## 3. `this` se pierde al sacar el metodo del objeto

En una funcion normal, `this` **no** se decide donde se escribe, sino **como se
llama**: lo define quien esta a la izquierda del punto.

```js
const user = { name: 'Ada', greet() { return `Hi, ${this.name}`; } };

user.greet();              // 'Hi, Ada'   -> this = user
const g = user.greet;
g();                       // 'Hi, undefined' (o TypeError en modulos ESM/strict)
```

Al asignar `user.greet` a `g` te llevas la funcion **sin** el objeto. No hay nada a
la izquierda del punto, asi que `this` queda `undefined` en strict mode (los modulos
ESM siempre son strict).

Tres arreglos:

```js
user.greet.bind(user)          // fija this para siempre
() => user.greet()             // la flecha no tiene this propio; usa el del scope
function () { return `Hi, ${user.name}`; }  // cierra sobre `user`, ignora this
```

Las arrow functions **no tienen `this` propio**: lo heredan lexicamente de donde se
escribieron. Por eso sirven de callback, y por eso **no** sirven como metodo cuando
necesitas el `this` del objeto que lo llama.

## 4. Estado privado

Un closure es el "private" de JS sin clases: si la variable solo vive dentro de la
factory, nadie de afuera puede tocarla.

```js
function makeBox() {
  let secret = 0;                       // inalcanzable desde afuera
  return { bump: () => ++secret, read: () => secret };
}
```

Cada llamada a `makeBox()` crea un scope nuevo -> **instancias independientes**.
Si `secret` estuviera fuera de la factory, todas las instancias lo compartirian.
Ese es el bug que buscan los tests de "instancias independientes".

---

## Ejercicios

Un archivo por ejercicio, con su test al lado. Solo editas el archivo sin
`.test`. Cada archivo trae arriba un bloque **ESPERADO** con los resultados
concretos que se buscan.

| # | Archivo | Corre solo este | Tests |
|---|---|---|---|
| 1a | [`1a-fix-loop.js`](1a-fix-loop.js) | `npm run test:01:1a` | 7 |
| 1b | [`1b-fix-loop-b.js`](1b-fix-loop-b.js) | `npm run test:01:1b` | 7 |
| 2 | [`2-create-counter.js`](2-create-counter.js) | `npm run test:01:2` | 12 |
| 3 | [`3-once.js`](3-once.js) | `npm run test:01:3` | 9 |
| 4 | [`4-memoize.js`](4-memoize.js) | `npm run test:01:4` | 15 |
| 5 | [`5-get-greeter.js`](5-get-greeter.js) | `npm run test:01:5` | 9 |
| 6 | [`6-create-id-generator.js`](6-create-id-generator.js) | `npm run test:01:6` | 9 |

Los ejercicios 1a, 1b y 5 ya traen codigo: **esta mal a proposito**, tu lo
arreglas. Los demas lanzan `Error('TODO')` hasta que los escribas.

## Como correr

```bash
npm run test:01:2            # solo el ejercicio 2
npm run test:01:2:watch      # el 2, re-corriendo en cada guardado  <- el util
npm run test:01              # los 67 de la sesion
npm run play:01              # imprime las salidas, sin aserciones
```

Cada caso sale como `✔` o `✖` con su nombre. Los que fallan traen al final el
`actual` vs `expected` y la linea del test:

```
✖ 2 · dos increments seguidos avanzan: 6 y luego 7
  AssertionError: el contador tiene que recordar, no recalcular desde start
    actual: 6,
    expected: 7,
```

`playground.js` es tuyo: cambialo, agrega casos, comenta lo que no uses.

## Trampas que los tests vigilan

- Ej. 2: dos `increment()` seguidos tienen que avanzar (6, luego 7), no
  recalcular desde `start`.
- Ej. 3: `once(fn)` donde `fn` devuelve `undefined` -> no debe volver a llamarla.
- Ej. 4: resultados `0`, `null`, `undefined`, `false`, `''` y `NaN` se cachean;
  `1` y `"1"` son claves distintas.
- Ej. 5: arreglarlo sin tocar el objeto `user`.
- Ej. 2 y 6: dos instancias no comparten contador.
- Ej. 6: `.reset()` vuelve a empezar en 1.

Cuando acabes, escribe `NOTES.md` y dime "revisa sesion 1".

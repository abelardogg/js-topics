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

Edita **solo** `exercises.js`. Corre los tests con:

```bash
npm run test:01
```

| # | Funcion | Que practica |
|---|---|---|
| 1a | `fixLoop` | Encontrar el bug: `var` en loop. Debe devolver `0, 1, 2`. |
| 1b | `fixLoopB` | El mismo bug, pero el `var` se queda. Otra salida. |
| 2 | `createCounter` | Estado privado e instancias independientes. |
| 3 | `once` | Cachear la primera llamada, incluso si devolvio `undefined`. |
| 4 | `memoize` | Cache de 1 argumento con `Map`; `1` != `"1"`; cachear falsy. |
| 5 | `getGreeter` | Encontrar el bug: `this` perdido. |
| 6 | `createIdGenerator` | Mini reto: contador con prefijo + `.reset()`. |

Los ejercicios 1a, 1b y 5 ya traen codigo: **esta mal a proposito**, tu lo arreglas.
Los demas son stubs que lanzan `Error('TODO')`.

### Trampas que los tests vigilan

- Ej. 3: `once(fn)` donde `fn` devuelve `undefined` -> no debe volver a llamarla.
- Ej. 4: `memoize` con resultado `0`, `null` o `undefined` -> debe cachearse.
- Ej. 2 y 6: dos instancias no comparten contador.
- Ej. 6: `.reset()` vuelve a empezar en 1.

Cuando acabes, escribe `NOTES.md` y dime "revisa sesion 1".

# Plan de estudio: fundamentos de JS, React y TypeScript

> Instrucciones para Claude Code. Este archivo describe un plan de práctica para el repo `js-topics`. Tu papel es preparar cada sesión (teoría + ejercicios + tests), revisar mis soluciones y hacer commit/push. **No resuelvas los ejercicios por mí** ni me des la respuesta antes de que lo intente; si me atoro, dame una pista a la vez.

## Contexto

- Soy frontend developer con 10 años de experiencia (HTML, CSS, JS, SEO, performance, Web Vitals).
- Llevo un año usando agentes de IA y estoy oxidado escribiendo código a mano.
- Objetivo: retomar fundamentos para aplicar a plataformas de evaluación de código para IA (Alignerr, Outlier) y poder poner React y TypeScript en mi CV con confianza.
- Disponibilidad: ratos libres, sesiones de 30–40 min.
- Prefiero explicaciones breves; para lo complejo, analogías. Me interesa saber costos y efectos secundarios (rendimiento, memoria, re-renders).
- Idioma: explicaciones en español, código y nombres en inglés.

## Diagnóstico inicial (resultado: 3.5 / 6)

| Tema | Resultado | Nota |
|---|---|---|
| `var` en loop + `setTimeout` | ❌ | Respondí 1, 2, 3; la respuesta es 3, 3, 3. Repasar scope de `var` vs `let`. |
| Event loop (microtareas vs macrotareas) | ✅ | Dominado. |
| TS: propiedad opcional (`age?.toFixed`) | ✅ | Bien; reforzar `?.` y `??`. |
| `useEffect` sin dependencias | 🟡 | Supe el arreglo pero no nombré el loop infinito. |
| Dos `setCount(count + 1)` seguidos | ✅ | Reforzar el porqué: closure del render actual; usar `setCount(c => c + 1)`. |
| Prop `key` en listas | ❌ | No sabía su propósito ni el problema de usar el índice. |

**Prioridad:** scope/closures y el modelo de render de React.

## Estructura del repo

```
js-topics/
├── package.json          # scripts: "test", "test:01", "test:02", ...
├── README.md             # tabla de sesiones con su estado
├── 01-scope-closures/
│   ├── README.md         # teoría en 5 min + lista de ejercicios
│   ├── exercises.js      # stubs con comentarios; yo edito solo este archivo
│   ├── exercises.test.js # tests que empiezan en rojo
│   └── NOTES.md          # lo escribo yo al terminar
├── 02-react-render/
└── ...
```

**Convenciones:**

- Sesiones 1 y 4: Node puro con `node:test` y `node:assert/strict`, sin dependencias. Node ≥ 20.
- Sesiones 2 y 3 (React): Vite + React + Vitest + Testing Library. Instala solo lo necesario y dime qué agregas y cuánto pesa.
- Sesión 4: TypeScript con `tsc --noEmit` como "test" de tipos, más tests en runtime.
- Los tests deben incluir casos borde (valores falsy, `undefined`, instancias independientes, orden de ejecución).
- Antes de entregarme una sesión, verifica en un directorio temporal (fuera del repo) que una solución correcta pasa todos los tests y que los stubs fallan. No subas la solución.

## Sesiones

### 01 · Scope y closures

**Teoría:** `var` vs `let`/`const` (scope de función vs bloque), closures (analogía: mochila que la función lleva consigo), `this` y cómo se pierde al sacar un método del objeto, `bind` y arrow functions. Efecto secundario: los closures retienen memoria.

**Ejercicios:**

1. `fixLoop`: encontrar el bug. Un loop con `var` que crea 3 funciones; todas devuelven 3 y deben devolver 0, 1, 2.
2. `createCounter(start = 0)`: `increment`, `decrement` y `value` con estado privado; instancias independientes.
3. `once(fn)`: ejecuta solo la primera vez y devuelve siempre el primer resultado, aunque sea `undefined`.
4. `memoize(fn)`: cache de un argumento; debe distinguir `1` de `"1"` y cachear resultados falsy (pista: `Map`).
5. `getGreeter(user)`: encontrar el bug. Devuelve `user.greet` y pierde `this`.
6. Mini reto, `createIdGenerator(prefix)`: `'u-1'`, `'u-2'`… con un método extra `.reset()`.

### 02 · Modelo de render de React

**Teoría:** qué dispara un render (estado, props, padre), render vs commit, reconciliación, para qué sirve `key` (analogía: asientos numerados vs con nombre), por qué el índice rompe el estado al reordenar o borrar, y el batching de `setState`.

**Ejercicios:**

1. Lista con inputs que usa el índice como `key`: al borrar un elemento, el texto se queda en el input equivocado. Arreglarlo.
2. Contador con dos `setCount(count + 1)`: explicar el resultado y arreglarlo con actualización funcional.
3. Predecir cuántas veces renderiza un componente hijo cuando cambia el estado del padre (medir con un contador de renders en el test).
4. Mini reto: lista reordenable (subir/bajar elementos) que conserva el estado de cada fila.

### 03 · Hooks a fondo

**Teoría:** array de dependencias de `useEffect` (sin array, vacío, con valores), cleanup, closures viejos (*stale closures*) en intervalos y listeners, y cuándo `useMemo`/`useCallback` ayudan o solo agregan costo.

**Ejercicios:**

1. `useEffect` con loop infinito: nombrar el problema y arreglarlo.
2. `setInterval` que siempre lee el valor inicial (stale closure): arreglarlo de dos formas.
3. Listener de `resize` sin cleanup: detectar la fuga de memoria y arreglarla.
4. Custom hook `useDebounce(value, delay)` con tests usando timers falsos.
5. Mini reto: `useFetch(url)` que cancela la petición anterior con `AbortController` y evita actualizar estado después de desmontar.

### 04 · TypeScript práctico

**Teoría:** narrowing (`typeof`, `in`, uniones discriminadas), `?.` y `??`, generics básicos, tipar props y hooks, y utility types (`Partial`, `Pick`, `Omit`, `Record`). Efecto secundario: `any` y `as` apagan las garantías.

**Ejercicios:**

1. Arreglar errores de tipos en un archivo dado sin usar `any` ni `as`.
2. Unión discriminada `Result<T>` (`{ ok: true, data: T } | { ok: false, error: string }`) y una función que la consuma con narrowing.
3. Función genérica `groupBy<T, K>(items, getKey)`.
4. Tipar un componente React con props opcionales, `children` y un callback.
5. Mini reto: tipar `useFetch` de la sesión 3 con generics.

### 05 · Simulacro de evaluación de código

Formato de Alignerr/Outlier: un prompt de usuario y dos respuestas de IA con código (A y B).

**Ejercicio (3 casos):** para cada uno escribo en inglés:

- Cuál respuesta es mejor y por qué.
- Bugs o casos borde que falla cada una.
- Calificación de 1 a 5 en corrección, claridad y seguridad.

Prepara casos con errores sutiles: off-by-one, mutación de props, `key` con índice, falta de cleanup, `==` vs `===`, manejo de errores ausente. Después califica mi evaluación como lo haría un revisor de la plataforma.

## Flujo por sesión

1. **Preparar:** crea la carpeta de la sesión, actualiza `package.json` y el README raíz, verifica stubs en rojo y solución en verde (fuera del repo), luego commit y push con el mensaje `Sesión N: ejercicios`.
2. **Resolver (yo):** trabajo sin IA. Si te pido ayuda, das una pista a la vez, nunca la solución completa.
3. **Revisar:** cuando diga "revisa sesión N", corre los tests y haz un code review como en un PR:
   - Qué está bien.
   - Bugs o casos borde que se me escaparon.
   - Mejoras de legibilidad o rendimiento, con su costo.
   - Calificación por ejercicio: ✅ / 🟡 / ❌.
4. **Cerrar:** actualiza el estado en el README raíz y sugiere qué repasar antes de la siguiente sesión.

## Criterio para ponerlo en el CV

Agrego React y TypeScript al CV cuando:

- Las sesiones 1–4 estén en verde sin ayuda en la solución.
- En el simulacro tenga al menos 2 de 3 casos bien evaluados.
- Pueda explicar en voz alta, sin notas: `key`, stale closures y el array de dependencias de `useEffect`.

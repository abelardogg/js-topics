import test from 'node:test';
import assert from 'node:assert/strict';

import {
  fixLoop,
  fixLoopB,
  createCounter,
  once,
  memoize,
  getGreeter,
  createIdGenerator,
} from './exercises.js';

/* ------------------------------ 1. fixLoop ------------------------------ */

test('fixLoop: devuelve 3 funciones', () => {
  const fns = fixLoop();
  assert.equal(fns.length, 3);
  for (const fn of fns) assert.equal(typeof fn, 'function');
});

test('fixLoop: cada funcion recuerda su propio indice', () => {
  const fns = fixLoop();
  assert.deepEqual(
    fns.map((fn) => fn()),
    [0, 1, 2],
  );
});

test('fixLoop: el orden de llamada no cambia el resultado', () => {
  const fns = fixLoop();
  assert.equal(fns[2](), 2);
  assert.equal(fns[0](), 0);
  assert.equal(fns[1](), 1);
  assert.equal(fns[2](), 2, 'llamar dos veces debe dar lo mismo');
});

test('fixLoop: cada llamada crea funciones nuevas e independientes', () => {
  const a = fixLoop();
  const b = fixLoop();
  assert.notEqual(a[0], b[0]);
  assert.deepEqual([a[0](), b[0]()], [0, 0]);
});

/* ----------------------------- 1b. fixLoopB ----------------------------- */

test('fixLoopB: devuelve 3 funciones', () => {
  const fns = fixLoopB();
  assert.equal(fns.length, 3);
  for (const fn of fns) assert.equal(typeof fn, 'function');
});

test('fixLoopB: cada funcion recuerda su propio indice', () => {
  const fns = fixLoopB();
  assert.deepEqual(
    fns.map((fn) => fn()),
    [0, 1, 2],
  );
});

test('fixLoopB: el orden de llamada no cambia el resultado', () => {
  const fns = fixLoopB();
  assert.equal(fns[2](), 2);
  assert.equal(fns[0](), 0);
  assert.equal(fns[1](), 1);
  assert.equal(fns[2](), 2, 'llamar dos veces debe dar lo mismo');
});

test('fixLoopB: sigue usando var (la restriccion del ejercicio)', () => {
  assert.match(
    fixLoopB.toString(),
    /\bvar\b/,
    'la variante B tiene que resolverlo sin quitar el var',
  );
});

/* --------------------------- 2. createCounter --------------------------- */

test('createCounter: arranca en 0 por defecto', () => {
  const counter = createCounter();
  assert.equal(counter.value(), 0);
});

test('createCounter: respeta el valor inicial', () => {
  assert.equal(createCounter(10).value(), 10);
  assert.equal(createCounter(-3).value(), -3);
});

test('createCounter: increment y decrement devuelven el valor nuevo', () => {
  const counter = createCounter(5);
  assert.equal(counter.increment(), 6);
  assert.equal(counter.increment(), 7);
  assert.equal(counter.decrement(), 6);
  assert.equal(counter.value(), 6);
});

test('createCounter: value() no modifica el estado', () => {
  const counter = createCounter(2);
  counter.value();
  counter.value();
  assert.equal(counter.value(), 2);
});

test('createCounter: dos instancias son independientes', () => {
  const a = createCounter();
  const b = createCounter();
  a.increment();
  a.increment();
  assert.equal(a.value(), 2);
  assert.equal(b.value(), 0, 'b no deberia enterarse de los cambios de a');
});

test('createCounter: el estado es privado', () => {
  const counter = createCounter(1);
  assert.deepEqual(
    Object.keys(counter).sort(),
    ['decrement', 'increment', 'value'],
    'no expongas el contador como propiedad',
  );
});

/* -------------------------------- 3. once ------------------------------- */

test('once: ejecuta fn una sola vez', () => {
  let calls = 0;
  const init = once(() => {
    calls += 1;
    return 'ready';
  });

  assert.equal(init(), 'ready');
  assert.equal(init(), 'ready');
  assert.equal(init(), 'ready');
  assert.equal(calls, 1);
});

test('once: reenvia los argumentos de la primera llamada', () => {
  const received = [];
  const fn = once((...args) => {
    received.push(args);
    return args.join('-');
  });

  assert.equal(fn('a', 'b'), 'a-b');
  assert.deepEqual(received, [['a', 'b']]);
});

test('once: los argumentos posteriores se ignoran', () => {
  const fn = once((x) => x * 2);
  assert.equal(fn(3), 6);
  assert.equal(fn(100), 6, 'debe devolver el primer resultado, no recalcular');
});

test('once: cachea un resultado undefined', () => {
  let calls = 0;
  const fn = once(() => {
    calls += 1;
  });

  assert.equal(fn(), undefined);
  assert.equal(fn(), undefined);
  assert.equal(calls, 1, 'undefined tambien cuenta como "ya se ejecuto"');
});

test('once: instancias independientes', () => {
  let calls = 0;
  const make = () => once(() => ++calls);
  const a = make();
  const b = make();
  assert.equal(a(), 1);
  assert.equal(b(), 2);
  assert.equal(a(), 1);
});

/* ------------------------------ 4. memoize ------------------------------ */

test('memoize: devuelve el mismo resultado sin recalcular', () => {
  let calls = 0;
  const double = memoize((n) => {
    calls += 1;
    return n * 2;
  });

  assert.equal(double(4), 8);
  assert.equal(double(4), 8);
  assert.equal(calls, 1);
});

test('memoize: argumentos distintos, llamadas distintas', () => {
  let calls = 0;
  const double = memoize((n) => {
    calls += 1;
    return n * 2;
  });

  double(1);
  double(2);
  double(1);
  assert.equal(calls, 2);
});

test('memoize: distingue 1 de "1"', () => {
  const describe = memoize((value) => typeof value);
  assert.equal(describe(1), 'number');
  assert.equal(describe('1'), 'string', 'no colapses las claves a string');
});

test('memoize: cachea resultados falsy', () => {
  for (const falsy of [0, '', null, undefined, false, NaN]) {
    let calls = 0;
    const fn = memoize(() => {
      calls += 1;
      return falsy;
    });

    const first = fn('k');
    const second = fn('k');
    assert.deepEqual([first, second], [falsy, falsy]);
    assert.equal(calls, 1, `el resultado ${String(falsy)} no se cacheo`);
  }
});

test('memoize: claves raras no chocan con el prototipo', () => {
  let calls = 0;
  const fn = memoize((key) => {
    calls += 1;
    return key;
  });

  assert.equal(fn('toString'), 'toString');
  assert.equal(fn('constructor'), 'constructor');
  assert.equal(calls, 2);
});

test('memoize: cada memoize tiene su propia cache', () => {
  let calls = 0;
  const impl = (n) => {
    calls += 1;
    return n;
  };
  const a = memoize(impl);
  const b = memoize(impl);

  a(1);
  b(1);
  assert.equal(calls, 2, 'las caches no se comparten entre instancias');
});

/* ----------------------------- 5. getGreeter ---------------------------- */

const makeUser = (name) => ({
  name,
  greet() {
    return `Hello, ${this.name}`;
  },
});

test('getGreeter: la funcion devuelta saluda al usuario', () => {
  const greeter = getGreeter(makeUser('Ada'));
  assert.equal(typeof greeter, 'function');
  assert.equal(greeter(), 'Hello, Ada');
});

test('getGreeter: funciona sacada de contexto', () => {
  const greeter = getGreeter(makeUser('Grace'));
  const wrapper = { run: greeter };
  assert.equal(wrapper.run(), 'Hello, Grace', 'el this no debe depender del llamador');

  const [extracted] = [greeter];
  assert.equal(extracted(), 'Hello, Grace');
});

test('getGreeter: dos usuarios no se mezclan', () => {
  const a = getGreeter(makeUser('Ada'));
  const b = getGreeter(makeUser('Linus'));
  assert.equal(a(), 'Hello, Ada');
  assert.equal(b(), 'Hello, Linus');
});

test('getGreeter: no modifica el objeto user', () => {
  const user = makeUser('Ada');
  const originalGreet = user.greet;
  const keysBefore = Object.keys(user);

  getGreeter(user)();

  assert.equal(user.greet, originalGreet, 'no reasignes user.greet');
  assert.deepEqual(Object.keys(user), keysBefore, 'no agregues propiedades a user');
  assert.equal(user.greet(), 'Hello, Ada', 'el metodo original debe seguir sirviendo');
});

/* -------------------------- 6. createIdGenerator ------------------------ */

test('createIdGenerator: genera ids incrementales', () => {
  const nextId = createIdGenerator('u');
  assert.equal(typeof nextId, 'function');
  assert.equal(nextId(), 'u-1');
  assert.equal(nextId(), 'u-2');
  assert.equal(nextId(), 'u-3');
});

test('createIdGenerator: respeta el prefijo', () => {
  const nextOrder = createIdGenerator('order');
  assert.equal(nextOrder(), 'order-1');
});

test('createIdGenerator: reset vuelve a empezar', () => {
  const nextId = createIdGenerator('u');
  nextId();
  nextId();
  assert.equal(typeof nextId.reset, 'function');
  nextId.reset();
  assert.equal(nextId(), 'u-1');
  assert.equal(nextId(), 'u-2');
});

test('createIdGenerator: reset en un generador nuevo no rompe nada', () => {
  const nextId = createIdGenerator('u');
  nextId.reset();
  assert.equal(nextId(), 'u-1');
});

test('createIdGenerator: dos generadores son independientes', () => {
  const users = createIdGenerator('u');
  const posts = createIdGenerator('p');

  assert.equal(users(), 'u-1');
  assert.equal(posts(), 'p-1');
  assert.equal(users(), 'u-2');

  users.reset();
  assert.equal(posts(), 'p-2', 'el reset de users no debe tocar a posts');
  assert.equal(users(), 'u-1');
});

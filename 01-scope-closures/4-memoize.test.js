import test from 'node:test';
import assert from 'node:assert/strict';

import { memoize } from './4-memoize.js';

test('4 · devuelve una funcion', () => {
  assert.equal(typeof memoize((n) => n), 'function');
});

test('4 · el resultado es el mismo que daria fn', () => {
  const double = memoize((n) => n * 2);
  assert.equal(double(4), 8);
  assert.equal(double(5), 10);
});

test('4 · el mismo argumento no recalcula', () => {
  let calls = 0;
  const double = memoize((n) => {
    calls += 1;
    return n * 2;
  });

  assert.equal(double(4), 8);
  assert.equal(double(4), 8);
  assert.equal(calls, 1);
});

test('4 · argumentos distintos, llamadas distintas', () => {
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

test('4 · distingue el numero 1 del string "1"', () => {
  const kind = memoize((value) => typeof value);
  assert.equal(kind(1), 'number');
  assert.equal(kind('1'), 'string', 'no colapses las claves a string');
});

for (const falsy of [0, '', null, undefined, false, NaN]) {
  const label = Number.isNaN(falsy) ? 'NaN' : JSON.stringify(falsy) ?? 'undefined';

  test(`4 · cachea el resultado ${label}`, () => {
    let calls = 0;
    const fn = memoize(() => {
      calls += 1;
      return falsy;
    });

    const first = fn('k');
    const second = fn('k');
    assert.deepEqual([first, second], [falsy, falsy]);
    assert.equal(calls, 1, `el resultado ${label} no se cacheo`);
  });
}

test('4 · claves como "toString" o "constructor" no chocan', () => {
  let calls = 0;
  const fn = memoize((key) => {
    calls += 1;
    return key;
  });

  assert.equal(fn('toString'), 'toString');
  assert.equal(fn('constructor'), 'constructor');
  assert.equal(calls, 2);
});

test('4 · la misma referencia de objeto si pega en la cache', () => {
  let calls = 0;
  const fn = memoize((obj) => {
    calls += 1;
    return obj.id;
  });
  const key = { id: 7 };

  assert.equal(fn(key), 7);
  assert.equal(fn(key), 7);
  assert.equal(calls, 1);
});

test('4 · dos objetos equivalentes son claves distintas', () => {
  let calls = 0;
  const fn = memoize((obj) => {
    calls += 1;
    return obj.id;
  });

  fn({ id: 7 });
  fn({ id: 7 });
  assert.equal(calls, 2, 'se compara por referencia, no por contenido');
});

test('4 · cada memoize tiene su propia cache', () => {
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

import test from 'node:test';
import assert from 'node:assert/strict';

import { once } from './3-once.js';

test('3 · devuelve una funcion', () => {
  assert.equal(typeof once(() => {}), 'function');
});

test('3 · la primera llamada devuelve lo que devuelve fn', () => {
  const init = once(() => 'ready');
  assert.equal(init(), 'ready');
});

test('3 · las llamadas siguientes devuelven el mismo resultado', () => {
  const init = once(() => 'ready');
  assert.deepEqual([init(), init(), init()], ['ready', 'ready', 'ready']);
});

test('3 · fn se ejecuta una sola vez', () => {
  let calls = 0;
  const init = once(() => {
    calls += 1;
    return 'ready';
  });

  init();
  init();
  init();
  assert.equal(calls, 1);
});

test('3 · reenvia los argumentos de la primera llamada', () => {
  const received = [];
  const fn = once((...args) => {
    received.push(args);
    return args.join('-');
  });

  assert.equal(fn('a', 'b'), 'a-b');
  assert.deepEqual(received, [['a', 'b']]);
});

test('3 · los argumentos de llamadas posteriores se ignoran', () => {
  const fn = once((x) => x * 2);
  assert.equal(fn(3), 6);
  assert.equal(fn(100), 6, 'debe devolver el primer resultado, no recalcular');
});

test('3 · cachea un resultado undefined', () => {
  const fn = once(() => undefined);
  assert.equal(fn(), undefined);
  assert.equal(fn(), undefined);
});

test('3 · un fn que devuelve undefined tampoco se repite', () => {
  let calls = 0;
  const fn = once(() => {
    calls += 1;
  });

  fn();
  fn();
  assert.equal(calls, 1, 'undefined tambien cuenta como "ya se ejecuto"');
});

test('3 · dos once() son independientes', () => {
  let calls = 0;
  const make = () => once(() => ++calls);
  const a = make();
  const b = make();

  assert.equal(a(), 1);
  assert.equal(b(), 2);
  assert.equal(a(), 1, 'a conserva su propio resultado');
});

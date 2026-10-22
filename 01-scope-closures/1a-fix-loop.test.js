import test from 'node:test';
import assert from 'node:assert/strict';

import { fixLoop } from './1a-fix-loop.js';

test('1a · devuelve un array de 3 elementos', () => {
  assert.equal(fixLoop().length, 3);
});

test('1a · los 3 elementos son funciones', () => {
  for (const fn of fixLoop()) assert.equal(typeof fn, 'function');
});

test('1a · cada funcion devuelve su propio indice: [0, 1, 2]', () => {
  assert.deepEqual(
    fixLoop().map((fn) => fn()),
    [0, 1, 2],
  );
});

test('1a · el orden de llamada no cambia el resultado', () => {
  const fns = fixLoop();
  assert.equal(fns[2](), 2);
  assert.equal(fns[0](), 0);
  assert.equal(fns[1](), 1);
});

test('1a · llamar dos veces la misma funcion da lo mismo', () => {
  const fns = fixLoop();
  assert.equal(fns[1](), 1);
  assert.equal(fns[1](), 1);
});

test('1a · cada fixLoop() crea funciones nuevas', () => {
  const a = fixLoop();
  const b = fixLoop();
  assert.notEqual(a[0], b[0], 'no deberian ser la misma referencia');
});

test('1a · dos arrays no comparten estado', () => {
  const a = fixLoop();
  const b = fixLoop();
  assert.deepEqual([a[0](), b[0]()], [0, 0]);
  assert.deepEqual([a[2](), b[2]()], [2, 2]);
});

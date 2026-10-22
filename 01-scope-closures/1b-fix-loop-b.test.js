import test from 'node:test';
import assert from 'node:assert/strict';

import { fixLoopB } from './1b-fix-loop-b.js';

test('1b · devuelve un array de 3 elementos', () => {
  assert.equal(fixLoopB().length, 3);
});

test('1b · los 3 elementos son funciones', () => {
  for (const fn of fixLoopB()) assert.equal(typeof fn, 'function');
});

test('1b · cada funcion devuelve su propio indice: [0, 1, 2]', () => {
  assert.deepEqual(
    fixLoopB().map((fn) => fn()),
    [0, 1, 2],
  );
});

test('1b · el orden de llamada no cambia el resultado', () => {
  const fns = fixLoopB();
  assert.equal(fns[2](), 2);
  assert.equal(fns[0](), 0);
  assert.equal(fns[1](), 1);
});

test('1b · llamar dos veces la misma funcion da lo mismo', () => {
  const fns = fixLoopB();
  assert.equal(fns[1](), 1);
  assert.equal(fns[1](), 1);
});

test('1b · dos arrays no comparten estado', () => {
  const a = fixLoopB();
  const b = fixLoopB();
  assert.deepEqual([a[0](), b[0]()], [0, 0]);
});

test('1b · sigue usando var (la restriccion del ejercicio)', () => {
  assert.match(
    fixLoopB.toString(),
    /\bvar\b/,
    'la variante B tiene que resolverlo sin quitar el var',
  );
});

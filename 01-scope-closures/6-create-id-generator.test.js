import test from 'node:test';
import assert from 'node:assert/strict';

import { createIdGenerator } from './6-create-id-generator.js';

test('6 · devuelve una funcion', () => {
  assert.equal(typeof createIdGenerator('u'), 'function');
});

test('6 · el primer id empieza en 1', () => {
  assert.equal(createIdGenerator('u')(), 'u-1');
});

test('6 · los ids avanzan: u-1, u-2, u-3', () => {
  const nextId = createIdGenerator('u');
  assert.deepEqual([nextId(), nextId(), nextId()], ['u-1', 'u-2', 'u-3']);
});

test('6 · respeta el prefijo que le pasan', () => {
  assert.equal(createIdGenerator('order')(), 'order-1');
});

test('6 · la funcion lleva un metodo reset', () => {
  assert.equal(typeof createIdGenerator('u').reset, 'function');
});

test('6 · reset vuelve a empezar en 1', () => {
  const nextId = createIdGenerator('u');
  nextId();
  nextId();
  nextId.reset();
  assert.deepEqual([nextId(), nextId()], ['u-1', 'u-2']);
});

test('6 · reset en un generador recien creado no rompe nada', () => {
  const nextId = createIdGenerator('u');
  nextId.reset();
  assert.equal(nextId(), 'u-1');
});

test('6 · dos generadores llevan su propia cuenta', () => {
  const users = createIdGenerator('u');
  const posts = createIdGenerator('p');

  assert.equal(users(), 'u-1');
  assert.equal(posts(), 'p-1');
  assert.equal(users(), 'u-2');
  assert.equal(posts(), 'p-2');
});

test('6 · el reset de un generador no toca al otro', () => {
  const users = createIdGenerator('u');
  const posts = createIdGenerator('p');

  users();
  posts();
  users.reset();

  assert.equal(posts(), 'p-2', 'posts no deberia enterarse');
  assert.equal(users(), 'u-1');
});

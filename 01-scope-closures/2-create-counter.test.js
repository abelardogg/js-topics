import test from 'node:test';
import assert from 'node:assert/strict';

import { createCounter } from './2-create-counter.js';

test('2 · devuelve un objeto con increment, decrement y value', () => {
  const counter = createCounter();
  assert.equal(typeof counter.increment, 'function');
  assert.equal(typeof counter.decrement, 'function');
  assert.equal(typeof counter.value, 'function');
});

test('2 · sin argumento arranca en 0', () => {
  assert.equal(createCounter().value(), 0);
});

test('2 · respeta el valor inicial', () => {
  assert.equal(createCounter(10).value(), 10);
});

test('2 · acepta un valor inicial negativo', () => {
  assert.equal(createCounter(-3).value(), -3);
});

test('2 · increment devuelve el valor nuevo', () => {
  assert.equal(createCounter(5).increment(), 6);
});

test('2 · dos increments seguidos avanzan: 6 y luego 7', () => {
  const counter = createCounter(5);
  assert.equal(counter.increment(), 6);
  assert.equal(
    counter.increment(),
    7,
    'el contador tiene que recordar, no recalcular desde start',
  );
});

test('2 · decrement devuelve el valor nuevo', () => {
  const counter = createCounter(5);
  counter.increment();
  assert.equal(counter.decrement(), 5);
});

test('2 · value() refleja los cambios acumulados', () => {
  const counter = createCounter();
  counter.increment();
  counter.increment();
  counter.increment();
  counter.decrement();
  assert.equal(counter.value(), 2);
});

test('2 · value() no modifica el estado', () => {
  const counter = createCounter(2);
  counter.value();
  counter.value();
  assert.equal(counter.value(), 2);
});

test('2 · puede bajar de cero', () => {
  const counter = createCounter();
  counter.decrement();
  counter.decrement();
  assert.equal(counter.value(), -2);
});

test('2 · dos instancias son independientes', () => {
  const a = createCounter();
  const b = createCounter();
  a.increment();
  a.increment();
  assert.equal(a.value(), 2);
  assert.equal(b.value(), 0, 'b no deberia enterarse de los cambios de a');
});

test('2 · el estado es privado', () => {
  const counter = createCounter(1);
  assert.deepEqual(
    Object.keys(counter).sort(),
    ['decrement', 'increment', 'value'],
    'no expongas el contador como propiedad del objeto',
  );
});

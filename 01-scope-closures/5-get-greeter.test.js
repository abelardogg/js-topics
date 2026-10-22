import test from 'node:test';
import assert from 'node:assert/strict';

import { getGreeter } from './5-get-greeter.js';

const makeUser = (name) => ({
  name,
  greet() {
    return `Hello, ${this.name}`;
  },
});

test('5 · devuelve una funcion', () => {
  assert.equal(typeof getGreeter(makeUser('Ada')), 'function');
});

test('5 · la funcion devuelta saluda al usuario', () => {
  const greeter = getGreeter(makeUser('Ada'));
  assert.equal(greeter(), 'Hello, Ada');
});

test('5 · funciona llamada desde otro objeto', () => {
  const wrapper = { run: getGreeter(makeUser('Grace')) };
  assert.equal(wrapper.run(), 'Hello, Grace', 'el this no debe depender del llamador');
});

test('5 · funciona sacada de un array', () => {
  const [extracted] = [getGreeter(makeUser('Grace'))];
  assert.equal(extracted(), 'Hello, Grace');
});

test('5 · dos usuarios no se mezclan', () => {
  const a = getGreeter(makeUser('Ada'));
  const b = getGreeter(makeUser('Linus'));
  assert.equal(a(), 'Hello, Ada');
  assert.equal(b(), 'Hello, Linus');
});

test('5 · no reasigna user.greet', () => {
  const user = makeUser('Ada');
  const originalGreet = user.greet;

  getGreeter(user)();

  assert.equal(user.greet, originalGreet, 'deja el metodo original en paz');
});

test('5 · no le agrega propiedades a user', () => {
  const user = makeUser('Ada');
  const keysBefore = Object.keys(user);

  getGreeter(user)();

  assert.deepEqual(Object.keys(user), keysBefore);
});

test('5 · user.greet() sigue sirviendo por su cuenta', () => {
  const user = makeUser('Ada');
  getGreeter(user)();
  assert.equal(user.greet(), 'Hello, Ada');
});

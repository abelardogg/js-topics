/**
 * Playground: imprime lo que devuelve tu codigo, sin aserciones.
 * Corre: npm run play:01
 *
 * Este archivo es tuyo: cambialo, comenta lo que no te interese,
 * agrega los casos que quieras probar. No lo revisan los tests.
 *
 * Para pass/fail por caso usa los tests: npm run test:01:2 (o :1a, :3, ...).
 */

import { fixLoop } from './1a-fix-loop.js';
import { fixLoopB } from './1b-fix-loop-b.js';
import { createCounter } from './2-create-counter.js';
import { once } from './3-once.js';
import { memoize } from './4-memoize.js';
import { getGreeter } from './5-get-greeter.js';
import { createIdGenerator } from './6-create-id-generator.js';

/** Corre algo y, si truena, imprime el error en vez de matar el proceso. */
function show(label, fn) {
  try {
    console.log(label, '->', fn());
  } catch (error) {
    console.log(label, '-> 💥', error.message);
  }
}

console.log('--- 1a. fixLoop ---');
show('fixLoop()        ', () => fixLoop().map((f) => f()));

console.log('\n--- 1b. fixLoopB ---');
show('fixLoopB()       ', () => fixLoopB().map((f) => f()));

console.log('\n--- 2. createCounter ---');
show('value() inicial  ', () => createCounter().value());
show('start = 5        ', () => createCounter(5).value());
show('++ ++ --         ', () => {
  const c = createCounter();
  return [c.increment(), c.increment(), c.decrement(), c.value()];
});
show('independientes   ', () => {
  const a = createCounter();
  const b = createCounter();
  a.increment();
  return [a.value(), b.value()];
});

console.log('\n--- 3. once ---');
show('3 llamadas       ', () => {
  let calls = 0;
  const init = once(() => {
    calls += 1;
    return 'ready';
  });
  return [init(), init(), init(), `calls=${calls}`];
});
show('fn -> undefined  ', () => {
  let calls = 0;
  const fn = once(() => {});
  fn();
  fn();
  return `calls=${calls}`;
});

console.log('\n--- 4. memoize ---');
show('mismo arg x2     ', () => {
  let calls = 0;
  const double = memoize((n) => {
    calls += 1;
    return n * 2;
  });
  return [double(4), double(4), `calls=${calls}`];
});
show('1 vs "1"         ', () => {
  const describe = memoize((v) => typeof v);
  return [describe(1), describe('1')];
});
show('resultado 0      ', () => {
  let calls = 0;
  const fn = memoize(() => {
    calls += 1;
    return 0;
  });
  fn('k');
  fn('k');
  return `calls=${calls} (deberia ser 1)`;
});

console.log('\n--- 5. getGreeter ---');
const user = {
  name: 'Ada',
  greet() {
    return `Hello, ${this.name}`;
  },
};
show('greeter()        ', () => getGreeter(user)());
show('sacado del objeto', () => {
  const wrapper = { run: getGreeter(user) };
  return wrapper.run();
});

console.log('\n--- 6. createIdGenerator ---');
show('3 ids            ', () => {
  const nextId = createIdGenerator('u');
  return [nextId(), nextId(), nextId()];
});
show('reset            ', () => {
  const nextId = createIdGenerator('u');
  nextId();
  nextId();
  nextId.reset();
  return nextId();
});

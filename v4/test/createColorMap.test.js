const assert = require('assert');
const createColorMap = require('../createColorMap');
const { VOID } = require('../constants');

assert.notEqual(VOID, undefined);

const map1 = createColorMap(`
  AB
  BA
`);

assert.deepEqual(map1, {
  A: [
    { VOID: true, B: true },
    { B: true, VOID: true },
    { B: true, VOID: true },
    { VOID: true, B: true },
  ],
  B: [
    { VOID: true, A: true },
    { VOID: true, A: true },
    { A: true, VOID: true },
    { A: true, VOID: true },
  ]
});

const map2 = createColorMap(`
  ABA
  BFB
  BBB
`);

assert.deepEqual(map2, {
  A: [
    { VOID: true },
    { B: true, VOID: true },
    { B: true },
    { VOID: true, B: true }
  ],
  B: [
    { VOID: true, A: true, B: true, F: true },
    { A: true, F: true, VOID: true, B: true },
    { F: true, B: true, VOID: true },
    { A: true, VOID: true, F: true, B: true } ],
  F: [
    { B: true },
    { B: true },
    { B: true },
    { B: true }
  ]
});


const map3 = createColorMap([
  `
  AB
  BA
  `,
  `
  FA
  AF
  `
]);

assert.deepEqual(map3, {
  A: [
    { VOID: true, B: true, F: true },
    { B: true, VOID: true, F: true },
    { B: true, VOID: true, F: true },
    { VOID: true, B: true, F: true }
  ],
  B: [
    { VOID: true, A: true },
    { VOID: true, A: true },
    { A: true, VOID: true },
    { A: true, VOID: true }
  ],
  F: [
    { VOID: true, A: true },
    { A: true, VOID: true },
    { A: true, VOID: true },
    { VOID: true, A: true }
  ]
});

console.log('✓ create color map');

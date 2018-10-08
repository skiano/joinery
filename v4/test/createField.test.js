const assert = require('assert');
const createField = require('../createField');

const f = createField({
  width: 3,
  height: 3,
});

// 0 1 2
// 3 4 5
// 6 7 8

assert.deepEqual(f[0].coord(), [0, 0]);
assert.deepEqual(f[1].coord(), [1, 0]);
assert.deepEqual(f[2].coord(), [2, 0]);

assert.deepEqual(f[3].coord(), [0, 1]);
assert.deepEqual(f[4].coord(), [1, 1]);
assert.deepEqual(f[5].coord(), [2, 1]);

assert.deepEqual(f[6].coord(), [0, 2]);
assert.deepEqual(f[7].coord(), [1, 2]);
assert.deepEqual(f[8].coord(), [2, 2]);

// 0 1 2
// 3 4 5
// 6 7 8

assert.equal(f[0].neighbors[0](), undefined);
assert.equal(f[0].neighbors[1]().index(), 1);
assert.equal(f[0].neighbors[2]().index(), 3);
assert.equal(f[0].neighbors[3](), undefined);

assert.equal(f[1].neighbors[0](), undefined);
assert.equal(f[1].neighbors[1]().index(), 2);
assert.equal(f[1].neighbors[2]().index(), 4);
assert.equal(f[1].neighbors[3]().index(), 0);

assert.equal(f[2].neighbors[0](), undefined);
assert.equal(f[2].neighbors[1](), undefined);
assert.equal(f[2].neighbors[2]().index(), 5);
assert.equal(f[2].neighbors[3]().index(), 1);

assert.equal(f[3].neighbors[0]().index(), 0);
assert.equal(f[3].neighbors[1]().index(), 4);
assert.equal(f[3].neighbors[2]().index(), 6);
assert.equal(f[3].neighbors[3](), undefined);

console.log('✓ create field');

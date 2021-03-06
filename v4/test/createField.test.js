const assert = require('assert');
const createField = require('../createField');

const f = createField({
  width: 3,
  height: 3,
});

/////////////////////////
// TESTING COORDINATES //
/////////////////////////

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

///////////////////////
// TESTING NEIGHBORS //
///////////////////////

// 0 1 2
// 3 4 5
// 6 7 8

const collectNeighborIdxs = (node) => {
  return node.neighbors.map(n => n() && n().index());
};

const u = undefined;

assert.deepEqual(collectNeighborIdxs(f[0]), [u, 1, 3, u]);
assert.deepEqual(collectNeighborIdxs(f[1]), [u, 2, 4, 0]);
assert.deepEqual(collectNeighborIdxs(f[2]), [u, u, 5, 1]);

assert.deepEqual(collectNeighborIdxs(f[3]), [0, 4, 6, u]);
assert.deepEqual(collectNeighborIdxs(f[4]), [1, 5, 7, 3]);
assert.deepEqual(collectNeighborIdxs(f[5]), [2, u, 8, 4]);

assert.deepEqual(collectNeighborIdxs(f[6]), [3, 7, u, u]);
assert.deepEqual(collectNeighborIdxs(f[7]), [4, 8, u, 6]);
assert.deepEqual(collectNeighborIdxs(f[8]), [5, u, u, 7]);

///////////////////////
// TESTING NEXT/PREV //
///////////////////////

let max = f.length + 10;
let n = f[0];
let s = '';

while (n && max--) {
  s += n.index();
  n = n.next();
}

assert.equal(s, '012345678');

max = f.length + 10;
n = f[8];
s = '';

while (n && max--) {
  s += n.index();
  n = n.prev();
}

assert.equal(s, '876543210');

//////////////////////////////////
// TESTING CREATE FROM 2D ARRAY //
//////////////////////////////////

const f2 = createField([
  ['A', 'B', 'C'],
  ['D', 'E', 'F'],
  ['G', 'H', 'I'],
]);

assert.equal(f2.toString(), 'ABC\nDEF\nGHI');

console.log('✓ create field');

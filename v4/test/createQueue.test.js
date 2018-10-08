const assert = require('assert');
const createQueue = require('../createQueue');

const q = createQueue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

assert.equal(q.dequeue(), 1);
assert.equal(q.dequeue(), 2);
assert.equal(q.dequeue(), 3);
assert.equal(q.dequeue(), undefined);
assert.equal(q.dequeue(), undefined);

q.enqueue(4);
q.enqueue(5);
q.enqueue(6);

assert.equal(q.peek(), 4);
assert.deepEqual(q.toArray(), [6, 5, 4]);

console.log('✓ create queue');

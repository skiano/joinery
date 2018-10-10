const assert = require('assert');
const createStack = require('../createStack');

const stack = createStack();

stack.push(1);
stack.push(2);
stack.push(3);

assert.equal(stack.length(), 3);
assert.equal(stack.pop(), 3);
assert.equal(stack.pop(), 2);
assert.equal(stack.pop(), 1);
assert.equal(stack.pop(), undefined);
assert.equal(stack.pop(), undefined);
assert.equal(stack.length(), 0);

assert.equal(stack.peek(), undefined);

stack.push(4);
stack.push(5);
stack.push(6);

assert.equal(stack.peek(), 6);
assert.deepEqual(stack.toArray(), [4, 5, 6]);

console.log('✓ create stack');

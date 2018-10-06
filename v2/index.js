const createLinkedList = require('./createLinkedList');

const list = createLinkedList();

for (let i = 0; i < 100; i += 1) {
  list.add(i);
}

list.walk((n) => {
  console.log(n.value)
})

console.log('---')

list.walkBack((n) => {
  console.log(n.value)
}, list.find(80), 10)

// where to next?
// what are my options?
// how do I check an option?

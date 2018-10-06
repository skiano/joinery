const createLinkedList = require('./createLinkedList');

const list = createLinkedList()

for (let i = 0; i < 100; i += 1) {
  list.add(i);
}

console.log(list.toArray());

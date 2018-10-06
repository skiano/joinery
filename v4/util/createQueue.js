const createLinkedList = require('./createLinkedList');

module.exports = function createQueue() {
  const l = createLinkedList();
  return {
    add: l.add,
    length: l.length,
    remove: () => {
      const head = l.head();
      l.remove(head);
      return head && head.value;
    },
    peak: () => {
      const head = l.head();
      return head && head.value;
    },
  }
}

module.exports = function createLinkedList() {
  const next = 'next'
  const prev = 'prev'

  let length = 0
  let head
  let tail

  return {
    head: () => head,
    tail: () => tail,
    length: () => length,
    add: (value) => {
      const node = { value };

      if (tail) {
        tail[next] = node;
        node[prev] = tail;
      }

      if (!head) {
        head = node;
      }

      tail = node;
      length += 1;
    },
    remove: (n) => {
      const node = n || tail;

      if (length && node) {
        const before = node[prev];
        const after = node[next];

        if (before) {
          before[next] = after;
        } else {
          head = after;
        }

        if (after) {
          after[prev] = before;
        } else {
          tail = before;
        }

        length -= 1;
      }
    },
    walk: function(cb, node = head, count = Infinity) {
      while (node && count--) {
        cb(node);
        node = node[next];
      }
    },
    walkBack: function(cb, node = tail, count = Infinity) {
      while (node && count--) {
        cb(node);
        node = node[prev];
      }
    },
    find: function(predicate) {
      let node = head;
      if (typeof predicate === 'function') {
        while (node) {
          if (predicate(node)) return node;
          node = node[next];
        }
      } else {
        while (node && predicate--) {
          node = node[next];
        }
      }
      return node;
    },
    toArray: function() {
      const arr = [];
      let node = head;
      while (node) {
        arr.push(node.value);
        node = node[next];
      }
      return arr;
    }
  }
};

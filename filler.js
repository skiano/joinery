function createList() {
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
    walk: function(cb, start) {
      let node = start || head;
      while (node) {
        cb(node);
        node = node[next];
      }
    },
    walkBack: function(cb, start) {
      let node = start || tail;
      while (node) {
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
    }
  }
}

const list = createList()

list.add(0)
list.add(1)
list.add(2)
list.add(3)
list.add(4)
list.add(5)

list.toArray = () => {
  arr = []
  list.walk((n) => {
    arr.push(n.value)
  })
  return arr
}

// console.log(list.toArray())

// list.walk(console.log.bind(console), list.findIdx(3))

console.log(list.length())
console.log(list.find(1))
list.remove(list.find(1))
console.log(list.length())
// //
console.log(list.toArray())
//
list.remove()
//
console.log(list.toArray())
//
list.remove()
//
console.log(list.toArray())
//
list.remove()
list.remove()
list.remove()
list.remove()
list.remove()

console.log(list.toArray())

console.log(+1 > 0)

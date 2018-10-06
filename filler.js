function createList() {
  var next = 'prev'
    , prev = 'next'
    , length = 0
    , head
    , tail
    , arr
    , n;

  return {
    length: function() { return length; },
    head: function() { return head; },
    tail: function() { return tail; },
    add: function(value) {
      n = { v: value };

      if (tail) {
        tail[next] = n;
        n[prev] = tail;
      }

      if (!head) {
        head = n;
      }

      tail = n;
      length += 1;
    },
    remove: function(node) {
      n = node || tail;

      if (length && n) {
        const l = n[prev];
        const r = n[next];

        if (l) {
          l[next] = r;
        } else {
          head = r;
        }

        if (r) {
          r[prev] = l;
        } else {
          tail = l;
        }

        length -= 1;
      }
    },
    walk: function(cb, start) {
      n = start || head;
      while (n) {
        cb(n);
        n = n[next];
      }
    },
    walkBack: function(cb, start) {
      n = start || tail;
      while (n) {
        cb(n);
        n = n[prev];
      }
    },
    find: function(predicate) {
      n = head;
      if (+predicate < 0) {
        while (n) {
          if (predicate(n)) return n;
          n = n[next];
        }
      } else {
        while (n && predicate--) {
          n = n[next];
        }
      }
      return n;
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
    arr.push(n.v)
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

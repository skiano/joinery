const createList = () => {
  let length = 0
  let head
  let tail

  const seek = (cb, starting, direction) => {
    let n = starting
    while (n) {
      cb(n)
      n = n[direction]
    }
  }

  return {
    length() { return length },
    head() { return head },
    tail() { return head },
    add(value) {
      const node = { v: value }

      if (tail) {
        tail.next = node
        node.prev = tail
      }

      if (!head) {
        head = node
      }

      tail = node
      length += 1
    },
    remove(n) {
      n = n || tail

      if (length && n) {
        const l = n.prev
        const r = n.next

        if (l) {
          l.next = r
        } else {
          head = r
        }

        if (r) {
          r.prev = l
        } else {
          tail = l
        }

        length -= 1
      }
    },
    walk(fn, start) {
      seek(fn, start || head, 'next')
    },
    walkBack(fn, start) {
      seek(fn, start || tail, 'prev')
    },
    find(predicate) {
      let n = head
      while (n) {
        if (predicate(n)) return n
        n = n.next
      }
    },
    findIdx(idx) {
      let n = head
      while (n && idx--) {
        n = n.next
      }
      return n
    },
    toArray() {
      const arr = []
      seek((n) => arr.push(n.v), head, 'next')
      return arr
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

list.walk(console.log.bind(console), list.findIdx(3))

console.log(list.length())
list.remove(list.findIdx(1))
console.log(list.length())
//
// console.log(list.toArray())
//
// list.remove()
//
// console.log(list.toArray())
//
// list.remove()
//
// console.log(list.toArray())
//
// list.remove()
// list.remove()
// list.remove()
// list.remove()
// list.remove()
//
// console.log(list.toArray())

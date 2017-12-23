
// create path / ranks / files

const createNode = (data) => {
  const node = { data }
  return node
}

// ranks / files / knars / elifs 

const createList = () => {
  const list = {
    head: null,
    tail: null,
    length: 0,
  }

  list.push = (v) => {
    const node = createNode(v)
    if (list.head) {
      list.head.next = node
      node.prev = list.head
    }
    if (!list.tail) list.tail = node
    list.head = node
    list.length += 1
  }

  list.pop = () => {
    if (!list.head) return
    if (list.head === list.tail) {
      list.head = null
      list.tail = null
    } else {
      const newHead = list.head.prev
      delete list.head
      delete newHead.next
      list.head = newHead
    }
    list.length -= 1
  }

  return list
}

const fill = (w, h, rule) => {

  list = createList()


  console.log(`fill a ${w}x${h} grid using ${rule.name}`)


  const getNextNode = (idx) => ({ idx: 2, values: ['B', 'C', 'A'] })

  list.push(rule(list.head, list.length))

  const next = () => {
    if (!list.head) { throw new Error('No solution!') }
    const value = list.head.data.values.pop()
    const idx = list.head.data.idx
    if (value) {
      console.log(`add: ${'\t'.repeat(list.length) + value}`)
      list.push(rule(list.head, list.length))
    } else {
      // console.log(`back trace`)
      list.pop()
    }
  }

  for (let c = 0; c < 6600; c++) {
    next()
  }
}

fill(2, 2, function spiralFill(currentNode, length) {
  // console.log('current length', length)

  if (length > 6) {
    return { idx: 2, values: [] }
  }

  return { idx: 2, values: [`B${length}`, `A${length}`] }
})


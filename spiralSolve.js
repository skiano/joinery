const createList = () => {
  const list = {
    head: null,
    tail: null,
    length: 0,
  }

  list.push = (data) => {
    const node = { data }
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

  list.each = (fn) => {
    let i = list.tail
    while (i = i.next) fn(i.data)
  }

  return list
}

const fill = (w, h, rule, onPop = () => {}) => {
  console.log(`fill a ${w}x${h} grid using ${rule.name}`)

  // create the empty fill
  list = createList()

  // seed it with an intial value
  list.push(rule(undefined, list.length))
  list.head.data.value = list.head.data.values.pop()

  // define a way to proceed
  const next = () => {
    // uh oh, we have run out of posibilities
    if (!list.head) { throw new Error('No solution!') }

    // take the current possibility
    list.head.data.value = list.head.data.values.pop()

    // if it exists, search for the next node
    // else, backtrace
    if (list.head.data.value) {
      console.log(`add: ${'--'.repeat(list.length) + list.head.data.idx + ':' + list.head.data.value}`)
      list.push(rule(list.head.data, list.length))
    } else {
      onPop(list.head.data)
      list.pop()
    }
  }

  // search until filled, or until max is exceeded
  let max = 100
  while (max-- && list.length < w * h) next()

  console.log(list.length)
  list.each(i => console.log(i))
}


fill(20, 20, function spiralFill(currentNode, length) {

  const nextIdx = currentNode ? currentNode.idx + 1 : 0

  if (length > 6) return { idx: nextIdx, values: [] }
  return { idx: nextIdx, values: [`B${length}`, `A${length}`] }
}, (popped) => {
  console.log('popping off', popped.idx)
})


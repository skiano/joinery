const createList = () => {
  const list = { head: null, tail: null, length: 0 }

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
    do { fn(i.data) } while (i = i.next)
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

      const items = []
      list.each(v => items.push(v.value))
      // console.log(items.join('.'))

      // console.log(`add: ${'--'.repeat(list.length) + list.head.data.idx + ':' + list.head.data.value}`)
      list.push(rule(list.head.data, list.length))
    } else {
      // console.log(`pop: ${'--'.repeat(list.length) + list.head.data.idx}`)
      onPop(list.head.data)
      list.pop()
    }
  }

  // search until filled, or until max is exceeded
  let max = 1000
  while (max-- && list.length < w * h) next()

  console.log(list.length)
  list.each(i => console.log(i))
}


const spiralFill = (w, h) => {

  // a map where keys are visited indexes
  const visited = {}
  const translations = [1, w, -1, -w]

  const nextNode = (currentNode, length) => {

    // return the initial node
    if (!currentNode) {
      // mark the visited
      visited[nextIdx] = currentNode.value
      return { idx: 0, direction: 0, values: ['a', 'b', 'c'] }
    }

    // what are the current x and y
    const x = currentNode.idx % w
    const y = (currentNode.idx / w) >> 0

    // what is next if there is no turning
    let nextIdx = currentNode.idx + translations[currentNode.direction]
    let nextDir = currentNode.direction

    // should this turn?
    if (
      visited[nextIdx] ||
      (nextDir === 2 && x === 0) ||
      (nextDir === 3 && y === 0) ||
      (nextDir === 0 && x === w - 1) ||
      (nextDir === 1 && y === h - 1)
    ) {
      // handle the turn
      nextDir = nextDir < 3 ? nextDir + 1 : 0
      nextIdx = currentNode.idx + translations[nextDir]
    }

    // mark the visited
    visited[nextIdx] = true

    // compute the next possible values
    const nextValues = ['a', 'b', 'c']

    // return the next node
    return {
      idx: nextIdx,
      direction: nextDir,
      values: ['a', 'b', 'c'],
    }
  }

  const onBacktrace = (popped) => {
    // when backtracing
    // the currently visited link must
    // be deleted so that it can be refilled
    delete visited[popped.idx]
  }

  fill(w, h, nextNode, onBacktrace)

}

spiralFill(4, 4)


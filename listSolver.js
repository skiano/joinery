/**
 * janky specific linked-list-ish thing
 */
const createList = () => {
  /**
   * An empty list object
   */
  const list = {
    head: null,
    tail: null,
    length: 0,
  }

  /** 
   * Add a link to the list
   */
  list.push = (data) => {
    const node = { data }

    if (list.tail) {
      list.tail.next = node
      node.prev = list.tail
    }

    if (!list.head) {
      list.head = node
    }

    list.tail = node
    list.length += 1
  }

  /** 
   * Remove a link from the list
   */
  list.pop = () => {
    if (!list.tail) return
    if (list.tail === list.head) {
      list.tail = null
      list.head = null
    } else {
      const newTail = list.tail.prev
      delete list.tail
      delete newTail.next
      list.tail = newTail
    }
    list.length -= 1
  }

  /** 
   * Perform a function for each link
   */
  list.each = (fn) => {
    if (!list.head) return
    let i = list.head
    do { fn(i.data) } while (i = i.next) 
  }

  /**
   * Return the list
   */
  return list
}

/**
 * Fill a rectangular array with values
 * that satisfy a certain rule
 */
const fill = ([w, h], filler, onPop = () => {}) => {
  console.log(`fill a ${w}x${h} grid`)

  /**
   * create the empty fill
   */
  const list = createList()

  /**
   * create an initial node with possible candidates
   */
  list.push(filler(undefined, list.length))

  /**
   * set the first candidate to the node value
   */
  list.tail.data.value = list.tail.data.candidates.pop()

  const next = () => {
    /**
     * if the tail is missing, all candidates have been removed
     */
    if (!list.tail) { throw new Error('impossible to fill') }

    /**
     * set the next candiate to the node value
     */
    list.tail.data.value = list.tail.data.candidates.pop()

    /**
     * if the next candidate exists, check add a possible link
     * otherwise, backtrace
     */
    if (list.tail.data.value) {
      list.push(filler(list.tail.data, list.length))
    } else {
      onPop(list.tail.data)
      list.pop()
    }
  }

  /**
   * Keep filling until all slots are solved
   * or safety is exceeded
   */
  let max = 1000
  while (max-- && list.length <= w * h) next()

  console.log(list.length)
  list.each(i => console.log(i))
}

fill([4, 4], () => {
  return { candidates: ['a', 'b', 'c'] }
}, (node) => {
  console.log('popped off', node)
})


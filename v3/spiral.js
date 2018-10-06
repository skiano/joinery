// walk around the edges of a grid
// and work toward the center
// Begin going right.
// When you are at an edge or a filled square, turn right.
const spiral = (w, h, fn) => {
  // a map where keys are visited indexes
  const visited = {}

  // translations represent increments for: right -> down -> left -> up
  const translations = [1, w, -1, -w]
  let direction = 0
  let idx = 0

  let step = w * h
  let nextIdx
  let x
  let y

  const next = () => {
    nextIdx = idx + translations[direction]
    x = idx % w
    y = (idx / w) >> 0

    if (fn) fn(x, y, idx)

    if (
      visited[nextIdx] ||
      (direction === 2 && x === 0) ||
      (direction === 3 && y === 0) ||
      (direction === 0 && x === w - 1) ||
      (direction === 1 && y === h - 1)
    ) {
      direction = direction < 3 ? direction + 1 : 0
      nextIdx = idx + translations[direction]
    }

    visited[idx] = true
    idx = nextIdx
  }

  while (step--) { next() }
}

const w = 10
const h = 10
const order = new Array(w * h)
let i = 0

spiral(w, h, (x, y) => { order[i++] = [x, y] })

console.log(order.length)
console.log(order)

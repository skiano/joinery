
// >>> is perf hack for flooring positive numbers
const rand = (min, max) => ((Math.random() * (max - min + 1)) >>> 0) + min
const randItem = (arr) => arr[rand(0, arr.length - 1)]

const isDef = v => typeof v !== 'undefined'
const isUndef = v => typeof v === 'undefined'

const directions = [
  (w, h, x, y, i) => y > 0 ? i - w : undefined,
  (w, h, x, y, i) => y < h - 1 ? i + w : undefined,
  (w, h, x, y, i) => x < w - 1 ? i + 1 : undefined,
  (w, h, x, y, i) => x > 0 ? i - 1 : undefined,
]

// https://bost.ocks.org/mike/shuffle/
const fastShuffle = (array) => {
  let m = array.length
  let t
  let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

const fastFindIdx = (arr, v) => {
  let i
  for (i = arr.length - 1; i >= 0; --i) {
    if (arr[i] === v) break;
  }
  return i
}

function fillOrder(w, h) {
  const area = w * h
  const order = new Array(area)
  const filled = {}
  const frontier = []

  const isAvailable = (i) => isDef(i) && !filled[i]

  const addToFrontier = (i) => {
    if (filled[i]) return
    filled[i] = true
    frontier.push(i)
  }

  const removeFromFrontier = (i) => {
    frontier.splice(fastFindIdx(frontier, i), 1)
  }

  // start filling anywhere
  const seed = rand(0, area)
  addToFrontier(seed)
  order[0] = seed

  let i
  let x
  let y
  let n
  let o = 1
  while (o < area) {
    // pick a random frontier item
    i = randItem(frontier)

    // convert it to coordinates
    x = i % w
    y = (i / w) >> 0

    // randomize neighbor search
    const randNeighbors = directions // fastShuffle(directions)

    // searh for an available neighbor
    let choice
    for (let d = 0; d < 4; d++) {
      n = randNeighbors[d](w, h, x, y, i)
      if (isAvailable(n)) {
        choice = n
        break
      }
    }

    // if it has no available neighbor remove it
    if (isUndef(choice)) {
      removeFromFrontier(i)
      continue
    }

    // if it found a neighbor, fill it
    addToFrontier(choice)
    order[o++] = choice
  }

  return order
}

const w = 150
const h = 150
const o = fillOrder(w, h)

console.log(o.length)

// let filled = []
// for (let f = 0; f < o.length; f++) {
//   filled.push(o[f])

//   let str = ''
//   let i = 0
//   for (let y = 0; y < h; y++) {
//     for (let y = 0; y < h; y++) {
//       str += filled.includes(i) ? 'X' : '.'
//       i++      
//     }
//   }

//   console.log('-----------------')
//   console.log(`frame ${f}`)
//   const splitter = new RegExp(`.{1,${w}}`, 'g')
//   const grid = str.match(splitter)
//   console.log(grid.join('\n'))
// }



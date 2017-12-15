const TOP = 'TOP'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randItem = (arr) => arr[rand(0, arr.length - 1)]

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

const template2D = tem => tem.trim().split('\n').map(r => r.trim().split(''))
const template2string = t2d => t2d.map(r => r.join('')).join('\n')
const logTemplate = (t2d) => { console.log(`${template2string(t2d)}\n`) }

const createTemplate = (tem) => {
  const t2d = template2D(tem)
  const map = {}
  let row
  let unit

  const addToUnit = (unit, dir, neighbor) => {
    if (!map[unit]) map[unit] = { [TOP]: [], [RIGHT]: [], [BOTTOM]: [], [LEFT]: [] }
    if (neighbor && !map[unit][dir].includes(neighbor)) {
      map[unit][dir].push(neighbor)
    }
  }

  for (let y = 0; y < t2d.length; y += 1) {
    row = t2d[y]
    for (let x = 0; x < row.length; x += 1) {
      unit = t2d[y][x]
      addToUnit(unit, TOP, t2d[y - 1] && t2d[y - 1][x])
      addToUnit(unit, LEFT, t2d[y][x - 1])
      addToUnit(unit, RIGHT, t2d[y][x + 1])
      addToUnit(unit, BOTTOM, t2d[y + 1] && t2d[y + 1][x])
    } 
  }

  return {
    map,
    keys: Object.keys(map),
  }
}

const createGridHelpers = (w, h) => {
  const NONEXISTENT = - 1 // because this opperates on strings/arrays
  const point2Index = ([x, y]) => (y * w) + x
  const index2Point = (i) => ([(i % w), (i / w) >> 0])
  const translatePoint = ([x, y], [deltaX, deltaY]) => [x + deltaX, y + deltaY]
  const translateIndex = (i, translation) => {
    const nextPoint = translatePoint(index2Point(i), translation)
    return (
      nextPoint[0] > w - 1 || 
      nextPoint[0] < 0 ||
      nextPoint[1] > h - 1 ||
      nextPoint[1] < 0
    ) ? NONEXISTENT : point2Index(translatePoint(index2Point(i), translation))
  }

  return {
    point2Index,
    index2Point,
    translatePoint,
    translateIndex,
  }
}

// create a walk order where each step
// always touches a previous step
const fillOrder = (w, h) => {
  const area = w * h
  const neighborTranslations = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  const { translateIndex, point2Index } = createGridHelpers(w, h)
  
  // store the final order
  const order = new Array(w * h)

  // can this index be written to?
  // must be in the grid, but still be undefined
  const isAvailable = (i) => i >= 0 && typeof order[i] === 'undefined'

  // what neighbors are available
  const getNeighbors = (i) => {
    const potential = []
    for (let n = 0; n < neighborTranslations.length; n++) {
      const x = translateIndex(i, neighborTranslations[n])
      if (isAvailable(x)) potential.push(x)
    }
    return potential
  }

  let frontier = [rand(0, area - 1)]
  let i             // which grid index are we filling 
  let o = 0         // what is the current order index

  const fill = () => {
    // select the next index to fill
    i = fastShuffle(getNeighbors(randItem(frontier)))[0]

    // use up this index
    order[o] = i

    // mark this index as belonging to the frontier
    frontier.push(i)

    // remove any frontier elements
    // who have no more inbounds & fillable neighbors
    frontier = frontier.filter((f) => getNeighbors(f).some(isAvailable))

    // move to next in order
    o += 1
  }

  // fill the grid in sequence
  while(o < area) { fill() }

  console.log(order)

  return order
}


function draw(template, w, h) {
  const area = w * h
  const { map, keys } = template
  const { translateIndex, point2Index, index2Point } = createGridHelpers(w, h)

  // a map of which key comes next
  const afterKey = keys.reduce((m, k, i) => {
    return Object.assign(m, { [k]: keys[i + 1] })
  }, {})

  const order = fillOrder(w, h)
  const final = new Array(area)

  let o = 0
  let key = keys[0]
  let isFilled = false

  const select = () => {
    if (!key) {              // if there is no key anymore, time to back trace
      o -= 1                 // decrement the order index
      key = final[order[o]]  // reset the key to be where it was
      key = afterKey[key]    // advance the key for next tree branch
      final[order[o]] = key  // set the root to the next key
      return;
    }

    // console.log(`
    //   filling [${index2Point(order[o])}] (${key})
    // `)

    const idx = order[o]
    const left = final[translateIndex(idx, [-1, 0])]
    const right = final[translateIndex(idx, [1, 0])]
    const above = final[translateIndex(idx, [0, -1])]
    const below = final[translateIndex(idx, [0, 1])]
    const isValid = (
      (!left || map[left].RIGHT.includes(key)) &&
      (!above || map[above].BOTTOM.includes(key)) &&
      (!right || map[right].LEFT.includes(key)) &&
      (!below || map[below].TOP.includes(key))
    )

    if (isValid) {          // if this key is allowed in this position
      final[idx] = key      // assign the key to this position
      o += 1                // advance the order index
      key = keys[0]         // reset the key index
      isFilled = o === area // mark as filled if order index just equaled area
    } else {
      key = afterKey[key]   // otherwise, advance the key
    }
  }

  let safety = 0

  while(!isFilled && o >= 0 && safety++ < 500000) {
    select()
  }

  let str = '\n'
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      str += final[point2Index([x, y])] || ' '
    }
    str += '\n'
  }
  console.log(str)
}

module.exports = {
  createGridHelpers,
  createTemplate,
  logTemplate,
  draw,
}


// -------
// example



const template = createTemplate(`
  .>-║╱╲╱╲╱║.>-.>-
  >-.║╱╲╱╲╱║>-.>-.
  -.>║═════║-.>-.>
  .>-║═════║.>-.>-
  >-.║╱╲╱╲╱║>-.>-.
`)

// const t = draw(template, 10, 10)

fillOrder(100,100)


// logTemplate(t)


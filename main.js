const TOP = 'TOP'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'

// https://bost.ocks.org/mike/shuffle/
function fastShuffle(array) {
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
const template2string = t2d => t2d.map(r => r.join('')).join('\n').replace(/\./g, ' ')
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

const stringGrid = (w) => {
  const point2Index = ([x, y]) => (y * w) + x
  const index2Point = (i) => ([(i % w), (i / w) >> 0])
  const translatePoint = ([x, y], [deltaX, deltaY]) => [x + deltaX, y + deltaY]
  const translateIndex = (i, translation) => {
    const nextPoint = translatePoint(index2Point(i), translation)
    if (nextPoint[0] > w - 1 || nextPoint[0] < 0) return
    const nextIndex = point2Index(translatePoint(index2Point(i), translation))
    if (nextIndex < 0) return
    return nextIndex
  }

  return {
    point2Index,
    index2Point,
    translatePoint,
    translateIndex,
  }
}

function draw(template, w, h) {
  const area = w * h
  const { map, keys } = template

  const I2X = i => i % w
  const I2Y = i => (i / w) >> 0
  const XY2I = (x, y) => (y * w) + x

  function getValidNextKeys(str) {
    // the next index is simply the length
    // (current would be minus one)
    const i = str.length
    const x = i % w
    const y = (i / w) >> 0
    const leftX = x > 0 ? x - 1 : w - 1
    const aboveY = y > 0 ? y - 1 : h - 1
    const above = str.charAt(XY2I(x, aboveY))
    const left = str.charAt(XY2I(leftX, y))
    const valid = []

    for (let k = 0; k < keys.length; k++) {
      const key = keys[k]
      if (
        (!above || map[above][BOTTOM].includes(key)) &&
        (!left || map[left][RIGHT].includes(key))
      ) {
        valid.push(key)
      }
    }

    return fastShuffle(valid)
  }

  function solve(str = '') {
    if (str.length === area) {
      return str
    } else {
      const next = getValidNextKeys(str)

      if (keys.length < 1) return false

      for (let i = 0; i < next.length; i++) {
        const potential = solve(str + next[i])
        if (potential) return potential
      }
    }
  }

  const solution = solve()

  if (!solution) {
    throw new Error('no solution')
  }

  const splitter = new RegExp(`.{1,${w}}`, 'g')
  const grid = solution.match(splitter)
  return grid.map(r => r.split(''))
}

module.exports = {
  stringGrid,
  createTemplate,
  logTemplate,
  draw,
}


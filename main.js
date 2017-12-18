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
const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)

const createTemplate = (tem) => {
  const t2d = template2D(tem)
  const map = {}
  const edges = { [TOP]: [], [RIGHT]: [], [BOTTOM]: [], [LEFT]: [] }
  let row
  let unit

  const addToUnit = (unit, dir, neighbor) => {
    if (!map[unit]) map[unit] = { [TOP]: [], [RIGHT]: [], [BOTTOM]: [], [LEFT]: [] }
    if (neighbor && !map[unit][dir].includes(neighbor)) {
      map[unit][dir].push(neighbor)
    }
  }

  const h = t2d.length
  const w = t2d[0].length

  for (let y = 0; y < h; y += 1) {
    row = t2d[y]
    for (let x = 0; x < w; x += 1) {
      unit = t2d[y][x]
      addToUnit(unit, TOP, t2d[y - 1] && t2d[y - 1][x])
      addToUnit(unit, LEFT, t2d[y][x - 1])
      addToUnit(unit, RIGHT, t2d[y][x + 1])
      addToUnit(unit, BOTTOM, t2d[y + 1] && t2d[y + 1][x])
      if (x === 0 && !edges[LEFT].includes(unit)) edges[LEFT].push(unit)
      if (x === w - 1 && !edges[RIGHT].includes(unit)) edges[RIGHT].push(unit)
      if (y === 0 && !edges[TOP].includes(unit)) edges[TOP].push(unit)
      if (y === h - 1 && !edges[BOTTOM].includes(unit)) edges[BOTTOM].push(unit)
    } 
  }

  return {
    map,
    edges,
    keys: Object.keys(map),
  }
}

const combineTemplate = (a, b) => {
  const newMap = {}
  const newEdges = {}

  const mixinMap = (map) => {
    for (let k in map) {
      if (!newMap[k]) newMap[k] = {}
      for (let d in map[k]) {
        if (!newMap[k][d]) newMap[k][d] = []
        map[k][d].forEach(v => {
          if (!newMap[k][d].includes(v)) newMap[k][d].push(v)
        })
      }
    }
  }

  const mixinEdges = (edges) => {
    for (let e in edges) {
      if (!newEdges[e]) newEdges[e] = []
      edges[e].forEach(v => {
        if (!newEdges[e].includes(v)) newEdges[e].push(v)
      })
    }
  }

  mixinMap(a.map)
  mixinMap(b.map)
  mixinEdges(a.edges)
  mixinEdges(b.edges)

  return {
    edges: newEdges,
    keys: unique([].concat(a.keys, b.keys)),
    map: newMap,
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
  const { map, keys, edges } = template

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
        (!left || map[left][RIGHT].includes(key)) &&
        (x !== 0 || edges[LEFT].includes(key)) &&
        (y !== 0|| edges[TOP].includes(key)) &&
        (x !== w - 1|| edges[RIGHT].includes(key)) &&
        (y !== h - 1|| edges[BOTTOM].includes(key))
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
  combineTemplate,
  logTemplate,
  draw,
}


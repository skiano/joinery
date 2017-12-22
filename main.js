const deepmerge = require('deepmerge')

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
const template2string = t2d => t2d.map(r => r.join('')).join('\n') // .replace(/\./g, '~')
const logTemplate = (t2d) => { console.log(`${template2string(t2d)}\n`) }
const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)

const createTemplate = (tem) => {
  const t2d = template2D(tem)
  const map = {}
  const edges = { [TOP]: {}, [RIGHT]: {}, [BOTTOM]: {}, [LEFT]: {} }
  let row
  let unit

  const addToUnit = (unit, dir, neighbor) => {
    if (!map[unit]) map[unit] = { [TOP]: {}, [RIGHT]: {}, [BOTTOM]: {}, [LEFT]: {} }
    if (neighbor && !map[unit][dir][neighbor]) {
      map[unit][dir][neighbor] = true // TODO: count here
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
      if (x === 0 && !edges[LEFT][unit]) edges[LEFT][unit] = true
      if (x === w - 1 && !edges[RIGHT][unit]) edges[RIGHT][unit] = true
      if (y === 0 && !edges[TOP][unit]) edges[TOP][unit] = true
      if (y === h - 1 && !edges[BOTTOM][unit]) edges[BOTTOM][unit] = true
    } 
  }

  return {
    map,
    edges,
    keys: Object.keys(map),
  }
}

const combineTemplates = (a, b) => Array.isArray(a) ? deepmerge.all(a) : deepmerge(a, b)

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
        (!above || map[above][BOTTOM][key]) &&
        (!left || map[left][RIGHT][key]) &&
        (x !== 0 || edges[LEFT][key]) &&
        (y !== 0|| edges[TOP][key]) &&
        (x !== w - 1|| edges[RIGHT][key]) &&
        (y !== h - 1|| edges[BOTTOM][key])
      ) {
        valid.push(key)
      }
    }

    return fastShuffle(valid)
  }

  let tries = 0

  function solve(str = '') {
    tries += 1

    if (tries > 1000000) {
      console.log('1 million tries')
      tries = 0
    }

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
  createTemplate,
  combineTemplates,
  logTemplate,
  draw,
}


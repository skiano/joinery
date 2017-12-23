const deepmerge = require('deepmerge')

const TOP = 'TOP'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'

const template2D = tem => tem.trim().split('\n').map(r => r.trim().split(''))
const template2string = t2d => t2d.map(r => r.join('')).join('\n') // .replace(/\./g, '~')
const logTemplate = (t2d) => { console.log(`${template2string(t2d)}\n`) }

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
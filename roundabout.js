

const TOP = 'TOP'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'

const template2D = tem =>
  tem.trim().split('\n').map(r => r.trim().split(''))

const template2string = t2d => t2d.map(r => r.join('')).join('\n')

const logTemplate = (t2d) => {
  console.log(`${template2string(t2d)}\n`)
}

const templateConfig = tem => {
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

// @see: https://jsperf.com/fastfilter-vs-native-array-filter
const fastFilter = (arr, test) => {
  const result = []
  let i
  for (i = 0; i < arr.length; i++) {
    if(test(arr[i])) result.push(arr[i])
  }
  return result
}

const fastForEach = (arr, fn) => {
  let i
  let shouldBreak = false
  const breakLoop = () => { shouldBreak = true }
  for (i = 0; i < arr.length; i++) {
    fn(arr[i], breakLoop)
    if (shouldBreak) break
  }
}

// https://bost.ocks.org/mike/shuffle/
function fastShuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const fastFloor = n => n >>> 0

// important function! consider making package??
// TODO: make it accept 4 rectangles (not just squares)
// const megaSquare = assembleSquares([
//   [ // row 1
//     [['A', 'B'], ['E', 'F']], // cell 1
//     [['C', 'D'], ['G', 'H']], // cell 2
//   ],
//   [ // row 2
//     [['I', 'J'], ['M', 'N']], // cell 1
//     [['K', 'L'], ['O', 'P']], // cell 2
//   ],
// ])
// should be:
// ABCD
// EFGH
// IJKL
// MNOP
const assembleSquares = (grid) => {
  const assembled = []
  const size = grid[0][0].length
  let y
  let x
  for (y = 0; y < size * 2; y ++) {
    assembled.push([])
    for (x = 0; x < size * 2; x ++) {
      assembled[y].push(
        grid[fastFloor(y / size)]
            [fastFloor(x / size)]
            [y % size]
            [x % size]
      )
    }
  }
  return assembled
}

const possible4squares = (units, test, createSquare = v => v) => {
  units = fastShuffle(units)
  // units = units.length > 30 ? units.slice(0, 30) : units
  // TL = TOP LEFT
  // TR = TOP RIGHT
  // BR = BOTTOM RIGHT
  // BL = BOTTOM LEFT

  const validSquares = []

  fastForEach(units, (TL) => {
    // which TRs can to the right this TL?
    const topRights = fastFilter(units, TR => test(TL, TR, RIGHT))

    fastForEach(topRights, (TR) => {
      // which BRs can be below this TR?
      const bottomRights = fastFilter(units, BR => test(TR, BR, BOTTOM))

      fastForEach(bottomRights, (BR) => {
        // which BLs can be below this TL and to the left of this BR?
        const bottomLefts = fastFilter(units, BL => test(BL, TL, TOP) && test(BR, BL, LEFT))

        // add these to the valid squares
        fastForEach(bottomLefts, (BL) => {
          validSquares.push(createSquare([
            [TL, TR],
            [BL, BR],
          ]))
        })
      })
    })
  })

  return validSquares
}

const getEdgeCell = (grid, edge, i) => {
  if (edge === TOP) return grid[0][i]
  if (edge === LEFT) return grid[i][0]
  if (edge === RIGHT) return grid[i][grid[0].length - 1]
  if (edge === BOTTOM) return grid[grid.length - 1][i]
}

const opposite = {
  [TOP]: BOTTOM,
  [BOTTOM]: TOP,
  [LEFT]: RIGHT,
  [RIGHT]: LEFT,
}

const checkEdges = (a, edge, b, predicate) => {
  // NOTE: grids assumed to be the same size
  let size
  let i

  switch (edge) {
    case TOP:
    case BOTTOM:
      size = a[0][0].length
    default:
      size = a.length
  }

  for (i = 0; i < size; i++) {
    if (!predicate(
      getEdgeCell(a, edge, i),
      getEdgeCell(b, opposite[edge], i),
      edge,
    )) {
      return false
    }
  }

  return true
}

const getSquaresFromConfig = ({ keys, map }) => {
  const hasNeighbor = (a, b, direction) => map[a][direction].includes(b)
  return possible4squares(keys, hasNeighbor)
}

const getSquaresFromSquares = (squares, { map }, maxRepeats = 12) => {
  const connectionCache = {}
  const hasNeighbor = (a, b, direction) => map[a][direction].includes(b)
  const sidesMatch = (a, b, direction) => {
    const key = [squares.indexOf(a), squares.indexOf(b), direction].join('.')
    connectionCache[key] = connectionCache.hasOwnProperty(key)
      ? connectionCache[key] + 1
      : 0
    return connectionCache[key] <= maxRepeats && checkEdges(a, direction, b, hasNeighbor)
  }
  return possible4squares(squares, sidesMatch, assembleSquares)
}

// EXAMPLE

const template = templateConfig(`
  AAAA
  A*AA
  A|AA
  A|AA
  A^AA
  AAAA
`)

const squares = getSquaresFromConfig(template)


console.log(`${template.keys.length} units => ${squares.length} squares`)

const superSquares = getSquaresFromSquares(squares, template, 1)
const superDuperSquares = getSquaresFromSquares(superSquares, template, 1)
// const superDuperPooperSquares = getSquaresFromSquares(superDuperSquares, template, 1)



superDuperSquares.map(logTemplate)

// console.log(superSquares.length)









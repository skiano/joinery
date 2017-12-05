

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

const fastFloor = n => n >>> 0

const assembleSquares = (grid) => {
  const size = grid[0][0].length
  const assembled = []
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

  return assembled
}

const r = g => g.split(' ').map(r => r.split('')) 

const megaSquare = assembleSquares([
  [ // row 1
    r('ABCD IJKL QRST YZ12'), // cell 1
    r('EFGH MNOP UVWX 3456'), // cell 2
  ],
  [ // row 2
    r('abcd ijkl qrst yz98'), // cell 1
    r('efgh mnop uvwx 7654'), // cell 2
  ],
])

// ABCD   EFGH
// IJKL   MNOP
// QRST   UVWX
// YZ12   3456

// abcd   efgh
// ijkl   mnop
// qrst   uvwx
// yz98   7654

logTemplate(megaSquare)

const possible4squares = (units, test, createSquare = v => v) => {
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

const getSquaresFromConfig = ({ keys, map }) => {
  // check that a has b as a neighbor in this direction
  const hasNeighbor = (a, b, direction) => map[a][direction].includes(b)
  return possible4squares(keys, hasNeighbor)
}

const getSquaresFromSquares = (squares) => {

  const sidesMatch = (a, b, direction) => {
    return true
  }

  return possible4squares(squares, sidesMatch, assembleSquares)
}


// EXAMPLE

// const template = templateConfig(`
//   HCCCE
//   DABAD
//   DBABD
//   FCCCG
// `)

// const squares = getSquaresFromConfig(template)

// squares.map(logTemplate)
// console.log(`${template.keys.length} units => ${squares.length} squares`)

// const superSquares = getSquaresFromSquares(squares)

// console.log(superSquares.length)

// const superDuperSquares = getSquaresFromSquares(superSquares)

// logTemplate(superDuperSquares[0])






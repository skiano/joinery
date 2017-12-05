const template = `
  HCCCE
  DABAD
  DBABD
  FCCCG
`

const TOP = 'TOP'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const BOTTOM = 'BOTTOM'

const template2D = tem =>
  tem.trim().split('\n').map(r => r.trim().split(''))

const neighborMap = t2d => {
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

const possible4squares = (units, test) => {
  // TL = TOP LEFT
  // TR = TOP RIGHT
  // BR = BOTTOM RIGHT
  // BL = BOTTOM LEFT

  const validSquares = []

  fastForEach(units, (TL) => {
    // which TRs can to the right this TL?
    const topRights = fastFilter(units, N => test(TL, N, RIGHT))

    fastForEach(topRights, (TR) => {
      // which BRs can be below this TR?
      const bottomRights = fastFilter(units, N => test(TR, N, BOTTOM))

      fastForEach(bottomRights, (BR) => {
        // which BLs can be below this TL and to the left of this BR?
        const bottomLefts = fastFilter(units, N => test(BR, TL, TOP) && test(BR, N, LEFT))

        // add these to the valid squares
        fastForEach(bottomLefts, (BL) => {
          validSquares.push([
            [TL, TR],
            [BL, BR],
          ])
        })
      })
    })
  })

  return validSquares
}

const { keys, map } = neighborMap(template2D(template))

const squares = possible4squares(keys, (a, b, direction) => map[a][direction].includes(b))

console.log(squares.length)




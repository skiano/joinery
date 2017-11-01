const neighbors = [
  ['TOP', [0, -1]],
  ['RIGHT', [1, 0]],
  ['BOTTOM', [0, 1]],
  ['LEFT', [-1, 0]],
]

// compose functions left to right (as a sequence)
function pipe () {
  const fns = Array.from(arguments)
  return (input) => fns.reduce((output, fn) => fn(output), input)
}

// add together two 2D points
const add2D = (a, b) => ([a[0] + b[0], a[1] + b[1]])

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomPoint = (w, h) => ([randomInt(0, w - 1), randomInt(0, h - 1)])
const randomItem = list => list[randomInt(0, list.length - 1)]

const randomFill = (w, h, choices) => {
  const grid = []

  for (var y = 0; y < h; y += 1) {
    grid[y] = []

    for (var x = 0; x < w; x += 1) {
      grid[y].push(randomItem(choices))
    } 
  }

  return grid
}

const stringifyGrid = (grid) => grid.map(row => row.join('')).join('\n')

// given a point [x, y],
// perform a function for each of its cardinal neighbors
const eachNeighbor = (point, fn) => {
  neighbors
    .forEach(([direction, delta], idx) => 
      fn(add2D(point, delta), direction))
}

// given a template string,
// return a 2D array of letters
const templateToGrid = (template) => (
  template
    .split('\n')
    .map(s => s.trim())
    .filter(_ => _)
    .map(r => r.split(''))
)

// given a 2D array of letters,
// return a map of letters to viable neighboring letters
// the character '-' indicates that an edge is viable
const gridToNeighbors = (grid) => {
  const map = {}

  grid.forEach((row, y) => {
    row.forEach((current, x) => {
      eachNeighbor([x, y], ([nX, nY], direction) => {
        const neighbor = (grid[nY] && grid[nY][nX]) || '-'

        if (!map[current]) map[current] = {}
        if (!map[current][direction]) map[current][direction] = []
        
        if (!map[current][direction].includes(neighbor)) {
          map[current][direction].push(neighbor)  
        }
      })
    })
  })

  return map
}

// creates the joinery object
// which takes a neghbor map and
// returns interesting functionality
// for using the info in the template
const createJoinery = neighborMap => {
  const ids = Object.keys(neighborMap)

  // public interface
  return {
    ids,
    compose: (w, h) => {
      const initial = randomFill(w, h, ids)

      console.log(stringifyGrid(initial))
    },
    log: () => console.log(neighborMap)
  }
}

// create a processor that
// converts a template into a useful object
module.exports = pipe(
  templateToGrid,
  gridToNeighbors,
  createJoinery
)


// B/A A/B BA AB -/A A/- -/B B/- -A A-



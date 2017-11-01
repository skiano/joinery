
// given a template looking something like this:

//   ABA
//   BAB

// where letters represent valid arrangements of 'blocks',
// this will create an engine that will layout a field of blocks
// using only the connections available in the template

// For example, the template above could not produce the following:

//   AAA
//   AAA

// Because there is no example of an A ajoining an A in the template


function pipe () {
  const fns = Array.from(arguments)
  return (input) => fns.reduce((output, fn) => fn(output), input)
}

const neighbors = [
  ['TOP', [0, -1]],
  ['RIGHT', [1, 0]],
  ['BOTTOM', [0, 1]],
  ['LEFT', [-1, 0]],
]

const add2D = (a, b) => ([a[0] + b[0], a[1] + b[1]])

const eachNeighbor = (point, fn) => {
  neighbors
    .forEach(([direction, delta], idx) => 
      fn(add2D(point, delta), direction))
}

const templateToGrid = (template) => (
  template
    .split('\n')
    .map(s => s.trim())
    .filter(_ => _)
    .map(r => r.split(''))
)
  
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

const processTemplate = pipe(
  templateToGrid,
  gridToNeighbors,
)

console.log(
  processTemplate(`
  ABA
  BAB
`)
)

console.log(
  processTemplate('BAB')
)



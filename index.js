
// not as elegant as using ...
// but no build!
function compose () {
  const fns = Array.from(arguments)
  return (input) => fns.reduceRight((output, fn) => fn(output), input)
}

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
  neighbors.forEach(([id, n], idx) => fn(add2D(point, n), id))
}

const templateToGrid = (temlate) => (
  template
    .split('\n')
    .map(s => s.trim())
    .filter(_ => _)
    .map(r => r.split(''))
)
  
const gridToNeighbors = (grid) => {
  const map = {}

  grid.forEach((row, y) => {
    row.forEach((col, x) => {
      eachNeighbor([x, y], ([nX, nY], id) => {
        console.log(id, grid[nY] && grid[nY][nX])
      })
    })
  })
}

const processTemplate = pipe(
  templateToGrid,
  gridToNeighbors,
)


const template = `
  ABA
  BAB
`

processTemplate(template)



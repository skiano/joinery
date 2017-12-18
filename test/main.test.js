const test = require('tape')
const {
  stringGrid,
  createTemplate,
  combineTemplate,
} = require('../main')

test('basic template', (t) => {
  t.plan(13)

  const template = createTemplate(`
    CCCC
    CABC
    CBAC
    CCCC
  `)

  const ABBA = {
    map: {
      A: { TOP: ['B'], LEFT: ['B'], RIGHT: ['B'], BOTTOM: ['B'] },
      B: { TOP: ['A'], LEFT: ['A'], RIGHT: ['A'], BOTTOM: ['A'] },
      C: { TOP: ['C', 'B', 'A'], LEFT: ['C', 'B', 'A'], RIGHT: ['C', 'A', 'B'], BOTTOM: ['C', 'A', 'B'] },
    },
    keys: ['C', 'A', 'B'],
  }

  t.equal(template.keys.sort().join(''), 'ABC', 'keys')

  t.equal(template.map.A.TOP.sort().join(''), 'BC', 'A - TOP')
  t.equal(template.map.A.LEFT.sort().join(''), 'BC', 'A - LEFT')
  t.equal(template.map.A.RIGHT.sort().join(''), 'BC', 'A - RIGHT')
  t.equal(template.map.A.BOTTOM.sort().join(''), 'BC', 'A - BOTTOM')

  t.equal(template.map.B.TOP.sort().join(''), 'AC', 'B - TOP')
  t.equal(template.map.B.LEFT.sort().join(''), 'AC', 'B - LEFT')
  t.equal(template.map.B.RIGHT.sort().join(''), 'AC', 'B - RIGHT')
  t.equal(template.map.B.BOTTOM.sort().join(''), 'AC', 'B - BOTTOM')

  t.equal(template.map.C.TOP.sort().join(''), 'ABC', 'C - TOP')
  t.equal(template.map.C.LEFT.sort().join(''), 'ABC', 'C - LEFT')
  t.equal(template.map.C.RIGHT.sort().join(''), 'ABC', 'C - RIGHT')
  t.equal(template.map.C.BOTTOM.sort().join(''), 'ABC', 'C - BOTTOM')
})

test('template edges', (t) => {
  t.plan(4)

  const template = createTemplate(`
    ABBC
    H..D
    H..D
    GFFE
  `)

  t.equal(template.edges.TOP.sort().join(''), 'ABC', 'edge - top')
  t.equal(template.edges.LEFT.sort().join(''), 'AGH', 'edge - left')
  t.equal(template.edges.RIGHT.sort().join(''), 'CDE', 'edge - right')
  t.equal(template.edges.BOTTOM.sort().join(''), 'EFG', 'edge - bottom')
})

test('combine template', (t) => {
  t.plan(1)

  const a = {
    keys: ['A', 'B'],
    map: {
      A: { TOP: ['B'], LEFT: ['B'] },
      B: { TOP: ['A'], LEFT: ['A'] },
    },
    edges: {
      TOP: ['A'],
      BOTTOM: ['B'],
    }
  }

  const b = {
    keys: ['A', 'B', 'C'],
    map: {
      A: { TOP: ['A', 'C'], LEFT: ['A', 'C'] },
      B: { TOP: ['B', 'C'], LEFT: ['B', 'C'] },
      C: { TOP: ['A', 'B', 'C'], LEFT: ['A', 'B', 'C'] },
    },
    edges: {
      TOP: ['C'],
      BOTTOM: ['C'],
    }
  }

  const combined = combineTemplate(a, b)

  t.deepEqual(combined, {
    edges: {
      TOP: ['A','C'],
      BOTTOM: ['B','C']
    },
    keys: ['A','B','C'],
    map: {
      A: {
        TOP: ['B','A','C'],
        LEFT: ['B','A','C']
      },
      B: {
        TOP: ['A','B','C'],
        LEFT: ['A','B','C']
      },
      C: {
        TOP: ['A','B','C'],
        LEFT: ['A','B','C']
      }
    }
  }, 'combined')
})

test('string grid', (t) => {
  t.plan(19)

  const { point2Index } = stringGrid(3)

  t.equal(point2Index([0, 0]), 0, 'point2Index - top left')
  t.equal(point2Index([0, 1]), 3, 'point2Index - right edge')
  t.equal(point2Index([1, 1]), 4, 'point2Index - left edge')
  t.equal(point2Index([2, 1]), 5, 'point2Index - center')

  const { index2Point } = stringGrid(4)

  t.deepEqual(index2Point(0), [0, 0], 'index2Point - 0')
  t.deepEqual(index2Point(1), [1, 0], 'index2Point - 1')
  t.deepEqual(index2Point(2), [2, 0], 'index2Point - 2')
  t.deepEqual(index2Point(3), [3, 0], 'index2Point - 3')
  t.deepEqual(index2Point(4), [0, 1], 'index2Point - 4')
  t.deepEqual(index2Point(5), [1, 1], 'index2Point - 5')

  const { translatePoint } = stringGrid(7)

  t.deepEqual(translatePoint([1, 2], [3, 4]), [4, 6], 'translatePoint - addition')
  t.deepEqual(translatePoint([1, 2], [-3, -4]), [-2, -2], 'translatePoint - subtraction')

  const { translateIndex } = stringGrid(10)

  t.deepEqual(translateIndex(0, [2, 0]), 2, 'translateIndex - simple horizontal')
  t.deepEqual(translateIndex(1, [2, 1]), 13, 'translateIndex - simple diagonal')
  t.deepEqual(translateIndex(0, [9, 1]), 19, 'translateIndex - to right edge')
  t.deepEqual(translateIndex(9, [-9, 1]), 10, 'translateIndex - to left edge')
  t.deepEqual(translateIndex(0, [10, 1]), undefined, 'translateIndex - over right edge')
  t.deepEqual(translateIndex(9, [-10, 1]), undefined, 'translateIndex - over left edge')
  t.deepEqual(translateIndex(2, [0, -1]), undefined, 'translateIndex - negative')
})
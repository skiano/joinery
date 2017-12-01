const Combinatorics = require('js-combinatorics')

const BLANK = '-'

const template = `
  CCCCC
  CABAC
  CBABC
  CCCCC
`

/**
 * @param {string} t - a template string
 * @return {string} a template string with no trailing space on any lines
 */
const sanitizeTemplate = t => t.trim().replace(/\s+/g, '\n')

/**
 * @param {string} t - a sanatized template string
 * @param {func} onLink - a callback that fires on each link (return true to break loop)
 */
const scanWarp = (t, onLink = () => {}) => {
  const w = t.indexOf('\n') + 1
  const h = (t.length + 1) / w

  let prevIdx = -1
  let currentIdx

  const handleLink = (link) => {
    onLink(link || [
      t.charAt(prevIdx) || BLANK, 
      t.charAt(currentIdx) || BLANK,
    ].join(''))
  }

  /* scan the warp threads */
  for (let x = 0; x < w - 1; x += 1) {
    for (let y = 0; y <= h; y += 1) {
      currentIdx = (y * w) + x
      if (handleLink()) break
      prevIdx = currentIdx    
    }
  }

  /** process a double blank */
  handleLink(BLANK + BLANK)
}

/**
 * @param {string} t - a sanatized template string
 * @param {func} onLink - a callback that fires on each link (return true to break loop)
 */
const scanWeft = (t, onLink = () => {}) => {
  console.log(t)
  const w = t.indexOf('\n') + 1
  const h = (t.length + 1) / w

  let prevIdx = -1
  let currentIdx

  const handleLink = (link) => {
    const l = t.charAt(prevIdx)
    const r = t.charAt(currentIdx)
    onLink(link || [
      (!l || l === '\n') ? BLANK : l,
      (!r || r === '\n') ? BLANK : r,
    ].join(''))
  }

  /* scan the warp threads */
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      currentIdx = (y * w) + x
      if (handleLink()) break
      prevIdx = currentIdx
    }
  }

  /** process a double blank */
  handleLink(BLANK + BLANK)
}

const trimAndSplit = (str, sep = '') => str.trim().split(sep)
const templateToArray = template => trimAndSplit(template, '\n').map(v => trimAndSplit(v))
const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)
const uniqueChars = str => unique(str.replace(/\s/g,'').split(''))
const multiplyArray = (arr, x) => Array.from(new Array(x)).reduce(out => out.concat(arr), [])

const getWeftThreads = (arr2d) => arr2d.map(r => BLANK + r.join('') + BLANK)
const getWarpThreads = (arr2d) => {
  const threads = []
  for (let x = 0; x < arr2d[0].length; x += 1) {
    threads.push(
      BLANK + arr2d.map(weft => weft[x]).join('') + BLANK
    )
  }
  return threads
}
const getThreads = arr2d => ({
  warp: getWarpThreads(arr2d),
  weft: getWeftThreads(arr2d),
})

// console.log(uniqueChars(template))

// const fuel = multiplyArray(uniqueChars(template).concat(BLANK), 4) 

// const cmb = Combinatorics.combination(fuel, 4);

// while(a = cmb.next()) {
//   if (unique(a).length === 3) {
//     console.log()
//     console.log(`${a[0]}${a[1]}\n${a[2]}${a[3]}`);
//   }
// }

// console.log(total = Combinatorics.C(fuel.length, 4))

// console.log(templateToArray(template))

// const templateArray = templateToArray(template)
// console.log(getThreads(templateArray))



scanWeft(sanitizeTemplate(template), (link) => {
  console.log(link)
})







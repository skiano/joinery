const Combinatorics = require('js-combinatorics')
const { sanitizeTemplate, compatibleWithTemplate } = require('./template')

const BLANK = '-'

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



// scanWeft(sanitizeTemplate(template), (link) => {
//   console.log(link)
// })

// scanWarp(sanitizeTemplate(template), (link) => {
//   console.log(link)
// })

const template = sanitizeTemplate(`
  CCCCC
  CABAC
  CBABC
  CCCCC
`)

const layout = sanitizeTemplate(`
  CCCC
  CBAC
  CCCC
`)

console.log('is compatible:', compatibleWithTemplate(layout, template))







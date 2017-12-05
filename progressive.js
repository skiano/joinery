const Combinatorics = require('js-combinatorics')

const {
  sanitizeTemplate,
  getTemplateUnits,
  compatibleWithTemplate,
  templateFromBlock
} = require('./template')

const trimAndSplit = (str, sep = '') => str.trim().split(sep)
const templateToArray = template => trimAndSplit(template, '\n').map(v => trimAndSplit(v))
const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)
const uniqueChars = str => unique(str.replace(/\s/g,'').split(''))
const multiplyArray = (arr, x) => Array.from(new Array(x)).reduce(out => out.concat(arr), [])

// 

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

const getBlocks = (units, multiplier = 1) => {
  const filler = multiplyArray(units, multiplier)
  const potentialBlocks = Combinatorics.combination(filler, 4)
  const validBlocks = []
  let b
  while(b = potentialBlocks.next()) {
    const layout = templateFromBlock(b)
    if (!validBlocks.includes(layout) && compatibleWithTemplate(layout, template)) {
      validBlocks.push(layout)
    } else {
      console.log(`--\n${layout}\n`)
    }
  }
  return validBlocks
}

const phase1 = getBlocks(getTemplateUnits(template), 4)

phase1.forEach(b => {
  console.log(b, '\n')
})

console.log('--------')

const sample = [
  '-C\nA-',
  '-C\nB-',
  '-A\nB-',
  'C-\n-C',
]

console.log(templateFromBlock(sample))







// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = list => list[randomInt(0, list.length - 1)]

const getLinks = (template) => {
  const BLANK = '-'
  const links = []

  for (let i = 0; i <= template.length; i += 1) {
    const l = [
      template[i - 1] || BLANK,
      template[i] || BLANK
    ].join('')

    if (!links.includes(l)) {
      links.push(l)  
    }
  }

  links.push([BLANK, BLANK].join(''))

  return links
}

const getNeighborMap = links => links.reduce((neighborMap, link) => {
  return Object.assign(neighborMap, {
    [link]: {
      left: links.filter(l => l[1] === link[0]),
      right: links.filter(l => l[0] === link[1])
    }
  })
}, {})

const getTerminals = links => ({
  left: links.filter(l => l[0] === '-'),
  right: links.filter(l => l[1] === '-'),
})

const composeRight = (terminals, neighborMap, size) => {
  const parts = []

  for (let i = 0; i < size; i += 1) {
    const prev = parts[i - 1]
    const options = prev ? neighborMap[prev].right : terminals.left
    parts.push(randomItem(options))
  }

  return parts.reduce((str, p) => str + p[0], '')
}

const composeLeft = (terminals, neighborMap, size) => {
  const parts = []

  for (let i = 0; i < size; i += 1) {
    const prev = parts[i - 1]
    const options = prev ? neighborMap[prev].left : terminals.right
    parts.push(randomItem(options))
  }

  return parts.reduceRight((str, p) => str + p[1], '')
}

const createJoinery = (template) => {
  const links = getLinks(template)
  console.log('links', links)
  const neighborMap = getNeighborMap(links)
  const terminals = getTerminals(links)
  return (size) => ([
    composeRight(terminals, neighborMap, size),
    composeLeft(terminals, neighborMap, size),
    '',
  ].join('\n'))
}

// ABC

// -A C-
// -ABC-

// ---------------------
// -A-----------------C-
// -A----------------C-
// ..--..--..--..--..--

//  A    -   -
// ABA  -BA -B-
//  A    A   -

// 01 02 03 04
// 12 13 14 05
// 11 16 15 06
// 10 09 08 07

// 01 02 04 07
// 03 05 08 11
// 06 09 12 14
// 10 13 15 16

// -BAAC---BADAC--BAC-BAC--BAC-BADADAAADAAAAADADADAAC
// BAC-BAAC-BAC--BAAAC---BAC-BADADAADADADAC-BAC--BAC-
// corrected
// -BAAC---BADAC--BAC-BAC--BAC-BADADAAADAAAAADADADAC-
// -BAAC---BADAC-BAAAC---BAC-BADADAADADADAC-BAC--BAC-

// const template = 'ABCABAABAC'
const template = 'BADAAC'
// const template = 'onion'
// const joint = createJoinery('ABCABABAC')

const joint = createJoinery(template)

console.log('template', template, '\n')
console.log(joint(10))
console.log(joint(15))
console.log(joint(50))
console.log(joint(5))



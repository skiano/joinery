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

const compose = (terminals, neighborMap, size) => {
  const parts = []

  for (let i = 0; i < size; i += 1) {
    const prev = parts[i - 1]
    const options = prev ? neighborMap[prev].right : terminals.left
    parts.push(randomItem(options))
  }

  return parts.reduce((str, p) => str + p[0], '')
}

const createJoinery = (template) => {
  const links = getLinks(template)
  const neighborMap = getNeighborMap(links)
  const terminals = getTerminals(links)
  return (size) => compose(terminals, neighborMap, size)
}

const joint = createJoinery('ABCABABAC')

console.log(joint(10))
console.log(joint(15))
console.log(joint(20))
console.log(joint(5))



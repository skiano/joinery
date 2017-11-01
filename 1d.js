

const template = 'ABCABABAC'
const BLANK = '-'

const getLinks = (template) => {
  const links = []
  for (i = 0; i <= template.length; i += 1) {
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

const links = getLinks(template)
const neighborMap = getNeighborMap(links)

console.log(neighborMap)
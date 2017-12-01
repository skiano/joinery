/**
 * EXAMPLE TEMPLATE
 *
 * const template = `
 *   CCCCC
 *   CABAC
 *   CBABC
 *   CCCCC
 * `
 */

/** represents empty space */
const BLANK = '-'

const unique = arr => arr.filter((v, i, a) => a.indexOf(v) === i)
const uniqueChars = str => unique(str.replace(/\s/g,'').split(''))
const getTemplateUnits = t => uniqueChars(t).concat(BLANK)

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
    return onLink(link || [
      t.charAt(prevIdx) || BLANK, 
      t.charAt(currentIdx) || BLANK,
    ].join(''))
  }

  /* scan the warp threads */
  for (let x = 0; x < w - 1; x += 1) {
    for (let y = 0; y <= h; y += 1) {
      currentIdx = (y * w) + x
      if (handleLink()) return true
      prevIdx = currentIdx    
    }
  }

  /** process a double blank */
  return handleLink(BLANK + BLANK) || false
}

/**
 * @param {string} t - a sanatized template string
 * @param {func} onLink - a callback that fires on each link (return true to break loop)
 * @return {bool}
 */
const scanWeft = (t, onLink = () => {}) => {
  const w = t.indexOf('\n') + 1
  const h = (t.length + 1) / w

  let prevIdx = -1
  let currentIdx

  const handleLink = (link) => {
    const l = t.charAt(prevIdx)
    const r = t.charAt(currentIdx)
    return onLink(link || [
      (!l || l === '\n') ? BLANK : l,
      (!r || r === '\n') ? BLANK : r,
    ].join(''))
  }

  /* scan the warp threads */
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      currentIdx = (y * w) + x
      if (handleLink()) return true
      prevIdx = currentIdx
    }
  }

  /** process a double blank */
  return handleLink(BLANK + BLANK) || false
}

/** store link searches */
const linkCache = {}

const linksMath = (layoutLink, templateLink, isFinal) => {
  // until the outer edge allow anything to touch blank space
  if (!isFinal && layoutLink.includes(BLANK)) return true
  templateLink === layoutLink
}

/**
 * @param {string} layout - a sanatized template string
 * @param {string} template - a sanatized template string
 * @return {bool}
 * @description return true if every link in layout exists in template
 */
const compatibleWithTemplate = (layout, template, isFinal) => {
  linkCache[template] = linkCache[template] || { warp: {}, weft: {} }

  let warpGood = true
  let weftGood = true

  /** first, scan the warp looking for flaws */
  scanWarp(layout, (layoutLink) => {
    /** check if search is cached */
    const isCached = isFinal ? false : linkCache[template].warp.hasOwnProperty(layoutLink)

    /** search for link in template */
    const isFound = isCached
      ? linkCache[template].warp[layoutLink]
      : scanWarp(template, templateLink => linksMath(layoutLink, templateLink, isFinal))

    /** cache the search result */
    if (!isCached) linkCache[template].warp[layoutLink] = isFound

    /** if no matching link, mark as bad, and stop scanning */
    if (!isFound) {
      warpGood = false
      return true
    }
  })

  /** if warp is bad, who cares if weft is good */
  if (!warpGood) return false

  /** then scan the weft, looking for flaws */
  scanWeft(layout, (layoutLink) => {
    /** check if search is cached */
    const isCached = isFinal ? false : linkCache[template].weft.hasOwnProperty(layoutLink)

    /** search for link in template */
    const isFound = isCached
      ? linkCache[template].weft[layoutLink]
      : scanWeft(template, templateLink => linksMath(layoutLink, templateLink, isFinal))

    /** cache the search result */
    if (!isCached) linkCache[template].weft[layoutLink] = isFound

    /** if no matching link, mark as bad, and stop scanning */
    if (!isFound) {
      weftGood = false
      return true
    }
  })

  /** retrun the result of the weft */
  return weftGood
}

const templateFromBlock = (b) =>  {
  if (b[0].length === 1) return `${b[0]}${b[1]}\n${b[2]}${b[3]}`

  const w = b[0].indexOf('\n')
  const h = ((b[0].length + 1) / w) - 1
  const str = []

  let bY

  for (let y = 0; y < w * 2; y += 1) {
    bY = y % h

    // for each row, add in the rows for the blocks
    for (let i = 0; i < 4; i += 1) {
      for (let bX = 0; bX < w; bX += 1) {
        str.push(b[i].charAt((bY * (w + 1)) + bX))
      }
    }
    str.push('\n')
  }

  return str.join('')
}

module.exports = {
  sanitizeTemplate,
  getTemplateUnits,
  compatibleWithTemplate,
  templateFromBlock,
}

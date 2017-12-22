const {
  draw,
  createTemplate,
  combineTemplates,
  logTemplate
} = require('./main')

// const template = createTemplate(`
//   ............
//   .|-|-|-|-|-.
//   .-|M|-|Z|-|.
//   .|-|-|-|-|-.
//   ............
// `)

// const template = createTemplate(`
//   /—\\
//   |+|
//   |+|
//   \\—/
// `)

// const template = createTemplate(`
//   ┌─┬─┐
//   │╳├─┤
//   │╳├╳┤
//   └—┴—┘
// `)

const a = createTemplate(`
  ......
  .┌┐┌┐.
  .└┘││.
  .┌┐││.
  .└┘└┘.
  ......
`)

const b = createTemplate(`
  ......
  .┌┐┌┐.
  .││└┘.
  .││┌┐.
  .└┘└┘.
  ......
`)

const c = createTemplate(`
  ......
  .┌──┐.
  .└──┘.
  ......
`)

// const spacers = combineTemplates(a, b)
// const moreSpace = combineTemplates(spacers, c)

// const template = createTemplate(`
//   ╭╮╭╮╭╮╭╮
//   ╰╯││╰╯││
//   ╭╮││╭╮││
//   ╰╯╰╯╰╯╰╯
// `)

// const templateAlt = createTemplate(`
//   ╭╮╭╮╭╮╭╮
//   ││╰╯││╰╯
//   ││╭╮││╭╮
//   ╰╯╰╯╰╯╰╯
// `)

// const squiggle = combineTemplates([template, templateAlt])

// const moreSquiggle = createTemplate(`
//   ╭──╮╭╮╭╮╭╮╭──╮╭──╮
//   ╰╮╭╯╰╯││╰╯╰──╯╰╮╭╯
//   ╭╯╰╮╭╮││╭╮╭──╮╭╯╰╮
//   ╰──╯╰╯╰╯╰╯╰──╯╰──╯
// `)

// const squigglePlus = combineTemplates([moreSquiggle, squiggle])

// const template = createTemplate(`
//   ┌──┐┌┐┌┐┌───┐┌┐
//   └──┘├┤├┤└───┘├┤
//   ┌──┐││├┤┌───┐││
//   └──┘└┘└┘└───┘└┘
//   ┌──┐┌┐┌┐┌───┐┌┐
//   └──┘└┘└┘└───┘└┘
// `)

// const template = createTemplate(`
//   ╳╲╱╳╳╱╲╳
//   ╳╲╱╳╳╲╱╳
//   ╲╲╱╱╲╲╱╱
// `)

const template = createTemplate(`
  >╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳<
  >╳╳╲╱╳╱╱╳╲╲╳╱╱╲╲╲╲╳<
  >╳╳╲╱╳╲╲╳╲╲╳╱╱╲╲╲╲╳<
  >╳╲╲╱╱╱╱╲╲╲╳╱• ╲╲╲╳<
  >╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳<
  >╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳<
`)

// const template = createTemplate(`
//   .>-║╱╲╱╲╱║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
//   -.>║═════║-.>-.>
//   .>-║═════║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
// `)

const t = draw(template, 70, 30)

logTemplate(t)
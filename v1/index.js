const {
  draw,
  createTemplate,
  combineTemplates,
  logTemplate
} = require('./joinery')

// const template = createTemplate(`
//   A--
//   -A-
// `)

// const template = createTemplate(`
//   ╭──╮╭╮╭╮╭╮╭──╮╭──╮
//   ╰╮╭╯╰╯││╰╯╰──╯╰╮╭╯
//   ╭╯╰╮╭╮││╭╮╭──╮╭╯╰╮
//   ╰──╯╰╯╰╯╰╯╰──╯╰──╯
// `)

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

// const a = createTemplate(`
//   ......
//   .┌┐┌┐.
//   .└┘││.
//   .┌┐││.
//   .└┘└┘.
//   ......
// `)

// const b = createTemplate(`
//   ......
//   .┌┐┌┐.
//   .││└┘.
//   .││┌┐.
//   .└┘└┘.
//   ......
// `)

// const c = createTemplate(`
//   ......
//   .┌──┐.
//   .└──┘.
//   ......
// `)

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

// const template = createTemplate(`
//   >╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳╳<
//   >╳╳╲╱╳╱╱╳╲╲╳╱╱╲╲╲╲╳<
//   >╳╳╲╱╳╲╲╳╲╲╳╱╱╲╲╲╲╳<
//   >╳╲╲╱╱╱╱╲╲╲╳╱• ╲╲╲╳<
//   >╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳<
//   >╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳<
// `)

// const template = createTemplate(`
//   .╳╳╲╱╳╱╱╳╲╲╳╱╱╲╲╲╲╳.
//   .╳╳╲╱╳╲╲╳╲╲╳╱╱╲╲╲╲╳.
//   .╳╲╲╱╱╱╱╲╲╲╳╱• ╲╲╲╳.
//   .╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳.
//   .╳╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱╳.
// `)

// const template = createTemplate(`
//   .>-║╱╲╱╲╱║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
//   -.>║═════║-.>-.>
//   .>-║═════║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
// `)

// const template = createTemplate(`
//   ╭──╮╔══╗
//   │╔╗│║╭╮║
//   │╚╝│║╰╯║
//   ╰──╯╚══╝
//   ╔══╗╭──╮
//   ║╔╗║│╔╗│
//   ║╚╝║│╚╝│
//   ╚══╝╰──╯
// `)
//
// const reversetemplate = createTemplate(`
//   ╔═══╗╭───╮╭──╮╭──╮
//   ║╭─╮║│╔═╗││╔╗││╭╮│
//   ║╰─╯║│╚═╝││╚╝││╰╯│
//   ╚═══╝╰───╯╰──╯╰──╯
// `)

const template = createTemplate(`
  ╭──╮╔══╗
  │╔╗│║╭╮║
  │╚╝│║╰╯║
  ╰──╯╚══╝
  ╔══╗╭──╮
  ║╔╗║│╭╮│
  ║╚╝║│╰╯│
  ╚══╝╰──╯
`)

// const template = createTemplate(`
//   ╭──╮╔══╗╔══╗
//   │╔╗│║╭╮║╚╗╔╝
//   │╚╝│║╰╯║╔╝╚╗
//   ╰──╯╚══╝╚══╝
//   ╔══╗╭──╮╭──╮
//   ║╔╗║│╭╮│╰╮╭╯
//   ║╚╝║│╰╯│╭╯╰╮
//   ╚══╝╰──╯╰──╯
// `)

// const template = createTemplate(`
//   ╭──╮╔══╗╔══╗╔╗╔╗
//   │╔╗│║╭╮║╚╗╔╝║╚╝║
//   │╚╝│║╰╯║╔╝╚╗║╔╗║
//   ╰──╯╚══╝╚══╝╚╝╚╝
//   ╔══╗╭──╮╭──╮╭╮╭╮
//   ║╔╗║│╭╮│╰╮╭╯│╰╯│
//   ║╚╝║│╰╯│╭╯╰╮│╭╮│
//   ╚══╝╰──╯╰──╯╰╯╰╯
// `)

// const template = createTemplate(`
//   ╭───╮╭──╮
//   │╭─╮││╭╮│
//   │╰─╯││╰╯│
//   ╰───╯╰──╯
// `)

// const template = createTemplate(`
//   ╭──╮╭╮╭╮╭╮╭──╮╭──╮
//   ╰╮╭╯╰╯││╰╯╰──╯╰╮╭╯
//   ╭╯╰╮╭╮││╭╮╭──╮╭╯╰╮
//   ╰──╯╰╯╰╯╰╯╰──╯╰──╯
// `)

// const template = createTemplate(`
//   ╭──╮╭╮╭╮╭╮╭──╮╭──╮╭╮╭╮
//   ╰╮╭╯╰╯││╰╯╰──╯╰╮╭╯│╰╯│
//   ╭╯╰╮╭╮││╭╮╭──╮╭╯╰╮│╭╮│
//   ╰──╯╰╯╰╯╰╯╰──╯╰──╯╰╯╰╯
// `)

// const template = createTemplate(`
//   ╭╮╭╮╭╮╭╮╭╮
//   ╰╯││╰╯│╰╯│
//   ╭╮││╭╮│╭╮│
//   ╰╯╰╯╰╯╰╯╰╯
//   ╭╮╭╮╭╮╭╮╭╮
//   │╰╯│╰╯││╰╯
//   │╭╮│╭╮││╭╮
//   ╰╯╰╯╰╯╰╯╰╯
// `)

// const template = createTemplate(`
//   ╭╮╭╮╭╮
//   │││╰╯│
//   │││╭╮│
//   ╰╯╰╯╰╯
//   ╭╮╭╮╭╮
//   │╰╯│││
//   │╭╮│││
//   ╰╯╰╯╰╯
// `)

// const template = createTemplate(`
//   ╭────╮╭────╮
//   ╰────╯╰─╮╭─╯
//   ╭────╮╭─╯╰─╮
//   ╰─╮╭─╯╰────╯
//   ╭─╯╰─╮╭────╮
//   ╰────╯╰────╯
// `)

// const template = createTemplate(`
//   ╭────╮╭────╮
//   ╰────╯╰────╯
//   ╭──────────╮
//   ╰──────────╯
//   ╭────╮╭────╮
//   ╰────╯╰────╯
// `)

// const template = createTemplate(`
//   ╭╭╰╰╭╭╰╰
//   ╮╮╰╯╮╮╯╯
//   ╭╭╯╯╮╮╯╯
// `)

// const template = createTemplate(`
//   .╭╮╭─╮.╭╮╭─╮.
//   .│╰│╮│╮│╰│╮│.
//   ╭│╮│╰│╰│╮│││.
//   ││╰│╮│.│╰│╯│.
//   ││╭│╯│╭│╮│╭│╮
//   ╰╯╰╯.╰╯╰╯╰╯╰╯
// `)

// const template = createTemplate(`
//  .╭─╮ ╭─╮
//  ╭│╮│ │.│
//  ││╰│╮│.│
//  ╰│╮│╰│╮│
//  .│││╭│╯│
//  .╰╯╰╯╰─╯
// `)

// const template = createTemplate(`
//  ╔╦╦═╦═╦═╦═╦╦╗
//  │╰║╮│.│.│╭║╯│
//  │.│╰║╮│.│╰║╮│
//  │.│╭║╯│.│.│╰║
//  │╭║╯│.│.│.│.│
//  ╚╩╩═╩═╩═╩═╩═╝
// `)

// const template = createTemplate(`
//   ╒╦╦╤╦╦╦╤╕
//   ╞╬╬╪╬╩╩╪╡
//   ╞╩╩╪╬╤╤╪╡
//   ╞╦╦╪╬╪╪╪╡
//   ╘╩╩╧╩╧╧╧╛
// `)

// const template = createTemplate(`
//   │.│.│.│.│.│.│
//   │.│╔╪═╪═╪╗│.│
//   │.│║│.│.│║│.│
//   │.│║│.│.│║│.│
//   │.│╚╪═╪═╪╝│.│
//   │.│.│.│.│.│.│
// `)

// const template = createTemplate(`
//   │╔╪═╪╗│.│.│.│╔╪═╪╗│.│.│.│.│
//   │║│.│╚╪╗│.│.│║│.│╚╪╗│.│╔╪╗│
//   │║│.│.│║│.│.│╠╪═╪╗│║│.│╚╪╝│
//   │╚╪╗│.│║│.│.│╚╪╦╪╬╪╬╪═╪╗│.│
//   │╔╪╝│.│║│.│.│╔╪╝│║│║│╔╪╝│.│
//   │╚╪═╪═╪╝│.│.│╚╪═╪╩╪╩╪╝│.│.│
// `)

// const template = createTemplate(`
//   │╔╪═╪╗│.│.│.│╔╪═╪╗│.│.│.│.│
//   │║│.│╚╪╗│┌┤.│║│.│╚╪╗│.│╔╪╗│
//   │║│.│.│║├┘│.│╠╪═╪╗│║│.│╚╪╝│
//   │║│.│.│║│.│┌┤╠╪═╪╣│║│.│.│.│
//   │╚╪╗├─┤║│┌┼┘│╚╪╦╪╬╪╬╪═╪╗│.│
//   │╔╪╝│.│║├┘│.│╔╪╝│║│║│╔╪╝│.│
//   │╠╪═╪═╪╣├┐│.│╠╪╗│║│║│║│.│.│
//   │╚╪═╪═╪╝│└┼┐│╚╪╩╪╣│║│╚╪═╪╗│
//   │.│.│.│.│.│└┤.│.│╚╪╩╪═╪═╪╝│
// `)

// const template = createTemplate(`
//   │╔╪═╪╗│.│┌┼┐│╔╪═╪╗│.│.│.│.│
//   │║│.│╚╪╗│││││║│.│╚╪╗│.│╔╪╗│
//   │║│.│.│║│└┼┘│╠╪═╪╗│║│.│╚╪╝│
//   │║│.│.│║│.│┌┤╠╪═╪╣│║│.│.│.│
//   │╚╪╗├─┤║│┌┼┘│╚╪╦╪╬╪╬╪═╪╗│.│
//   │╔╪╝│.│║├┘│.│╔╪╝│║│║│╔╪╝│.│
//   │╠╪═╪═╪╣├┐│.│╠╪╗│║│║│║│.│.│
//   │╚╪═╪═╪╝│└┼┐│╚╪╩╪╣│║│╚╪═╪╗│
//   │.│.│.│.│.│└┤.│.│╚╪╩╪═╪═╪╝│
// `)

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌─┐.┌─┐.┌─┐
//   │╔╪═╪╗│.│┌┼┐│╔╪═╪╗│.│.│.│.│
//   │║│.│╚╪╗│││││║│.│╚╪╗│.│╔╪╗│
//   │║│.│.│║│└┼┘│╠╪═╪╗│║│.│╚╪╝│
//   │║│.│.│║│.│┌┤╠╪═╪╣│║│.│.│.│
//   │╚╪╗├─┤║│┌┼┘│╚╪╦╪╬╪╬╪═╪╗│.│
//   │╔╪╝│.│║├┘│.│╔╪╝│║│║│╔╪╝│.│
//   │╠╪═╪═╪╣├┐│.│╠╪╗│║│║│║│.│.│
//   │╚╪═╪═╪╝│└┼┐│╚╪╩╪╣│║│╚╪═╪╗│
//   │.│.│.│.│.│└┤.│.│╚╪╩╪═╪═╪╝│
//   └─┘.└─┘.└─┘.└─┘.└─┘.└─┘.└─┘
// `)

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌─┐.┌─┬┬┬─┐
//   │╔╪═╪╗│.│┌┼┐│╔╪═╪╗│.│┌┼┘│.│
//   │║│.│╚╪╗│││││║│.│╚╪╗├┘│╔╪╗│
//   │║│.│.│║│└┼┘│╠╪═╪╗│║│.│╚╪╝│
//   │║│.│.│║│.│┌┤╠╪═╪╣│║│.│.│.│
//   │╚╪╗├─┤║│┌┼┘│╚╪╦╪╬╪╬╪═╪╗│.│
//   │╔╪╝│.│║├┘│.│╔╪╝│║│║│╔╪╝│.│
//   │╠╪═╪═╪╣├┐│.│╠╪╗│║│║│║│.│.│
//   │╚╪═╪═╪╝│└┼┐│╚╪╩╪╣│║│╚╪═╪╗│
//   │.│┌┤.│.│.│└┼┐│.│╚╪╩╪═╪═╪╝│
//   └─┴┴┴─┘.└─┘.└┴┘.└─┘.└─┘.└─┘
// `)

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌─┐
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   │.│.│.│.│.│.│.│.│.│
//   └─┘.└─┘.└─┘.└─┘.└─┘
// `)

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌─┐
//   │╔╪═╪╗│╔╪╗│╔╪╦╪═╪╗│
//   │║│.│╚╪╝│║│╠╪╝│.│║│
//   │╠╪╗│.│╔╪╣│║│.│.│║│
//   │╚╪╩╪═╪╩╪╝│║│.│.│║│
//   │.│.│.│.│.│╚╪╗│.│║│
//   │╔╪═╪╦╪═╪╗│╔╪╝│.│║│
//   │║│.│║│.│║│╚╪═╪═╪╝│
//   │╠╪═╪╬╪═╪╣│.│╔╪╦╪╗│
//   │║│.│║│.│║│.│╠╪╬╪╣│
//   │╚╪═╪╩╪═╪╝│.│╚╪╩╪╝│
//   └─┘.└─┘.└─┘.└─┘.└─┘
// `)

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┬┬┬─┐.┌┬┐.┌─┐.┌─┐.┌─┐
//   │╔╪═╪╗│╔╪╗│└┼┐│.│││.│.│╔╪╦╪═╪╗│
//   │║│.│╚╪╝│║│.│└┤.├┘│.│.│╠╪╝│.│║│
//   │╠╪╗│.│╔╪╣│.│.│.│.│.│.│║│.│.│║│
//   │╚╪╩╪═╪╩╪╝│.│┌┼┐│.│.│.│║│.│.│║│
//   │.│.│.│.│.│.│││││.│.│.│╚╪╗│.│║│
//   │╔╪═╪╦╪═╪╗│.│││││.│.│.│╔╪╝│.│║│
//   │║│.│║│.│║│.│└┼┘│.│.│.│╚╪═╪═╪╝│
//   │╠╪═╪╬╪═╪╣│.│.│.│┌┼┐│.│.│╔╪╦╪╗│
//   │║│.│║│.│║│.│.│┌┼┘│└┼┐│.│╠╪╬╪╣│
//   │╚╪═╪╩╪═╪╝│.│┌┼┘│.│.│└┼┐│╚╪╩╪╝│
//   └─┘.└─┘.└─┘.└┴┘.└─┘.└─┴┴┴─┘.└─┘
// `)
// ^^^^^^ good! ^^^^^^^^

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌┬┐.┌─┐.┌─┐.┌─┐
//   │╔╪═╪╗│╔╪╗│ ├┐│.│││.│.│╔╪╦╪═╪╗│
//   │║│.│╚╪╝│║│.│└┤.├┘│.│.│╠╪╝│.│║│
//   │╠╪╗│.│╔╪╣│.│.│.│.│.│.│║│.│.│║│
//   │╚╪╩╪═╪╩╪╝│.│┌┼┐│.│.│.│║│.│.│║│
//   │.│.│.│.│.│.│││││.│.│.│╚╪╗│.│║│
//   │╔╪═╪╦╪═╪╗│.│││││.│.│.│╔╪╝│.│║│
//   │║│.│║│.│║│.│└┼┘│.│.│.│╚╪═╪═╪╝│
//   │╠╪═╪╬╪═╪╣│.│.│.│┌┼┐│.│.│╔╪╦╪╗│
//   │║│.│║│.│║│.│.│┌┼┘│└┼┐│.│╠╪╬╪╣│
//   │╚╪═╪╩╪═╪╝│.│┌┼┘│.│.│└┤.│╚╪╩╪╝│
//   └─┘.└─┘.└─┘.└┴┘.└─┘.└─┘.└─┘.└─┘
// `)
// ^^^^^^ good but more restrictive! ^^^^^^^^

// const template = createTemplate(`
//   ┌─┐.┌─┐.┌─┐.┌─┐.┌┬┐.┌─┐.┌─┐.┌─┐
//   │╔╪═╪╗│╔╪╗│ ├┐│.│││.│.│╔╪╦╪═╪╗│
//   │║│.│╚╪╝│║│.│└┤.├┘│.│.│╠╪╝│.│║│
//   │╠╪╗│.│╔╪╣│.│.│.├─┤.│.│║│.│.│║│
//   │╚╪╩╪═╪╩╪╝│.│┌┼┐│.│.│.│║│.│.│║│
//   │.│.│.│.│.│.│││││.│.│.│╚╪╗│.│║│
//   │╔╪═╪╦╪═╪╗│.│││││.│.│.│╔╪╝│.│║│
//   │║│.│║│.│║│.│└┼┘│.│.│.│╚╪═╪═╪╝│
//   │╠╪═╪╬╪═╪╣│.│.│.│┌┼┐│.│.│╔╪╦╪╗│
//   │║│.│║│.│║│.│.│┌┼┘│└┼┐│.│╠╪╬╪╣│
//   │╚╪═╪╩╪═╪╝│.│┌┼┘│.│.│└┤.│╚╪╩╪╝│
//   └─┘.└─┘.└─┘.└┴┘.└─┘.└─┘.└─┘.└─┘
// `)

// const template = createTemplate(`
//   ┌─┐.┌┬┐.┌─┐.┌┬┐
//   ├┐│.│││.│.│.│└┤
//   │└┤.├┘│.│.│.│.│
//   │.│.├─┤.│.│.│.│
//   │┌┼┐│.│.│.│.│.│
//   │││││.│.│.│.│.│
//   │││││.│.│.│.│.│
//   │└┼┘│.│.│.│.│.│
//   │.│.│┌┼┐│.│.│.│
//   │.│┌┼┘│└┼┐│.├┐│
//   │┌┼┘│.│.│└┤.│││
//   └┴┘.└─┘.└─┘.└┴┘
// `)
// ^^^^^^ really neat figure ground effects! ^^^^^^^^

// const template = createTemplate(`
//   ┌─┐.┌┬┐.┌─┐
//   ├┐│.│││.│.│
//   │└┤.├┘│.│.│
//   │.│.├─┤.│.│
//   │┌┼┐│.│.│.│
//   │││││.│.│.│
//   │││││.│┌┼┐│
//   │└┼┘│┌┼┘├┘│
//   │.│┌┼┘├┐│.│
//   │┌┼┘│.│└┼┐│
//   │││.├┐│.│└┤
//   └┴┘.└┴┘.└─┘
// `)

// const template = createTemplate(`
//   // something based on thermometers!
// `)

// const template = createTemplate(`
//   ●●●●──┐●●●┌●┐
//   ││└┐┌─┘│││└●│
//   ││┌┘└─┐●│└──●
//   ││└┐┌─┘││││││
//   ●●●┘└●●●●●●●●
// `)

// const template = createTemplate(`
//   ◒│◒│◒◑══│◒│
//   ║│║│║──◐│║│
//   ║◓║◓║◑═══╝◓
// `)

// const template = createTemplate(`
//   ▲△
//   △▲
// `)

// http://jrgraphix.net/r/Unicode/2580-259F
// const template = createTemplate(`
//   ▓▒░░
//   ░▓▒▒
//   ▓▒░░
// `)

// const template = createTemplate(`
//   ▚▞
//   ▞▚
// `)

// const template = createTemplate(`
//   ▞▞▞▞▞▞▞▞
//   ▚▞▜▙▚▙▚▚
//   ▞▚▜▙▞▞▞▚
//   ▞▞▞▞▞▞▞▞
// `)

// const template = createTemplate(`
//   ◢◣◤◥
//   ◤◥◢◣
// `)

// const template = createTemplate(`
//   ◢◣◤◥◣◤
//   ◤◥◢◣◢◤
//   ◢◤◥◣◤◥
//   ◤◤◥◥◤◤
// `)

// const template = createTemplate(`
//   →←←→→
//   →←←→→
// `)

// const template = combineTemplates([
//   createTemplate(`
//     ┌─┐.┌─┐.┌─┬┐
//     │.│.│.│.│.││
//     └─┘.└─┘.└─┴┘
//   `),
//   createTemplate(`
//     ┌─┐.┌─┐.┌─┐
//     │╔╪╗│.│╔╪╗│
//     │╚╪╩╪═╪╩╪╝│
//     └─┘.└─┘.└─┘
//   `),
//   createTemplate(`
//     ┌─┐.┌┬┐
//     │.│┌┼┘│
//     │┌┼┘│┌┤
//     └┴┘.└┴┘
//   `),
//   createTemplate(`
//     ┌─┬┐┌┬┐
//     ├┐│└┼┘│
//     │└┼┐│┌┤
//     └─┘└┴┴┘
//   `),
// ])


// const template = createTemplate(`
//  │─│─│─│─│
//  │╭*╮│╭*╮│
//  │*│*│*│*│
//  │╰*╯│╰*╯│
//  │─│─│─│─│
//  │─│─│─│─│
//  │╭*╮│╭*╮│
//  │*│*│*│*│
//  │*│*│*│*│
//  │╰*╯│╰*╯│
//  │─│─│─│─│
// `)

// const template = combineTemplates([
//   createTemplate(`
//   ╔╗╔╗╔╗╔══╗
//   ║╚╝╚╝║╚╗╔╝
//   ║╔╗╔╗║╔╝╚╗
//   ╚╝╚╝╚╝╚══╝
//   `)
// ])

// const template = combineTemplates([
//   createTemplate(`
//   ╔╗╔╗
//   ║╚╝║
//   ║╔╗║
//   ╚╝╚╝
//   `),
//   createTemplate(`
//   ╔══╗
//   ╚╗╔╝
//   ╔╝╚╗
//   ╚══╝
//   `)
// ])

// const template = createTemplate(`
//    ([][][][])
//    (][][==][)
//    ([][][][])
// `)

// const template = createTemplate(`
//    <><>||<><>
//    <===||===>
//    <><>||<><>
//    <><>--<><>
//    <><>||<><>
// `)

// const template = createTemplate(`
//    |[][][][]|
//    |][][==][|
//    |[][][][]|
// `)

// const template = createTemplate(`
//   ╱╱╱╱╱╱╲╲╱╱╲╲╲╱
//   ╱╱╱╲╲╱╲╲╱╱╲╲╲╱
//   ╱╱╱╱╱╲╲╲╱• ╲╲╱
//   ╱╱╱╱╲╱╲╲╱╲╱╱╱╱
//   ╱╱╱╱╲╱╲╲╱╲╱╱╱╱
// `)

// const template = createTemplate(`
//   ╱╱╱╱╱╱╲╲╱╱╲╲╲╱
//   ╱╱╱╲╲╱╲╲╱╲╱╲╱
// `)

// const template = createTemplate(`
//   ╱╱╲╲╱╱╲╲╱
//   ╲╱╲╲╱╲╱╱╲
// `)

// const template = createTemplate(`
//   A-A
//   -AA
// `)

const final = combineTemplates([template])

const t = draw(final, 20, 20)

logTemplate(t)

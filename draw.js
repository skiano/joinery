const { draw, createTemplate, logTemplate } = require('./main')

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

const template = createTemplate(`
  ╭╮╭╮╭╮╭╮
  ╰╯││╰╯││
  ╭╮││╭╮││
  ╰╯╰╯╰╯╰╯
`)

// const template = createTemplate(`
//   ╭╮╭╮╭╮╭──╮╭──╮
//   ╰╯││╰╯╰──╯╰╮╭╯
//   ╭╮││╭╮╭──╮╭╯╰╮
//   ╰╯╰╯╰╯╰──╯╰──╯
// `)

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
//   ╳╲╱╳╱╱╳╲╲╳╱╱╲╲╲╲
//   ╳╲╱╳╲╲╳╲╲╳╱╱╲╲╲╲
//   ╲╲╱╱╱╱╲╲╲╳╱. ╲╲╲
//   ╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱
//   ╲╲╱╱╱╲╱╲╲╳╱╲╱╱╱╱
// `)

// const template = createTemplate(`
//   ╔══╗╔╗╔╦╗╔╦╗
//   ║╔╗║║║╠╬╣║║║
//   ╚╝║║╚╝╚╩╝╠╬╣
//   ╔═╝║╔╗╔╦╗╠╬╣
//   ╚══╝╚╝╚╩╝╚╩╝
// `)

// const template = createTemplate(`
//   ╔══╗╔╗╔╦╗╔╦╗╔═╦═╗╔═══╗╔═╦═╗
//   ║╔╗║║║╠╬╣║║║╠═╬═╣║ • ║║ ║ ║
//   ╚╝║║╚╝╚╩╝╠╬╣╚═╩═╝╚═══╝╚═╩═╝
//   ╔═╝║╔╗╔╦╗╠╬╣╔═╦═══╦╦═╗╔═╦╦╗
//   ╚══╝╚╝╚╩╝╚╩╝╚═╩═══╩╩═╝╚═╝╚╝
// `)

// const template = createTemplate(`
//   .>-║╱╲╱╲╱║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
//   -.>║═════║-.>-.>
//   .>-║═════║.>-.>-
//   >-.║╱╲╱╲╱║>-.>-.
// `)

const t = draw(template, 120, 50)

logTemplate(t)
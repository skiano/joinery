const joinery = require('./index')

const joint = joinery(`
  ABA
  BAB
`)

console.log(joint.ids)

joint.compose(20, 10)
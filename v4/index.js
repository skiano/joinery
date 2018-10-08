const createRules = require('./createRules');
const createField = require('./createField');

const examples = [];

examples.push(`
  ABA
  AFA
  BAB
`);

examples.push(`
  +-
  -+
`);

const rules = createRules(examples);
const field = createField();

// console.log('' + field);

console.log(rules.isValidColor(field[0], 'F'))

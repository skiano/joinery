const floodFill = require('./floodFill');
const createRules = require('./createRules');
const createField = require('./createField');
const createStack = require('./createStack');
const createQueue = require('./createQueue');

function shuffle(array) {
  let m = array.length
  let t
  let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

const rules = createRules(`
  ╭──╮╭╮╭╮╭╮╭──╮╭──╮
  ╰╮╭╯╰╯││╰╯╰──╯╰╮╭╯
  ╭╯╰╮╭╮││╭╮╭──╮╭╯╰╮
  ╰──╯╰╯╰╯╰╯╰──╯╰──╯
`);

const BG = '+';
const field = createField({ width: 30, height: 16 });
const filling = createStack();
const priority = [];

field[(30 * 4) + 8].color = ' ';
field[(30 * 4) + 9].color = ' ';
field[(30 * 4) + 10].color = ' ';
field[(30 * 4) + 11].color = ' ';
field[(30 * 4) + 12].color = ' ';
field[(30 * 4) + 13].color = ' ';

field[(30 * 5) + 8].color = ' ';
field[(30 * 5) + 13].color = ' ';

field[(30 * 6) + 8].color = ' ';
field[(30 * 6) + 13].color = ' ';

field[(30 * 7) + 8].color = ' ';
field[(30 * 7) + 13].color = ' ';

field[(30 * 8) + 8].color = ' ';
field[(30 * 8) + 13].color = ' ';

field[(30 * 9) + 8].color = ' ';
field[(30 * 9) + 9].color = ' ';
field[(30 * 9) + 10].color = ' ';
field[(30 * 9) + 11].color = ' ';
field[(30 * 9) + 12].color = ' ';
field[(30 * 9) + 13].color = ' ';


floodFill(field, '.', BG, (n) => { priority.push(n); });

const getPossibleNodeColors = (node) => {
  return shuffle(rules.getColors())
    .filter(c => rules.isValidColor(node, c, BG));
}

filling.push(getPossibleNodeColors(priority[0]));

let max = 1000000 * 50;
let c = 0
let m = 0

while (filling.length() > 0 && filling.length() < priority.length && max--) {
  const stackSize = filling.length();
  const workingNode = priority[stackSize - 1];
  const proposedColor = filling.peek().pop();

  if (!proposedColor) {
    workingNode.color = BG;
    filling.pop();
  } else if (rules.isValidColor(workingNode, proposedColor, BG)) {
    workingNode.color = proposedColor;
    filling.push(getPossibleNodeColors(priority[stackSize]));
  }

  if (stackSize > m) {
    console.log('\n\n' + c + '\n\n' + field);
    m = stackSize;
  }

  if (c % 1000000 === 0) {
    console.log('\n\nstalled \n\n' + field);
  }

  c += 1;
}

const stackSize = filling.length();
const workingNode = priority[stackSize - 1];
const proposedColor = filling.peek().pop();
workingNode.color = proposedColor;


console.log('\n\ntotal', c, '\n')

console.log('' + field, '\n\n');

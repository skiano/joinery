const createField = require('./createCanvas');
const createStack = require('./util/createStack');
const floodFill = require('./floodFill');
const stack = createStack('./util');

// function shuffle(array) {
//   let m = array.length
//   let t
//   let i
//   while (m) {
//     i = Math.floor(Math.random() * m--)
//     t = array[m]
//     array[m] = array[i]
//     array[i] = t
//   }
//   return array
// }
//
// const options = [1, 2, 3, 4];
//
// stack.push(shuffle(options));
//
// while (stack.length() && stack.length() < 10) {
//   const top = stack.peek();
//
//   if (top.length) {
//     // if there are still options
//     // go ahead and push the next task
//     stack.push(shuffle(options));
//   } else {
//     // otherwise, time to backtrace
//     const prev = stack.pop();
//     if (prev) prev.pop();
//   }
// }
//
// // console.log(stack.toArray());

// const c = createField({
//   width: 100,
//   height: 100,
// });
//
// console.log(c.toString());
//
// const t = `
//   ABC
//   CDE
// `;

const getValidNeighbors = (template) => {
  const grid = template.trim().split('\n').map(l => l.trim().split(''));
  const field = createField(grid);

  const rules = {};

  let cell = field[0];
  while(cell) {
    if (!rules[cell.color]) {
      rules[cell.color] = cell.neighbors.map(_ => ({}));
    }

    cell.neighbors.forEach((getNeighbor, direction) => {
      const neighbor = getNeighbor();
      const neighborColor = neighbor ? neighbor.color : 'VOID';
      rules[cell.color][direction][neighborColor] = true;
    });

    cell = cell.next();
  }

  return rules;
}

const n = getValidNeighbors(`
  ABCG
  ABCG
  DEFG
  DFGH
`);

console.log(n);

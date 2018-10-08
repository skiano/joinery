const createField = require('./createField');
const { VOID } = require('./constants');

module.exports = function createNeigborMap(template) {
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
      const neighborColor = neighbor ? neighbor.color : VOID;
      rules[cell.color][direction][neighborColor] = true;
    });

    cell = cell.next();
  }

  return rules;
};

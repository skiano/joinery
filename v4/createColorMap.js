const createField = require('./createField');
const { VOID } = require('./constants');

module.exports = function createNeigborMap(template) {
  if (Array.isArray(template)) {
    return template.map(createNeigborMap).reduce((merged, t) => {
      for (let k in t) {
        merged[k] = merged[k]
          ? merged[k].map((d, i) => Object.assign(d, t[k][i]))
          : t[k]
          ;
      }
      return merged;
    }, {});
  }


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

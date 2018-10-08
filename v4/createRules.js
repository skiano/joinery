const deepmerge = require('deepmerge');
const constants = require('./constants');
const createColorMap = require('./createColorMap');

module.exports = function createRules(templates) {
  const rules = Array.isArray(templates)
    ? deepmerge.all(templates.map(createColorMap))
    : createColorMap(templates)
    ;

  const colors = Object.keys(rules);

  console.log(rules);

  return {
    getColors: () => colors,
    isValidColor: (node, proposedColor, background = '.') => {
      if (!rules[proposedColor]) return true;

      return node.neighbors.every((getNeighbor, direction) => {
        const neighbor = getNeighbor();
        const neighborColor = neighbor
          ? neighbor.color
          : constants.VOID
          ;

        console.log(neighborColor, rules[proposedColor][direction][neighborColor])

        return neighborColor === background
          ? true
          : !!rules[proposedColor][direction][neighborColor]
          ;
      });
    }
  };
};

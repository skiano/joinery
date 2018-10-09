const deepmerge = require('deepmerge');
const constants = require('./constants');
const createColorMap = require('./createColorMap');

module.exports = function createRules(templates) {
  const rules = createColorMap(templates);

  const colors = Object.keys(rules);

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

        return neighborColor === background
          ? true
          : !!rules[proposedColor][direction][neighborColor]
          ;
      });
    }
  };
};

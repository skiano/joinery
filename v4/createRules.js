const deepmerge = require('deepmerge');
const constants = require('./constants');
const createColorMap = require('./createColorMap');

module.exports = function createRules(templates) {
  const rules = createColorMap(templates);

  const colors = Object.keys(rules);

  return {
    getColors: () => colors.slice(),
    isValidColor: (node, proposedColor, background = '.') => {
      if (typeof proposedColor === 'undefined') return false;
      if (!rules[proposedColor]) return true;

      // a neighborColor must be void background or in the rule set

      return node.neighbors.every((getNeighbor, direction) => {
        const neighbor = getNeighbor();

        let neighborColor = neighbor && neighbor.color;

        if (neighborColor === background) return true

        if (!rules[neighborColor]) {
          neighborColor = constants.VOID;
        }

        return !!rules[proposedColor][direction][neighborColor];
      });
    }
  };
};

const createQueue = require('./util/createQueue');

module.exports = function floodFill(
  field,
  targetColor,
  replacementColor,
  maxIterations = Infinity
) {
  if (targetColor === replacementColor) return;

  let node = field[0];

  while (node.color !== targetColor) {
    node = node.next();
  }

  if (!node) return;

  const q = createQueue();

  node.color = replacementColor;
  q.add(node);

  while (q.length() && Infinity--) {
    const n = q.remove();

    let neighbor;
    for (let d in n.move) {
      neighbor = n.move[d]();
      if (neighbor && (neighbor.color === targetColor)) {
        neighbor.color = replacementColor;
        q.add(neighbor);
      }
    }
  }

  return;
}

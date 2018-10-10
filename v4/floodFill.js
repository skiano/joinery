const createQueue = require('./createQueue');

module.exports = function floodFill(
  field,
  targetColor,
  replacementColor,
  onFill
) {
  if (targetColor === replacementColor) return;

  let node = field[0];

  while (node.color !== targetColor) {
    node = node.next();
  }

  if (!node) return;

  const q = createQueue();

  node.color = replacementColor;
  q.enqueue(node);
  if (onFill) onFill(node);

  while (q.length()) {
    const n = q.dequeue();

    let neighbor;

    n.neighbors.forEach((getNeighbor) => {
      neighbor = getNeighbor();
      if (neighbor && (neighbor.color === targetColor)) {
        neighbor.color = replacementColor;
        q.enqueue(neighbor);
        if (onFill) onFill(neighbor);
      }
    });
  }

  return;
}

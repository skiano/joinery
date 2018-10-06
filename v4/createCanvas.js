module.exports = function createCanvas(options) {
  options = Object.assign({
    width: 40,
    height: 20,
    background: '.',
  }, options);

  const { width, height, background } = options;
  const area = width * height;
  const nodes = new Array(area);

  for (let i = 0; i < area; i += 1) {
    const p = i;
    const x = p % width;

    nodes[p] = {
      color: background,
      move: {
        // TODO: add corners
        north: () => nodes[p - width],
        south: () => nodes[p + width],
        east:  () => p + 1 < width ? nodes[p + 1] : undefined,
        west:  () => x > 0 ? nodes[p - 1] : undefined
      },
      index: () => p,
      next: () => nodes[p + 1],
      prev: () => nodes[p - 1],
    };
  }

  nodes.toString = () => {
    let str = '';
    for (let i = 0; i < nodes.length; i += 1) {
      const x = i % width;
      if (x === 0) str += '\n';
      str += nodes[i].color;
    }
    return str.trim();
  }

  return nodes;
}

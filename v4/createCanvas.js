module.exports = function createCanvas(options) {
  let width;
  let height;
  let background;

  if (Array.isArray(options)) {
    background = options;
    width = options[0].length;
    height = options.length;
  } else {
    background = options.background || '.';
    width = options.width || 20;
    height = options.height || 20;
  }

  const area = width * height;
  const nodes = new Array(area);

  for (let i = 0; i < area; i += 1) {
    const p = i;
    const x = p % width;
    const y = (p / width) >> 0;

    nodes[p] = {
      color: Array.isArray(background) ? background[y][x] : background,
      neighbors: [
        /* NORTH */ () => nodes[p - width],
        /* EAST  */ () => p + 1 < width ? nodes[p + 1] : undefined,
        /* SOUTH */ () => nodes[p + width],
        /* West  */ () => x > 0 ? nodes[p - 1] : undefined
      ],
      index: () => p,
      coord: () => [x, y],
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

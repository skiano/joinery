const createQueue = require('./createQueue');

function createNodes(template) {
  let width;

  const flat = template.trim().split('\n')
    .map(l => {
      const line = l.trim()
      width = line.length;
      return line
    })
    .join('');

  const nodes = new Array(flat.length);

  for (let i = 0; i < flat.length; i += 1) {
    const p = i;
    const x = p % width;

    nodes[p] = {
      color: flat[p],
      index: () => p,
      north: () => nodes[p - width],
      south: () => nodes[p + width],
      east:  () => p + 1 < width ? nodes[p + 1] : undefined,
      west:  () => x > 0 ? nodes[p - 1] : undefined
    }
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

function floodFill(node, targetColor, replacementColor, nodes) {
  if (targetColor === replacementColor) return;
  if (node.color !== targetColor) return;

  const directions = 'south0east0north0west'.split(0);

  let maxI = 3000;

  const q = createQueue();

  node.color = replacementColor;
  q.add(node);

  while (q.length() && maxI--) {
    const n = q.remove();

    directions.forEach((d) => {
      const neighbor = n[d]();
      if (neighbor && (neighbor.color === targetColor)) {
        neighbor.color = replacementColor;
        q.add(neighbor);
      }
    });

    console.log(nodes.toString(), '\n');
  }

  return;
}


const nodes = createNodes(`
  ...........................
  ..X..X.....X..X.....X..X...
  ...........................
  ..X..X....XXxxXx....X..X...
  ......xxxx.....x...........
  ......x........x...........
  ......xxxxxxxxxx...........
  ...........................
  ...........................
`);

floodFill(nodes[12], '.', '+', nodes);

// console.log(nodes.toString());


// const q = createQueue();
//
// q.add(1);
// q.add(2);
// q.add(3);
//
// console.log(q.remove(), q.length());
// console.log(q.remove(), q.length());
// console.log(q.remove(), q.length());
// console.log(q.remove(), q.length());

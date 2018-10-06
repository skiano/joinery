module.exports = function meander(node, color) {
  do {
    node.color = color;
    node = node.move.south();
  } while (node)
}

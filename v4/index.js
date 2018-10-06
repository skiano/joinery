const createField = require('./createCanvas');
const meander = require('./meander');
const floodFill = require('./floodFill');

const field = createField({
  width: 60,
});

meander(field[220], '+');
meander(field[150], '-');

floodFill(field, '.', '/');

console.log(field.toString());

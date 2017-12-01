const template = Array.from(new Array(10000)).map(v => 'v').join('')


const final = []
template.split('').map(v => final.push(v))


const finalB = []
for (let i = 0; i < template.length; i += 1) {
  finalB.push(template.charAt(i))
}


console.log(finalB)
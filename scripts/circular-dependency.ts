const madge = require('madge');

madge('./src/main.ts').then((res) => {
console.log(res.circularGraph());});
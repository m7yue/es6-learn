var mod = require('./lib');

console.log(mod.counter);  // 3
console.log(mod.counter1);  // 3
console.log(mod.counterObj); // { counter: 3 }
mod.incCounter();
console.log(mod.counter); // 3
console.log(mod.counter1); // 4
console.log(mod.counterObj); // { counter: 4 }
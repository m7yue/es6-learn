var counter = 3;
function incCounter() {
  counter++;
  counterObj.counter++
}
let counterObj = {
  counter
}
module.exports = {
  counter: counter, // 这里输出的是一个值
  incCounter: incCounter,
  get counter1() {
    return counter
  },
  counterObj
};
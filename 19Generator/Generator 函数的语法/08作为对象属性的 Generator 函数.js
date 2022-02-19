// 如果一个对象的属性是 Generator 函数，可以简写成下面的形式。 @I
let obj = {
  * myGeneratorMethod() {
  }
};


// 它的完整形式如下，与上面的写法是等价的。
let obj = {
  myGeneratorMethod: function* () {
  }
};
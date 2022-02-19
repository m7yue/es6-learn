// Math.trunc方法用于去除一个数的小数部分，返回整数部分。 truc 翻译 取整 @I
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

// 对于非数值，Math.trunc内部使用Number方法将其先转为数值。
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0

// 对于空值和无法截取整数的值，返回NaN。
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

Math.ceil(-1.7) // -1
Math.floor(-1.7) // -2





// Math.sign()
// Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
  // 它会返回五种值。
  //   参数为正数，返回+1；
  //   参数为负数，返回-1；
  //   参数为 0，返回0；
  //   参数为-0，返回-0;
  //   其他值，返回NaN。

Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // 0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

// 如果参数是非数值，会自动转为数值。对于那些无法转为数值的值，会返回NaN。
Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};



// Math.cbrt()方法用于计算一个数的立方根。 @I
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948732

// 对于非数值，Math.cbrt()方法内部也是先使用Number()方法将其转为数值。
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN

// 对于没有部署这个方法的环境，可以用下面的代码模拟。
Math.cbrt = Math.cbrt || function(x) {
  var y = Math.pow(Math.abs(x), 1/3);
  return x < 0 ? -y : y;
};




// Math.clz32()方法将参数转为 32 位无符号整数的形式，然后返回这个 32 位值里面有多少个前导 0。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

// 左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

// 对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
Math.clz32(3.9) // 30
// 对于空值或其他类型的值，Math.clz32方法会将它们先转为数值，然后再计算。
Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31
Math.clz32(false) // 32








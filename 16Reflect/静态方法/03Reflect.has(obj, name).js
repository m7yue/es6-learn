// Reflect.has方法对应name in obj里面的in运算符。
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true


// 如果Reflect.has()方法的第一个参数不是对象，会报错。
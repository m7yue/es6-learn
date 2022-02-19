// Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
function FancyThing(){
  this.fancy = '11'
}

const myObj = new FancyThing();

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype; // true

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype; // true



// Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，
// Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。

Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错
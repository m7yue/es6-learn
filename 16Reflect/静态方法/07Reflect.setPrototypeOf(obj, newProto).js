// Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。

const myObj = {};
// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0

// 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false。
Reflect.setPrototypeOf({}, null)
// true
Reflect.setPrototypeOf(Object.freeze({}), null)
// false


// 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错。
Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object


// 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object
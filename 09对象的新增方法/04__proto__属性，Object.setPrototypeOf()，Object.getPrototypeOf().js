// __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

// __proto__属性
// 标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。
// 因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，
// 而是使用Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。


// Object.setPrototypeOf()  它是 ES6 正式推荐的设置原型对象的方法。  Object.setPrototypeOf(object, prototype)
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40


// 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true


// 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined



// Object.getPrototypeOf()  该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。  Object.getPrototypeOf(obj);
function Rectangle() {
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype // true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype // false
Object.getPrototypeOf(rec) === Object.prototype // true


// 如果参数不是对象，会被自动转为对象。
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true


// 如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object


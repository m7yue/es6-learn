// 应用

// 克隆对象
const obj = { __proto__: Object.getPrototypeOf(obj1), ...obj1 }

// 合并对象
const obj = { ...obj1, ...obj2 }

// 转换字符串为对象
({ ..."hello" })  // {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

// 转换数组为对象
({ ...[1, 2] }) // {0: 1, 1: 2}

// 与对象解构赋值结合 (不能复制继承自原型对象的属性)
const { x, ...rest } = { x: 1, y: 2, z: 3 } // rest: {y: 2, z: 3}

// 修改现有对象部分属性
const obj = { x: 1, ...{ x: 2 } }

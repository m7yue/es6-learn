// ES2020 引入了“链判断运算符”（optional chaining operator）?.
const firstName = message?.body?.user?.firstName || 'default';
// 上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

// 下面是判断对象方法是否存在，如果存在就立即执行的例子。
iterator.return?.()


// 链判断运算符有三种用法。
  obj?.prop // 对象属性
  obj?.[expr] // 同上
  func?.(...args) // 函数或对象方法的调用

// 下面是?.运算符常见形式，以及不使用该运算符时的等价形式。
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x] // @I
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()


// 使用这个运算符，有几个注意点。
  // （1）短路机制   ?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
  //   a?.[++x]
  //   // 等同于
  //   a == null ? undefined : a[++x]
  //   上面代码中，如果a是undefined或null，那么x不会进行递增运算。也就是说，链判断运算符一旦为真，右侧的表达式就不再求值。

  // （2）delete 运算符
  //   delete a?.b
  //   // 等同于
  //   a == null ? undefined : delete a.b
  //   如果a是undefined或null，会直接返回undefined，而不会进行delete运算。

  // （3）括号的影响   如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。
  // (a?.b).c
  // // 等价于
  // (a == null ? undefined : a.b).c
  // 上面代码中，?.对圆括号外部没有影响，不管a对象是否存在，圆括号后面的.c总是会执行。 一般来说，使用?.运算符的场合，不应该使用圆括号。

  // （4）报错场合
    // 以下写法是禁止的，会报错。
    // // 构造函数
    // new a?.()
    // new a?.b()

    // // 链判断运算符的右侧有模板字符串
    // a?.`{b}`
    // a?.b`{c}`

    // // 链判断运算符的左侧是 super
    // super?.()
    // super?.foo

    // // 链运算符用于赋值运算符左侧
    // a?.b = c

    // （5）右侧不得为十进制数值
    // 为了保证兼容以前的代码，允许foo?.3:0被解析成foo ? .3 : 0，因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个
    // 完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。
// 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。
class IncreasingCounter {
  _count = 0; // 不是在prototype上
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
// 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

// 写在顶部不是必须的
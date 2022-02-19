// WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。

// 作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。
// （实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}


// WeakSet 结构有以下三个方法。
  // WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
  // WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
  // WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。


  const ws = new WeakSet();
  const obj = {};
  const foo = {};
  
  ws.add(window);
  ws.add(obj);
  
  ws.has(window); // true
  ws.has(foo);    // false
  
  ws.delete(window);
  ws.has(window);    // false


// WeakSet 没有size属性，没有办法遍历它的成员。


// WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。



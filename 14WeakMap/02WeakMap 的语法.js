// WeakMap 与 Map 在 API 上的区别主要是两个，
//   一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
//   二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

const wm = new WeakMap();
// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined



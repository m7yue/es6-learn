// sort()稳定性

// 早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。
// ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。


// flat()：扁平化数组，返回新数组

// 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

// flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

// 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

// 如果原数组有空位，flat()方法会跳过空位。
// [1, 2, , 4, 5].flat()
// [1, 2, 4, 5]


// flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
// 实现任意层级嵌套转为一维数组
function noCallee(x){
  return Array.isArray(x)?x.flatMap(noCallee):x
}
[2, [[[3]],7], [[[[4]]],5]].flatMap(noCallee)
// [2, [[[3]],7], [[[[4]]],5]].flatMap(function(x){ 
//   return Array.isArray(x)?x.flatMap(arguments.callee):x
// })
// [2, 3, 7, 4, 5]

// flatMap()只能展开一层数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]


// flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
  // arr.flatMap(function callback(currentValue[, index[, array]]) {
  //   // ...
  // }[, thisArg])
// flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。
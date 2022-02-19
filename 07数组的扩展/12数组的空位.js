// 数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
Array(3) // [, , ,]

// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
// 上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。

// ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
  // forEach(), filter(), reduce(), every() 和some()都会跳过空位。
  // map()会跳过空位，但会保留这个值
  // join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
  /*       
    //forEach方法
    [,'a'].forEach((x,i) => console.log(i)); // 1

    // filter方法
    ['a',,'b'].filter(x => true) // ['a','b']

    // every方法
    [,'a'].every(x => x==='a') // true

    // reduce方法
    [1,,2].reduce((x,y) => x+y) // 3

    // some方法
    [,'a'].some(x => x !== 'a') // false

    // map方法
    [,'a'].map(x => 1) // [,1]

    // join方法
    [,'a',undefined,null].join('#') // "#a##"

    // toString方法
    [,'a',undefined,null].toString() // ",a,," 
  */


//  ES6 则是明确将空位转为undefined。 @I
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b']) // [ "a", undefined, "b" ]

// 扩展运算符（...）也会将空位转为undefined。
([...['a',,'b']])  // [ "a", undefined, "b" ]


// copyWithin()会连空位一起拷贝。
([,'a','b',,].copyWithin(2,0)) // [,"a",,"a"]

// fill()会将空位视为正常的数组位置。
new Array(3).fill('a') // ["a","a","a"]

// for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1


// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
([...[,'a'].keys()]) // [0,1]

// values()
([...[,'a'].values()]) // [undefined,"a"]

// find()
([,'a'].find(x => true)) // undefined

// findIndex()
([,'a'].findIndex(x => true)) // 0

// 由于空位的处理规则非常不统一，所以建议避免出现空位。
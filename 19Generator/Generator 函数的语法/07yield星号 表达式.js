// ES6 提供了yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* foo() {
  yield 'a';
  yield 'b';
}
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 等同于 @I
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"


// 如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
function* gen(){
  yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }


// 任何数据结构只要有 Iterator 接口，就可以被yield*遍历。
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value // "hello"
read.next().value // "h"


// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。@I
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next()
// {value: undefined, done: true}

// 再看一个例子。 @I
  function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
  }
  function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
  }

  [...logReturned(genFuncWithReturn())]
// The result
// 值为 [ 'a', 'b' ]



// yield*命令可以很方便地取出嵌套数组的所有成员。 @III
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
// 由于扩展运算符...默认调用 Iterator 接口，所以上面这个函数也可以用于嵌套数组的平铺。
[...iterTree(tree)] // ["a", "b", "c", "d", "e"]


// 使用yield*语句遍历完全二叉树。  @IIII
      // 下面是二叉树的构造函数，
      // 三个参数分别是左树、当前节点和右树
      function Tree(left, label, right) {
        this.left = left;
        this.label = label;
        this.right = right;
      }

      // 下面是中序（inorder）遍历函数。
      // 由于返回的是一个遍历器，所以要用generator函数。
      // 函数体内采用递归算法，所以左树和右树要用yield*遍历
      function* inorder(t) {
        if (t) {
          yield* inorder(t.left);
          yield t.label;
          yield* inorder(t.right);
        }
      }

      // 下面生成二叉树
      function make(array) {
        // 判断是否为叶节点
        if (array.length == 1) return new Tree(null, array[0], null);
        return new Tree(make(array[0]), array[1], make(array[2]));
      }
      let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

      // 遍历二叉树
      var result = [];
      for (let node of inorder(tree)) {
        result.push(node);
      }

      result
      // ['a', 'b', 'c', 'd', 'e', 'f', 'g']


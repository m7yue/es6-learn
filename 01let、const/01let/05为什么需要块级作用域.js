var tmp = new Date();

function f() {
  console.log(tmp); // 变量提升
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5     for 循环结束后 i成了全局变量


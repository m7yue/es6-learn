// 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// "3"


// 模板字符串之中还能调用函数。@I
function fn() {
  return "Hello World";
}

`foo ${fn()} bar` 
// foo Hello World bar


// 如果模板字符串中的变量没有声明，将报错。
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错


// 如果大括号内部是一个字符串，将会原样输出。
`Hello ${'World'}`
// "Hello World"


// 模板字符串甚至还能嵌套。@I
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data = [
  { first: '<Jane>', last: 'Bond' },
  { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
/* 
<table>
  <tr><td><Jane></td></tr>
  <tr><td>Bond</td></tr>
  <tr><td>Lars</td></tr>
  <tr><td><Croft></td></tr>
</table> 
*/
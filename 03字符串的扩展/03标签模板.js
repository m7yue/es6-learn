// @I 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

// 但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。
let a = 5;
let b = 10;

function tag (...args){
  console.log(args)
}

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于  tag(['Hello ', ' world ', ''], 15, 50);



// “标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  console.log(s) //  <p>
  console.log(templateData) // ["<p>", " has sent you a message.</p>", raw: Array(2)]
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    s += templateData[i];
  }
  return s;
}
let sender = '<script>alert("abc")</script>'; // 恶意代码
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;
// <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
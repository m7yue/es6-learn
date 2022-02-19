let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;
// 将模板编译成 可执行的 javascript 字符串
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';
  console.log(template)

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;
  console.log(script)

  return script;
}

let parse = eval(compile(template)); // 得到 render 函数   也可以使用 new Function(code) 替代eval
console.log(parse)
parse({ supplies: [ "broom", "mop", "cleaner" ] })

// eval() 对比 new Function()
// 使用 new Function() 运行代码比 eval() 更为好一些：函数的参数提供了清晰的接口来运行代码，而没有必要使用较为笨拙的语法来间接的调用 eval() 确保代码只能访问自己的和全局的变量。

// eval中的代码执行时的作用域为当前作用域。它可以访问到函数中的局部变量。
// new Function中的代码执行时的作用域为全局作用域，不论它的在哪个地方调用的，它访问的都是全局变量。


// Vue中进行模板编译的时候，最终会将模板编译成一段可执行JS字符串，然后传递给new Function生成渲染函数，渲染(挂载)的时候，执行这个渲染函数拿到对应的虚拟DOM节点，如:

// template模板
'<div id="app" style="color: red;background: blue;"><p>hello {{name}}</p>{{msg}}</div>'

// 解析模板生成一段字符串,即渲染函数要执行的字符串
let code = _c("div", {id: "app",style: {"color":" red","background":" blue"}},_c("p", undefined,_v("hello"+_s(name))),_v(_s(msg)))

// 将渲染函数要执行的字符串传入new Function()生成渲染函数
let renderFn = new Function(`with(this) {return ${code}}`);
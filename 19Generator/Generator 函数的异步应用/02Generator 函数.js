// 协程有点像函数，又有点像线程。它的运行流程大致如下。

// 第一步，协程A开始执行。 （函数A执行）
// 第二步，协程A执行到一半，进入暂停，执行权转移到协程B。 （函数A执行到一半 yield, B next()）
// 第三步，（一段时间后）协程B交还执行权。 (B yield)
// 第四步，协程A恢复执行。(A next())  done 判断每个协程是否还有任务要执行


// 异步任务的封装 
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();
result.value.then(function(data){ // result.value: fetch 返回的Promsie
  return data.json();
}).then(function(data){
  g.next(data);
});
// Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。

// （1）异步操作的同步化表达
  // Generator 函数的暂停执行的效果，意味着可以把异步操作写在yield表达式里面，等到调用next方法时再往后执行。
  // 这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield表达式下面，反正要等到调用next方法时再执行。
  // 所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

  function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
  }
  var loader = loadUI();
  // 加载UI
  loader.next()
  
  // 卸载UI
  loader.next()


  // Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。
  function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
      console.log(resp.value);
  }
  function request(url) {
    makeAjaxCall(url, function(response){
      it.next(response);
    });
  }
  var it = main();
  it.next();


  // 通过 Generator 函数逐行读取文本文件。
  function* numbers() {
    let file = new FileReader("numbers.txt");
    try {
      while(!file.eof) {
        yield parseInt(file.readLine(), 10);
      }
    } finally {
      file.close();
    }
  }


// （2）控制流管理
// 如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。
  step1(function (value1) {
    step2(value1, function(value2) {
      step3(value2, function(value3) {
        step4(value3, function(value4) {
          // Do something with value4
        });
      });
    });
  });

  // 采用 Promise 改写上面的代码。
  Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
      // Do something with value4
    }, function (error) {
      // Handle any error from step1 through step4
    })
    .done();

  // 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。
  function* longRunningTask(value1) {
    try {
      var value2 = yield step1(value1);
      var value3 = yield step2(value2);
      var value4 = yield step3(value3);
      var value5 = yield step4(value4);
      // Do something with value4
    } catch (e) {
      // Handle any error from step1 through step4
    }
  }
  // 然后，使用一个函数，按次序自动执行所有步骤。
  scheduler(longRunningTask(initialValue));

  function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
      task.value = taskObj.value
      scheduler(task);
    }
  }
  // 上面这种做法，只适合同步操作，即所有的task都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。


  // 利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。
  let steps = [step1Func, step2Func, step3Func];
  function* iterateSteps(steps){
    for (var i=0; i< steps.length; i++){
      var step = steps[i];
      yield step();
    }
  }


// （3）部署 Iterator 接口
  // 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
  function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i=0; i < keys.length; i++) {
      let key = keys[i];
      yield [key, obj[key]];
    }
  }

  let myObj = { foo: 3, bar: 7 };

  for (let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
  }

  // foo 3
  // bar 7




// （4）作为数据结构
// Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
// 上面代码就是依次返回三个函数，但是由于使用了 Generator 函数，导致可以像处理数组那样，处理这三个返回的函数。
for (task of doStuff()) {
  // task是一个函数，可以像回调函数那样使用它
}
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  var a = 1;
  let a = 10;
}


// 报错
function func() {
  let a = 10;
  let a = 1;
}


function func(arg) {
  let arg;
}
func() // 报错


// 不报错
function func(arg) {
  {
    let arg;
    arg=1
    console.log(arg)
  }
  console.log(arg)
}
func(2) 
// 1
// 2
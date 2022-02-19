// JavaScript 的管道是一个运算符，写作|>。它的左边是一个表达式，右边是一个函数。管道运算符把左边表达式的值，传入右边的函数进行求值。

// 管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。

function doubleSay (str) {
  return str + ", " + str;
}

function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1);
}

function exclaim (str) {
  return str + '!';
}

// 传统的写法和管道的写法分别如下。
// 传统的写法
exclaim(capitalize(doubleSay('hello')))
// "Hello, hello!"

// 管道的写法
  // 'hello'
  //   |> doubleSay
  //   |> capitalizes
  //   |> exclaim
  // // "Hello, hello!"

// 管道运算符对于await函数也适用。
  // x |> await f
  // // 等同于
  // await f(x)

  // const userAge = userId |> await fetchUserById |> getAgeFromUser;
  // // 等同于
  // const userAge = getAgeFromUser(await fetchUserById(userId));


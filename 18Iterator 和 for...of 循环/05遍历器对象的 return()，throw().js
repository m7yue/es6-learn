// 遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。

// return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），
// 就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。

function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
// 函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next方法，还部署了return方法。下面的两种情况，都会触发执行return方法。
// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
// 情况一输出文件的第一行以后，就会执行return方法，关闭这个文件；情况二会在执行return方法关闭文件之后，再抛出错误。


// return方法必须返回一个对象，这是 Generator 规格决定的。

// throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

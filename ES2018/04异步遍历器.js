// 一个对象的同步遍历器的接口，部署在Symbol.iterator属性上面。同样地，对象的异步遍历器接口，部署在Symbol.asyncIterator
// 属性上面。不管是什么样的对象，只要它的Symbol.asyncIterator属性有值，就表示应该对它进行异步遍历。

const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

asyncIterator
.next()
.then(iterResult1 => {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
})
.then(iterResult2 => {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
})
.then(iterResult3 => {
  console.log(iterResult3); // { value: undefined, done: true }
});


// 由于异步遍历器的next方法，返回的是一个 Promise 对象。因此，可以把它放在await命令后面。

async function f() {
  const asyncIterable = createAsyncIterable(['a', 'b']);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  console.log(await asyncIterator.next());
  // { value: 'a', done: false }
  console.log(await asyncIterator.next());
  // { value: 'b', done: false }
  console.log(await asyncIterator.next());
  // { value: undefined, done: true }
}



// for await...of  用于遍历异步的 Iterator 接口。 @I
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}
// a
// b

/**
 *
 *
/**
 *
 *
/**
 *
 *
/**
 *
 *
 */
async function a() {
  try {
    for await (const x of createRejectingIterable()) {
      console.log(x);
    }
  } catch (e) {
    console.error(e);
  }
}


// for await...of循环也可以用于同步遍历器。
(async function () {
  for await (const x of ['a', 'b']) {
    console.log(x);
  }
})();
// a
// b



// Node v10 支持异步遍历器，Stream 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。
// 传统写法
function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  );
  readStream.on('data', (chunk) => {
    console.log('>>> '+chunk);
  });
  readStream.on('end', () => {
    console.log('### DONE ###');
  });
}

// 异步遍历器写法
async function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  );

  for await (const chunk of readStream) {
    console.log('>>> '+chunk);
  }
  console.log('### DONE ###');
}




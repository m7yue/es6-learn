function clownsEverywhere(
  param1,
  param2,
) { console.log([...arguments]) }

clownsEverywhere(
  'foo',
  'bar',
);


// 这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
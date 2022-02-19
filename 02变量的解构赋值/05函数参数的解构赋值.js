function add([x, y]){
  return x + y;
}
add([1, 2]); // 3


[[1, 2], [3, 4]].map(([a, b]) => a + b);


// 函数参数的解构也可以使用默认值。
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]


function move({x = 0, y = 0}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // 报错
move(0) // [0, 0]
move(false) // [0, 0]
move('') // [0, 0]


// undefined就会触发函数参数的默认值。
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]


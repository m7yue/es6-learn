// Object.getPrototypeOf方法可以用来从子类上获取父类。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
    this.color = color;
  }
}
let y = new ColorPoint()
Object.getPrototypeOf(ColorPoint) === Point
ColorPoint.__proto__ === Point
// true


// 可以使用这个方法判断，一个类是否继承了另一个类。 
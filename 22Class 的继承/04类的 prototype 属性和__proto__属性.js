// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

  // （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

  // （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

  class A {
  }
  
  class B extends A {
  }
  
  B.__proto__ === A // true
  B.prototype.__proto__ === A.prototype // true

  // 类的继承是按照下面的模式实现的。
  class A {
  }
  
  class B {
  }
  
  // B 的实例继承 A 的实例@I
  Object.setPrototypeOf(B.prototype, A.prototype);
  
  // B 继承 A 的静态属性@I
  Object.setPrototypeOf(B, A);
  
  const b = new B();




  // 实例的 __proto__ 属性 
  // 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。
  b.__proto__ == B.prototype // true
  new B().__proto__.__proto__ === new A().__proto__=== A.prototype


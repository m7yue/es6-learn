// isExtensible()方法拦截Object.isExtensible()操作。
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true

// 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。


// 但是不能修改属性本来的值
var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});

Object.isExtensible(p) // 原本事不、不可扩展的 所以报错
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')

var m={}
Object.preventExtensions(m)
var p = new Proxy(m, {
  isExtensible: function(target) {
    console.log("called");
    return false;
  }
});

Object.isExtensible(p) 
// "called"
// false
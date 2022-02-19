// preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
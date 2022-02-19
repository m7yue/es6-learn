// defineProperty()方法拦截了Object.defineProperty()操作。

let handler = {
  get (target,key) {
      console.log('收集依赖')
      //Reflect 反射 这个方法里面包含了很多api
      return Reflect.get(target,key)
  },
  set (target,key,value) {
      console.log('触发更新')
      // target[key] = value //这种写法设置时如果不成功也不会报错 比如这个对象默认不可配置
      Reflect.set(target,key,value)
  }
}

let proxy = new Proxy(obj,handler)
//通过代理后的对象取值和设置值
proxy.arr
proxy.name = '123'


// 注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。
// 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
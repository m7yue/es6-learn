// Promise.any()：将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(全变更再返回)

    // 入参：具有Iterator接口的数据结构
    // 成功：其中一个实例状态变成fulfilled，最终状态就会变成fulfilled
    // 失败：只有全部实例状态变成rejected，最终状态才会变成rejected


//  Promise.try()：不想区分是否同步异步函数，包装函数为实例，使用then()指定下一步流程，使用catch()捕获错误

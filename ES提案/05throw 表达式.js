// 提案，允许throw用于表达式。 @I

// 参数的默认值
    // function save(filename = throw new TypeError("Argument required")) {
    // }

// 箭头函数的返回值
    // lint(ast, {
    //   with: () => throw new Error("avoid using 'with' statements.")
    // });

// 条件表达式
    // function getEncoder(encoding) {
    //   const encoder = encoding === "utf8" ?
    //     new UTF8Encoder() :
    //     encoding === "utf16le" ?
    //       new UTF16Encoder(false) :
    //       encoding === "utf16be" ?
    //         new UTF16Encoder(true) :
    //         throw new Error("Unsupported encoding");
    // }

// 逻辑表达式
// class Product {
//   get id() {
//     return this._id;
//   }
//   set id(value) {
//     this._id = value || throw new Error("Invalid value");
//   }
// }

// 语法上，throw表达式里面的throw不再是一个命令，而是一个运算符。为了避免与throw命令混淆，规定throw出现在 行首，一律解释为throw语句，而不是throw表达式。
throw new Error('111')

throw new Error('111') + 1
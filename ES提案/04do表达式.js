// 现在有一个提案，使得 @I 块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式，然后就会返回内部最后执行的表达式的值。
    // let x = do {
    //   let t = f();
    //   t * t + 1;
    // };


// do表达式在 JSX 语法中非常好用。
  // return (
  //   <nav>
  //     <Home />
  //     {
  //       do {
  //         if (loggedIn) {
  //           <LogoutButton />
  //         } else {
  //           <LoginButton />
  //         }
  //       }
  //     }
  //   </nav>
  // )
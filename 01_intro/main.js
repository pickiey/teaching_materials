console.log('hoge')


//  /*
//  console.log()
//  */
//
//  //// 変数宣言
//
//  // let は 再代入できる 変数 を宣言
//  let a = 2
//  a = 3
//  console.log(a)
//
//  // const は 再代入できない 定数 を宣言
//  const b = 3
//  //b = 4 // エラー
//  console.log(b)
//
//  const c = '文字列もOK'
//  console.log(c)
//
//
//  //// 関数定義
//
//  /*
//  書き方 その1 : 関数宣言
//
//  function 関数の名前 (引数) {
//      処理
//  }
//  */
//
//  function hello1 (x) {
//      console.log(x)
//  }
//
//  const msg1 = '元気ですかー!!!!'
//
//  hello1(msg1)
//
//
//  /*
//  書き方 その2 : 関数式
//
//  const 関数名 = function (引数) {
//      処理
//  }
//  */
//
//
//  const hello2 = function (x, y) {
//      console.log(x)
//      console.log(y)
//  }
//
//  const msg2 = '元気があれば何でもできる!!!',
//        msg3 = 'いくぞー!!!!'
//
//  hello2(msg2, msg3)
//
//
//  /*
//  書き方 その3 : アロー関数
//
//  const 関数名 = (引数) => {
//      処理
//  }
//  */
//
//  const hello3 = () => {
//      for(let i=0; i<3; i++){
//          const msg = String(i+1) + 'ッ!!!'
//          console.log(msg)
//      }
//      console.log('ダァーーー!!!!!!')
//  }
//
//  hello3()
//
//
//  /*
//  タイマー処理
//
//  setTimeout(関数, 待ち時間ミリ秒)
//  */
//
//
//  setTimeout(() => {
//      console.log('1秒経ちました')
//      setTimeout(() => {
//          console.log('2秒経ちました')
//          setTimeout(() => {
//              console.log('3秒経ちました')
//              setTimeout(() => {
//                  console.log('4秒経ちました')
//              }, 1000)
//          }, 1000)
//      }, 1000)
//  }, 1000)
//
//  // 地獄のような分かりにくさ
//  // 俗に言う コールバックヘル
//
//
//
//  // 解決策
//  const wait = function (seconds) {
//      return new Promise(function (resolve) {
//          setTimeout(resolve, seconds * 1000)
//      })
//  }
//
//  wait(1)
//      .then(() => {
//          console.log('1秒経ちました')
//          return wait(1)
//      })
//      .then(() => {
//          console.log('2秒経ちました')
//          return wait(1)
//      })
//      .then(() => {
//          console.log('3秒経ちました')
//          return wait(1)
//      })
//      .then(() => console.log('4秒経ちました'))
//
//
//  // これでさっきの 1･2･3･ダァ を書き換える
//  // for文みたいなのでループ回したかったけど
//  // やりかたよくわかんなかったので やっつけ仕事
//  const hello = () => {
//      wait(1)
//          .then(() => {
//              console.log(msg1)
//              return wait(2)
//          })
//          .then(() => {
//              console.log(msg2)
//              return wait(2)
//          })
//          .then(() => {
//              console.log(msg3)
//              return wait(1)
//          })
//          .then(() => {
//              console.log('1ッ!!!')
//              return wait(1)
//          })
//          .then(() => {
//              console.log('2ッ!!!')
//              return wait(1)
//          })
//          .then(() => {
//              console.log('3ッ!!!')
//              return wait(1)
//          })
//          .then(() => console.log('ダァーーー!!!!!!'))
//
//  }
//
//  hello()
//
//
//
//  /*
//      DOM要素の操作
//
//      クリックしたら
//      要素を追加して 色を変える
//  */
//
//  const target = document.getElementById("box")
//  console.log(target)
//
//  target.onclick = () => {
//      target.innerHTML = 'ダァーーー!!!!!!'
//      target.style.color="white";
//      target.style.backgroundColor="blue";
//  }



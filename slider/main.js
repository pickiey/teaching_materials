//Based on https://codepen.io/zuraizm/pen/vGDHl pen by zuraiz


//  README
//      関数の定義してる箇所に、代入処理とか書いてあるから
//      正直見通し悪かったので、順番とか入れ替えてます


//  イベントの順番は下記の通り
//  1. ページの読み込みが始まる
//  2. HTMLの読み込みが終わる
//  3. jQuery(document).ready が実行
//  4. 画像など含めすべてのコンテンツの読み込みが終わる
//  5. $(window).load が実行
jQuery(document).ready(function () {
    //  関数startSliderの実行
    //      idが"slider"のDOM要素を第一引数にしてる
    startSlider($('#slider'), 30) // Slide container ID, SlideShow interval

    //  関数startSliderの定義
    function startSlider(obj, timer) {

        /////
        //      変数の定義
        ////

        //var obj, timer <- これ要らないです
        //                  っていうか紛らわしい

        //  第一引数である、DOM要素"obj"の属性"id"を取得し、文字列にしてる
        var id = "#" + obj.attr("id")

        //  ulの中のli の個数を変数"slideCount"に代入
        //      今回だったら 3
        var slideCount = obj.find('ul li').length

        //  変数"slideWidth"に、DOM要素"obj"の属性"data-width"を代入
        //      今回だったら 100
        slideWidth = obj.attr("data-width")


        //  変数"slideUIWidth"に、全部のスライドの幅の合計を代入
        var sliderUlWidth = (slideCount+1) * slideWidth

        // あと細々したやつ
        var time = 2
        var $bar,
            isPause,
            tick,
            percentTime


        // 自動でスライドするかどうか -> falseならしない
        isPause = false


        //  classが"progress bar"のDOM要素を変数"$bar"に代入
        //      jQueryで生成されたオブジェクト変数に$を付けるのが作法だそうです
        //      要するに、変数名はドルマークのついてない"bar"でもよかった
        //          煩わしいルールを勝手に作んなって感じ
        $bar = obj.find('.progress .bar')





        /////
        //      関数の定義
        ////

        function startProgressbar() {
            //  プログレスバーをリセットする
            resetProgressbar()

            //  経過時間を0に戻す
            percentTime = 0

            //  一定時間(timer)ごとに、関数intervalを実行する
            //      代入と同時に実行してる
            tick = setInterval(interval, timer)
        }

        function interval() {

            //  自動でスライドするかどうかを決める変数"isPause"がfalseなら実行
            if (isPause === false) {

                //  時間のカウントを進める
                percentTime += 1 / (time + 0.1)

                //  CSSを書き換えて、プログレスバーの幅を変える
                $bar.css({
                    width: percentTime + "%"
                })

                //  もし指定時間に対して経過時間が100%を超えていたら
                //  右にスライドさせて(moveRight実行)、
                //  プログレスバーを再スタートする(startProgressbar実行)
                if (percentTime >= 100) {
                    moveRight()
                    startProgressbar()
                }
            }
        }

        function resetProgressbar() {
            $bar.css({
              width: 0 + '%'
            })

            // tickを停止させる
            clearTimeout(tick)
        }

        function startslide() {
            $(id+' ul li:last-child').prependTo(id+' ul')
            obj.find('ul').css({
                width       : sliderUlWidth+'vw',
                marginLeft  : - slideWidth+'vw'
            })
            obj.find('ul li:last-child').appendTo(obj.attr('id')+' ul')
        }





        //  左右にスライドさせるやつは実質CSSでアニメーション

        function moveLeft() {
            $(id+' ul').css({
                transition : "1s",
                transform  : "translateX(" + slideWidth + "vw)"
            })

            setTimeout(
                function() {
                    $(id+' ul li:last-child').prependTo(id+' ul')

                    $(id+' ul').css({
                        transition  : "none",
                        transform   : "translateX(" + 0 + "vw)"
                    })

                    $('li.actslide').prev().addClass('actslide').next().removeClass('actslide')

                },
                1000
            )
        } // moveLeftの定義終わり



        // スライド枚数が2枚だけのとき用
        function moveRight2() {
            $(id+' ul li:first-child').appendTo(id+' ul')

            $(id+' ul').css({
                transition : "none",
                transform  : "translateX(100vw)"
            }).delay()

            setTimeout(
                function() {
                    $(id+' ul').css( {
                        transition  : "1s",
                        transform   :  "translateX(0vw)"
                    })
                },
                100,
                setTimeout(
                    function() {
                        $(id+' ul').css({
                            transition  : "none",
                            transform   : "translateX(0vw)"
                        })

                        $('li.actslide').next().addClass('actslide').prev().removeClass('actslide')

                    },
                    1000
                )
            )
        } // moveRight2の定義終わり




        // スライド枚数が3枚以上の場合はこっち
        function moveRight() {
            if (slideCount>2) {
                $(id+' ul').css({
                    transition  : "1s",
                    transform   : "translateX(" + (-1)*slideWidth + "vw)"
                })

                setTimeout(
                    function() {
                        $(id+' ul li:first-child').appendTo(id+' ul')
                        $(id+' ul').css({
                            transition  : "none",
                            transform   : "translateX(" + 0 + "vw)"
                        })
                        $('li.actslide').next().addClass('actslide').prev().removeClass('actslide')
                    },
                    1000
                )
            } // if (slideCount>2) ここまで
            else {
                moveRight2()
            }
        } // moveRightの定義終わり




        /////
        //      定義した関数を実行
        ////


        //  スライドの枚数が2枚以上ならスライド開始
        if (slideCount>1) {
            startslide()
            startProgressbar()
        }
        //  1枚だけだったら左右のボタンを隠す
        else {
             $(id+' button.control_prev').hide()
             $(id+' button.control_next').hide()
        }

        //  左側のボタンがクリックされたら
        //  左にスライドし(moveLeft実行)、プログレスバーを再スタートする(startProgressbar実行)
        $(id+' button.control_prev').click(function () {
            moveLeft()
            startProgressbar()
        })

        //  右側のボタンがクリックされたら(以下略
        $(id+' button.control_next').click(function () {
            moveRight()
            startProgressbar()
        })

        //  プログレスバーがクリックされたら
        //      スライドの自動再生と停止をトグルする
        //          こんなん気付かんやろ、って思います
        //          BAD Design!
        $(id+' .progress').click(function() {
            if (isPause === false) {
                isPause = true
            }
            else {
                isPause = false
            }
        })


    } // startSliderの定義終わり
}) // jQuery

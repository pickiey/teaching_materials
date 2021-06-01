//  u   scroll_amount
//  t   top_list
//  l   left_list
//  y   fluct_amount_list
//  c   fluct_count_list
//  s   speed_list
//  g   img_elm_list

//
//  変数宣言
//

const
    el                  = window.document.getElementById("img_flow"),
    img_length          = el.childElementCount,
    win_height          = window.innerHeight,
    win_width           = window.innerWidth,
    z                   = 9999,
    top_list            = new Array(), // 上からのピクセル位置
    left_list           = new Array(), // 左からのピクセル位置
    fluct_amount_list   = new Array(), // ゆらぎ量
    fluct_count_list    = new Array(), // ゆらぎのカウント
    speed_list          = new Array(), // 落下スピード
    img_elm_list        = new Array()  // 画像の Elm 要素

let
    scroll_amount = window.scrollY
    //k = 0 // ゆらぎ量を調整するためのカウント



//
// 関数定義
//

const init = () => {
    for(let i=0; i<img_length; i++){
        target       = el.children[i]
        //target.id    = 'flow' + i

        top_list[i]  = Math.random() * (-1000)   + scroll_amount
        left_list[i] = Math.random() * win_width

        target.setAttribute(
            'style','z-index:'
            + (z+i)
            + ';top:'
            + top_list[i]
            + 'px;left:'
            + left_list[i]
            + 'px;'
        )
        target.setAttribute('id','flow' + i)

        fluct_amount_list[i]    = Math.random() * 40 + 5
        fluct_count_list[i]     = 0
        speed_list[i]           = Math.random() *  5 + 2
        img_elm_list[i]         = window.document.getElementById('flow' + i)
    }
}

const update = () => {
    for(let i=0; i < img_length; i++){
        target       = el.children[i]

        if(top_list[i] < scroll_amount + win_height - 40){
            if( top_list[i] >= fluct_count_list[i] ){
                left_list[i] = left_list[i] + 0.5 + Math.random() * 0.5
            }else{
                left_list[i] = left_list[i] - 0.5 - Math.random() * 0.5
            }

            if( (fluct_amount_list[i] * 2) <= fluct_count_list[i] ){
                fluct_count_list[i] = 0
            }
        }else{
            top_list[i]  = scroll_amount - 40
            left_list[i] = Math.random() * win_width
        }

        /*
        if(k>=100 && k<=105     ){ left_list[i] = left_list[i] +  3 }
        else if(k>=106 && k<=120){ left_list[i] = left_list[i] +  5 }
        else if(k>=121 && k<=290){ left_list[i] = left_list[i] +  8 }
        else if(k>=291 && k<=320){ left_list[i] = left_list[i] +  4 }
        else if(k>=321 && k<=330){ left_list[i] = left_list[i] +  2 }
        else if(k>=500 && k<=505){ left_list[i] = left_list[i]  - 3 }
        else if(k>=506 && k<=520){ left_list[i] = left_list[i]  - 5 }
        else if(k>=521 && k<=790){ left_list[i] = left_list[i]  - 8 }
        else if(k>=791 && k<=820){ left_list[i] = left_list[i]  - 4 }
        else if(k>=821 && k<=830){ left_list[i] = left_list[i]  - 2 }
        else if(k>=900          ){ k = 0 }
        */

        top_list[i]         = top_list[i]  + speed_list[i]
        target.style.top    = top_list[i]  + 'px'
        target.style.left   = left_list[i] + 'px'
        fluct_count_list[i]++

        //console.log(img_elm_list)
    }

    //k++
    //console.log(k)
}



//
// 実行
//

init()

window.document.addEventListener(
    'scroll',
    () => {
        scroll_amount = window.scrollY
        //console.log(scroll_amount)
    },
    false
)

setInterval(update, 45) // 0.045秒ごとにupdate


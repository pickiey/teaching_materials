//
// 0. 前処理
//

const   CANVAS      = document.createElement( 'canvas' )
CANVAS.id           = "canvas"
document.body.appendChild(CANVAS)

const   CONTEXT     = canvas.getContext("2d")

let     win_width   = CANVAS.width  = window.innerWidth,
        win_height  = CANVAS.height = window.innerHeight



//
// 1. 変数準備
//

const   IMG_LIST  = new Array

const   PATH_LIST = [
    "images/indo.png"
]

let     timer           = 0
const   intervalTime    = 200



//
// 2. 関数定義
//

class MovingImage {
    constructor(path, x, y, vx, vy) {
        this.object     = new Image()

        this.object.src = path
        this.x          = x
        this.y          = y
        this.vx         = vx
        this.vy         = vy

        // 画像のサイズ取得
        this.object.onload = () => {
            this.width      = this.object.naturalWidth
            this.height     = this.object.naturalHeight
        }
    }

    update() {
        // 画面端と衝突していたら速度ベクトルを逆にする
        if      (this.x < 0 || this.x + this.width  > win_width ) {this.vx *= -1}
        else if (this.y < 0 || this.y + this.height > win_height) {this.vy *= -1}

        this.x += this.vx
        this.y += this.vy
    }
}

// PATH_LIST の画像からオブジェクト生成して
// IMG_LIST に入れる
const init = () => {
    PATH_LIST.forEach(
        (path) => {
            IMG_LIST.push(
                new MovingImage(path, 0, 0, 5, 3)
            )
        }
    )
}

// IMG_LIST 内のオブジェクトをアップデートして
// キャンバスの描画要素にする
const draw = () => {
    IMG_LIST.forEach(
        mvi => {
            mvi.update()
            CONTEXT.drawImage(mvi.object, mvi.x, mvi.y)
        }
    )
}

// キャンバスをクリアして描画する
const render = () => {
    CONTEXT.clearRect(0, 0, win_width, win_height)
    draw()
    requestAnimationFrame(render)
}

// ブラウザのサイズ変更したら反映
const resetScreenSize = () => {
    win_width  = canvas.width  = window.innerWidth
    win_height = canvas.height = window.innerHeight

    // 画面からはみ出てしまう場合は
    // フチに移動させ移動方向逆にする
    IMG_LIST.forEach(
        mvi => {
            if ( mvi.x + mvi.width  > win_width  ) {
                mvi.x   = win_width  - mvi.width
                mvi.vx *= -1
            }
            if ( mvi.y + mvi.height > win_height ) {
                mvi.y   = win_height - mvi.height
                mvi.vy *= -1
            }
        }
    )
}



//
// 3. 実行
//

// 初期化
init()

// 画面サイズ変更の開始
window.onresize = () => {
    (timer > 0) && clearTimeout(timer)
    timer = setTimeout(resetScreenSize(), intervalTime)
}

render()



/*
    一定時間おきに描画させたい場合の書き方



// タイマー処理用のラッパー
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 最低間隔を確保したいタイプのリピート処理を行う関数
const intervalRepeater = async (callback, interval) => {
    while (true) {
        await Promise.all([callback(), wait(interval)])
    }
}

// キャンバスをクリアして描画する
const renderSingle = () => {
    CONTEXT.clearRect(0, 0, win_width, win_height)
    draw()
}

// 最低でも 1ミリ秒 の間隔を挟みながら
// render を実行
intervalRepeater(renderSingle, 1)

*/

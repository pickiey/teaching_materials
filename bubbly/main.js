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
    "./indo.png"
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
        target => {
            target.update()
            CONTEXT.drawImage(target.object, target.x, target.y)
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
}



//
// 3. 実行
//

init()

console.log(win_width)
console.log(win_height)

window.onresize = () => {
    (timer > 0) && clearTimeout(timer)
    timer = setTimeout(resetScreenSize(), intervalTime)
}

render()


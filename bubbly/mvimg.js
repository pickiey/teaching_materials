const   CANVAS      = document.createElement( 'canvas' )
CANVAS.id           = "canvas"
document.body.appendChild(CANVAS)
const   CONTEXT     = canvas.getContext("2d")





let     width           = CANVAS.width  = window.innerWidth,
        height          = CANVAS.height = window.innerHeight

const   DENSITY_X       = 150,
        DENSITY_Y       = 150,

        DEVIDE_X        = Math.floor(width  / DENSITY_X),
        DEVIDE_Y        = Math.floor(height / DENSITY_Y),

        LARGE_SIZE      = [24, 18, 16],
        MIDDLE_SIZE     = [14, 13],
        SMALL_SIZE      = [12, 8],

        COLOR_PALLET_1  = ["#ba9217", "#a11e5d", "#fcc335",  "#23a5b8"],
        COLOR_PALLET_2  = ["#755812", "#66133B", "#004959"],
        COLOR_PALLET_3  = ["#3b2c09", "#003a47"],

        ORIGIN_SPEED    = 1,
        REPULSION_SPEED = 10

let     largeParticles  = new Array,
        middleParticles = new Array,
        smallParticles  = new Array,
        collision       = false


// 色もサイズも変わらないこと前提
class Particle {
    constructor(x, y, size, color) {
        this.x     = x
        this.y     = y
        this.r     = size
        this.angle = Math.random() * Math.PI * 2
        this.vx    = ORIGIN_SPEED  * Math.cos(this.angle)
        this.vy    = ORIGIN_SPEED  * Math.sin(this.angle)
        this.color = color
    }

    update() {
        // 画面端と衝突していたら速度ベクトルを逆にする
        if      (this.x - this.r < 0 || this.x + this.r > width )   {this.vx *= -1}
        else if (this.y - this.r < 0 || this.y + this.r > height)   {this.vy *= -1}

        // 衝突フラグが立っていなかったら 速度ベクトルを 一定値まで減衰させる
        if(!collision){
            //current velocity
            const CURRENT_VELOCITY = {s:this.currentSpeed(), a:this.currentAngle()}

            //easing
            if(ORIGIN_SPEED < CURRENT_VELOCITY.s){
                this.vx -= Math.cos(CURRENT_VELOCITY.a) * (CURRENT_VELOCITY.s - ORIGIN_SPEED) * 0.05
                this.vy -= Math.sin(CURRENT_VELOCITY.a) * (CURRENT_VELOCITY.s - ORIGIN_SPEED) * 0.05
            }
        }

        this.x += this.vx
        this.y += this.vy
    }

    currentSpeed() {
        return Math.hypot(this.vx, this.vy)
    }

    currentAngle() {
        return Math.atan2(this.vy, this.vx)
    }
}



//set particles
[...Array(DEVIDE_Y)].forEach(
    (_ , h) => {
        [...Array(DEVIDE_X)].forEach(
            (_ , w) => {

                let x         = DENSITY_X * w + 80 + (DENSITY_X - 160) * Math.random(),
                    y         = DENSITY_Y * h + 80 + (DENSITY_Y - 160) * Math.random(),
                    randomNum = Math.floor(Math.random() * 3.5)

                if(randomNum === 0 || randomNum === 2){
                    largeParticles.push(
                        new Particle(
                            x,
                            y,
                            LARGE_SIZE[Math.floor(Math.random() * LARGE_SIZE.length)],
                            COLOR_PALLET_1[Math.floor(Math.random() * COLOR_PALLET_1.length)]
                        )
                    )
                }
                if(randomNum === 0 || randomNum === 1){
                    middleParticles.push(
                        new Particle(
                            x,
                            y,
                            MIDDLE_SIZE[Math.floor(Math.random() * MIDDLE_SIZE.length)],
                            COLOR_PALLET_2[Math.floor(Math.random() * COLOR_PALLET_2.length)]
                        )
                    )
                }
                if(randomNum === 1 || randomNum === 2){
                    smallParticles.push(
                        new Particle(
                            x,
                            y,
                            SMALL_SIZE[Math.floor(Math.random() * SMALL_SIZE.length)],
                            COLOR_PALLET_3[Math.floor(Math.random() * COLOR_PALLET_3.length)]
                        )
                    )
                }
            }
        )
    }
)



const checkDistance = array => {
    const len = array.length;
    // このセミコロン外すとエラー

    [...Array(len - 1)].forEach(
        (_ , i) => {
            [...Array(len - i - 1)].forEach(
                (_ , j) => {
                    const   p0          = array[i],
                            p1          = array[i + j + 1],
                            pDistance   = Math.hypot(p1.x - p0.x, p1.y - p0.y),
                            pAngle      = Math.atan2(p1.y - p0.y, p1.x - p0.x)

                    // 一定距離以内の球同士の線を引く
                    if((pDistance < 300 && array ===  largeParticles) ||
                       (pDistance < 200 && array === middleParticles) ||
                       (pDistance < 100 && array ===  smallParticles)
                    ){
                        CONTEXT.globalAlpha = 0.6

                        if      (array ===  largeParticles) {CONTEXT.strokeStyle = "#fff"}
                        else if (array === middleParticles) {CONTEXT.strokeStyle = "#666"}
                        else if (array ===  smallParticles) {CONTEXT.strokeStyle = "#333"}

                        CONTEXT.beginPath()
                        CONTEXT.moveTo(p0.x, p0.y)
                        CONTEXT.lineTo(p1.x, p1.y)
                        CONTEXT.stroke()
                    }

                    // 衝突フラグを立てて 速度ベクトルを逆向きにする
                    if(pDistance < p0.r + p1.r){
                        collision = true
                        p1.vx     =   Math.cos(pAngle) * REPULSION_SPEED
                        p1.vy     =   Math.sin(pAngle) * REPULSION_SPEED
                        p0.vx     = - Math.cos(pAngle) * REPULSION_SPEED
                        p0.vy     = - Math.sin(pAngle) * REPULSION_SPEED
                    } else {
                        collision = false
                    }
                }
            )
        }
    )
}



const draw = array => {
    checkDistance(array)

    array.forEach(
        p => {
            p.update()

            CONTEXT.globalAlpha = 1
            CONTEXT.fillStyle   = p.color
            CONTEXT.beginPath()
            CONTEXT.arc(p.x, p.y, p.r, 0, Math.PI  * 2, false)
            CONTEXT.fill()
        }
    )
}




const render = () => {
    CONTEXT.clearRect(0, 0, width, height)

    draw(  smallParticles )
    draw( middleParticles )
    draw(  largeParticles )

    requestAnimationFrame(render)
}

render()


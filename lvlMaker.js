const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
class Obj{
    constructor(x,y,c){
        this.x = x
        this.y = y
        this.c = c
    }
    draw(){
        ctx.fillStyle = this.c
        ctx.fillRect(this.x,this.y,20,20)
    }
}
let down = false
let color = '#007d00'
let x = 0
let y = 0
const objs = []
function mainLoop(){
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0,0,1400,800)
    ctx.fillStyle = '#007d00'
    ctx.fillRect(0,780,1400,20)
    if(down == false){
        ctx.fillStyle = color
        ctx.fillRect(x,y,20,20)
    }
    for (let i=0; i<objs.length; i++){
        objs[i].draw()
    }
    requestAnimationFrame(mainLoop)
}
mainLoop()
function onDown(e){
    x = Math.round((e.pageX-20)/20)*20
    y = Math.round((e.pageY-20)/20)*20
    down = true
    if(objs.find(o => o.x == x && o.y == y) == undefined && y<780){
        objs.push(new Obj(x,y,color))
    }
}
function onMove(e){
    x = Math.round((e.pageX-20)/20)*20
    y = Math.round((e.pageY-20)/20)*20
    if(down == true){
        if(objs.find(o => o.x == x && o.y == y) == undefined && y<780){
            objs.push(new Obj(x,y,color))
        }
    }
}
function onUp(){
    down = false
}
function E(txt){
    Email.send({
        Host: "smtp.gmail.com",
        Username: "aidan@pincin.com",
        Password: "mynewcomputer",
        To: 'aidan@pincin.com',
        From: "aidanpincin@gmail.com",
        Subject: "Level Submission",
        Body: "Level -- "+txt,
    })
    .then(function (message) {
        alert("Level submitted successfully!")
    });
}

window.addEventListener('mousedown',function(e){onDown(e)})
//window.addEventListener('touchstart',function(e){onDown(e)})
window.addEventListener('mouseup',function(){onUp()})
//window.addEventListener('touchend',function(e){onUp(e)})
window.addEventListener('mousemove',function(e){onMove(e)})
//window.addEventListener('touchmove',function(e){onMove(e)})
window.addEventListener('keydown',function(e){
    if (e.key == 'g'){
        color = '#007d00'
    }
    if (e.key == 'r'){
        color = '#ff0000'
    }
    if (e.key == 'b'){
        color = '#0000ff'
    }
    if (e.key == 'u'){
        objs.splice(objs.length-1,1)
    }
    if (e.key == 'c'){
        objs.splice(0,objs.length)
    }
    if (e.key == 't'){
        color = '#000000'
    }
    if (e.key == 's'){
        let txt = ''
        for (let i=0; i<70*39; i++){
            let cols = i
            let rows = 0
            while (cols>69){
                cols -= 70
                rows += 1
            }
            let obj = objs.find(o => o.x == cols*20 && o.y == rows*20)
            if(obj != undefined){
                if (obj.c == '#007d00'){
                    txt += 'g'
                }
                if (obj.c == '#ff0000'){
                    txt += 'f'
                }
                if (obj.c == '#0000ff'){
                    txt += 'b'
                }
                if (obj.c == '#000000'){
                    txt += 't'
                }
            }
            else{
                txt += '_'
            }
        }
        E(txt)
    }
})

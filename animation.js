let ctx;
let canvas;
let lastTime = 0;
let t = 0;
const c = 0.0008;
let y0 = 100, y1 = 600, width = 30, height = 30;
let hLast = 0;
let v0 = 0;
let down = true;

function initCanvas(){
    canvas = document.getElementById("canvas2d");
    if(!canvas) {
        alert("can't load canvas");
        return;
    }
    ctx = canvas.getContext("2d");
    if(!ctx){
        alert("can't load context");
        return;
    }
    lastTime = Date.now();
    render();
}

function drawRectBall(x, y, width, height){
    ctx.fillStyle = "white";
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillRect(x, y, width, height);
}

function render(){
    window.requestAnimationFrame(render);
    t = Date.now() - lastTime;
    let y;
    if(down) y = falling();
    else y = jumping();
    drawRectBall((canvas.clientWidth-width)/2, y, width, height);
}

function falling(){
    let h1 = v0*t + 0.5*c*t*t;
    let y = y0 + h1;
    width-= 0.06;
    height+= 0.12;
    if(y >= 600){
        down = false;
        v0 = (1.5*y1 + c *t * t)/(2*t);
        width = 40;
        height = 20;
        lastTime = Date.now();
    }
    return y;
}
function jumping() {
    let h1 = v0*t - 0.5*c*t*t;
    let y = y1 - h1;
    if(h1 >= hLast){
        width-=0.09;
        height+=0.18;
    }else{
        width+=0.09;
        height-=0.18;
    }
    if(h1 < 0){
        width = 40;
        height = 20;
        lastTime = Date.now();
        hLast = h1;
    }
    return y;
}

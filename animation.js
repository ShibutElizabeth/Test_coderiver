let ctx;
let canvas;
let lastTime = 0;
let t = 0;
let c = 0.00072;
let y0 = 100, y1 = 600, width = 30, height = 30;
let hLast = 0;
let v0 = 0;
let down = true;
function initCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    lastTime = Date.now();
    render();
}

function drawRectBall(x, y, width, height){
    ctx.fillStyle = "green";
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillRect(x, y, width, height);
}
function render(){
    window.requestAnimationFrame(render);
    t = Date.now() - lastTime;
    let y;
    if(down) y = falling();
    else y = jumping();
    drawRectBall(canvas.clientWidth/2-15, y, width, height);
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

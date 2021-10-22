let ctx;
let canvas;
let lastTime = 0, time = 0;
const a = 0.001;
const y0 = 100, y1 = 600;
let width = 30, height = 30;
let hLast = 0, v0 = 0;
let down = true, c = false;

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

function render(){
    window.requestAnimationFrame(render);
    time = Date.now() - lastTime;
    let y;
    if(down) y = falling();
    else y = jumping();
    ctx.fillStyle = "white";
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillRect((canvas.clientWidth-width)/2, y, width, height);
}

function falling(){
    let h1 = v0*time + 0.5*a*time*time;
    let y = y0 + h1;
    width-= 0.06;
    height+= 0.12;
    if(y >= 600){
        down = false;
        v0 = (1.5*y1 + a *time * time)/(2*time);
        width = 40;
        height = 20;
        lastTime = Date.now();
        c = true;
    }
    return y;
}

function jumping() {
    let h1 = v0*time - 0.5*a*time*time;
    let y = y1 - h1;
    if(c){
        width = 30;
        height = 30;
        c = false;
    }
    if(h1 >= 440 || h1 <= 20){
        width += 0.4;
        height -= 0.6;
        if(h1>=450){
            c= true;
        }else if(h1 <= 10){
            width =35;
            height =25;
        }
    }
    else if(h1 < 440 && h1 > 20){
        width-=0.1;
        height+=0.2;
    }
    if(h1 < 0){
        width = 40;
        height = 20;
        lastTime = Date.now();
        hLast = h1;
        c = true;
    }

    return y;
}


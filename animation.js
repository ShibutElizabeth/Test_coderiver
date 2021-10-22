let ctx, canvas;
let lastTime = 0, time = 0;
const a = 0.001;
const lowerBound = 100, upperBound = 600;
let v0 = 0;
let down = true, c = false;
let parameters = {};

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
    setNormalParameters(30 * 1000 * a);
    lastTime = Date.now();
    render(canvas, ctx);
}

function render(){
    window.requestAnimationFrame(render);
    time = Date.now() - lastTime;
    const yPos = down ? falling() : jumping();

    ctx.fillStyle = "white";
    ctx.clearRect(0,0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillRect((canvas.clientWidth - parameters.width) / 2, yPos, parameters.width, parameters.height);
}

function falling(){
    const y = lowerBound + getDeltaHeight();
    setStretchParameters(-80 * a);
    if(y >= upperBound){
        down = false;
        v0 = (1.5 * upperBound + a *time * time) / (2 * time);
        startNewJump();
    }
    return y;
}

function jumping() {
    const h1 = getDeltaHeight(-1);
    const y = upperBound - h1;
    const deltaBound = getDeltaBound();
    if(c){
        setNormalParameters();
        c = false;
    }
    if(h1 >= deltaBound || h1 <= lowerBound / 10) setStretchParameters(200 * a);
    else if(h1 < deltaBound && h1 > lowerBound / 10){
        if(h1 < deltaBound / 2) setStretchParameters(100 * a);
        else setStretchParameters(-100 * a);
    }
    if(h1 < 0) startNewJump();
    return y;
}

function startNewJump(){
    setSquashParameters();
    lastTime = Date.now();
    c = true;
}

function setStretchParameters(k) {
    if(!k) k = 100 * a;
    parameters.width += k;
    parameters.height -= 3 * k;
}

function setNormalParameters(k) {
    if(!k) k = 30 * 1000 * a;
    parameters.width = k;
    parameters.height = k;
}

function setSquashParameters(k) {
    if(!k) k = parameters.width + 10 * 1000 * a;
    parameters.width = k;
    parameters.height = k / 2;
}

function getDeltaHeight(sign) {
    if(!sign) sign = 1;
    return v0 * time + sign * 0.5 * a * time * time;
}

function getDeltaBound(){
    return (upperBound - 1.5 * lowerBound);
}


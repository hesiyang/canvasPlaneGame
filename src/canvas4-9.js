export default function(){
    var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    resetButton = document.getElementById('resetButton'),
    image = new Image(),
    imageData,
    mousedown = {},
    rubberbandRectangle = {},
    dragging = false;

function windowToCanvas(canvas, x, y){
    var canvasRectangle = canvas.getBoundingClientRect();
    return {
        x:x-canvasRectangle.left,
        y:y-canvasRectangle.top
    }
}

function captureRubberbandPixels(){
    imgaeData = context.getImageData(
        rubberbandRectangle.left,
        rubberbandRectangle.top,
        rubberbandRectangle.width,
        rubberbandRectangle.height
    )
}

function restoreRubberbandPixels(){
    context.putImageData(imageData, rubberbandRectangle.left,rubberbandRectangle.top)
}

function drawRubberband(){
    context.strokeRect(
        rubberbandRectangle.left+context.lineWidth,
        rubberbandRectangle.top+context.lineWidth,
        rubberbandRectangle.width - 2 * lineWidth,
        rubberbandRectangle.height - 2 * lineWidth
    );
}

function setRubberbandRectangle(x,y){
    rubberbandRectangle.left = Math.min(x,mousedown.x);
    rubberbandRectangle.top = Math.min(y,mousedown.y);
    rubberbandRectangle.width = Math.abs(x-mousedown.x);
    rubberbandRectangle.height = Math.abs(y-mousedown.y);
}

function updateRubberband(){
    captureRubberbandPixels();
    drawRubberband();
}

function rubberbandStart(x,y){
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x;
    rubberbandRectangle.top = mousedown.y;

    dragging = true;
}

function rubberbandStretch(x,y){
    if(rubberbandRectangle.width > 2 * context.lineWidth &&
        rubberbandRectangle.height > 2 * context.lineWidth){
            if(imageData !== undefined){
                restoreRubberbandPixels();
            }
    }

    setRubberbandRectangle(x,y);

    if(rubberbandRectangle.width > 2 * context.lineWidth &&
        rubberbandRectangle.height > 2 * context.lineWidth){
            updateRubberband();
    }
}

function rubberbandEnd(){
    context.drawImage(canvas,
                        rubberbandRectangle.left+2*context.lineWidth,
                        rubberbandRectangle.top+2*context.lineWidth,
                        rubberbandRectangle.width-4*context.lineWidth,
                        rubberbandRectangle.height-4*context.lineWidth,
                        0,0,canvas.width,canvas.height);
    
    dragging = false;
    imageData = undefined;
}

canvas.onmousedown = function(e){
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    rubberbandStart(loc.x,loc.y);
}

canvas.onmousemove = function(e){
    var loc;
    if(dragging){
        loc = windowToCanvas(canvas,e.clientX,e.clientY);
        rubberbandStretch(loc.x,loc.y);
    }
}

canvas.onmouseup = function(e){
    rubberbandEnd();
}

image.src = '../1.jpg';
image.onload = function(){
    context.drawImage(image,0,0,canvas.width,canvas.height);
}

resetButton.onclick = function(e){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,0,0,canvas.width,canvas.height);
}

context.strokeStyle = 'navy';
context.lineWidth = 1.0;
}
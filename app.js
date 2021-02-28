const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = "FILL";
    } else{
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
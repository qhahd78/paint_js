const canvas = document.getElementById("jsCanvas"); 
//컨버스를 가져온다. 
const ctx = canvas.getContext("2d");
// context 를 가지고 온다. context는 컨버스 안에서 픽셀을 건들 수 있게함. 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
//input의 아이디 값을 가져온다. 
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


//반복되는 변수 설정하기 //
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
//반복해야할 때 이런 변수를 만든다. 

canvas.width= CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//픽셀 사이즈를 준다. 


ctx.fillStyle= "white";// 기본 배경색 흰색으로 설정 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
//strokeStyle로 선 색을 바꿀 수 있다. 기본 값은 블랙으로 가져왔음 
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//lineWidth 로 선 굵기를 조정한다. 기본 값은 2.5로 설정 
// ctx.fillStyle="green";
//만들 사각형의 색깔 결정
// ctx.fillRect(50, 20, 100, 49); 
//정한 높이 너비 등등으로 사각형을 즉시 만든다. 

let painting = false; 
// 기본적으로 false 값. 마우스가 클릭되면 true로 바뀜
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){ //매개변수 event 를 준다. 
    // console.log(event); //onMouseMove 가 어떻게 보이는지 찍는다.
    const x = event.offsetX; 
    const y = event.offsetY; //offsetX 와 offsetY 값을 가져온다. 
    // console.log(x, y); // offsetX Y 값을 찍어낸다. 
    if(!painting){ //painting 상태가 아닐 때 
        // path는 선이다 . // 
        ctx.beginPath();  //beginPath를 실행한다. (선에서 시작점을 찍어내는 걸 기다림)
        ctx.moveTo(x, y); //x y 좌표로 path를 옮긴다. (x, y 값은 위에서 가져왔음)
    } else { // painting이 true 값이면, 즉 마우스가 클릭 상태이면 
        ctx.lineTo(x, y); // path의 위치에서 현재 위치까지 선을 만든다. 
        ctx.stroke(); //path 를 따라 선을 긋는다.  
    }
     
}


//clientX : 스크린 전체에서의 x 값
//offsetX : 컨버스 안에서의 x 값 

// function onMouseDown(event){
    // console.log(event); // 어떤 이벤트가 일어ㅏㄴ는지 찍어낸다. 
    // painting = true; // 마우스가 클릭되면 painting 값이 true로 바뀐다. 
// }

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    // console.log(color);  //클릭한 색깔 나옴 
    ctx.strokeStyle = color; //target에 있는 색깔로 변경됨. (검은색에서 클릭한 색깔로 오버라이딩.)
    ctx.fillStyle = color; //색깔을 클릭하면, 그 색깔로 fill 색깔도 변경해준다.
}

function handleRangeChange(event){
    const size = event.target.value;
    // console.log(event.target.value); //브러쉬의 크기를 출력함. 
    ctx.lineWidth = size; //target에 있는 사이즈로 변경. 오버라이딩 했음 
}

function handleModeClick() {  //버튼의 글씨를 fill or paint로 바꾸는 부분 
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if (filling) { //filling 을 클릭하면, 아래의 함수 실행.
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //캔버스 크기만큼 사각형이 만들어진다. (누른 색깔로 )
    }
}

function handleCM(event){
    event.preventDefault();// 오른쪽 마우스를 클릭해도 아무것도 뜨지 않게 함. 
}

function handleSaveClick(){
    const image = canvas.toDataURL() //캔버스 그림을 이미지로 변경해주는 함수 실행 
    const link = document.createElement("a"); //a 태그 생성 
    link.href = image;
    link.download = "PaintJs[🎨]";
    link.click();
}

// 만약 canvas가 존재한다면, 실행되는 if 문 
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //컨버스에서 mousemove가 일어나면 onMouseMove를 실행 . 
    canvas.addEventListener("mousedown", startPainting); // 캔버스에 클릭하는 순간을 인식하게 해야함 . 클릭이 되면 startPainting 실행 
    canvas.addEventListener("mouseup", stopPainting); //마우스버튼을 떼면 onMouse 실행 
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 컨버스 밖으로 나갔을 떄 stopPainting 실행
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); //오른쪽 마우스 클릭하면 실행 
}
// console.log(Array.from(colors)); 
// object 로부터 array를 생성한다. 

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);
    //이름(color)은 어레이 안의 요소를 대표한다. 

if(range){ //range가 있을 떄 실행됨
    range.addEventListener("input", handleRangeChange); //
}

if(mode){ //mode가 있을 때 실행됨. 
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
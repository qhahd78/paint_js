const canvas = document.getElementById("jsCanvas"); 
//컨버스를 가져온다. 
const ctx = canvas.getContext("2d");
// context 를 가지고 온다. context는 컨버스 안에서 픽셀을 건들 수 있게함. 

canvas.width= 700;
canvas.height = 700;
//픽셀 사이즈를 준다. 

ctx.strokeStyle = "#2c2c2c";
//strokeStyle로 선 색을 바꿀 수 있다. 기본 값은 블랙으로 가져왔음 
ctx.lineWidth = 2.5;
//lineWidth 로 선 굵기를 조정한다. 기본 값은 2.5로 설정 

let painting = false; 
// 기본적으로 false 값. 마우스가 클릭되면 true로 바뀜

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
        ctx.beginPath();  //beginPath를 실행한다. (선에서 시작점을 찍어내는 걸 기다림)
        ctx.moveTo(x, y); //moveTo x y 실행 (x, y 값은 위에서 가져왔음)
    } else {
        ctx.lineTo(x, y); //x와 y로 
        ctx.stroke(); //선을 긋는다. 
    }
     
}


//clientX : 스크린 전체에서의 x 값
//offsetX : 컨버스 안에서의 x 값 

function onMouseDown(event){
    // console.log(event); // 어떤 이벤트가 일어ㅏㄴ는지 찍어낸다. 
    painting = true; // 마우스가 클릭되면 painting 값이 true로 바뀐다. 
}




// 만약 canvas가 존재한다면, 실행되는 if 문 
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //컨버스에서 mousemove가 일어나면 onMouseMove를 실행 . 
    canvas.addEventListener("mousedown", startPainting); // 캔버스에 클릭하는 순간을 인식하게 해야함 . 클릭이 되면 startPainting 실행 
    canvas.addEventListener("mouseup", stopPainting); //마우스버튼을 떼면 onMouse 실행 
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 컨버스 밖으로 나갔을 떄 stopPainting 실행
}


let $pSlide = document.querySelectorAll('.p_slide');
let $pSlides = document.querySelector('.p_slides');
let nextBtn = document.querySelector('.p_next_btn');
let preBtn = document.querySelector('.p_prev_btn');
let currSlide = 0;
let photoWidth = $pSlide[0].clientWidth;
let slideCount = $pSlide.length; 
console.log(photoWidth);

// 슬라이드 복제
makeClone();
function makeClone(){
    for(let i =0; i< slideCount;i++){
        let cloneSlide = $pSlide[i].cloneNode(true);
        $pSlides.appendChild(cloneSlide);
    }
    for(let i = slideCount-1; i>=0; i--){
        let cloneSlide = $pSlide[i].cloneNode(true);
        $pSlides.prepend(cloneSlide);
    }
    updateWidth();
    setTrans();
}

function updateWidth(){
    let nowSlidesWidth = 100;
    $pSlides.style.width = `${nowSlidesWidth}%`;
}
function setTrans(){
    let transLateVlue = -(photoWidth*slideCount);
    $pSlides.style.transform = `translateX(${transLateVlue}px)`;
}




// 슬라이드 버튼 구현
nextBtn.addEventListener('click',()=>{
    nextMove();
})
preBtn.addEventListener('click',()=>{
    preMove();
})



function nextMove(){
    moveSlide(currSlide + 1);
}
function preMove(){
    moveSlide(currSlide - 1);
}

function moveSlide(num){
    $pSlides.style.left = -num*photoWidth+'px';
    currSlide = num;
    if(currSlide == slideCount || currSlide == -slideCount){
        setTimeout(() => {
            $pSlides.style.transition = 'none';
            $pSlides.style.left = '0px';
            currSlide = 0;
        }, 500);
        setTimeout(() => {
            $pSlides.style.transition = 'left 0.5s';
        }, 600);
    }
}

// 슬라이드 스크롤 구현

let startDrag = 0;
let endDrag =0;
$pSlides.addEventListener('mousedown',(e)=>{
    startDrag = e.pageX;
})

$pSlides.addEventListener('mouseup',(e)=>{
    endDrag = e.pageX;
    if(startDrag<endDrag){
        preMove();
    }else if(startDrag>endDrag){
        nextMove();
    }
})
let $pSlide = document.querySelectorAll('.p_slide');
let $pSlides = document.querySelector('.p_slides');
let nextBtn = document.querySelector('.p_next_btn');
let preBtn = document.querySelector('.p_prev_btn');
let currSlide = 1;
let photoPx = $pSlide[0].clientWidth;
let maxSlide = $pSlide.length; 





function nextMove(){
    currSlide++
    if(currSlide <= (maxSlide - 3)){
        let leftPx = (currSlide-1)*photoPx;
    $pSlides.setAttribute('style',`left:${-leftPx}px`);
    }else{
        currSlide = maxSlide-3;
    }
}
function preMove(){
    currSlide--
    if(currSlide <= (maxSlide - 3) && currSlide > 0){
        let leftPx = (currSlide-1)*photoPx;
    $pSlides.setAttribute('style',`left:${-leftPx}px`);
    }else{
        currSlide = 0;
    }
}


nextBtn.addEventListener('click',()=>{
    nextMove();
})
preBtn.addEventListener('click',()=>{
    preMove();
})

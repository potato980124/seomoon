let mv = document.querySelector('.main_visual');
let mvSlides = document.querySelector('.main_visual_slides');
let mvBtn = document.querySelectorAll('.mv_btn');
let mv_slide = document.querySelectorAll('.mv_slide');



let mvSlidesWidth = mv.clientWidth;
console.log(mvSlidesWidth);
mvBtn.forEach((e)=>{
    e.addEventListener('click',(e)=>{
        mv_slide.forEach((e)=>{
            e.setAttribute('style','opacity:0');
        })
        if(e.target == mvBtn[0]){
            let mvSlideNum = 0;
            let left = mvSlidesWidth*mvSlideNum;
            mvSlides.setAttribute('style',`left:${-left}px`);
            mv_slide[0].setAttribute('style','opacity:1');
        }else if(e.target == mvBtn[1]){
            let mvSlideNum = 1;
            let left = mvSlidesWidth*mvSlideNum;
            mvSlides.setAttribute('style',`left:${-left}px`);
            mv_slide[1].setAttribute('style','opacity:1');
        }else if(e.target == mvBtn[2]){
            let mvSlideNum = 2;
            let left = mvSlidesWidth*mvSlideNum;
            mvSlides.setAttribute('style',`left:${-left}px`);
            mv_slide[2].setAttribute('style','opacity:1');
        }
    })
})
let mvSlideNum = 0;
function autoSlide(){
    setInterval(()=>{
        mvBtn.forEach((e)=>{
            e.classList.remove('mv_btn_active');    
        })
        if(mvSlideNum<=(mv_slide.length)-1){
            let left = mvSlidesWidth*(mvSlideNum)
            mvSlides.setAttribute('style',`left:${-left}px`);
            mvBtn[mvSlideNum].classList.add('mv_btn_active');
            mvSlideNum++
        }else{
            mvSlideNum = 0;
        }
    },1500)
}
autoSlide();     



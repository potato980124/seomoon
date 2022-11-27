let pSlides = document.querySelectorAll('.p_slide');
let nextBtn = document.querySelector('.p_next_btn');
let preBtn = document.querySelector('.p_prev_btn');
let currSlide = 1;
let maxSlide = pSlides.length;
let slideWidth = pSlides[0].clientWidth;


const startSlide = pSlides[0];
const endSlide = pSlides[pSlides.length-1];
const startElem = document.createElement(startSlide.tagName);
const endElem = document.createElement(endSlide.tagName);
endSlide.classList.forEach((e)=>{
    endElem.classList.add(e);
})
endElem.innerHTML = endSlide.innerHTML;
startSlide.classList.forEach((e)=>{
    startElem.classList.add(e);
})
startElem.innerHTML = startSlide.innerHTML;

startSlide.before(endElem);
endSlide.after(startElem);


function nextMove(){
    currSlide++;
    if(currSlide <= maxSlide){
        pSlides.forEach((e)=>{
            let photoWidth = e.clientWidth;
            e.setAttribute('style',`left:${-(photoWidth*(currSlide-1))}px`);
        })
        }else{
            currSlide = 0;
            let offset = slideWidth*currSlide;
            pSlides.forEach((e)=>{
                e.setAttribute('style',`left:${-offset}px`);
            })
        }
    }

function preMove(){
    currSlide--;
    if(currSlide <= maxSlide){
        pSlides.forEach((e)=>{
            let photoWidth = e.clientWidth;
            e.setAttribute('style',`left:${-(photoWidth*(currSlide-1))}px`);
        })
    }else{
        currSlide = 0;
        let offset = slideWidth*currSlide;
        pSlides.forEach((e)=>{
            e.setAttribute('style',`left:${-offset}px`);
        })
    }
}


nextBtn.addEventListener('click',()=>{
    nextMove();
})
preBtn.addEventListener('click',()=>{
    preMove();
})

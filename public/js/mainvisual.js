let $mvSlide = document.querySelectorAll('.mv_slide');
let $mvBtn = document.querySelectorAll('.mv_btn');
let $mvBtnWrap = document.querySelector('.mv_btn_wrap');
let mvSlideNum = 1;
const stopI = setInterval(()=>{
    $mvBtn.forEach((e)=>{
        e.classList.remove('mv_btn_active');
    })
    if(mvSlideNum <= $mvSlide.length - 1){
        $mvSlide[mvSlideNum].style.opacity = '1';
        $mvBtn[mvSlideNum].classList.add('mv_btn_active');
        mvSlideNum++
    }else{
        $mvBtn[0].classList.add('mv_btn_active');
        for(i = 1; i < $mvSlide.length;i++){
            $mvSlide[i].style.opacity = '0';
        }
        mvSlideNum=1;
    }
},2500);

console.log($mvBtn);
$mvBtn.forEach((e)=>{
    e.addEventListener('click',(c)=>{
        clearInterval(stopI);
        console.log(c.target.classList);
        let indexNum = Array.from($mvBtn).indexOf(c.target);
        for(i = 0; i < $mvSlide.length;i++){
                $mvSlide[i].style.opacity = '0';
                $mvBtn[i].classList.remove('mv_btn_active');
        }
        c.target.classList.add('mv_btn_active');
        $mvSlide[indexNum].style.opacity='1';
    })
})
// 로그인
let $hLogin = document.querySelector('.h_login');
let $login_box =document.querySelector('.login_box');

$hLogin.addEventListener('mouseover',()=>{
    $login_box.classList.add('active');
})
$hLogin.addEventListener('mouseleave',()=>{
    $login_box.classList.remove('active');
})


// gnb

let $gnb = document.querySelector('.gnb');
let $lnb = document.querySelectorAll('.lnb');
let $gnbBg = document.querySelector('.gnb_bg');

$gnb.addEventListener('mouseover',()=>{
    $lnb.forEach((e)=>{
        e.style.display = 'block';
        e.style.height = '300px';
    })
    $gnbBg.style.height ='300px';
    $gnbBg.style.borderTop = '1px solid #d8cabd';
})


 $gnb.addEventListener('mouseleave',()=>{
    $lnb.forEach((e)=>{
        e.style.display = 'none';
        e.style.height = '0';
    })
    $gnbBg.style.height ='0';
    $gnbBg.style.borderTop = '0';
})


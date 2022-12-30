
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
        // e.style.display = 'block';
        e.style.height = '300px';
    })
    $gnbBg.style.height ='300px';
    $gnbBg.style.borderTop = '1px solid #d8cabd';
})


 $gnb.addEventListener('mouseleave',()=>{
    $lnb.forEach((e)=>{
        // e.style.display = 'none';
        e.style.height = '0';
    })
    $gnbBg.style.height ='0';
    $gnbBg.style.borderTop = '0';
})

//모바일 메뉴
let body = document.getElementsByTagName('body');
let $mBtn = document.querySelector('.m_menu_btn');
let $mMenu = document.querySelector('.m_menu');
let $blocker = document.querySelector('.mm_page_blocker');
let $mmRemove = document.querySelector('.mm_remove');
$mBtn.addEventListener('click',()=>{
    $mMenu.classList.add('m_menu_on');
    $blocker.style.display = 'block';
    body[0].style.overflow = 'hidden';

})
$mmRemove.addEventListener('click',()=>{
    $mMenu.classList.remove('m_menu_on');
    $blocker.style.display = 'none';
    body[0].style.overflow = null;
})

//모바일 아코디언
let $menusTit = document.querySelectorAll('.m_menus_title');
let $menus = document.querySelectorAll('.m_menus');
$menusTit.forEach((event)=>{
    event.addEventListener('click',function(){
        $menus.forEach((e)=>{
            if(e.classList.value == "m_menus m_menus_title_on" && e !== this.nextElementSibling){
                e.classList.remove("m_menus_title_on");
            }
        })
        this.nextElementSibling.classList.toggle('m_menus_title_on');
    })
})

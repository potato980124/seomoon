// 서브페이지 메뉴 리스트 해당 페이지 위치 알려주기위해 흰색 입히는 스크립트
let subListTxt = document.querySelectorAll('.subpage_list_txt');
let subpageTitle = document.querySelector('.subpage_con_title');

subListTxt.forEach((e) => {
    if (e.innerHTML == subpageTitle.children[0].innerHTML) {
        e.style.color = '#fff';
    } else {
        e.style.color = '#808080';
    }
})

// 서브페이지 아코디언 
let subMenuTit = document.querySelector('.m_subpage_list_tit');
let subListMenu = document.querySelector('.subpage_list_menu');
console.log(subListMenu.scrollHeight);
subMenuTit.addEventListener('click',()=>{
    if(subListMenu.style.maxHeight){
        subListMenu.style.maxHeight = null;
    }else{
        subListMenu.style.maxHeight = subListMenu.scrollHeight+"px";
    }
})
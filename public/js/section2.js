let $menu = document.querySelectorAll('.menu');
let $sideMenu = document.querySelectorAll('.side_menu');
let $sideMenu1 = document.querySelector('#side_menu1');
let $sideMenu2 = document.querySelector('#side_menu2');
let $sideMenu3 = document.querySelector('#side_menu3');
let $sideMenu4 = document.querySelector('#side_menu4');

$menu.forEach((e)=>{
    e.addEventListener('mouseover',()=>{
        $sideMenu.forEach((e)=>{
            e.style.display = 'none';
        })
        if(e == $menu[0]){
            $sideMenu1.style.display = 'flex';
        }else if(e == $menu[1]){
            $sideMenu2.style.display = 'flex';
        }else if(e == $menu[2]){
            $sideMenu3.style.display = 'flex';
        }else if(e == $menu[3]){
            $sideMenu4.style.display = 'flex';
            return;
        }
    })
})
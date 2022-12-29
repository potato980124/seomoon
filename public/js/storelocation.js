// 매대검색 스크립트
let searchBtn = document.querySelector('.shop_search_btn');
let shopListWrap = document.querySelectorAll('.shop_list_wrap');
let leftTd = document.querySelectorAll('.left_td');

searchBtn.addEventListener('click',()=>{
    let searchCont = document.querySelector('#shop_search_cont').value;
    let notSearch = document.querySelector('.not_search');
    shopListWrap.forEach((e)=>{
        e.style.display ='none';
    })
    leftTd.forEach((e,index)=>{
        notSearch.classList.remove('not_search_on');
        if(searchCont ==  e.children[0].innerHTML){
            shopListWrap[index].style.display = '';
        }
    })
    notSearch.style.display = 'none';
    let test = [];
    for(i=0;i<shopListWrap.length;i++){
        if(shopListWrap[i].style.display == 'none'){
            test.push(shopListWrap[i].style.display);
        }
    }
    console.log(test.length);
    if(test.length == shopListWrap.length){
        notSearch.style.display = 'block';
    }
})
// 모바일용 검색 스크립트
let MsearchBtn = document.querySelector('#m_shop_search_btn');
let MshopListWrap = document.querySelectorAll('.cont_box');
let MshopTit = document.querySelectorAll('.m_shop_title');

MsearchBtn.addEventListener('click',()=>{
    let MsearchCont = document.querySelector('#shop_search_cont_m').value;
    let MnotSearch = document.querySelector('.m_not_search');
    MshopListWrap.forEach((e)=>{
        e.style.display ='none';
    })
    MshopTit.forEach((e,index)=>{
        MnotSearch.classList.remove('m_not_search_on');
        if(MsearchCont ==  e.innerHTML){
            MshopListWrap[index].style.display = '';
        }
    })
    MnotSearch.style.display = 'none';
    let test = [];
    for(i=0;i<MshopListWrap.length;i++){
        if(MshopListWrap[i].style.display == 'none'){
            test.push(MshopListWrap[i].style.display);
        }
    }
    console.log(test.length);
    if(test.length == MshopListWrap.length){
        MnotSearch.style.display = 'block';
    }
})









// 카카오맵 api 스크립트
let container = document.querySelector('.location_map_bg');
let options = {
    center: new kakao.maps.LatLng( 35.8685199638687, 128.58072584191453),
    level: 2
};
let map = new kakao.maps.Map(container, options);
// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter()
});
// 지도에 마커를 표시합니다
marker.setMap(map);

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
// kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

//     // 클릭한 위도, 경도 정보를 가져옵니다 
//     var latlng = mouseEvent.latLng;

//     // 마커 위치를 클릭한 위치로 옮깁니다
//     marker.setPosition(latlng);

//     var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
//     message += '경도는 ' + latlng.getLng() + ' 입니다';

//     var resultDiv = document.getElementById('clickLatlng');
//     resultDiv.innerHTML = message;

// });


// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다 
var polygonPath = [
    new kakao.maps.LatLng(35.868447028542306, 128.57890594051625),
    new kakao.maps.LatLng(35.86839279204006, 128.5789187034005),
    new kakao.maps.LatLng(35.8686006649031, 128.58212519250804),
    new kakao.maps.LatLng(35.868650069096645, 128.58213724607378)
];

// 지도에 표시할 다각형을 생성합니다
var polygon = new kakao.maps.Polygon({
path:polygonPath, // 그려질 다각형의 좌표 배열입니다
strokeWeight: 3, // 선의 두께입니다
strokeColor: '#39DE2A', // 선의 색깔입니다
strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
strokeStyle: 'solid', // 선의 스타일입니다
fillColor: '#A2FF99', // 채우기 색깔입니다
fillOpacity: 0.7 // 채우기 불투명도 입니다
});

// 지도에 다각형을 표시합니다
polygon.setMap(map);
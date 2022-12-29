// 카카오맵 api 스크립트
let container = document.querySelector('.market_map');
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
// 다각형을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 다각형을 표시합니다 
var polygonPath = [
    new kakao.maps.LatLng(35.868447028542306, 128.57890594051625),
    new kakao.maps.LatLng(35.86839279204006, 128.5789187034005),
    new kakao.maps.LatLng(35.8686006649031, 128.58212519250804),
    new kakao.maps.LatLng(35.868650069096645, 128.58213724607378)
];

// 지도를 클릭한 위치에 표출할 마커입니다
var marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter()
});
// 지도에 마커를 표시합니다
marker.setMap(map);

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

// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);    
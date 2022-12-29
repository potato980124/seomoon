let container = document.getElementById('api_map');
let storeName = document.querySelector('.store_name');
let storeMaker = storeName.innerText;
let storeLocation = [];
console.log(storeName.innerText);
if (storeName.innerText == '현풍닭강정') {
 storeLocation[0] = 35.86862449977965;
 storeLocation[1] = 128.58202602498875;
}
let options = {
    center: new kakao.maps.LatLng(storeLocation[0], storeLocation[1]),
    level: 1
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
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';

    var resultDiv = document.getElementById('clickLatlng');
    resultDiv.innerHTML = message;

});


// 커스텀 오버레이에 표시할 내용입니다     
// HTML 문자열 또는 Dom Element 입니다 
var content = `<div class ="label_bg">${storeMaker}</div>`;

// 커스텀 오버레이가 표시될 위치입니다 
var position = new kakao.maps.LatLng(storeLocation[0], storeLocation[1]);

// 커스텀 오버레이를 생성합니다
var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content
});

// 커스텀 오버레이를 지도에 표시합니다
customOverlay.setMap(map);
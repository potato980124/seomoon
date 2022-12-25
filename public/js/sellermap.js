let container = document.getElementById('api_map');
let options = {
    center: new kakao.maps.LatLng(35.86838315076729, 128.58043970042095),
    level: 2
};

let map = new kakao.maps.Map(container, options);
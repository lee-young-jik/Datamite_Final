// import React, { useEffect, useRef } from 'react'

// // 네이버지도 api 활용 목표 : 현재 위치를 초기 위치로 찍어주고
// // 근방 병원들(데이터로 받은)의 위치를 주변에 찍어주는 것.
// // 병원 마커를 누르면, 병원 정보를 보여주고, 길찾기 기능이 가능하도록

// // 주석들은 노션에 다시한번씩 정리하면서 회고하자.
// // 어딘가 오류가 생기지 않고도 구현이 안되면 어디서 잘못되었는지 console.log로 다찍어보면서 보자

// // 공식문서에서 HTML코드로 되어 있는 걸
// // React.js에서 쓰려면 script 태그를 동적으로 로드하는 컴포넌트를 만들면 됨.
// // HTML -> JSX 문법으로

// // React에서 컴포넌트의 라이프 사이클은 마운트, 업데이트, 언마운트로 이루어짐.
// // 마운트 : 컴포넌트가 처음 DOM에 삽입될 때의 단계. 즉, 처음 화면에 그려질 때
// // 업데이트 : 컴포넌트가 이미 DOM에 마운트된 후, 어떤 변경 요인으로 인해 다시 렌더링되는 단계 
// // 언마운트 : 컴포넌트가 DOM에서 제거될 때의 단계 - 컴포넌트와 관련된 리소스를 정리한다.
// // useEffect 훅은 이 단계들을 관리하기 위한 로직.

// export default function NaverMap2() {

//     // let map; // useEffect 범위의 상단에서 map 변수를 선언합니다.
//     const mapRef = useRef(null);

//     useEffect(() => { // useEffect를 사용하여 컴포넌트의 마운트, 업데이트, 언마운트 시점에 로직을 실행할 수 있고, 비동기 연산을 수행해야 할 때 사용
//         // 스크립트가 이미 로드된 경우 더 이상 로드하지 않기 위해
//         if (window.naver) return;
//         // naver가 전역 객체로 존재한다면, window.naver를 통해 참조할 수 있다.

//         const script = document.createElement('script');
//         script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=a8w3asjtpf"
//         script.async = true;

//         const infowindow = new window.naver.maps.InfoWindow();
        
        
//         script.onload = () => {
//             // 비동기 실행때문에 안될 수도 있기에 스크립트가 완전히 로드된 후에 naver 객체를 안전하게 사용.
//             const mapOptions = {
//                 center: new window.naver.maps.LatLng(37.3595704, 127.105399),
//                 zoom: 10,
//                 mapTypeId: window.naver.maps.MapTypeId.NORMAL
//             }
//             mapRef.current = new window.naver.maps.Map("map",mapOptions);
//         };
//         document.body.appendChild(script);
//         // DOM에 접근해 특정 요소를 DOM에 추가하는 작업.
//         // <body> 요소에 접근해 참조하고, appendChild : DOM 요소 메소드로, 해당 요소의 자식 요소로서 새로운 요소나 노드를 추가.
//         // 위를 통해 생성된 새로운 <script>요소를 나타낸다.
//         // 따라서 생성된 새로운 <script> 요소를 웹페에지의 <body> 부분의 마지막 자식 요소로 추가하는 것을 의미.
//         // 이렇게 해야 웹브라우저는  <script> 태그의 내용(여기서는 네이버 지도 API 스크립트)을 로드하고 실행.

//         function onSuccessGeolocation(position) {
//             var location = new window.naver.maps.LatLng(position.coords.latitude,
//                                                  position.coords.longitude);
        
//             mapRef.current.setCenter(location); // 얻은 좌표를 지도의 중심으로 설정합니다.
//             mapRef.current.setZoom(10); // 지도의 줌 레벨을 변경합니다.
        
//             infowindow.setContent('<div style="padding:20px;"> geolocation.getCurrentPosition() 위치</div>');
        
//             infowindow.open(mapRef.current, location);
//             console.log('Coordinates: ' + location.toString());
//         }
        
//         function onErrorGeolocation() {
//             var center = mapRef.current.getCenter();
        
//             infowindow.setContent('<div style="padding:20px;">' +
//                 '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5> latitude: center.lat() <br /> longitude: center.lng() </div>');
        
//             infowindow.open(mapRef.current, center);
//         }
        
//         // $(window).on("load", function() - jQuery문법으로 JS로 바꾸려면
//         window.addEventListener("load",function() {
//             if (navigator.geolocation) {
//                 /**
//                  * navigator.geolocation 은 Chrome 50 버젼 이후로 HTTP 환경에서 사용이 Deprecate 되어 HTTPS 환경에서만 사용 가능 합니다.
//                  * http://localhost 에서는 사용이 가능하며, 테스트 목적으로, Chrome 의 바로가기를 만들어서 아래와 같이 설정하면 접속은 가능합니다.
//                  * chrome.exe --unsafely-treat-insecure-origin-as-secure="http://example.com"
//                  */
//                 navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
//             } else {
//                 var center = mapRef.current.getCenter();
//                 infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
//                 infowindow.open(mapRef.current, center);
//             }
//         });


//         // 컴포넌트가 언마운트될 때 스크립트를 제거.
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);
//     // 빈 의존성 배열을 사용해 이 훅이 컴포넌트 마운트 시에만 실행되도록

//     // naver가 정의되지 않았다.
//     // 정의X 오류 : 자바 스크립트에서 해당 변수나 객체에 대한 참조가 현재 스코프 내에 존재하지 않을 때 발생
//     // 스코프 : 변수, 상수, 매개변수, 객체 또는 함수의 접근 가능범위와 생존기간을 나타내는 용어
//     // 전역 스코프, 함수 스코프, 블록 스코프
//     // 참조란? 변수나 객체가 메모리의 어떤 위치를 가리키는 것

//     // 문제의 원인은 'naver'객체가 스크립트 로드가 완료되기 전에 참조되려고 하기 때문
//     // 원래 자바 스크립트는 순차적으로 실행되지만,
//     // 스크립트 로딩은 비동기적으로 진행되므로,
//     // naver 객체를 참조하는 코드가 스크립트가 완전히 로드 되기 전에 실행되서 이런 문제가 발생.
//     // 옳게 된 순서 : 스크립트 완전 로드 -> naver 객체 참조

//     // 동일한 스크립트 반복 로딩 : 이 컴포넌트가 여러 번 마운트되면, 스크립트도 그만큼 여러번 로드 된다.
//     // 이는 불필요한 네트워크 트래픽과 중복 로딩을 초래할 수 있다.
//     // 이 문제를 해결하기 위해, 컴포넌트의 라이프 사이클을 사용해 스크립트를 로드하고 초기화하는 방식을 적용할 수 있는데,
//     // 여기에 useEffect 훅을 사용하면 된다.

    
//   return (
//     <div id="map" style={{width:'500px', height:'400px'}}></div>
//   )
// }



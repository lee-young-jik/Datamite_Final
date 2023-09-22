import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material';

// 따로 컴포넌트를 만들어 주고, Home에다 넣자.

// // 이 로직은 동적 지도 + Geocoding까지 사용할 때

export default function NaverMap() {


    const mapRef = useRef(null);
    // map을 생성해 여러 커스텀을 하고, 마커도 생성하고, map에게 많은 기능을 줄 것이라,
    // 특정 dom에 다가갈 수 있는 useRef 생성
    // 지도는 컴포넌트가 렌더링 되고, 딱 한번 그려야 되기 때문에 useEffect안에서 생성한다.
    // 이때 생성되는 조건은 myLocation이 초기값('string')이 아닐 때 실행되는 것.
    // 생성된 지도는 mapRef.current안에 담아둘 거고,
    // 이제부터 new window.naver.maps를 사용해 지도와 관련된 모든 것을 mapRef.current를 사용하려 함.

    const markerRef = useRef(null);
    
    const [myLocation, setMyLocation] = useState('');

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: 37.5665, //위도
        lng: 126.9780 //경도
    });

    const [hospitals, setHospitals] = useState([]);

    

    //현재 위치를 추적
    useEffect(()=>{

        // 위치 추적에 성공했을 때 위치 값을 넣어준다.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,err);
        }

        function success(position) {
           const newLocation = {
            latitude : position.coords.latitude,
            longitude: position.coords.longitude
           };
            setMyLocation(newLocation);
        
           console.log("위치추적 허용했으니까 현재 위치 추적 성공!, 현재 위치는:",setMyLocation);
           // setMyLocation 값이 ƒ dispatchSetState(fiber, queue, action) {
                                   //   {
                                   //     if (typeof arguments[3] === 'function') {
                                   //       error("State updates from the useState() and useReducer() Hooks don't support the " + 'sec…
                                   //     }
            }
        
        
       // 위치 추적에 실패했을 때 초기값 넣어주기
       function err() {
           setMyLocation({latitude: 37.4979517, longitude: 127.0276188});
           console.log("에러!");
       }

   }, []);



   //지도 생성 (네이버 지도 API는 지도를 로드 시키고 초기화 시키고 기능들을 사용해야 오류가 안나기에
                // 하나의 useEffect에서 관리하자.)
   useEffect(() => {

    const script = document.createElement('script');
    const ApiKey_ClientId = process.env.REACT_APP_MAP_KEY; // 환경변수에서 가져온 것,.
    const ApiKey_Secret = process.env.NAVER_CLIENT_SECRET;

    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ApiKey_ClientId}`;
    script.async=true;

    script.onload = () => {
        console.log("스크립트 로드는 잘되었어.");
        if(typeof myLocation !== 'string') {
            console.log("mapRef는?",mapRef)
            // 조건문을 분리하니까 새로고침 많이 해도 오류가 안생기고, ip 위치 추적이랑 그에 맞는 marker도 정확히 잘됨.
            // 조건문을 분리하게 되면 로직이 더 명확해지고, 각 조건의 평가 순서와 실행 순서가 바뀌게 된 원리.
            // 따라서 각 조건을 독립적으로 평가하면, 한 조건의 부작용이 다른 조건의 평가에 영향을 주지 않아 예상치 못한 오류나 버그의 가능성이 줄어듬
            if (mapRef.current) {
            console.log("myLocation, mapRef 둘다 유효");

            mapRef.current = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
                zoomControl : true,
            });
            console.log(mapRef.current);

            } else {
            console.log("mapRef가 안먹는 경우");
    
            const mapOptions = {
                center : new window.naver.maps.LatLng(coordinates.latitude, coordinates.longitude),
                zoom : 15
            };
            mapRef.current = new window.naver.maps.Map('map', mapOptions);
            console.log("지도 로딩 실패");
                }
        }
        else {
            console.log("myLocation이 문자열이고, mapRef가 정의가 안된 경우");
        }

    //    async function fetchHospitals() {
    //     try {
    //         const response = await fetch("http://localhost:4000/api/searchHospitals?query=주변병원");
    //         const data = await response.json();
    //         setHospitals(data.items); // 병원 데이터를 hospitals 상태 변수에 저장
    //     } catch (error) {
    //         console.error("병원 데이터를 가져오는 중 오류 발생:",error);
    //     }
    //    }
    //    fetchHospitals();
       
    //    hospitals.forEach(item => {
    //     const marker = new window.naver.maps.Marker({
    //         position: new window.naver.maps.LatLng(item.map_y, item.map_x),
    //         map: mapRef.current,
    //     });

    //     // 마커에 툴팁으로 병원 이름 추가
    //     const infoWindow = new window.naver.maps.InfoWindow({
    //         content: `<div style="padding:5px;">${item.title}</div>`
    //     });

    //     window.naver.maps.Event.addListener(marker,'click',function() {
    //         if (infoWindow.getMap()){
    //             infoWindow.close();
    //         } else {
    //             infoWindow.open(mapRef.current, marker);
    //         }
    //     });
    //    });
        
        // 마커 생성 로직을 여기에
        markerRef.current = new window.naver.maps.Marker({
            position : new window.naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
            map: mapRef.current,
            // icon: {
            //     content: [markerHtml("현재 위치")].join(''),
            //     size: new window.naver.maps.Size(38,58),
            //     anchor: new window.naver.maps.Point(19,58),
            // },
            });

        // **병원 데이터를 기반으로 마커 생성
        // hospitals.forEach(item => {
        //     const marker = new window.naver.maps.Marker({
        //         position: new window.naver.maps.LatLng(item.map_y, item.map_x),
        //         map : mapRef.current,
        //     });

        //     // 마커 클릭 시 부드럽게 지도 이동
        //     window.naver.maps.Event.addListener(marker,'click',() =>{
        //         const mapLatLng = new window.naver.maps.LatLng(
        //             Number(item.map_y),
        //             Number(item.map_x)
        //         );
        //         mapRef.current.panTo(mapLatLng);
        //     });
        // });
        
        // 여러 마커 사용할 떄 쓰면 된다고 함.
        // 여러 마커를 생성해야 하는 경우에는 배열로 담은 리스트를 준비
        // 하나의 마커 생성하는 것과 같이 사용하면 된다.
        // const RenderMarkers = ({data} : { data : HospitalListType[]}) => {
        //     data?.map((item: HaspitalListType) => {
        //         markerRef.current = new window.naver.maps.Marker({
        //             position: new window.naver.maps.LatLng(item?.map_y_location, item?.map_x_location),
        //             map : mapRef.current
        //             icon: {
        //               content: [markerHtml(item.name)].join(''),
        //               size: new naver.maps.Size(38, 58),
        //               anchor: new naver.maps.Point(19, 58),
        //         })
        //     }); // 위의 예제는 네이버 지도 위에 마커를 찍는 로직을 React 컴포넌트 형태로 나타낸 것.
        //  return null;  // 그러나 RenderMarkers 컴포넌트는 실제로 렌더링 되는 내용이 없기 때문에 null을 반환
        // } //  -- 사용 예 ) <RenderMarkers data = {ourDataArray} />


        // 마커 클릭시 부드럽게 지도 이동 (마커생성 직후에 해당 마커에 이벤트 리스너를 추가하는 역할이니까, 마커 생성 로직 아래에서 해당 함수를 호출해야 한다.)
        
        function markerClickEvent(marker) {
            window.naver.maps.Event.addListener(marker, 'click', (e) => {
                const mapLatLng = new window.naver.maps.LatLng(
                    myLocation.latitude,
                    myLocation.longitude
                );
                // 선택한 마커로 부드럽게 이동
                mapRef.current.panTo(mapLatLng, e?.coord)
                // coord는 클릭 이벤트 발생 시 해당 이벤트 객체(e)에 포함된 좌표 정보를 나타낸다.
                // e.coord에서 반환되는 객체는 x가 경도 longitude, y가 위도 latitude 정보
            })
        }

    }; // onload가 여기서 끝남 - 대부분의 로직을 여기에다 넣어두어야 문제가 안생김

    document.head.appendChild(script);
    
    return () => {
        document.head.removeChild(script);
    }

   }, [coordinates,myLocation]);





   return ( // 반환 부분이고, 주소 입력 필드, 검색 버튼, 지도를 렌더링

        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
            <div>
                {/* <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='주소를 입력하세요'    
                />
                <button onClick={handleSubmit}>검색</button> */}
            </div>
            <div id="map" ref={mapRef} style={{width:'500px', height:'400px'}}></div>
            </Box>
        </div>
    );

}


//    //지도 생성 로직
//    // 이거까지 만드니까 왼쪽에 무슨 바가 하나 생김 + - 
//    useEffect(() => {
//     if(typeof myLocation !== 'string')
//         mapRef.current = new window.naver.maps.Map('map', {
//     center : new window.naver.maps.LatLng(myLocation.latitude,myLocation.longitude),
//     zoomControl : true,
//     });
//    }, [mapRef, myLocation]);
    
//     // useEffect를 왜 사용하는가? = 
//     useEffect(() => {
//         // 지도 스크립트를 로드하기 위해 동적으로 <script> 태그를 생성하고 설정.
//         const script = document.createElement('script');
//         // const(상수,값변화불가) / script라는 태그 요소를 HTML 문서에 생성하기 위한 명령어
//         // document는 웹페이지의 DOM(Document Object Model)을 참조하는 객체.
//         // createElement('script') DOM에서 새로운 요소를 생성하는 메소드.

//         const ApiKey_ClientId = process.env.REACT_APP_MAP_KEY;

//         script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ApiKey_ClientId}`;// YOUR_NAVER_API_KEY
//         script.async = true;

//         // 스크립트 로드가 완료될 때 실행될 콜백 함수 설정

//         script.onload = () => { // 스크립트 로드 완료시 지도를 초기화
//             const mapOptions = {
//                 center: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
//                 zoom: 10
//             };
//             const map = new window.naver.maps.Map('map', mapOptions);
//         }

//         document.head.appendChild(script);

//         // 컴포넌트가 언마운트 될 때 스크립트를 제거합니다.
//         return () => {
//             document.head.removeChild(script);
//         }

//     },[coordinates]); // coordinates 상태 값에 변화가 있을 때마다 실행되는 useEffect


    // useEffect(() => {

    //     if (window.naver) {
    //         const mapOptions = {
    //             center: new window.naver.maps.LatLng(coordinates.lat, coordinates.lng),
    //             zoom : 10
    //         };
    //         const map = new window.naver.maps.Map('map',mapOptions);
    //     }
    // }, [coordinates]); // coordinates 상태값에 변화가 있을 대 마다 실행된다.
    // // 여기선 스크립트가 로드된 상태를 가정하고 지도를 초기화한다.


    // const handleSubmit = async() => {
    //     // 주소를 기반으로 Geocode API를 호출하여 해당 주소의 좌표를 얻어와 상태를 업데이트하는 비동기 함수
    //     try {
    //         const response = await fetch(`http://localhost:4000/getGeoCode?address=${encodeURIComponent(address)}`);
    //         const result = await response.json();

    //         if (result.addresses && result.addresses.length > 0) {
    //             const { x , y } = result.addresses[0];
    //             setCoordinates({lat: y, lng: x});
    //         }
    //     } catch(error) {
    //         console.error("fetch geocode:",error);
    //         alert("주소 검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    //     }
    //     };


    
//    // 지도에 마커 생성하기 // mark를 가지고 다양한 이벤트를 생성해 줄 것이기 때문에 useRef를 사용해 생성한 마커를 markerRef에 담아준다.
//    useEffect(() => {
//     script.onload = () => {
//         markerRef.current = new window.naver.maps.Marker({
//             position : new window.naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
//             map: mapRef.current,
//             // icon: {
//             //     content: [markerHtml("현재 위치")].join(''),
//             //     size: new window.naver.maps.Size(38,58),
//             //     anchor: new window.naver.maps.Point(19,58),
//             // },
//             });
//         }
//    }, [myLocation, mapRef.current])// useEffect 내부에서 사용하는 값에 변화가 생겨도 useEffet가 다시 실행되지 않게함.
//    // myLocation 또는 mapRef.current의 변화를 감지해 useEffect를 다시 실행시키려면 의존성 배열에 해당 값을 추가해야한다.






//     // 동적 지도만 사용하려면<< 아래 코드로 대체하면 되고

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=a8w3asjtpf';// YOUR_NAVER_API_KEY
//         script.async = true;

//         document.head.appendChild(script);

//         script.onload = () => {
//             const mapOptions = {
//                 center : new window.naver.maps.LatLng(37.5665, 126.9780),
//                 zoom : 10
//             };
//             const map = new window.naver.maps.Map('map',mapOptions);
//         };

//         }, []);
    
    
//         return (
//         <div id = "map" style={{width:'500px', height:'400px'}}></div>
//     )
//     }


//     function Map() {
//         const mapElement = useRef(null);
//     }
    
//     useEffect(() => {
//         const { naver } = window;
//         if (!mapElement.current || !naver) return;
    
//         // 로케이션 표시 Google maps에서 원하는 장소 찾은 후 주변 검색을 누르면 좌표를 찾을 수 있다.
//         const location = new naver.map.LatLng(37,5663,126.9779);
    
//         //네이버 지도 옵션 선택
//         const mapOptions = {
//         center: location,
//         zoom : 16,
//         zoomControl : true,
//         ZoomControlOptions : {
//             position : naver.maps.Position.TOP_RIGHT,
//         },
//         };
    
//         const map = new naver.maps.Map(mapElement.current, mapOptions);
    
//         // 지도상에 핀 표시할 부분
//         new naver.maps.Marker({
//         position: location,
//         map: map,
//         });
//   }, []);
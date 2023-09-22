import React, { useEffect, useRef, useState } from 'react'

// 자바스크립트에서 제공하고 있는 navigator.geolocation API를 사용하여 사용자의 위치를 추적.

export default function NaverMap3() {

    const mapRef = useRef(null);

    const [myLocation, setMyLocation] = useState('');



    //현재 위치를 추적
    useEffect(()=>{

         // 위치 추적에 성공했을 때 위치 값을 넣어준다.
         function success(position) {
            setMyLocation({
                latitude : position.coords.latitude,
                longitude: position.coords.longitude,
            });
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


        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, err);
        }


    }, []);

  return (
    <div id="map" style={{width:'500px', height:'400px'}}></div>
  )
}

import React, { useState } from 'react'
import 하체 from '../assets/image/body_bottom.png'
import 머리 from '../assets/image/head_neck.png'
import 상체 from '../assets/image/body_upperbody.png'
import 왼팔 from '../assets/image/left_arm.png'
import 오른팔 from '../assets/image/right_arm.png'

import "../css/Character.css"

export default function Character() {

    const [active1, setActive1] = useState(false); // 머리,목 상태를 관리하는 hook
    const [active2, setActive2] = useState(false); // 상체
    const [active3, setActive3] = useState(false); // 오른팔
    const [active4, setActive4] = useState(false); // 왼팔
    const [active5, setActive5] = useState(false); // 하체

    // 1단계
    const [showHeadDetail, setShowHeadDetail] = useState(false);
    const [showRightHandDetail, setShowRightHandDetail] = useState(false);

    // 2단계
    const [showHeadDetail_2_1, setShowHeadDetail_2_1] = useState(false);

    
    // 체크박스를 클릭할 때는 상위 요소의 onClick 이벤트가 발동하는 것을 방지하기 위한 함수
    function handleCheckboxClick(event) {
        event.stopPropagation();
        // 이 메서드를 사용하면 체크박스에서 발생하는 클릭 이벤트가 상위 요소로 전파되지 않는다.
    }

    // function handleImageClick(setter) {
    //     // 각 이미지를 공통적으로 관리하는 게 아니라 독립적으로 핸들하려면
    //     // 
    //     return function(event) {
    //         if(event.target === event.currentTarget) {
    //             setter(prevState => !prevState);
    //         }
    //     }
    // }

  return (
    <div className='container'>
        <div className={`image-item1-container ${active1? 'active' : ''}`}
        >
            <img src = {머리} className='image-item1' onClick={()=>setActive1(!active1)}/>
            {/* 이미지 자체를 클릭했을 때만 상태가 변경되고, 체크박스를 클릭하면 상태가 변경되지 않을 것. */}

            <div className='checkbox-container1' onClick={handleCheckboxClick}>
                
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'
                        onChange={()=> setShowHeadDetail(prev => !prev)}
                    />
                    <span className='img-text'>머리</span>
                

                {showHeadDetail && (
                    <div className='card'>
                        <div className='checkbox-wrapper'> 
                            <input type="checkbox" className='img-checkbox' onChange={()=> setShowHeadDetail_2_1(prev => !prev)}/>
                            <span className='img-text'>두통</span>
                        </div>
                            {showHeadDetail_2_1 && (
                                <div className='card-detail' style={{marginLeft:"50px"}}>
                                    <input type="checkbox" className='img-checkbox'/>
                                    <span className='img-text'>머리를 부딪힘</span>
                                </div>
                            )}

                        <div className='checkbox-wrapper'> 
                            <input type="checkbox" className='img-checkbox'/>
                            <span className='img-text'>어지럼증</span>
                        </div>
                    </div>
                )}

                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>눈</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>코</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>입</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>목</span>
                </div>
            </div>
        </div>

        <div className={`image-item2-container ${active2? 'active' : ''}`}
        >
          <img src = {상체} className='image-item2' onClick={()=>setActive2(!active2)}/>
            <div className='checkbox-container2' onClick={handleCheckboxClick}>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>쇄골</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>가슴</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>명치</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>배</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>옆구리</span>
                </div>
            </div>
        </div>

        <div className={`image-item3-container ${active3? 'active' : ''}`}
        >
          <img src = {오른팔} className='image-item3' onClick={()=>setActive3(!active3)}/>
            <div className='checkbox-container3' onClick={handleCheckboxClick}>
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>오른손</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>오른쪽 손목</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>오른쪽 팔</span>
                
                
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>오른쪽 어깨</span>
                
            </div>
        </div>

        <div className={`image-item4-container ${active4? 'active' : ''}`}
        >
          <img src = {왼팔} className='image-item4' onClick={()=>setActive4(!active4)}/>
            <div className='checkbox-container4' onClick={handleCheckboxClick}>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>왼손</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>왼쪽 손목</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>왼쪽 팔</span>
                </div>
                <div className='checkbox-wrapper'>
                    <input type="checkbox" className='img-checkbox'/>
                    <span className='img-text'>왼쪽 어깨</span>
                </div>
            </div>
        </div>

        <div className={`image-item5-container ${active5? 'active' : ''}`}
                // onClick={()=> setActive5(!active5)}
        >
          <img src = {하체} className='image-item5' onClick={()=>setActive5(!active5)}/>
                <div className='checkbox-container5' onClick={handleCheckboxClick}>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>고관절</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>급소</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>허벅지</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>무릎</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>종아리</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>발목</span>
                    </div>
                    <div className='checkbox-wrapper'>
                        <input type="checkbox" className='img-checkbox'/>
                        <span className='img-text'>발</span>
                    </div>
                </div>
            </div>
    </div>
  )
}

import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Card, Box } from '@mui/material';
import 임시로고 from '../assets/image/logo1.png'
import { Link } from 'react-router-dom';
import '../css/Myinfo.css';

import { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Form } from 'react-bootstrap';

export default function Myinfo() {
 
    // const [activeTab, setActiveTab] = useState('tab1');

    // const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    // const [errorMessege, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    // const loggedInUserId = "테스트 유저 ID";
    // const loggedInUserPassword = "테스트 유저 PW";
    // const loggedInUserEmail = "테스트 유저 Email";

    const accessToken = window.sessionStorage.getItem("AccessToken");

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        birthDate: '',
        gender: '',
        email: '',
      });

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handlePasswordModalClose = () => setShowPasswordModal(false);
    
    useEffect(() => {
        async function myinfo() {

            // const accessToken = window.sessionStorage.getItem("AccessToken")

            try {
                const result = await axios.get("http://localhost:8080/api/member/me",
                {
                    headers: {
                        Authorization: accessToken,
                        'Content-Type': 'application/json'
                    }
                }
                );
                console.log(result.data);
                setUserData(result.data);
            } catch (error) {
                console.error('데이터를 가져오는 동안 오류 발생:', error);
            }
        }
        myinfo();
    }, []);

    async function onUpadte(event) {
        // navigate("/myInfoUpdate");
        setShowPasswordModal(true);
    }

    async function verifyPassword(event) {
        try {
            const result = await axios.post(
                "http://localhost:8080/api/member/verifyPassword",
                {
                    password: passwordInput,
                },
                {
                    headers: {
                        Authorization: accessToken,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (result.status ===  200) {
                // 비밀번호가 맞으면 수정 페이지로 이동
                navigate("/myInfoUpdate");
                setShowPasswordModal(false);
            } else {
                setPasswordError("비밀번호가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("비밀번호 확인 중 오류 발생:", error);
            setPasswordError("비밀번호 확인 중 오류가 발생했습니다.");
        }
    }


    // function onChange(event) {
    //     const { name, value } = event.target;
    //     if (name === "id") {
    //         setId(value)
    //     } else if (name === "password") {
    //         setPassword(value)
    //     }
    // }

    // async function onSubmit(event) {
    //     event.preventDefault();
    //     try {
    //         const result = await axios.post("http://localhost:8080/signin", {
    //             id: id,
    //             password: password,
    //         })
    //         if (result.status === 200) {
    //             navigate("/main")  // 로그인 성공 후 리다이렉트 할 경로를 지정하세요.
    //         }
    //     } catch(error) {
    //         console.log(error);
    //         // 에러 처리 코드를 여기에 추가하세요.
    //     }
    // }

 
    return (

        <div>
        {/* <div>
        <Box display="flex" justifycontent="center" alignitems="center" marginRight="50px">
                <img src = {임시로고} alt="logo" className='logo-image'/>
                  
                  <a href="http://localhost:3000" className="link" style={{ textDecoration : "none"}}>
                    <span className="textLogo" style={{color:"#34b4fc", marginTop:"100px"}}><h2 style={{marginTop:"10px"}}>오늘의 병원</h2></span>
                  </a>
        </Box>

        <Box display="flex" justifycontent="center" alignitems="center">
            <div className="card" style={{width:"80vh"}}>
                <div className="tabs">
                    <button 
                        className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('tab1')}
                    >
                        회원정보 수정
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('tab2')}
                    >
                        내가 쓴 글
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'tab3' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('tab3')}
                    >
                        회원탈퇴
                    </button>
                </div>
                {activeTab === 'tab1' &&
                <div className="tab-content active">
                        <form onSubmit={onSubmit}>
                            {errorMessege.length > 0 &&
                                (<div className="alert alert-danger" role="alert">
                                    {errorMessege.map((message, index) => (<div key={index}>{message}</div>))}
                                </div>)
                            }
                            <div className="mb-3 d-flex">
                                <input
                                    onChange={onChange} value={loggedInUserId} placeholder="아이디" // 로그인된 사용자의 id 값을 value로 설정
                                    type="text" name="id" id="id" className="form-control"/>
                                
                            </div>
                            <div className="mb-3">
                                <input
                                    onChange={onChange} value={loggedInUserPassword} 
                                    placeholder="비밀번호"
                                    type="password" name="password" id="password" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input
                                    onChange={onChange} value={loggedInUserEmail}
                                    placeholder="이메일"
                                    type="text" name="id" id="id" className="form-control"/>
                            </div>
                            <div className="mb-3" style={{display:"flex", justifycontent:"center", alignitems:"center"}}>
                            <button type="submit" className="btn btn-light btn-lg" style={{ width: "100%", backgroundColor:"#34b4fc", color:"white" }}>변경사항 수정</button>
                            </div>
                        </form>
                </div>}
                
                {activeTab === 'tab2' && <div className="tab-content active">게시판에 쓴 글들 리스팅 되게</div>}
                {activeTab === 'tab3' && <div className="tab-content active">
                    <div className="mb-3" style={{display:"flex", justifycontent:"center", alignitems:"center"}}>
                        <button type="button" className="btn btn-danger">회원탈퇴</button>
                    </div>
                </div>}
        </div>
    </Box>
    </div> */}

    <div>
    <Container>
            <h1 className="mt-5">마이페이지</h1>
            <Row className="mt-3">
                <Col sm={2}><strong>아이디:</strong></Col>
                <Col>{userData.id}</Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}><strong>비밀번호:</strong></Col>
                <Col>{userData.password}</Col>
                <Col>
                    <Button variant="secondary" onClick={onUpadte} className="float-right">
                    비밀번호 변경
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}><strong>이름:</strong></Col>
                <Col>{userData.name}</Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}><strong>생년월일:</strong></Col>
                <Col>{userData.birthDate}</Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}><strong>성별:</strong></Col>
                <Col>{userData.gender}</Col>
            </Row>
            <Row className="mt-3">
                <Col sm={2}><strong>이메일:</strong></Col>
                <Col>{userData.email}</Col>
            </Row>

            {/* 비밀번호 확인 모달 */}
            <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>비밀번호를 입력하세요:</Form.Label>
                        <Form.Control
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </Form.Group>
                    {passwordError && (
                        <div className="text-danger">{passwordError}</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePasswordModalClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={verifyPassword}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </div>
        </div>
  )
}

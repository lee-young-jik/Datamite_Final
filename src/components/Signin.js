import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import 임시로고 from '../assets/image/logo1.png'
import 구글로고 from '../assets/image/google.png'
import 네이버로고 from '../assets/image/naver.png'
import 카카오로고 from '../assets/image/kakao.png'
import '../css/Signin.css'
import AuthContext from "../components/AuthContext";

// 실제 프로덕션 환경에선 httpOnly 쿠키를 사용하는 것을 고려해야 한다.
// 다른 방법들은 보안상 문제가 생길 수 있다.

// 토큰의 만료일, 사용자 권한 등을 검사하는 로직은 서버에서

export default function Signin() {

    // 사용자에게 입력필드 유효성 검사로 알리는 역할하는 변수들
    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");

    const { loggedIn, setLoggedIn } = useContext(AuthContext); // 로그인 상태 관리

    const [saveID, setSaveID] = useState(false); // ID 자동 저장 체크박스의 상태 관리
    const [savedID, setSavedID] = useState(""); // ID 자동 저장 체크박스에 체크했으면, id가 저장될 변수

    const [autoLogin, setAutoLogin] = useState(false); // 체크박스 상태 관리

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessege, setErrorMessage] = useState([]);
    const navigate = useNavigate();


    function validateId() { // id 유효성 검사 - 텍스트로 사용자에게 알림
        if (id === "") {
            setIdError("아이디를 입력해 주세요.");
            return false;
        } else {
            setIdError(""); // No error
            return true;
        } 
    }
    function handleIdBlur() {
        validateId();
    }

    function validatePw() { // pw 유효성 검사 - 텍스트로 사용자에게 알림
        if (password === "") {
            setPwError("비밀번호를 입력해 주세요.");
            return false;

        } else {
            setPwError(""); // No error
            return true;
        } 
    }
    function handlePwBlur() {
        validatePw();
    }

    function onChange(event) {
        // onChange에서 로그인 검증 로직

        const { name, value } = event.target;
        if (name === "id") {
            if (value.length >= 5 || value.length <= 20){ // 5~20자
                setId(value);
            }
        }else if (name === "password") {
            if (value.length >= 8 || value.length <= 16){ // 8~16자
                setPassword(value)
            }
        }
    }


    function handleCheckboxChange(event) { // 체크박스의 상태 변경 핸들러
        const { checked } = event.target;
        setSaveID(checked);
    }

    function handleAutoLoginCheckboxChange() {
        // 체크박스가 선택되면, 로그인 시 토큰이나 필요한 인증 정보를 브라우저에 저장.
        // 페이지가 로드될 때 저장된 토큰이나 인증 정보를 확인하고 유효한 경우 사용자를 자동으로 로그인.
        // ID 저장은 단순히 사용자의 아이디를 로컬에 저장하는 것이며, 자동 로그인은
        // 사용자의 세션 또는 토큰 정보를 유지하여 사용자가 매번 로그인하지 않아도 되게 하는 기능.
        // 따라서 보안을 고려해야 한다. 토큰이나 세션을 로컬에 저장하는 것은 위험할 수 있다.
        setAutoLogin(prev => !prev);
        // prev는 현재 상태 값이고 !prev는 반대값
    }

    async function onSubmit(event) {
        event.preventDefault();

        // 각각의 검증 함수 호출
        const isIdOk = validateId();
        const isPasswordOk = validatePw();

        if (isIdOk && isPasswordOk) {

            try {
                const result = await axios.post("http://localhost:8080/api/auth/login", {
                    id: id,
                    password: password,
                })
                if (result.status === 200) { // 로그인 성공하면~
                    setLoggedIn(true); // 로그인 성공 상태값 주기
                    if (saveID) {
                        localStorage.setItem("savedID", id); // 로그인 성공 후 ID 저장 - ID 자동 저장 기능을 위함.
                    }
                    if (autoLogin) { // 자동저장 체크 되어 있으면, 로컬 스토리지에 저장
                        localStorage.setItem("loginToken", result.data.token);
                    }
                    navigate("/main");  // 로그인 성공 후 리다이렉트 할 경로를 지정하세요.
                }
            } catch(error) {
                console.log(error);
                // 에러 처리 코드를 여기에 추가하세요.
            }
        } else {
            alert("입력한 정보를 다시 한번 확인해 주세요.");
        }
    }

    // 페이지 로드 시 ID 자동 채우기(자동 저장에 체크했을 때만)
    useEffect(()=> {
        const token = localStorage.getItem("loginToken");
        const savedIDFromLocalStoarage = localStorage.getItem("savedID");
        if(savedIDFromLocalStoarage) { // 체크가 되어 있으면,
            setSavedID(savedIDFromLocalStoarage);
            setId(savedIDFromLocalStoarage);
            setSaveID(true); // 자동 저장 체크박스를 체크된 상태로 설정
        }
        if (token) {
            // 토큰이 있으면, 서버에 토큰 검증 요청(이 장소가 있을까?)
            // 이 방식은 기본적인 구현 방법. 실제 배포 환경에선 보안을 강화하기 위해 추가적인 작업이 필요할 수 있다. 예를 들어 토큰을 httpOnly 쿠키로 저장하거나, 서버와 클라간 통신에 https를 사용하는 걸 고려해야 함
            axios.post("http://localhost:8080/verifyToken", {token})
                .then(response => {
                    if (response.data.valid) {
                        setLoggedIn(true);
                    } else {
                        localStorage.removeItem("loginToken");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    return (
        <div>
        <Box display="flex" justifycontent="center" alignitems="center" marginRight="50px">
                <img src = {임시로고} alt="logo" className='logo-image'/>
                  
                  <a href="http://localhost:3000" className="link" style={{ textDecoration : "none"}}>
                    <span className="textLogo" style={{color:"#34b4fc", marginTop:"100px"}}><h2 style={{marginTop:"10px"}}>리뷰병</h2></span>
                  </a>
        </Box>

        <Box display="flex" justifycontent="center" alignitems="center">

        <Card variant="outlined" sx={{ minWidth: 275, maxWidth: "70vw",  width:"70vh", padding: 5.,boxShadow:'none' }}>
            <div className="container my-3">
            
            <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"10px", backgroundColor:"white", color:"black", fontSize:"16px", boxShadow:"1px", border:"0.5px solid lightgray" }}><img src = {구글로고} alt="logo" className='google-image'/><div style={{marginLeft:"10px"}}>google로 로그인</div></button>
            <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"10px", backgroundColor:"#f9e000", color:"black", fontSize:"16px" }}><img src = {카카오로고} alt="logo" className='kakao-image'/><div style={{marginLeft:"10px"}}>카카오로 로그인</div></button>
            <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"30px", backgroundColor:"#03C75A", color:"white", fontSize:"16px" }}><img src = {네이버로고} alt="logo" className='naver-image'/><div style={{marginLeft:"10px"}}>네이버로 로그인</div></button>

            
            <div style={{textAlign:"center", fontSize:"14px"}}>
                OR
            </div>
                <form onSubmit={onSubmit}>
                    {errorMessege.length > 0 &&
                        (<div className="alert alert-danger" role="alert">
                            {errorMessege.map((message, index) => (<div key={index}>{message}</div>))}
                        </div>)
                    }
                    <div className="mb-3">
                        <input
                            onBlur = {handleIdBlur} onChange={onChange} value={id} placeholder="아이디"
                            type="text" name="id" id="id" className="form-control input-icon-placeholder1"
                            style={{ marginTop:"20px", border: idError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {idError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{idError}</div>}
                    </div>
                    <div className="mb-3">
                        <input
                            onBlur = {handlePwBlur} onChange={onChange} value={password} placeholder="비밀번호"
                            type="password" name="password" id="password" className="form-control input-icon-placeholder2"
                            style={{ border: pwError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {pwError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{pwError}</div>}
                    </div>
                    <button type="submit" className="btn btn-light btn-lg" style={{ width: "100%", backgroundColor:"#34b4fc", color:"white" }}>
                        로그인
                    </button>
                    
                    <div style={{display:"flex", marginTop:"20px"}}>
                        <div className = "form-check" style={{marginLeft:"30px"}}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={saveID}
                                onChange={handleCheckboxChange}
                            /> ID 저장하기
                        </div>
                        <div className = "form-check" style={{marginLeft:"70px"}}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={autoLogin}
                                onChange={handleAutoLoginCheckboxChange}
                            /> 자동로그인
                        </div>
                    </div>
                    <br />
                    <Box display="flex" justifycontent="center" height="10vh">
                        <ButtonGroup variant="text" aria-label="text button group">
                        <Button><Link to="/signup" style={{ textDecoration : "none"}}>회원가입</Link></Button>
                        <Button>아이디 찾기</Button>
                        <Button>비밀번호 찾기</Button>
                        </ButtonGroup>
                    </Box>
                    
                </form>
            </div>
        </Card>
        </Box>
        </div>
    )
}

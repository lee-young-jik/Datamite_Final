import axios from "axios";
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import 임시로고 from '../assets/image/logo1.png'
import 구글로고 from '../assets/image/google.png'
import 네이버로고 from '../assets/image/naver.png'
import 카카오로고 from '../assets/image/kakao.png'
import "../css/Signin.css"


export default function SignUp() { 

    const [idMessage, setIdMessage] = useState(""); // id 중복확인 메시지

    // 사용자에게 입력필드 유효성 검사로 알리는 역할하는 변수들
    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwError2, setPwError2] = useState("");
    const [nameError, setNameError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [id,setId] = useState("");
    const [password,setPassword] = useState("");
    const [password2,setPassword2] = useState("");
    const [name,setName] = useState("");
    
    const [birthday8, setBirthday8] = useState("");

    const [gender, setGender] = useState("");
    const [email,setEmail] = useState("");
    const [errorMessege, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    const [selected, setSelected] = useState({ btn1: false, btn2: false, btn3: false });
    // 남,여,선택안함 버튼 클릭 상태변수

    const handleClick = (btnId, value) => {
        // 맨처음 모든 버튼을 비활성화
        const newState = {btn1:false, btn2:false, btn3:false};
        newState[btnId] = !selected[btnId];
        setSelected(newState);
        setGender(value); // 여기서 gender 상태를 업데이트 하기로

        // // 선택된 버튼만 활성화
        // setSelected({ ...reset, [btnId]: true });
    };

    let today = new Date()
    let today_year = today.getFullYear();

    async function checkId() {

        try {
            const response = await fetch(`http://localhost:4000/auth/checkId?id=${id}`)
            // 백엔드 서버에 요청 : fetch함수를 사용해 /chekId 엔드포인트로 요청을 보냄. - 중복 여부를 체크하는 역할은 서버에서 해야 함
        // ${Id}는 사용자가 입력한 아이디를 URL의 쿼리 파라미터로 전송한다.
        if(!response.ok) {
            throw new Error("네트워크 응답이 이상하다.");
        }

        const data = await response.json();
        if (data.isAvailable) {
            setIdMessage("사용 가능한 아이디입니다.")
            return true; // 사용 가능한 아이디 확인
        } else {
            setIdMessage("이미 사용 중인 아이디입니다.")
            return false; // 중복된 아이디
        }
        } catch (error) {
            console.log("fetch 진행에 뭔가 문제가 있다:",error.message);
            return false;
        }
    }
    
       

    function validateId() { // id 유효성 검사 - 텍스트로 사용자에게 알림
        if (id === "") {
            setIdError("아이디는 필수 정보입니다!");
            return false;
        } else if (id.length < 5 || id.length > 20) {
            setIdError("아이디는 5자~20자 영문 소문자, 숫자만 사용 가능합니다.");
            return false;
        } else {
            setIdError(""); // No error
            return true;
        } 
    }

    function handleIdBlur() {
        validateId();
    }

    function validatePw() {
        if (password === "") {
            setPwError("비밀번호는 필수 정보입니다!");
            return false;
        } else if (password.length < 8 || password.length > 16) {
            setPwError("비밀번호는 8자~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
            return false;
        } else {
            setPwError(""); // No error
            return true;
        } 
    }

    function handlePwBlur() {
        validatePw();
    }

    function validatePw2() {
        if (password2 === "") {
            setPwError2("비밀번호 확인도 해주세요.");
            return false;
        } else if (password2 !== password) {
            setPwError2("비밀번호와 같아야 합니다.");
            return false;
        } else {
            setPwError2(""); // No error
            return true;
        } 
    }

    function handlePw2Blur() {
        validatePw2();
    }

    function validateName() {
        if (name === "") {
            setNameError("이름은 필수 정보입니다.");
            return false;
        } else {
            setNameError(""); // No error
            return true;
        } 
    }

    function handleNameBlur() {
        validateName();
    }

    function validateBirthday() {
        if (birthday8 === "") {
            setBirthdayError("생년월일은 필수 정보입니다!");
            return false;
        } else if (birthday8.length !== 8) {
            setBirthdayError("생년월일은 8자리여야 합니다.");
            return false;
        } else {
            setBirthdayError(""); // No error
            return true;
        } 
    }
    function handleBirthdayBlur() {
        validateBirthday();
    }

    function validateGender() {
        if (!selected.btn1 && !selected.btn2 && !selected.btn3) {
            setGenderError("성별을 선택해주세요!");
            return false;
        } else {
            setGenderError(""); // No error
            return true;
        }
    }

    function handleGenderBlur() {
        validateGender();
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // 이메일 형식

    function validateEmail() {
        if (email === "") {
            setEmailError("이메일은 필수 정보입니다!");
            return false;
        } else if (!emailPattern.test(email)) {
            // 이메일 형식이 올바르지 않음
            setEmailError("올바른 이메일 형식을 작성해 주세요.");
            return false;
        } else {
            setEmailError(""); // No error
            return true;
        } 
    }

    function handleEmailBlur() {
        validateEmail();
    }


    function onChange(event) {
        // 실제 입력필드 제한 로직

        const { name, value } = event.target;
        if (name === "id") {
            if (value.length >= 5 || value.length <= 20){ // 5~20자
                setId(value);
            }
        }else if (name === "password") {
            if (value.length >= 8 || value.length <= 16){ // 8~16자
                setPassword(value)
            }
        }else if (name === "password2") {
            setPassword2(value)
        }else if (name === "name") {
                setName(value);
        }
        
        else if (name === "birthday8"){
            if (value.length <= 8){ // 8자리 제한 로직
                setBirthday8(value)
            }
        }else if (name === "gender") {
            if (!value){ // 8자리 제한 로직
                setGender(value)
            }
        }else if (name === "email") {
            setEmail(value);

        }
    }

    async function onSubmit(event) {
        // onSubmit 함수에서 유효성 검사 후 해당 상태를 업데이트 한다.
        
        event.preventDefault();

        // 에러 메시지 리셋
        setErrorMessage([]);

        // 아이디 중복 체크
        const isIdAvailable = await checkId();
        if (!isIdAvailable) {
            alert("아이디가 중복되었으니, 다른 아이디를 사용해주세요.")
            return; // 아이디가 중복되면 함수 종료
        }

        // 각각의 검증 함수 호출
        const isIdOk = validateId();
        const isPasswordOk = validatePw();
        const isPassword2Ok = validatePw2();
        const isNameOk = validateName();
        const isBirthdayOk = validateBirthday();
        const isGenderOk = validateGender();
        const isEmailOk = validateEmail();

        // 모든 필드가 유효한지 확인
        if (isIdOk && isPasswordOk && isPassword2Ok && isNameOk && isBirthdayOk && isGenderOk && isEmailOk) {
            // 회원가입 로직 수행
            console.log(id, password, password2, name, birthday8, gender, email)
        
            try {
                const result = await axios.post("http://localhost:4000/auth/signup", {
                    id: id,
                    password: password,
                    name: name,
                    birthday8: birthday8,
                    gender: gender,
                    email: email
                })
                if (result.status === 200) {
                    navigate("/login")
                }
            } catch(error) {
                console.log(error);
            }

        } else {
                alert("입력한 정보를 다시 한번 확인해 주세요.");
        }

    }

    return (
        <div>
        <Box display="flex" justifycontent="center" alignitems="center" marginRight="1vw">
                <img src = {임시로고} alt="logo" className='logo-image'/>
                  
                  <a href="http://localhost:3000" className="link" style={{ textDecoration : "none"}}>
                    <span className="textLogo" style={{color:"#34b4fc", marginTop:"2vw"}}><h2 style={{marginTop:"1vh"}}>리뷰병</h2></span>
                  </a>
        </Box>
        

        <Box display="flex" justifycontent="center" alignitems="center" marginRight="1vw">
        
            <Card variant="outlined" sx = {{ minWidth:275, maxWidth:"70vw", width:"70vh", padding : 5, boxShadow:'none'}}>
            `<div className = "container my-3">

                <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"1vh", backgroundColor:"white", color:"black", fontSize:"0.9vw", boxShadow:"1px", border:"0.5px solid lightgray"}}><img src = {구글로고} alt="logo" className='google-image'/><div style={{marginLeft:"6%"}}>google로 가입하기</div></button>
                <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"1vh", backgroundColor:"#f9e000", color:"black", fontSize:"0.9vw" }}><img src = {카카오로고} alt="logo" className='kakao-image'/><div style={{marginLeft:"6%"}}>카카오로 가입하기</div></button>
                <button type="submit" className="btn btn-light btn-lg" style={{ display: "flex", width: "100%", marginBottom:"3vh", backgroundColor:"#03C75A", color:"white", fontSize:"0.9vw" }}><img src = {네이버로고} alt="logo" className='naver-image'/><div style={{marginLeft:"6%"}}>네이버로 가입하기</div></button>

                
                <div style={{textAlign:"center", fontSize:"1vw", marginBottom:"2vh"}}>
                    OR
                </div>

                <form onSubmit={onSubmit}>
                    {errorMessege.length > 0 &&
                        (<div className="alert alert-danger" role="alert">
                            {errorMessege.map((message, index) => (<div key={index}>{message}</div>))}
                        </div>
                        )
                    }
                    <div className="mb-3" style={{display:"flex"}}>

                        <input
                            onBlur = {handleIdBlur} onChange={onChange} value={id} placeholder="아이디"
                            type="text" name="id" id="id" className="form-control input-icon-placeholder1"
                            style={{ border: idError ? "1px solid red" : "1px solid #ced4da", flex:2}}
                            />
                            <button type="button" className="btn btn-light btn-lg" onClick={checkId} style={{fontSize:"12px", marginLeft:"0.5vw"}}>중복 체크</button>
                            
                    </div>
                    <div style={{marginBottom:"1.5vh"}}>
                            {idError && <div style={{ color: 'red', fontSize: '12px'}}>{idError}</div>}
                            {idMessage && <div style={{ color: 'blue', fontSize: '12px'}}>{idMessage}</div>}
                        </div>
                    <div className="mb-3">
                        
                        <input
                            onBlur = {handlePwBlur} onChange={onChange} value={password} placeholder="비밀번호"
                            type="password" name="password" id="password" className="form-control input-icon-placeholder2"
                            style={{ border: pwError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {pwError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{pwError}</div>}
                    </div>
                    <div className="mb-3">
                        
                        <input
                            onBlur = {handlePw2Blur} onChange={onChange} value={password2} placeholder="비밀번호 확인"
                            type="password" name="password2" id="password2" className="form-control input-icon-placeholder2"
                            style={{ border: pwError2 ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {pwError2 && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{pwError2}</div>}
                    </div>
                    <div className="mb-3">
                    
                        <input
                            onBlur = {handleNameBlur} onChange={onChange} value={name} placeholder="이름"
                            type="text" name="name" id="name" className="form-control input-icon-placeholder3"
                            style={{ border: nameError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {nameError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{nameError}</div>}
                    </div>

                    <div className="mb-3">
                    
                        <input
                            onBlur = {handleBirthdayBlur} onChange={onChange} value={birthday8} placeholder="생년월일 8자리 YYYYMMDD"
                            type="text" name="birthday8" id="birthday8" className="form-control input-icon-placeholder4"
                            style={{ border: birthdayError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {birthdayError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{birthdayError}</div>}
                    </div>
                    
                    <div className="mb-3" display="flex" justifycontent="center" alignitems="center">
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group" style={{width:"100%"}}>
                            <input onBlur={handleGenderBlur} type="checkbox" className="btn-check" value="M" name="gender" id="btncheck1" autoComplete="off" checked={selected.btn1} onChange={() => handleClick('btn1', 'M')}/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck1" style={{ color: selected.btn1 ? 'white' : 'gray', borderColor: "gray" }}>남자</label>

                            <input onBlur={handleGenderBlur} type="checkbox" className="btn-check" value="F" name="gender" id="btncheck2" autoComplete="off" checked={selected.btn2} onChange={() => handleClick('btn2', 'F')}/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck2" style={{ color: selected.btn2 ? 'white' : 'gray', borderColor: "gray" }}>여자</label>

                            <input onBlur={handleGenderBlur} type="checkbox" className="btn-check" value="N" name="gender" id="btncheck3" autoComplete="off" checked={selected.btn3} onChange={() => handleClick('btn3', 'N')}/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck3" style={{ color: selected.btn3 ? 'white' : 'gray', borderColor: "gray" }}>선택 안함</label>
                        </div>
                        {genderError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{genderError}</div>}
                    </div>

            
                    <div className="mb-3">
                        
                        <input
                            onBlur = {handleEmailBlur}
                            onChange={onChange} value={email} placeholder="이메일"
                            type="email" name="email" id="email" className="form-control input-icon-placeholder5"
                            style={{ border: emailError ? "1px solid red" : "1px solid #ced4da" }}
                            />
                            {emailError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{emailError}</div>}
                    </div>
                    <button type="submit" className="btn btn-light btn-lg" style={{ width: "100%", backgroundColor:"#34b4fc", color:"white" }}>회원가입</button>

                </form>
            </div>`
        
        </Card>
    </Box>                     
    </div>
    )
}
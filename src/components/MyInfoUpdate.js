import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyInfoUpdate (){

    const [id,setId] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [name,setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [email,setEmail] = useState("");

    const accessToken = window.sessionStorage.getItem("AccessToken");
    const navigate = useNavigate();

    function onChange(event) {

        const { name, value } = event.target;

        if (name === "password1") {
            setPassword1(value)
        }else if (name === "password2") {
            setPassword2(value)
        }
    }

    async function onUpdate(event) {
        event.preventDefault();

        try {
            const result = await axios.put("http://localhost:8080/api/member/me/update", 
            {
                password: password1,
            },
            {
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'application/json'
                }
            }
            );
            console.log(result.data)
            if (result.status === 200) {
                navigate("/myInfo");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <div>수정페이지</div>
        <div className = "container my-3">
            <div className="my-3 border-bottom">
                <h3>회원정보수정</h3>
            </div>
            <form onSubmit={onUpdate}>         
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">새 비밀번호</label>
                    <input 
                        onChange={onChange} value={password1}
                        type="password" name="password1" id="password1" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">새 비밀번호 확인</label>
                    <input 
                        onChange={onChange} value={password2}
                        type="password" name="password2" id="password2" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-dark">완료</button>
            </form>
        </div>
    )
}

export default MyInfoUpdate;
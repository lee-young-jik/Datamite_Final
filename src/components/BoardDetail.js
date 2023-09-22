import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function BoardDetail() {

    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState([]);
    const [answerText, setAnswerText] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    console.log(params.id);

    useEffect(() => { //첫 번째 인자는 실행될 함수입니다. 두 번째 인자는 의존성 배열로, 해당 배열의 값들 중 하나라도 변경되면 첫 번째 인자의 함수가 재실행됩니다.
        async function getQuestion() {
            try {
                const result = await axios.get(`http://localhost:4000/board/${params.id}`) // 이 주소에 데이터 요청
                setQuestion(result.data);
                setAnswer(result.data.answerList);
            } catch (error) {
                console.log(error);
            }
        }
        getQuestion();
    },[params.id]) // params.id가 변경될 때마다 getQuestion함수를 재실행

    // useEffect 아래 코드 결론 : 특정 질문 id(params.id)에 대한 데이터를 서버에서 가져와 상태를 업데이트 하는 로직을 포함.
    // 그래서 답변 등록할 때마다 불러와진거구나.


    function onChange(event) {
        setAnswerText(event.target.value)
        // 이 함수는 입력 요소의 값이 변경될 때 호출.
        // event.target.value를 사용하여 변경된 값을 가져와서 setAnswerText에 저장        
    }

    async function onSubmit(event) { // 이 함수는 form의 제출 이벤트가 발생했을 때 호출.
        if (answerText === "") {
            alert("경고!! 답변 내용은 무조건 입력하셔야 합니다!")
        } else {
        
            event.preventDefault(); // 이거는 기본 양식 제출 동작(페이지 새로고침)을 막습니다.
            try {
                const result = await axios.post(`http://localhost:4000/answer-create/${params.id}`, {
                    content: answerText, // 저 URL에 post 요청을 보내, 답변 데이터(answerText)를 서버에 전송
                })
                if (result.status === 200) { // 서버의 응답 상태 코드가 200이면 요청 성공처리된 것임.
                    navigate(0); // 페이지 새로고침
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function onDelete(){
        if (window.confirm("삭제를 하시겠습니까? 복구할 수 없습니다.")) {
            try {
                await axios.delete(`http://localhost:4000/question-delete/${params.id}`);
                alert("삭제가 되었습니다.");
                navigate("/board");
            } catch (error) {
                alert("네트워크 문제가 있어서 삭제가 되지 않습니다.");
            }
        } else {
            alert("삭제 취소합니다.")
        }
    }
  
    return (
    <div>
        <h2 className='border-bottom py-2'>{question.subject}</h2>
        <div className='card my-3'>
            <div className='card-body'>
                <div className='card-text' style={{whiteSpace: "pre-line"}}>{question.content}</div>
                <div className='d-flex justify-content-end'>
                    <div className='badge bg-light text-dark p-2 text-start'>
                        <div>작성시간: {moment(question.createDate).format("YYYY-MM-DD HH:mm:ss")}</div>
                        {question.modifyDate && <div className='mt-3'>수정시간: {moment(question.modifyDate).format("YYYY-MM-DD HH:mm:ss")}</div>}
                        {/* 조건부렌더링 question.modifyDate가 존재해야지만 나오는 */}
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <Link
                    to={`/question-modify/${params.id}`}
                    className="btn btn-sm btn-outline-secondary"
                >
                    수정
                </Link>
                <button
                    onClick={onDelete}
                    className='btn btn-sm btn-outline-danger ms-2'
                >
                    삭제    
                </button>
            </div>
        </div>
        
        <h5 className='border-bottom my-3 py-2'>{answer.length}개의 답변이 있습니다.</h5>
        {answer.map((answer, index)=>{
            return (
                <div className='card my-3' key={index}>
                    <div className='card-body'>
                        <div className='card-text' style={{whiteSpace: "pre-line"}}>{answer.content}</div>
                        <div className='d-flex justify-content-end'>
                            <div className='badge bg-light text-dark p-2 text-start'>
                                <div>{answer.createDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        
        <form onSubmit={onSubmit} className="my-3">
            {/* 사용자가 form에 작성하면 onSubmit이 발동해서 답변데이터인 answerText를 POST로 전송 */}
            <textarea
            onChange={onChange} value={answerText}
            // onChange라는 -  입력 요소의 값이 변경될 때 호출.
            // event.target.value를 사용하여 변경된 값을 가져와서 setAnswerText에 저장
            name="content" id="content" rows="10" className='form-control'>
            </textarea>
            <input type="submit" value="답변등록" className='btn btn-primary my-2' />
        </form>

    </div>
  )
}

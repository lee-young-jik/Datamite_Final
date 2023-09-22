import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function BoardCreate() {
  
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
  
    async function onSubmit(event) {
        event.preventefault();
        if (subject ==="" || content === "") {
            alert("제목과 내용은 무조건 입력해야 합니다.")
        } else {
            try {
                const result = await axios.post
                ("http://localhost:4000/question-create/", {
                    subject: subject, // 이게 키와 값이래
                    content: content
                })
                if (result.status === 200) {
                    navigate("/board");
                }
            } catch (error) {
                alert("서버에 문제가 있어서 질문 등록이 안됩니다..")
            }
        }
    }

    function onChange(event) {
        if (event.target.name === 'subject') {
            setSubject(event.target.value);
        } else if (event.target.name === 'content'){
            setContent(event.target.value);
        }
    }


    return (
    <div>
        <h5 className='border-bottom pb-2'>질문등록</h5>
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <label htmlFor="subject" className='form-label'>제목</label>
                <input
                    onChange={onChange} value={subject}
                    type="text" name="subject" id="subject" className='form-control' />
            </div>
            <div className='mb-3'>
                <label htmlFor="content" className='form-label'>내용</label>
                <textarea
                    onChange={onChange} value={content}
                    name="content" id="content"className='form-control' rows="10"></textarea>
            </div>
            <input type="submit" value='저장하기' className='btn btn-primary' />
        </form>
    </div>
  )
}


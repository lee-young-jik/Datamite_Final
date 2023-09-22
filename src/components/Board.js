import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import '../css/Navbar.css';

export default function Board() {

    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        // 동기처리가 필요한 로직이면서 axios가 필요한 로직은 useEffect로 
        async function getQuestionList() {
            try {
                const result = await axios.get("http://localhost:4000/board");
                setQuestionList(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        getQuestionList();
    }, [])

  return (

    <div className='home-everywhere'>
        <Link className='btn btn-primary' to="/question-create">질문등록</Link>
        <table className='table text center my-3'>
            <thead className='table-dark'>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일시</th>
                </tr>
            </thead>
            <tbody>
                {questionList.map((question, index)=> {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                                <Link
                                    className='text-decoration-none'
                                    to={`/board/${question.id}`}
                                >
                                    {question.subject}
                                    <sup className='text-danger ms-2'>[{question.answerList.length}]</sup>
                                  {/* 댓글 갯수 추가 */}
                                </Link>
                            </td>
                            <td>{moment(question.createDate).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>

                    )
                })}
            
            </tbody>
        </table>
    </div>
  )
}

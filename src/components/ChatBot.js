import React, { useEffect, useState} from 'react'
import "../css/ChatBot.css"

export default function ChatBot() {
    
    const [currentScenarios, setCurrentScenarios] = useState(0); // 현재 시나리오 id를 저장
    const [chatTime, setChatTime] = useState(null); // 채팅 말풍선마다 생기는 시간
    const [step, setStep] = useState(0); // 챗봇처럼 선택할 때마다 단계를 넘어가는 프로세스를 관리하려면 각 단계를 표현하기 위한 상태변수(step)가 필요
    const [selectGender, setSelectGender] = useState(''); // 성별 선택 상태 변수
    const [selectAge, setSelectAge] = useState(''); // 나이 선택 상태 변수

    const [answer, setAnswer] = useState(''); // 사용자가 입력하는 텍스트를 관리하는 상태 변수
    const [answerList, setAnswerList] = useState([]); // 리스트를 관리하는 상태
    
    const scenarios = [
        // 챗봇의 시나리오를 정의
        {
            id : 0, // 시나리오 고유의 ID
            message:"안녕하세요. 진료과 추천봇이에요", // 메시지
            next : 1 // 현재 메시지에 대한 응답 후 표시할 메시지의 ID
        },
        {
            id : 1,
            message:"저는 증상을 파악해서 적절한 진료과를 추천해줄 수 있어요.",
            next : 2
        },
        {
            id : 2,
            message:"병원가시려고요? 어느 진료과가 좋을지 친절하게 알려드릴게요~ 아래에 준비완료! 버튼을 눌러서 시작해주세요!",
            next : 3
        }
    ];

    const nextMessage = () => { // 현재 메시지에서 다음 메시지로 넘어가기 위한 함수
        const nextScenarios = scenarios[currentScenarios].next;
        // 현재 메시지의 next값을 nextScenarios 변수에 저장 - scenarios는 위 챗봇의 시나리오에 메시지까지 저장되어 있음
        if (nextScenarios !== undefined) { // nextScenarios의 값이 undefined가 아니면, 즉 다음 단계가 있다면 setCurrentScenarios를 사용해 현재 단계를 업데이트
            setCurrentScenarios(nextScenarios);
        }
    };

    function getFormattedDate() {
    
        const date = new Date();
        const month = date.getMonth() + 1; // 월은 0부터 시작해서
        const day = date.getDate();
        const days = ['일','월','화','수','목','금','토'];
        const dayName = days[date.getDay()]; // 요일을 가져와서 한글 문자열로 변환

        let hours = date.getHours();
        let ampm = "오전";

        if (hours >= 12) {
            ampm = "오후";
            if (hours > 12) {
                hours -= 12; // 12시를 초과하면 오후이므로 12를 빼줌.
            }
        }

        return `${month}.${day} (${dayName})`;
        }

    function getAmpmHours() {

        const date = new Date();
        let hours = date.getHours();
        let ampm = "오전";
        const minutes = date.getMinutes();
        
        if (hours >= 12) {
            ampm = "오후";
            if (hours > 12) {
                hours -= 12; // 12시를 초과하면 오후이므로 12를 빼줌.
            }
        }

        return `${ampm} ${hours}:${minutes < 10 ? '0' + minutes: minutes}`; // 분이 한 자리수 일 때 앞에 0을 붙여주는 로직
        }

    useEffect(() => {
        // chatTime이 아직 설정되지 않았을 때만 실행
        if (!chatTime) {
            setChatTime(getAmpmHours());
        }
    }, [chatTime]) // chatTime에 대한 의존성을 지정


    function readyBtn() { // 준비완료 버튼에 따라 분류 시작
        setStep(prevStep => prevStep + 1); // 현재 단계에서 1을 더한다.
        }

    // 성별, 나이 등 매번 백엔드로 데이터를 보내려고 새로운 함수를 만드는 건 비효율적
    // 따라서 백엔드로 데이터를 보낼 범용 함수를 만들자.
    function sendDataToBackend(type, value) { // 여기서 type이 키값 ex)성별, 나이
                                                // value가 값 그 자체
        setStep(prevStep => prevStep + 1);

        //여기서 type에 따라 각각의 상태를 업데이트.
        if (type === 'gender') {
            setSelectGender(value); // 여기다 value라고 하면 그냥 들어가는구나
        } else if (type === 'age') {
            setSelectAge(value);
        }

        const dataToSend = { [type]: value};
        // ES6 computed property names를 사용해 동적 속성명을 설정

        fetch("백엔드 엔드포인트", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data=> {
            console.log("백엔드로부터 응답:",data);
        })
        .catch(error => {
            console.error("데이터 전송 오류:",error);
        });
    }
    
 
    // 답변 변경 핸들러
    const handleTextChange = (e) => {
        // 이벤트 객체 e를 매개변수로 받아 e.target.value를 사용해
        // 현재 입력필드의 값을 가져온다.
        // 그리고 그 값을 setAnswer를 통해 answer 상태에 업데이트한다.
        setAnswer(e.target.value);
    }

    // 답변을 리스트에 추가하는 핸들러 (엔터 키 또는 답변 보내기 버튼 클릭 시)
    const handleAnswerSubmit = () => {
        if(answer) {
            const updatedAnswerList = [...answerList, answer];
            // Spread 연산자 (...)는 배열 또는 객체의 모든 항목을 풀어서 나열하고 ,answer를 추가(append)함.
            setAnswerList(updatedAnswerList); // 추가한대로 업데이트
            sendAnswerToBackend(updatedAnswerList); // 업데이트된 리스트를 인자로 sendAnswerToBackend함수를 호출
            setAnswer(''); // 입력창 초기화
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAnswerSubmit(); // 작성한 것 POST 요청하는 함수
        }
    }

    // 백엔드로 데이터 전송
    const sendAnswerToBackend = (data) => {
        //백엔드 통신 로직(예) (fetch 사용)
        console.log("백엔드로 보낼 데이터:", data);
    };


    return (
        
        <div>
            
            <div>
                <div className='message'>{scenarios[currentScenarios].message}</div>
                <button onClick={nextMessage}>다음</button>
            </div>


            <div className='botname'>
                <h6 style={{color:"GRAY"}}>🤖진료과 추천봇</h6>
            </div>

            <div>
                <div className='today-bubble'><h6 style={{color:"white", marginTop:"0.5vh"}}>{getFormattedDate()}</h6></div>
                <h5>시간(마지막 말풍선마다), 애니메이션 효과, 시나리오도 넣어야 함</h5>
            </div>

            <br/>
            
            <div className='flex-container'>
                <div className='bubble'><div className='chat-contents'>안녕? 난 진료과 챗봇이야</div></div>
                <div className='chat-time'>{getAmpmHours()}</div>
            </div>
            <div className='flex-container'>
                <div className='bubble'><div className='chat-contents'>나는 증상을 파악해서 적절한 진료과를 추천해줄 수 있어. 하지만 질병을 진단해줄 순 없어..</div></div>
                <div className='chat-time'>{getAmpmHours()}</div>
            </div>
            <div className='bubble:after'></div>
            <div className='flex-container'>
                <div className='bubble'>
                <div className='chat-contents'>병원 가려고? 어느 진료과가 좋을지 내가 도와줄게. 자, 준비됐으면 아래 준비완료! 버튼을 눌러 시작해줘~</div></div>
                <div className='chat-time'>{getAmpmHours()}</div>
            </div>
            
            {   step === 0 && 

                    <div className="d-grid gap-2">
                            <button className='btn btn-light button-start' type="button" onClick={readyBtn}>
                                <div style={{textAlign:"left"}}>✔ 준비완료!</div>
                            </button>
                    </div>
            }

            {   step >= 1 &&
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {/* 부모 div에 flex랑 세로로 나열되게 만드는 flex-direction:column시전 */}
                        <div className='user-bubble'>
                            <div className='chat-contents'>준비완료!</div>
                        </div> 
                        
                        <div className='bubble'>
                            <div className='chat-contents'>먼저, 성별을 알려줘!<br></br>아래 버튼을 누르거나 타이핑해줘.🙂</div>
                        </div>
                    </div>
            }
            {   // 여러 개의 JSX 요소를 반환하려면 그 요소들을 하나의 부모 요소(div)로 감싸줘야 한다. 
                step === 1 && 
                    <div>
                        <div className="d-grid gap-2">
                            <button className='btn btn-light button-start' type="button" onClick={()=>sendDataToBackend('gender','남자')}> {/* 화살표 함수를 안넣으면 클릭하지 않아도 함수 호출 */}
                                <div style={{textAlign:"left"}}>남자</div>
                            </button>
                        </div>
                        <div className="d-grid gap-2">
                            <button className='btn btn-light button-start' type="button" onClick={()=>sendDataToBackend('gender','여자')}>
                                <div style={{textAlign:"left"}}>여자</div>
                            </button>
                        </div>    
                    </div>
            }
            {
                step >= 2 &&
                    <div style={{display:"flex", flexDirection:"column"}}>
                            <div className='user-bubble'>
                                <div className='chat-contents'>{selectGender}</div>
                            </div>
                        <div className='bubble'>
                            <div className='chat-contents'>나이대는?(만 나이)<br></br>아래에서 고르거나 타이핑해도 돼.🙂</div>
                        </div>
                    </div>
            }
            {
                step == 2 &&

                        <div>
                            {/* css로 버튼들 가로로 나열 */}
                            <div className='btn-align-container'>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','0~9세')}>
                                    <div style={{textAlign:"left"}}>0~9세</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','10~14세')}>
                                    <div style={{textAlign:"left"}}>10~14세</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','15~19세')}>
                                    <div style={{textAlign:"left"}}>15~19세</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','20~29세')}>
                                    <div style={{textAlign:"left"}}>20대</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','30~39세')}>
                                    <div style={{textAlign:"left"}}>30대</div>
                                </button>
                            </div>
                            <div className='btn-align-container'>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','40~49세')}>
                                    <div style={{textAlign:"left"}}>40대</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','50~59세')}>
                                    <div style={{textAlign:"left"}}>50대</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','60~69세')}>
                                    <div style={{textAlign:"left"}}>60대</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','70~79세')}>
                                    <div style={{textAlign:"left"}}>70대</div>
                                </button>
                                <button className='btn btn-light button-start' type="button" onClick={() => sendDataToBackend('age','80세 이상')}>
                                    <div style={{textAlign:"left"}}>80대 이상</div>
                                </button>
                            </div>
                        </div>
            }
            {   
                step >= 3 &&
                    <div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className='user-bubble'>
                                <div className='chat-contents'>{selectAge}</div>
                            </div>
                        </div>

                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div className='bubble'>
                                <div className='chat-contents'>답변해줘서 고마워!<br></br> 좀 더 정확한 진료과를 추천해줄 수 있게 되었어~</div>
                            </div>
                            <div className='bubble'>
                                <div className='chat-contents'>그럼 이제 어떤 증상이 있는지 말해줄래?<br></br>제일 불편한 증상 한가지를 타이핑해줘.🙂<br></br>"머리가 아파요","어지러워" 처럼 자연스럽게 얘기해봐!</div>
                            </div>
                        </div>
                    
                    </div>
            }
            { // 여기서부터는 텍스트 받고 답변하는 부분
                step >= 3 &&
                    <div>
                        <input
                            type="text"
                            value={answer}
                            onChange={handleTextChange}
                            // 이벤트 핸들러에서 추가적인 인자를 넘길 때는 화살표 함수를 써야하지만,
                            // 그냥 함수만 호출할 때는 화살표 함수를 쓰지 않아도 되고,
                            // 화살표 함수를 이벤트 핸들러에 직접 연결하면, 해당 컴포넌트가 리렌더링될 때마다 새로운 함수가 생성된다.
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleAnswerSubmit}>카톡보내기 이미지 따서</button>
                    </div>
            }
        </div>
  )
}

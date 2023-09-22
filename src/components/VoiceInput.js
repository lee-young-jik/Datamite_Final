import React, { useState } from 'react'

// recognition 객체의 설정과 관련된 코드는 컴포넌트 외부에서도 설정 가능
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export default function VoiceInput() {
        
    const [transcript, setTranscript] = useState("");
    
    const startListening = () => {
    recognition.start();
    };

    recognition.onResult = (event) => {
        const current = event.resultIndex;
        const spokenText = event.results[current][0].transcript;
        setTranscript(spokenText);
        console.log(spokenText);
    };



  return (
    <div>
        <button onClick={startListening}>Start Listening</button>
        <div>{transcript}</div>
    </div>
  );
}

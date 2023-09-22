import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Board from "./components/Board";
import BoardDetail from "./components/BoardDetail";
import BoardCreate from "./components/BoardCreate";
import BoardModify from "./components/BoardModify";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import MyInfoUpdate from "./components/MyInfoUpdate";
import ChatBot from "./components/ChatBot";
// import { NavermapsProvider } from "react-naver-maps";
import Myinfo from "./components//Myinfo";
import { useState } from "react";
import AuthContext from "./components/AuthContext";

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <>
        {/* AuthCOntext.Provider를 사용해 로그인 상태를 제공하는 것은 컨텍스트를 활용하는 좋은 방법. 이로써 하위 컴포넌트에서 loggedIn 상태를 액세스하고 필요한 곳에서 상태를 업데이트 할 수 있음. */}
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
          {/* 로그인 상태가 App 컴포넌트의 여러 자식 컴포넌트에서 필요하다면,  App 컴포넌트의 내용들을 AuthContext.Provider로 감싸야 한다. */}

          <BrowserRouter>
          
            <div>
            
                <Routes>
                  <Route path="/" element={<Navigate to="/main" />} /> 
                  {/* 홈을 /main으로 두려고 */}
                  <Route path="/main" element={<Home />}/>
                  <Route path="/board" element={<Board />}/>
                  <Route path="/board/:id" element={<BoardDetail />}/>
                  <Route path="/question-create" element={<BoardCreate />}/>
                  <Route path="/question-modify/:id" element={<BoardModify />}/>
                  <Route path="/signup" element={<Signup />}/>
                  {/* <Route path="/login" element={<SignIn />}/> */}
                  <Route path="/login" element={<Signin />}/>
                  <Route path="/myinfo" element={<Myinfo />}/>
                  <Route path="/myinfoupdate" element={<MyInfoUpdate/>} />
                  <Route path="/chatbot" element={<ChatBot />} />
                </Routes>
                
                {/* <NavermapsProvider
                  ncpClientId = "a8w3asjtpf"
                >
                </NavermapsProvider> */}
                
                
            </div>
          </BrowserRouter>

        </AuthContext.Provider>
    
    </>
  );
}

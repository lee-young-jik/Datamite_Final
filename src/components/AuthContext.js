import React, {createContext} from 'react'

// 로그인 상태와 해당 상태를 변경하는 함수를 저장하는 context 컴포넌트
// 용도 : 자동로그인

const AuthContext = createContext({
    loggenIn : false,
    setLoggedIn:() => {}
    });

export default AuthContext
// 동일한 이름의 함수를 내보내지 말고, 컨텍스트 객체 자체를 내보낸다.
// 컨텍스트가 뭔데? = 리액트의 컨텍스트는 컴포넌트 트리 전체에 걸쳐 데이터를 공유할 수 있는 방법을 제공한다.
//  상태 관리를 위한 Redux나 ModX와 같은 라이브러리 없어도 React의 내장 기능으로 데이터를 컴포넌트 트리의 여러 레벨에 걸쳐 전달할 수 있게 해준다.
// 용도 : 많은 컴포넌트에 걸쳐 데이터를 전달해야 하는 경우 - props를 중간 요소에 수동으로 전달하지 않아도 많은 컴포넌트 계층을 통해 데이터를 전달할 수 있다.

import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Navbar.css";
import 임시로고 from '../assets/image/logo1.png'
import { Box, css } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import axios from "axios";

export default function Navbar() {

  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  // 로그인 상태에 따라 버튼 바꾸려고

  const navigate = useNavigate();

  const handleLogout = async () => { // 로그아웃 로직
    try {
      // 1. 서버에 로그아웃 요청을 보냅니다.
      const response = await axios.post("http://localhost:8080/logout");

      if (response.status === 200) {
        // 2. 응답을 받은 후 로컬의 토큰을 삭제합니다.
        // 쿠키나 로컬 스토리지, 혹은 다른 저장소를 사용할 수도 있음.
        sessionStorage.removeItem("token"); // 이 부분은 세은이랑 같이 봐야함.

        // 3. 사용자를 로그인 페이지 또는 홈 페이지로 리다이렉트 한다.
        navigate("/main");

        // 로그아웃도 로그인처럼 백엔드랑 같이 테스트해서 완전한 기능을 구현해야 함.
        // 백엔드 => 실제 서버의 /logout 엔드포인트에서는 클라에서 보낸 요청에 따라 토큰을 무효화 하는 작업이 필요함.
        // 실제 배포 환경에서는 *보안상의 이유로 토큰을 'httpOnly'쿠키로 저장하는 것을 고려해야함.
        // 이 경우 자바스크립트 코드에서 직접 쿠키에 접근해서 토큰을 삭제할 수 없다.
        // 대신 서버에서 쿠키를 만료시켜 토큰을 삭제해야 한다. 
      }
    
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했음.",error);
    }
  };

  return (

    <div className="container-fixed">

      <nav className="navbar navbar-expand-xxl bg-body-tertiary">
        {/* expand-sm이면 breakpoint가 1400px(xxl) 그리드 브레이크 포인트에 따라 네비게이션바의 동작을 결정 - 
        xxl면 1400px보다 크면 네비게이션 바 항목들이 인라인으로 표시. 반대로 작으면 햄버거 메뉴 버튼 아래로 숨겨짐.*/}
            <div className="container-fluid">

              <Box display="flex" justifycontent="center" alignitems="center" style={{marginLeft:"3%"}}>
                  <img src = {임시로고} alt="logo" className='logo-image' />
  
                  <a href="http://localhost:3000" className="link" style={{ textDecoration : "none"}}>
                    <span className="textLogo" ><h5 style={{color:"#34b4fc", marginTop:"10%"}}>리뷰병</h5></span>
                  </a>
              </Box>


              {/* 반응형 웹으로 크기 작아지면 햄버거 메뉴 버튼으로 */}
              <button className='navbar-toggler' type="button" data-bs-toggle='collapse' data-bs-target='#navbarScroll' aria-controls='navbarScroll' aria-expanded="false"
                >
                <span className='navbar-toggler-icon'></span>
              </button>
              {/* 기본적으로 부트스트랩의 navbar와 navbar-nav 클래스는 flexbox를 사용 */}

              

                <div className="collapse navbar-collapse" id="navbarScroll" >

                    <ul className="navbar-nav middle-nav">
                        
                          <li className="nav-item">
                                <span className='menus'><Link to="/board" className='nav-link'>병원 후기 게시판</Link></span>
                          </li>

                          <li className="nav-item">
                                <span className='menus'><Link to="/board" className='nav-link'>이달의 영양제</Link></span>
                          </li>

                          <li className="nav-item">
                                <Link to="/board" className='nav-link'>단백질 성분 분석</Link>
                          </li>
                      
                      </ul>
                      
                      <ul className='navbar-nav right-nav'>
                      
                        <li className="nav-item">
                              <h6 className='menus'>
                                <Link to="/login" className='nav-link'>
                                  {/* vw viewpoint width, vh viewpoint height 1당 1% */}
                                  {loggedIn ? <button onClick={handleLogout}>로그아웃</button> : "로그인"}
                                  {/* 로그인 성공했으면 로그아웃 버튼으로 바꾸고, 로그아웃 버튼을 누르면 로그아웃 로직 발동되게 */}
                                </Link>
                              </h6>
                              
                        </li>
                                            
                        <li className="nav-item" >
                              <h6 className='menus'><Link to="/signup" className='nav-link'>회원가입</Link></h6>
                        </li>

                        <li className="nav-item" >
                              <h6 className='menus'><Link to="/myinfo" className='nav-link'>마이페이지</Link></h6>
                        </li>
                      </ul>

                </div>
            </div>
        </nav>
    </div>
  )
}

import * as React from 'react';
// npm install @mui/material @emotion/react @emotion/styled
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// npm install @mui/icons-material
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { IconButton } from '@mui/material';
import '../css/MenuAppBar.css';

export default function MenuAppBar() {

  const [auth,setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleLinkClick = (event) => {
    if (!auth) {
      event.preventDefalut();
    } 
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // Drawer(사이드바)에 관한 함수와 변수
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <div className='flex-container'>
            <FormGroup>
              <FormControlLabel
                  className='custom-control-label'
                  control={
                    <Switch
                      checked={auth}
                      onChange={handleChange}
                      aria-label="login switch"
                    />
                  }
                  label={auth ? '로그아웃' : '로그인'}
              />
            </FormGroup>
  
        </div>
    <AppBar position="static" className='AppBar'>

      <Toolbar className='Toolbar'>
        
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
              <Drawer
                open={drawerOpen} onClose={handleDrawerClose} className='drawer'
                ModalProps={{ // 사이드바 열었을 때 다른 화면 검은색 되는 거 방지 - // 투명한 배경색으로 설정
                  BackdropProps: { style: {backgroundColor: 'transparent',}}
                            }}
              >
                  {/* 여기에 Drawer의 내용을 넣으세요. 예: 메뉴 아이템, 목록 등 */}
                  <div
                    className='drawer-menus'
                    tabIndex={0}
                    role="button"
                    onClick={handleDrawerClose}
                  >
                    {/* 이 예제에서는 단순히 'Menu Content'라는 텍스트만 표시됩니다. */}
                      <div><Link to="/board">수익인증 게시판</Link></div><br />
                      <div>메뉴2</div><br />
                      <div>메뉴3</div>
                  </div>
              </Drawer>


        {/* <img src = {데이터_마이트_로고} alt="logo" className='AppBar-image'/> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} marginLeft='5px'>
          <Link className="HomeLink" to="/">병원 알리미</Link>
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>프로필</MenuItem>
              <MenuItem onClick={handleClose}>내 가상계좌</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </Box>
);
}
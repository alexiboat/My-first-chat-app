import React from 'react';
//import './index.css';// check later
import {BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import LoginPage from 'seens/loginPage';
import ProfilePage from 'seens/profilePage';
import HomePage from 'seens/homePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';



function App() {
const mode = useSelector((state)=>state.mode)
const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode])
const isAuth =Boolean(useSelector((state)=>state.token))

  return (
    <div className="app">

      <BrowserRouter>
       <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/home" element={isAuth?<HomePage/> :  <Navigate  to="/"/>}/> 
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> :<Navigate  to="/"/>}/>                  
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

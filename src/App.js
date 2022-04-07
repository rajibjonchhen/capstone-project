import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import MyLayout from './myLayout/MyLayout';
import MyNavbar from './myNavbar/MyNavbar';
import PostPage from './post/PostPage';
import { Home } from '@mui/icons-material';
import DetailPage from './detail/DetailPage';
import EditProfile from './edit/EditProfile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MyLayout><LoginPage/></MyLayout>}/>
          <Route path="/home" element={<MyLayout><Home/></MyLayout>}/>
          <Route path="/post" element={<MyLayout><PostPage/></MyLayout>}/>
          <Route path="/DetailPage" element={<MyLayout><DetailPage/></MyLayout>}/>
          <Route path="/EditProfile" element={<MyLayout><EditProfile/></MyLayout>}/>
          <Route path="*.*" element={<MyLayout><PostPage/></MyLayout>}/>
        </Routes>
      </BrowserRouter>
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;

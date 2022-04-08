import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import MyLayout from './myLayout/MyLayout';
import MyNavbar from './myNavbar/MyNavbar';
import PostPage from './post/PostPage';
import DetailPage from './detail/DetailPage';
import EditProfile from './edit/EditProfile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MyLayout><LoginPage/></MyLayout>}/>
          <Route path="/HomePage" element={<MyLayout><HomePage/></MyLayout>}/>
          <Route path="/PostPage" element={<MyLayout><PostPage/></MyLayout>}/>
          <Route path="/DetailPage" element={<MyLayout><DetailPage/></MyLayout>}/>
          <Route path="/EditProfile" element={<MyLayout><EditProfile/></MyLayout>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

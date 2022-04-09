import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import MyLayout from './myLayout/MyLayout';
import MyNavbar from './myNavbar/MyNavbar';
import PostPage from './post/PostPage';
import DetailPage from './detail/DetailPage';
import EditProfile from './addEdit/EditProfile';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';
import Account from './home/Account';
import ErrorPage from './error/ErrorPage';




function App() {
  return (
<Provider store={configureStore}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/HomePage" element={<MyLayout><HomePage/></MyLayout>}/>
          <Route path="/Account" element={<MyLayout><Account/></MyLayout>}/>
          <Route path="/PostPage" element={<MyLayout><PostPage/></MyLayout>}/>
          <Route path="/DetailPage" element={<MyLayout><DetailPage/></MyLayout>}/>
          <Route path="/EditProfile" element={<MyLayout><EditProfile/></MyLayout>}/>
          <Route path="*.*" element={<MyLayout><ErrorPage/></MyLayout>}/>

        </Routes>
      </BrowserRouter>
    </div>
      </Provider>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import HomePage from './home/HomePage';
import MyLayout from './myLayout/MyLayout';
import MyNavbar from './myNavbar/MyNavbar';
import PostPage from './post/PostPage';
import DetailPage from './detail/DetailPage';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';
import Account from './myAccount/MyAccount';
import ErrorPage from './error/ErrorPage';
import DisplayProducts from "./products/DisplayProducts"
import MyProfile from './profile/MyProfile';



function App() {
  return (
<Provider store={configureStore}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage/>}/>
          <Route path="/home" exact element={<MyLayout><HomePage/></MyLayout>}/>
          <Route path="/account" exact element={<MyLayout><Account/></MyLayout>}/>
          <Route path="/posts" exact element={<MyLayout><PostPage/></MyLayout>}/>
          <Route path="/detail" exact element={<MyLayout><DetailPage/></MyLayout>}/>
          <Route path="/profile" exact element={<MyLayout><MyProfile/></MyLayout>}/>
          <Route path="/products/:category" exact element={<MyLayout><DisplayProducts/></MyLayout>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      </Provider>
  );
}

export default App;

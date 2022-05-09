import React, { useEffect } from 'react';
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
import DisplayProducts from "./products/Products"
import MyProfile from './profile/MyProfile';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
import RolePage from './RolePage/RolePage';
import Products from './products/Products';
import AboutUs from './AboutUs/AboutUs';




function App() {
  useEffect(() => {
    console.log(window.location.pathname)
  },[])
  return (
<Provider store={configureStore}>
    <div  className="App" style={{backgroundColor:"rgb(4, 52, 71)",margin:"auto"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage/>}/>
          <Route path="/role" exact element={<RolePage/>}/>
          <Route path="/home" exact element={<MyLayout><HomePage/></MyLayout>}/>
          <Route path="/account" exact element={<MyLayout><Account/></MyLayout>}/>
          <Route path="/about" exact element={<MyLayout><AboutUs/></MyLayout>}/>
          <Route path="/posts" exact element={<MyLayout><PostPage/></MyLayout>}/>
          <Route path="/detail/:productId" exact element={<MyLayout><DetailPage/></MyLayout>}/>
          <Route path="/profile" exact element={<MyLayout><MyProfile/></MyLayout>}/>
          <Route path="/products" exact element={<MyLayout><Products/></MyLayout>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
      </Provider>
  );
}

export default App;

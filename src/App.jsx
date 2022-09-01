import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from './aboutUs/AboutUs';
import './App.css';
import DetailPage from './detail/DetailPage';
import DirectToRegister from './DirectToLogin/DirectToRegister';
import ErrorPage from './error/ErrorPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import Account from './myAccount/MyAccount';
import MyLayout from './myLayout/MyLayout';
import PostPage from './post/PostPage';
import Products from './products/Products';
import MyProfile from './profile/MyProfile';
import configureStore from './redux/store/store';
import RolePage from './RolePage/RolePage';




function App() {
  useEffect(() => {
    // console.log(window.location.pathname)
  },[])
  return (
<Provider store={configureStore}>
    <div  className="App" style={{backgroundColor:"rgb(4, 52, 71)"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LoginPage/>}/>
          <Route path="/role" exact element={<RolePage/>}/>
          <Route path="/direct" exact element={<MyLayout><DirectToRegister/></MyLayout>}/>
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

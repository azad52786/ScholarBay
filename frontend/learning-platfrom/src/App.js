import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { Outlet } from 'react-router-dom';
import Footer from './component/common/Footer'
import LoginForm from './component/core/Auth/LoginForm';
import SignupForm from './component/core/Auth/SignupForm';
import Template from './component/core/Auth/Template';
import Navbar from './component/common/Navbar';
import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    <div className=' w-screen min-h-screen bg-richblack-900 font-inter text-white flex flex-col'>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;

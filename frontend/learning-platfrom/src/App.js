import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './component/common/Footer'
import Navbar from './component/common/Navbar';
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

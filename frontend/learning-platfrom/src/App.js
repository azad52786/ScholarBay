import './App.css';
import { Outlet } from 'react-router-dom';
import Footer from './component/common/Footer'
import Navbar from './component/common/Navbar';
import { useSelector } from 'react-redux';
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const { paymentLoading } = useSelector((store) => store.Auth);

  return (
    <div className=' w-screen min-h-screen bg-richblack-900 font-inter text-white flex flex-col relative'>
      <Navbar/>
        <Outlet/>
      <Footer/>

      {paymentLoading && (
        <div className="fixed inset-0 bg-richblack-900 bg-opacity-95 z-[9999] flex flex-col items-center justify-center gap-4">
          <PuffLoader color={"#ffff00"} loading={true} size={80} />
          <p className="text-xl font-semibold text-richblack-25 tracking-wide animate-pulse">
            Verifying the payment...
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

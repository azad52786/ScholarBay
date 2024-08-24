import react from "react";
import PuffLoader from "react-spinners/PuffLoader";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex bg-richblack-800 items-center justify-center">
      <PuffLoader color={"#ffff00"} loading={true} size={80} />
    </div>
  );
};

export default Loading;

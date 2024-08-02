import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Main = () => {
  const token = useSelector((state) => state.user.userName);
  console.log(token);
  return (
    <div className="flex flex-col h-[90vh] justify-center items-center">
      <h1 className="text-lg md:text-4xl">
        Welcome to User Management System
      </h1>
      {token==="Guest"?<p className="mt-2 bg-blue-900 text-white px-4 py-2 rounded-md"><Link to="/login">Login</Link></p>:<p className="mt-2 bg-blue-900 text-white px-4 py-2 rounded-md"><Link to="/user">Profile</Link></p>}
    </div>
  );
};

export default Main;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/userSlice";

const Navbar = () => {
  const userName = useSelector((state)=>state.user.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="bg-blue-950 text-white">
      <div className="flex items-center justify-between w-[80%] m-auto">
        <p className="font-bold text-lg"><Link to='/'>UserManagement</Link></p>
        <ul className="flex">
          {userName==='Guest' && <li className="p-4 cursor-pointer">
            <Link to="/login">Login</Link>
          </li>}
          {
            userName!=='Guest' && <li onClick={()=>{
              dispatch(logoutUser())
              localStorage.removeItem("token")
              navigate('/login')
              
            }} className="p-4 cursor-pointer">
            Logout
            </li>
          }
          {userName==='Guest' && <li className="p-4 cursor-pointer"><Link to="/register">Signup</Link></li>}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

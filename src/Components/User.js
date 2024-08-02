import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { json, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import { API_URL } from "../utils/constants";

const User = () => {
  const userName = useSelector((state) => state.user.userName);
  const jwtToken = useSelector((state)=>state.user.token);
  const [users,setUsers] = useState([]);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  console.log(userName);
  async function fetchUsers(){
    const res = await fetch(`${API_URL}/users`,
      {
        method:"GET",
        headers:{
          Authorization:`Bearer ${jwtToken}` 
        }
      }

    )
    const jsonData = await res.json();
    setUsers(jsonData);
  }
  useEffect(()=>{
    fetchUsers();
  },[jwtToken])

  console.log("USERS:",users.users)
  
  if (userName === "Guest") {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <h1 className="font-bold text-4xl">BACK TO SAFETY!!</h1>
        <button className="mt-2 bg-blue-900 text-white px-4 py-2 rounded-md"><Link to='/login'>Login</Link></button>
      </div>
    )
  }
  return (
    <div className="w-[80%] m-auto">
      <div className="py-10">
        <h1 className="font-bold text-lg">Hi, {userName}</h1>
      </div>
      <div className="">
          <h1 className="text-md font-bold border-b-2">USERS</h1>
          <div>{users?.users?.length>0 && <UserList data={users.users}/>}</div>
      </div>
    </div>
  );
};

export default User;

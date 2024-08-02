import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayUser,updateToken } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import User from "./User";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state)=>state.user.userName);

  if(name.toLowerCase()!=='guest'){
    return <User/>
  }

  const validateForm = () => {
    const errors = {};
    if (!username) {
      errors.usernameError = "Username is required";
    }
    if (!password) {
      errors.passwordError = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const userData = { email:username, password };
      fetch("https://usermanagement-backend-yt9m.onrender.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          dispatch(displayUser(data.name))
          dispatch(updateToken(data.token))
          localStorage.setItem("token",JSON.stringify(data));
          navigate("/user")
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="m-auto w-[80%]">
      <form onSubmit={handleSubmit}>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="username"
                  name="email"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
                
              </div>
              <div className="text-red-600 min-h-4 py-3">{errors.usernameError?errors.usernameError:""}</div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
               
              </div>

              <div className="text-red-600 py-5">{errors.passwordError?errors.passwordError:" "}</div>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

import { useState } from "react";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const registerData = (data)=>{
    fetch(`${API_URL}/signup`,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data),
      }
    )
    .then(res=>{
      if(res.status===400){
        setMsg("Account Already Exists! Please login")
        setErrors({emailError: "Email already exists!"})
      }
      if(res.ok){
        setMsg("Account Created Successfully!")
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }
      setTimeout(()=>{
        setMsg("");
      },1000)
  })
    .catch(err=>console.log(err))
  }


  const validateForm = () => {
    const errors = {};
    if (name.length===0) {
      errors.nameError = "Username is required";
    }
    if(!email){
      errors.emailError = "Email is required";
    }
    if (!password) {
      errors.passwordError = "Password is required";
    }
    if(!age){
      errors.ageError = "Age is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const userData = { name,email,password,age };
      registerData(userData);
    }
  };

  return (
    <div className="flex justify-center delay-100">
      {msg && <div className="absolute top-20 border border-sky-500 py-4 px-10 bg-gray-500">
          {msg}
      </div>}
      <div className=" mt-12 mx-auto w-[80%]">
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="username"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-red-600 min-h-4 py-3">
                  {errors.nameError ? errors.nameError : ""}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-red-600 min-h-4 py-3">
                  {errors.emailError ? errors.emailError : ""}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-red-600 min-h-4 py-3">
                  {errors.ageError ? errors.ageError : ""}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-900">
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

                <div className="text-red-600 py-5">
                  {errors.passwordError ? errors.passwordError : " "}
                </div>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;

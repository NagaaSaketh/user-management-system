import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import LoginForm from "./src/Components/LoginForm"
import Main from "./src/Components/Main"
import Navbar from "./src/Components/Navbar"
import User from "./src/Components/User"
import { Provider } from "react-redux"
import userStore from "./src/utils/userStore"
import RegisterUser from "./src/Components/RegisterUser"

const AppLayout = ()=>{
  return (
    <Provider store={userStore}>
      <Navbar/>
      <Outlet/>
    </Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"))


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<Main/>
      },
      {
        path:'/login',
        element:<LoginForm/>
      },
      {
        path:'/user',
        element:<User/>
      },
      {
        path:'/register',
        element:<RegisterUser/>
      }
    ]
  }
])
root.render(<RouterProvider router={appRouter}/>)
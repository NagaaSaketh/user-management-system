const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice(

  {
  name:"user",
  initialState:{
    userName:JSON.parse(localStorage.getItem('token'))?.name??"Guest",
    isAdmin:false,
    token:JSON.parse(localStorage.getItem('token'))?.token??null
  },
  reducers:{
    displayUser:(state,action)=>{
      state.userName = action.payload
    },
    logoutUser:(state)=>{
      state.userName = "Guest";
      state.token = null;
    },
    updateToken:(state,action)=>{
      state.token = action.payload;
    }
  }

})

export const {displayUser,logoutUser,updateToken} = userSlice.actions

export default userSlice.reducer;
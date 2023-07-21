import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  login : "",
  token : ""
}

const admninSlice = createSlice ({
  name: "admin",
  initialState, 
  reducers : {
    setAdminDetails : (state , action ) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    setAdminSignoutState: (state , action ) => {
      state.id = null;
      state.login = null;
      state.token = null;

    }
  }
})

export const {setAdminSignoutState , setAdminDetails} = admninSlice.actions

export default admninSlice.reducer;
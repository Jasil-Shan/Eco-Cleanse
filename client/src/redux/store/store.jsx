import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import adminSlice from "../features/adminSlice";




export default configureStore({


    reducer: {
      user : userSlice ,
      admin : adminSlice ,

    }
  })
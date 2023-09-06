import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import adminSlice from "../features/adminSlice";
import workerSlice from "../features/workerSlice";
import driverSlice from "../features/driverSlice";




export default configureStore({


    reducer: {
      user : userSlice ,
      admin : adminSlice ,
      worker : workerSlice,
      driver : driverSlice
    }
  })
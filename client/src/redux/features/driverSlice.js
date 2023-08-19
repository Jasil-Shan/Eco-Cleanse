import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    name: "",
    email: "",
    mobile: "",
    place:"",
    image:"",
    role : "",
    location: [],
    status:'',
    task:'',
    assigned:''
}


const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
        setDriverDetails: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name
            state.email = action.payload.email
            state.mobile = action.payload.mobile
            state.place = action.payload.place
            state.image = action.payload.image
            state.role = action.payload.role
            state.location = action.payload.location
            state.status = action.payload.status
            state.task = action.payload.task
            state.assigned = action.payload.assigned
        },
        setDriverSignout: (state, action) => {
            state.id = null;
            state.name = null
            state.email = null
            state.phone = null
        },

    }
})

export const {setDriverDetails , setDriverSignout} = driverSlice.actions

export default driverSlice.reducer
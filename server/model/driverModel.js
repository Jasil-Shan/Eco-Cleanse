import mongoose from "mongoose"

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    blocked: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        default: 'driver'
    },
    location: {
        type: Object,
        default:false
    },
    status:{
        type:String,
        default:'offline'
    }
})

const DriverModel = mongoose.model("drivers", DriverSchema)

export default DriverModel
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
    place: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    blocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'driver'
    },
    gender: {
        type: String,
        
    },
    location: {
        type: Object,
        default: false
    },
    status: {
        type: String,
        default: 'offline'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
    },
    assigned :{
        type:Boolean,
        default:false
    }
})

const DriverModel = mongoose.model("drivers", DriverSchema)

export default DriverModel
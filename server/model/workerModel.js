import mongoose from "mongoose"

const WorkerSchema = new mongoose.Schema({
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
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        
    },
    place: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required:true
    },
    blocked: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        default: 'worker'
    },
    location: {
        type: Object,
        default:false
    },
    status:{
        type:String,
        default:'offline'
    },
    task:{
        type:Object
    },
    assigned :{
        type:Boolean,
        default:false
    }
})

const WorkerModel = mongoose.model("workers", WorkerSchema)

export default WorkerModel
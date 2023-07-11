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
    blocked: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        default: 'worker'
    }
})

const WorkerModel = mongoose.model("workers", WorkerSchema)

export default WorkerModel
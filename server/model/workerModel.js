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
    }
})

const WorkerModel = mongoose.model("Workers", WorkerSchema)

export default WorkerModel
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
    }
})

const DriverModel = mongoose.model("drivers", DriverSchema)

export default DriverModel
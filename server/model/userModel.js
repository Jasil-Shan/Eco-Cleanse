import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
    },
    blocked: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        default: 'user'
    }
})

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel
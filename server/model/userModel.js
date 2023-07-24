import mongoose from "mongoose"

const garbageSchema = new mongoose.Schema(
    {
      eWaste: {
        type: String,
        required: true,
      },
      foodWaste: {
        type: String,
        required: true,
      },
      plasticWaste: {
        type: String,
        required: true,
      },
      others: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

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
    },

    garbageDetails : [garbageSchema]
})

const UserModel = mongoose.model("Users", UserSchema)

export default UserModel
import mongoose from "mongoose"

const garbageSchema = new mongoose.Schema({

    eWaste:{
        type:String,
        required:true
    },
    foodWaste:{
        type:String,
        required:true
    },
    plasticWaste:{
        type:String,
        required:true
    },
    Others:{
        type:String,
        required:true
    }
}) 
 
const garbageModel = mongoose.model('garbage',garbageSchema)

export default garbageModel
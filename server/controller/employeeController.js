import DriverModel from "../model/driverModel.js";



export async function getLocation(req,res){
    try {
        const {location} = req.body
        const id = req.driverId
        const updatedDriver = await DriverModel.findByIdAndUpdate(
            id,
            { $set: { location } }).then(()=>{
                res.json({success:true, message:"Location Update Success"})
            })
    } catch (error) {
        console.log(error);
    }
}
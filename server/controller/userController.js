import UserModel from "../model/userModel.js"




export async function userBooking(req, res) {
    try {

        const {eWaste,foodWaste,plasticWaste,others} = req.body
        console.log(req.body,"shaGSHG");
        const id = req.userId
        const user = await UserModel.findById(id)
        console.log("sdghdsg",user,'shgdhgsd');
        user.garbageDetails.push({eWaste,foodWaste,plasticWaste,others})
        
    } catch (error) {
        console.log(error);
    }

}
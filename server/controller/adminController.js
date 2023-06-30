import adminModel from "../model/adminModel.js"




export async function getAdminLogin(req,res){
    try {

        const {name,email,password} = req.body
        const admin = await adminModel.findOne({email})
        if(!admin)
           return res.json({error:true,message:"You have no Admin Access"})
        
           
    } catch (error) {
        
    }
}
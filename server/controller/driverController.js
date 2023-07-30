import DriverModel from "../model/driverModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export async function driverLogin(req, res) {
    try {

        const {email,password} = req.body

        const driver = await DriverModel.findOne({email})
        if(!driver)
           return res.json({ error: true, message: 'User not registered' })

           if(driver.blocked) {
            return res.json({ blocked : true , message :"Sorry You are banned"})
          }
           const driverValid = bcrypt.compareSync(password, driver.password);

           if (!driverValid) {
               return res.json({ error: true, message: "wrong Password" })
           } else {
               const token = jwt.sign(
                   {
                       id: driver._id
                   },
                   'DriverJwtkey'
               )
               res.json({ error: false, token })
           }
    } catch (error) {
        console.log(error);
    }

}


export async function driverAuth(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.DRIVER_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const driver = await DriverModel.findById({_id:decoded.id})
                    console.log(driver)
                    if(driver){
                       return res.json({status:true ,message:"Authorised"})
                    }else{
                       return res.json({status:false, message:"Driver not found"})
                    }
                }
            })
        }else{
            res.json({status:false , message:"Driver not exists"})
        }
    } catch (error) {
        console.log(error);
    }
}

import DriverModel from "../model/driverModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export async function driverLogin(req, res) {
    try {

        const {email,password} = req.body

        const driver = await DriverModel.findOne({email})
        if(driver)
           res.json({ error: true, message: 'User not registered' })
           const driverValid = bcrypt.compareSync(password, driver.password);

           if (!driverValid) {
               return res.json({ err: true, message: "wrong Password" })
           } else {
   
               const token = jwt.sign(
                   {
                       id: driver._id
                   },
                   'myjwtkey'
               )
   
               return res.cookie("token", token, {
                   httpOnly: true,
                   secure: true,
                   maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                   sameSite: "none",
               }).json({ err: false, driver: driver._id, token })
           }
    } catch (error) {
        console.log(error);
    }

}
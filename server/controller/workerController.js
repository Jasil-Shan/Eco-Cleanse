import WorkerModel from "../model/workerModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export async function workerLogin(req, res) {
    try {

        const {email,password} = req.body

        const worker = await WorkerModel.findOne({email})
        if(worker)
           res.json({ error: true, message: 'User not registered' })
           const workerValid = bcrypt.compareSync(password, worker.password);

           if (!workerValid) {
               return res.json({ err: true, message: "wrong Password" })
           } else {
   
               const token = jwt.sign(
                   {
                       id: worker._id
                   },
                   'myjwtkey'
               )
   
               return res.cookie("token", token, {
                   httpOnly: true,
                   secure: true,
                   maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                   sameSite: "none",
               }).json({ err: false, worker: worker._id, token })
           }
    } catch (error) {

        console.log(error);
    }

}
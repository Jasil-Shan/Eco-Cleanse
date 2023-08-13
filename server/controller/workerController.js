import WorkerModel from "../model/workerModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export async function workerLogin(req, res) {
    try {

        const {email,password} = req.body

        const worker = await WorkerModel.findOne({email})
        if(!worker)
           return res.json({ error: true, message: 'User not registered' })

           if(worker.blocked) {
            return res.json({ blocked : true , message :"Sorry You are banned"})
          }

           const workerValid = bcrypt.compareSync(password, worker.password);
           console.log(workerValid);
           if (!workerValid) {
               return res.json({ error: true, message: "wrong Password" })
           } else {
               const token = jwt.sign(
                   {
                       id: worker._id
                   },
                   'WorkerJwtkey'
               )
   
               res.json({ error: false, token })
           }
    } catch (error) {

        console.log(error);
    }

}


export async function workerAuth(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.WORKER_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const worker = await WorkerModel.findById({_id:decoded.id})
                    console.log(worker)
                    if(worker){
                        res.json({status:true , worker ,  message:"Authorised"})
                    }else{
                        res.json({status:false, message:"User not found"})
                    }
                }
            })
        }else{
            res.json({status:false , message:"User not exists"})
        }
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateLocation(req,res){
    try {

        const {location} = req.body
        const id = req.workerId
        const worker = await WorkerModel.findByIdAndUpdate(
            id,
            { $set: { location } }).then(()=>{
                res.json({success:true, message:"Location Update Success"})
            })

    } catch (error) {

        console.log(error);
    }
}

export async function updateStatus(req,res){

    try {

        const {location,status} = req.body
        const id = req.workerId
        console.log(req.body);
        if(status == 'Offline'){
        const worker = await WorkerModel.findByIdAndUpdate(
            id,
            { $set: { location,status:'Available' } })
            res.json({success:true, message:"Location Update Success"})
        }else{
         const worker = await WorkerModel.findByIdAndUpdate(
                id,
                { $set: { location,status:'Offline' } }).then(()=>{
                    res.json({success:true, message:"Location Update Success"})
                })
        }
              
    } catch (error) {
        console.log(); 
    }
}

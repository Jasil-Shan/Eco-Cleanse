import WorkerModel from "../model/workerModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import BookingModel from "../model/bookingModel.js"




export async function workerLogin(req, res) {
    try {

        const { email, password } = req.body

        const worker = await WorkerModel.findOne({ email })
        if (!worker)
            return res.json({ error: true, message: 'User not registered' })

        if (worker.blocked) {
            return res.json({ blocked: true, message: "Sorry You are banned" })
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
                    const worker = await WorkerModel.findById({ _id: decoded.id })
                    console.log(worker)
                    if (worker) {
                        res.json({ status: true, worker, message: "Authorised" })
                    } else {
                        res.json({ status: false, message: "User not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "User not exists" })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateLocation(req, res) {
    try {

        const { location } = req.body
        const id = req.workerId
        console.log(location);

        const worker = await WorkerModel.findByIdAndUpdate(
            id,
            { $set: { location } }).then(() => {
                res.json({ success: true, message: "Location Update Success" })
            })

    } catch (error) {

        console.log(error);
    }
}

export async function updateStatus(req, res) {

    try {

        const { location, status } = req.body
        const id = req.workerId
        console.log(req.body,'jhdjh')
        if (status == 'Available') {
            const worker = await WorkerModel.findByIdAndUpdate(
                id,
                { $set: { location, status: 'Available' } })
            if (worker) return res.json({ success: true, message: "Location Update Success" })
        } else {
            const worker = await WorkerModel.findByIdAndUpdate(
                id,
                { $set: { location, status: 'Offline' } })
            if (worker) return res.json({ success: true, message: "Location Update Success" })
        }

    } catch (error) {
        console.log(error);
    }
}

export async function getWorkerTasks(req, res) {
    try {
        const { taskId } = req.body
        const task = await BookingModel.findById(taskId).populate('user').populate('worker').populate('driver')
        return res.json({ status: true, message: 'Success', task })
    } catch (error) {
        console.log(error);

    }
}

export async function acceptTask(req, res) {
    try {
        const workerId = req.workerId
        const {taskId} = req.body

        const otherUserModel = WorkerModel
        Promise.all([
            WorkerModel.findByIdAndUpdate(workerId, { assigned: true , status:'On Route' }),
            otherUserModel.updateMany(
                { _id: { $ne: workerId } },
                { $set: { task: null } }),
                BookingModel.findByIdAndUpdate(taskId,{worker:workerId})
            ]).then(()=>{
                res.json({success:true, message:'Task Accepted'})
            }).catch((error)=>{
                res.json({success:false, message:'Try Again Sometime'})
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }

}

export async function taskComplete(req, res) {
    try {

        const _id = req.workerId

        const { garbageDetails, taskId ,location,totalAmount} = req.body
        console.log(req.body);
        
        await Promise.all([
        BookingModel.findByIdAndUpdate(taskId, {
                $set: { garbageCollected: garbageDetails, status: 'Completed' ,location ,totalAmount }
            }),
         WorkerModel.findByIdAndUpdate(_id,{$set:{task:null,assigned:false ,location,status:'Available' }})
        ])
 
        res.json({ success: true, message: "Updated" })

    } catch (error) {
        res.json({ success: false, message: " OOps Try Again" })

        console.log(error);
    }
}

export async function profileUpdate (req,res){
    try {
        console.log(req.body);
        const _id = req.workerId
        const {mobile , name} = req.body
        await WorkerModel.findByIdAndUpdate(_id,{$set:{mobile,name}})
        res.json({success : true , message : "profile updated"})
    } catch (error) {
        console.log(error);
    }
}


export async function getHistory (req,res){
    try {
        const _id = req.workerId
        const history = await BookingModel.find({worker:_id}).populate('user').populate('worker').populate('driver')
        res.json({success:true , message:'history reached' , history})
    } catch (error) {
        console.log(error);
        res.json({success:fals , message:'failed '})
    }
}

export async function getBooking (req,res){
    try {
        const _id = req.query.id
        const booking = await BookingModel.findById(_id).populate('user').populate('worker').populate('driver')
        res.json({success:true , message:'Success' , booking})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:'failed '})
    }
}
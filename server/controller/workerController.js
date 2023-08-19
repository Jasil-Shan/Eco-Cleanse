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
        if (status == 'Offline') {
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
        console.log();
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
            WorkerModel.findByIdAndUpdate(workerId, { assigned: true }),
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

        const { garbageDetails, id } = req.body
        const result = await BookingModel.findByIdAndUpdate(id, {
            $set: { garbageCollected: garbageDetails, status: 'Completed' }
        })
        res.json({ success: true, message: "Updated" })

    } catch (error) {

        console.log(error);
    }

}
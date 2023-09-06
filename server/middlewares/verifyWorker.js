import jwt from 'jsonwebtoken'
import WorkerModel from "../model/workerModel.js"


export async function verifyWorker(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.WORKER_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const worker = await WorkerModel.findById({ _id: decoded.id })
                    if (worker) {

                        req.workerId = decoded.id
                        next()

                    } else {
                        res.json({ status: false, message: "worker not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "worker not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}
import DriverModel from "../model/driverModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import BookingModel from "../model/bookingModel.js";




export async function driverLogin(req, res) {
    try {

        const { email, password } = req.body

        const driver = await DriverModel.findOne({ email })
        if (!driver)
            return res.json({ error: true, message: 'User not registered' })

        if (driver.blocked) {
            return res.json({ blocked: true, message: "Sorry You are banned" })
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
                    const driver = await DriverModel.findById({ _id: decoded.id })
                    if (driver) {
                        return res.json({ status: true, driver, message: "Authorised" })
                    } else {
                        return res.json({ status: false, message: "Driver not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "Driver not exists" })
        }
    } catch (error) {
        console.log(error);
    }
}





export async function UpdateLocation(req, res) {
    try {
        const { location } = req.body
        const id = req.driverId
        console.log(location);
        const Driver = await DriverModel.findByIdAndUpdate(
            id,
            { $set: { location} }).then(() => {
                res.json({ success: true, message: "Location Update Success" })
            })
    } catch (error) {
        console.log(error);
    }
}


export async function updateStatus(req, res) {

    try {

        const { location, status } = req.body
        const id = req.driverId
        if (status == 'Available') {
            const driver = await DriverModel.findByIdAndUpdate(
                id,
                { $set: { location, status: 'Available' } }).then(() => {
                    res.json({ success: true, message: "Location Update Success" })
                })

        } else {
            const driver = await DriverModel.findByIdAndUpdate(
                id,
                { $set: { location, status: 'Offline' } }).then(() => {
                    res.json({ success: true, message: "Location Update Success" })
                })
        }

    } catch (error) {
        console.log(error);
    }
}


export async function getTasks(req, res) {
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
        
        const driverId = req.driverId
        const { taskId } = req.body

        const otherUserModel = DriverModel

        Promise.all([
            DriverModel.findByIdAndUpdate(driverId, { assigned: true ,status:'On Route' }),
            otherUserModel.updateMany(
                { _id: { $ne: driverId } },
                { $set: { task: null } }),
            BookingModel.findByIdAndUpdate(taskId, { driver: driverId })
        ]).then(() => {
            res.json({ success: true, message: 'Task Accepted' })
        }).catch((error) => {
            res.json({ success: false, message: 'Try Again Sometime' })
            console.log(error)
        })

    } catch (error) {
        console.log(error)
    }

}

export async function profileUpdate (req,res){
    try {
        const _id = req.driverId
        const {mobile , name} = req.body
        await DriverModel.findByIdAndUpdate(_id,{$set:{mobile,name}})
        res.json({success : true , message : "profile updated"})
    } catch (error) {
        console.log(error);
    }
}


export async function getHistory (req,res){
    try {
        const _id = req.driverId
        const history = await BookingModel.find({driver:_id}).populate('user').populate('worker').populate('driver')
        res.json({success:true , message:'history reached' , history})
    } catch (error) {
        console.log(error);
        res.json({success:fals , message:'failed '})
    }
}


export async function taskComplete(req, res) {
    try {

        const _id = req.driverId
        const { location } = req.body
        await DriverModel.findByIdAndUpdate(_id,{$set:{task:null,location,status:'Available',assigned: false}})
        res.json({ success: true, message: "Updated" })
    } catch (error) {
        res.json({ success: false, message: "Try Again" })
        console.log(error);
    }
}
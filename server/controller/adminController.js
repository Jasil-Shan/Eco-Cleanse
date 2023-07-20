import { errorMonitor } from "nodemailer/lib/xoauth2/index.js";
import { sendVerificationCode } from "../helper/sendOtp.js";
import adminModel from "../model/adminModel.js"
import DriverModel from "../model/driverModel.js";
import UserModel from "../model/userModel.js";
import WorkerModel from "../model/workerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let salt = bcrypt.genSaltSync(10);

export async function adminAuth(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ADMIN_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const admin = adminModel.findById({_id:decoded.id})
                    if(admin){
                        res.json({status:true , message:"Authorised"})
                    }else{
                        res.json({status:false, message:"Admin not found"})
                    }
                }
            })
        }else{
            res.json({status:false , message:"Admin not exists"})
        }
    } catch (error) {
        console.log(error);
    }
}


export async function adminLogin(req, res) {
    try {

        const { name, email, password } = req.body
        console.log(req.body);
        const admin = await adminModel.findOne({ email })
        console.log(admin);
        if (!admin) {
            return res.json({ error: true, message: "You have no Admin Access" })

        } else {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                'AdminJwtToken'
            )
            res.status(200).json({ admin, token, login: true });

            // return res.cookie("token", token, {
            //     httpOnly: true,
            //     secure: true,
            //     maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            //     sameSite: "none",
            // }).json({ err: false, admin: admin._id, token })
        }

    } catch (error) {

        console.log(error);
    }
}

export async function viewUsers(req, res) {
    try {
        const users = await UserModel.find({})
        res.json({ success: true, users })
    } catch (error) {
        res.json({ message: "something went wrong", error: true });
    }
}

export async function block(req, res) {
    try {
        if (req.body.role == 'user') {
            await UserModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: true },
            }).lean();
        } else if (req.body.role == 'worker') {
            await WorkerModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: true },
            }).lean();
        } else {
            await DriverModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: true },
            }).lean();
        }
        res.json({ err: false });
    } catch (err) {
        res.json({ message: "something went wrong", err: true });
    }
}

export async function unBlock(req, res) {
    try {
        if (req.body.role == 'user') {
            await UserModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: false },
            }).lean();
        } else if (req.body.role == 'worker') {
            await WorkerModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: false },
            }).lean();
        } else {
            await DriverModel.findByIdAndUpdate(req.body._id, {
                $set: { blocked: false },
            }).lean();
        }
        res.json({ err: false });
    } catch (err) {
        res.json({ message: "something went wrong", err: true });
    }
}

export async function viewWorkers(req, res) {
    try {
        const workers = await WorkerModel.find({})
        res.json({ status: true, workers })
    } catch (error) {
        res.json({ message: "something went wrong", error: true });
    }
}

export async function viewDrivers(req, res) {
    try {
        const drivers = await DriverModel.find({})
        res.json({ status: true, drivers })
    } catch (error) {
        res.json({ message: "something went wrong", error: true });
    }
}

export async function addWorker(req, res) {
    try {

        const { name, email, password, mobile } = req.body
        const worker = await WorkerModel.findOne({ email })

        if (worker) {

            return res.json({
                error: true,
                message: " Worker already registered "
            })
        } else {
            console.log(req.body);
            let hashedPassword = bcrypt.hashSync(password, salt)

            const worker = await WorkerModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
            }).then(() => {
                return res.json({ status: true, message: "Worker added successfully" });
            }).catch(() => {
                return res.json({ status: false, message: "Worker adding failed" });
            })
        }
    } catch (error) {
        console.log(error);
    }
}


export async function addDriver(req, res) {
    try {

        const { name, email, password, mobile } = req.body
        const driver = await DriverModel.findOne({ email })

        if (driver) {

            return res.json({
                error: true,
                message: " Driver already registered "
            })
        } else {

            let hashedPassword = bcrypt.hashSync(password, salt)

            const driver = await DriverModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
            }).then(() => {
                return res.json({ status: true, message: "Driver added successfully" });
            }).catch(() => {
                return res.json({ status: false, message: "Driver adding failed" });
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function sendMail(req, res) {
    try {
        console.log(req.body);
        let role = 'employee'
        const { email, password } = req.body
        sendVerificationCode(email, role, password)
    } catch (error) {
        console.log(error);
    }
}
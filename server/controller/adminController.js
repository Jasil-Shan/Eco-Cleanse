import adminModel from "../model/adminModel.js"
import WorkerModel from "../model/workerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let salt = bcrypt.genSaltSync(10);

export async function AdminLogin(req,res){
    try {

        const {name,email,password} = req.body
        console.log(req.body);
        const admin = await adminModel.findOne({email})
        console.log(admin);
        if(!admin){

           return res.json({error:true,message:"You have no Admin Access"})

        } else {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                'myjwtkey'
            )

            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
            }).json({ err: false, admin: admin._id, token })
        }
           
    } catch (error) {

        console.log(error);
    }
}


export async function addWorker(req,res){
    try {
        
        const {name,email,password,mobile} = req.body

        let hashedPassword = bcrypt.hashSync(password, salt)

        const worker = await WorkerModel.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        }).then(()=>{
           return res.json({ status: true, message: "Worker added successfully" });
        }).catch(()=>{
            return res.json({ status: false, message: "Worker adding failed" });
        })

    } catch (error) {
        console.log(error);
    }
}


export async function addDriver(req,res){
    try {
        
        const {name,email,password,mobile} = req.body

        let hashedPassword = bcrypt.hashSync(password, salt)

        const driver = await WorkerModel.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        }).then(()=>{
           return res.json({ status: true, message: "driver added successfully" });
        }).catch(()=>{
            return res.json({ status: false, message: "driver adding failed" });
        })

    } catch (error) {
        console.log(error);
    }
}
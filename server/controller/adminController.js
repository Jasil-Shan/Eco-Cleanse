import adminModel from "../model/adminModel.js"
import WorkerModel from "../model/workerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let salt = bcrypt.genSaltSync(10);

export async function getAdminLogin(req,res){
    try {

        const {name,email,password} = req.body
        const admin = await adminModel.findOne({email})
        if(!admin)
           return res.json({error:true,message:"You have no Admin Access"})
        
           
    } catch (error) {
        
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
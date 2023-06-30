import { sendVerificationCode, verifyOtp } from "../helper/sendOtp.js"
import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'


let userDetails
let salt = bcrypt.genSaltSync(10);

export async function generateOTP(req, res) {
    try {

        console.log(req.body, 'body');
        const { email } = req.body

        const user = await UserModel.findOne({ email })

        if (user) {

            return res.json({
                err: true,
                message: " User already registered here"
            })
        } else {
            sendVerificationCode(email, req)
                .then((response) => {
                    res.json({ status: true, message: "Email sent successfully" })
                    userDetails = req.body
                    console.log(userDetails);
                })
                .catch((response) => {
                    res.json({ status: false, message: "OTP not send" });
                });
        }

    } catch (error) {

        console.log(error);
    } 
}


export async function signUp(req, res) {
    try {
        let verified = verifyOtp(req.body.otp)
        console.log(verified);
        console.log(req.body.otp,'otpppp');
        if (verified) {
            console.log(userDetails);
            const { name, email, mobile, address, password,locations } = userDetails

            let hashedPassword = bcrypt.hashSync(password, salt)

            const user = await UserModel.create({
                name,
                email,
                mobile,
                address, 
                password: hashedPassword,
                location:locations,
            });
            res.status(201)
                .json({ status: true, message: "Otp verified successfully" });
        } else {
            res.json({ status: false, message: "Otp does not match " });
        }
    } catch (error) {

        console.log(error);

    }
}



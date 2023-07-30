import { sendVerificationCode, verifyOtp } from "../helper/sendOtp.js"
import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

let userDetails
let salt = bcrypt.genSaltSync(10);
// const secret_key = process.env.JWT_SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.USER_SECRET_KEY, { expiresIn: maxAge });
  };

  export async function userAuth(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.USER_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const user = await UserModel.findById({_id:decoded.id})
                    console.log(user)
                    if(user){
                        res.json({status:true ,user,  message:"Authorised"})
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

export async function login(req, res) {
    try {
        console.log("grtlogin");
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        console.log(user);
        if (!user) {
            res.json({ error: true, message: 'User not registered' })
        }
        if(user.blocked) {
            return res.json({ login : false , message :"Sorry You are banned"})
          }
        const userValid = bcrypt.compareSync(password, user.password);

        if (!userValid) {
            
            return res.json({ err: true, message: "wrong Password" })

        } else {

            const token = createToken(user._id);

            res.status(200).json({ user, token, login: true });
        }

    } catch (error) {
        console.log(error);
    }
}

export async function generateOTP(req, res) {
    try {
        
        console.log(req.body, 'body');
        const { email } = req.body
        const user = await UserModel.findOne({ email })

        if (user) {

            return res.json({
                error: true,
                message: " User already registered here"
            })
        } else {
            let role = 'user'
            sendVerificationCode(email, role)
                .then((response) => {
                    res.json({ status: true, message: "Email sent successfully" })
                    userDetails = req.body
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
        console.log(req.body.otp, 'otpppp');
        if (verified) {
            console.log(userDetails);
            const { name, email, mobile, address, password, locations } = userDetails

            let hashedPassword = bcrypt.hashSync(password, salt)

            const user = await UserModel.create({
                name,
                email,
                mobile,
                address,
                password: hashedPassword,
                location: locations,
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





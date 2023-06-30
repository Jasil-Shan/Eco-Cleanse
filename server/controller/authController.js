import { sendVerificationCode } from "../helper/sendOtp"
import UserModel from "../model/userModel"





export async function generateOTP(req, res) {
    try {

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



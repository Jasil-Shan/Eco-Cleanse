import UserModel from "../model/userModel.js"
import jwt from 'jsonwebtoken'


export async function verifyUser(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]

            jwt.verify(token, process.env.USER_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const user = await UserModel.findById({ _id: decoded.id })

                    if (user) {

                        req.userId = decoded.id
                        next()

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
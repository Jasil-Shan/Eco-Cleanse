import jwt from 'jsonwebtoken'
import adminModel from '../model/adminModel'


export async function verifyAdmin(req, res, next) {

    try {

        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ADMIN_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const worker = await adminModel.findById({ _id: decoded.id })
                    if (worker) {
                        next()
                    } else {
                        res.json({ status: false, message: "Admin not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "Admin not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}
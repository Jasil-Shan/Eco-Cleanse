import DriverModel from "../model/driverModel.js"
import driverModel from "../model/driverModel.js"
import jwt from 'jsonwebtoken'


export async function verifyDriver(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            console.log(process.env.DRIVER_SECRET_KEY);
            console.log(token);
            jwt.verify(token, process.env.DRIVER_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const driver = await DriverModel.findById({ _id: decoded.id })
                    console.log(driver);
                    if (driver) {

                        req.driverId = decoded.id
                        next()

                    } else {
                        res.json({ status: false, message: "driver not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "driver not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}
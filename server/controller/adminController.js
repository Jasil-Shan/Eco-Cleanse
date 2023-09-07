import cloudinary from "../config/cloudinary.js";
import { sendVerificationCode } from "../helper/sendOtp.js";
import adminModel from "../model/adminModel.js"
import BookingModel from "../model/bookingModel.js";
import DriverModel from "../model/driverModel.js";
import UserModel from "../model/userModel.js";
import WorkerModel from "../model/workerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


let salt = bcrypt.genSaltSync(10);
let secret_key = process.env.ADMIN_SECRET_KEY



export async function adminAuth(req, res) {
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ADMIN_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const admin = adminModel.findById({ _id: decoded.id })

                    if (admin) {
                        res.json({ status: true, message: "Authorised" })
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


export async function adminLogin(req, res) {
    try {

        const { name, email, password } = req.body
        console.log(req.body);
        const admin = await adminModel.findOne({ email })
        console.log(admin);
        if (!admin) {
            return res.json({ error: true, message: "You have no Admin Access" })
        }
        if (admin.password !== password) {
            return res.json({ error: true, message: "Please check password" })

        } else {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                'AdminJwtkey'
            )
            res.status(200).json({ admin, token, error: false });
        }

    } catch (error) {

        console.log(error);
    }
}

export async function viewUsers(req, res) {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let sort = req.query.sort 



      

        const users = await UserModel.find({ name: { $regex: search, $options: 'i' } }).sort(sort).skip(page * limit).limit(limit)

        const total = await UserModel.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        const response = {
            status: true,
            total,
            page: page + 1,
            limit,
            users,
        };

        res.status(200).json(response)
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
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let sort = req.query.sort 


        const workers = await WorkerModel.find({ name: { $regex: search, $options: 'i' } }).sort(sort).skip(page * limit).limit(limit)

        const total = await WorkerModel.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        const response = {
            status: true,
            total,
            page: page + 1,
            limit,
            workers,
        };

        res.status(200).json(response)
    } catch (error) {
        res.json({ message: "something went wrong", error: true });
    }
}

export async function viewDrivers(req, res) {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let sort = req.query.sort 


        console.log(req.query);

      

        const drivers = await DriverModel.find({ name: { $regex: search, $options: 'i' } }).sort(sort).skip(page * limit).limit(limit)

        const total = await DriverModel.countDocuments({
            name: { $regex: search, $options: "i" },
        });

        const response = {
            status: true,
            total,
            page: page + 1,
            limit,
            drivers,
        };

        res.status(200).json(response);

        
    } catch (error) {
        console.log(error);
        res.json({ message: "something went wrong", error: true });
    }
}

export async function addWorker(req, res) {
    try {
        const { name, email, dob, password, mobile, image } = req.body
        const worker = await WorkerModel.findOne({ email })

        if (worker) {

            return res.json({
                error: true,
                message: " Worker already registered "
            })
        } else {

            const result = await cloudinary.uploader.upload(...image, {
                folder: "Shaj Paradise",
            });
            console.log(result);
            let hashedPassword = bcrypt.hashSync(password, salt)

            const worker = await WorkerModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
                dob,
                image: result.secure_url
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


export async function addEmployee(req, res) {
    try {

        console.log(req.body);
        const { name, email, dob, password, mobile, image,gender, location, place, role } = req.body

        if (role == 'driver') {
            const Driver = await DriverModel.findOne({ email })
            if (Driver) {

                return res.json({
                    error: true,
                    message: " Driver already registered "
                })
            }
        } else {
            const Worker = await WorkerModel.findOne({ email })
            if (Worker) {

                return res.json({
                    error: true,
                    message: " Worker already registered "
                })
            }
        }

        if (role == 'driver') {

            const result = await cloudinary.uploader.upload(...image, {
                folder: "Shaj Paradise",
            });

            let hashedPassword = bcrypt.hashSync(password, salt)

            const Driver = await DriverModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
                dob,
                gender,
                image: result.secure_url,
                location,
                place
            }).then(() => {
                return res.json({ status: true, message: "Driver added successfully" });
            }).catch(() => {
                return res.json({ status: false, message: "Driver adding failed" });
            })
        } else {
            const result = await cloudinary.uploader.upload(...image, {
                folder: "Shaj Paradise",
            });
            let hashedPassword = bcrypt.hashSync(password, salt)

            const Worker = await WorkerModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
                dob,
                gender,
                image: result.secure_url,
                location,
                place
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


export async function viewBookings(req, res) {
    try {
        const page = parseInt(req.query.page) - 1 || 0
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ""
        let sort = req.query.sort 
        const {fromDate , toDate} = req.query
        if (fromDate && toDate) {
            let query = BookingModel.find({});
            query = query.where('createdAt').gte(new Date(fromDate)).lte(new Date(toDate));
            const bookings = await query.populate('user').populate('worker').populate('driver');
            return res.json({ success: true, bookings });
        }
        const bookings = await BookingModel.find({}).populate('user').populate('worker').populate('driver').sort(sort).skip(page * limit).limit(limit)
        const total = await BookingModel.countDocuments({});
        const response = {
            success: true,
            total,
            page: page + 1,
            limit,
            bookings,
        };
        res.status(200).json(response)
    } catch (error) {
        res.json({ message: "Something went wrong", error: true });
    }
}


export async function getEmployees(req, res) {
    try {
        const worker = await WorkerModel.find({})
        const driver = await DriverModel.find({})
        const user = await UserModel.findById()
        if (worker && driver) {
            res.json({ status: true, message: "success", worker, driver })
        } else {
            res.json({ status: false, message: "failed" })

        }
    } catch (error) {
        console.log(error);
    }
}

export async function assignWork(req, res) {
    try {
        console.log(req.body);
        const { workerId, driverId, bookingId } = req.body
        let id = bookingId
        const Driver = await BookingModel.findByIdAndUpdate(
            id,
            { $set: { worker: workerId, driver: driverId, assigned: true } })
        res.json({ success: true, message: "Work Update Success" })


    } catch (error) {
        console.log(error);
    }
}


export async function totalStats(req, res) {
    try {

        const count = await Promise.all([
            UserModel.countDocuments({}).exec(),
            DriverModel.countDocuments({}).exec(),
            WorkerModel.countDocuments({}).exec(),
            BookingModel.countDocuments({}).exec()
        ])

        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalFoodWaste: { $sum: { $toInt: "$garbageCollected.foodWaste" } },
                    totalEWaste: { $sum: { $toInt: "$garbageCollected.eWaste" } },
                    totalPlasticWaste: { $sum: { $toInt: "$garbageCollected.plasticWaste" } },
                    totalOthers: { $sum: { $toInt: "$garbageCollected.Others" } }
                }
            }
        ];

        const result = await BookingModel.aggregate(pipeline);

        const totalSums = {
            foodWaste: result[0].totalFoodWaste,
            eWaste: result[0].totalEWaste,
            plasticWaste: result[0].totalPlasticWaste,
            Others: result[0].totalOthers
        }

        const totalSum = Object.values(totalSums).reduce((acc, curr) => acc + curr, 0);

        const onlineEmployee = await Promise.all([
            DriverModel.countDocuments({status:'Available'}).exec(),
            WorkerModel.countDocuments({status:'Available'}).exec(),
        ])

        const monthlyRevenuePipeline = [
            {
              $group: {
                _id: { $month: "$createdAt" }, // Group by month
                totalRevenue: { $sum: "$amount" }, // Sum the revenue
              }
            }
          ];
      
          const monthlyRevenueResult = await BookingModel.aggregate(monthlyRevenuePipeline);
      
          const monthlyRevenue = Array(12).fill(0); // Initialize an array for 12 months
          monthlyRevenueResult.forEach(item => {
            monthlyRevenue[item._id - 1] = item.totalRevenue; // Populate the monthly revenue array
          });

        res.json({ success: true, count, totalSums,onlineEmployee,monthlyRevenue, totalSum })

    } catch (error) {
        console.log(error);
    }
}
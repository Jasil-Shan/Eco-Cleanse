import { useEffect, useState } from "react";
import { assignWork, getLocation } from "../../../services/adminApi";
import { calculateDistance } from "../../../helpers/calculateDistance";
import { toast } from "react-toastify";




const AssignModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const [worker, setWorker] = useState()
    const [driver, setDriver] = useState()
    const userLatitude = props.booking.user.location[1]
    const userLongitude = props.booking.user.location[0]

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getLocation()
                    console.log(data);
                    if (data.status) {
                        const workerDistance = data.worker.map((worker) => {
                            const distance = calculateDistance(
                                userLatitude,
                                userLongitude,
                                worker.location[1],
                                worker.location[0]
                            );
                            return { ...worker, distance };
                        });
                        const driverDistance = data.driver.map((driver) => {
                            const distance = calculateDistance(
                                userLatitude,
                                userLongitude,
                                driver.location[1],
                                driver.location[0]
                            );
                            return { ...driver, distance };
                        });
                        const nearbyWorker = workerDistance.filter(
                            (worker) => worker.distance <= 10
                        )
                        const nearbyDriver = driverDistance.filter(
                            (driver) => driver.distance <= 10
                        )
                        nearbyWorker.sort((a, b) => a.distance - b.distance)
                        nearbyDriver.sort((a, b) => a.distance - b.distance)
                        setWorker(nearbyWorker)
                        setDriver(nearbyDriver)
                        console.log(driver);
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [refresh])


    const handleSubmit = async (driverId, workerId,bookingId) => {

        const {data} = await assignWork(driverId,workerId,bookingId)
        console.log(data);
        if(data.success){
            toast.success(data.message, {
                position: "top-center"
            })
        }

    }


    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    let booking = props.booking
    console.log(booking._id);

    return (
        <>
            <label htmlFor="my_modal_7" className="btn btn-sm bg-blue-700 text-white">Assign</label>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h1 className="font-bold">NEARBY WORKER</h1>
                    {worker &&
                        <div class="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-2xl m-5">
                            <img class="max-h-20 w-full opacity-80 absolute z-0 top-0" src="https://unsplash.com/photos/iFPBRwZ4I-M/download?force=true&w=640" alt="" />
                            <div class="profile w-full flex z-10 m-3 ml-4 text-white">
                                <img class="w-28 h-28 p-1  bg-white rounded-full" src={worker[0].image} alt="" />
                                <div class="title mt-11 ml-3 font-bold flex flex-col">
                                    <div class="name break-words">{worker[0].name}</div>
                                    <div class="add font-semibold text-sm text-black italic dark">{worker[0].role}</div>
                                </div>
                            </div>
                            <div class="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                                <div class="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">{worker[0].status}</div>
                                {/* <!-- <div class="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Bio</div> --> */}
                            </div>
                        </div>
                    }
                    <h1 className="font-bold">NEARBY DRIVER</h1>
                    {driver && (
                        <div>
                        <div class="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-2xl m-5">
                            <img class="max-h-20 w-full opacity-80 absolute z-0 top-0" src="https://unsplash.com/photos/iFPBRwZ4I-M/download?force=true&w=640" alt="" />
                            <div class="profile w-full flex z-10 m-3 ml-4 text-white">
                                <img class="w-28 h-28 p-1  bg-white rounded-full" src={driver[0].image} alt="" />
                                <div class="title mt-11 ml-3 font-bold flex flex-col">
                                    <div class="name break-words">{driver[0].name}</div>
                                    <div class="add font-semibold text-sm text-black italic dark">{driver[0].role}</div>
                                </div>
                            </div>
                            <div class="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                                <div class="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">{driver[0].status}</div>
                                {/* <!-- <div class="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Bio</div> --> */}
                            </div>
                        </div>
                    
                    <div className="text-center">
                <button onClick={()=>handleSubmit(driver[0]._id , worker[0]._id,booking._id)} className="text-center self-center btn-primary btn btn-sm">Assign</button>
                </div>
                </div>
                )}
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
            </>
            )
}


            export default AssignModal
import { useEffect, useState } from "react"
import { getTasks } from "../../../services/driverApi"
import { FaUserLarge } from "react-icons/fa6";
import { FcBusinessman, FcHome, FcPhoneAndroid, FcReadingEbook } from "react-icons/fc";

const Tasks = (props) => {

    const [task, setTask] = useState({})
    const TaskId = props.id
    const role = props.role
    useEffect(() => {
        try {
            (async function () {
                if (TaskId) {
                    const { data } = await getTasks(TaskId)
                    console.log(role)
                    if (data?.status) {
                        setTask(data.task)
                        console.log(task)
                    }
                }
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            {
                task.user && (
                    <div className="mt-12 ">
                        <div className="card w-auto h-auto lg:card-side mt-2 ml-4 bg-base-100 shadow-xl">
                            {/* <figure><img className="w-72 h-full" src="https://source.unsplash.com/rEn-AdBr3Ig" alt="Album" /></figure> */}
                            <div className="card-body  ">
                                <span className="antialiased tracking-wider text-xl font-bold">Task</span>
                                <div className="flex justify-evenly">
                                    <div className=" flex flex-col  border-t-4 border-green-400 card shadow-xl w-fit p-6">
                                        <h1 className="uppercase font-bold tracking-wider mb-2 text-center">Customer</h1>
                                        <span className="inline-flex mt-3"><FcBusinessman size={26} /><p className="uppercase font-medium   ml-8">{task.user.name}</p></span>
                                        <span className="inline-flex mt-3 "><FcHome size={26} /><p className="uppercase font-medium text ml-8">{task.user.address}</p></span>
                                        <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task.user.mobile}</p></span>
                                    </div>
                                    { (props.role == 'driver') ?
                                        <div className=" flex flex-col  border-t-4 border-green-400 card shadow-xl w-fit p-6">
                                            <h1 className="uppercase font-bold text-center tracking-wider mb-2 subpixel-antialiased">Worker</h1>
                                            <span className="inline-flex mt-3"><FcReadingEbook size={26} /><p className="uppercase font-medium   ml-8">{task.worker.name}</p></span>
                                            <span className="inline-flex mt-3  "><FcHome size={26} /><p className="uppercase  text-ellipsis overflow-hidden whitespace-nowrap w-28 hover:w-fit font-medium text ml-8">{task.worker.place}</p></span>
                                            <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task.worker.mobile}</p></span>
                                        </div>
                                        :
                                        <div className=" flex flex-col card shadow-xl w-fit p-6">
                                        <h1 className="uppercase font-bold tracking-wider mb-2 text-center">Driver</h1>
                                        <span className="inline-flex mt-3"><FcReadingEbook size={26} /><p className="uppercase font-medium   ml-8">{task.driver.name}</p></span>
                                        <span className="inline-flex mt-3 text-ellipsis overflow-hidden whitespace-nowrap w-20"><FcHome size={26} /><p className="uppercase font-medium text ml-8">{task.driver.place}</p></span>
                                        <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task.driver.mobile}</p></span>
                                    </div>
                                    }
                                </div>
                                <div className="card-actions justify-center mt-4 ">
                                    <button className="btn btn-sm btn-success bg-green-400  text-white shadow-lg">Start</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Tasks
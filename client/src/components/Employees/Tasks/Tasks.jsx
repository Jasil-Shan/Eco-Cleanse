import { useEffect, useState } from "react"
import { getTasks } from "../../../services/driverApi"
import { FaUserLarge } from "react-icons/fa6";
import { FcBusinessman, FcHome, FcPhoneAndroid, FcReadingEbook } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import TaskModal from "../../Worker/TaskModal/TaskModal";
import TaskAlert from "./TaskAlert/TaskAlert";
import { useSelector } from "react-redux";
import { createChat } from "../../../services/chatApi";

const Tasks = (props) => {

    const [task, setTask] = useState({})
    const TaskId = props.id
    const role = props?.role
    const navigate = useNavigate()
    const [refresh ,setRefresh] = useState(false)
    let profile
    if (role == 'worker') {
        profile = useSelector((state) => state.worker)
    } else {
        profile = useSelector((state) => state.driver)
    }
    const senderId = profile.id
    const receiverId = task?.user?._id

    useEffect(() => {
        try {
            (async function () {
                const { data } = await getTasks(TaskId, role)
                if (data.status) {
                    setTask(data.task)
                }
            })()
        } catch (error) {
            console.log(error);
        }
    }, [refresh])

    const handleChat = async()=>{
        try {
          const { data } = await createChat(
            senderId,receiverId
            )
          if (!data.err) {
            navigate('/chat', {state:{senderId,role}});
          } else {
            console.log(data.err);
          }
        } catch (error) {
          console.log(error);
        }
      }
    return (
        <>
            {profile.assigned ?
                <div className="mt-10 ">
                    <div className="card w-auto lg:card-side ml-4 bg-base-100 shadow-lg">
                        {/* <figure><img className="w-72 h-full" src="https://source.unsplash.com/rEn-AdBr3Ig" alt="Album" /></figure> */}
                            <span className="antialiased tracking-wide text-center m-4 font-semibold text-lg">Task</span>
                        <div className="card-body ">
                            <div className="flex justify-evenly">
                                <div className=" flex flex-col  border-t-4 mt-5 border-neutral card shadow-xl w-fit p-6">
                                    <h1 className="uppercase font-bold tracking-wider mb-2 text-center">Customer</h1>
                                    <span className="inline-flex mt-3"><FcBusinessman size={26} /><p className="uppercase font-medium   ml-8">{task?.user?.name}</p></span>
                                    <span className="inline-flex mt-3 "><FcHome size={26} /><p className="uppercase font-medium text ml-8">{task?.user?.address}</p></span>
                                    <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task?.user?.mobile}</p></span>
                                { props.role == 'worker' ? <div className="text-center"><button onClick={handleChat} className="btn btn-sm mt-4">Chat</button></div> : ""}
                                </div>
                                {(props.role == 'driver') ?
                                    <div className=" flex flex-col  border-t-4 mt-5 border-neutral card shadow-xl w-fit p-6">
                                        <h1 className="uppercase font-bold text-center tracking-wider mb-2 subpixel-antialiased">Worker</h1>
                                        <span className="inline-flex mt-3"><FcReadingEbook size={26} /><p className="uppercase font-medium   ml-8">{task?.worker?.name}</p></span>
                                        <span className="inline-flex mt-3  "><FcHome size={26} /><p className="uppercase  text-ellipsis overflow-hidden whitespace-nowrap w-28 hover:w-fit font-medium text ml-8">{task?.worker?.place}</p></span>
                                        <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task?.worker?.mobile}</p></span>
                                    </div>
                                    :
                                    <div className=" flex flex-col border-t-4 mt-5 border-neutral card shadow-xl w-fit p-6">
                                        <h1 className="uppercase font-bold tracking-wider mb-2 text-center">Driver</h1>
                                        <span className="inline-flex mt-3"><FcReadingEbook size={26} /><p className="uppercase font-medium   ml-8">{task?.driver?.name}</p></span>
                                        <span className="inline-flex mt-3  "><FcHome size={26} /><p className="uppercase  text-ellipsis overflow-hidden whitespace-nowrap w-28 hover:w-fit font-medium text ml-8">{task?.driver?.place}</p></span>
                                        <span className="inline-flex mt-3 "><FcPhoneAndroid size={26} /><p className="uppercase font-medium  ml-8">{task?.driver?.mobile}</p></span>
                                    </div>
                                }
                            </div>
                            <div className="card-actions justify-center mt-2 ">
                                {(props.role == 'driver') ?
                                 <Link to={'/driver/map'} state = {task}><button className="btn btn-neutral btn-sm text-white">Start </button></Link>   
                                    :
                                    <TaskModal />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
               role && <TaskAlert task={task} role={role} setRefresh ={setRefresh} refresh ={refresh}/>
            }
        </>
    )
}

export default Tasks
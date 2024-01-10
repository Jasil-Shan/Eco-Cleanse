import React, { useState } from 'react';
import { FcBusinessman, FcHome, FcPhoneAndroid } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { TaskAccept } from '../../../../services/driverApi';
import { useNavigate } from 'react-router-dom';

const TaskAlert = ({ task, role, setRefresh }) => {

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate()
  const taskId = task._id
  const toggleModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {


      const { data } = await TaskAccept(taskId, role)
      if (data.success) {
        setRefresh(false)
        toggleModal()
        toast.success(data.message, {
          position: "top-center"
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white text-center px-8 rounded-lg shadow-xl mx-auto max-w-md">
            <div className="card-body p-6">
              <span className="antialiased tracking-wider text-xl font-bold">Task</span>
              <div className="flex justify-evenly">
                <div className="flex flex-col border-t-4 border-green-400 card shadow-xl p-6">
                  <h1 className="uppercase font-bold tracking-wider mb-2 text-center">Customer</h1>
                  <span className="inline-flex mt-3">
                    <FcBusinessman size={26} />
                    <p className="uppercase font-medium ml-8">{task?.user?.name}</p>
                  </span>
                  <span className="inline-flex mt-3 ">
                    <FcHome size={26} />
                    <p className="uppercase font-medium text ml-8">{task?.user?.address}</p>
                  </span>
                  <span className="inline-flex mt-3 ">
                    <FcPhoneAndroid size={26} />
                    <p className="uppercase font-medium ml-8">{task?.user?.mobile}</p>
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                {/* <button className="btn btn-sm bg-red-500 text-white" onClick={toggleModal}>
                  Deny
                </button> */}
                <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskAlert;

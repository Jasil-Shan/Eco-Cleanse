import React, { useEffect, useState } from "react";
import { authWorker } from "../../services/workerApi";
import Dashboard from "../Employees/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { setWorkerDetails } from "../../redux/features/workerSlice";

const WorkerDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState()
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setShowModal(true);
    try {
      (
        async function () {
          const { data } = await authWorker()
          if (data.status) {
            dispatch(
              setWorkerDetails({
                id: data.worker._id,
                name: data.worker.name,
                email: data.worker.email,
                mobile: data.worker.mobile,
                place: data.worker.place,
                image: data.worker.image,
                role: data.worker.role,
                location: data.worker.location,
                status: data.worker.status,
                task: data.worker.task,
                assigned: data?.worker?.assigned,
                dob: data?.worker?.dob,
              })
            );
            setRole(data.worker.role)
          }
        })()
    } catch (error) {
      console.log(error);
    }
  }, [refresh])


  return (
    <>
      <Dashboard role={role} setRefresh={setRefresh} refresh={refresh} />

    </>
  );
};


export default WorkerDash

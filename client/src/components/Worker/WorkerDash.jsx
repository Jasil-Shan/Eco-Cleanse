import React, { useEffect, useState } from "react";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
import ModalEmp from "../ModalEmployee/ModalEmp";
import ProfileCard from "../Employees/ProfileCard/ProfileCard";
import { authWorker } from "../../services/workerApi";
import Status from "../Employees/Status/Status";
import Dashboard from "../Employees/Dashboard/Dashboard";

const WorkerDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [worker, setWorker] = useState()

  useEffect(() => {
    setShowModal(true);
    try {
      (
        async function () {
          const { data } = await authWorker()
          if (data.status) {
            setWorker(data.worker)
            console.log(worker);
          }
        })()
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <>
      <SidebarEmp />
      {/* {

      worker && worker.location ?
        <div className="h-screen w-screen flex justify-evenly space-x-12 align-middle items-center mt-0">
          <Status status = {worker.status} role = {worker.role}/>
          <ProfileCard profile ={worker} />
        </div>
        :
        <ModalEmp role = {'worker'}/>
      } */}

{
        worker &&
      <Dashboard profile = {worker}/>
}
    </>
  );
};


export default WorkerDash

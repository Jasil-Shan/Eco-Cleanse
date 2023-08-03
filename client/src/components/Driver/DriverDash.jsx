import React, { useEffect, useState } from "react";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
import ModalEmp from "../ModalEmployee/ModalEmp";
import { authDriver } from "../../services/driverApi";
import ProfileCard from "../Employees/ProfileCard/ProfileCard";
import Status from "../Employees/Status/Status";
import Dashboard from "../Employees/Dashboard/Dashboard";

const DriverDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [driver ,setDriver] = useState()
  useEffect(() => {
    try {
      ( 
        async function () {
          const { data } = await authDriver()
          if (data.status) {
            setDriver(data.driver)
          }
        })()
    } catch (error) {
      console.log(error);
    }
    setShowModal(true);
  }, []);

  return (
    <>
      <SidebarEmp />
      {/* {
        driver && driver.location ?
          <div className="h-screen w-screen flex justify-evenly space-x-12 align-middle items-center mt-0">
          <Status status = {driver.status} role = {driver.role}/>
            <ProfileCard profile={driver} />
          </div>
          :
          <ModalEmp role={'driver'} />

      } */}
      {
        driver &&
      <Dashboard profile = {driver}/>
}
    </>
  );
};


export default DriverDash;


    



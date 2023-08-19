import React, { useEffect, useState } from "react";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
import ModalEmp from "../ModalEmployee/ModalEmp";
import { authDriver } from "../../services/driverApi";
import ProfileCard from "../Employees/ProfileCard/ProfileCard";
import Status from "../Employees/Status/Status";
import Dashboard from "../Employees/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { setDriverDetails } from "../../redux/features/driverSlice";
import Navbar from "../User/Navbar/Navbar";
import EmployeeNavbar from "../Employees/EmployeeNavbar/EmployeeNavbar";

const DriverDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState()
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      (
        async function () {
          const { data } = await authDriver()
          if (data.status) {
            dispatch(
              setDriverDetails({
                id: data.driver._id,
                name: data.driver.name,
                email: data.driver.email,
                mobile: data.driver.mobile,
                place: data.driver.place,
                image: data.driver.image,
                role: data.driver.role,
                location: data.driver.location,
                status: data.driver.status,
                task: data.driver.task,
                assigned: data?.driver?.assigned,
              })
            );
            setRole(data.driver.role)
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


export default DriverDash;






import React, { useEffect, useState } from "react";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
import ModalEmp from "../ModalEmployee/ModalEmp";
  
const DriverDash = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
        <SidebarEmp />
        <ModalEmp />
    
    </>

  );
}; 


export default DriverDash;

import React, { useEffect, useState } from "react";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
import ModalEmp from "../ModalEmployee/ModalEmp";
  
const DriverWelcome = () => {
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


export default DriverWelcome

import React, { useEffect, useState } from "react";
import ModalEmp from "../../ModalEmployee/ModalEmp";
import SidebarEmp from "../SidebarEmployee/SidebarEmp";
  
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

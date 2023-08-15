import { Navigate, useNavigate } from "react-router-dom";



const Header = () => {

  return (

    <header className=" shadow-md z-10 text-gray-600 body-font">
      <div className="container z-10  flex flex-wrap py-8 flex-col md:flex-row justify-center items-center">
       
        {/* <div className="flex">
            <button>Logout</button>
        </div> */}
        
      </div>
    </header>
  );
};

export default Header;
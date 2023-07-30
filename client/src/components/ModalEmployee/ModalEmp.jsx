import React, { useState, useEffect } from "react";
import welcome from '../Driver/assets/arrived.png'
import { driverLocation } from "../../services/driverApi";

const ModalEmp = () => {
const [clicked , setClicked] = useState(true)
    const handleClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    // Do something with the latitude and longitude values
                    let locations = { latitude, longitude }
                    const {data}= await driverLocation(locations)
                    setClicked(false)

                },
                (error) => {
                    console.log('Error:', error);
                    // Handle any errors that occur while getting the location
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            // Handle the case where geolocation is not supported
        }
    };
    return (
        clicked && (
        <div className=" flex justify-center items-center h-screen">
            <div className="card w-7/12 h-3/4 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={welcome} alt="Shoes" className="rounded-xl w-72" />
                </figure>
                <div className="card-body items-center text-center">
                    <h1 className="card-title text-3xl ">Welcome Aboard..</h1 >
                    <p>Update Your Location and move forward</p>
                    <button className='bg-[#002D74] rounded-xl w-full py-2 mt-2 text-white hover:scale-105 duration-300' onClick={handleClick} type="button" >Share my location</button>
                </div>
            </div>
        </div>
        )
        
    );
};

export default ModalEmp;

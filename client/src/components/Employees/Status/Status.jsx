import { useState } from 'react';
import { getLocation, updateStatus } from '../../../services/driverApi';
import waste from '../assets/rubbish.png'

const Status = (props) => {
    const [refresh, setRefresh] = useState(false);

    const role = props.role
    const status = props.status
    const handleSubmit = () => {
        try {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(

                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        // Do something with the latitude and longitude values
                        let locations = { latitude, longitude }
                        let {data} = await updateStatus(locations,role,status)
                        console.log(data);
                        if (data.success){
                            setRefresh(!refresh)
                        }
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

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <section className="shadow-2xl">
            <div className =  "card w-96 h-80 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={waste} alt="Shoes" className="rounded-md w-28" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className={status == 'Offline' ? "card-title font-bold uppercase text-2xl text-red-700" : "card-title font-bold uppercase text-2xl text-green-800"}>{status}</h2>
                    <div className="card-actions">
                        <button className='btn glass btn-primary btn-sm mt-6' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </section >
        
    )
}

export default Status
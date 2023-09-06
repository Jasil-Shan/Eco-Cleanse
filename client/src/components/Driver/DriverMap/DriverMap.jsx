import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EmployeeNavbar from '../../Employees/EmployeeNavbar/EmployeeNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { taskComplete } from '../../../services/driverApi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getCurrentLocation } from '../../../helpers/currentLocation';

const DriverMap = () => {
    const location = useLocation();
    const [instructions, setInstructions] = useState()
    const [distance, setDistance] = useState()
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const task = location?.state;
    const mapContainerRef = useRef(null);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw';
    const start = task?.driver?.location;
    const user = task?.user?.location;
    const worker = task?.worker?.location;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [...start],
            zoom: 10
        });

        (async function () {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${worker[0]},${worker[1]};${user[0]},${user[1]}?geometries=geojson&steps=true&banner_instructions=true&access_token=${mapboxgl.accessToken}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const routeCoordinates = data.routes[0].geometry.coordinates;
                const routeInstructions = data.routes[0].legs[0].steps;
                setDistance(Math.floor(data.routes[0].distance / 1000))
                const duration = Math.floor(data.routes[0].duration / 60)

                setInstructions(routeInstructions);

                map.on('load', () => {
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: routeCoordinates
                                }
                            }
                        },
                        paint: {
                            'line-width': 5,
                            'line-color': '#0074D9'
                        }
                    });

                    // Add circle markers at the start, worker, and end points
                    new mapboxgl.Marker({ color: '#00FF00' })
                        .setLngLat(start)
                        .addTo(map);

                    new mapboxgl.Marker({ color: '#FFA500' })
                        .setLngLat(worker)
                        .addTo(map);

                    new mapboxgl.Marker({ color: '#FF0000' })
                        .setLngLat(user)
                        .addTo(map);
                });
            }
        })();
    }, [refresh]);

    const handleSubmit = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You reached user location!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7e3af2',
                cancelButtonColor: '##a8a8a8',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const locations = await getCurrentLocation()
                    const { data } = await taskComplete(locations)
                    if(data.success){
                    Swal.fire(
                          'Success!',
                        'Task completed Successfully',
                          'success'
                        )
                    navigate('/driver/dashboard')   
                    setRefresh(!refresh)
                    }else{
                        Swal.fire(
                            'Failed!',
                          'Try Again',
                            'error'
                          )    
                      setRefresh(!refresh)
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <EmployeeNavbar />
            <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} >
                <div className="flex absolute flex-col z-50">
                    <details className="dropdown cursor-pointer ml-6  mb-32">
                        <summary className="m-1 mt-8 ml-6 font-bold">Directions</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <h1 className='font-bold mb-3 mt-3  '>Distance : {distance} km</h1>
                            {instructions?.map((item, index) => {
                                return (
                                    <h1 className='font-bold mb-2 '>{index + 1}. {item.maneuver.instruction}</h1>
                                )
                            })
                            }
                            <button className='btn btn-sm btn-neutral' onClick={handleSubmit}>Reached</button>
                        </ul>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default DriverMap;

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EmployeeNavbar from '../../Employees/EmployeeNavbar/EmployeeNavbar';
import { useLocation } from 'react-router-dom';

const DriverMap = () => {
    const location = useLocation();
    const task = location?.state;
    const mapContainerRef = useRef(null);
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhanBhcmFkaXNlLTEyMyIsImEiOiJjbGt3djVieXExYWRyM3BwcDB1eTQ5NjF2In0.qO4fld59j3Og7WhdT6gzHw';
    const start = task.driver.location;
    const user = task.user.location;
    const worker = task.worker.location;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [...start], // Set the initial center coordinates
            zoom: 15 // Adjust the initial zoom level
        });

        (async function () {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${worker[0]},${worker[1]};${user[0]},${user[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const routeCoordinates = data.routes[0].geometry.coordinates;

                // Add the route to the map as a line layer
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
    }, []);

    return (
        <div>
            <EmployeeNavbar />
            <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
        </div>
    );
};

export default DriverMap;

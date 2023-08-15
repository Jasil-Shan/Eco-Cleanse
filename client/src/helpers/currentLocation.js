import { getLocation, updateStatus } from "../services/driverApi";

export const getCurrentLocation = async (role,status) => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    let locations = [longitude, latitude]
                    console.log(locations);
                    try {
                        const { data } = await updateStatus(locations, role,status);
                        resolve(data);
                    } catch (error) {
                        reject(error);
                    }
                },
                (error) => {
                    console.log('Error:', error);
                    reject(error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            reject(new Error('Geolocation not supported'));
        }
    });
}


export const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    let locations = [longitude, latitude]
                    console.log(locations);
                    try {
                        resolve(locations);
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

import { updateStatus } from "../../../services/driverApi";



const Dashboard = (props) => {

    const profile = props.profile
    const status = profile.status
    const role = profile.role
    console.log(profile);

    const handleSubmit = () => {
        try {
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(

                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        let locations = { latitude, longitude }
                        let { data } = await updateStatus(locations, role, status)
                        console.log(data);
                        if (data.success) {
                            setRefresh(!refresh)
                        }
                    },
                    (error) => {

                        console.log('Error:', error);
                    }
                );
            } else {
                console.log('Geolocation is not supported by this browser.');
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="container mx-auto mt-16 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                {/* Left Side */}
                <div className="w-full md:w-3/12 md:mx-2">
                    {/* Profile Card */}
                    <div className="bg-base-100 shadow-md card p-3 border-t-4 border-green-400">
                        <div className="image overflow-hidden">
                            <img
                                className="h-auto w-full mx-auto"
                                src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <img className="self-center rounded-3xl  w-fit " src={profile.image} alt="dndjsh" />

                            <span className="text-gray-900 w-fit font-bold text-xl leading-8 my-1">{profile.name}</span>
                            <p className="text-gray-600 font-lg w-fit text-semibold leading-6 uppercase">{profile.role}</p>

                        </div>
                        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto">
                                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm uppercase">{profile.status}</span>
                                </span>
                            </li>
                            <li className="flex items-center justify-center mt-2">
                                {/* <button className='btn btn-success text-base-100 btn-sm' onClick={handleSubmit}>Update Current Location</button> */}
                            </li>
                        </ul>
                    </div>
                    {/* End of profile card */}

                    {/* Friends card */}
                    <div className="bg-white card mt-8 shadow-lg p-3 hover:shadow">
                        <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-green-500">
                                <svg
                                    className="h-5 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </span>
                            <span>Location Info</span>
                        </div>
                        <div className="grid grid-cols-3">
                            <div className="text-center my-2">
                                <img
                                    className="h-16 w-16 rounded-full mx-auto"
                                    src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                    alt=""
                                />
                                <a href="#" className="text-main-color">
                                    Kojstantin
                                </a>
                            </div>
                            <div className="text-center my-2">
                                <img
                                    className="h-16 w-16 rounded-full mx-auto"
                                    src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                    alt=""
                                />
                                <a href="#" className="text-main-color">
                                    James
                                </a>
                            </div>
                            <div className="text-center my-2">
                                <img
                                    className="h-16 w-16 rounded-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt=""
                                />
                                <a href="#" className="text-main-color">
                                    Natie
                                </a>
                            </div>
                            <div className="text-center my-2">
                                <img
                                    className="h-16 w-16 rounded-full mx-auto"
                                    src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                    alt=""
                                />
                                <a href="#" className="text-main-color">
                                    Casey
                                </a>
                            </div>
                        </div>
                        <button className='btn bg-green-500 btn-sm text-white mt-6' onClick={handleSubmit}>Update</button>

                    </div>
                    {/* End of friends card */}
                </div>
                {/* End of Left Side */}

                {/* Right Side */}
                <div className="w-full md:w-9/12 mx-2 h-64 shadow-xl card  my-5  ">
                    <div className="bg-white p-3 rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span className="text-green-500">
                                <svg
                                    className="h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">{profile.name}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">Doe</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Gender</div>
                                    <div className="px-4 py-2">Female</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">+11 998001001</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Current Address</div>
                                    <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Permanent Address</div>
                                    <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">
                                            {profile.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Birthday</div>
                                    <div className="px-4 py-2">Feb 06, 1998</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of about section */}

                    <div className="my-4"></div>

                    {/* Experience and education */}

                    {/* End of experience and education */}
                </div>

                {/* End of right side */}
            </div>
        </div>
    )
}



export default Dashboard
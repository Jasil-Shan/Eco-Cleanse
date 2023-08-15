import '@fortawesome/fontawesome-free/css/all.min.css'; // Import the Font Awesome CSS



const ProfileCard = (props) => {
const profile = props.profile
    return (
                <div className="w-full bworder-s-fuchsia-800  lg:w-4/12 ">
                    <div className=" card break-words bg-white mb-6 shadow-2xl rounded-lg">
                        <div className="">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full flex justify-center">
                                    <div className="relative">
                                        <img alt="..." src="https://source.unsplash.com/100x100/?portrait" className="shadow-xl rounded-full h-auto align-middle border-none mt-6" />
                                    </div>
                                </div>
                                {/* <div className="w-full px-4 text-center mt-20">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            22
                                        </span>
                                        <span className="text-sm text-blueGray-400">Friends</span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            10
                                        </span>
                                        <span className="text-sm text-blueGray-400">Photos</span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                            89
                                        </span>
                                        <span className="text-sm text-blueGray-400">Comments</span>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                            <div className="text-center mt-10">
                                <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                                   {profile.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {profile.mobile}
                                </div>
                                <div className="mb-2 pb-6 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    Designation - <span className='uppercase font-mono'>{profile.role}</span> 
                                </div>
                                {/* <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                University of Computer Science
                            </div> */}
                            </div>
                            {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                        An artist of considerable range, Jenna the name taken
                                        by Melbourne-raised, Brooklyn-based Nick Murphy
                                        writes, performs and records all of his own music,
                                        giving it a warm, intimate feel with a solid groove
                                        structure. An artist of considerable range.
                                    </p>
                                    <a href="javascript:void(0);" className="font-normal text-pink-500">
                                        Show more
                                    </a>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>


            )
}


            export default ProfileCard




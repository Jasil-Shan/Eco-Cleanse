import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { BsPhoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import { UserProfileUpdate } from "../../../services/userApi";


const UserProfile = () => {
  const [refresh, setRefresh] = useState()
  const [editMode, setEditMode] = useState(false)
  const user = useSelector((state) => state.user)

  const formik = useFormik({
    initialValues: {
      name: user.name,
      mobile: user.mobile 
       },
    onSubmit: async (values) => {
      try {
        const { data } = await UserProfileUpdate(values)
        if (data.success) {
          setRefresh(!refresh)
          setEditMode(false)
          toast.success(data.message, {
            position: "top-center",

          })
        }
      } catch (error) {
        console.log(error);
      }

    },
  });
  return (
    <>
      <Navbar ProfileRefresh={refresh} />
      {!editMode ?
          <main className="profile-page h-screen flex overflow-hidden justify-center  items-center mt-8">
            <section className="relative bg-blueGray-200">
              <div className="container">
                <div className="relative card px-8 py-8 md:px-16 md:py-8 overflow-hidden  flex flex-col min-w-0 break-words bg-base-100 w-full shadow-2xl rounded-xl ">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-end gap-8">
                      <div className="w-full lg:w-4/12  px-4 lg:order-3 lg:text-end justify-end ">
                        <div className="sm:mt-0">
                          <button onClick={() => setEditMode(true)} className="btn btn-neutral btn-sm drop-shadow-xl self-end" type="button">
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        {/* <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                          <span className="text-sm text-blueGray-400">Friends</span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                          <span className="text-sm text-blueGray-400">Photos</span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                          <span className="text-sm text-blueGray-400">Comments</span>
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div className=" flex justify-center items-center align-middle">
                      <img
                        alt="..."
                        src="https://source.unsplash.com/100x100/?portrait"
                        className="shadow-xl rounded-full   border-none mr-16  ml-20 lg:ml-16 max-w-150-px"
                      />
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">{user.name}</h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        {user.address}
                      </div>
                      <div className="flex items-center justify-center mb-4 mt-5">
                        <BsPhoneFill />
                        <h3 className="ml-2">{user.mobile}</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <MdEmail />
                        <h3 className="ml-2">{user.email}</h3>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </main>
          :
            formik.values && (
              <div className="flex items-center h-screen w-full py-11 justify-center">
                
                <div className="max-w-xs">
                  <div className="bg-white card shadow-xl rounded-lg w-fit p-20 ">
                  <span onClick={() => setEditMode(false)} className="text-sm text-start font-bold block underline cursor-pointer tracking-wide text-blueGray-600">Back</span>

                    <div className="photo-wrapper p-2">
                      <img
                        className="w-32 h-32 rounded-full mx-auto"
                        src="https://source.unsplash.com/100x100/?portrait"
                        alt="John Doe"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                        {user.name}
                      </h3>
                      {/* <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>Web Developer</p>
                            </div> */}
                      <form onSubmit={formik.handleSubmit}>
                        <table className="text-xs my-3">
                          <tbody>
                            {/* <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                        <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                    </tr> */}
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Name
                              </td>
                              <td className="px-2 py-2">
                                <input
                                  className="input-xs"
                                  onChange={formik.handleChange}
                                  type="text"
                                  name="name"
                                  value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                  <div className="text-red-500">
                                    {" "}
                                    {formik.errors.name}{" "}
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Mobile
                              </td>
                              <td className="px-2 py-2">
                                <input
                                  className="input-xs"
                                  onChange={formik.handleChange}
                                  type="number"
                                  name="mobile"
                                  value={formik.values.mobile}
                                />
                                {formik.touched.mobile && formik.errors.mobile ? (
                                  <div className="text-red-500">
                                    {" "}
                                    {formik.errors.mobile}{" "}
                                  </div>
                                ) : null}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center my-3">
                          <button
                            className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                            type="submit"
                          >
                            Save Profile
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )
    
      }
    </>
  );
};

export default UserProfile;

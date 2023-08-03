import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

const FormModal = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [image, setSelectedImages] = useState([]);

    const navigate = useNavigate()

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

  
    const isValidFileUploaded = (file) => {
      const validExtensions = ['jpg', 'png', 'jpeg', 'gif','webp'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return validExtensions.includes(fileExtension);
    };
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const handleFileChange = (e) => {

        const files = e.target.files;
        const imageList = Array.from(files);
        const isValidImages = imageList.every((file) => isValidFileUploaded(file));
    
        if (isValidImages) {
          Promise.all(imageList.map(convertToBase64))
            .then((base64Images) => setSelectedImages(base64Images))
            .catch((error) => console.log('Error converting images to base64:', error));
        } else {
          console.log('Invalid File type');
        }
      };
      

    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('First Name Required'),
        email: Yup.string()
            .email('invalid email address')
            .required('Email is required'),
        mobile: Yup.string()
            .max(10, 'Mobile number not valid')
            .min(10, 'Mobile number not valid')
            .required("Mobile is required"),
        password: Yup.string()
            .min(8, 'password must be at least 8 charecters')
            .required("Password is required"),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is Required')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            dob: '',
            password: '',
            confirmpassword: ''
        },

        validationSchema: validate,

        onSubmit: async (values) => {
            try {
                let data;
                if (props.role === 'worker') {
                    const response = await axios.post('/admin/workers/add', { ...values , image });
                    data = response.data;
                } else {
                    const response = await axios.post('/admin/drivers/add', { ...values, image });
                    data = response.data;
                }
                if (data.status && props.role == 'worker') {
                    toast.success(data.message, {
                        position: "top-center"
                    })
                    axios.post('/admin/sendMail',{...values})
                    navigate("/admin/drivers")
                } else if (data.status && props.role == 'driver') {
                    toast.success(data.message, {
                        position: "top-center"
                    })
                    axios.post('/admin/sendMail',{...values})
                    toggleModal()
                    navigate("/admin/drivers")
                } else {
                    toast.error(data.message, {
                        position: "top-center"
                    })
                }

            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",

                })
                console.log(error);
            }
        }
    })

    return (
        <>
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-12 mb-8 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={toggleModal}
            >
                Add New
            </button>

            {isOpen && (
                <div
                    id="authentication-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full"
                >
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                            onClick={toggleModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-8 py-6 text-center lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">
                                New Worker
                            </h3>
                            <form onSubmit={formik.handleSubmit} className="px-8 space-y-6" >
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className=" border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        placeholder="Full Name"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {
                                        formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-500"> {formik.errors.name} </div>
                                        ) : null}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        placeholder="name@example.com"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='text-red-500' >{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        placeholder="Mobile Number"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div className="text-red-500"> {formik.errors.mobile} </div>
                                    ) : null}
                                </div>
                                <div>
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        placeholder="Mobile Number"
                                        onChange={formik.handleChange}
                                        required
                                    />
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div className="text-red-500"> {formik.errors.mobile} </div>
                                    ) : null}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        onChange={formik.handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        required
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='text-red-500'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        placeholder="Confirm Password"
                                        onChange={formik.handleChange}
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                    />
                                    {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                        <div className='text-red-500'>{formik.errors.confirmpassword}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 "
                                        placeholder="Mobile Number"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    {formik.touched.mobile && formik.errors.mobile ? (
                                        <div className="text-red-500"> {formik.errors.mobile} </div>
                                    ) : null}
                                </div>

                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                        Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormModal;

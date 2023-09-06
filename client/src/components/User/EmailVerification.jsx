import { Formik, useFormik } from "formik";
import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";





const EmailVerification = () => {

  const location = useLocation()
  const { email } = location?.state
  const [btnDisabled, setBtnDisabled] = useState(true)
  const navigate = useNavigate()

  //   function OTPInput() {
  //     const inputs = document.querySelectorAll('#otp > *[id]');
  //     for (let i = 0; i < inputs.length; i++) {
  //       inputs[i].addEventListener('keydown', function (event) {
  //         if (event.key === 'Backspace') {
  //           inputs[i].value = '';
  //           if (i !== 0) inputs[i - 1].focus();
  //         } else {
  //           if (i === inputs.length - 1 && inputs[i].value !== '') {
  //             return true;
  //           } else if (event.keyCode > 47 && event.keyCode < 58) {
  //             inputs[i].value = event.key;
  //             if (i !== inputs.length - 1) inputs[i + 1].focus();
  //             event.preventDefault();
  //           } else if (event.keyCode > 64 && event.keyCode < 91) {
  //             inputs[i].value = String.fromCharCode(event.keyCode);
  //             if (i !== inputs.length - 1) inputs[i + 1].focus();
  //             event.preventDefault();
  //           }
  //         }
  //       });
  //     }
  //   }

  //   OTPInput();
  // }, []);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setBtnDisabled(false)
    }
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },

    // validationSchema:validate,

    onSubmit: async (values) => {
      console.log("onsubmit");
      try {
        const { data } = await axios.post('/user/signup', { ...values })
        if (data.status) {
          navigate("/login")
          toast.success(data.message, {
            position: "top-center",

          })
        } else {
          toast.error(data.message, {
            position: "top-center",

          })
        }

      } catch (error) {

        console.log(error);
      }
    }
  })

  const handleResend = async () => {

    const { data } = await axios.post('/user/verify', { email })
    if (data.status) {
      toast.success(data.message, {
        position: "top-center",
      });
    } else {
      toast.error(data.message, {
        position: "top-center",
      });
    }
  }

  return (
    <div className="h-screen mt-8 bg-base-100 py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 card  drop-shadow-xl py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received</span>
                <span className="font-light">Otp has been sent to : {email}</span>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                  <input className="m-2 border text-center form-control " type="text" name="otp" id="first" onChange={formik.handleChange} />
                  {/* <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="second" maxLength="1" onChange={handleChange} />
                  <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="third" maxLength="1" onChange={handleChange} />
                  <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" name="otp" id="fourth" maxLength="1" onChange={handleChange} /> */}

                </div>

                <div className="flex justify-center text-center mt-5">
                  <a className="flex flex-col w-full hover:text-blue-900 cursor-pointer">
                    <div className=" flex w-full justify-around">
                      <span className="countdown">
                        Time Remaining: <span style={{ "--value": timer }}></span>
                      </span>
                      <button type="button" onClick={handleResend} className={btnDisabled ? "mr-3 mb-3 text-gray-300 underline" : "mr-3 mb-3 underline"} disabled={btnDisabled}>Resend OTP</button>
                    </div>

                    <button type="submit" className="font-bold btn btn-neutral py-4">Submit OTP</button>  
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;

import cans from "../assets/garbageCan.jpg"
import { userBooking, userOnlinePay, verifyPayment } from "../../../services/userApi";
import { useState } from "react";
import { toast } from 'react-toastify';
import Success from "../Success Card/Success";
import { Navigate } from "react-router-dom";


const Card = (props) => {

  const [paymentMethod, setPaymentMethod] = useState("");
  const [succesful, setSuccess] = useState(false)

  const garbage = props.formValues
  const [orderId, setOrder] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (paymentMethod == 'Online') {

        const { data: { order } } = await userOnlinePay()
        var options = {
          key: "rzp_test_X2EWEu9JQG1E2R",
          amount: "250000",
          currency: "INR",
          name: "Eco Cleanse",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.id,
          handler: async (response) => {
            try {
              await payment(response)
              console.log(response);
            } catch (error) {
              console.error(error);
            }
          },
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
          },
          notes: {
            address: "Razorpay Corporate Office"
          },
          theme: {
            color: "#3399cc"
          }
        };
        const razor = new window.Razorpay(options)
        razor.open();
      } else {

        const { data } = await userBooking({ payment: paymentMethod }, garbage);

        if (data.success) {
          setOrder(data.order_id)
          setSuccess(true)
          toast.success(data.message, {
            position: "top-center",
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      }

      const payment = async (response) => {
        try {
          const { data } = await verifyPayment(response)
          if (data.success) {
            const { data } = await userBooking({ payment: paymentMethod }, garbage);
            setSuccess(true)
            toast.success(data.message, {
              position: "top-center",
            });
          } else {
            toast.error(data.message, {
              position: "top-center",
            });
          }

        } catch (error) {
          console.error(error);
        }
      };



    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        succesful ? <Success orderId={orderId} />
          : (
            <div className="min-h- py-6 flex flex-col justify-center sm:py-12 bg-cover">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20  bg-contain">
                  {/* style={{ backgroundImage: `url(${cans})` }} */}
                  <div className="max-w-md mx-auto">
                    <div>
                      <h1 className="text-2xl font-semibold">Garbage Details</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <h1>
                          E waste : <span>{garbage.eWaste}</span>
                        </h1>
                        <h1>
                          Plastic waste : <span>{garbage.plasticWaste}</span>
                        </h1>
                        <h1>
                          Food waste : <span>{garbage.foodWaste}</span>
                        </h1>
                        <h1>
                          other waste : <span>{garbage.others}</span>
                        </h1>
                        <div className="join mt-8">
                          <label>
                            <input
                              type="radio"
                              value="Cash"
                              checked={paymentMethod === "Cash"}
                              onChange={() => setPaymentMethod("Cash")}
                              aria-label="CASH"
                            />
                            cod
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="Online"
                              checked={paymentMethod === "Online"}
                              onChange={() => setPaymentMethod("Online")}
                              aria-label="Online Pay"
                            />
                            online
                          </label>
                        </div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white rounded-md px-2 py-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // <div class="container items-center px-4 py-8 m-auto mt-5">
            //   <div class="flex flex-wrap pb-3 mx-4 md:mx-24 lg:mx-0">
            //     {
            //       Object.entries(garbage).map(([key, value]) => (
            //         <div class="w-full p-2 lg:w-1/4 md:w-1/2" key={key}>
            //           <div
            //             class="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-purple-400 hover:via-blue-400 hover:to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
            //             <div class="flex flex-row justify-between items-center">
            //               <div class="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
            //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-gray-50" viewBox="0 0 20 20"
            //                   fill="currentColor">
            //                   <path fill-rule="evenodd"
            //                     d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            //                     clip-rule="evenodd" />
            //                   <path fill-rule="evenodd"
            //                     d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            //                     clip-rule="evenodd" />
            //                 </svg>
            //               </div>
            //               <div class="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
            //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-500 group-hover:text-gray-200"
            //                   fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            //                   <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            //                 </svg>
            //                 {value}
            //               </div>
            //             </div>
            //             <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">42.34%</h1>
            //             <div class="flex flex-row justify-between group-hover:text-gray-200">
            //               <p>Bounce Rate</p>
            //               <span>
            //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
            //                   viewBox="0 0 20 20" fill="currentColor">
            //                   <path fill-rule="evenodd"
            //                     d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            //                     clip-rule="evenodd" />
            //                 </svg>
            //               </span>
            //             </div>
            //           </div>
            //         </div>
            //       ))}
            //   </div>
            // </div>


          )}
    </>
  );
};

export default Card;


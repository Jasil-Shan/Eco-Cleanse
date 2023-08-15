import cans from "../assets/garbageCan.jpg"
import { userBooking, userOnlinePay, verifyPayment } from "../../../services/userApi";
import { useState } from "react";
import { toast } from 'react-toastify';
import Success from "../Success Card/Success";
import { Navigate } from "react-router-dom";


const Card = (props) => {

  const [paymentMethod, setPaymentMethod] = useState("");
  const [succesful , setSuccess] = useState(false)

  const garbage = props.formValues

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if(paymentMethod == 'Online'){

        const {data:{order}} = await userOnlinePay()
        var options = {
          key: "rzp_test_X2EWEu9JQG1E2R", 
          amount: "250000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Eco Cleanse",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order.id , //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
      }else {

      const { data } = await userBooking({ payment: paymentMethod }, garbage);

      if (data.success) {
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
        const {data} = await verifyPayment(response,garbage,paymentMethod)
        if (data.success) {
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
    succesful ? <Success /> 
    :
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
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      aria-label="COD"
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
}
    </>
  );
};

export default Card;


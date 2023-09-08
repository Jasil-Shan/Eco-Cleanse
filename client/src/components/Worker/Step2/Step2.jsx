import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Step2 = ({ onNextStep, onPreviousStep, booking , setTotalAmount}) => {

    const [payment, setPayment] = useState()

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setTotalAmount(newValue)
    };

    console.log(booking, 'hjhj');
    return (
        <div>
            <form action="">
                <div className='flex flex-col justify-center items-center'>
                    {
                        booking?.paymentMethod == 'Cash' ?
                        <>
                        <h1 className='font-bold text-2xl mb-5'>Cash Payment</h1>
                        <div className="form-control my-6">
                        <h1 className='font-bold text-xl text-center mb-5'>Collect amount : {booking?.totalAmount} Rs</h1>
                        {!payment &&  <input type="number" onChange={handleInputChange} className='input input-bordered mb-4' placeholder="Total with extra charges" />}
                            <label className="label cursor-pointer">
                                <span className="label-text mr-5">No extra amount collected</span>
                                <input type="checkbox" value="Success"
                                    checked={payment === "Success"}
                                    onChange={() => setPayment("Success")} className="checkbox" required />
                            </label>
                        </div>
                    </>
                            :
                            <>
                                <h1 className='font-bold text-2xl mb-5'>Online Payment</h1>
                                <div className="form-control my-6">
                                <h1 className='font-bold text-xl text-center mb-5'>Paid amount : {booking?.totalAmount} Rs</h1>
                                {!payment &&  <input type="number" onChange={handleInputChange} className='input input-bordered mb-4' placeholder="Total with extra charges" />}
                                    <label className="label cursor-pointer">
                                        <span className="label-text mr-5">No extra amount collected</span>
                                        <input type="checkbox" value="Success"
                                            checked={payment === "Success"}
                                            onChange={() => setPayment("Success")} className="checkbox" required />
                                    </label>
                                </div>
                            </>
                    }

                    <div>
                        <button className='btn bg-green-600 text-white btn-sm mr-4' onClick={onPreviousStep}>Previous</button>
                        <button className='btn bg-green-600 text-white btn-sm' onClick={onNextStep}>Next</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Step2;

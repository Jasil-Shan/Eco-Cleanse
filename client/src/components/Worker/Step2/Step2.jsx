import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Step2 = ({ onNextStep, onPreviousStep }) => {

    const [payment , setPayment] = useState()

    return (
        <div>
            <form action="">
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-2xl mb-5'>Payment Info</h1>
                <div className="form-control my-6">
                    <label className="label cursor-pointer">
                        <span className="label-text mr-5">Amount Collected</span>
                        {!payment &&<label className="tooltip tooltip-open mb-9  tooltip-error" data-tip="Tick here if Payment Collected" />}
                        <input type="checkbox" value="Success"
                            checked={payment === "Success"}
                            onChange={() => setPayment("Success")} className="checkbox" required />
                    </label>
                </div>
                <div>
                    <button className='btn bg-green-600 text-white btn-sm mr-4' onClick={onPreviousStep}>Previous</button>
                  {payment &&  <button className='btn bg-green-600 text-white btn-sm' onClick={onNextStep}>Next</button> }
                </div>
            </div>
            </form>
        </div>
    );
};

export default Step2;

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setGarbageDetails } from '../../../../redux/features/workerSlice';
import { useFormik } from 'formik';

const Step1 = ({ onNextStep }) => {
    
    const dispatch = useDispatch()

    const formik = useFormik({

        initialValues: {
            foodWaste: '',
            eWaste: '',
            plasticWaste: '',
            Others: ''
        },

        onSubmit: (values) => {
            try {
                dispatch(
                    setGarbageDetails({
                        garbageDetails: values
                    }))
                onNextStep()

            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-2xl mb-5'>Enter Garbage Details</h1>
                    <input type="text" onChange={formik.handleChange} name='foodWaste' id='foodWaste' placeholder="Food Waste in Kg" className="input mb-5 input-bordered input-success w-full max-w-xs" />
                    <input type="text" onChange={formik.handleChange} name='plasticWaste' id='plasticWaste' placeholder="plastic Waste in Kg" className="input mb-5 input-bordered input-warning w-full max-w-xs" />
                    <input type="text" onChange={formik.handleChange} name='eWaste' id='eWaste' placeholder="E- Waste in Kg" className="input mb-5 input-bordered input-error w-full max-w-xs" />
                    <input type="text" onChange={formik.handleChange} name='Others' id='Others' placeholder="Others in Kg" className="input mb-5 input-bordered input-primary w-full max-w-xs" />
                    <button type='submit' className='btn btn-sm bg-green-600 text-white'>Next</button>
                </div>
            </form>

        </div >
    );
};

export default Step1
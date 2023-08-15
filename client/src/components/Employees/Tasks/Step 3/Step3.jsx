import React from 'react';
import { useSelector } from 'react-redux';

const Step3 = ({ onSubmit, onPreviousStep }) => {

    const garbageDetails = useSelector((state) => state.worker.garbageDetails)

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-bold text-2xl mb-5'>Confirmation</h1>
                
                    <span>E waste: {garbageDetails.eWaste}</span>
                    <span>Plastic waste: {garbageDetails.plasticWaste}</span>
                    <span>Food waste: {garbageDetails.foodWaste}</span>
                    <span>Other waste: {garbageDetails.Others}</span>
                    <div>
                    <button className='btn bg-green-600 text-white btn-sm mr-4' onClick={onPreviousStep}>Previous</button>
                    <button className='btn bg-green-600 text-white btn-sm' onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Step3

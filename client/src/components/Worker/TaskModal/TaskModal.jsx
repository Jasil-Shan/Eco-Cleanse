import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Step1 from '../Step1/Step1';
import Step2 from '../Step2/Step2';
import Step3 from '../Step 3/Step3';
import { taskComplete } from '../../../services/workerApi';



const TaskModal = () => {

    const [step, setStep] = useState(1);
    const [paymentDetails, setPaymentDetails] = useState()
    const [isOpen, setIsOpen] = useState(true);

    const handleNextStep = () => {
        setStep(step + 1)
    };

    const handlePreviousStep = () => {
        setStep(step - 1)
    };

    const garbageDetails = useSelector((state) => state.worker.garbageDetails)
    const id = useSelector((state) => state.worker.task)

    const toggleModal = () => {
        setIsOpen(false);
    };


    const handleSubmit = async () => {

        const { data } = await taskComplete(garbageDetails,id)
        console.log(data)
        if (data.success) {
            toast.success(data.message, {
                position: "top-center"
            })
            toggleModal()
        }

        console.log('garba:', garbageDetails, id)
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNextStep={handleNextStep} />
            case 2:
                return <Step2 onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} setPaymentDetails={setPaymentDetails} />
            case 3:
                return <Step3 onSubmit={handleSubmit} onPreviousStep={handlePreviousStep} />
            default:
                return null
        }
    };
    return (
        <>
            <label htmlFor="my_modal_7" className="btn btn-sm bg-green-600 text-white">Start</label>
            {isOpen && (
                <>
                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            {renderStep()}
                        </div>
                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                    </div>
                </>
            )
            }
        </>
    )
}

export default TaskModal
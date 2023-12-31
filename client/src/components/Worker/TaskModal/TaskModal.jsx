import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Step1 from '../Step1/Step1';
import Step2 from '../Step2/Step2';
import Step3 from '../Step 3/Step3';
import { getBooking, taskComplete } from '../../../services/workerApi';
import { getCurrentLocation } from '../../../helpers/currentLocation';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const TaskModal = () => {

    const [step, setStep] = useState(1);
    const [paymentDetails, setPaymentDetails] = useState()
    const [isOpen, setIsOpen] = useState(true);
    const [booking, setBooking] = useState();
    const [totalAmount, setTotalAmount] = useState(null)
    const navigate = useNavigate()

    const handleNextStep = () => {
        setStep(step + 1)
    };

    const handlePreviousStep = () => {
        setStep(step - 1)
    };

    const garbageDetails = useSelector((state) => state.worker.garbageDetails)
    const id = useSelector((state) => state.worker.task)

    useEffect(() => {
        try {
            (
                async function () {
                    const { data } = await getBooking(id)
                    if (data.success) {
                        setBooking(data.booking)
                        setTotalAmount(data?.booking?.totalAmount)
                    }
                })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    const toggleModal = () => {
        setIsOpen(false);
    };


    const handleSubmit = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "Details updated ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7e3af2',
                cancelButtonColor: '##a8a8a8',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const locations = await getCurrentLocation()
                    const completeData = {
                        garbageDetails,
                        id,
                        locations,
                        totalAmount: totalAmount || booking?.totalAmount
                    };
                    const { data } = await taskComplete(garbageDetails,
                        id,
                        locations,
                        totalAmount)
                    if (data.success) {
                        Swal.fire(
                            'Success!',
                            'Task completed Successfully',
                            'success'
                        )

                        navigate('/worker/dashboard')
                        toggleModal()
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Try Again',
                            'error'
                        )
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1 onNextStep={handleNextStep} />
            case 2:
                return <Step2 onNextStep={handleNextStep} setTotalAmount={setTotalAmount} booking={booking} onPreviousStep={handlePreviousStep} setPaymentDetails={setPaymentDetails} />
            case 3:
                return <Step3 onSubmit={handleSubmit} onPreviousStep={handlePreviousStep} />
            default:
                return null
        }
    };
    return (
        <>
            <label htmlFor="my_modal_7" className="btn btn-neutral btn-sm text-white">Start</label>
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
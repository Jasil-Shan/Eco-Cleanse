import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './swiper.css';
import { EffectCards } from 'swiper/modules';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userBooking } from '../../../services/userApi';
import Card from '../Card/Card';
import Chart from '../Chart/Chart';
import { Navigate, useNavigate } from 'react-router-dom';


const BookingForms = () => {
  const swiper = useSwiper();
  const [cards, setcard] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      eWaste,
      plasticWaste,
      foodWaste,
      others,
    },

    onSubmit: async (values) => {
      try {
        if (
          values.eWaste &&
          values.plasticWaste &&
          values.foodWaste &&
          values.others
        ) {
          setFormValues(values);
          navigate('/confirm', {state:{values}})
        } else {
          toast.error('Please fill in all the fields', { position: 'top-center' });
        }
      } catch (error) {
        console.log(error);
      }

    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className=" space-y-6" >
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="swiper mt-20"
        >
          <SwiperSlide>
          <input type='number' onChange={formik.handleChange} className="input input-ghost placeholder-white font-semibold text-white w-full max-w-xs" placeholder='Enter E waste weight' name='eWaste' id='eWaste' required />
             
          </SwiperSlide>
          <SwiperSlide>
          <input type='number' onChange={formik.handleChange} className="input input-ghost placeholder-white font-semibold text-white w-full max-w-xs" placeholder='Enter Plastic waste weight' name='plasticWaste' id='plasticWaste' required />
        
          </SwiperSlide>
          <SwiperSlide>
          <input type='number' onChange={formik.handleChange} className="input input-ghost placeholder-white font-semibold text-white w-full max-w-xs"  placeholder='Enter Food waste weight' name='foodWaste' id='foodWaste' required/>
           
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col h-fit w-full mt-14 items-center">
              <input type='number' onChange={formik.handleChange} className="input input-ghost placeholder-white font-semibold text-white w-full max-w-xs"  placeholder='Enter Other waste weight' name='others' id='others' required/>
              <button type='submit' className="btn glass number-center mt-8">Submit</button>
            </div>

          </SwiperSlide>

        </Swiper >
      
    </form>
  );
}

export default BookingForms

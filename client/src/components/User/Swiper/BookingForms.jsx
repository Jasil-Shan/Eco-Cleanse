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
      eWaste: '',
      plasticWaste: '',
      foodWaste: '',
      others: '',
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
          for (const key in values) {
            values[key] = Number(values[key].replace('%', ''));
          }
          console.log(values)
          navigate('/ConfirmChart', {state:{values}})
        } else {
          toast.error('Please fill in all the fields', { position: 'top-center' });
        }
      } catch (error) {
        console.log(error);
      }

    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="px-8 space-y-6" >
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="swiper mt-20"
        >
          <SwiperSlide>
            <select onChange={formik.handleChange} className="select select-ghost w-full max-w-xs" name='eWaste' id='eWaste' required>
              <option disabled selected>Pick Garbage Status</option>
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
          </SwiperSlide>
          <SwiperSlide>
            <select onChange={formik.handleChange} className="select select-ghost w-full max-w-xs" name='plasticWaste' id='plasticWaste'>
              <option disabled selected>Pick Garbage Status</option>
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
          </SwiperSlide>
          <SwiperSlide>
            <select onChange={formik.handleChange} className="select select-ghost w-full max-w-xs" name='foodWaste' id='foodWaste'>
              <option disabled selected>Pick Garbage Status</option>
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col h-fit items-center">
              <select onChange={formik.handleChange} className="select font-semibold text-black select-ghost w-full max-w-xs" name='others' id='others'>
                <option disabled selected>Pick Garbage Status</option>
                <option>25%</option>
                <option>50%</option>
                <option>75%</option>
                <option>100%</option>
              </select>
              <button type='submit' className="btn glass number-center mt-8">Submit</button>
            </div>

          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="flex flex-col items-center">
              <p>nskndskk</p>
            </div>
          </SwiperSlide> */}

        </Swiper >
      
    </form>
  );
}

export default BookingForms

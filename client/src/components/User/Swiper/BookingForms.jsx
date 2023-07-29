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


const BookingForms = () => {
  const swiper = useSwiper();
  const [cards, setcard] = useState(false)
  const [formValues, setFormValues] = useState(null); // State to store form values


  const formik = useFormik({
    initialValues: {
      eWaste: '',
      plasticWaste: '',
      foodWaste: '',
      others: '',
    },

    onSubmit: async (values) => {
      try {
        setFormValues(values);

        setcard(true)
      } catch (error) {
        console.log(error);
      }

    },
  });



  return (
    <form onSubmit={formik.handleSubmit} className="px-8 space-y-6" >
      {cards ? formValues && <Card formValues={formValues} /> :
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="swiper mt-20"
        >
          <SwiperSlide>
            <select onChange={formik.handleChange} className="select select-ghost w-full max-w-xs" name='eWaste' id='eWaste'>
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
            <div className="flex flex-col items-center">
              <select onChange={formik.handleChange} className="select select-ghost w-full max-w-xs" name='others' id='others'>
                <option disabled selected>Pick Garbage Status</option>
                <option>25%</option>
                <option>50%</option>
                <option>75%</option>
                <option>100%</option>
              </select>
              <button type='submit' className="btn glass number-center">Submit</button>
            </div>

          </SwiperSlide>

        </Swiper >
      }
    </form>
  );
}

export default BookingForms

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './swiper.css';
import { EffectCards } from 'swiper/modules';
import { useFormik } from 'formik';

const BookingForms = () => {
  const swiper = useSwiper();

//   const formik = useFormik({
//     initialValues: {
//         email: '',
//         password: '',
//     },
//     onSubmit: async (values) => {
//         try {
//             console.log(values);
//             const { data } = await
//             if (data.login) {

//                 localStorage.setItem('UserJwtkey', data.token);
//                 navigate("/")
//             } else {
//                 toast.error(data.message, {
//                     position: "top-center"
//                 })
//             }
//         } catch (error) {
//             console.log(error);
//         }

//     },
// });


  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="swiper mt-20"
      >
        <form className="px-8 space-y-6" >
          <SwiperSlide>
            <input type="number" placeholder="E Waste" className=" w-11/12 input input-ghost  max-w-xs" />
          </SwiperSlide>
          <SwiperSlide>
            <input type="number" placeholder="Plastic Waste" className=" w-11/12 input input-ghost  max-w-xs" />
          </SwiperSlide>
          <SwiperSlide>
            <input type="number" placeholder="Food Waste" className="w-11/12 input input-ghost  max-w-xs" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <input
                type="number"
                placeholder="Other Waste"
                className="w-11/12 max-w-xs input input-ghost placeholder-gray-800"
              />
              <button type='submit' className="btn glass number-center">Submit</button>
            </div>

          </SwiperSlide>


        </form>
      </Swiper>
      {/* <button onClick={() => swiper.slideNext()}>Slide to the next slide</button> */}


    </>
  );
}

export default BookingForms

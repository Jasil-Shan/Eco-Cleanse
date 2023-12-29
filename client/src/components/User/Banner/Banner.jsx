import React from "react"
import "./Banner.css"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Banner = () => {

  return (


    <section className=" h-screen  bg-[url(https://res.cloudinary.com/dlhldjuis/image/upload/v1693137268/garbage_qh2hri.jpg)] bg-cover flex flex-col items-center justify-center text-center text-white py-0 px-3">

      <div className="video-content space-y-2">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            viewport={{ once: true }}>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              <strong className=" font-extrabold text-red-800 sm:block">
                There's No Planet B
              </strong>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 3.5, delay: 0.8 }}
            viewport={{ once: true }}>
            <p className="mt-4 sm:text-xl/relaxed font-medium italic opacity-80">
              "It's our responsibility to care for our environment by taking swift action to manage and recycle our waste. Let's act now to ensure a sustainable future for generations to come."
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={'/booking'}>
              <h1
                className="block w-full rounded-xl bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              >
                Get Started
              </h1>
            </Link>

            <a
              className="cursor-pointer block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Banner
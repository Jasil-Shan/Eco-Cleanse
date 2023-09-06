import React from "react"
import "./Banner.css"
import { Link } from "react-router-dom"

const Banner = () => {

  return (


    <section className=" h-screen  bg-[url(https://res.cloudinary.com/dlhldjuis/image/upload/v1693137268/garbage_qh2hri.jpg)] bg-cover flex flex-col items-center justify-center text-center text-white py-0 px-3">
       
      <div className="video-content space-y-2">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <strong className="font-extrabold text-red-700 sm:block">
              There's No Planet B
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed italic">
            "It's our responsibility to care for our environment by taking swift action to manage and recycle our waste. Let's act now to ensure a sustainable future for generations to come."
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to={'/booking'}>
              <h1
                className="block w-full rounded-xl bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              >
                Get Started
              </h1>
            </Link>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/about"
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
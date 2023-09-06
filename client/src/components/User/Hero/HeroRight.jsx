import React from "react"
import truck from '../assets/truck.jpeg'


const HeroRight = (props) => {
    return (
        <div className="hero mt-16">
            <div className="hero-content drop-shadow-xl  flex-col lg:flex-row-reverse">
                <img src={truck} className="max-w-xs rounded-lg shadow-2xl" />
                <div className="drop-shadow-xl mr-4 rounded-lg bg-base-200 p-16">
                    <h1 className="text-2xl font-bold">Our Team Will Reach in Hours..</h1>
                    <p className="py-6 ">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroRight
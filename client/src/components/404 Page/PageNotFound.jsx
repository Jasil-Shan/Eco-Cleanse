import React from 'react'
import notFound from '../404 Page/assets/notFound.gif'
import Footer from '../User/Footer/Footer'
import Navbar from '../User/Navbar/Navbar'
const PageNotFound = () => {
    return (
        <>
        <div className='flex flex-col'>
            <Navbar />
            {/* <button className='btn absolute text-center'>Back to Home</button> */}
            <img src={notFound} alt="" loading='lazy' className='w-screen'/>
            <Footer />
        </div>
        </>
    )
}

export default PageNotFound
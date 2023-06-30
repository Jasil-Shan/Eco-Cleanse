import earth from '../User/assets/earth.jpg'


const Home = () => {

    return (

        <section className="bg-gray-50 min-h-screen flex items-center justify-center">

            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">


                <div className="w-1/2 md:block hidden">
                    <img className=' rounded-2xl' src={earth} alt="" />
                </div>
                <h1 className='top-0'>Demo Home</h1>

            </div>
        </section>
    )
}

export default Home
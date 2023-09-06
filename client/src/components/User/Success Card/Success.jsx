import SuccessSvg from '../assets/success.svg'



const Success = (props) => {
    const id = props.orderId
    return (
        <div className="min-h- py-6 flex flex-col justify-center mt-16 items-center sm:py-12 ">
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <object data={SuccessSvg} type="image/svg+xml" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <p className="card-title font-extrabold text-2xl">Request Success</p>
                <p className='font-mono font-semibold'>Our Team will reach You soon</p>
                <p className='font-mono font-semibold'>Order Id: {id}</p>
                <div className="card-actions mt-6">
                    {/* <button className="btn-sm btn-accent">Buy Now</button> */}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Success

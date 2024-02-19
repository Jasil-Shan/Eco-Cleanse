

const HeroLeft = ({ user, recycle, last }) => {


  return (
    <div className="hero mt-28">
      <div className="hero-content drop-shadow-xl flex-col lg:flex-row">
        {user && <img src={user} loading="lazy" className="max-w-xs rounded-lg shadow-2xl" />}
        {recycle && <img src={recycle} loading="lazy" className="max-w-xs rounded-lg shadow-2xl" />}
        <div className="drop-shadow-xl ml-4 rounded-lg bg-base-200 p-16">
          {last ? <span><p className="text-2xl font-bold">We will Recycle it for a better Earth </p>  <p className="py-6 italic">
          We are committed to recycling for a better Earth, striving to contribute to a healthier planet by repurposing your waste materials responsibly and sustainably
          </p> </span> : <span><p className="text-2xl font-bold">Just a Click and Update Details </p>
            <p className="py-6 italic">
              Simply book a garbage collection from the comfort of your home with just a click! Pack your garbage and effortlessly update the details on our beautifully interactive cards on the next page.
            </p> </span>}
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroLeft;

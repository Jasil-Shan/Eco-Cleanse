

const HeroLeft = ({ user, recycle, last }) => {


  return (
    <div className="hero mt-28">
      <div className="hero-content drop-shadow-xl flex-col lg:flex-row">
        {user && <img src={user} className="max-w-xs rounded-lg shadow-2xl" />}
        {recycle && <img src={recycle} className="max-w-xs rounded-lg shadow-2xl" />}
        <div className="drop-shadow-xl ml-4 rounded-lg bg-base-200 p-16">
          {last ? <span><p className="text-2xl font-bold">We will Recycle it for a better Earth </p>  <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p> </span> :<span><p className="text-2xl font-bold">Just a Click and Update Details </p>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p> </span>}
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroLeft;

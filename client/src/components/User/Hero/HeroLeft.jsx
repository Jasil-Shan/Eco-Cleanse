

const HeroLeft = (props) => {

    const { user, recycle } = props;
  
    return (
      <div className="hero mt-16">
        <div className="hero-content flex-col lg:flex-row">
          {user && <img src={user} className="max-w-xs rounded-lg shadow-2xl" />}
          {recycle && <img src={recycle} className="max-w-xs rounded-lg shadow-2xl" />}
          <div className="ml-10">
            <h1 className="text-3xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
              a id nisi.
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroLeft;
  
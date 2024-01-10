import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <BeatLoader color="#36D7B7" />
    </div>
  );
};

export default Loader;

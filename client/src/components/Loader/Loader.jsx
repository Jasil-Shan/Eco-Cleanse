import React from 'react'
import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <BeatLoader color="#B80000" />
    </div>
  );
};

export default Loader;

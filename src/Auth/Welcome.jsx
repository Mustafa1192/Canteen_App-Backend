import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="w-full h-screen bg-[#FAF5FF] p-5 flex flex-col lg:flex-row items-center justify-center lg:justify-evenly">
      {/* Image Section */}
      <img
        className="rounded-3xl w-full max-w-[99%] lg:max-w-lg h-[320px] sm:h-[400px] lg:h-full object-cover"
        src="https://i.pinimg.com/564x/a5/84/72/a5847287e8fee4cd9b769b472022bcae.jpg"
        alt="Image"
      />

      {/* Text and Buttons Section */}
      <div className="flex flex-col items-center text-center lg:text-left mt-8 lg:mt-0 lg:w-1/2">
        <h1 className="text-[#534E55] text-2xl sm:text-3xl md:text-4xl font-semibold">
          Discover your favorite meal here
        </h1>
        <p className="text-[#534E55] mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg">
          Explore all the most exciting dishes based on your taste and dietary preferences.
        </p>

        {/* Buttons */}
        <div className="rounded-3xl mt-8 bg-[#F4F4F4] border-4 px-4 py-4 flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
          <Link to="/register" className="w-full">
            <button className="bg-[#F4F4F4] active:bg-slate-300 active:text-gray-900 active:border-[#979797] border border-transparent rounded-2xl text-[#5B5B5E] py-3 w-full text-sm sm:text-base">
              Register
            </button>
          </Link>
          <Link to="/login" className="w-full">
            <button className="bg-[#F4F4F4] active:bg-slate-300 active:text-gray-900 active:border-[#979797] border border-transparent rounded-2xl text-[#5B5B5E] py-3 w-full text-sm sm:text-base">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

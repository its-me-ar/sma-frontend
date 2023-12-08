import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <AiOutlineLoading3Quarters
        size={50}
        className="text-blue-500 animate-spin"
      />
    </div>
  );
};

export default Loader;

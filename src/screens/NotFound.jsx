import React from "react";
import Image from "../assets/404.jpg";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <img src={Image} className="bg-transparent w-[40%]" />
      <Link to={"/"} className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600">Back to Home</Link>
    </div>
  );
};

export default NotFound;

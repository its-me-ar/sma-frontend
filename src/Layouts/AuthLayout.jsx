import React from "react";
import bgImage from "../assets/bg.png"
export const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="lg:flex md:flex flex-row">
        <div className="lg:w-[70%] md:w-[50%]  lg:block md:block hidden">
          <img src={bgImage} alt="SMA APP" className="object-cover h-[100vh]" />
        </div>

        {children}
      </div>
    </div>
  );
};

import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightSideBar from "../components/RightSideBar";
import Drawer from "../components/Drawer";

const GuestLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="lg:flex h-screen">
        <div className="lg:hidden block w-full">
          <Header setIsOpen={setIsOpen} isGuest={true} />
        </div>
        <div className="lg:w-[20%] lg:block hidden">
          <SideBar isMobile={false} />
        </div>

        <div className="lg:w-[60%] w-fulll  bg-slate-50 lg:mt-[0px] mt-[60px] overflow-y-auto">
          {children}
        </div>
        <div className="lg:w-[20%] lg:block hidden overflow-y-auto">
          <RightSideBar />
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SideBar isMobile={true} />
      </Drawer>
    </>
  );
};

export default GuestLayout;

import React, { lazy, useState } from "react";


const Header = lazy(()=>import("../components/Header"))
const Drawer = lazy(()=>import("../components/Drawer"))
const RightSideBar = lazy(()=>import("../components/RightSideBar"))
const SideBar = lazy(()=>import("../components/SideBar"))

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

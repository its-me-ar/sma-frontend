import React, { createContext, useContext, useState } from "react";
import SideBar from "../components/SideBar";
import RightSideBar from "../components/RightSideBar";
import { UserContext } from "../App";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import Loader from "../components/Loader";

export const LodaerContext = createContext();

const AppLayout = ({ children }) => {
  const { userData } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  return (
    <>
      <LodaerContext.Provider value={{ showLoader, setShowLoader }}>
        <div className="lg:flex h-screen">
          <div className="lg:hidden block w-full">
            <Header setIsOpen={setIsOpen} />
          </div>
          <div className="lg:w-[20%] lg:block hidden">
            <SideBar  userInfo={userData} isMobile={false} />
          </div>

          <div className="lg:w-[60%] w-fulll  bg-slate-50 lg:mt-[0px] mt-[60px] overflow-y-auto">
            {children}
          </div>
          <div className="lg:w-[20%] lg:block hidden overflow-y-auto">
            <RightSideBar  userInfo={userData}/>
          </div>
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <SideBar userInfo={userData} isMobile={true} />
        </Drawer>
        {showLoader && <Loader />}
      </LodaerContext.Provider>
    </>
  );
};

export default AppLayout;

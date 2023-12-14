import React, { createContext, lazy, useContext, useState } from "react";

import { UserContext } from "../App";
import Loader from "../components/Loader";

const Header = lazy(()=>import("../components/Header"))
const Drawer = lazy(()=>import("../components/Drawer"))
const RightSideBar = lazy(()=>import("../components/RightSideBar"))
const SideBar = lazy(()=>import("../components/SideBar"))


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
            <SideBar userInfo={userData} isMobile={false} />
          </div>

          <div className="lg:w-[60%] w-fulll  bg-slate-50 lg:mt-[0px] mt-[60px] overflow-y-auto">
            {children}
          </div>
          <div className="lg:w-[20%] lg:block hidden overflow-y-auto">
            <RightSideBar userInfo={userData} />
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

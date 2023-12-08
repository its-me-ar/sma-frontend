import React, { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { logoutUser } from "../hooks/useToken";
import { url } from "../lib/url";
import { useLocation } from "react-router-dom";
import profileIcon from "../assets/profile.jpg"
const SideBar = ({ userInfo,isMobile}) => {
  const { pathname } = useLocation();
  const [activeNav, setActiveNav] = useState(pathname);
  useEffect(() => {
    setActiveNav(pathname);
  }, [pathname]);

  return (
    <div className={`flex flex-col  items-center ${isMobile ? 'py-5' :'py-20 h-screen'} `}>
      <div className="mb-8">
        <img
          src={userInfo?.image ? userInfo?.image : profileIcon}
          className="w-[100px] h-[100px] rounded-full"
          alt={userInfo?.name}
        />
        <h1 className="text-center font-semibold text-[18px] mt-2">
          {userInfo?.name}
        </h1>
        <p className="text-center">{userInfo?.bio}</p>
      </div> 
      {url.map((item, index) => {
        return (
          <div className="mt-2" key={index}>
            <Link
              to={item?.url}
              className={`hover:bg-black px-5 h-11 font-semibold w-[200px] rounded-2xl hover:text-white  text-left inline-flex items-center ${
                activeNav === item?.url
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              style={{
                transition:
                  "background-color 0.3s ease-out, border-width 0.3s ease-out",
              }}
            >
              {item.icon({ size: "20" })}
              <span className="ml-3 text-[15px]"> {item?.name}</span>
            </Link>
          </div>
        );
      })}

      <div className="mt-2">
        <Link
          to={"/"}
          onClick={() => logoutUser()}
          className="hover:bg-black px-5 h-11 w-[200px]  font-semibold rounded-2xl hover:text-white text-black text-left inline-flex items-center"
        >
          <IoIosLogOut size={20} />{" "}
          <span className="ml-3 text-[15px]"> Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;

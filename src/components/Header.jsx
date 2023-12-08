import React from "react";
import { CgMenuRound, CgLogOut } from "react-icons/cg";
import { logoutUser } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white fixed top-0 w-full z-10">
      <div className="h-[60px] flex flex-row justify-between items-center align-middle px-2">
        <div>
          <CgMenuRound size={30} onClick={() => setIsOpen(true)} />
        </div>
        <div>
          <CgLogOut
            size={30}
            onClick={() => {
              navigate("/");
              logoutUser();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

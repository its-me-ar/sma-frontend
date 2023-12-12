import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router";

const BackButton = ({ url, text }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-5">
      <button
        className="bg-slate-400 px-3 py-1 rounded flex items-center font-semibold text-[15px] text-white"
        onClick={() => navigate(url)}
      >
        <IoMdArrowRoundBack /> <span>{text}</span>
      </button>
    </div>
  );
};

export default BackButton;

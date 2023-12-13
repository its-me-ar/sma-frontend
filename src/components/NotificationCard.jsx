import React from "react";
import ReactTimeago from "react-timeago";
import profileIcon from "../assets/profile.jpg";
const NotificationCard = ({ item }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <img
          src={item?.senderId?.image ? item?.senderId?.image : profileIcon}
          className="w-[35px] h-[35px] p-[1px] bg-blue-100 rounded-full"
        />
        <div
          className={`ml-2 lg:text-[15px] text-[13px] ${
            item?.isOpen ? "text-gray-400" : ""
          }`}
        >
          {item?.message}
        </div>
      </div>
      <div>
        <ReactTimeago
          date={item?.createdAt}
          className={`text-[13px] ${item?.isOpen ? "text-gray-400" : ""}`}
        />
      </div>
    </>
  );
};

export default NotificationCard;

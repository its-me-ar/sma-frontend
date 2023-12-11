import React from "react";
import profileIcon from "../assets/profile.jpg";
import { Link } from "react-router-dom";
const FriendList = ({ list }) => {
  return (
    <div className="lg:p-10 p-2">
      <div className="bg-white  rounded-md lg:p-10 p-2">
        <h2 className="text-lg font-semibold mb-4">
          {list?.length === 0 ? "No Friend " : "My Friend List"}
        </h2>
        <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2">
          {list?.map((item, index) => {
            return (
              <Link
                to={`/user/${item?._id}`}
                className="mb-8 flex flex-col items-center bg-slate-100 p-5  rounded-xl"
                key={index}
              >
                <img
                  src={item?.image ? item?.image : profileIcon}
                  className="w-[100px] h-[100px] rounded-full"
                  alt={item?.name}
                />
                <h1 className=" font-semibold text-[18px] mt-2">
                  {item?.name}
                </h1>
                <p className="overflow-hidden truncate w-[100px] text-center">
                  {item?.bio}
                </p>
                
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendList;

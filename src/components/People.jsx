import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../assets/profile.jpg";
import { UserContext } from "../App";
import { FaUserCheck } from "react-icons/fa";
import { sendRequest } from "../services/api.services";
const People = ({ item, refreshData }) => {
  const { userData } = useContext(UserContext);
  const [isFriend, setisFriend] = useState(false);
  useEffect(() => {
    if (userData) {
      const _id = userData?._id;
      if (item?.friendsList.includes(_id)) {
        setisFriend(true);
      }
    }
  }, [item, userData]);

  const addFriends = async ({ id }) => {
    if (item?.requestList.includes(userData?._id)) {
        toast("Friend request Send!");
    } else {
      const res = await sendRequest({
        friendId: id,
      });
      if (res?.status === 200) {
        refreshData();
        toast("Friend request Send!");
      } else {
        toast("Something went wrong");
      }
    }
  };
  return (
    <div className="mb-8 flex flex-col items-center bg-slate-100 p-5  rounded-xl">
      <img
        src={item?.image ? item?.image : profileIcon}
        className="w-[100px] h-[100px] rounded-full"
        alt={item?.name}
      />
      <h1 className=" font-semibold text-[18px] mt-2">{item?.name}</h1>

      {isFriend ? (
        <div className="mt-2">
          <button className="font-semibold text-[16px] cursor-text flex items-center bg-green-500 px-3 py-1 rounded text-white">
            <FaUserCheck />
            <span className="ml-3">Friends</span>
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <button
            className="font-semibold text-[16px] flex items-center bg-blue-500 px-3 py-1 rounded text-white"
            onClick={() => addFriends({ id: item?._id })}
          >
            <span>Add friend</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default People;

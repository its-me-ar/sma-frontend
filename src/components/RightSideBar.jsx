import React, { useEffect, useState } from "react";
import { findFriends, sendRequest } from "../services/api.services";
import profilePic from "../assets/profile.jpg";
const RightSideBar = () => {
  const [nonfriends, setNonfriends] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await findFriends();
    if (res?.status === 200) {
      setNonfriends(res?.data);
    }
  };

  const addFriends = async ({ id }) => {
    const res = await sendRequest({
      friendId: id,
    });
    if (res?.status === 200) {
      getData()
      alert("Request Send");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col py-10 h-screen">
      <div className="p-4 mb-2">
        <h1 className="text-[18px] font-semibold mt-[-15px]">Find friends</h1>
      </div>
      <div className="">
        {nonfriends?.map((item, index) => (
          <div
            className="flex flex-row justify-between items-center gap-2 px-5 mb-3"
            key={index}
          >
            <div>
              <img
                src={item?.image ? item?.image : profilePic}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
            </div>
            <div className="w-[100px]">
              <p className="font-semibold text-[14px]">
                {item?.name ? item?.name : "User"}
              </p>
            </div>
            <div>
              <button
                className="text-[13px] font-semibold bg-blue-500 px-2 h-[30px] rounded-xl text-white"
                onClick={() => addFriends({ id: item?._id })}
              >
                Add friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;

import React, { useEffect, useState } from "react";
import { findFriends, sendRequest } from "../services/api.services";
import profilePic from "../assets/profile.jpg";
import { Link } from "react-router-dom";
const RightSideBar = ({ userInfo }) => {
  const [nonfriends, setNonfriends] = useState([]);
  useEffect(() => {
    if(userInfo){
    getData();
    }

  }, [userInfo]);

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
      getData();
      alert("Request Send");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col py-10 h-screen">
      {userInfo ? (
        <>
          <div className="p-4 mb-2">
            <h1 className="text-[18px] font-semibold mt-[-15px]">
              Find friends
            </h1>
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
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between mt-[70%] px-4">
            <h1 className="text-justify font-semibold text-[16px]">
              SMA helps you connect and share with the people in your life.
            </h1>
            <Link to={"/sign-up"} className="text-white bg-slate-500 hover:bg-slate-600 px-10 py-1 rounded mt-4">Join Now</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideBar;

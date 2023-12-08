import React from "react";
import { actionRequestByFriendsID } from "../services/api.services";
import profileIcon from "../assets/profile.jpg";

const RequestList = ({ list, refreshData }) => {
  const actionRequest = async ({ action, id }) => {
    const payload = {
      friendId: id,
      action,
    };
    const res = await actionRequestByFriendsID(payload);
    if (res.status === 200) {
      refreshData();
    } else {
      alert("Something went wrong, Please try again");
    }
  };

  return (
    <div className="lg:p-10 p-2">
      <div className="bg-white  rounded-md lg:p-10 p-2">
        <h2 className="text-lg font-semibold mb-4">
          {list?.length === 0 ? "No Friend Request" : "Request List"}
        </h2>
        <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2">
          {list?.map((item, index) => {
            return (
              <div
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
                <div className="flex justify-between gap-2 mt-3">
                  <button
                    className="px-3 py-1 bg-blue-500 rounded-md text-white hover:bg-blue-600"
                    onClick={() =>
                      actionRequest({ action: "accept", id: item?._id })
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-500 rounded-md text-white hover:bg-gray-600"
                    onClick={() =>
                      actionRequest({ action: "reject", id: item?._id })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RequestList;

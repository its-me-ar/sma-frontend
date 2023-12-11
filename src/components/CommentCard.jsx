import React from "react";
import ReactTimeago from "react-timeago";
import profileIcon from "../assets/profile.jpg";
const CommentCard = ({ comment ,isGraph}) => {
  return (
    <div>
      <div className="flex flex-row items-center p-4">
        <img
          src={comment?.userId?.image?comment?.userId?.image : profileIcon}
          alt={comment?.userId?.name}
          className="w-[30px] h-[30px] rounded-full"
        />
        <div className="w-full">
          <div className="ml-2 bg-slate-100 p-2 rounded-2xl">
            <p className="text-[12px] font-semibold">{comment?.userId?.name}</p>
            <p className="text-[12px] font-semibold text-gray-500">
              {comment?.comment}
            </p>
            <div className="mt-[-4px] ">
              <ReactTimeago
                date={isGraph ? parseInt(comment?.createdAt) : comment?.createdAt}
                className="text-[10px] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

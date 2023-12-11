import React, { useState } from "react";
import TimeAgo from "react-timeago";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import CommentCard from "./CommentCard";
import { RiMessage3Line } from "react-icons/ri";
import CommentModal from "./CommentModal";
import profileIcon from "../assets/profile.jpg";

const Post = ({ post, refreshData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCover, setIscover] = useState(true);
  return (
    <>
      <div className="bg-white  rounded-md lg:p-10 p-5 my-5">
        <div>
          <div className="flex flex-row items-center">
            <img
              src={post?.userId?.image ? post?.userId?.image : profileIcon}
              alt={post?.userId?.name}
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="ml-2">
              <h2 className="text-[16px] font-semibold">
                {post?.userId?.name}
              </h2>
              <div className="mt-[-10px]">
                <TimeAgo date={post?.createdAt} className="text-[13px] " />
              </div>
            </div>
          </div>
          <div className="lg:p-4 p-2">
            <h1>{post?.data}</h1>
            {post?.media[0]?.type === "image" && (
              <div className="lg:p-2 p-1 rounded-lg ">
                <img
                  src={post?.media[0]?.url}
                  className={`h-[450px]  w-full cursor-pointer bg-slate-50 ${
                    isCover ? "object-cover" : "object-contain"
                  }`}
                  onClick={() => setIscover(!isCover)}
                />
              </div>
            )}
            {post?.media[0]?.type === "video" && (
              <div className="lg:p-2 p-1">
                <Player autoPlay muted>
                  <source
                    src={post?.media[0]?.url}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </Player>
              </div>
            )}
          </div>

          <div className="lg:p-4 p-2 border rounded-md">
            <div className="flex flex-row justify-between items-center">
              <div>
                <p className="text-[16px] font-semibold ml-4"> Comments</p>
              </div>
              <div className="m-2  ">
                <button
                  className={` px-3 py-1 rounded  hover:bg-blue-600 bg-blue-500 text-white `}
                  onClick={() => setIsOpen(true)}
                >
                  <div className="inline-flex items-center">
                    <RiMessage3Line /> <span className="ml-1 ">Comment</span>
                  </div>
                </button>
              </div>
            </div>

            {post?.comments?.map((item, index) => {
              return <CommentCard comment={item} key={index} />;
            })}
          </div>
        </div>
      </div>
      {isOpen && (
        <CommentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={post?._id}
          refreshData={refreshData}
        />
      )}
    </>
  );
};

export default Post;
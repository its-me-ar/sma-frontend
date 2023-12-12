import React, { useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "../services/api.services";
import profileIcon from "../assets/profile.jpg";
import { FaUserCheck } from "react-icons/fa";
import Post from "../components/Post";
import ReactTimeago from "react-timeago";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "../components/Loader";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setShowLoader(true)
    const res = await getUserData(id);
    if (!res?.data?.errors && res?.data?.data?.getUser) {
      setUserData(res?.data?.data?.getUser);
      setShowLoader(false)
    } else {
      navigate("/friends");
    }
  };
  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <div className="mb-5">
          <button className="bg-slate-400 px-3 py-1 rounded flex items-center font-semibold text-[15px] text-white" onClick={()=>navigate("/friends")}>
            <IoMdArrowRoundBack /> <span>Back to friends</span>
          </button>
        </div>
        <div className="bg-white  rounded-md lg:p-10 p-5">
          <div className="mb-8 flex flex-row items-center justify-between  ">
            <div className="flex lg:flex-row md:flex-row flex-col items-center">
              <img
                src={userData?.image ? userData?.image : profileIcon}
                className="w-[100px] h-[100px] rounded-full"
                alt={userData?.name}
              />
              <div className="ml-2">
                <h1 className=" font-semibold text-[18px] mt-2">
                  {userData?.name}
                </h1>
                <p className="">
                  {userData?.bio}
                </p>
                <p className="">
                  {userData?.email}
                </p>
              </div>
            </div>

            <div>
              <button className="font-semibold text-[16px] cursor-text flex items-center bg-blue-500 px-3 py-1 rounded text-white">
                <FaUserCheck />
                <span className="ml-3">Friends</span>
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[14px] flex font-semiboldx items-center">
              <span>Joined </span>
              <ReactTimeago
                date={parseInt(userData?.createdAt)}
                className="ml-1 "
              />
            </div>
            <div className="text-[14px] font-semibold">
              {userData?.friendsList?.length} friends
            </div>
          </div>
        </div>
        <div className="bg-white  rounded-md  p-5 my-5">
          {userData?.posts?.length !== 0 ? (
            <>
              <p className="text-[16px] font-semibold">
                {`${
                  userData?.name
                    ? "List of " + userData?.name + "'" + "s Post"
                    : "User's Post"
                }`}
              </p>
            </>
          ) : (
            <>
              <p className="text-[16px] font-semibold">
                No post from {`${userData?.name}`}
              </p>
            </>
          )}
        </div>
        {userData?.posts?.map((item, index) => {
          return <Post key={index} post={item} refreshData={getData} isGraph={true} />;
        })}
      </div>
      {showLoader && <Loader />}
    </AppLayout>
  );
};

export default User;

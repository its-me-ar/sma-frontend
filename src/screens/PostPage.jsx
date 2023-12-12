import React, { useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPostByID } from "../services/api.services";
import Post from "../components/Post";
import { IoMdArrowRoundBack } from "react-icons/io";
import GuestLayout from "../Layouts/GuestLayout";

const PostPage = ({ isLogin }) => {
  const { id } = useParams();
  const [userPostData, setPostData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const isGuest = !isLogin;
      const res = await getAllPostByID(id, isGuest);
      if (!res?.data?.error && res?.data) {
        setPostData(res?.data?.posts);
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
      navigate("/404");
    }
  };

  const PostTemplete = () => {
    return (
      <div className="lg:p-10 p-5">
        {isLogin && (
          <div className="mb-5">
            <button
              className="bg-slate-400 px-3 py-1 rounded flex items-center font-semibold text-[15px] text-white"
              onClick={() => navigate("/")}
            >
              <IoMdArrowRoundBack /> <span>Back to Feeds</span>
            </button>
          </div>
        )}

        <Post post={userPostData} refreshData={getData} isGuest={!isLogin} />
      </div>
    );
  };

  return isLogin ? (
    <AppLayout>
      <PostTemplete />
    </AppLayout>
  ) : (
    <GuestLayout>
      <PostTemplete />
    </GuestLayout>
  );
};

export default PostPage;

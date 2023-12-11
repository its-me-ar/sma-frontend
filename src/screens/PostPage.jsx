import React, { useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPostByID } from "../services/api.services";
import Post from "../components/Post";
import { IoMdArrowRoundBack } from "react-icons/io";
import { UserContext } from "../App";

const PostPage = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [userPostData, setPostData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const res = await getAllPostByID(id);
      if (!res?.data?.error && res?.data) {
        setPostData(res?.data?.posts);
      } else {
        navigate("/404");
      }
    } catch (error) {
      navigate("/404");
    }
  };

  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <div className="mb-5">
          <button
            className="bg-slate-400 px-3 py-1 rounded flex items-center font-semibold text-[15px] text-white"
            onClick={() => navigate("/")}
          >
            <IoMdArrowRoundBack /> <span>Back to Feeds</span>
          </button>
        </div>

        <Post post={userPostData} refreshData={getData} />
      </div>
    </AppLayout>
  );
};

export default PostPage;

import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPostByID } from "../services/api.services";
import GuestLayout from "../Layouts/GuestLayout";

const Post = lazy(() => import("../components/Post"));

const BackButton = lazy(() => import("../components/BackButton"));

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
      navigate("/404");
    }
  };

  const PostTemplete = () => {
    return (
      <div className="lg:p-10 p-5">
        {isLogin && (
          <div className="mb-5">
            <BackButton url={"/"} text={"Back to Feeds"} />
          </div>
        )}

        <Suspense>
          <Post post={userPostData} refreshData={getData} isGuest={!isLogin} />
        </Suspense>
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

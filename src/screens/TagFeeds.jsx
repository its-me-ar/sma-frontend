import React, { Suspense, lazy, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { useNavigate, useParams } from "react-router";
import { getPostsByTag } from "../services/api.services";
import Loader from "../components/Loader";

import PostSkeleton from "../components/PostSkeleton";

const Post = lazy(() => import("../components/Post"));

const BackButton = lazy(() => import("../components/BackButton"));

const TagFeeds = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (tag) {
      getData();
    }
  }, [tag]);

  const getData = async () => {
    setShowLoader(true);
    const res = await getPostsByTag(tag);
    if (res?.status === 200) {
      setPosts(res?.data?.posts);
      setShowLoader(false);
    } else {
      navigate("/");
    }
  };
  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <div>
          <BackButton url={"/"} text={"Back to Feeds"} />
        </div>
        <div className="bg-white  rounded-md  p-5 my-5">
          <h1 className="text-[16px] text-gray-500 font-medium">
            Showing post with{" "}
            <span className="font-semibold text-black ">#{tag}</span>
          </h1>
        </div>
        {posts?.map((item, index) => {
          return (
            <Suspense key={index} fallback={<PostSkeleton />}>
              <Post post={item} refreshData={getData} />
            </Suspense>
          );
        })}
      </div>
      {showLoader && <Loader />}
    </AppLayout>
  );
};

export default TagFeeds;

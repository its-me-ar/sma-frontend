import React, { Suspense, lazy, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import AddPost from "../components/AddPost";
import { getAllPost } from "../services/api.services";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import PostSkeleton from "../components/PostSkeleton";

const Post = lazy(() => import("../components/Post"));

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setShowLoader(true);
    const res = await getAllPost();
    if (res?.status === 200) {
      setPosts(res?.data?.posts);
      setShowLoader(false);
    } else {
      toast("Error in fetching data");
      setShowLoader(false);
    }
  };

  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <AddPost refreshData={getData} />
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
export default Home;

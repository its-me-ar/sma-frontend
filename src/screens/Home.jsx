import React, { useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import AddPost from "../components/AddPost";
import { getAllPost } from "../services/api.services";
import Post from "../components/Post";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getAllPost();
    if (res?.status === 200) {
      setPosts(res?.data?.posts);
    }
  };

  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <AddPost refreshData={getData} />
        {posts?.map((item, index) => {
          return <Post key={index} post={item}  refreshData={getData}/>;
        })}
      </div>
    </AppLayout>
  );
};

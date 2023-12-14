import React, { Suspense, lazy, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import Loader from "../components/Loader";
import { getDiscover } from "../services/api.services";
import { toast } from "react-toastify";
import PostSkeleton from "../components/PostSkeleton";


const Post = lazy(()=>import("../components/Post"))
const People = lazy(()=>import("../components/People"))

const Discovery = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length >= 3) {
      setSearch(value);
      getData(value);
    } else {
      setData(null);
      setSearch(null);
    }
  };

  const getData = async (value) => {
    setShowLoader(true);
    const res = await getDiscover(value ? value : search);
    if (res?.status === 200) {
      setData(res?.data);
      setShowLoader(false);
    } else {
      toast("Error in fetching data");
      setShowLoader(false);
    }
  };



  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <div className="bg-white  rounded-md lg:p-10 p-5">
          <h1 className="text-[16px] font-semibold">Discover </h1>
          <input
            placeholder="Search post,friends"
            className="w-full ring-1 ring-slate-200 rounded-xl px-5 py-2 outline-none  my-3 text-[14px]"
            onChange={handleChange}
          />
        </div>
        {search?.length && (
          <div className="bg-white  rounded-md  p-5 my-5">
            <h1 className="text-[16px] text-gray-500 font-medium">
              Showing result with{" "}
              <span className="font-semibold text-black ">{search}</span>
            </h1>
          </div>
        )}
        {data && (
          <>
            {data?.users.length !== 0 && (
              <div className="bg-white  rounded-md  p-5 my-5">
                <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-3 grid-cols-2">
                  {data?.users?.map((item, index) => {
                    return (
                      <Suspense  key={index} ><People item={item} refreshData={getData} /></Suspense>
                    );
                  })}
                </div>
              </div>
            )}
            {data?.posts.length !== 0 && (
              <div className="bg-white  rounded-md  p-5 my-5">
                {data?.posts?.map((item, index) => {
                  return <Suspense key={index} fallback={<PostSkeleton/>}><Post  post={item} refreshData={getData} /></Suspense>;
                })}
              </div>
            )}
          </>
        )}
      </div>
      {showLoader && <Loader />}
    </AppLayout>
  );
};

export default Discovery;

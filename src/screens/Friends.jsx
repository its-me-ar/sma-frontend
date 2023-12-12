import React, { useContext, useEffect, useState } from "react";
import AppLayout, { LodaerContext } from "../Layouts/AppLayout";
import RequestList from "../components/RequestList";
import FriendList from "../components/FriendList";
import { UserContext } from "../App";
import { getUser } from "../services/api.services";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Friends = () => {
  const [list, setList] = useState([]);
  const { userData } = useContext(UserContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (userData) {
      getData();
    }
  }, [userData]);

  const getData = async () => {
    setShowLoader(true)
    const res = await getUser(userData?._id);
    if (res?.status === 200) {
      setList(res?.data?.data);
      setShowLoader(false)
    }else{
      toast("Error in fetching data")
      setShowLoader(false)
    }
  };

  return (
    <AppLayout>
      {list?.requestList?.length > 0 ? (
        <>
          <RequestList list={list.requestList} refreshData={getData} />
          <FriendList list={list.friendsList} refreshData={getData} />
        </>
      ) : (
        <>
          <FriendList list={list.friendsList} refreshData={getData} />
          <RequestList list={list.requestList} refreshData={getData} />
        </>
      )}
      {showLoader && <Loader />}
    </AppLayout>
  );
};

export default Friends;

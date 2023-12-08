import React, { useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import RequestList from "../components/RequestList";
import FriendList from "../components/FriendList";
import { UserContext } from "../App";
import { getUser } from "../services/api.services";

const Friends = () => {
  const [list, setList] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      getData();
    }
  }, [userData]);

  const getData = async () => {
    const res = await getUser(userData?._id);
    if (res?.status === 200) {
      setList(res?.data?.data);
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
    </AppLayout>
  );
};

export default Friends;

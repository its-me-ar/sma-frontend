import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { UserContext } from "../App";
import { getUser } from "../services/api.services";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const RequestList = lazy(() => import("../components/RequestList"));
const FriendList = lazy(() => import("../components/FriendList"));

const Friends = () => {
  const [list, setList] = useState([]);
  const userContextData = useContext(UserContext);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (userContextData) {
      getData(userContextData?.userData?._id);
    }
  }, [userContextData]);

  const getData = async () => {
    setShowLoader(true);
    const res = await getUser(userContextData?.userData?._id);
    if (res?.status === 200) {
      setList(res?.data?.data);
      setShowLoader(false);
    } else {
      toast("Error in fetching data");
      setShowLoader(false);
    }
  };

  return (
    <AppLayout>
      {list?.requestList?.length > 0 ? (
        <>
          <Suspense>
            <RequestList list={list.requestList} refreshData={getData} />
          </Suspense>
          <Suspense>
            <FriendList list={list.friendsList} refreshData={getData} />
          </Suspense>
        </>
      ) : (
        <>
          <Suspense>
            <FriendList list={list.friendsList} refreshData={getData} />
          </Suspense>
          <Suspense>
            <RequestList list={list.requestList} refreshData={getData} />
          </Suspense>
        </>
      )}
      {showLoader && <Loader />}
    </AppLayout>
  );
};

export default Friends;

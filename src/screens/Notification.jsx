import React, {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
} from "react";
import AppLayout from "../Layouts/AppLayout";
import {
  getNotifications,
  updateNotificationsById,
} from "../services/api.services";
import { NotificationContext } from "../App";
import { useNavigate } from "react-router";

const NotificationCard = lazy(() => import("../components/NotificationCard"));

const Notification = () => {
  const { setNotification, notification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const getData = useCallback(() => {
    getNotifications().then((res) => setNotification(res?.data?.notifications));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleNotification = async (id, isOpen) => {
    if (!isOpen) {
      const res = await updateNotificationsById(id);
      if (res.status === 201) {
        getData();
        navigate("/friends");
      } else {
        toast("Something went wrong");
      }
    } else {
      navigate("/friends");
    }
  };

  return (
    <AppLayout>
      <div className="lg:p-10 md:p-5 p-2">
        <div className="bg-white  rounded-md lg:p-10 md:p-5 p-2">
          <h1 className="text-[16px] font-semibold">Notifications </h1>
          <div className="px-2">
            {notification?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className="flex flex-row items-center justify-between my-4 bg-gray-50 p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleNotification(item?._id, item?.isOpen)}
                  >
                    <Suspense>
                      <NotificationCard item={item} />
                    </Suspense>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Notification;

import { Login } from "./screens/Login";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Suspense, createContext, lazy, useState } from "react";
import useToken from "./hooks/useToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader";

const Home = lazy(() => import("./screens/Home"));
const Profile = lazy(() => import("./screens/Profile"));
const Friends = lazy(() => import("./screens/Friends"));
const Notification = lazy(() => import("./screens/Notification"));
const User = lazy(() => import("./screens/UserActivity"));
const PostPage = lazy(() => import("./screens/PostPage"));
const TagFeeds = lazy(() => import("./screens/TagFeeds"));
const Discovery = lazy(() => import("./screens/Discovery"));
const Register = lazy(() => import("./screens/Register"));
const NotFound = lazy(() => import("./screens/NotFound"));

export const UserContext = createContext();
export const NotificationContext = createContext();
function App() {
  const { setToken, isINIT, isLogin, userInfo } = useToken();
  const [notification, setNotification] = useState([]);
  const userData = userInfo?.userInfo;
  return (
    <UserContext.Provider value={{ userData, token: userInfo?.token }}>
      <NotificationContext.Provider value={{ setNotification, notification }}>
        <BrowserRouter basename="/">
          <Routes>
            {isINIT &&
              (isLogin ? (
                <>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Home />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Profile setToken={setToken} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/friends"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Friends />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/user/:id"
                    element={
                      <Suspense fallback={<Loader />}>
                        <User />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/notification"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Notification />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/discover"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Discovery />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/post/:id"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PostPage isLogin={true} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/feeds/:tag"
                    element={
                      <Suspense fallback={<Loader />}>
                        <TagFeeds />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/sign-up"
                    element={<Navigate to={"/"} replace />}
                  />
                </>
              ) : (
                <>
                  <Route
                    path="/post/:id"
                    element={
                      <Suspense fallback={<Loader />}>
                        <PostPage isLogin={false} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Login setToken={setToken} />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/sign-up"
                    element={
                      <Suspense fallback={<Loader />}>
                        <Register />
                      </Suspense>
                    }
                  />
                </>
              ))}

            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-center" theme="dark" />
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

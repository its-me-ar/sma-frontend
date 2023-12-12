import { Login } from "./screens/Login";
import {
  Route,
  Routes,
  Navigate,
  HashRouter,
  BrowserRouter,
} from "react-router-dom";
import Register from "./screens/Register";
import { createContext } from "react";
import useToken from "./hooks/useToken";
import { Home } from "./screens/Home";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import Friends from "./screens/Friends";
import Notification from "./screens/Notification";
import User from "./screens/UserActivity";
import PostPage from "./screens/PostPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagFeeds from "./screens/TagFeeds";
export const UserContext = createContext();

function App() {
  const { setToken, isINIT, isLogin, userInfo } = useToken();
  const userData = userInfo?.userInfo;
  return (
    <UserContext.Provider value={{ userData, token: userInfo?.token }}>
      <BrowserRouter basename="/">
        <Routes>
          {isINIT &&
            (isLogin ? (
              <>
                <Route path="/" element={<Home />} />
                <Route
                  path="/profile"
                  element={<Profile setToken={setToken} />}
                />
                <Route path="/friends" element={<Friends />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/post/:id" element={<PostPage isLogin={true} />} />
                <Route path="/feeds/:tag" element={<TagFeeds  />} />
                <Route
                  path="/sign-up"
                  element={<Navigate to={"/"} replace />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/post/:id"
                  element={<PostPage isLogin={false} />}
                />
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/sign-up" element={<Register />} />
              </>
            ))}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" theme="dark" />
    </UserContext.Provider>
  );
}

export default App;

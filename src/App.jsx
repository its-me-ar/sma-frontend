import { Login } from "./screens/Login";
import { BrowserRouter, Route, Routes, Navigate, HashRouter } from "react-router-dom";
import Register from "./screens/Register";
import { createContext} from "react";
import useToken from "./hooks/useToken";
import { Home } from "./screens/Home";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import Friends from "./screens/Friends";
import Notification from "./screens/Notification";

export const UserContext = createContext();

function App() {
  const { setToken, isINIT, isLogin, userInfo } = useToken();
  const userData= userInfo?.userInfo;
  return (
    <UserContext.Provider value={{ userData,token:userInfo?.token }}>
      <HashRouter basename="/">
        <Routes>
          {isINIT &&
            (isLogin ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile setToken={setToken} />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/notification" element={<Notification />} />
                <Route
                  path="/sign-up"
                  element={<Navigate to={"/"} replace />}
                />
              </>
            ) : (
              <>
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/sign-up" element={<Register />} />
              </>
            ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;

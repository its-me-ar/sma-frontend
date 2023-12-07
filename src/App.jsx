import { Login } from "./screens/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState();
  console.log(userInfo)
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

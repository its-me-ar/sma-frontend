import { io } from "socket.io-client";
import { serverBaseUrl } from "./config";
const user = localStorage.getItem("userInfo");
const id = JSON.parse(user)?._id;
const socket = io(serverBaseUrl, {
  query: {
    userId: id ? id : "",
  },
});
export default socket;

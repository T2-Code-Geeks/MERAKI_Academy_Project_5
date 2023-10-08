import io from "socket.io-client";

const socketInt = ({ user_id, token }) => {
 return io("http://localhost:5000", {
    extraHeaders: {
      user_id,
      token,
    },
    
  });
};
 export default socketInt
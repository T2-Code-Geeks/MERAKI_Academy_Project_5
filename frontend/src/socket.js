import io from "socket.io-client";

const socketInt = ({ user_id, token }) => {
 return io("https://geeks-app.onrender.com", {
    extraHeaders: {
      user_id,
      token,
    },
    
  });
};
 export default socketInt
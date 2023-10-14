import React, { useState, useEffect, useRef } from "react";
import socketInt from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Conversation from "./Conversation";
import io from "socket.io-client";
const Messages = () => {
  const [conversations, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState([]);
  const scroll = useRef();
  const socket = useRef();
  const [info, setInfo] = useState({})

  const { token, userId, employeeId, tokenUser } = useSelector((state) => {
    return {
      tokenUser: state.auth.tokenUser,
      userId: state.auth.userId,
      token: state.employee.token,
      employeeId: state.employee.employeeId,
    };
  });
  useEffect(() => {
    socket.current = io.connect("http://localhost:5000", {
      extraHeaders: {
        id: userId || employeeId,
        token: tokenUser || token,
      },
    });
  }, []);
  const sendMessage = (message) => {
    let user = employeeId || userId;
    let receiver = to[0] != user ? to[0] : to[1];
    socket.current?.emit("message", {
      to: receiver,
      from: user,
      message
    });
  };
  useEffect(() => {
    socket.current.on("message", (data) => {
      setMessages( [...messages,data.message]);
    });
    return () => socket.current.off("message");
  }, [messages,socket.current]);



  useEffect(() => {
    getConversationById();
    handelUserInfo()
  }, [token]);

  const getConversationById = async () => {
    if (tokenUser) {
      try {
        const res = await axios.get("http://localhost:5000/conversation", {
          headers: { Authorization: `Bearer ${tokenUser}` },
        });
        setConversation(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/conversation", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConversation(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getMessages = async () => {
    if (tokenUser) {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${currentChat?._id}`,
          {
            headers: { Authorization: `Bearer ${tokenUser}` },
          }
        );
        setMessages(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${currentChat?._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const message = {
      text: newMessage,
      conversationId: currentChat._id,
    };

    if (tokenUser) {
      try {
        const res = await axios.post(
          "http://localhost:5000/messages",
          message,
          {
            headers: { Authorization: `Bearer ${tokenUser}` },
          }
        );
        setMessages([...messages, res.data.result]);
        setNewMessage("");
        sendMessage(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      try {
        const res = await axios.post(
          "http://localhost:5000/messages",
          message,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages([...messages, res.data.result]);
        setNewMessage("");
        sendMessage(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handelUserInfo=async()=>{
  if (userId) {
    try {
      const result = await axios.get(
        `http://localhost:5000/users/${userId}`
      );
      if (result.data) {
        console.log(result.data);
        setInfo(result.data.result)
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
      }
      
  }
  }
  if (employeeId) {
    try {
      const result = await axios.get(
        `http://localhost:5000/employees/${employeeId}`
      );
      if (result.data) {
        console.log(result.data);

        setInfo(result.data.result)
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
      }
      
  }
}
}
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">QuickChat</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={info?.img?info.img:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">{info?.firstname}</div>
            <div className="text-xs text-gray-500">{info?.lastname}</div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {conversations?.length}
              </span>
            </div>
            {conversations &&
              conversations.map((con) => {
                return (
                  <div
                    key={con._id}
                    onClick={() => {
                      setTo(con.members);
                      setCurrentChat(con);
                    }}
                  >
                    <Conversation conversations={con} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          {currentChat ? (
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4 max-h-[calc(100%-4rem)] overflow-y-auto min-h-[4rem]">
        {messages.map((message, index) => (
  <div
    ref={scroll}
    key={index}
    className={`${
      message?.sender === userId || message?.sender === employeeId
        ? "col-start-1 col-end-8 p-3 rounded-lg ml-auto"
        : "col-start-6 col-end-13 p-3 rounded-lg"
    }`}
  >
    <div className="flex flex-row items-center">
      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${message?.sender === userId || message?.sender === employeeId ? "bg-indigo-500" : "bg-indigo-100"} flex-shrink-0`}>
        {message?.sender === userId || message?.sender === employeeId
          ? "You"
          : "Other"}
      </div>
      <div
        className={`relative ml-3 text-sm py-2 px-4 shadow rounded-xl ${message?.sender === userId || message?.sender === employeeId ? "bg-indigo-500 text-gray-800" : "bg-indigo-100 text-gray-800"}`}
      >
        <div>{message.text}</div>
      </div>
    </div>
  </div>
))}

          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4  ">
            <div >
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full bottom-0">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                onClick={handelSubmit}
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
          ) : (
            <div>please Open Chat</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages

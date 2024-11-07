import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useUser } from "../../contexts/UserContext";
import { SOCKET_URL } from "../../api/config";

export const ChatroomPage = () => {
  const { chatroomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatroomName, setChatroomName] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const location = useLocation();
  const socketRef = useRef(null);

  useEffect(() => {
    if (location.state?.name) {
      setChatroomName(location.state.name);
    }

    // 소켓 연결 초기화
    const socket = io(SOCKET_URL, { withCredentials: true });
    socketRef.current = socket;

    if (user) {
      setLoading(false);
      socket.on("connect", () => {
        console.log("[Socket: connect] Chatroom ID: ", chatroomId);
        socket.emit("initialMessage", { chatroom_id: chatroomId });
        socket.emit("join", { chatroom_id: chatroomId });
        console.log("[Socket: Connect] Connected to socket.io server!");
      });

      socket.on("initialMessage", (messages) => {
        console.log("[Socket: initialMessage] Initial Messages: ", messages);
        if (messages) setMessages(messages);
      });

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("error", (error) => console.error(error));
    } else {
      console.log("[ChatroomPage] User is not logged in.");
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("initialMessage");
        socket.off("message");
        socket.emit("leave", { chatroom_id: chatroomId });
        socket.disconnect();
        console.log(
          "[useEffect Disconnect] Disconnected from socket.io server!"
        );
      }
    };
  }, [user, chatroomId, location.state]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        chatroom_id: chatroomId,
        type: "text",
        text: newMessage,
      };
      socketRef.current.emit("message", message);
      setNewMessage("");
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {!loading && (
        <div className="flex flex-col h-screen bg-gradient-to-b from-white to-blue-300">
          <div className="bg-blue-600 text-white p-4 text-center font-bold text-lg shadow-md">
            {chatroomName}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.user_id === user.user_id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.user_id === user.user_id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    } shadow-lg transition-transform transform hover:scale-105`}
                  >
                    <p className="text-sm font-semibold">
                      From :{message.user_id}
                    </p>
                    <p className="break-words">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                수신된 메시지가 없습니다.
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white border-t flex items-center shadow-md"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              전송
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

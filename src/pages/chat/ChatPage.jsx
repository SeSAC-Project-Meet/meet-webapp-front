import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useUser } from "../../contexts/UserContext.jsx";
import { SOCKET_URL } from "../../api/config.js";
import { isUserInChatroom } from "../../api/services/isUserInChatroom.js";

export const ChatPage = () => {
  const { chatroomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatroomName, setChatroomName] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeChatroom = async () => {
      if (location.state?.name) {
        setChatroomName(location.state.name);
      }

      if (user?.user_id) {
        console.log(
          "[ChatPage] 사용자가 식별되어 채팅방 접근 권한을 확인합니다."
        );
        const userCheck = await isUserInChatroom(chatroomId);
        if (!userCheck) {
          navigate("/chat");
          return;
        }
        console.log(
          "[ChatPage] 접근권한 검증이 완료되었습니다..",
          userCheck
        );
        // 소켓 연결 초기화
        const socket = io(SOCKET_URL, { withCredentials: true });
        socketRef.current = socket;

        socket.on("unauthorized", (msg) => {
          console.error(
            "[Socket: Unauthorized] 소켓 연결을 끊습니다.. 사유 : ",
            msg
          );
          socket.disconnect();
        });

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

        socket.on("userJoinn", (message) => {
          console.log("[Socket: userJoin] User Joined: ", message);
        });

        socket.on("userLeave", (message) => {
          console.log("[Socket: userLeave] User Left: ", message);
        });

        socket.on("error", (error) => console.error(error));
      } else {
        console.log("[ChatPage] User is not logged in.");
      }
    };

    initializeChatroom();

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off("initialMessage");
        socketRef.current.off("message");
        socketRef.current.disconnect();
        console.log(
          "[useEffect Disconnect] Disconnected from socket.io server!"
        );
      }
    };
  }, [user, socketRef]);

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

  const handleLeaveChatroom = () => {
    if (socketRef.current) {
      if (window.confirm("정말 나가시겠습니까?")) {
        socketRef.current.emit("leave", { chatroom_id: chatroomId });
        socketRef.current.disconnect();
        console.error("[handleLeaveChatroom] ${chatroomId} 채팅방을 나갑니다.");
        navigate("/chat");
      }
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // ... 이전 imports와 상태 관리 코드는 동일 ...

  return (
    <div>
      {!loading && (
        <div className="flex flex-col h-screen bg-white">
          {/* 헤더 */}
          <div className="border-b border-gray-200 px-4 py-3 flex items-center">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3">
                {/* 채팅방 이미지를 넣어야 합니다
                1ㄷ1 채팅의 경우 상대방 이미지를,
                그룹 채팅의 경우 따로 처리하는 로직까지만 */}
              </div>
              <span className="font-semibold">{chatroomName}</span>
            </div>
            <button
              onClick={handleLeaveChatroom}
              className="text-red-500 hover:text-red-600 transition"
            >
              나가기
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
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
                  {message.user_id !== user.user_id && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0 self-end"></div>
                  )}
                  <div
                    className={`max-w-[60%] rounded-2xl px-4 py-2 ${
                      message.user_id === user.user_id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                    <p className="text-[10px] mt-1 opacity-60">
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
              <p className="text-center text-gray-400 py-4">
                메시지가 없습니다.
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 메시지 입력 영역 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-gray-200 p-4"
          >
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지 보내기..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button
                type="submit"
                className={`ml-2 text-blue-500 font-semibold ${
                  !newMessage.trim() ? "opacity-50" : "hover:text-blue-600"
                }`}
                disabled={!newMessage.trim()}
              >
                보내기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

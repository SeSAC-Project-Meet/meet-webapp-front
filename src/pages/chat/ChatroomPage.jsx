import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { useUser } from "../../contexts/UserContext";
import { SOCKET_URL } from "../../api/config";

export const ChatroomPage = () => {
  const { chatroomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatroomName, setChatroomName] = useState("");
  const location = useLocation();

  const { user } = useUser(); // useUser 훅을 사용하여 UserContext의 user 상태를 가져옵니다.
  const [userId, setUserId] = useState(""); // user.id를 userId 상태로 설정합니다.

  const socket = useMemo(() => {
    return io(SOCKET_URL, { withCredentials: true });
  }, []);

  useEffect(() => {
    if (location.state?.name) {
      setChatroomName(location.state.name);
    }
    setUserId(user.user_id);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("initialMessage", { chatroom_id: chatroomId });
      console.log("Connected to socket.io server!, chatroomId:", chatroomId);
    });

    socket.on("initialMessage", (messages) => {
      console.log("Got Initial messages:", messages);
      if (messages) setMessages(messages);
    });

    /*
      "message_id",
      "user_id",
      "created_at",
      "type",
      "text",
      "image_url",
    */

    socket.on("message", (message) => {
      console.log("[Socket] Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("error", (error) => {
      console.error("[Socket] Error:", error);
    });

    socket.onAny((event, ...args) => {
      console.log(`[Socket] ${event} received with args`, args);
    });

    return () => {
      socket.off("message"); // 컴포넌트 언마운트 시 이벤트 리스너 제거
      socket.off("error");
    };
  }, [socket, chatroomName]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO : image 전송도 구현해야 함
      socket.emit("message", {
        chatroom_id: chatroomId,
        type: "text",
        text: newMessage,
      });
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 상단 채팅방 이름 */}
      <div className="bg-blue-600 text-white p-4 text-center font-bold">
        {chatroomName}
      </div>

      {/* 메시지 표시 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                // TODO : user_id 수정
                message.user_id === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.user_id === userId
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                } shadow`}
              >
                <p className="text-sm font-semibold mb-1">{message.user_id}</p>
                <p className="break-words">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">수신된 메시지가 없습니다.</p>
        )}
      </div>

      {/* 하단 입력창 및 전송 버튼 */}
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          전송
        </button>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { getChatroomByUserId } from "../../api/getChatroomByUserId";
import { useNavigate } from "react-router-dom";

export const ChatPage = () => {
  const [myChatroom, setMyChatroom] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 내비게이션 기능을 얻습니다.

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getChatroomByUserId();
      console.log("chatrooms : ", chatrooms);
      if (!chatrooms) {
        navigate("/login"); // 로그인 페이지로 이동
      }
      setMyChatroom(chatrooms);
    };

    fetchChatrooms();
  }, [navigate]);

  // 채팅방 클릭 시 호출되는 함수
  const handleChatroomClick = (chatroom) => {
    navigate(`/chat/${chatroom.id}`, { state: { name: chatroom.name } }); // 해당 채팅방으로 이동
  };

  return (
    <div className="flex flex-col items-center bg-bg-primary min-h-screen">
      <h1 className="font-primary text-2xl font-bold text-center mt-6 p-4 text-gray-800">
        Chat Page
      </h1>
      <div className="w-full max-w-md">
        {myChatroom.map((chatroom) => (
          <div
            key={chatroom.id}
            onClick={() => handleChatroomClick(chatroom)} // 클릭 시 채팅방 열기
            className="my-3 p-4 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="font-primary text-lg text-gray-800">
              {chatroom.name}
            </h2>
            <p className="text-gray-600">채팅방 ID: {chatroom.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { getChatroomByUserId } from "../../api/getChatroomByUserId";

export const ChatPage = () => {
  const [myChatroom, setMyChatroom] = useState([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      const chatrooms = await getChatroomByUserId();
      console.log("chatrooms : ", chatrooms);
      setMyChatroom(chatrooms);
    };

    fetchChatrooms();
  }, []);

  return (
    <div>
      <h1>Chat Page</h1>
      {myChatroom.map((chatroom) => (
        <p key={chatroom.id}>{chatroom.name}</p>
      ))}
    </div>
  );
};

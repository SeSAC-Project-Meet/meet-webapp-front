import axios from "axios";
import { GET_CHAT_BY_CHATROOM_ID } from "./config";

export const getChatByChatroomId = async (chatroomId) => {
  try {
    const response = await axios.get(GET_CHAT_BY_CHATROOM_ID, {
      params: { chatroom_id: chatroomId },
    });

    console.log("[getChatByChatroomId] GET chat:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

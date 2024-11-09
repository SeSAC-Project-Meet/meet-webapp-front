import axios from "axios";
import { CREATE_CHATROOM } from "./config";

export const createChatroom = async (chatroom) => {
  try {
    const response = await axios.post(CREATE_CHATROOM, chatroom, {
      withCredentials: true,
    });

    console.log("Chatroom Response:", response.data);
    const { user_chatroom_id, chatroom_id } = response.data;
    return { user_chatroom_id, chatroom_id };
  } catch (error) {
    console.error(
      "Error creating chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

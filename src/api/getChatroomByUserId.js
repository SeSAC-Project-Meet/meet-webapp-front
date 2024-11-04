import axios from "axios";
import { GET_CHATROOM_BY_USER_ID } from "./config";

export const getChatroomByUserId = async () => {
  try {
    const response = await axios.get(GET_CHATROOM_BY_USER_ID, {
      withCredentials: true,
    });

    console.log("Chatroom Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

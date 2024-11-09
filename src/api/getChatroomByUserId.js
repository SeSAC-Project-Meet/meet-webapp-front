import meet from "./checkAuthorized.js";
import { GET_CHATROOM_BY_USER_ID } from "./config";

export const getChatroomByUserId = async () => {
  try {
    const response = await meet.get(GET_CHATROOM_BY_USER_ID, {
      withCredentials: true,
    });

    console.log(
      "[getChatroomByUserId] 토큰으로 유저 아이디를 추출해, 현재 들어가있는 채팅방을 보여줍니다 :",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chatroom:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

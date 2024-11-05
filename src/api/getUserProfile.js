import axios from "axios";
import { GET_USER_PROFILE } from "./config";

export const getUserProfile = async () => {
  try {
    const response = await axios.get(GET_USER_PROFILE, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });

    // TODO: response가 무엇을 가지고 오는지 확인
    console.log("Get User Profile Response:", response.data);
    const { username, user_id } = response.data;

    return { username, user_id }; // username을 반환
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("User not authenticated");
      return null;
    }
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error.message
    );
    return null; // 오류 발생 시 null 반환
  }
};

/*
response : 
accessToken :
refreshToken :
*/

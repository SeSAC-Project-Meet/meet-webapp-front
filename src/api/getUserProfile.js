import axios from "axios";
import { GET_USER_PROFILE } from "./config";

export const getUserProfile = async () => {
  try {
    const response = await axios.get(GET_USER_PROFILE, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });

    // TODO: response가 무엇을 가지고 오는지 확인
    console.log("User Profile Response:", response.data);

    return response.data.username; // username을 반환
  } catch (error) {
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

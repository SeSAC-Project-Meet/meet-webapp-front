import axios from "axios";
import { GET_USER_PROFILE } from "./config";

export const getUserProfile = async () => {
  try {
    const response = await axios.get(GET_USER_PROFILE, {
      withCredentials: true, // 쿠키를 포함하도록 설정
    });

    // TODO: response가 무엇을 가지고 오는지 확인
    console.log("User Profile Response:", response.data);

    // 예: response.data.username이 사용자 이름이라고 가정
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

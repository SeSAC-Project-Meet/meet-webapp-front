import axios from "axios";
import { KAKAO_LOGIN } from "./config";

export const requestKakaoLogin = async () => {
  const response = await axios.get(KAKAO_LOGIN);
  console.log(response);
  return response;
};

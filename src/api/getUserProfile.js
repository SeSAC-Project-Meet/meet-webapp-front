import axios from "axios";
import { GET_USER_PROFILE } from "./config";

export const getUserProfile = async (accessToken) => {
  const response = await axios.get(GET_USER_PROFILE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  // TODO : response가 무엇을 가지고 오는지 안 써있음 ..
  // 만료된 accessToken일 경우 refreshToken으로 reissueToken.
  return "TODO: username";
  // setUser로 바로 연동됨, 생각해서 return값 정하기.
};

/*
response : 
accessToken :
refreshToken :
*/

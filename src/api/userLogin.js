import axios from "axios";
import { USER_LOGIN } from "./config";

export const userLogin = async (loginID, password) => {
  const response = await axios.post(USER_LOGIN, {
    loginID: loginID,
    password: password,
  });

  // const { accessToken, refreshToken } = response.data;
  // setTokensToLocalStorage(accessToken, refreshToken);

  // console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}`);
  console.log("response : ", response.data);
  const { username } = response.data.user;

  return username;
};

/*
response : 
accessToken :
refreshToken :
*/

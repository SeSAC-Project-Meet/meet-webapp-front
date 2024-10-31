import axios from "axios";
import { POST_REISSUE_TOKEN } from "./config";
import { setTokensToLocalStorage } from "../services/setTokensToLocalStorage";

export const reissueToken = async (accessToken, refreshToken) => {
  const response = await axios.post(POST_REISSUE_TOKEN, {
    Headers: {
      Authorization: `Bearer ${accessToken}`,
      "Refresh-Token": refreshToken,
    },
  });

  const { newAccessToken, newRefreshToken } = response.data;
  setTokensToLocalStorage(newAccessToken, newRefreshToken);

  // remove this line
  console.log(
    `accessToken: ${newAccessToken}, refreshToken: ${newRefreshToken}`
  );

  return true;
};

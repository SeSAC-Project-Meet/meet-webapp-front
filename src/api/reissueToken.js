import meet from "./checkAuthorized.js";
import { POST_REISSUE_TOKEN } from "./config";
import { setTokensToLocalStorage } from "../services/setTokensToLocalStorage";

export const reissueToken = async (accessToken, refreshToken) => {
  try {
    const response = await meet.post(POST_REISSUE_TOKEN, {
      Headers: {
        Authorization: `Bearer ${accessToken}`,
        "Refresh-Token": refreshToken,
      },
    });

    const { newAccessToken, newRefreshToken } = response.data;
    setTokensToLocalStorage(newAccessToken, newRefreshToken);

    return true;
  } catch (error) {
    console.error("Error reissuing token:", error);
    return false;
  }
};

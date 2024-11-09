import meet from "./checkAuthorized.js";
import { USER_LOGIN } from "./config";

export const userLogin = async (loginID, password) => {
  try {
    const response = await meet.post(
      USER_LOGIN,
      {
        loginID: loginID,
        password: password,
      },
      { withCredentials: true }
    );

    console.log("response : ", response.data);
    const { user_id, username } = response.data.user;


    return { user_id, username };
  } catch (error) {
    console.error("Error during user login:", error);
    throw error;
  }
};

import meet from "./checkAuthorized.js";
import { USER_LOGIN } from "./config";

export const handleUserLogin = async (loginID, password) => {
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
    if (error.response.status === 401) {
      console.error("잘못된 아이디 또는 비밀번호를 입력했습니다.");
      alert("잘못된 아이디 또는 비밀번호를 입력했습니다.");
      return null;
    }
    console.error("로그인 요청 중 에러가 발생했습니다.:", error);
    alert(
      `로그인 요청 중 에러가 발생했습니다. 관리자에게 문의하세요\nError Code: ${error.response.status}\nMessage: ${error.message}`
    );
    return null;
  }
};

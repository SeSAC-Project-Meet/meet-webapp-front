import { API_URL, KAKAO_LOGIN } from "./config";

export const requestKakaoLogin = () => {
  return new Promise((resolve, reject) => {
    window.open(KAKAO_LOGIN, "resizable=no,location=no,scrollbars=yes");

    const messageHandler = (event) => {
      if (event.origin !== API_URL) return; // 서버 주소 확인
      console.log("[requestKakaoLogin] event.data:", event.data);

      // 사용자가 등록되지 않은 경우
      if ("not_registered_user" in event.data) {
        const { user } = event.data.not_registered_user;
        console.log(
          "[requestKakaoLogin] User not found, please redirect to register page"
        );
        resolve({ status: false, user: user }); // Promise 해결
      } else {
        const { user } = event.data;
        resolve({ status: true, user: user }); // Promise 해결
      }

      // 이벤트 리스너 제거 (한 번만 처리)
      window.removeEventListener("message", messageHandler);
    };

    window.addEventListener("message", messageHandler);
  });
};

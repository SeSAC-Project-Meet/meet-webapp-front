import { API_URL, KAKAO_LOGIN } from "./config";

export const requestKakaoLogin = () => {
  return new Promise((resolve) => {
    window.open(KAKAO_LOGIN, "resizable=no,location=no,scrollbars=yes");

    const messageHandler = (event) => {
      const allowedOrigins = [
        API_URL,
        "http://192.168.35.254:5173",
        "http://localhost:5173",
      ];
      if (allowedOrigins.includes(event.origin) === false) {
        console.error("[requestKakaoLogin] Invalid origin: ", event.origin);
        return; // 서버 주소 확인
      }
      console.log("[requestKakaoLogin] event.data:", event.data);
      console.log("[requestKakaoLogin] event.origin:", event.origin);

      // 사용자가 등록되지 않은 경우
      if ("not_registered_user" in event.data) {
        const { email } = event.data.not_registered_user;
        console.log(
          "[requestKakaoLogin] User not found, please redirect to register page"
        );
        resolve({ status: false, user: { email } }); // Promise 해결
        setTimeout(() => window.location.reload(), 500);
      } else {
        const { user_id, username } = event.data;
        resolve({ status: true, user: { user_id, username } }); // Promise 해결
        setTimeout(() => window.location.reload(), 500);
      }

      // 이벤트 리스너 제거 (한 번만 처리)
      window.removeEventListener("message", messageHandler);
    };

    window.addEventListener("message", messageHandler);
  });
};

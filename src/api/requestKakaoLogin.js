import { API_URL, KAKAO_LOGIN } from "./config";

export const requestKakaoLogin = async () => {
  const popup = window.open(
    KAKAO_LOGIN,
    // "카카오 로그인", // 활성화하면 팝업으로 열림, 그럼 아래 width 등 설정필요
    "resizable=no,location=no,scrollbars=yes"
  );

  window.addEventListener("message", (event) => {
    if (event.origin !== API_URL) return; // 서버 주소 확인
    const { user, error } = event.data;
    if (user) {
      console.log("로그인 성공:", user);
    } else if (error) {
      console.error("로그인 실패:", error);
    }
  });
};

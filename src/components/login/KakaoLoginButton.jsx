import { handleKakaoLogin } from "../../api/auth/user/handleKakaoLogin.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext.jsx";

export function KakaoLoginButton() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleKakaoLogin = async () => {
    try {
      const user = await handleKakaoLogin();
      console.log("[kakao-login] user : ", user);
      if (user.status) {
        // 로그인 성공
        console.log("[kakao-login] Found user : ", user.user);
        setUser({ user_id: user.user.user_id, username: user.user.username });
        navigate("/");
      } else {
        // 로그인 실패
        console.log("[kakao-login] Unregistered user : ", user.user);
        // 회원가입 페이지로 리다이렉트
        navigate("/register/terms", {
          state: { type: "kakao", user: user.user.email },
        });
      }
    } catch (err) {
      console.error("[kakao-login] ERR : ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full shadow-md flex px-4 py-2 items-center justify-center text-text-primary bg-[#fee500] rounded-md hover:bg-yellow-400" // 색상 변경
    >
      <div className="w-6 h-6 mr-3">
        <img src="/images/kakaoLoginButton.svg" />
      </div>
      <div className="text-center text-black text-[15px] font-['Apple SD Gothic Neo'] leading-snug">
        카카오톡으로 시작하기
      </div>
    </button>
  );
}

import { requestKakaoLogin } from "../../api/requestKakaoLogin";

const handleKakaoLogin = async () => {
  try {
    const user = await requestKakaoLogin();
    if (user) {
      // 로그인 성공
      console.log("[kakao-login] user : ", user);
    }
  } catch (err) {
    console.error("[kakao-login] ERR : ", err);
  }
};

export default function KakaoLoginButton() {
  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full flex px-4 py-2 items-center justify-center text-text-primary bg-[#fee500] rounded-md hover:bg-yellow-400" // 색상 변경
    >
      <div className="w-6 h-6 mr-3">
        <img src="/images/kakaoLoginButton.svg" />
      </div>
      <div className="text-center text-black text-[15px] font-['Apple SD Gothic Neo'] leading-snug">
        카카오톡으로 로그인
      </div>
    </button>
  );
}

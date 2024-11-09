import { useNavigate } from "react-router-dom";

export function PhoneLoginButton() {
  const navigate = useNavigate();
  const handlePhoneLogin = () => {
    navigate("/login/local");
  };
  return (
    <button
      type="button"
      className="shadow-md w-full flex px-4 py-2 items-center justify-center text-text-primary bg-white rounded-md hover:bg-gray-100" // 색상 변경
      onClick={handlePhoneLogin}
    >
      <div className="w-6 h-6 mr-4">
        <img src="/images/phoneLoginButton.svg" />
      </div>
      <div className="text-center text-black text-[15px] font-['Apple SD Gothic Neo'] leading-snug">
        전화번호로 시작하기
      </div>
    </button>
  );
}

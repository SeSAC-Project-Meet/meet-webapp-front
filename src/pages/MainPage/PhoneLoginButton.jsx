export default function PhoneLoginButton() {
  return (
    <button
      type="submit"
      className="w-full flex px-4 py-2 items-center justify-center text-text-primary bg-white rounded-md hover:bg-button-bg-hover focus:outline-none focus:ring focus:ring-1 focus:ring-button-border-focused" // 색상 변경
    >
      <div className="w-6 h-6 mr-3">
        <img src="src/pages/MainPage/phone-logo.svg" />
      </div>
      <div className="text-center text-black text-[15px] font-['Apple SD Gothic Neo'] leading-snug">
        전화번호로 로그인
      </div>
    </button>
  );
}

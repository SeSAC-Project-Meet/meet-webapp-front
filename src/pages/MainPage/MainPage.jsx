import MainLogo from "./MainLogo";
import KakaoLoginButton from "./KakaoLoginButton";
import PhoneLoginButton from "./PhoneLoginButton";
import SubToggle from "./SubToggle";

export default function MainPage() {
  return (
    <div className="w-[430px] h-[932px] relative bg-white">
      <div className="left-[37px] top-[176px] absolute text-black text-[50px] font-normal font-['Gmarket_Sans']">
        Project: Meet
      </div>
      <div className="w-[300px] h-[45px] px-3.5 left-[65px] top-[411.50px] absolute bg-[#fee500] rounded-xl justify-center items-center inline-flex">
        <div className="w-[18px] h-[18px] relative">
          <img src="src/pages/MainPage/kakao-loginbutton-logo.svg" />
        </div>
        <div className="px-5 justify-center items-center gap-2 flex">
          <div className="text-black/90 text-[15px] font-semibold font-['Apple SD Gothic Neo'] leading-snug">
            카카오톡으로 로그인
          </div>
        </div>
      </div>
      <div className="w-[300px] h-[45px] left-[65px] top-[479px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
        <div className="self-stretch h-[45px] px-3.5 bg-white rounded-xl border border-black justify-center items-center inline-flex">
          <div className="w-6 h-6 relative">
            <img src="src/pages/MainPage/phone-logo.svg" />
          </div>
          <div className="w-[150px] text-center text-black text-[15px] font-semibold font-['Apple SD Gothic Neo'] leading-snug">
            전화번호로 로그인
          </div>
        </div>
      </div>
      <div className="left-[113.50px] top-[549.27px] absolute text-center text-[#777777] text-xs font-semibold font-['Apple SD Gothic Neo'] leading-[18px]">
        아이디 찾기 | 비밀번호 찾기 | 회원가입하기
      </div>
    </div>
  );
}

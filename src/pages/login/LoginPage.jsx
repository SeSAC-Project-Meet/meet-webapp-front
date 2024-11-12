import { KakaoLoginButton } from "../../components/login/KakaoLoginButton.jsx";
import { PhoneLoginButton } from "../../components/login/PhoneLoginButton.jsx";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-9 ">
        <h2 className="text-2xl font-primary font-bold text-center text-text-primary">
          Project: Meet
        </h2>
        <div className="m-6 space-y-5">
          <KakaoLoginButton />
          <PhoneLoginButton />
        </div>
      </div>
    </div>
  );
}

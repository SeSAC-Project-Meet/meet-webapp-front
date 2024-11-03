import { KakaoLoginButton } from "./KakaoLoginButton";
import { PhoneLoginButton } from "./PhoneLoginButton";

export function LoginSelectMethodPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-9 bg-container-bg-primary rounded-lg shadow-md">
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

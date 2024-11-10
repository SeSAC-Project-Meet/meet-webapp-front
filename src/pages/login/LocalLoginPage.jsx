import { useState, useEffect } from "react";
import { handleUserLogin } from "../../api/handleUserLogin";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel";
import { CustomSubmitButton } from "../../components/CustomSubmitButton";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck";
import useFormattedPhoneNumber from "../../hooks/useFormattedPhoneNumber";

export const LocalLoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const { user, setUser } = useUser();

  useEffect(() => {
    if (password.includes(" ") || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(password)) {
      setPassword(password.replace(/[\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    }
  }, [password]);

  useFormattedPhoneNumber(phoneNumber, setPhoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checked_user = await handleUserLogin(phoneNumber, password);
    if (checked_user) {
      setUser(checked_user);
      console.log("[LocalLoginPage] user : ", user, checked_user);
      alert(`환영합니다, ${checked_user.username} 님!`);
      navigate("/");
    } else {
      setPhoneNumber("");
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-container-bg-primary rounded-lg shadow-md">
        <h2 className="text-2xl font-primary font-bold text-center text-text-primary">
          Meet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInputFieldWithLabel
            label="전화번호"
            type="text"
            placeholder="전화번호를 입력하세요"
            getter={phoneNumber}
            setter={setPhoneNumber}
          />

          <div>
            <label className="block mb-1 font-medium text-sm text-text-primary">
              비밀번호
            </label>

            <CustomPwFieldWithCheck getter={password} setter={setPassword} />
          </div>
          <div className="flex justify-end space-x-2 text-sm text-text-secondary">
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/find/id");
              }}
            >
              아이디 찾기
            </button>
            <span className="text-text-secondary">|</span>
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/find/pw");
              }}
            >
              비밀번호 찾기
            </button>
            <span className="text-text-secondary">|</span>
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/register");
              }}
            >
              회원가입
            </button>
          </div>
          <CustomSubmitButton text="로그인" />
        </form>
      </div>
    </div>
  );
};

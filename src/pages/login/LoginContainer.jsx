import { useState } from "react";
import { userLogin } from "../../api/userLogin";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel";
import { CustomSubmitButton } from "../../components/CustomSubmitButton";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck";
import KakaoLoginButton from "./KakaoLoginButton";
import PhoneLoginButton from "./PhoneLoginButton";

export const LoginContainer = () => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate("");

  const { user, setUser } = useUser();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "비밀번호는 최소 8자 이상이어야 합니다.";
    }
    if (!/^[a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?-]+$/.test(password)) {
      return "비밀번호는 영문, 숫자, 특수문자만으로 구성되어야 합니다.";
    }
    if (!/\d/.test(password)) {
      return "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
    } else {
      setPasswordError("");
      // console.log("로그인 시도:", { loginID, password });
      // alert(`로그인 시도!\n이메일 : ${loginID}\n비밀번호 : ${password}`);
      try {
        const checked_user = await userLogin(loginID, password);
        setUser(checked_user);
        console.log("[LoginContainer] user : ", user, checked_user);
        navigate("/");
      } catch (err) {
        // console.error(err);
        // 실패시 state 공백화
        setLoginID("");
        setPassword("");
        alert(`로그인 실패!\nError : ${err}`);
      }
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
            label="아이디"
            type="text"
            placeholder="아이디를 입력하세요"
            getter={loginID}
            setter={setLoginID}
          />

          <div>
            <label className="block mb-1 font-medium text-sm text-text-primary">
              비밀번호
            </label>

            <CustomPwFieldWithCheck
              getter={password}
              setter={setPassword}
              errGetter={passwordError}
            />
          </div>
          <div className="flex justify-end space-x-2 text-sm text-text-secondary">
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/findid");
              }}
            >
              아이디 찾기
            </button>
            <span className="text-text-secondary">|</span>
            <button
              type="button"
              className="hover:underline"
              onClick={() => {
                navigate("/resetpassword");
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
          <KakaoLoginButton />
          <PhoneLoginButton />
        </form>
      </div>
    </div>
  );
};

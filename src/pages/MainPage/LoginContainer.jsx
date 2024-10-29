import { useState } from "react";
import { userLogin } from "../../api/userLogin";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel";
import { CustomSubmitButton } from "../../components/CustomSubmitButton";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck";
import KakaoLoginButton from "./KakaoLoginButton";
import PhoneLoginButton from "./PhoneLoginButton";

/*
[아이디], [비밀번호]를 받아 로그인을 진행한다.
로그인 성공 시, 주문 페이지로 이동하여야 한다.
로그인 실패 시, 실패 메시지를 alert로 띄워야 한다.
*/

export const LoginContainer = () => {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate("");

  const { setUser } = useUser();

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
        const user = await userLogin(loginID, password);
        setUser(user);
        navigate("/order");
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
                alert("아이디 찾기 페이지로!");
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
                alert("비밀번호 찾기 페이지로!");
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
                alert("회원가입 페이지로!");
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../api/userRegister";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck";
import { CustomSubmitButton } from "../../components/CustomSubmitButton";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      return;
    }
    setPasswordError("");
    try {
      await userRegister({
        name,
        email,
        phone_number: phoneNumber,
        password,
      });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(`회원가입 실패!\nError : ${err}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          회원가입
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInputFieldWithLabel
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            getter={name}
            setter={setName}
          />

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              비밀번호
            </label>
            <CustomPwFieldWithCheck
              getter={password}
              setter={setPassword}
              errGetter={passwordError}
            />
          </div>

          <CustomInputFieldWithLabel
            label="전화번호"
            type="tel"
            placeholder="전화번호를 입력해주세요."
            getter={phoneNumber}
            setter={setPhoneNumber}
          />
          <CustomInputFieldWithLabel
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            getter={email}
            setter={setEmail}
          />
          <CustomSubmitButton text="회원가입" />
        </form>
      </div>
    </div>
  );
};

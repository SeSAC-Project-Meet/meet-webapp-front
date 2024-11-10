import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userRegister } from "../../api/userRegister";
import { CustomInputFieldWithLabel } from "../../components/CustomInputFieldWithLabel";
import { CustomPwFieldWithCheck } from "../../components/CustomPwFieldWithCheck";
import { CustomSubmitButton } from "../../components/CustomSubmitButton";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [presetEnabled, setPresetEnabled] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);
  const [isUniquePhoneNumber, setIsUniquePhoneNumber] = useState(false);

  const location = useLocation();
  useEffect(() => {
    console.log("location : ", location.state);
    // TODO : type에 따른 구별 처리 및 정보를 자동으로 채웠을 떄에는 disabled 처리
    if (location.state) {
      setEmail(location.state?.email || "");
      setPresetEnabled(true);
      setIsUniqueEmail(true);
    }
  }, [location]);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      return "이름은 한글 또는 영어만 입력 가능합니다.";
    }
    return "";
  };

  const validatePassword = (password) => {
    // 비밀번호가 영문, 숫자, 특수문자로만 이루어져 있는지 확인
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;

    if (!regex.test(password)) {
      return "비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 각각 최소 1자 이상 포함해야 합니다.";
    }

    return "";
  };

  const validatePhoneNumberFormat = (phoneNumber) => {
    // 한국 전화번호 정규식: 010, 011, 016, 017, 018, 019, 02, 031, 032, 033 등
    const phoneRegex =
      /^(010|011|016|017|018|019|02|031|032|033|034|041|042|043|044|051|052|053|054|055|061|062|063|064|070)-\d{3,4}-\d{4}$/;

    if (!phoneRegex.test(phoneNumber)) {
      return "전화번호는 010-123(4)-5678 형식으로 입력해주세요.";
    }

    return "";
  };

  const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "유효한 이메일 주소를 입력해주세요.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      name: validateName(name),
      password: validatePassword(password),
      phoneNumber: validatePhoneNumberFormat(phoneNumber),
      email: validateEmailFormat(email),
    };

    if (Object.values(errors).some((error) => error)) {
      console.log("errors : ", errors);
      setNameError(errors.name);
      setPasswordError(errors.password);
      setPhoneNumberError(errors.phoneNumber);
      setEmailError(errors.email);
      return;
    }

    setPasswordError("");
    setPhoneNumberError("");
    setEmailError("");
    try {
      const registerResult = await userRegister({
        name,
        email,
        phone_number: phoneNumber,
        password,
      });
      if (!registerResult.status) {
        alert("회원가입에 실패했습니다.\n" + registerResult.message);
        return;
      } else {
        alert("회원가입 성공!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert(`회원가입 에러 발생!\nError : ${err}`);
    }
  };

  useEffect(() => {
    const formatPhoneNumber = (value) => {
      // 숫자만 남기기
      const numbers = value.replace(/[^0-9]/g, "");

      // 시작 번호가 010, 011 등인지 확인
      const isMobile = /^(01[0-9])/.test(numbers);

      if (numbers.length <= 3) {
        return numbers;
      } else if (isMobile) {
        // 모바일 번호 포맷
        if (numbers.length <= 6) {
          return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length === 10) {
          // '010-123-1234' 형식
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
        } else {
          // '010-1234-5678' 형식
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }
      } else {
        // 지역번호 포맷
        const areaCode = numbers.startsWith("02")
          ? numbers.slice(0, 2)
          : numbers.slice(0, 3);
        const mainNumber = numbers.startsWith("02")
          ? numbers.slice(2)
          : numbers.slice(3);

        if (areaCode === "02") {
          // 서울 (02) 지역번호
          return mainNumber.length <= 3
            ? `${areaCode}-${mainNumber}`
            : `${areaCode}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3, 7)}`;
        } else {
          // 다른 지역번호 (031, 032 등)
          return mainNumber.length <= 4
            ? `${areaCode}-${mainNumber}`
            : `${areaCode}-${mainNumber.slice(0, 3)}-${mainNumber.slice(3, 7)}`;
        }
      }
    };

    if (phoneNumber) {
      const formattedNumber = formatPhoneNumber(phoneNumber);
      if (formattedNumber !== phoneNumber) {
        setPhoneNumber(formattedNumber);
      }
    }
  }, [phoneNumber]);

  useEffect(() => {
    // Remove spaces from name, password, and email
    if (name.includes(" ")) {
      setName(name.replace(/\s/g, ""));
    }
    if (password.includes(" ") || /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(password)) {
      setPassword(password.replace(/[\sㄱ-ㅎㅏ-ㅣ가-힣]/g, ""));
    }
    if (email.includes(" ")) {
      setEmail(email.replace(/\s/g, ""));
    }
  }, [name, password, email]);

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
            checkFormat
            checkFormatGetter={nameError}
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
            checkUnique
            checkDataType="phone_number"
            isUniqueSetter={setIsUniquePhoneNumber}
            checkFormat
            checkFormatGetter={phoneNumberError}
            unuqueTrueMessage="사용 가능한 전화번호입니다."
          />
          <CustomInputFieldWithLabel
            label="이메일"
            type="text"
            placeholder="이메일을 입력해주세요."
            getter={email}
            setter={setEmail}
            disabled={presetEnabled}
            checkUnique
            checkDataType="email"
            isUniqueSetter={setIsUniqueEmail}
            checkFormat
            checkFormatGetter={emailError}
            uniqueTrueMessage="사용 가능한 이메일입니다."
          />
          <CustomSubmitButton
            text="회원가입"
            isDisabled={!isUniqueEmail || !isUniquePhoneNumber}
            disabledText="중복확인을 해주세요."
          />
        </form>
      </div>
    </div>
  );
};

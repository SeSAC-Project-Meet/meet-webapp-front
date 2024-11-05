import { useState } from "react";
import { checkUniqueValue } from "../api/checkUniqueValue";

export const CustomInputFieldWithLabel = ({
  className,
  label,
  type,
  placeholder,
  disabled,
  getter,
  setter,
  checkUnique,
  checkDataType,
  isUniqueSetter,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [verificationClicked, setVerificationClicked] = useState(false);
  const handleValidationClick = async () => {
    const result = await checkUniqueValue(checkDataType, getter);
    console.log("result : ", result);
    setIsValid(result);
    setVerificationClicked(true);
    isUniqueSetter(result);
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={label} // id와 일치하게 수정
          className="block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={label}
          value={getter}
          onChange={(e) => setter(e.target.value)}
          required
          className={`mt-1 block w-full px-4 py-2 border border-input-border rounded-md ${
            disabled ? "bg-gray-200" : "bg-input-bg"
          } hover:outline hover:outline-1 hover:outline-input-border-hover focus:outline-none focus:ring focus:ring-1 focus:ring-input-border-focused`}
          placeholder={disabled ? getter : placeholder} // disabled일 때 placeholder 메시지 수정
          disabled={disabled}
        />
        {checkUnique && (
          <button
            type="button"
            onClick={handleValidationClick}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-m text-text-secondary"
          >
            중복확인
          </button>
        )}
      </div>
      {checkUnique && verificationClicked && (
        <p
          className={`mt-1 text-sm ${
            isValid ? "text-green-500" : "text-red-500"
          }`}
        >
          {isValid
            ? "사용이 가능한 값입니다."
            : "이미 사용중이거나 불가능한 값입니다."}
        </p>
      )}
    </div>
  );
};

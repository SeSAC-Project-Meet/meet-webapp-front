import React from "react";

const CheckBox = ({ isChecked, setIsChecked }) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div onClick={handleToggle} style={{ cursor: "pointer" }}>
      <img
        src={isChecked ? "/icons/check-true.svg" : "/icons/check-false.svg"}
        alt={isChecked ? "check-true" : "check-false"}
        className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        style={{ width: "40px", height: "40px" }} // 원하는 크기로 조정
      />
    </div>
  );
};

export default CheckBox;

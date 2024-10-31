export const CustomSubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 text-text-primary bg-button-bg-primary rounded-md hover:bg-button-bg-hover focus:outline-none focus:ring focus:ring-1 focus:ring-button-border-focused" // 색상 변경
    >
      {text}
    </button>
  );
};

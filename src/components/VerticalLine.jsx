export const VerticalLine = ({ height, mx }) => {
  return (
    <div
      className={`w-px h-${height ? height : 6} mx-${mx ? mx : 4} bg-[#7b7b7b]`}
    ></div>
  );
};

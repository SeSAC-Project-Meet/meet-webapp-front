import { Header } from "./header/Header";

export const LayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col px-2">
      <Header />
      {children}
    </div>
  );
};

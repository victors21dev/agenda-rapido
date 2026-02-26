import Sidebar from "./Sidebar";

const LayoutDefaultDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[250px_1fr_auto] gap-2 h-full">
      <div>
        <Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default LayoutDefaultDesktop;

import Sidebar from "./Sidebar";

const LayoutDefaultDesktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[250px_1fr_auto] gap-2 h-full">
      <Sidebar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default LayoutDefaultDesktop;

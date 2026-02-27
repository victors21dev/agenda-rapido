import { NavLink, useLocation } from "react-router";

import { Button } from "../ui/button";

type ItemSideBarProps = {
  icon: React.ReactNode;
  label: string;
  redirectPath: string;
};

const ItemSideBar = ({
  icon,
  label,
  redirectPath,
}: ItemSideBarProps & { redirectPath: string }) => {
  const location = useLocation();
  const active = redirectPath === location.pathname;

  return (
    <Button
      asChild
      variant={active ? "outline" : "ghost"}
      className={"flex items-center gap-4 py-6 w-full justify-start rounded-xl"}
    >
      <NavLink to={redirectPath}>
        {icon}
        <div>{label}</div>
      </NavLink>
    </Button>
  );
};

export default ItemSideBar;

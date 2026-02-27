import { ModeToggle } from "./ModeToggle";

type HeaderProps = {
  title: string;
  description: string;
};

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between">
      <div>
        <h1 className="text-lg font-bold ">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        Tema
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;

import Logo from "./Logo";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="shadow-md py-4">
      <div className="flex justify-between items-center container mx-auto">
        <Logo />
        <Menu />
      </div>
    </div>
  );
};

export default Header;

import { getUserData } from "@/utils/supabase/serverServices";
import Logo from "./Logo";
import Menu from "./Menu";
import { createClient } from "@/utils/supabase/server";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData();
  return (
    <div className="shadow-md py-4">
      <div className="flex justify-between items-center container mx-auto">
        <Logo />
        <Menu user={user} userData={userData} />
      </div>
    </div>
  );
};

export default Header;

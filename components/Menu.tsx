import { createClient } from "@/utils/supabase/server";
import ButtonLink from "./ui/ButtonLink";
import MiniProfile from "./MiniProfile";
import { getUserData } from "@/utils/supabase/serverServices";

const Menu = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userData = await getUserData();
  return (
    <div className="flex items-center gap-8">
      <ul className="hidden gap-4 text-[20px]  sm:flex">
        <li>
          <a href="#">المقالات</a>
        </li>
        <li>
          <a href="#">الأقسام</a>
        </li>
        <li>
          <a href="#">من نحن</a>
        </li>
      </ul>
      {user ? (
        <MiniProfile user={userData} />
      ) : (
        <ButtonLink title="تسجيل الدخول" href="/login" variant="button" />
      )}
    </div>
  );
};

export default Menu;

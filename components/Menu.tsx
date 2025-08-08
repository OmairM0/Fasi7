import { createClient } from "@/utils/supabase/server";
import ButtonLink from "./ui/ButtonLink";
import MiniProfile from "./MiniProfile";
import { getUserData } from "@/utils/supabase/serverServices";
import Link from "next/link";

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
          <Link href="/posts">المقالات</Link>
        </li>
        <li>
          <Link href="#">الأقسام</Link>
        </li>
        <li>
          <Link href="#">من نحن</Link>
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

"use client";
import { logOut } from "@/utils/supabase/clientServices";
import { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  user: {
    user: User | null;
    data: {
      id: string;
      name: string;
      username: string;
      bio: string | null;
      avatar_url: string | null;
      created_at: string;
      updated_at: string | null;
      role: string;
    } | null;
  };
}

const MiniProfile = ({ user }: IProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const name: string = user.data?.name || "Unknown";
  const router = useRouter();

  const handleLogout = async () => {
    const log = await logOut();
    if (log) {
      router.refresh();
    }
  };

  return (
    <div>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-primary cursor-pointer"
      >
        <p className="font-bold font-sans">
          {name.substring(0, 1).toUpperCase()}
        </p>
      </div>
      {dropdownOpen && (
        <div className="absolute left-2 z-1 min-w-50 min-h-30 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-sm  ring-gray-300/50 py-0 mt-2 *:text-sm *:p-3">
          <p className="border-b-1 border-secondary text-center font-bold">
            {name}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 duration-300">
            الملف الشخصي
          </p>
          <p
            role="button"
            onClick={handleLogout}
            className="flex gap-2 items-center text-turquoise cursor-pointer hover:bg-gray-100 duration-300"
          >
            <LogOut />
            تسجيل الخروج
          </p>
        </div>
      )}
    </div>
  );
};

export default MiniProfile;

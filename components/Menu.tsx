"use client";

import ButtonLink from "./ui/ButtonLink";
import MiniProfile from "./MiniProfile";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { IUser } from "@/types";
import { useState } from "react";

interface IProps {
  user: User | null;
  userData: IUser;
}

const Menu = ({ user, userData }: IProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex items-center gap-4">
      <ul className="hidden gap-4 text-[20px] sm:flex">
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
      {
        <div
          className={`sm:hidden fixed z-10 inset-0 w-full h-full bg-white px-4 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mt-4 relative">
            <X
              onClick={handleToggleMobileMenu}
              className="absolute top-4 left-4 cursor-pointer"
            />
            <ul className="gap-4 text-[20px] flex flex-col">
              <li>
                <Link onClick={handleToggleMobileMenu} href="/posts">
                  المقالات
                </Link>
              </li>
              <li>
                <Link onClick={handleToggleMobileMenu} href="#">
                  الأقسام
                </Link>
              </li>
              <li>
                <Link onClick={handleToggleMobileMenu} href="#">
                  من نحن
                </Link>
              </li>
            </ul>
          </div>
        </div>
      }
      {user ? (
        <MiniProfile user={userData} />
      ) : (
        <ButtonLink title="تسجيل الدخول" href="/login" variant="button" />
      )}
      <MenuIcon onClick={handleToggleMobileMenu} className="sm:hidden" />
    </div>
  );
};

export default Menu;

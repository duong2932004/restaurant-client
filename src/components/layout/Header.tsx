"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import UtilityButtons from "@/utils/btn-utilities";
import { useCurrentUser } from "@/hooks/useAuth";
import Image from "next/image";

export function Header() {
  const t = useTranslations("headers");

  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return "";
  }

  if (isError || !user) {
  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md shadow-md">
      <nav className="flex flex-col sm:flex-row items-center sm:justify-between px-6 py-4 gap-y-4 sm:gap-y-0">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Restaurant
        </Link>

        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-gray-700 font-medium">
          <NavigationMenuDemo />
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-gray-700 font-medium">
          {isLoading ? (
            ""
          ) : isError || !user ? (
            <Link
              href="/account"
              className="hover:text-primary transition font-medium"
            >
              {t("account")}
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-primary transition font-medium"
            >
              <Image
                src={
                  user?.avatar == "" || user?.avatar == null
                    ? "/assets/svgs/user.svg"
                    : "/assets/svgs/user.svg"
                }
                alt="avatar"
                className="rounded-full"
                width={"20"}
                height={"20"}
              />
            </Link>
          )}
          <UtilityButtons />
        </div>
      </nav>
    </header>
  );
}

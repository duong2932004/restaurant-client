"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LoginForm } from "@/components/shadcn/login-form";
import UtilityButtons from "@/utils/btn-utilities";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Headers");
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1];
  const newLocale = currentLocale === "en" ? "vi" : "en";
  const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2 ">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
          <div className="flex items-center gap-2">
            <UtilityButtons />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/images/login/login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale select-none"
          draggable="false"
        />
      </div>
    </div>
  );
}

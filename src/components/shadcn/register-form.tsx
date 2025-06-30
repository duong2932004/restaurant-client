import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const t = useTranslations("register");

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {t("describe")}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">{t("userName")}</Label>
          <Input id="email" type="text" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">{t("password")}</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="re-enter_password">{t("reEnterPassword")}</Label>
          </div>
          <Input id="re-enter_password" type="password" required />
        </div>
        <Link href={"/"}>
          {" "}
          <Button type="submit" className="w-full">
            {t("register")}
          </Button>
        </Link>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            {t("describe2")}
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <img src="/assets/svgs/logo-google.svg" style={{ height: "100%" }} />
          {t("login2")}
        </Button>
      </div>
    </form>
  );
}

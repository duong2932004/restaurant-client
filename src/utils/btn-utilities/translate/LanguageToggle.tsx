import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageToggle() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const newLocale = currentLocale === "en" ? "vi" : "en";
  const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

  return (
    <Link href={newPath}>
      <Button variant="outline" size="icon">
        {newLocale.toUpperCase().slice(0, 2)}
        <span className="sr-only">
          Switch language to {newLocale.toUpperCase()}
        </span>
      </Button>
    </Link>
  );
}

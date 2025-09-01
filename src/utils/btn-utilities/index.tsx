import LanguageToggle from "@/utils/btn-utilities/translate/LanguageToggle";
import DarkModeToggle from "@/utils/btn-utilities/darkMode/ModeToggle";

export default function UtilityButtons() {
  return (
    <div className="flex items-center gap-2">
      {/* <DarkModeToggle /> */}
      <LanguageToggle />
    </div>
  );
}

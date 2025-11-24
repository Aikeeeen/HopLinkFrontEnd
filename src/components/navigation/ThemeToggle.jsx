import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        inline-flex items-center justify-center gap-1.5
        rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-medium
        bg-white text-slate-700 hover:bg-slate-100
        dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800
        transition-colors
      "
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}

import { ChevronDown } from "lucide-react";

export default function SelectField({
  error,
  className = "",
  children,
  ...props
}) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`hl-select ${
          error
            ? "border-red-300 ring-1 ring-red-300 focus:ring-red-400"
            : ""
        } ${className}`}
      >
        {children}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      />
    </div>
  );
}

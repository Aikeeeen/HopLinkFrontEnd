import { Clock } from "lucide-react";

export default function TimeField({
  value,
  onChange,
  error,
  readOnly = false,
  className = "",
  ...rest
}) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="time"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`hl-input-time ${
          error
            ? "border-red-300 ring-1 ring-red-300 focus:ring-red-400"
            : ""
        } ${readOnly ? "bg-slate-50 dark:bg-slate-900/60" : ""}`}
        {...rest}
      />
      <Clock
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      />
    </div>
  );
}

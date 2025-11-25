import { useRef } from "react";
import { Calendar } from "lucide-react";

export default function DateField({ value, onChange, error, ...props }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;

    // Modern browsers (Chromium, Safari 17+) support showPicker
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      // Fallback: focus triggers picker on most mobile browsers
      el.focus();
    }
  };

  return (
    <div className="hl-input-wrap">
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={onChange}
        className={`hl-input-date ${
          error
            ? "border-red-300 ring-1 ring-red-300 focus:ring-red-400"
            : ""
        }`}
        {...props}
      />
      <button
        type="button"
        onClick={openPicker}
        className="hl-input-icon-btn"
        aria-label="Open date picker"
      >
        <Calendar className="h-4 w-4" />
      </button>
    </div>
  );
}

// src/components/rides/OpenGroupChatButton.jsx
import { MessageCircle } from "lucide-react";

export default function OpenGroupChatButton({
  onClick,
  className = "",
  showLabelOnMobile = false,
  variant = "secondary", // "secondary" | "primary"
}) {
  if (!onClick) return null;

  const baseClasses =
    variant === "primary" ? "hl-btn-primary" : "hl-btn-secondary";

  // Label visibility: default = icon-only on mobile, text from sm up.
  // When showLabelOnMobile is true, text is visible on all breakpoints.
  const labelClass = showLabelOnMobile
    ? "inline ml-1"
    : "hidden sm:inline ml-1";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${baseClasses}
        px-3 py-1.5
        text-[11px]
        gap-1
        rounded-full
        sm:rounded-xl
        sm:px-3 sm:py-1.5
        ${className}
      `}
    >
      <MessageCircle className="h-4 w-4" />
      <span className={labelClass}>Open chat</span>
    </button>
  );
}

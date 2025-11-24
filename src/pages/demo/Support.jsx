import { LifeBuoy } from "lucide-react";

export default function Support() {
  return (
    <div className="hl-page">
      <div className="hl-section-title-icon">
        <LifeBuoy className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">Support</h1>
      </div>

      <p className="hl-body mb-6">
        Need help? Our support team is here to assist you with ride issues,
        payments, or general questions about HopLink.
      </p>

      <div className="hl-support-card">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Contact Us
        </h2>
        <p className="text-sm hl-body">
          Email:{" "}
          <a
            href="mailto:support@hoplink.app"
            className="text-indigo-600 hover:underline"
          >
            support@hoplink.app
          </a>
          <br />
          Phone: +1 (800) 555-HOPL
        </p>

        <button className="mt-4 inline-flex items-center gap-2 hl-btn-primary">
          <LifeBuoy className="h-4 w-4" /> Submit a Support Ticket
        </button>
      </div>
    </div>
  );
}

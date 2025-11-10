import { LifeBuoy } from "lucide-react";

export default function Support() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <LifeBuoy className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">Support</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Need help? Our support team is here to assist you with ride issues,
        payments, or general questions about HopLink.
      </p>

      <div className="rounded-xl border bg-white shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">Contact Us</h2>
        <p className="text-sm text-gray-600">
          Email: <a href="mailto:support@hoplink.app" className="text-indigo-600">support@hoplink.app</a><br />
          Phone: +1 (800) 555-HOPL
        </p>

        <button className="mt-4 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
          <LifeBuoy className="h-4 w-4" /> Submit a Support Ticket
        </button>
      </div>
    </div>
  );
}

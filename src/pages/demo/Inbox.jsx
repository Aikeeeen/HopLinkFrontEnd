import { MessageSquare } from "lucide-react";

export default function Inbox() {
  return (
    <div className="hl-page">
      <div className="hl-section-title-icon">
        <MessageSquare className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">Inbox</h1>
      </div>

      <p className="hl-body mb-6">
        This is where you’ll receive ride requests, booking confirmations, and
        messages from other users. Chat features and notifications will appear
        here in the future.
      </p>

      <div className="hl-empty">
        You have no messages yet.
      </div>
    </div>
  );
}

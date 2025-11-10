import { MessageSquare } from "lucide-react";

export default function Inbox() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">Inbox</h1>
      </div>

      <p className="text-gray-600 mb-6">
        This is where you’ll receive ride requests, booking confirmations, and messages from
        other users. Chat features and notifications will appear here in the future.
      </p>

      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
        You have no messages yet.
      </div>
    </div>
  );
}

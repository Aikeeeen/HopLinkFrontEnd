import { Clock } from "lucide-react";

export default function History() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">Ride History</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Here you’ll see all the rides you’ve taken or offered. You’ll be able to review
        past trips, view driver or passenger details, and track your travel statistics.
      </p>

      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
        No past rides yet.
      </div>
    </div>
  );
}

import { Clock } from "lucide-react";

export default function History() {
  return (
    <div className="hl-page">
      <div className="hl-section-title-icon">
        <Clock className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">Ride History</h1>
      </div>

      <p className="hl-body mb-6">
        Here you’ll see all the rides you’ve taken or offered. You’ll be able
        to review past trips, view driver or passenger details, and track your
        travel statistics.
      </p>

      <div className="hl-empty">
        No past rides yet.
      </div>
    </div>
  );
}

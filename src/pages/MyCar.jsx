import { Car } from "lucide-react";

export default function MyCar() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Car className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">My Car</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Manage your car details here. In the future, you’ll be able to add vehicle
        information such as model, plate number, fuel type, and comfort features.
      </p>

      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500">
        You haven’t added a car yet.
      </div>
    </div>
  );
}

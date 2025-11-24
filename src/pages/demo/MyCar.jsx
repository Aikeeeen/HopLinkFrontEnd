import { Car } from "lucide-react";

export default function MyCar() {
  return (
    <div className="hl-page">
      <div className="hl-section-title-icon">
        <Car className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">My Car</h1>
      </div>

      <p className="hl-body mb-6">
        Manage your car details here. In the future, you’ll be able to add
        vehicle information such as model, plate number, fuel type, and comfort
        features.
      </p>

      <div className="hl-empty">
        You haven’t added a car yet.
      </div>
    </div>
  );
}

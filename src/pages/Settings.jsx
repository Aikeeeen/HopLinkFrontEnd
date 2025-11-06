import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Manage your account preferences, notification options, and privacy settings.
        You’ll also be able to change your role or update your profile details here later.
      </p>

      <div className="space-y-3 text-gray-700">
        <div className="rounded-xl border p-4 bg-white shadow-sm">
          <h2 className="font-medium text-slate-800 mb-1">Notifications</h2>
          <p className="text-sm text-gray-600">Email and push notification settings</p>
        </div>
        <div className="rounded-xl border p-4 bg-white shadow-sm">
          <h2 className="font-medium text-slate-800 mb-1">Privacy</h2>
          <p className="text-sm text-gray-600">Control who can see your rides and profile</p>
        </div>
        <div className="rounded-xl border p-4 bg-white shadow-sm">
          <h2 className="font-medium text-slate-800 mb-1">Account</h2>
          <p className="text-sm text-gray-600">Change password or delete your account</p>
        </div>
      </div>
    </div>
  );
}

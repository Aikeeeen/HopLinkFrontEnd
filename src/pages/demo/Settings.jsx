import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <div className="hl-page">
      <div className="hl-section-title-icon">
        <SettingsIcon className="h-6 w-6 text-indigo-600" />
        <h1 className="hl-heading">Settings</h1>
      </div>

      <p className="hl-body mb-6">
        Manage your account preferences, notification options, and privacy
        settings. You’ll also be able to change your role or update your
        profile details here later.
      </p>

      <div className="space-y-3 text-gray-700 dark:text-slate-200">
        <div className="hl-card p-4">
          <h2 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
            Notifications
          </h2>
          <p className="text-sm hl-body">
            Email and push notification settings
          </p>
        </div>
        <div className="hl-card p-4">
          <h2 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
            Privacy
          </h2>
          <p className="text-sm hl-body">
            Control who can see your rides and profile
          </p>
        </div>
        <div className="hl-card p-4">
          <h2 className="font-medium text-slate-800 dark:text-slate-100 mb-1">
            Account
          </h2>
          <p className="text-sm hl-body">
            Change password or delete your account
          </p>
        </div>
      </div>
    </div>
  );
}

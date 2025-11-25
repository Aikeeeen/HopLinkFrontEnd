export default function DemoWarning() {
  return (
    <div className="border-b border-amber-400/40 bg-amber-50 dark:bg-amber-500/10">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-xs text-amber-900 dark:text-amber-100 sm:text-sm">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-300" />
        <span>
          HopLink is currently in <strong>demo mode</strong>. Data is stored
          locally in your browser. Please don&apos;t use real passwords.
        </span>
      </div>
    </div>
  );
}

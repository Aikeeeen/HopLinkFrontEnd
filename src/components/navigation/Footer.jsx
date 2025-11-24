export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm hl-muted">
          © {new Date().getFullYear()} HopLink
        </p>
        <div className="flex items-center gap-4 text-sm hl-muted">
          <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Terms
          </a>
          <a href="#" className="hover:text-slate-700 dark:hover:text-slate-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

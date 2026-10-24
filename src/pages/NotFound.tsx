import { Link } from "react-router";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        {/* الأيقونة */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-amber-500"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          الصفحة دي مش متوفرة
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          الصفحة اللي بتدور عليها مش موجودة دلوقتي، أو اتنقلت، أو مش متاحة
          حالياً.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={"/dashboard"}
            className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            الرئيسية
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            رجوع
          </button>
        </div>
      </div>
    </main>
  );
}

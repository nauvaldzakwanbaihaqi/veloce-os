export default function DashboardLoading() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Alert skeleton */}
      <div className="h-20 rounded-2xl bg-slate-200/50 dark:bg-slate-800/50" />
      
      {/* Header skeleton */}
      <div className="h-48 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="h-56 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div className="h-56 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
          <div className="h-56 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
        </div>
        <div className="h-56 rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
      </div>
    </div>
  );
}

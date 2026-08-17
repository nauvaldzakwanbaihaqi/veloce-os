interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:h-16 shrink-0 sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </header>
  );
}

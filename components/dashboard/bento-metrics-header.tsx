import { Users, Briefcase } from "lucide-react";

interface BentoMetricsHeaderProps {
  userName: string;
  activeClients: number;
  ongoingProjects: number;
  totalRevenue: string;
  projectStatusBreakdown: {
    lead: number;
    inProgress: number;
    review: number;
  };
}

export function BentoMetricsHeader({
  userName,
  activeClients,
  ongoingProjects,
  totalRevenue,
  projectStatusBreakdown,
}: BentoMetricsHeaderProps) {
  const totalActive = projectStatusBreakdown.lead + projectStatusBreakdown.inProgress + projectStatusBreakdown.review;
  
  // Calculate percentages for the segmented progress bar
  const leadPct = totalActive === 0 ? 0 : (projectStatusBreakdown.lead / totalActive) * 100;
  const inProgressPct = totalActive === 0 ? 0 : (projectStatusBreakdown.inProgress / totalActive) * 100;
  const reviewPct = totalActive === 0 ? 0 : (projectStatusBreakdown.review / totalActive) * 100;

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8 pt-4">
      <div className="space-y-6 w-full xl:w-1/2">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-slate-900 dark:text-slate-100">
          Welcome back, <span className="font-semibold">{userName.split(' ')[0]}</span>
        </h1>
        
        <div className="space-y-3 max-w-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-300"></div> Lead ({projectStatusBreakdown.lead})
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> In Progress ({projectStatusBreakdown.inProgress})
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div> Review ({projectStatusBreakdown.review})
            </span>
          </div>
          
          {/* Segmented Progress Bar */}
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
            <div style={{ width: `${leadPct}%` }} className="bg-slate-800 dark:bg-slate-300 transition-all"></div>
            <div style={{ width: `${inProgressPct}%` }} className="bg-blue-500 transition-all"></div>
            <div style={{ width: `${reviewPct}%` }} className="bg-slate-300 dark:bg-slate-700 transition-all"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:gap-8 w-full xl:w-auto overflow-x-auto pb-2">
        <div className="flex flex-col justify-end">
          <div className="flex items-baseline gap-2">
            <Users className="h-5 w-5 text-slate-400 mb-1" />
            <span className="text-4xl md:text-5xl font-light text-slate-900 dark:text-slate-100">{activeClients}</span>
          </div>
          <span className="text-xs font-medium text-slate-500 ml-7">Active Clients</span>
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex items-baseline gap-2">
            <Briefcase className="h-5 w-5 text-slate-400 mb-1" />
            <span className="text-4xl md:text-5xl font-light text-slate-900 dark:text-slate-100">{ongoingProjects}</span>
          </div>
          <span className="text-xs font-medium text-slate-500 ml-7">Ongoing Projects</span>
        </div>

        <div className="flex flex-col justify-end border-l pl-4 md:pl-8 border-slate-200 dark:border-slate-800">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-light text-slate-900 dark:text-slate-100">{totalRevenue}</span>
          </div>
          <span className="text-xs font-medium text-slate-500">Total Revenue</span>
        </div>
      </div>
    </div>
  );
}

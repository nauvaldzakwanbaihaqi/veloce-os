import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Briefcase } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ActivityItem = {
  id: string;
  type: "INVOICE_SENT" | "INVOICE_PAID" | "PROJECT_STARTED";
  title: string;
  timestamp: string;
  href: string;
};

interface BentoActivityTimelineProps {
  activities: ActivityItem[];
  pendingCount: number;
}

export function BentoActivityTimeline({ activities, pendingCount }: BentoActivityTimelineProps) {
  return (
    <Card className="h-full bg-slate-900 border-slate-800 text-slate-100 shadow-xl rounded-3xl overflow-hidden flex flex-col">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-white">Recent Activity</CardTitle>
          <span className="text-4xl font-light text-slate-400">{pendingCount}</span>
        </div>
        <p className="text-xs text-slate-400">Pending Actions</p>
      </CardHeader>
      
      <CardContent className="flex-1 px-6 pb-6 flex flex-col justify-between">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.75 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {activities.length === 0 ? (
            <div className="text-sm text-slate-500 text-center py-8">No recent activities</div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 text-slate-300">
                  {activity.type === "INVOICE_SENT" && <FileText className="h-3.5 w-3.5" />}
                  {activity.type === "PROJECT_STARTED" && <Briefcase className="h-3.5 w-3.5" />}
                  {activity.type === "INVOICE_PAID" && <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />}
                </div>
                
                {/* Content */}
                <Link href={activity.href} className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl hover:bg-slate-800/50 transition-colors block">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-slate-200">{activity.title}</h4>
                  </div>
                  <time className="text-xs text-slate-500">{activity.timestamp}</time>
                </Link>
              </div>
            ))
          )}
        </div>

        <Link 
          href="/dashboard" 
          className={cn(buttonVariants({ variant: "ghost" }), "w-full mt-6 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl")}
        >
          View all history
        </Link>
      </CardContent>
    </Card>
  );
}

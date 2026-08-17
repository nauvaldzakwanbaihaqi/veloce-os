import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BentoProfileCardProps {
  userName: string;
  totalEarnings: string;
}

export function BentoProfileCard({ userName, totalEarnings }: BentoProfileCardProps) {
  return (
    <Card className="relative overflow-hidden group border-0 shadow-lg shadow-blue-900/5 aspect-square sm:aspect-auto sm:h-full flex flex-col justify-end bg-linear-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      {/* Background Image / Pattern Placeholder */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${userName}&background=f1f5f9&color=334155&size=512')` }}></div>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

      <div className="relative z-20 p-5 flex flex-col h-full justify-between">
        <div className="self-end">
          <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-white/10 shadow-sm px-3 py-1 text-sm font-semibold">
            {totalEarnings}
          </Badge>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">{userName}</h2>
          <p className="text-sm text-white/80 font-medium">Freelance Developer</p>
        </div>
      </div>
    </Card>
  );
}

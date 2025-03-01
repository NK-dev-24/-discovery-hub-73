
import { Status } from "@/types/avn";
import { CheckCircle, Activity, Pause, CalendarClock, XCircle } from "lucide-react";

interface StatusPillProps {
  status: Status;
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/90 border-emerald-400";
      case "Ongoing":
        return "bg-blue-500/90 border-blue-400";
      case "Hiatus":
        return "bg-amber-500/90 border-amber-400";
      case "Planned":
        return "bg-violet-500/90 border-violet-400";
      case "Dropped":
        return "bg-rose-500/90 border-rose-400";
      default:
        return "bg-gray-500/90 border-gray-400";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-3 w-3" />;
      case "Ongoing":
        return <Activity className="h-3 w-3" />;
      case "Hiatus":
        return <Pause className="h-3 w-3" />;
      case "Planned":
        return <CalendarClock className="h-3 w-3" />;
      case "Dropped":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)} text-white shadow-sm backdrop-blur-sm`}>
      {getStatusIcon(status)}
      <span>{status}</span>
    </div>
  );
};


import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
};

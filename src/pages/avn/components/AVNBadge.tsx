
interface AVNBadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "info" | "default";
  className?: string;
}

export const AVNBadge = ({ 
  children, 
  variant = "default",
  className = ""
}: AVNBadgeProps) => {
  const variantStyles = {
    primary: "bg-primary/85 text-primary-foreground border-primary/70",
    success: "bg-emerald-500/85 text-white border-emerald-400/70",
    warning: "bg-amber-500/85 text-white border-amber-400/70",
    info: "bg-blue-500/85 text-white border-blue-400/70",
    default: "bg-secondary/85 text-secondary-foreground border-secondary/70"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm backdrop-blur-sm ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

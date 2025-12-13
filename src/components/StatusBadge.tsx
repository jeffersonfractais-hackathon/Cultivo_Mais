import { Check, AlertTriangle, X } from "lucide-react";

type StatusType = "valid" | "warning" | "invalid";

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  size?: "sm" | "md";
}

const statusConfig = {
  valid: {
    icon: Check,
    className: "status-valid",
  },
  warning: {
    icon: AlertTriangle,
    className: "status-warning",
  },
  invalid: {
    icon: X,
    className: "status-invalid",
  },
};

const StatusBadge = ({ status, label, size = "md" }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const sizeClasses = size === "sm" 
    ? "px-2 py-1 text-xs gap-1" 
    : "px-3 py-1.5 text-sm gap-1.5";
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.className} ${sizeClasses}`}>
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {label}
    </span>
  );
};

export default StatusBadge;

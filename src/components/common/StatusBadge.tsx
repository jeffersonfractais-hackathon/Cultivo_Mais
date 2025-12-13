/**
 * Badge de Status Reutilizável
 * Exibe status de documentos e validações
 */

import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { DocumentStatus } from "@/types";

interface StatusBadgeProps {
  status: DocumentStatus;
  label: string;
  showIcon?: boolean;
}

const statusConfig = {
  valid: {
    icon: CheckCircle2,
    className: "status-valid",
  },
  warning: {
    icon: AlertCircle,
    className: "status-warning",
  },
  invalid: {
    icon: XCircle,
    className: "status-invalid",
  },
};

const StatusBadge = ({ status, label, showIcon = true }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={config.className}>
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </span>
  );
};

export default StatusBadge;

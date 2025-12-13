/**
 * Card de Métrica Reutilizável
 * Exibe estatísticas com ícone e valor
 */

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "primary" | "warning" | "success";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary/10",
  warning: "bg-amber-500/10",
  success: "bg-emerald-500/10",
};

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  warning: "bg-amber-500/20 text-amber-600",
  success: "bg-emerald-500/20 text-emerald-600",
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  variant = "default",
}: MetricCardProps) => {
  return (
    <div className={`card-elevated p-4 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconVariantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;

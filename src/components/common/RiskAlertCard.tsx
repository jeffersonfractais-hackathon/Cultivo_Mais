/**
 * Card de Alerta de Risco Inteligente
 * Exibe alertas de risco de perda com recomendações da IA
 */

import { AlertTriangle, Clock, ThermometerSun, CheckCircle, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RiskAlert, RiskLevel } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface RiskAlertCardProps {
  alert: RiskAlert;
  onDismiss?: (id: string) => void;
  onMarkAsSold?: (id: string) => void;
}

const getLevelStyles = (level: RiskLevel) => {
  switch (level) {
    case 'urgent':
      return {
        bg: 'bg-destructive/10 border-destructive/30',
        iconBg: 'bg-destructive/20',
        iconColor: 'text-destructive',
        badge: 'bg-destructive text-destructive-foreground',
        badgeText: 'URGENTE',
      };
    case 'warning':
      return {
        bg: 'bg-warning/10 border-warning/30',
        iconBg: 'bg-warning/20',
        iconColor: 'text-warning',
        badge: 'bg-warning text-warning-foreground',
        badgeText: 'ATENÇÃO',
      };
    default:
      return {
        bg: 'bg-success/10 border-success/30',
        iconBg: 'bg-success/20',
        iconColor: 'text-success',
        badge: 'bg-success text-success-foreground',
        badgeText: 'SEGURO',
      };
  }
};

const RiskAlertCard = ({ alert, onDismiss, onMarkAsSold }: RiskAlertCardProps) => {
  const styles = getLevelStyles(alert.level);

  if (alert.level === 'safe') {
    return null; // Não mostra alertas seguros
  }

  return (
    <Dialog>
      <div className={`rounded-xl border p-4 ${styles.bg}`}>
        <div className="flex items-start gap-3">
          {/* Ícone */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
            <AlertTriangle className={`w-5 h-5 ${styles.iconColor}`} />
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                {styles.badgeText}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.daysRemaining} dias restantes
              </span>
            </div>
            
            <p className="font-semibold text-foreground">{alert.productName}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{alert.reason}</p>

            {/* Ações rápidas */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsSold?.(alert.id)}
                className="text-xs"
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Vendido
              </Button>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs">
                  Ver detalhes
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </DialogTrigger>
            </div>
          </div>

          {/* Botão de dispensar */}
          <button
            onClick={() => onDismiss?.(alert.id)}
            className="p-1.5 rounded-lg hover:bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${styles.iconColor}`} />
            Alerta de Risco - {alert.productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className={`rounded-xl p-4 ${styles.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${styles.badge}`}>
                {styles.badgeText}
              </span>
              <span className="text-sm font-medium text-foreground">
                {alert.daysRemaining} dias restantes
              </span>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <ThermometerSun className="w-4 h-4 text-muted-foreground" />
              Motivo do Alerta
            </h4>
            <p className="text-sm text-muted-foreground">{alert.reason}</p>
          </div>

          {/* Recomendações */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Recomendações</h4>
            <ul className="space-y-2">
              {alert.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Aviso IA */}
          <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">ℹ️ Sobre este alerta</p>
            <p>
              Este alerta foi gerado automaticamente com base no tipo de produto, 
              tempo até expiração e condições climáticas. A decisão final é sempre sua.
            </p>
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={() => onMarkAsSold?.(alert.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar como Vendido
            </Button>
            <Button
              variant="outline"
              onClick={() => onDismiss?.(alert.id)}
            >
              Adiar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RiskAlertCard;
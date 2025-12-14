/**
 * Dashboard do Produtor
 * Visão geral com métricas, alertas inteligentes e compradores próximos
 */

import { useState } from 'react';
import {
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  MapPin,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/common/MetricCard';
import RiskAlertCard from '@/components/common/RiskAlertCard';
import { useAuth } from '@/contexts/AuthContext';
import { RiskAlert, ProducerMetrics } from '@/types';

interface ProducerHomeProps {
  onNavigate: (tab: string) => void;
}

// Métricas mockadas
const mockMetrics: ProducerMetrics = {
  activeProducts: 8,
  monthlySales: 4850,
  previousMonthSales: 4200,
  conversionRate: 68,
  productsAtRisk: 2,
  pendingOrders: 3,
};

// Alertas mockados
const mockAlerts: RiskAlert[] = [
  {
    id: '1',
    productId: 'prod-1',
    productName: 'Tomates Cereja (50kg)',
    level: 'urgent',
    daysRemaining: 2,
    reason: 'Temperatura elevada na região + produto altamente perecível',
    recommendations: [
      'Ofereça desconto de 15-20% para venda rápida',
      'Considere promoções em lote',
      'Entre em contato com compradores recorrentes',
      'Avalie doação para evitar perda total',
    ],
    createdAt: new Date(),
  },
  {
    id: '2',
    productId: 'prod-2',
    productName: 'Alface Crespa (30kg)',
    level: 'warning',
    daysRemaining: 4,
    reason: 'Produto perecível com demanda abaixo do esperado',
    recommendations: [
      'Destaque na lista de produtos disponíveis',
      'Ofereça condições especiais para compras em volume',
      'Considere combo com outros produtos',
    ],
    createdAt: new Date(),
  },
];

const ProducerHome = ({ onNavigate }: ProducerHomeProps) => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<RiskAlert[]>(mockAlerts);
  const metrics = mockMetrics;

  const salesGrowth = ((metrics.monthlySales - metrics.previousMonthSales) / metrics.previousMonthSales) * 100;

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleMarkAsSold = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header de boas-vindas */}
      <div className="space-y-1">
        <p className="text-muted-foreground">Olá,</p>
        <h1 className="text-2xl font-bold text-foreground">
          {user?.name?.split(' ')[0] || 'Produtor'} 👋
        </h1>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{user?.municipality || 'Campinas - SP'}</span>
        </div>
      </div>

      {/* Painel de Métricas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Suas Métricas
          </h2>
        </div>

        {/* Grid de métricas principais */}
        <div className="grid grid-cols-2 gap-3">
          {/* Produtos Ativos */}
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.activeProducts}</p>
            <p className="text-xs text-muted-foreground">Produtos ativos</p>
          </div>

          {/* Vendas do Mês */}
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-success/15 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
                  salesGrowth >= 0
                    ? 'bg-success/15 text-success'
                    : 'bg-destructive/15 text-destructive'
                }`}
              >
                {salesGrowth >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(salesGrowth).toFixed(0)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              R$ {metrics.monthlySales.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">Vendas do mês</p>
          </div>

          {/* Taxa de Conversão */}
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-secondary/15 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.conversionRate}%</p>
            <p className="text-xs text-muted-foreground">Taxa de conversão</p>
          </div>

          {/* Pedidos Pendentes */}
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-warning/15 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{metrics.pendingOrders}</p>
            <p className="text-xs text-muted-foreground">Pedidos pendentes</p>
          </div>
        </div>

        {/* Alerta de produtos em risco */}
        {metrics.productsAtRisk > 0 && (
          <button
            onClick={() => {}}
            className="w-full bg-destructive/10 border border-destructive/30 rounded-xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">
                  {metrics.productsAtRisk} produtos em risco
                </p>
                <p className="text-xs text-muted-foreground">
                  Precisam de atenção urgente
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-destructive" />
          </button>
        )}
      </div>

      {/* Alertas de Risco Inteligentes */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Alertas de Risco
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              IA Assistiva
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <RiskAlertCard
                key={alert.id}
                alert={alert}
                onDismiss={handleDismissAlert}
                onMarkAsSold={handleMarkAsSold}
              />
            ))}
          </div>
        </div>
      )}

      {/* Compradores próximos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Compradores próximos
          </h2>
          <button
            onClick={() => onNavigate('matches')}
            className="text-sm text-primary font-medium"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Escola Municipal Centro', distance: '8km', match: 95 },
            { name: 'Mercado São Jorge', distance: '12km', match: 88 },
            { name: 'Banco de Alimentos', distance: '15km', match: 82 },
          ].map((buyer, i) => (
            <div
              key={i}
              className="card-elevated p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{buyer.name}</p>
                <p className="text-sm text-muted-foreground">{buyer.distance}</p>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{buyer.match}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducerHome;
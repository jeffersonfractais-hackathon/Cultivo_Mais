/**
 * Componente de Notificações
 * Ícone de sino com badge e painel de notificações
 */

import { useState } from 'react';
import { Bell, ShoppingCart, AlertTriangle, MessageSquare, Tag, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Notification } from '@/types';

interface NotificationBellProps {
  userType: 'producer' | 'buyer';
}

// Dados mockados de notificações
const mockProducerNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Novo pedido recebido',
    message: '15kg de Tomate - João Silva',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '2',
    type: 'alert',
    title: 'URGENTE: Alfaces precisam ser vendidas',
    message: 'Risco de perda em 2 dias',
    read: false,
    createdAt: new Date(Date.now() - 60 * 60000),
  },
  {
    id: '3',
    type: 'system',
    title: 'Resumo semanal disponível',
    message: 'Veja suas métricas da semana',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60000),
  },
];

const mockBuyerNotifications: Notification[] = [
  {
    id: '1',
    type: 'promo',
    title: 'Novos produtos disponíveis!',
    message: 'Tomates orgânicos com 15% de desconto',
    read: false,
    createdAt: new Date(Date.now() - 10 * 60000),
  },
  {
    id: '2',
    type: 'order',
    title: 'Pedido confirmado',
    message: 'Seu pedido de 20kg de Alface foi confirmado',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60000),
  },
  {
    id: '3',
    type: 'message',
    title: 'Nova mensagem',
    message: 'João Produtor enviou uma mensagem',
    read: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60000),
  },
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order':
      return <ShoppingCart className="w-4 h-4" />;
    case 'alert':
      return <AlertTriangle className="w-4 h-4" />;
    case 'message':
      return <MessageSquare className="w-4 h-4" />;
    case 'promo':
      return <Tag className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getIconBg = (type: Notification['type']) => {
  switch (type) {
    case 'order':
      return 'bg-primary/15 text-primary';
    case 'alert':
      return 'bg-destructive/15 text-destructive';
    case 'message':
      return 'bg-secondary/15 text-secondary-foreground';
    case 'promo':
      return 'bg-success/15 text-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `Há ${minutes} minutos`;
  if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
  if (days === 1) return 'Ontem';
  return `Há ${days} dias`;
};

const NotificationBell = ({ userType }: NotificationBellProps) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    userType === 'producer' ? mockProducerNotifications : mockBuyerNotifications
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
          <Bell className="w-6 h-6 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
              {unreadCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
              {unreadCount > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({unreadCount} não lidas)
                </span>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Filtros */}
        <div className="px-4 py-2 border-b border-border flex gap-2 overflow-x-auto">
          {['Todas', 'Pedidos', 'Alertas', 'Mensagens'].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1.5 text-sm rounded-full bg-muted/50 hover:bg-muted text-foreground whitespace-nowrap transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Lista de notificações */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Nenhuma notificação</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-3 transition-colors ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                >
                  {/* Indicador de não lido */}
                  <div className="flex items-start pt-1">
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                    {notification.read && <span className="w-2 h-2" />}
                  </div>

                  {/* Ícone */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(
                      notification.type
                    )}`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        !notification.read ? 'font-semibold' : 'font-medium'
                      } text-foreground`}
                    >
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="flex items-start gap-1">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Marcar como lida"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Remover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationBell;
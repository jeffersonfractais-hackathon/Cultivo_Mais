/**
 * Header do Dashboard
 * Inclui logo, título e sino de notificações
 */

import { Leaf } from 'lucide-react';
import NotificationBell from './NotificationBell';

interface DashboardHeaderProps {
  userType: 'producer' | 'buyer';
}

const DashboardHeader = ({ userType }: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <span className="text-lg font-bold text-foreground">
          Cultivo<span className="text-primary">+</span>
        </span>
      </div>

      {/* Notificações */}
      <NotificationBell userType={userType} />
    </header>
  );
};

export default DashboardHeader;
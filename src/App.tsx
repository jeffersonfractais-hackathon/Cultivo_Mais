/**
 * App Principal - AgroConecta
 * Roteamento baseado em autenticação e tipo de usuário
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Auth from "@/pages/Auth";
import ProducerDashboard from "@/pages/ProducerDashboard";
import BuyerDashboard from "@/pages/BuyerDashboard";

const queryClient = new QueryClient();

// Componente que decide qual tela mostrar
const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  // Não autenticado → tela de login
  if (!isAuthenticated) {
    return <Auth />;
  }

  // Autenticado → dashboard baseado no tipo
  if (user?.userType === "buyer") {
    return <BuyerDashboard />;
  }

  return <ProducerDashboard />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

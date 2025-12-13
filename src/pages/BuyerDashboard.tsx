/**
 * Dashboard Principal do Comprador
 * Gerencia navegação entre abas
 */

import { useState } from "react";
import BottomNav from "@/components/common/BottomNav";
import BuyerHome from "@/components/buyer/BuyerHome";
import BuyerProducts from "@/components/buyer/BuyerProducts";
import BuyerProducers from "@/components/buyer/BuyerProducers";
import BuyerProfile from "@/components/buyer/BuyerProfile";

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <BuyerHome onNavigate={setActiveTab} />;
      case "products":
        return <BuyerProducts />;
      case "producers":
        return <BuyerProducers />;
      case "profile":
        return <BuyerProfile />;
      default:
        return <BuyerHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="px-4 py-6 pb-24">{renderContent()}</main>
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userType="buyer"
      />
    </div>
  );
};

export default BuyerDashboard;

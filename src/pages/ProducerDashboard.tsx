/**
 * Dashboard Principal do Produtor
 * Gerencia navegação entre abas
 */

import { useState } from "react";
import BottomNav from "@/components/common/BottomNav";
import DashboardHeader from "@/components/common/DashboardHeader";
import ProducerHome from "@/components/producer/ProducerHome";
import ProducerProduction from "@/components/producer/ProducerProduction";
import ProducerMatches from "@/components/producer/ProducerMatches";
import ProducerHelp from "@/components/producer/ProducerHelp";
import ProducerProfile from "@/components/producer/ProducerProfile";

const ProducerDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <ProducerHome onNavigate={setActiveTab} />;
      case "production":
        return <ProducerProduction />;
      case "matches":
        return <ProducerMatches />;
      case "help":
        return <ProducerHelp />;
      case "profile":
        return <ProducerProfile />;
      default:
        return <ProducerHome onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userType="producer" />
      <main className="px-4 py-6 pb-24">{renderContent()}</main>
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userType="producer"
      />
    </div>
  );
};

export default ProducerDashboard;

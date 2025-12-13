import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/HomeTab";
import ProductionTab from "@/components/ProductionTab";
import MatchesTab from "@/components/MatchesTab";
import HelpTab from "@/components/HelpTab";
import ProfileTab from "@/components/ProfileTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "production":
        return <ProductionTab />;
      case "matches":
        return <MatchesTab />;
      case "help":
        return <HelpTab />;
      case "profile":
        return <ProfileTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Status Bar Spacer */}
      <div className="h-12 bg-background" />
      
      {/* Main Content */}
      <main className="px-4 pb-24">
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

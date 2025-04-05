import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import CookLocation from "@/modules/cook/homepage/component/cooksetLocation";
import DashboardHeader from "@/modules/cook/homepage/component/dashboardheader";
// import InsightsAnalytics from "@/modules/cook/homepage/component/insightsanlytics";
import MenuManagement from "@/modules/cook/homepage/component/menumanagement";
import OrderManagement from "@/modules/cook/homepage/component/ordermanagement";
import TabNavigation from "@/modules/cook/homepage/component/tabnavigation";
import useHomepage from "@/modules/cook/homepage/hooks/usehomepagehook";
import React from "react";

export const Homepage = () => {
  const {
    isOnline,
    setIsOnline,
    activeTab,
    setActiveTab,
    orderRequests,
    foodItems,
    // earnings,
  } = useHomepage();

  // console.log("Earnings***", earnings)
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBAr />
      {/* <CookLocation/> */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <DashboardHeader
            isOnline={isOnline}
            setIsOnline={setIsOnline}
            // earnings={earnings}
          />

          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "orders" && (
            <OrderManagement
              orderRequests={orderRequests}
            />
          )}

          {activeTab === "menu" && <MenuManagement foodItems={foodItems} />}

          {/* {activeTab === "insights" && (
            <InsightsAnalytics foodItems={foodItems} />
          )} */}
        </main>
      </div>
    </div>
  );
};

export default Homepage;

import React from "react";
import CookNavBar from "../../../../components/ui/cooknavbar/cooknavbar";
import ProfileHeader from "./components/ProfileHeader";
import StatusBanner from "./components/StatusBanner";
import ProfileCard from "./components/ProfileCard";
import IntroductionVideo from "./components/IntroductionVideo";
import AchievementsExperience from "./components/AchievementsExperience";
import AccountSettings from "./components/AccountSettings";
import { userData } from "./data/userData";

export const CookProfile = () => {
  // We're assuming userData might contain the introVideo URL
  const initialVideo = userData?.introVideo?.url || null;
  
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <CookNavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <ProfileHeader />
          <StatusBanner userData={userData} />
          <ProfileCard userData={userData} />
          <IntroductionVideo initialVideo={initialVideo} />
          <AchievementsExperience userData={userData} />
          <AccountSettings />
        </main>
      </div>
    </div>
  );
};

export default CookProfile;
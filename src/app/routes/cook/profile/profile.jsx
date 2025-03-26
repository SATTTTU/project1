import CookNavBAr from "@/components/ui/cooknavbar/cooknavbar";
import { useProfile } from "@/modules/cook/profile/api/getcookprofile";
import AccountSettings from "@/modules/cook/profile/component/accountsSettings";
import AchievementsExperience from "@/modules/cook/profile/component/achivementsExperience";

import { ProfileCard } from "@/modules/cook/profile/component/cookprofile";
import IntroductionVideo from "@/modules/cook/profile/component/introductionVideo";
import ProfileHeader from "@/modules/cook/profile/component/profileHeader";
import StatusBanner from "@/modules/cook/profile/component/statusBanner";

export const ProfileRoute = () => {
  const { data: userData } = useProfile();

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <ProfileHeader />
          <StatusBanner userData={userData} />
          <ProfileCard userData={userData} />
          <IntroductionVideo initialVideo={userData?.introVideo} />
          <AchievementsExperience userData={userData} />
          <AccountSettings />
        </main>
      </div>
    </div>
  );
};

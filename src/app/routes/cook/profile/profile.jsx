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
  console.log("user/Data:", userData)

  return (
    <div className="flex h-screen flex-col">
      <CookNavBAr />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <ProfileHeader />
          <StatusBanner userData={userData} />
          <ProfileCard userData={userData} />
          {/* <div className="flex justify-center items-center h-screen bg-gray-100">
      <video controls width="600">
        <source 
          src="https://khajabox-bucket.s3.ap-south-1.amazonaws.com/cook_intro_videos/1743053977_67e4e499e00af.mp4" 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div> */}
          <IntroductionVideo initialVideo={userData?.intro_video_url} />
          <AchievementsExperience userData={userData} />
          <AccountSettings />
        </main>
      </div>
    </div>
  );
};

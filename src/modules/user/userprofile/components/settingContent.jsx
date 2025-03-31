import { ChangePasswordForm } from "../../auth/components/changePassword";
import { ChangePassword } from "./changePassword";
import ToggleSetting from "./toggleSetting";

const SettingsContent = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
  
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
  
            {/* <div className="space-y-4">
              <ToggleSetting
                title="Email Notifications"
                description="Receive order updates and promotions"
                defaultChecked={true}
              />
  
            
            </div> */}
          </div>
  
{/* <ChangePassword/>
 */}
 <ChangePasswordForm/>
          {/* <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Privacy Settingssss</h3>
  
            <div className="space-y-4">
              <ToggleSetting
                title="Share Order History"
                description="Allow KhanaBox to use your order history for recommendations"
                defaultChecked={true}
              />
  
              <ToggleSetting
                title="Location Services"
                description="Allow KhanaBox to access your location"
                defaultChecked={true}
              />
            </div>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default SettingsContent;
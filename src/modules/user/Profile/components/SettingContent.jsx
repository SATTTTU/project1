// tabs/SettingsContent.jsx
const SettingsContent = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
  
        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
  
            <div className="space-y-4">
              <ToggleSetting
                title="Email Notifications"
                description="Receive order updates and promotions"
                defaultChecked={true}
              />
  
              <ToggleSetting
                title="SMS Notifications"
                description="Receive order updates via text message"
                defaultChecked={false}
              />
            </div>
          </div>
  
          <PasswordChangeForm />
  
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
  
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
          </div>
        </div>
      </div>
    );
  };
  
  export default SettingsContent;
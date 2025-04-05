import { ChangePasswordForm } from "../../auth/components/changePassword";

const SettingsContent = () => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Settings</h2>

			<div className="space-y-8">
				<div className="bg-gray-50 p-6 rounded-lg">
					<h3 className="text-lg font-medium mb-4">Account Settings</h3>
				</div>

				<ChangePasswordForm />
			</div>
		</div>
	);
};

export default SettingsContent;

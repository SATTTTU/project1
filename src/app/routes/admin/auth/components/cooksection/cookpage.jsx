import { AdminCooksTable } from "@/modules/admin/components/cookSection/cookPage";
import { CookProfile } from "@/modules/admin/components/cookSection/individualCookPage";
export const CookPageRoute = () => {
  return <AdminCooksTable />;
};
export const CookPageProfileRoute = () => {
  return <CookProfile />;
};

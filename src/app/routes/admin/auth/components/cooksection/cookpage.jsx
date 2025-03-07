import { AuthRoot } from "@/app/routes/app/root";
import { AdminCooksTable } from "../../../../../../modules/admin/Components/Cooksection/Cookpage";
import { CookProfile } from "../../../../../../modules/admin/Components/Cooksection/IndividualcookPage";

export const CookPageRoute = () => {
  return <AdminCooksTable />;
};
export const CookPageProfileRoute = () => {
  return <CookProfile />;
};

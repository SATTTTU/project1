import { useParams, useNavigate } from "react-router-dom";
import CookProfileDetails from "@/modules/admin/cookProfile/components/cookProfile";
import { Sidebar } from "@/components/ui/admin/aside/aside";

export const CookProfileRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
 
  
  const handleStatusChange = (cookId, newStatus) => {
    console.log(`Status changed for cook ${cookId} to ${newStatus}`);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-4">
         
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CookProfileDetails 
            cookId={id} 
            navigate={navigate} 
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
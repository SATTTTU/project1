import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// API function to fetch menu items by cook ID
export const getMenuItems = async (menuitem_Id) => {
  if (!menuitem_Id) {
    throw new Error('menu ID is required');
  }
  
  const response = await api.get(`/api/cooks/get-menu-item/${menuitem_Id}`);
  console.log("menuitems details", response.data)
  return response.data;
};

// Define query options for fetching menu items
export const getMenuItemsQueryOptions = (menuitem_Id) => {
  return {
    queryKey: ['menuItems', menuitem_Id],
    queryFn: () => getMenuItems(menuitem_Id),
    enabled: !!menuitem_Id, // Only run the query if menuitem_Id exists
  };
};

// Hook to fetch menu items
export const useMenuItemsInfo = (menuitem_Id, queryConfig = {}) => {
  return useQuery({
    ...getMenuItemsQueryOptions(menuitem_Id),
    ...queryConfig,
  });
};
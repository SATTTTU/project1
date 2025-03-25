import { useDeleteStoreItem } from "@/modules/user/cart/api/deleteItems"
import { useUserBasket } from "@/modules/user/cart/api/getItems"
import { useUpdateStoreItem } from "@/modules/user/cart/api/updateItems"
import { CartHeader } from "@/modules/user/cart/components/cartheader"
import { CartItems } from "@/modules/user/cart/components/cartItems"
import { CartSummary } from "@/modules/user/cart/components/cartSummary"
import { CheckoutButton } from "@/modules/user/cart/components/checkoutButton"
import { EmptyCart } from "@/modules/user/cart/components/emptyCart"

export const Cart=()=> {
  const { data, isLoading, error, refetch } = useUserBasket()
  const { updateItem, isLoading: isUpdating } = useUpdateStoreItem()
  const { mutateAsync: deleteItem, isLoading: isDeleting } = useDeleteStoreItem()

  console.log("data of basket", data)
  // Calculate cart totals
  const calculateSubtotal = () => {
    if (!data || !data[0]?.items) return 0
    return data[0].items.reduce((total, item) => total + (item.price * item.quantity || 0), 0)
  }

	const calculateTax = () => {
		return calculateSubtotal() * 0.1; // 10% tax
	};

	const calculateShipping = () => {
		return calculateSubtotal() > 1000 ? 0 : 100; // Free shipping over Rs. 1000
	};

	const calculateTotal = () => {
		return calculateSubtotal() + calculateTax() + calculateShipping();
	};

	const handleQuantityChange = async (itemId, newQuantity) => {
		if (newQuantity < 1) return;
		try {
			await updateItem({ item_id: itemId, quantity: newQuantity });
		} catch (error) {
			console.error("Error updating quantity:", error);
		}
	};

	const handleRemoveItem = async (itemId) => {
		try {
			alert(itemId);
			await deleteItem({ item_id: itemId });
		} catch (error) {
			console.error("Error removing item:", error);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="bg-red-50 p-6 rounded-lg">
					<h2 className="text-red-600 font-bold text-xl">Error loading cart</h2>
					<p className="text-red-500">{error.message}</p>
					<button
						onClick={() => refetch()}
						className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
					>
						Try Again gjhmgygjgjhgjhgjhgf
					</button>
				</div>
			</div>
		);
	}

	console.log("the data is ", data, data.items);

	if (!data) {
		return <div>no data</div>;
	}



  return (
    <div className="min-h-screen bg-gray-50">

      <CartHeader itemCount={data[0]?.items?.length || 0} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItems
              data={data}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          </div>
          <div className="lg:w-1/3">
         <CartSummary/>
          </div>
        </div>
      </div>
    </div>
  )
}


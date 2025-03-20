import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api-client"; // Ensure this is correctly set up

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// ✅ Fetch Cart Items
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await api.get("api/baskets/index", { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch cart");
  }
});

// ✅ Add Item to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async (item, { rejectWithValue }) => {
  try {
    const payload = {
      items: [
        {
          menu_item_id: item.productId, // Ensure this field exists
          quantity: item.quantity || 1, // Default to 1 if not provided
        },
      ],
    };

    const response = await api.post("/api/baskets/store", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to add item");
  }
});




// ✅ Update Item Quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ basket_item_id, quantity }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/baskets/update/item/${basket_item_id}`, { quantity });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update item");
  }
});

// ✅ Remove Item from Cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (basket_item_id, { rejectWithValue }) => {
  try {
    await api.delete(`/baskets/delete/item/${basket_item_id}`);
    return basket_item_id; // Return deleted item ID
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to remove item");
  }
});

// ✅ Clear Cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
  try {
    await api.delete("/baskets/delete");
    return [];
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to clear cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}, // No need for local reducers anymore
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (item) item.quantity = action.payload.quantity;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, name, price, img } = action.payload
      const existingItem = state.items.find((item) => item.productId === productId)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          productId,
          quantity,
          name,
          price,
          img,
        })
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.productId !== productId)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.productId === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})


export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer


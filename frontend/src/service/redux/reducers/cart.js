import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        sum:0,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        updateItemById: (state, action) => {
            const updatedCart = action.payload;
            state.cart = state.cart.map((item) =>
                item.id === updatedCart.id ? updatedCart : item
            );
        },
        deleteItemById: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        clearCart: (state, action) => {
            state.cart = [];
        },
        setSum: (state, action) => {
            state.sum = action.payload
        }

    }
});
export const {
    setCart,
    addToCart,
    updateItemById,
    deleteItemById,
    clearCart,setSum
} = cart.actions;
export default cart.reducer;

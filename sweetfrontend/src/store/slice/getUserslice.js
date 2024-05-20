import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCartItems = createAsyncThunk(
    "fetchCartItems",
    async (id) => {
      console.log("userId:" + id);
      const response = await fetch(`http://localhost:4000/api/cart/${id}`);
      const data = await response.json(); // Await here
      console.log(data);
      return data;
    }
);


export const fetchUserDetails = createAsyncThunk(
    "fetchUserDetails",
    async (id) => {
      console.log("userId:" + id);
      const response = await fetch(`http://localhost:4000/api/${id}`);
      const data = await response.json(); // Await here
      console.log(data);
      return data;
    }
);

const apiSlice = createSlice({
    name: "api",
    initialState: {
        isLoadingCart: false,
        cartData: null,
        isErrorCart: false,
        isLoadingUser: false,
        userData: null,
        isErrorUser: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoadingCart = true;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoadingCart = false;
            state.cartData = action.payload;
        });
        builder.addCase(fetchCartItems.rejected, (state, action) => {
            state.isErrorCart = true;
            console.log("Cart Error: ", action.payload);
        });

        builder.addCase(fetchUserDetails.pending, (state) => {
            state.isLoadingUser = true;
        });
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.isLoadingUser = false;
            state.userData = action.payload;
        });
        builder.addCase(fetchUserDetails.rejected, (state, action) => {
            state.isErrorUser = true;
            console.log("User Error: ", action.payload);
        });
    }
});

export default apiSlice.reducer;

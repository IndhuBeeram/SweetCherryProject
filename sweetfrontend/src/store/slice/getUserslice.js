import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

//Action
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
  

const apiSlice =createSlice({
    name:"fetchCartItems",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchCartItems
            .fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchCartItems
            .rejected, (state, action) => {
                state.isError = true;
                console.log("Error: ", action.payload);
            });
    }
})

export default apiSlice.reducer;
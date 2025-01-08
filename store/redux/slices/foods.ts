import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";
import { LoadingTypes } from "@/types/loadingTypes";
import { IFoods, InitStateFood } from "@/types/foodTypes";

// Constants
const initialState: InitStateFood = {
    foods: [],
    loading: LoadingTypes.init,
    error: null,
};
export const getMenu = createAsyncThunk("foods/getMenu", async (count: number, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('categories.php');
        return response.data.categories;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch menu');
    }
});

export const foodsSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.loading = LoadingTypes.loading;
                state.error = null;
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.foods = action.payload;
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.error = action.payload as string;
            });
    },
});

export default foodsSlice.reducer;

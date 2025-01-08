import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";
import { LoadingTypes } from "@/types/loadingTypes";
import { IFoods, InitStateFood } from "@/types/foodTypes";

// Constants
const initialState: InitStateFood = {
    foods: [],
    category: [],
    mealDetails: null,
    loading: LoadingTypes.init,
    error: null,
};
export const getMenu = createAsyncThunk("foods/getMenu", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("categories.php");
        return response.data.categories;
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to fetch menu");
    }
});
export const getMealsByCategory = createAsyncThunk(
    "foods/getMealsByCategory",
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`filter.php?c=${name}`);
            return response.data.meals;
        } catch (error: any) {
            return rejectWithValue(error.message || "Failed to fetch category");
        }
    },
);
export const getMealById = createAsyncThunk("foods/getMeal", async (mealId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`lookup.php?i=${mealId}`);
        return response.data.meals[0];
    } catch (error: any) {
        return rejectWithValue(error.message || "Failed to fetch meal");
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
            })
            .addCase(getMealsByCategory.pending, (state) => {
                state.loading = LoadingTypes.loading;
                state.error = null;
            })
            .addCase(getMealsByCategory.fulfilled, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.category = action.payload;
            })
            .addCase(getMealsByCategory.rejected, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.error = action.payload as string;
            })
            .addCase(getMealById.pending, (state) => {
                state.loading = LoadingTypes.loading;
                state.error = null;
            })
            .addCase(getMealById.fulfilled, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.mealDetails = action.payload;
            })
            .addCase(getMealById.rejected, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.error = action.payload as string;
            });
    },
});

export default foodsSlice.reducer;

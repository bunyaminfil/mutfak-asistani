import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    ids: string[];
}

const initialState: FavoritesState = {
    ids: [],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const mealId = action.payload;
            const existingIndex = state.ids.indexOf(mealId);
            if (existingIndex >= 0) {
                state.ids.splice(existingIndex, 1);
            } else {
                state.ids.push(mealId);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer; 
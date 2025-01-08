import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFavoriteMeal } from "@/types/favoriteTypes";

interface FavoritesState {
    favorites: IFavoriteMeal[];
}

const initialState: FavoritesState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<IFavoriteMeal>) => {
            if (!state.favorites) {
                state.favorites = [];
            }
            const existingIndex = state.favorites.findIndex(
                (favorite) => favorite.idMeal === action.payload.idMeal
            );
            if (existingIndex >= 0) {
                state.favorites.splice(existingIndex, 1);
            } else {
                state.favorites.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

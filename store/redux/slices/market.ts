import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MarketItem {
    id: string;
    name: string;
    quantity: string;
    checked: boolean;
}

interface MarketState {
    items: MarketItem[];
}

const initialState: MarketState = {
    items: [],
};

export const marketSlice = createSlice({
    name: "market",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<MarketItem, "id" | "checked">>) => {
            state.items.push({
                id: Date.now().toString(),
                ...action.payload,
                checked: false,
            });
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.checked = !item.checked;
            }
        },
        clearList: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, toggleItem, clearList } = marketSlice.actions;
export default marketSlice.reducer; 
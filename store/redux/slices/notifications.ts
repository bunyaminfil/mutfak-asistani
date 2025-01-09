import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationItem {
    id: string;
    type: "meal" | "market" | "general";
    time: string;
    enabled: boolean;
    days: string[];
    title: string;
    body: string;
}

interface NotificationsState {
    items: NotificationItem[];
}

const initialState: NotificationsState = {
    items: [],
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<NotificationItem, "id">>) => {
            state.items.push({
                id: Date.now().toString(),
                ...action.payload,
            });
        },
        removeNotification: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleNotification: (state, action: PayloadAction<string>) => {
            const notification = state.items.find(item => item.id === action.payload);
            if (notification) {
                notification.enabled = !notification.enabled;
            }
        },
        updateNotification: (state, action: PayloadAction<NotificationItem>) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { addNotification, removeNotification, toggleNotification, updateNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer; 
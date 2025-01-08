// Third-party Imports
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

// Slice Imports
import foodsReducer from "./slices/foods";
const silces = {
    foodsReducer,
};

// Define the persist config
const persistConfig = {
    key: "root",
    storage,
};

// Combine your reducers
const rootReducer = combineReducers({
    ...silces, // Add your slices here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };

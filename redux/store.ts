import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/features/authSlice";
import onboardingReducer from "./reducers/features/onboardingSlice";
import workshopReducer from "./reducers/features/workshopSlice";
import coursesReducer from "./reducers/features/coursesSlice";
import { FLUSH, PAUSE, persistReducer, persistStore, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = { storage, key: "root", version: 1 };

const rootReducer = combineReducers({
	auth: authReducer,
	onboarding: onboardingReducer,
	workshop: workshopReducer,
	courses: coursesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: { ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE] },
		}),
	devTools: process.env.NEXT_PUBLIC_APP_ENV === "development",
});

const setupStore = () => {
	return store;
};

export type AppStore = ReturnType<typeof setupStore>;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export type StoreDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import onboardingReducer from "./reducers/onboardingSlice";
import workshopReducer from "./reducers/workshopSlice";
import userReducer from "./reducers/userSlice";
import coursesReducer from "./reducers/coursesSlice";
import { FLUSH, PAUSE, persistReducer, persistStore, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import { PersistConfig } from "redux-persist/es/types";

const persistConfig: PersistConfig<any> = { storage, key: "root", version: 1, blacklist: ["auth"] };
// serialize: true

const authPersistConfig: PersistConfig<any> = {
	key: "auth",
	storage: sessionStorage,
	version: 1,
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	onboarding: persistReducer(persistConfig, onboardingReducer) as typeof onboardingReducer,
	workshop: persistReducer(persistConfig, workshopReducer) as typeof workshopReducer,
	user: persistReducer(persistConfig, userReducer) as typeof userReducer,
	courses: coursesReducer,
});

export const store = configureStore({
	reducer: rootReducer,
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

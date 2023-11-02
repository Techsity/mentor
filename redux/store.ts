import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/features/authSlice";
// import userReducer from "./reducers/features/userSlice";
import workshopReducer from "./reducers/features/workshopSlice";
import coursesReducer from "./reducers/features/coursesSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		// user: userReducer,
		workshop: workshopReducer,
		courses: coursesReducer,
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware();
	},
	devTools: process.env.NEXT_PUBLIC_APP_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export default store;

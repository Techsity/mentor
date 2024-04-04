import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { LOGIN_USER } from "../../../services/graphql/mutations/auth";
import client from "../../../utils/apolloClient";
import { ILoginState } from "../../../interfaces/auth.interface";
import { IUser } from "../../../interfaces/user.interface";
import { toast } from "react-toastify";
import { authenticate, formatGqlError, logoutUser } from "../../../utils/auth";
import { ToastDefaultOptions } from "../../../constants";
import { setCredentials, updateMentorProfile, updateUserProfile } from "./authSlice";
import { GET_MENTOR_PROFILE } from "../../../services/graphql/queries/mentor";
import ResponseMessages from "../../../constants/response-codes";
import { GET_USER_PROFILE } from "../../../services/graphql/queries/user";

type ICreateLoginInput = {
	createLoginInput: ILoginState;
};
type LoginResponse = {
	loginUser: { user: IUser & { is_admin: boolean }; access_token: string; is_mentor: boolean };
};

const dummyPaymentCards = [
	{
		bank: { name: "GTbank via Paystack" },
		card_name: "John Doe Ipsum",
		card_number: "5399 8878 9887 99099",
	},
];

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }: ILoginState, { dispatch }) => {
	try {
		const { data } = await client().mutate<LoginResponse, ICreateLoginInput>({
			mutation: LOGIN_USER,
			variables: { createLoginInput: { email, password } },
		});
		if (data) {
			const userData = data.loginUser.user;
			const authToken = data.loginUser.access_token;
			const is_mentor = data.loginUser.is_mentor;
			const is_admin = data.loginUser.user.is_admin;
			authenticate(authToken);
			let mentorProfile;
			if (is_mentor) mentorProfile = await fetchMentorProfile({ user: { ...userData, is_mentor }, dispatch });
			dispatch(
				setCredentials({
					isLoggedIn: true,
					user: {
						...userData,
						is_mentor,
						is_online: true,
						// Temporary
						payment_cards: !is_admin ? dummyPaymentCards : [],
					},
					mentorProfile,
				}),
			);
			if (is_admin) window.location.href = String(process.env.NEXT_PUBLIC_MENTOR_ADMIN_URL);
			return { success: true, is_admin, is_mentor };
		}
		return { success: false };
	} catch (error: any) {
		const errMsg = formatGqlError(error);
		if (errMsg === ResponseMessages.ACCOUNT_NOT_ACTIVE) return { error: errMsg, success: false };
		else toast.error(errMsg || "Something went wrong", { ...ToastDefaultOptions({ id: "error" }) });
	}
});

export const fetchUserProfile = createAsyncThunk(
	"user/fetchUserProfile",
	async (args: { ssr?: boolean; token?: string } | undefined, { dispatch }) => {
		const { ssr, token } = args || {};
		try {
			const { data } = await client({ authToken: token, ssr }).query<{ userProfile: IUser }, any>({
				query: GET_USER_PROFILE,
			});
			if (data.userProfile) {
				dispatch(updateUserProfile({ ...data.userProfile }));
				await fetchMentorProfile({ user: data.userProfile, dispatch });
				return { success: true };
			}
		} catch (error) {
			// console.error("Error fetching user profile:", error);
			const errMsg = formatGqlError(error);
			if (errMsg === ResponseMessages.DEACTIVATED_ACCOUNT) {
				logoutUser();
			}
			toast.error(errMsg || "Something went wrong", { ...ToastDefaultOptions({ id: "error" }) });
		}
	},
);

const fetchMentorProfile = async ({ dispatch, user }: { dispatch: Dispatch<any>; user: IUser }) => {
	const getMentorProfile = createAsyncThunk("mentor/getMentorProfile", async () => {
		const {
			data: { getMentorProfile },
		} = await client().query({ query: GET_MENTOR_PROFILE });
		return { success: true, data: getMentorProfile };
	});
	if (user.is_mentor) {
		const { payload } = await dispatch(getMentorProfile() as any);
		if (payload) {
			const { data: mentorProfile } = payload;
			dispatch(updateMentorProfile({ ...mentorProfile }));
			return mentorProfile;
		}
	}
};

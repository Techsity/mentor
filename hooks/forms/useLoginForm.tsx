import { ChangeEvent, FormEvent, useState } from "react";
import { ILoginState } from "../../interfaces/auth.interface";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { isEmail } from "../../utils";
import { toast } from "react-toastify";
import { ToastDefaultOptions } from "../../constants";
import { useLazyQuery } from "@apollo/client";
import { GET_MENTOR_PROFILE } from "../../services/graphql/queries/mentor";
import { IUser } from "../../interfaces/user.interface";
import { IMentor } from "../../interfaces/mentor.interface";
import { loginUser } from "../../redux/reducers/auth/apiAuthSlice";
import { formatGqlError } from "../../utils/auth";
import ResponseMessages from "../../constants/response-codes";

const useLoginForm = (props?: { initialValues: ILoginState }) => {
	const router = useRouter();
	const { initialValues } = props || {};
	const initial: ILoginState = {
		email: "",
		password: "",
	};
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<ILoginState>(initialValues || initial);

	const [error, setError] = useState<string[]>([]);
	const [getMentorProfile] = useLazyQuery<{ getMentorProfile: IMentor }, any>(GET_MENTOR_PROFILE);

	const handleChange = (field: keyof ILoginState) => (e: ChangeEvent<HTMLInputElement>) => {
		setLoading(false);
		setError([]);
		setState({ ...state, [field]: e.target.value });
	};
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError([]);
		if (!isEmail(state.email)) {
			setLoading(false);
			setError(["email"]);
			toast.error("Please enter a valid email", ToastDefaultOptions({ id: "auth_form_pop" }));
			return;
		}
		if (!state.password) {
			setLoading(false);
			setError(["password"]);
			toast.error("Please enter your password", ToastDefaultOptions({ id: "auth_form_pop" }));
			return;
		}
		// Perform login api call here
		try {
			const { payload } = await dispatch(loginUser({ email: state.email, password: state.password }) as any);
			const { success, is_mentor, is_admin, error } = payload;
			if (!success && error && error === ResponseMessages.ACCOUNT_NOT_ACTIVE) {
				toast.info(
					"An OTP has been sent to your phone number/email",
					ToastDefaultOptions({ id: "auth_form_pop" }),
				);
				// Todo: request for otp mutation here, before redirecting
				router.push("/auth/verification/signup");
			}
		} catch (error) {
			console.error({ error });
			toast.error("Something went wrong", { ...ToastDefaultOptions({ id: "error" }) });
		} finally {
			setLoading(false);
		}
	};
	return { loading, handleSubmit, currentState: state, error, handleChange };
};
export default useLoginForm;

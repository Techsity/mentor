import React from "react";
import LoginAndAuthPageTemplate from "../../components/templates/auth/login-and-signup";
import { useSelector } from "react-redux";
import {
	isLoggedIn,
	currentUser,
} from "../../redux/reducers/features/authSlice";
import { useRouter } from "next/router";
import ActivityIndicator from "../../components/ui/atom/loader/ActivityIndicator";

const AuthPage = () => {
	const router = useRouter();
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);
	const next = router.query.next as string;

	if (auth || user) {
		if (next) router.replace(decodeURIComponent(next));
		// router.replace("/dashboard");
		return (
			<div className="min-h-screen items-center flex justify-center">
				<ActivityIndicator
					size={60}
					color="#70C5A1"
					style={{ borderWidth: 8 }}
				/>
			</div>
		);
	}
	return <LoginAndAuthPageTemplate />;
};

export default AuthPage;

import React, { useEffect } from "react";
import LoginAndAuthPageTemplate from "../../components/templates/auth/login-and-signup";
import { useSelector } from "react-redux";
import { isLoggedIn, currentUser } from "../../redux/reducers/auth/authSlice";
import { useRouter } from "next/router";
import ActivityIndicator from "../../components/ui/atom/loader/ActivityIndicator";

const AuthPage = () => {
	const router = useRouter();
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);
	const next = router.query.next as string;

	useEffect(() => {
		if (auth || user) {
			if (next) router.replace(decodeURIComponent(next));
			router.replace("/profile");
		}
	}, [auth, user, next, router]);

	if (auth || user) {
		return (
			<div className="min-h-screen items-center flex sm:flex-row flex-col justify-center gap-2">
				<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
				{auth && user && <p className="text-sm text-center text-[#70C5A1]">Preparing your dashboard...</p>}
			</div>
		);
	}

	return <LoginAndAuthPageTemplate />;
};

export default AuthPage;

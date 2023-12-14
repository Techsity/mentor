import React from "react";
import MentorOnboardingPageTemplate from "../../components/templates/mentor/onboarding";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/reducers/features/authSlice";
import { useRouter } from "next/router";

const MentorOnboardingPage = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	console.log(user?.mentor);
	if (user?.mentor && typeof window !== "undefined") {
		router.replace("/profile");
		return <div className="min-h-screen"></div>;
	}
	return <MentorOnboardingPageTemplate />;
};

export default MentorOnboardingPage;

import React from "react";
import HomepageTemplate from "../components/templates/home";
import { GetServerSidePropsContext } from "next";
import { currentUser, isLoggedIn } from "../redux/reducers/authSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Homepage = () => {
	// const router = useRouter();
	// const auth = useSelector(isLoggedIn);
	// const user = useSelector(currentUser);
	// // redirect to dashboard if user is authenticated
	// if ((auth || user )&& typeof window !== "undefined") {
	// 	router.replace(`/dashboard`);
	// 	return <div className="min-h-screen"></div>;
	// }
	return <HomepageTemplate />;
};

export default Homepage;

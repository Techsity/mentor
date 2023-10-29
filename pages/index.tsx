import React from "react";
import HomepageTemplate from "../components/templates/home";
import { GetServerSidePropsContext } from "next";
import store, { RootState } from "../redux/store";
import { isLoggedIn } from "../redux/reducers/features/authSlice";

const Homepage = () => {
	return (
		<div>
			<HomepageTemplate />
		</div>
	);
};

// redirect to dashboard if user is authenticated
export const getServerSideProps = () => {
	const state = store.getState();
	// const { isLoggedIn } = store.getState().auth;
	console.log("isLoggedIn", state.auth.isLoggedIn);
	return { props: {} };
	// return { props: {} };
};
export default Homepage;

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isLoggedIn } from "../redux/reducers/features/authSlice";
import { GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import store, { RootState } from "../redux/store";

const protectedPageWrapper = (PageComponent: NextPage) => {
	const Page = (props: any) => {
		const loggedIn = useSelector(isLoggedIn);
		const router = useRouter();
		if (!loggedIn) {
			router.replace("/auth?login");
			return <div className="min-h-screen"></div>;
		}
		return <PageComponent {...props} />;
	};

	return Page;
};

export default protectedPageWrapper;

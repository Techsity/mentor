import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/features/authSlice";
import { GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import store, { RootState } from "../redux/store";

const protectedPageWrapper = (PageComponent: NextPage) => {
	const Page = (props: any) => {
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		const router = useRouter();
		if (!auth || !user) {
			router.replace("/auth?login");
			return <div className="min-h-screen"></div>;
		}
		return <PageComponent {...props} />;
	};

	return Page;
};

export default protectedPageWrapper;

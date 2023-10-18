import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/features/authSlice";
import { GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import store, { RootState } from "../redux/store";

const protectedPageWrapper = (PageComponent: NextPage) => {
	const Page = (props: any) => {
		const router = useRouter();
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		const next = router.asPath as string;
		if (!auth || !user) {
			// localStorage.setItem("previousUrl", router.asPath);
			router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
			return <div className="min-h-screen"></div>;
		}
		return <PageComponent {...props} />;
	};
	return Page;
};

export default protectedPageWrapper;

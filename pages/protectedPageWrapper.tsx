import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/features/authSlice";
import { NextPage } from "next";

const protectedPageWrapper = (PageComponent: NextPage<any> | React.FC<any>) => {
	const Page = (props: any) => {
		const router = useRouter();
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		const next = location.href;
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

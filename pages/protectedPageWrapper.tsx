import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/features/authSlice";
import { NextPage } from "next";
import ActivityIndicator from "../components/ui/atom/loader/ActivityIndicator";

const protectedPageWrapper = (PageComponent: NextPage<any> | React.FC<any>) => {
	const Page = (props: any) => {
		const router = useRouter();
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		if (typeof window !== "undefined") {
			const next = router.basePath.concat(router.asPath);
			if (!auth || !user) {
				// localStorage.setItem("previousUrl", router.asPath);
				// router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
				return (
					<div className="min-h-screen items-center flex justify-center">
						<ActivityIndicator
							size={90}
							color="#70C5A1"
							style={{ borderWidth: 8 }}
						/>
					</div>
				);
			}
		}

		return <PageComponent {...props} />;
	};

	return Page;
};

export default protectedPageWrapper;

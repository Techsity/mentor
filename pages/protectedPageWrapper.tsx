import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/authSlice";
import { NextPage } from "next";
import ActivityIndicator from "../components/ui/atom/loader/ActivityIndicator";
import { useEffect } from "react";

const protectedPageWrapper = (PageComponent: NextPage<any> | React.FC<any>) => {
	const Page = (props: any) => {
		const router = useRouter();
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		const next = router.basePath.concat(router.asPath);

		useEffect(() => {
			if (!auth || !user) {
				if (next) router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
			}
		}, [auth, user, next, router]);

		if (!auth || !user) {
			return (
				<div className="min-h-screen items-center flex justify-center">
					<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
				</div>
			);
		}

		return <PageComponent {...props} />;
	};

	return Page;
};

export default protectedPageWrapper;

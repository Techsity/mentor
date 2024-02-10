import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn } from "../redux/reducers/authSlice";
import { NextPage } from "next";
import ActivityIndicator from "../components/ui/atom/loader/ActivityIndicator";
import { useEffect } from "react";

const protectedPageWrapper = (PageComponent: NextPage<any> | React.FC<any>, props?: { adminCanView: boolean }) => {
	const { adminCanView } = props || {};
	const Page = (props: any) => {
		const router = useRouter();
		const auth = useSelector(isLoggedIn);
		const user = useSelector(currentUser);
		const next = router.basePath.concat(router.asPath);

		useEffect(() => {
			if (!auth || !user || user?.is_admin) {
				if (user?.is_admin && !adminCanView) {
					window.location.href = String(process.env.NEXT_PUBLIC_MENTOR_ADMIN_URL);
				} else if (next) router.replace(`/auth?login&next=${encodeURIComponent(next)}`);
			}
		}, [auth, user, next, router]);

		if (!auth || !user || (user.is_admin && !adminCanView)) {
			return (
				<div className="min-h-screen items-center flex sm:flex-row flex-col justify-center gap-2">
					<ActivityIndicator size={60} color="#70C5A1" style={{ borderWidth: 8 }} />
					{user?.is_admin && (
						<p className="text-sm text-center text-[#70C5A1]">Preparing your dashboard...</p>
					)}
				</div>
			);
		}

		return <PageComponent {...props} />;
	};

	return Page;
};

export default protectedPageWrapper;

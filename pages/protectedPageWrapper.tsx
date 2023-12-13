import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { currentUser, isLoggedIn, setCredentials } from "../redux/reducers/features/authSlice";
import { NextPage, NextPageContext } from "next";
import ActivityIndicator from "../components/ui/atom/loader/ActivityIndicator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../services/graphql/mutations/auth";
import { AppContext, AppInitialProps } from "next/app";
import store from "../redux/store";
import { IUser } from "../interfaces/user.interface";

interface PageProps {
	user: IUser | null;
	auth: boolean;
}

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

	// Page.getInitialProps = async (ctx: NextPageContext): Promise<PageProps> => {
	// 	const user = store.getState().auth.user;
	// 	const auth = store.getState().auth.isLoggedIn;

	// 	if (ctx.req) {
	// 		console.log(ctx.req);
	// 	}
	// 	return { user, auth };
	// };

	return Page;
};

export default protectedPageWrapper;

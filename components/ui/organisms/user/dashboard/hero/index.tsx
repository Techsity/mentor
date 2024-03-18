/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { LiveWorkshopGlobeSvg } from "../../../../atom/icons/svgs";
import DashboardSearchbar from "../../../../atom/inputs/DashboardSearchbar";
import { ICourseCategory } from "../../../../../../interfaces";
import ActivityIndicator from "../../../../atom/loader/ActivityIndicator";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../../../services/graphql/queries/course";
import { slugify } from "../../../../../../utils";

type PropState = { categories: ICourseCategory[]; loading: boolean };

const MenteeDashboardHero = () => {
	const router = useRouter();
	const [state, setState] = React.useState<PropState>({ categories: [], loading: true });
	const { categories, loading } = state;
	// Todo: implement a search query global caching system
	const [fetchCategories] = useLazyQuery<{ getAllCategories: ICourseCategory[] }, any>(GET_ALL_CATEGORIES, {
		fetchPolicy: "cache-and-network",
	});

	useEffect(() => {
		fetchCategories()
			.then((res) => {
				if (res.data)
					setState({
						...state,
						categories: res.data?.getAllCategories,
						loading: res.loading,
					});
			})
			.catch((err) => {
				console.error("Error fetchng course catgories: ", err);
				setState({ ...state, loading: false });
			});
	}, []);

	return (
		<div className="md:h-[75vh] md:px-20 px-10 pt-20 bg-[#0C202B] relative overflow-hidden">
			<div className="opacity-20 top-0 left-0 absolute w-full">
				<img src="/assets/images/map3.png" alt="" className="animate__animated animate__fadeIn" />
			</div>
			<div className="flex justify-center lg:justify-between items-start sm:mt-28 relative z-30 text-white">
				<div className="">
					<h1 className="md:text-4xl text-2xl px-3" style={{ fontFamily: "Days One" }}>
						Start Learning from anywhere!
					</h1>
					<div className="my-6">
						<DashboardSearchbar />
					</div>
					{!loading ? (
						categories.length >= 1 && (
							<div className="text-sm mx-3">
								<h1>Popular Categories</h1>
								<div className="flex flex-wrap gap-3 items-center max-w-lg sm:max-w-xl my-4">
									{categories
										.map((category, i) => (
											<div
												key={i}
												onClick={() => {
													router.push(
														{
															pathname: router.pathname,
															query: {
																category: slugify(category.title),
															},
														},
														undefined,
														{ scroll: false },
													);
												}}
												className="bg-[#70C5A1] flex gap-5 items-center text-center p-1.5 duration-300 cursor-pointer hover:bg-[#4F8E74] px-4 rounded-full">
												<span className="">{category.title}</span>
												<button type="submit" className="">
													<svg width="18" height="24" viewBox="0 0 24 23" fill="none">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M10.5882 3.87604e-08C8.9338 0.000179164 7.30355 0.39665 5.83389 1.15622C4.36422 1.9158 3.09791 3.01637 2.14095 4.36581C1.184 5.71524 0.564248 7.27428 0.333586 8.91241C0.102923 10.5505 0.268058 12.2201 0.815168 13.7813C1.36228 15.3425 2.27544 16.7499 3.47822 17.8858C4.68099 19.0216 6.13838 19.8528 7.72837 20.3098C9.31837 20.7667 10.9947 20.8362 12.617 20.5123C14.2394 20.1884 15.7605 19.4806 17.0532 18.4481L21.2822 22.677C21.4992 22.8866 21.7899 23.0026 22.0917 23C22.3934 22.9973 22.682 22.8763 22.8954 22.663C23.1087 22.4496 23.2298 22.161 23.2324 21.8593C23.235 21.5576 23.119 21.2669 22.9094 21.0499L18.6803 16.821C19.8978 15.2973 20.6603 13.4608 20.88 11.5229C21.0997 9.585 20.7677 7.62442 19.9222 5.86687C19.0767 4.10932 17.752 2.62623 16.1007 1.58831C14.4494 0.550393 12.5386 -0.000168668 10.5882 3.87604e-08ZM3.68359 10.3564C3.68359 9.44968 3.86218 8.55188 4.20917 7.71422C4.55616 6.87656 5.06474 6.11544 5.70589 5.47433C6.34704 4.83321 7.1082 4.32465 7.9459 3.97767C8.7836 3.6307 9.68145 3.45212 10.5882 3.45212C11.4949 3.45212 12.3927 3.6307 13.2304 3.97767C14.0681 4.32465 14.8293 4.83321 15.4704 5.47433C16.1116 6.11544 16.6202 6.87656 16.9672 7.71422C17.3142 8.55188 17.4927 9.44968 17.4927 10.3564C17.4927 12.1875 16.7653 13.9436 15.4704 15.2384C14.1756 16.5332 12.4194 17.2606 10.5882 17.2606C8.75696 17.2606 7.00075 16.5332 5.70589 15.2384C4.41104 13.9436 3.68359 12.1875 3.68359 10.3564Z"
															fill="white"
														/>
													</svg>
												</button>
											</div>
										))
										.slice(0, 4)}
								</div>
							</div>
						)
					) : (
						<div className="flex justify-center items-center">
							<ActivityIndicator size={30} />
						</div>
					)}
				</div>
				<div className="hidden lg:flex justify-center">
					<div className="pb-10 md:pb-0">
						<AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
							<div className="relative">
								<div className="absolute left-[23%]">
									<LiveWorkshopGlobeSvg />
								</div>
								<img src="/assets/svgs/live_workshop2.svg" alt="" className="z-10 relative" />
							</div>
						</AnimationOnScroll>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenteeDashboardHero;

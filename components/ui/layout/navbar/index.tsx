import React from "react";
import LandingSearchBar from "../../atom/forms/LandingSearchBar";
import { MentorLogoDark } from "../../atom/icons/svgs";
import { useRouter } from "next/router";
import { MenuSharp } from "react-ionicons";
import { useSidebar } from "../../../../context/sidebar.context";
import NavLinksComponent from "./NavLinksComponent";
import { useSelector } from "react-redux";
import { currentUser, isLoggedIn } from "../../../../redux/reducers/auth/authSlice";
import CurrentUserProfileCard from "../../atom/common/user/CurrentUserProfileCard";
import NotificationCard from "../../atom/cards/notification";
import { useNotificationContext } from "../../../../context/notification.context";
import classNames from "classnames";

const Navbar = () => {
	const router = useRouter();
	const user = useSelector(currentUser);
	const auth = useSelector(isLoggedIn);
	const { toggleSidebar } = useSidebar();

	const excludedPaths: string[] = ["auth", "onboarding", "admin", "new", "content", "edit", "session"];

	const hideNavSections: boolean = excludedPaths.some((path) => router.asPath.includes(path));
	const { toggleVisibility, isOpen: showNotificationPanel, notificationsCount } = useNotificationContext();

	return (
		<nav className="sticky h-20 top-0 w-full z-40 items-center bg-white shadow flex 2xl:gap-6 justify-between p-4 sm:px-12 tracking-tight oveflow-hidden animate__animated animate__fadeIn">
			<div onClick={() => router.push("/")} className="relative cursor-pointer">
				<MentorLogoDark />
				<span className="absolute -right-5 -top-3 text-[#70C5A1] text-xs">Beta</span>
			</div>
			{!hideNavSections && (
				<div className="ml-6 xl:grid hidden flex-grow relative max-w-lg">
					<LandingSearchBar />
				</div>
			)}
			{!hideNavSections && <NavLinksComponent />}
			<div className="flex items-center gap-3 sm:gap-6 select-none">
				{!user && !auth ? (
					<div className="hidden sm:flex items-center gap-6 pl-10 2xl:pl-40">
						<span
							onClick={() => router.push("/auth?login", "/auth?login", { scroll: true })}
							className="hover:text-[#FFB100] text-sm text-[#094B10] cursor-pointer duration-300">
							Login
						</span>
						<span
							onClick={() => router.push("/auth?signup", "/auth?signup", { scroll: true })}
							className="bg-[#FFB100] text-sm select-none duration-300 hover:bg-[#C68900] p-2 px-5 text-[#094B10] cursor-pointer rounded-lg">
							Signup
						</span>
					</div>
				) : (
					user &&
					auth && (
						<div className="flex items-center gap-4 sm:gap-10 pl-10 2xl:pl-40">
							<CurrentUserProfileCard />
							<div
								onClick={toggleVisibility}
								className={classNames(
									"border cursor-pointer flex justify-center border-[#70C5A1] p-2 duration-300 group",
									showNotificationPanel ? "bg-[#70C5A1]" : " bg-white hover:bg-[#70C5A1]",
								)}>
								<div className="relative">
									{notificationsCount > 0 && (
										<>
											<div className="absolute rounded-full p-[4px] bg-red-500 animate-ping -right-0" />
											<div className="absolute rounded-full p-[4px] bg-red-500 -right-0" />
										</>
									)}
									<svg
										width="26"
										height="28"
										viewBox="0 0 17 19"
										fill="none"
										className={classNames(
											"duration-300",
											showNotificationPanel
												? "fill-white"
												: "group-hover:fill-white fill-[#70C5A1]",
										)}>
										<path d="M15.8932 11.8439L15.0461 10.0423C14.8582 9.64905 14.7324 8.91548 14.7766 8.48208L14.9489 6.79364C15.2835 3.51608 12.8918 0.580624 9.62323 0.247007C6.34474 -0.0785033 3.41021 2.30418 3.07567 5.58175L2.90425 7.26116C2.86002 7.69455 2.58857 8.38758 2.33409 8.73565L1.14054 10.329C0.685011 10.9485 0.518228 11.6887 0.695659 12.3637C0.872168 13.0477 1.36949 13.6276 2.06786 13.9361C3.00982 14.3606 3.97003 14.6958 4.95475 14.9697C5.05223 14.9979 5.15063 15.0171 5.24811 15.0453L5.63986 15.14C5.87093 15.2001 6.10292 15.2511 6.34486 15.294C7.47206 15.5175 8.61778 15.6345 9.76689 15.6433C9.9764 15.6465 10.1859 15.6496 10.3873 15.6428C10.5517 15.6413 10.7161 15.6399 10.8813 15.6294C10.9816 15.6305 11.0827 15.6225 11.1839 15.6146C12.2118 15.5553 13.2398 15.4048 14.2481 15.1793C14.597 15.1009 14.924 14.9458 15.2053 14.7252C15.4866 14.5045 15.7153 14.2239 15.8745 13.9038C16.1964 13.2525 16.1998 12.5047 15.8932 11.8439ZM9.54969 7.49242C9.53111 7.67441 9.441 7.84157 9.29917 7.95713C9.15735 8.07268 8.97543 8.12716 8.79343 8.10859C8.61144 8.09001 8.44428 7.9999 8.32872 7.85807C8.21317 7.71625 8.15869 7.53433 8.17726 7.35234L8.46296 4.55331C8.48153 4.37132 8.57165 4.20416 8.71347 4.0886C8.85529 3.97305 9.03721 3.91857 9.21921 3.93714C9.4012 3.95572 9.56837 4.04583 9.68392 4.18766C9.79947 4.32948 9.85396 4.5114 9.83538 4.6934L9.54969 7.49242ZM10.5052 16.7222C10.2617 17.2285 9.86821 17.6475 9.37823 17.9223C8.88826 18.1971 8.32555 18.3144 7.76659 18.2582C7.05329 18.1854 6.37851 17.8246 5.93444 17.2593C5.67316 16.9589 5.49332 16.5756 5.4047 16.1925C5.52024 16.2225 5.63669 16.2436 5.76126 16.2745C5.96616 16.3228 6.1801 16.372 6.39495 16.4122C6.905 16.5099 7.42593 16.5904 7.94961 16.6439C8.46427 16.6964 8.9817 16.7218 9.49193 16.7283C9.68339 16.7296 9.87392 16.7399 10.0573 16.7313L10.5052 16.7222Z" />
									</svg>
								</div>
							</div>
							{showNotificationPanel && <NotificationCard />}
						</div>
					)
				)}

				<div className="md:hidden">
					<MenuSharp onClick={toggleSidebar} width="30px" height="30px" cssClasses="cursor-pointer" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MenuSharp } from "react-ionicons";
import navLinks from "../../../../data/navlinks";
import { MentorLogoDark } from "../../atom/icons/svgs";
import Link from "next/link";
import { currentUserRole } from "../../../../utils/auth";
import NotificationCard from "../../atom/cards/notification";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/features/authSlice";

const AuthNavbar = () => {
	const router = useRouter();
	const [showNotificationPanel, setShowNotificationPanel] =
		useState<boolean>(false);
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
	const [activeSublink, setActiveSublink] = useState<number | null>(null);

	const CurrentUser = () => {
		const user = useSelector(currentUser);
		return (
			<Link href={`/dashboard`}>
				<div className="flex items-center gap-3 cursor-pointer">
					<div className="rounded-full w-9 h-9 relative">
						<img
							src={user?.avatar || "/assets/images/avatar.png"}
							alt={user?.fullName}
							className="w-full h-full"
						/>
					</div>
					<div className="leading-none sm:inline-block hidden">
						<h1 className="text-lg font-medium">
							{user?.fullName.split(" ")[0] +
								" " +
								user?.fullName.split(" ")[1]}
						</h1>
						<p className="text-[#70C5A1] capitalize font-[300]">
							{user?.role}
						</p>
					</div>
				</div>
			</Link>
		);
	};

	return (
		<nav className="sticky h-20 top-0 w-full z-50 items-center bg-white shadow flex justify-between 2xl:gap-6 justify-between p-4 sm:px-12 tracking-tight oveflow-hidden animate__animated animate__slideInDown">
			<Link href={`/`}>
				<div>
					<MentorLogoDark className="cursor-pointer" />
				</div>
			</Link>
			{/* {!hideNavSections ? (
				<div className="ml-6 xl:grid hidden flex-grow relative">
					<LandingSearchBar />
				</div>
			) : null} */}

			<ul className="hidden lg:flex items-center gap-10 whitespace-nowrap ml-4 text-[#094B10]">
				{navLinks.map(({ link, name, sublinks }, index) => {
					return sublinks ? (
						<li
							key={index}
							className="relative px-2 font-[300] select-none"
							onMouseEnter={() => setActiveSublink(index)}
							onMouseLeave={() => {
								setActiveSublink(null);
								setActiveDropdown(null);
							}}>
							<span
								className={`duration-500 relative z-10 cursor-pointer`}>
								{name}
							</span>
							<span
								className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
									router.asPath.includes(link)
										? "w-full"
										: "hover:w-full"
								}`}
							/>
							{activeSublink === index &&
							sublinks &&
							sublinks?.length > 0 ? (
								<div>
									<div className="h-[100px] group duration-300 absolute top-6 left-0 bg-white w-auto items-center gap-3 flex justify-between divide-x  animate__animate animate__fadeIn">
										{sublinks?.map((sublink, i) => (
											<div key={i}>
												<div
													className="mx-16 text-[#70C5A1] cursor-pointer flex flex-col justify-center items-center gap-2"
													onMouseEnter={() =>
														setActiveDropdown(i)
													}
													// onMouseLeave={() => setActiveDropdown(null)}
												>
													{sublink.icon}
													{sublink.name}
												</div>
												{activeDropdown === i &&
													sublink.dropdown &&
													sublink.dropdown.length >
														0 && (
														<div className="absolute w-full text-[#70C5A1] top-[100%] py-5 pb-10 left-0 bg-white hidden group-hover:grid grid-cols-3 gap-5 overflow-hidden animate__animate animate__fadeIn">
															{sublink.dropdown.map(
																(
																	{
																		link: dropdownLink,
																		name: dropdownLinkName,
																	},
																	dropdownIndex,
																) => (
																	<Link
																		key={
																			dropdownIndex
																		}
																		href={
																			dropdownLink
																		}>
																		<div
																			key={
																				i
																			}
																			onClick={() => {
																				setActiveSublink(
																					null,
																				);
																				setActiveDropdown(
																					null,
																				);
																			}}
																			className="px-6 relative text-sm cursor-pointer text-decoration hover:underline">
																			{
																				dropdownLinkName
																			}
																			<span className="absolute -right-4 bg-[#094B10] bg-opacity-20 h-[200%] w-[1px]"></span>
																		</div>
																	</Link>
																),
															)}
														</div>
													)}
											</div>
										))}
									</div>
								</div>
							) : null}
						</li>
					) : (
						<Link href={link} key={index}>
							<li className="relative px-2 font-[300] select-none">
								{/* <span
								className={`duration-500 ${
									router.asPath==link ? "text-white" : "group-hover:text-white"
								} relative z-10`}
							> */}
								<span
									className={`duration-500 relative z-10 cursor-pointer`}>
									{name}
								</span>
								<span
									className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
										router.asPath.includes(link)
											? "w-full"
											: "hover:w-full"
									}`}
								/>
								{/* <span
								className={`absolute h-full w-0 right-0 bottom-0 bg-[#094B10] duration-300 ${
									router.asPath==link ? "w-full" : "group-hover:w-full"
								}`}
							/> */}
							</li>
						</Link>
					);
				})}
			</ul>

			<div className="flex items-center gap-3 sm:gap-6 select-none">
				<div className="flex items-center gap-4 sm:gap-10 pl-10 2xl:pl-40">
					<CurrentUser />
					<div
						onClick={() =>
							setShowNotificationPanel(!showNotificationPanel)
						}
						className="border cursor-pointer flex justify-center border-[#70C5A1] p-2 group duration-300 bg-white hover:bg-[#70C5A1]">
						{showNotificationPanel ? <NotificationCard /> : null}
						<div className="group-hover:hidden">
							<svg
								width="26"
								height="28"
								viewBox="0 0 17 19"
								fill="none">
								<path
									d="M15.8932 11.8439L15.0461 10.0423C14.8582 9.64905 14.7324 8.91548 14.7766 8.48208L14.9489 6.79364C15.2835 3.51608 12.8918 0.580624 9.62323 0.247007C6.34474 -0.0785033 3.41021 2.30418 3.07567 5.58175L2.90425 7.26116C2.86002 7.69455 2.58857 8.38758 2.33409 8.73565L1.14054 10.329C0.685011 10.9485 0.518228 11.6887 0.695659 12.3637C0.872168 13.0477 1.36949 13.6276 2.06786 13.9361C3.00982 14.3606 3.97003 14.6958 4.95475 14.9697C5.05223 14.9979 5.15063 15.0171 5.24811 15.0453L5.63986 15.14C5.87093 15.2001 6.10292 15.2511 6.34486 15.294C7.47206 15.5175 8.61778 15.6345 9.76689 15.6433C9.9764 15.6465 10.1859 15.6496 10.3873 15.6428C10.5517 15.6413 10.7161 15.6399 10.8813 15.6294C10.9816 15.6305 11.0827 15.6225 11.1839 15.6146C12.2118 15.5553 13.2398 15.4048 14.2481 15.1793C14.597 15.1009 14.924 14.9458 15.2053 14.7252C15.4866 14.5045 15.7153 14.2239 15.8745 13.9038C16.1964 13.2525 16.1998 12.5047 15.8932 11.8439ZM9.54969 7.49242C9.53111 7.67441 9.441 7.84157 9.29917 7.95713C9.15735 8.07268 8.97543 8.12716 8.79343 8.10859C8.61144 8.09001 8.44428 7.9999 8.32872 7.85807C8.21317 7.71625 8.15869 7.53433 8.17726 7.35234L8.46296 4.55331C8.48153 4.37132 8.57165 4.20416 8.71347 4.0886C8.85529 3.97305 9.03721 3.91857 9.21921 3.93714C9.4012 3.95572 9.56837 4.04583 9.68392 4.18766C9.79947 4.32948 9.85396 4.5114 9.83538 4.6934L9.54969 7.49242ZM10.5052 16.7222C10.2617 17.2285 9.86821 17.6475 9.37823 17.9223C8.88826 18.1971 8.32555 18.3144 7.76659 18.2582C7.05329 18.1854 6.37851 17.8246 5.93444 17.2593C5.67316 16.9589 5.49332 16.5756 5.4047 16.1925C5.52024 16.2225 5.63669 16.2436 5.76126 16.2745C5.96616 16.3228 6.1801 16.372 6.39495 16.4122C6.905 16.5099 7.42593 16.5904 7.94961 16.6439C8.46427 16.6964 8.9817 16.7218 9.49193 16.7283C9.68339 16.7296 9.87392 16.7399 10.0573 16.7313L10.5052 16.7222Z"
									fill="#70C5A1"
								/>
							</svg>
						</div>
						<div className="hidden group-hover:block">
							<svg
								width="26"
								height="28"
								viewBox="0 0 17 19"
								fill="none">
								<path
									d="M15.8932 11.8439L15.0461 10.0423C14.8582 9.64905 14.7324 8.91548 14.7766 8.48208L14.9489 6.79364C15.2835 3.51608 12.8918 0.580624 9.62323 0.247007C6.34474 -0.0785033 3.41021 2.30418 3.07567 5.58175L2.90425 7.26116C2.86002 7.69455 2.58857 8.38758 2.33409 8.73565L1.14054 10.329C0.685011 10.9485 0.518228 11.6887 0.695659 12.3637C0.872168 13.0477 1.36949 13.6276 2.06786 13.9361C3.00982 14.3606 3.97003 14.6958 4.95475 14.9697C5.05223 14.9979 5.15063 15.0171 5.24811 15.0453L5.63986 15.14C5.87093 15.2001 6.10292 15.2511 6.34486 15.294C7.47206 15.5175 8.61778 15.6345 9.76689 15.6433C9.9764 15.6465 10.1859 15.6496 10.3873 15.6428C10.5517 15.6413 10.7161 15.6399 10.8813 15.6294C10.9816 15.6305 11.0827 15.6225 11.1839 15.6146C12.2118 15.5553 13.2398 15.4048 14.2481 15.1793C14.597 15.1009 14.924 14.9458 15.2053 14.7252C15.4866 14.5045 15.7153 14.2239 15.8745 13.9038C16.1964 13.2525 16.1998 12.5047 15.8932 11.8439ZM9.54969 7.49242C9.53111 7.67441 9.441 7.84157 9.29917 7.95713C9.15735 8.07268 8.97543 8.12716 8.79343 8.10859C8.61144 8.09001 8.44428 7.9999 8.32872 7.85807C8.21317 7.71625 8.15869 7.53433 8.17726 7.35234L8.46296 4.55331C8.48153 4.37132 8.57165 4.20416 8.71347 4.0886C8.85529 3.97305 9.03721 3.91857 9.21921 3.93714C9.4012 3.95572 9.56837 4.04583 9.68392 4.18766C9.79947 4.32948 9.85396 4.5114 9.83538 4.6934L9.54969 7.49242ZM10.5052 16.7222C10.2617 17.2285 9.86821 17.6475 9.37823 17.9223C8.88826 18.1971 8.32555 18.3144 7.76659 18.2582C7.05329 18.1854 6.37851 17.8246 5.93444 17.2593C5.67316 16.9589 5.49332 16.5756 5.4047 16.1925C5.52024 16.2225 5.63669 16.2436 5.76126 16.2745C5.96616 16.3228 6.1801 16.372 6.39495 16.4122C6.905 16.5099 7.42593 16.5904 7.94961 16.6439C8.46427 16.6964 8.9817 16.7218 9.49193 16.7283C9.68339 16.7296 9.87392 16.7399 10.0573 16.7313L10.5052 16.7222Z"
									fill="#fff"
								/>
							</svg>
						</div>
					</div>
				</div>
				<div className="md:hidden">
					<MenuSharp
						width="30px"
						height="30px"
						cssClasses="cursor-pointer"
					/>
				</div>
			</div>
		</nav>
	);
};

export default AuthNavbar;

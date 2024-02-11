import React, { useMemo, useState } from "react";
import navLinks, { NavLinkSubLink } from "../../../../data/navlinks";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/reducers/authSlice";
import { CourseType, ICourseCategory } from "../../../../interfaces";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../../../../services/graphql/mutations/courses";

type MainCourseType = {
	courseType: CourseType;
	categories: ICourseCategory[];
};

const NavLinksComponent = () => {
	const user = useSelector(currentUser);
	const router = useRouter();
	const [activeDropdown, setActiveDropdown] = useState<NavLinkSubLink["dropdown"] | null>(null);
	const [activeSublink, setActiveSublink] = useState<number | null>(null);

	const { data, loading, error } = useQuery<{ getAllCategories: ICourseCategory[] }, any>(GET_ALL_CATEGORIES, {
		fetchPolicy: "cache-and-network",
		ssr: false,
	});

	const categories = useMemo(() => {
		if (!loading) {
			if (error) {
				console.error({ error: error });
				return [];
			} else if (data && data.getAllCategories) {
				return data.getAllCategories;
			}
			return [];
		}
	}, [data, loading, error]);

	const filteredCategories =
		categories && categories.length > 0
			? categories.filter(
					(cat) => cat.category_type.type.toLowerCase().trim() === activeDropdown?.toLowerCase().trim(),
			  )
			: [];

	return (
		<div className="hidden md:flex justify-end lg:justify-between gap-6 items-center text-[#094B10] flex-grow max-w-lg">
			<ul className="hidden lg:flex items-center gap-6 whitespace-nowrap ml-4">
				{navLinks.map(({ link, name, sublinks, id }, index) => {
					return sublinks ? (
						<li
							key={index}
							className="relative px-2 font-[300] text-sm select-none"
							onMouseEnter={() => setActiveSublink(index)}
							onMouseLeave={() => {
								setActiveSublink(null);
								setActiveDropdown(null);
							}}>
							<Link href={link} prefetch={false}>
								<span className={`duration-500 relative z-10 cursor-pointer`}>{name}</span>
							</Link>
							<span
								className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
									router.asPath.includes(link) ? "w-full" : "hover:w-full"
								}`}
							/>
							{activeSublink === index && sublinks && sublinks?.length > 0 ? (
								<div className="absolute top-0 left-0 pt-10 mx-auto">
									<div className="mx-auto h-[80px] duration-300 group bg-white border border-[#70C5A1] w-full items-center gap-3 flex justify-between divide-x animate__animated animate__fadeIn animate__fastest">
										{sublinks?.map((sublink, i) => (
											<div key={i}>
												<div
													onClick={() =>
														router.push(sublink.link, undefined, { scroll: true })
													}>
													<div
														className="mx-16 text-[#70C5A1] cursor-pointer flex flex-col justify-center items-center gap-2"
														onMouseEnter={() => setActiveDropdown(sublink.dropdown)}
														// onMouseLeave={() => setActiveDropdown(null)}
													>
														{sublink.icon}
														{sublink.name}
													</div>
												</div>
												{filteredCategories.length > 0 && (
													<div className="absolute w-full text-[#70C5A1] top-[100%] py-5 pb-10 left-0 border border-[#70C5A1] border-t-transparent bg-white hidden group-hover:grid grid-cols-3 gap-5 overflow-hidden animate__animate animate__fadeIn">
														{filteredCategories.map(({ title }, dropdownIndex) => (
															<div
																key={dropdownIndex}
																onClick={() =>
																	router.push(
																		`/courses?type=${sublink.dropdown.toLowerCase()}&category=${title.toLowerCase()}`,
																	)
																}>
																<div
																	key={i}
																	onClick={() => {
																		setActiveSublink(null);
																		setActiveDropdown(null);
																	}}
																	className="px-6 relative text-sm cursor-pointer text-decoration hover:underline">
																	{title}
																	<span className="absolute -right-4 bg-[#094B10] bg-opacity-20 h-[200%] w-[1px]"></span>
																</div>
															</div>
														))}
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							) : null}
						</li>
					) : (
						<li onClick={() => router.push(link)} className="relative px-2 font-[300] text-sm select-none">
							<span className={`duration-500 relative z-10 cursor-pointer`}>{name}</span>
							<span
								className={`absolute h-[2px] w-0 group-hover:left-0 right-0 -bottom-2 bg-[#094B10] duration-300 ${
									router.asPath.includes(link) ? "w-full" : "hover:w-full"
								}`}
							/>
						</li>
					);
				})}
			</ul>
			<div className="">
				{!user ? (
					<div
						onClick={() => router.push("/mentor/onboarding")}
						className="whitespace-nowrap border-[#094B10] select-none cursor-pointer font-[500] border-l-[.15em] border-r-[.15em] p-4 border-opacity-65 hover:text-white hover:bg-[#094B10] hover:rounded duration-300 h-5 flex items-center justify-center">
						Become a Mentor
					</div>
				) : (
					user &&
					!user?.is_mentor && (
						<div
							onClick={() => router.push("/mentor/onboarding")}
							className="whitespace-nowrap border-[#094B10] select-none cursor-pointer font-[500] border-l-[.15em] border-r-[.15em] p-4 border-opacity-65 hover:text-white hover:bg-[#094B10] hover:rounded duration-300 h-5 flex items-center justify-center">
							Become a Mentor
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default NavLinksComponent;

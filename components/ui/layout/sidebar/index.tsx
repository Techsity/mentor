import React, { useEffect } from "react";
import { useSidebar } from "../../../../context/sidebar.context";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { currentUser, isLoggedIn } from "../../../../redux/reducers/features/authSlice";
import navLinks, { NavLinkSubLink } from "../../../../data/navlinks";

const Sidebar = () => {
	const { isOpen, toggleSidebar } = useSidebar();
	const router = useRouter();
	const auth = useSelector(isLoggedIn);
	const user = useSelector(currentUser);

	useEffect(() => {
		if (isOpen) document.body.classList.add("overflow-hidden");
		else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
			// toggleSidebar({ close: true });
		};
	}, [isOpen]);

	return isOpen ? (
		<>
			<div
				className="z-50 bg-black/60 md:hidden fixed top-0 left-0 aniimate__animated animate__fadeIn w-full h-full"
				onClick={() => toggleSidebar()}
			/>
			<div className="right-0 top-0 z-50 fixed animate__animated animate__slideInRight animate__faster bg-[#033] h-full w-5/6 sm:w-1/2 md:hidden text-white p-5">
				<div className="relative w-full h-full">
					<span className="cursor-pointer text-3xl absolute -top-10 right-3" onClick={() => toggleSidebar()}>
						&times;
					</span>
					<div className="grid gap-5 mt-10">
						{navLinks.map((link, indx) => {
							return (
								<span
									onClick={() => {
										router.push(link.link);
										toggleSidebar({ close: true });
									}}
									className="cursor-pointer select-none text-white"
									key={indx}>
									{link.name}
								</span>
							);
						})}
					</div>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

export default Sidebar;

import React, { useEffect } from "react";
import { useSidebar } from "../../../../context/sidebar.context";

const Sidebar = () => {
	const { isOpen, toggleSidebar } = useSidebar();

	useEffect(() => {
		if (isOpen) document.body.classList.add("overflow-hidden");
	}, [isOpen]);

	return isOpen ? (
		<>
			<div
				className="z-50 bg-black/60 md:hidden absolute top-0 left-0 aniimate__animated animate__fadeIn sm:block hidden w-full h-full"
				onClick={toggleSidebar}
			/>
			<div className="right-0 z-50 fixed animate__animated animate__slideInRight animate__faster bg-[#094B10] h-full w-full sm:w-1/2 md:hidden text-white p-5">
				<div className="relative w-full h-full">
					<span
						className="cursor-pointer text-3xl absolute top-0 right-3"
						onClick={toggleSidebar}>
						&times;
					</span>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};

export default Sidebar;

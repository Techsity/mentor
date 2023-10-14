import React, { useEffect, useRef } from "react";
import { useTheme } from "../../../../context/theme.context";

const PagePreLoader = () => {
	const { theme } = useTheme();
	return (
		<div
			className={`select-none z-50 fixed h-full w-full bg-[whitesmoke] top-0 left-0 overflow-hidden min-h-screen min-w-screen flex justify-center items-center text-white`}>
			<div
				className={`absolute h-[50%] ${
					theme === "dark" ? "bg-[#021905]" : "bg-white"
				} w-full bottom-0 left-0 animate__animated animate__slideInLeft animate__slow`}></div>
			<div
				className={`absolute h-[50%] ${
					theme === "dark" ? "bg-[#021905]" : "bg-white"
				} w-full top-0 right-0 animate__animated animate__slideInRight animate__slow`}></div>
			<div
				className="flex gap-6 font-bold items-center lg:text-9xl text-7xl"
				style={{ fontFamily: "Days One" }}>
				<h1
					className={`${
						theme === "dark" ? "text-white" : "text-[#094B10]"
					} animate__animated animate__slideInDown`}>
					m
				</h1>
				<h1
					className={`${
						theme === "dark" ? "text-white" : "text-[#094B10]"
					} animate__animated animate__slideInDown animate__slowest`}>
					e
				</h1>
				<h1
					className={`${
						theme === "dark" ? "text-white" : "text-[#094B10]"
					} animate__animated animate__slideInDown animate__slower`}>
					n
				</h1>
				<h1
					className={`${
						theme === "dark" ? "text-white" : "text-[#094B10]"
					} animate__animated animate__slideInDown animate__animate_slow`}>
					t
				</h1>
				<h1 className="text-[#FFB100] animate__animated animate__bounce animate__infinite animate__slow">
					ö
				</h1>
				<h1 className="text-[#FFB100] animate__animated animate__bounce animate__infinite animate__slower">
					r
				</h1>
			</div>
		</div>
	);
};

export default PagePreLoader;

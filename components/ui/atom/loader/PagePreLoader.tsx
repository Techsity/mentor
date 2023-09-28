import React, { useEffect, useRef } from "react";

const PagePreLoader = () => {
	const bgRef = useRef<HTMLDivElement>(null);
	useEffect(() => {}, []);
	return (
		<div
			ref={bgRef}
			className="select-none z-50 fixed h-full w-full bg-[whitesmoke] top-0 left-0 overflow-hidden min-h-screen min-w-screen flex justify-center items-center text-white"
		>
			<div className="absolute w-full bg-[#CCFFE9] h-full left-0 animate__animated animate__slideInLeft animate__slow"></div>
			<div
				className="flex gap-6 font-bold items-center lg:text-9xl text-8xl"
				style={{ fontFamily: "Days One" }}
			>
				<h1 className="text-[#094B10] animate__animated animate__slideInDown">m</h1>
				<h1 className="text-[#094B10] animate__animated animate__slideInDown animate__slowest">
					e
				</h1>
				<h1 className="text-[#094B10] animate__animated animate__slideInDown animate__slower">
					n
				</h1>
				<h1 className="text-[#094B10] animate__animated animate__slideInDown animate__animate_slow">
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

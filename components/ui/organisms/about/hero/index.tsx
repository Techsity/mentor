import React from "react";

const AboutPageHero = () => {
	return (
		<div
			className="flex items-center justify-center min-h-[68vh] pt-20"
			style={{
				background: "url('/assets/images/about_hero.png')",
				backgroundSize: "100% 100%",
				backgroundRepeat: "no-repeat",
				backgroundColor: "#E2F6ED",
			}}
		>
			<div className="animate__animated animate__backInDown text-center text-[#094B10] grid gap-2">
				<p className="">Our goal is</p>
				<h1
					className="text-3xl sm:text-4xl max-w-3xl"
					style={{ fontFamily: "Days One" }}
				>
					Making Knowledge and Mentorship available to all{" "}
					<span className="text-[#FFB100]">FOR FREE</span>
				</h1>
				<div className="flex justify-center animate__animated animate__bounce animate__infinite animate__slow mt-10">
					<svg width="65" height="65" viewBox="0 0 65 65" fill="none">
						<circle cx="32.5" cy="32.5" r="32.5" fill="#094B10" />
						<path
							d="M18 36.1402C18 26.9329 22.9959 22.3292 32.9876 22.3292C42.9959 22.3292 48 26.9329 48 36.1402C48 40.7033 46.7179 44.1541 44.1538 46.4924C41.5897 48.8308 37.8677 50 32.9876 50C28.1241 50 24.4103 48.8308 21.8462 46.4924C19.2821 44.1541 18 40.7033 18 36.1402ZM23.1365 16.7268V15.8012C23.1365 13.9337 24.0877 13 25.9901 13H28.3722C30.2746 13 31.2258 13.9337 31.2258 15.8012V16.7268C31.2258 18.5943 30.2746 19.528 28.3722 19.528H25.9901C24.0877 19.528 23.1365 18.5943 23.1365 16.7268ZM39.4144 36.1646C39.4144 30.6272 37.2804 27.8585 33.0124 27.8585C28.7444 27.8585 26.6104 30.6272 26.6104 36.1646C26.6104 41.702 28.7444 44.4707 33.0124 44.4707C37.2804 44.4707 39.4144 41.702 39.4144 36.1646ZM35.5931 16.7268V15.8012C35.5931 13.9337 36.5443 13 38.4467 13H40.8288C42.7312 13 43.6824 13.9337 43.6824 15.8012V16.7268C43.6824 18.5943 42.7312 19.528 40.8288 19.528H38.4467C36.5443 19.528 35.5931 18.5943 35.5931 16.7268Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default AboutPageHero;

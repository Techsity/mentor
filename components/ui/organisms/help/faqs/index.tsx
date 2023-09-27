import React, { useEffect, useRef, useState } from "react";
import MenteeHelpFAQS from "./mentee";
import MentorHelpFAQS from "./mentor";

const HelpFAQS = () => {
	const [currentFaq, setCurrentFaq] = useState<"mentee" | "mentor">("mentee");
	const faqNavRef = useRef<HTMLDivElement>(null);
	const [isFixed, setIsFixed] = useState<boolean>(false);

	const stickNav = () => {
		if (faqNavRef.current) {
			const element = faqNavRef.current;
			const rect = element.getBoundingClientRect();
			if (rect.top <= 0 && !isFixed) {
				setIsFixed(true);
			} else if (rect.top > 0 && isFixed) {
				setIsFixed(false);
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", stickNav);
		return () => window.removeEventListener("scroll", stickNav);
	}, []);

	return (
		<div className="overflow-hidden h-full">
			{/* <div
				className={`flex justify-center w-full top-[9vh] sm:top-24 z-20 ${
					isFixed ? "fixed" : ""
				}`}
				ref={faqNavRef}
			> */}
			<div
				className="flex justify-center w-full top-[9vh] sm:top-24 z-20"
				ref={faqNavRef}
			>
				<div className="flex items-center md:gap-[1px] bg-white">
					<div
						onClick={() => setCurrentFaq("mentee")}
						className={`border-[#094B10] border md:border-r-transparent duration-300 text-[#094B10] px-20 p-6 text-lg cursor-pointer ${
							currentFaq === "mentee"
								? "bg-[#094B10] text-white"
								: "hover:bg-[#094B10] hover:text-white bg-white"
						}`}
						style={{ fontFamily: "Days One" }}
					>
						Mentee
					</div>
					<div
						onClick={() => setCurrentFaq("mentor")}
						className={`border-[#094B10] border md:border-l-transparent duration-300 px-20 p-6 text-lg cursor-pointer ${
							currentFaq === "mentor"
								? "bg-[#094B10] text-white"
								: "hover:bg-[#094B10] hover:text-white bg-white"
						}`}
						style={{ fontFamily: "Days One" }}
					>
						Mentor
					</div>
				</div>
			</div>
			<div className="px-6 sm:px-10 lg:px-20 mt-16">
				{currentFaq === "mentee" ? <MenteeHelpFAQS /> : <MentorHelpFAQS />}
			</div>
		</div>
	);
};

export default HelpFAQS;

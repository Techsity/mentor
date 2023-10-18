import React, { useEffect, useRef, useState } from "react";
import MenteeHelpFAQS from "./mentee-help-faqs";
import MentorHelpFAQS from "./mentor-help-faqs";

const HelpFAQS = () => {
	const [currentFaq, setCurrentFaq] = useState<"mentee" | "mentor">("mentee");

	return (
		<div className="h-full">
			{/* <div
				className={`flex justify-center w-full top-[9vh] sm:top-24 z-20 ${
					isFixed ? "fixed" : ""
				}`}
				ref={faqNavRef}
			> */}
			<div className="flex justify-center w-full h-auto sticky top-20 z-20 backdrop-blur-md bg-white/50">
				<div className="flex items-center md:gap-[1px] bg-white">
					<div
						onClick={() => setCurrentFaq("mentee")}
						className={`animate__animated animate__slideInLeft border-[#094B10] border md:border-r-transparent duration-300 text-[#094B10] px-20 p-6 text-lg cursor-pointer ${
							currentFaq === "mentee"
								? "bg-[#094B10] text-white"
								: "hover:bg-[#094B10] hover:text-white bg-white"
						}`}
						style={{ fontFamily: "Days One" }}>
						Mentee
					</div>
					<div
						onClick={() => setCurrentFaq("mentor")}
						className={`animate__animated animate__slideInRight border-[#094B10] border md:border-l-transparent duration-300 px-20 p-6 text-lg cursor-pointer ${
							currentFaq === "mentor"
								? "bg-[#094B10] text-white"
								: "hover:bg-[#094B10] hover:text-white bg-white"
						}`}
						style={{ fontFamily: "Days One" }}>
						Mentor
					</div>
				</div>
			</div>
			<div className="px-6 sm:px-10 lg:px-20 mt-16">
				{currentFaq === "mentee" ? (
					<MenteeHelpFAQS />
				) : (
					<MentorHelpFAQS />
				)}
			</div>
		</div>
	);
};

export default HelpFAQS;

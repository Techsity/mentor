import React from "react";
import Education from "./Education";
import Certificates from "./Certificates";

const StepThreeMentorOnboarding = () => {
	return (
		<div className="animate__animated animate__fadeInLeft">
			<h1
				className="-mt-5 text-[#00D569] text-xl sm:text-2xl animate__animated animate__fadeInLeft"
				style={{ fontFamily: "Days One" }}>
				Your Education and Certifications
			</h1>
			<p className="text-sm text-black">
				First, what are your top skills, how many years of experience do you have, then where have you worked,
				what project have you completed.
			</p>
			<div className="grid gap-2 mt-8">
				<Education />
				<Certificates />
			</div>
		</div>
	);
};

export default StepThreeMentorOnboarding;

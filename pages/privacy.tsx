import React, { useState } from "react";
import policies, { IPrivacyPolicy } from "../data/policies";
import NewsLetterForm from "../components/ui/atom/forms/NewsLetterForm";
import { AnimationOnScroll } from "react-animation-on-scroll";

const PrivacyAndPolicyPage = () => {
	const [selectedPolicy, setSelectedPolicy] = useState<IPrivacyPolicy>(
		policies[0],
	);
	return (
		<>
			<div className="md:pt-20 min-h-[50vh] px-5 lg:px-24 mt-10">
				<div className="grid md:grid-cols-12 gap-5 overflow-hidden relative">
					<ul className="md:inline-block hidden col-span-4 border h-full border-[#70C5A1] py-5 pb-8 p-3 overflow-hidden animate__animated animate__fadeInLeft">
						{policies.map((policy, i) => (
							<li
								onClick={() => {
									setSelectedPolicy(policy);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								key={i}
								className={`mt-4 overflow-hidden cursor-pointer duration-300 flex items-center gap-4 ${
									selectedPolicy.title === policy.title ? "text-[#70C5A1]" : ""
								}`}
							>
								● {policy.title}
							</li>
						))}
					</ul>
					<select
						name=""
						id=""
						className="px-10 w-full p-2 absolute top-5 md:hidden z-10 border border-[#70C5A1] rounded"
						value={selectedPolicy.title}
					>
						{policies.map((policy, i) => (
							<option
								value={selectedPolicy.title}
								onClick={() => {
									setSelectedPolicy(policy);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								key={i}
								className={`mt-4 overflow-hidden cursor-pointer duration-300 flex w-full items-center gap-4 ${
									selectedPolicy.title === policy.title ? "text-[#70C5A1]" : ""
								}`}
							>
								{policy.title}
							</option>
						))}
					</select>
					<div
						className="md:pt-auto pt-20 col-span-8 overflow-hidden my-10 md:ml-6 animate__animated animate__fadeInRight "
						id={selectedPolicy.title}
					>
						<h1 className="text-3xl font-semibold mb-10">{selectedPolicy.title}</h1>
						<div className="text-[#C0C0C0] flex items-center gap-5 font-[400] my-5">
							<span>#{selectedPolicy.tag || selectedPolicy.title}</span>
							{/* <span>{new Date(selectedPolicy.createdAt).toLocaleDateString()}</span> */}
							<span>{selectedPolicy.createdAt}</span>
						</div>
						<p className="max-w-3xl">{selectedPolicy.policy}</p>
					</div>
				</div>
			</div>
			<div className="overflow-hidden">
				<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce>
					<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
						Subscribe to our Newsletter
					</h1>
					<div className="flex justify-center my-5 mb-10">
						<NewsLetterForm handleSubmit={(email) => console.log(email)} />
					</div>
				</AnimationOnScroll>
			</div>
		</>
	);
};

export default PrivacyAndPolicyPage;

import React, { useState } from "react";
import { menteeFaqData } from "../../../../../../data/help/faqs";
import Link from "next/link";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { AddSharp } from "react-ionicons";

const MenteeHelpFAQS = () => {
	const [selectedAnswer, setSelectedAnswer] = useState<{
		answer: string;
		question: string;
	} | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<>
			<div className="animate__animated animate__fadeInUp min-h-screen sm:block hidden overflow-hidden">
				<div className="grid gap-6 grid-cols-2 lg:grid-cols-12 items-center">
					{menteeFaqData.map(({ answer, question }, index) => (
						<Link key={index} href="#mentee_faq_answer">
							<h1
								onClick={() => setSelectedAnswer({ answer, question })}
								className="p-5 lg:col-span-4 xl:col-span-3 border border-[#70C5A1] hover:text-white hover:bg-[#70C5A1] duration-300 cursor-pointer"
							>
								{question}
							</h1>
						</Link>
					))}
				</div>
				{selectedAnswer ? (
					<AnimationOnScroll animateIn="animate__fadeIn" animateOnce={!true}>
						<div id="mentee_faq_answer" className="scroll-mt-28 pt-28">
							<h1 className="text-xl font-semibold my-8">{selectedAnswer.question}</h1>
							{selectedAnswer.answer}
						</div>
					</AnimationOnScroll>
				) : null}
			</div>
			<div className="sm:hidden">
				<div className="grid">
					{menteeFaqData.map(({ answer, question }, index) => (
						<div
							key={index}
							className="border-b border-[#70C5A1] cursor-pointer relative"
						>
							<div
								className="flex gap-6 items-center py-6"
								onClick={() => toggleFaq(index)}
							>
								<div className="tracking-tight">{question}</div>
								<div className="ml-auto text-gray-600">
									<AddSharp
										height="30px"
										width="30px"
										color={"#70C5A1"}
										cssClasses={`${
											activeIndex === index ? "rotate-[45deg]" : ""
										} duration-300`}
									/>
								</div>
							</div>
							{activeIndex === index && (
								<div
									className="h-auto w-full bg-[#70C5A1] overflow-y-auto text-white py-5 z-30 border-l border-r px-4 border-[#70C5A1] overflow-hidden transition-max-height duration-300 ease-in-out"
									style={{ maxHeight: "300px" }}
								>
									<div
										onClick={() => toggleFaq(index)}
										className="tracking-tight duration-100 animate__faster animate__animated animate__slideInDown"
									>
										{answer}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MenteeHelpFAQS;

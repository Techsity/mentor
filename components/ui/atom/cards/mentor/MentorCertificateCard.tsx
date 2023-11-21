import React from "react";
import classNames from "classnames";
import { IMentorOnboardingState } from "../../../../../interfaces/mentor.interface";

const MentorCertificateCard = ({
	certificate,
	className,
}: {
	certificate: IMentorOnboardingState["certificates"][0];
	className?: string;
}) => {
	return (
		<div
			className={classNames(
				"border border-[#70C5A1] text-sm p-4 w-full",
				className,
			)}>
			<div className="flex justify-between gap-6 items-center mb-4">
				<div className="flex items-start gap-5">
					<div className="">
						<h1 className="font-[500]">{certificate.type}</h1>
						<p className="font-[300]">{certificate.institution} </p>
					</div>
					<h1 className="">
						{new Date(certificate.year).getFullYear()}
					</h1>
				</div>
				<div className="flex justify-center items-center h-10 w-10 bg-[#E6E6E6] rounded-full overflow-hidden relative">
					<svg
						width="24"
						height="30"
						viewBox="0 0 24 30"
						fill="none"
						className="absolute bottom-0 w-full">
						<path
							d="M0 0H15V30L6 29L0 25.5V0Z"
							fill="#D9D9D9"
							className="animate__fadeInUp animate__infinite animate__slower"
						/>
						<path
							d="M15 8H24V26.7L18 29.5L15 30V8Z"
							fill="#D2D2D2"
							className="animate__fadeInUp animate__infinite animate__slow"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default MentorCertificateCard;

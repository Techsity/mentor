/* eslint-disable @next/next/no-img-element */
import React from "react";

const HomepageTestimonialSectionCard = ({
	fullName,
	avatarUrl,
}: {
	fullName: string;
	avatarUrl?: string;
}) => {
	return (
		<div className="rounded-lg relative p-[1.4px] group overflow-hidden">
			<div className="absolute rounded group-hover:bg-[#70C5A1] bg-opacity-50 bg-gradient-to-l to-[#70C5A1] from-[#70C5A1] via-[#70C5A11a] group-hover:animate-[spin_3s_linear_infinite] top-0 left-0 h-full w-full"></div>
			<div className="flex flex-col gap-20 p-5 bg-white rounded z-10 relative">
				<p className="lg:max-w-[16em] text-sm">
					With Mentör, ive been able to get better at my skills. With
					Mentör, ive been able to get better at my skills.With
					Mentör, ive been able to get better at my skills.With
					Mentör, ive been able to get better at my skills.
				</p>
				<div className="flex items-center justify-between">
					<p>{fullName}</p>
					<img
						src={
							avatarUrl ? avatarUrl : "/assets/images/avatar.png"
						}
						className="rounded-full w-[50px]"
						alt={fullName}
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	);
};

export default HomepageTestimonialSectionCard;

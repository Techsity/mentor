import React from "react";
import { IMentorshipSession } from "../../../../../interfaces";

const RegisteredMentorshipCard = (session: IMentorshipSession) => {
	return (
		<>
			<div className="flex flex-col bg-white shadow hover:shadow-lg h-[200px] cursor-pointer select-none duration-300">
				<div className="h-12 bg-[#70C5A1] w-full text-white flex items-center gap-3 p-5 justify-start">
					<p className="">{session.date.toLocaleDateString()}</p>
					<p className="">||</p>
					<p className="">{session.date.toLocaleDateString()}</p>
				</div>
				<div className=""></div>
			</div>
		</>
	);
};

export default RegisteredMentorshipCard;

import React from "react";
import ProfileNavCard from "../../../ui/atom/cards/profile/ProfileNavCard";

const UserProfilePageTemplate = () => {
	return (
		<>
			<div className="flex flex-col xl:flex-row justify-between item-start w-full h-full">
				<div className="sticky z-10 top-11 md:top-[9dvh] xl:top-20 xs:p-4 w-auto xl:w-[25%] h-[50%] xs:px-12 lg:px-16 pt-10">
					<div className="w-full overflow-hidden hide-scroll-bar">
						<ProfileNavCard />
					</div>
				</div>
				<div className="flex-grow pt-10 xl:order-none order-last min-h-screen px-3 xs:px-6 lg:px-12">
					UserProfilePageTemplate
				</div>
				<div className="xl:sticky top-20 bg-[#F6F9F8] p-4 w-auto xl:w-[30%] min-h-screen h-full xs:pr-6 mx-3 xs:mx-12 lg:mx-0 lg:pr-16 pt-10">
					<h1 className="text-sm font-medium text-zinc-500">
						My profile
					</h1>
				</div>
			</div>
		</>
	);
};

export default UserProfilePageTemplate;

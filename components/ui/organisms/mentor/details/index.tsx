/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PrimaryButton } from "../../../atom/buttons";
import MentorExperienceCard from "../../../atom/cards/mentor/MentorExperienceCard";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { IMentor, IMentorExperience, IMentorProjectType } from "../../../../../interfaces/mentor.interface";
import { useRouter } from "next/router";
import { daysOfTheWeek } from "../../../../../constants";
import classNames from "classnames";
import { useModal } from "../../../../../context/modal.context";

const Skills = ({ skills, loading }: { skills: IMentor["skills"] | undefined; loading?: boolean }) => (
	<div className="grid gap-3">
		<h1 className="font-semibold">Top Skills</h1>
		<span className="flex items-center flex-wrap gap-3 text-sm">
			{loading
				? Array.from({ length: 3 }).map((_, index) => {
						return (
							<span
								key={index}
								className="bg-zinc-400 h-1 px-20 lg:px-16 animate__fadeIn animate__infinite animate__animated"
							/>
						);
				  })
				: skills &&
				  skills.map((skill, i) => (
						<span key={i}>
							<span className="font-[500] text-[#70C5A1]">
								{skill.skill_name}
								{/* {skill.years_of_exp && `- ${skill.years_of_exp}y`} */}
							</span>
						</span>
				  ))}
		</span>
	</div>
);
const Experience = ({ experience, loading }: { experience: IMentorExperience[] | undefined; loading?: boolean }) => {
	const { openModal } = useModal();
	const handleOpen = () => {
		openModal(<ExtraDetailsModal {...{ experience }} />, {
			animate: true,
			closeOnBackgroundClick: true,
			showCloseIcon: true,
			containerClassName: "fixed top-3",
		});
	};
	return (
		<div className="grid gap-3 mt-9">
			<h1 className="font-semibold">Experience</h1>
			<div className="grid sm:grid-cols-2 lg:grid-cols-1 items-center gap-3 lg:max-w-xl w-full">
				{loading &&
					Array.from({ length: 3 }).map((_, index) => {
						return (
							<span
								key={index}
								className="bg-zinc-100 h-32 w-full lg:px-16 animate__fadeIn animate__infinite animate__animated"
							/>
						);
					})}
				{!loading && (
					<>
						{experience &&
							experience?.length >= 1 &&
							experience
								?.map((experience, index) => (
									<div className="w-full overflow-hidden" key={index}>
										<MentorExperienceCard experience={experience} />
									</div>
								))
								.slice(0, 2)}
						{experience && experience?.length > 2 && (
							<div onClick={handleOpen} className="mt-3 text-sm sm:col-span-2 lg:col-span-1">
								<PrimaryButton title="View all Experiences" className="p-2.5 px-8" />
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

const MentorProjects = ({
	projects,
	reEdit = false,
	loading,
}: {
	projects: IMentorProjectType[] | undefined;
	reEdit?: boolean;
	loading?: boolean;
}) => {
	const { openModal } = useModal();
	const handleOpen = () => {
		openModal(<ExtraDetailsModal {...{ projects }} />, {
			animate: true,
			closeOnBackgroundClick: true,
			showCloseIcon: true,
			containerClassName: "fixed top-3",
		});
	};
	return (
		<div className={"grid gap-3 relative"}>
			{!reEdit && <h1 className=" font-semibold">Projects</h1>}
			<span className="grid sm:grid-cols-2 lg:grid-cols-1 items-center gap-3 w-full">
				{loading ? (
					Array.from({ length: 3 }).map((_, index) => {
						return (
							<span
								key={index}
								className="bg-zinc-100 h-32 w-full lg:px-16 animate__fadeIn animate__infinite animate__animated"
							/>
						);
					})
				) : (
					<>
						{projects &&
							projects
								.map((project, index) => (
									<div key={index}>
										{/* <div onClick={() => router.push("#")} key={index}> */}
										<div
											className={`border border-[#70C5A1] text-sm p-4 w-full flex flex-col items-start justify-between gap-5 cursor-pointer ${
												reEdit ? "bg-white" : "bg-transparent"
											}`}>
											<div className="">
												<h1 className="font-[500]">{project.company}</h1>
												<p className="font-[300] my-2">{project.job_role}</p>
											</div>
										</div>
									</div>
								))
								.slice(0, 2)}

						{!reEdit && projects && projects.length > 2 && (
							<div className="mt-3 sm:col-span-2 text-sm lg:col-span-1">
								<PrimaryButton onClick={handleOpen} title="View all Projects" className="p-2.5 px-8" />
							</div>
						)}
					</>
				)}
			</span>
		</div>
	);
};

const AvailabiltySchedule = (mentor: IMentor) => {
	const router = useRouter();
	return (
		<div className="lg:max-w-[35%] w-full bg-[#06310B] p-8 lg:min-h-[65vh] text-white sticky top-28 animate__animated animate__slideInRight overflow-hidden">
			{/* <div className="animate__animated animate__fadeInLeftBig animate__infinite fixed bg-gradient-to-tr opacity-15 from-[#70C5A1] via-[#70C5A1]/50 to-[#fff] top-0 left-0 w-full h-full" /> */}
			<div className="w-full mb-24 lg:mb-0">
				<div className="flex w-full items-center justify-between">
					<h1 className="font-medium">Availability</h1>
					{/* //Todo: dynamically get timezone per mentor */}
					<p className="text-[#CEFFEA] font-[300] mt-2 text-xs">Lagos (GMT +1)</p>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-10">
					{daysOfTheWeek.map((d, index) => {
						const mentorIsAvailable = Boolean(
							mentor?.availability.find((date) => date.day.toLowerCase() == d.toLowerCase()),
						);
						return (
							<div
								key={index}
								className={classNames(
									!mentorIsAvailable ? "text-gray-500" : "text-white",
									"flex gap-6 text-sm sm:justify-start justify-between w-full items-center",
								)}>
								<h1 className="font-medium capitalize">{d}</h1>
								<p className="font-[300]">{mentorIsAvailable ? "Available" : "Unavailable"}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center absolute bottom-10 w-full mx-auto left-0 px-8 md:px-10">
				<div
					onClick={() => router.push(`/mentors/${mentor.id}/consult`)}
					className="w-full text-center p-2.5 bg-white select-none cursor-pointer text-black text-[15px]"
					style={{ fontFamily: "Days One" }}>
					Check availability
				</div>
			</div>
		</div>
	);
};

const ExtraDetailsModal = ({
	experience,
	projects,
}: {
	experience?: IMentorExperience[];
	projects?: IMentor["projects"];
}) => {
	// and &&&&&&&&&& &&
	return (
		<div className="w-full sm:w-[60vw] max-w-[90vw] max-h-[65vh] bg-white rounded-lg overflow-hidden overflow-y-scroll relative hide-scroll-bar">
			<div className="w-full">
				{experience && experience?.length >= 1 && (
					<>
						<h1 className="font-semibold text-center sticky h-6 top-0 bg-black/10 backdrop-blur-md py-5 flex items-center justify-center">
							Experience
						</h1>
						<div className="px-5 grid gap-4 w-full py-3">
							{experience?.map((experience, index) => (
								<MentorExperienceCard experience={experience} key={index} />
							))}
						</div>
					</>
				)}
				{projects && (
					<>
						<h1 className="font-semibold text-center sticky h-6 top-0 bg-black/10 backdrop-blur-md py-5 flex items-center justify-center">
							Projects
						</h1>
						<div className="px-5 grid gap-4 w-full py-3">
							{projects.map((project, index) => (
								<div
									key={index}
									className={`border border-[#70C5A1] text-sm p-4 w-full cursor-default bg-white`}>
									<h1 className="font-[500]">{project.company}</h1>
									<p className="font-[300] my-2">{project.job_role}</p>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export { Skills, Experience, MentorProjects, AvailabiltySchedule };

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { PrimaryButton } from "../../../atom/buttons";
import MentorExperienceCard from "../../../atom/cards/mentor/MentorExperienceCard";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { IMentor, IMentorExperience, IMentorProjectType } from "../../../../../interfaces/mentor.interface";

const Skills = ({ skills }: { skills: IMentor["skills"] }) => (
	<div className="grid gap-3">
		<h1 className="text-xl font-semibold">Top Skills</h1>
		<span className="flex items-center flex-wrap gap-3 text-sm">
			{skills.map((skill, i) => (
				<span key={i} className="font-[400] text-[#70C5A1]">
					{skill.skill_name} |{" "}
					{skill.years_of_exp === 1
						? skill.years_of_exp + " yr"
						: skill.years_of_exp < 1
						? "<1 yr"
						: skill.years_of_exp + " yrs"}
				</span>
			))}
		</span>
	</div>
);
const Experience = ({ experience }: { experience: IMentorExperience[] }) => (
	<div className="grid gap-3 mt-9">
		<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
			<h1 className="text-xl font-semibold">Experience</h1>
		</AnimationOnScroll>
		<span className="grid sm:grid-cols-2 lg:grid-cols-1 items-center gap-3 lg:max-w-xl w-full">
			{experience &&
				experience?.length >= 1 &&
				experience
					?.map((experience, index) => (
						<div className="w-full overflow-hidden" key={index}>
							<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
								<MentorExperienceCard experience={experience} />
							</AnimationOnScroll>
						</div>
					))
					.slice(0, 2)}
		</span>
		<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
			<div className="mt-3">
				<PrimaryButton title="View all Experience" link="#" className="p-4 px-8" />
			</div>
		</AnimationOnScroll>
	</div>
);

const MentorProjects = ({ projects, reEdit = false }: { projects: IMentorProjectType[]; reEdit?: boolean }) => (
	<div className={"grid gap-3"}>
		{!reEdit && (
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<h1 className="text-xl font-semibold">Projects</h1>
			</AnimationOnScroll>
		)}
		<span className="grid sm:grid-cols-2 lg:grid-cols-1 items-center gap-3 w-full">
			{projects &&
				projects
					.map((project, index) => (
						<AnimationOnScroll key={index} animateIn="animate__fadeIn" animateOnce>
							{/* <Link href={project.link && !reEdit ? project.link : "#"}> */}
							{/* Todo: We need poject link from the query*/}
							<Link href={"#"}>
								<div
									className={`border border-[#70C5A1] text-sm p-4 w-full flex items-center justify-between gap-5 cursor-pointer ${
										reEdit ? "bg-white" : "bg-transparent"
									}`}>
									<div className="basis-2/3">
										<h1 className="font-[500]">{project.company}</h1>
										<p className="font-[300] my-2">{project.job_role}</p>
									</div>
									<div className="basis-2/3">
										<h1 className="font-[500] text-[#BEBEBE]">Link</h1>
										<p className="font-[400] my-2">project.link</p>
									</div>
								</div>
							</Link>
						</AnimationOnScroll>
					))
					.slice(0, 2)}
		</span>
		{!reEdit && (
			<div className="mt-3">
				<PrimaryButton title="View all Projects" link="#" className="p-4 px-8" />
			</div>
		)}
	</div>
);
const AvailabiltySchedule = (mentor: IMentor) => (
	<div className="lg:max-w-[35%] w-full bg-[#06310B] p-8 lg:min-h-[85vh] text-white sticky top-28 overflow-y-auto  animate__animated animate__slideInRight">
		<div className="w-full mb-24 lg:mb-0">
			<h1 className="font-medium">My Availability</h1>
			<p className="text-[#CEFFEA] font-[300] mt-2">Lagos (GMT +1)</p>
			<div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-10">
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Mondays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Tuesdays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Wednesdays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Thursdays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Fridays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Saturdays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
				<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
					<div className="flex justify-between w-full items-center">
						<h1 className="font-medium">Sundays</h1>
						<p className="font-[300]">10am - 5pm</p>
					</div>
				</AnimationOnScroll>
			</div>
		</div>
		<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
			<div className="flex justify-center relative h-full lg:top-32">
				<Link href={`/mentors/${mentor.user.name}?consult`}>
					<div
						className="w-full text-center p-4 bg-white select-none cursor-pointer text-black"
						style={{ fontFamily: "Days One" }}>
						Book me now
					</div>
				</Link>
			</div>
		</AnimationOnScroll>
	</div>
);

export { Skills, Experience, MentorProjects, AvailabiltySchedule };

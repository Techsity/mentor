const interests: { category: string; data: { imageUrl?: string; title: string }[] }[] = [
	{
		category: "Technology",
		data: [
			{
				imageUrl: "/assets/images/interests/campaign.png",
				title: "Digital Marketing",
			},
			{ imageUrl: "/assets/images/interests/film.png", title: "Video Editing" },
			{ imageUrl: "/assets/images/interests/bot.png", title: "Robotics" },
			{ imageUrl: "/assets/images/interests/layout.png", title: "UI/UX design" },
			{ imageUrl: "/assets/images/interests/coding.png", title: "HTML/CSS" },
			{ imageUrl: "/assets/images/interests/cyber.png", title: "Cyber Security" },
			{ imageUrl: "/assets/svgs/software.svg", title: "Software Engineering" },
			{
				imageUrl: "/assets/images/interests/monitoring.png",
				title: "Data Analysis",
			},
		],
	},
	{
		category: "Vocational",
		data: [
			{ title: "Accounting", imageUrl: "/assets/svgs/business.svg" },
			{ title: "Carpentry", imageUrl: "/assets/svgs/tools.svg" },
			{ title: "Electrician", imageUrl: "/assets/svgs/electrician.svg" },
			{ title: "Plumbing", imageUrl: "/assets/svgs/plumbing.svg" },
			{ title: "Tailoring", imageUrl: "/assets/svgs/sewing.svg" },
			{ title: "Welding", imageUrl: "/assets/svgs/welder.svg" },
			{ title: "Culinary arts", imageUrl: "/assets/svgs/culinary.svg" },
			{ title: "Graphic design", imageUrl: "/assets/svgs/adobe.svg" },
			{ title: "Fashion design", imageUrl: "/assets/svgs/fashion.svg" },
			{ title: "Hairdressing", imageUrl: "/assets/svgs/hairdressing.svg" },
			// { title: "Computer technician", imageUrl: "" },
			{ title: "Auto repair", imageUrl: "/assets/svgs/car_maitenance.svg" },
		],
	},
	{
		category: "Educational",
		data: [
			{ title: "Math", imageUrl: "/assets/svgs/math.svg" },
			{ title: "Physics", imageUrl: "/assets/svgs/physics.svg" },
			{ title: "Algebra", imageUrl: "/assets/svgs/algebra.svg" },
			{ title: "Financial literacy", imageUrl: "/assets/svgs/financial.svg" },
		],
	},
];

export default interests;

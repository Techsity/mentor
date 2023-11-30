import { ICourseCategory } from "../interfaces";

export interface MainCourseType {
	section: "Technical" | "Vocational" | "Educational";
	categories: ICourseCategory[];
}

const courses: MainCourseType[] = [
	{
		section: "Technical",
		categories: [
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "08:20",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "09:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "20:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "0:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/thumbnails/tmb_3.png",
						duration: 40,
						price: 3900,
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/thumbnails/tmb_3.png",
									duration: 40,
									price: 5500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: false,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing 23",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 5500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: false,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing 23",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing 23",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing wqsad",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing 2sasqw",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing dqwd",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing ssqd",
								},
								{
									requirements: [
										"Mobile Phone",
										"Data and good network area",
										"Book and Jotter",
										"A laptop",
										"Social media tools",
										"Your attention",
									],
									toLearn: [
										"What is Digital Marketing",
										"Who is a Digital Marketer",
										"How digital marketing works",
										"Digital marketing tools",
										"Social Media Algorithms",
										"Positioning ads to precise target audience",
									],
									content: [
										{
											title: "Basic Introduction",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Who is a Digital Marketer",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Digital Marketing Tools",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Blogging",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
										{
											title: "Social Media Algorithm",
											lectures: [
												{
													duration: "05:28",
													name: "Introduction",
													type: "video",
												},
												{
													duration: "10:52",
													name: "Basic Requirements",
													type: "video",
												},
											],
										},
									],
									available: true,
									description: `This Python For Beginners Course Teaches You The
										Python Language Fast. Includes Python Online
										Training With Python 3`,
									imgUrl: "/assets/images/mockups/course_one.png",
									duration: 40,
									price: 3500,
									level: "All Level",
									limit: 20000,
									mentor: {
										courses: [],
										subscribers: 5000,
										skills: ["Javascript", "Python"],
										rating: 4.5,
										ratePerHour: 200,
										mentees: [
											{
												name: "Lorem",
												username: "lorem",
											},
											{
												name: "Lorem",
												username: "lorem",
											},
										],
										languages: [],
										jobTitle: "TypeScript Engineer",
										followers: 20400,
										daysOpen: ["Mon", "Tue", "Wed"],
										country: "NG",
										about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
										sessions: 5,
										verified: true,
										username: "big-moves",
										name: "John Doe",
										avatar: "/assets/images/avatar.png",
									},
									rating: 4.5,
									title: "The Basics of Digital Marketing 23",
								},
							],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 5500,
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: false,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 2",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 5500,
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: false,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 3",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 3500,
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 4",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: false,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 5",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: false,
							username: "big-moves",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Digital Marketing",
			},
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Web Development",
			},
			{ availableCourses: [], title: "Python" },
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Data Science",
			},
			{ availableCourses: [], title: "Cyber Security" },
			{ availableCourses: [], title: "Robotics" },
		],
	},
	{
		section: "Vocational",
		categories: [
			{ availableCourses: [], title: "Web Development" },
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: 3900,
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Digital",
			},
			{ availableCourses: [], title: "Robotics" },
		],
	},
	{
		section: "Educational",
		categories: [
			{ availableCourses: [], title: "Web Development" },
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Digital",
			},
			{
				availableCourses: [
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
					{
						requirements: [
							"Mobile Phone",
							"Data and good network area",
							"Book and Jotter",
							"A laptop",
							"Social media tools",
							"Your attention",
						],
						toLearn: [
							"What is Digital Marketing",
							"Who is a Digital Marketer",
							"How digital marketing works",
							"Digital marketing tools",
							"Social Media Algorithms",
							"Positioning ads to precise target audience",
						],
						content: [
							{
								title: "Basic Introduction",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								lectures: [
									{
										duration: "05:28",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "10:52",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3`,
						imgUrl: "/assets/images/mockups/course_one.png",
						duration: 40,
						price: "free",
						level: "All Level",
						limit: 20000,
						mentor: {
							courses: [],
							subscribers: 5000,
							skills: ["Javascript", "Python"],
							rating: 4.5,
							ratePerHour: 200,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: `I am an Accomplished product designer with over 8 years of experience, i love taking and interacting with younger designers to know how i can help them grow. i have come a long way in the design industry so i would like to help you grow also.`,
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing 23",
					},
				],
				title: "Robotics",
			},
		],
	},
];

export default courses;

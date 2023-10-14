import { ICourseCategory } from "../interfaces";

const courses: {
	section: "Technical" | "Vocational" | "Educational";
	categories: ICourseCategory[];
}[] = [
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: false,
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: false,
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: false,
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: false,
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
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
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Who is a Digital Marketer",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Digital Marketing Tools",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Blogging",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
							{
								title: "Social Media Algorithm",
								list: [
									{
										duration: "0528",
										name: "Introduction",
										type: "video",
									},
									{
										duration: "1052",
										name: "Basic Requirements",
										type: "video",
									},
								],
							},
						],
						available: true,
						description: `This Python For Beginners Course Teaches You The
								Python Language Fast. Includes Python Online
								Training With Python 3 This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python 3This Python For Beginners
								Course Teaches You The Python Language Fast.
								Includes Python Online Training With Python
								3This Python For Beginners Course Teaches You
								The Python Language Fast. Includes Python Online
								Training With Python`,
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
							online: true,
							mentees: [
								{ name: "Lorem", username: "lorem" },
								{ name: "Lorem", username: "lorem" },
							],
							languages: [],
							jobTitle: "TypeScript Engineer",
							followers: 20400,
							daysOpen: ["Mon", "Tue", "Wed"],
							country: "NG",
							about: "Lorem ipsum sdushk disdonwdijk cdisnidn",
							sessions: 5,
							verified: true,
							username: "",
							name: "John Doe",
							avatar: "/assets/images/avatar.png",
						},
						rating: 4.5,
						title: "The Basics of Digital Marketing",
					},
				],
				title: "Robotics",
			},
		],
	},
];

export default courses;

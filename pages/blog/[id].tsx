/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext } from "next";
import React from "react";
import { ChevronUpOutline } from "react-ionicons";
import NewsLetterForm from "../../components/ui/atom/forms/NewsLetterForm";
import { scrollToTop } from "../../utils";
import blogs from "../../data/about/blogs";
import { IBlogPost } from "../../interfaces";
import Link from "next/link";

const SingleBlogPost = ({ post }: { post: IBlogPost }) => {
	return (
		<>
			<div className="min-h-[80vh]">
				<div className="max-w-screen-lg mx-auto md:pt-16">
					<main className="mt-12">
						<div className="flex flex-wrap md:flex-no-wrap space-x-0 md:space-x-6 mb-16">
							<div className="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-4/7 relative rounded block">
								<img
									src={post.thumbnail}
									className="rounded-md object-cover w-full h-72"
									alt=""
								/>
								<span className="text-green-700 text-sm hidden md:block mt-4 italic">
									{" "}
									#{post.category}{" "}
								</span>
								<h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
									{post.title}
								</h1>
								<p className="text-gray-600 mb-4">{post.content}</p>
								{/* <a
									href="#"
									className="inline-block px-6 py-3 mt-2 rounded-md bg-green-700 text-gray-100"
								>
									Read more
								</a> */}
							</div>
						</div>
						{/* <div className="w-full md:w-4/7">
								<div className="rounded w-full flex flex-col md:flex-row mb-10">
									<img
										src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
										className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
										alt=""
										alt=""
									/>
									<div className="bg-white rounded px-4">
										<span className="text-green-700 text-sm hidden md:block">
											{" "}
											Gadgets{" "}
										</span>
										<div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
											At every tiled on ye defer do. No attention suspected oh difficult.
										</div>
										<p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
											Wonder matter now can estate esteem assure fat roused. Am performed
											on existence as discourse is. Pleasure friendly at marriage blessing
											or
										</p>
									</div>
								</div>

								<div className="rounded w-full flex flex-col md:flex-row mb-10">
									<img
										src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
										className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
										alt=""
									/>
									<div className="bg-white rounded px-4">
										<span className="text-green-700 text-sm hidden md:block">
											{" "}
											Bitcoin{" "}
										</span>
										<div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
											Fond his say old meet cold find come whom. The sir park sake bred.
										</div>
										<p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
											Integer commodo, sapien ut vulputate viverra, Integer commodo Integer
											commodo, sapien ut vulputate viverra, Integer commodo
										</p>
									</div>
								</div>

								<div className="rounded w-full flex flex-col md:flex-row mb-10">
									<img
										src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
										className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
										alt=""
									/>
									<div className="bg-white rounded px-4">
										<span className="text-green-700 text-sm hidden md:block">
											{" "}
											Insights{" "}
										</span>
										<div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
											Advice me cousin an spring of needed. Tell use paid law ever yet new.
										</div>
										<p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
											Meant to learn of vexed if style allow he there. Tiled man stand
											tears ten joy there terms any widen.
										</p>
									</div>
								</div>

								<div className="rounded w-full flex flex-col md:flex-row mb-10">
									<img
										src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
										className="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0"
										alt=""
										alt=""
									/>
									<div className="bg-white rounded px-4">
										<span className="text-green-700 text-sm hidden md:block">
											{" "}
											Cryptocurrency{" "}
										</span>
										<div className="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
											Advice me cousin an spring of needed. Tell use paid law ever yet new.
										</div>
										<p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
											Meant to learn of vexed if style allow he there. Tiled man stand
											tears ten joy there terms any widen.
										</p>
									</div>
								</div>
							</div> */}

						<div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
							<h2 className="font-semibold text-2xl">
								More articles in this category
							</h2>
							<Link href="/blog">
								<span className="select-none bg-gray-200 duration-300 hover:bg-green-200 text-gray-800 px-3 py-1 rounded cursor-pointer">
									View all
								</span>
							</Link>
						</div>
						<div className="block space-x-0 lg:flex lg:space-x-6">
							<div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
								<img
									src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
									className="rounded"
									alt="technology"
								/>
								<div className="p-4 pl-0">
									<h2 className="font-bold text-2xl text-gray-800">
										Put all speaking her delicate recurred possible.
									</h2>
									<p className="text-gray-700 mt-2">
										Set indulgence inquietude discretion insensible bed why announcing.
										Middleton fat two satisfied additions. So continued he or commanded
										household smallness delivered. Door poor on do walk in half. Roof his
										head the what.
									</p>

									<a
										href="#"
										className="inline-block py-2 rounded text-green-900 mt-2 ml-auto"
									>
										{" "}
										Read more{" "}
									</a>
								</div>
							</div>
							<div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
								<img
									src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
									className="rounded"
									alt="technology"
								/>
								<div className="p-4 pl-0">
									<h2 className="font-bold text-2xl text-gray-800">
										Put all speaking her delicate recurred possible.
									</h2>
									<p className="text-gray-700 mt-2">
										Set indulgence inquietude discretion insensible bed why announcing.
										Middleton fat two satisfied additions. So continued he or commanded
										household smallness delivered. Door poor on do walk in half. Roof his
										head the what.
									</p>

									<a
										href="#"
										className="inline-block py-2 rounded text-green-900 mt-2 ml-auto"
									>
										{" "}
										Read more{" "}
									</a>
								</div>
							</div>
							<div className="rounded w-full lg:w-1/2 lg:w-1/3 p-4 lg:p-0">
								<img
									src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
									className="rounded"
									alt="technology"
								/>
								<div className="p-4 pl-0">
									<h2 className="font-bold text-2xl text-gray-800">
										Put all speaking her delicate recurred possible.
									</h2>
									<p className="text-gray-700 mt-2">
										Set indulgence inquietude discretion insensible bed why announcing.
										Middleton fat two satisfied additions. So continued he or commanded
										household smallness delivered. Door poor on do walk in half. Roof his
										head the what.
									</p>

									<a
										href="#"
										className="inline-block py-2 rounded text-green-900 mt-2 ml-auto"
									>
										{" "}
										Read more{" "}
									</a>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div className="mt-28">
				<h1 className="text-center mt-20" style={{ fontFamily: "Days One" }}>
					Subscribe to our Newsletter
				</h1>
				<div className="flex justify-center my-5 mb-10">
					<NewsLetterForm handleSubmit={(email) => console.log(email)} />
				</div>
			</div>
			{/* <div className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50 md:flex hidden"> */}
			<div
				className="bg-[#FFB100] absolute p-3 rounded-bl cursor-pointer right-0 z-50"
				onClick={scrollToTop}
			>
				<ChevronUpOutline color="green" height="30px" width="30px" />
			</div>
		</>
	);
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { id } = ctx.query;
	const postId = id?.toString();
	const post = blogs.find((post) => post.slug === id);
	if (!id) {
		return { props: {}, redirect: { destination: "/blog", permanent: false } };
	}
	if (!post) {
		return { props: {}, redirect: { destination: "/blog", permanent: false } };
	}

	return { props: { post } };
};

export default SingleBlogPost;

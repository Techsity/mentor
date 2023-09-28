import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import blogs from "../../../../../data/about/blogs";
import BlogSectionCard from "../../../atom/cards/about/BlogSectionCard";

const SimilarInterest = () => {
	return (
		<div className="min-h-[50vh] mt-10 overflow-hidden">
			<AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
				<div className="flex justify-center items-center">
					<div className="">
						<h1 className="my-10 font-semibol text-lg">
							People with similar interest also view
						</h1>
						<div className="grid lg:grid-cols-3 gap-6 items-center max-w-5xl">
							{blogs
								.map((item, index) => {
									return <BlogSectionCard {...item} key={index} />;
								})
								.slice(0, 3)}
						</div>
					</div>
				</div>
			</AnimationOnScroll>
		</div>
	);
};

export default SimilarInterest;

/* eslint-disable @next/next/no-img-element */
import { AnimationOnScroll } from "react-animation-on-scroll";
import { PrimaryButton } from "../../buttons";
import Link from "next/link";

const ListReviews = () => (
	<div className="grid gap-3 mt-9">
		<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
			<h1 className="text-xl font-semibold">Featured Reviews</h1>
		</AnimationOnScroll>
		<span className="grid sm:grid-cols-2 items-center gap-3 lg:max-w-xl w-full">
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<Link href={"#"}>
					<div className="border border-[#70C5A1] text-sm p-5 gap-5 cursor-pointer">
						<p className="">
							I once thought digital marketing was for the big
							guys until i took this course, thank you for making
							it so easy and simple
						</p>
						<div className="flex items-center mt-5 justify-between">
							<p className="">Adewole Sulaiman</p>
							<img
								src="/assets/images/avatar.png"
								alt=""
								className="w-10 rounded-full"
								loading="lazy"
							/>
						</div>
					</div>
				</Link>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<Link href={"#"}>
					<div className="border border-[#70C5A1] text-sm p-5 gap-5 cursor-pointer">
						<p className="">
							I once thought digital marketing was for the big
							guys until i took this course, thank you for making
							it so easy and simple
						</p>
						<div className="flex items-center mt-5 justify-between">
							<p className="">Adewole Sulaiman</p>
							<img
								src="/assets/images/avatar.png"
								alt=""
								className="w-10 rounded-full"
								loading="lazy"
							/>
						</div>
					</div>
				</Link>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<Link href={"#"}>
					<div className="border border-[#70C5A1] text-sm p-5 gap-5 cursor-pointer">
						<p className="">
							I once thought digital marketing was for the big
							guys until i took this course, thank you for making
							it so easy and simple
						</p>
						<div className="flex items-center mt-5 justify-between">
							<p className="">Adewole Sulaiman</p>
							<img
								src="/assets/images/avatar.png"
								alt=""
								className="w-10 rounded-full"
								loading="lazy"
							/>
						</div>
					</div>
				</Link>
			</AnimationOnScroll>
			<AnimationOnScroll animateIn="animate__slideInUp" animateOnce>
				<Link href={"#"}>
					<div className="border border-[#70C5A1] text-sm p-5 gap-5 cursor-pointer">
						<p className="">
							I once thought digital marketing was for the big
							guys until i took this course, thank you for making
							it so easy and simple
						</p>
						<div className="flex items-center mt-5 justify-between">
							<p className="">Adewole Sulaiman</p>
							<img
								src="/assets/images/avatar.png"
								alt=""
								className="w-10 rounded-full"
								loading="lazy"
							/>
						</div>
					</div>
				</Link>
			</AnimationOnScroll>
		</span>
		<div className="mt-3">
			<PrimaryButton
				title="View all Reviews"
				link="#"
				className="p-4 px-8"
			/>
		</div>
	</div>
);

export default ListReviews;

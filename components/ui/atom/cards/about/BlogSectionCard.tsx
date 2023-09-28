/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IBlogPost } from "../../../../../interfaces";
import Link from "next/link";

const BlogSectionCard = ({
	caption,
	title,
	thumbnail,
	category,
	content,
	createdAt,
	postedBy,
}: IBlogPost) => {
	return (
		<div className="select-none bg-white shadow hover:shadow-lg group duration-300 cursor-default text-black min-h-[400px] h-full">
			<div className="flex items-end pb-10 justify-start h-full relative">
				<div className="absolute top-0 w-full h-[50%] bg-[red]">
					<img
						src={thumbnail ? thumbnail : "/assets/images/thumbnails/tmb_2.png"}
						alt=""
						className="h-full w-full"
					/>
				</div>
				<div className="bg-black absolute top-0 justify-center items-center w-full h-[50%] bg-opacity-40 hidden group-hover:flex animate__faster animate__animated animate__fadeIn text-white">
					<Link href="#">
						<div className="text-sm cursor-pointer hover:bg-[#70C5A1] duration-300 border border-white px-4 p-1">
							Continue Reading
						</div>
					</Link>
				</div>
				<div className="px-3">
					<p className="font-[500]">{title}</p>
					<div className="text-xs py-1 text-[#C0C0C0] flex xl:gap-4 justify-between items-center">
						<span>#{category}</span>
						<span>{createdAt}</span>
						<div className="flex gap-1.5 items-center">
							<img
								src={postedBy.avatar || "/assets/images/avatar.png"}
								className="rounded-full w-6"
								alt={postedBy.name}
							/>
							<h1>{postedBy.name.split(" ")[0]}</h1>
						</div>
					</div>
					<p className="font-[500] max-w-sm">{caption.slice(0, 90)}...</p>
				</div>
			</div>
		</div>
	);
};

export default BlogSectionCard;

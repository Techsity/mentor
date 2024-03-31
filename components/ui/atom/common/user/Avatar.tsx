import React, { useMemo } from "react";
import { IUser } from "../../../../../interfaces/user.interface";
import { IUserWithMentor } from "../../../../../interfaces/auth.interface";
import classNames from "classnames";

const Avatar = ({ user, className }: { user?: IUser | IUserWithMentor | null; className?: string }) => {
	const colors = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400", "bg-purple-400"];

	const getRandomColor = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
	};
	const background = useMemo(() => {
		if (!user?.name) return getRandomColor();
		const colorIndex = Math.floor(user.name.length / colors.length) % colors.length;
		return colors[colorIndex];
	}, [user?.name]);

	return user?.avatar ? (
		<div className={classNames("rounded-full object-cover relative", className ? className : "w-9 h-9")}>
			<img src={user?.avatar} alt={""} className="w-full h-full bg-zinc-300 rounded-full" loading="lazy" />
		</div>
	) : (
		<p
			className={classNames(
				"select-none rounded-full object-cover relative text-black flex justify-center items-center font-semibold uppercase",
				background,
				className ? className : "w-9 h-9",
			)}>
			{user?.name.charAt(0)}
		</p>
	);
};

export default Avatar;

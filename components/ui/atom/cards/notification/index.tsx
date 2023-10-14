import React from "react";

const NotificationCard = () => {
	const notifications = [
		{
			title: "",
			message: "",
			date: new Date("October 1, 2023 12:00:00"),
			link: "",
		},
	];
	const NotificationItem = () => {
		return (
			<div className="w-full grid gap-3">
				<div className="grid gap-1">
					<h1 className="font-semibold text-[#70C5A1]">Newer Notifications</h1>
					<div className="">
						<div className="">Notification Item</div>
						<div className="">Notification Item</div>
					</div>
				</div>
				<div className="grid gap-1">
					<h1 className="font-semibold text-[#70C5A1]">Newer Notifications</h1>
					<div className="">
						<div className="">Notification Item</div>
						<div className="">Notification Item</div>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div className="animate__animated animate__bounceInRight animate__faster absolute bg-white border border-[#70C5A1] p-5 py-8 right-0 md:w-[50vw] md:right-12 top-20 w-full lg:w-[40vw] xl:w-[30vw] overflow-y-scroll overflow-hidden h-[60vh]">
			<NotificationItem />
			<NotificationItem />
			<NotificationItem />
		</div>
	);
};

export default NotificationCard;

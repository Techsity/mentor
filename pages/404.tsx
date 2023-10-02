import { useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
	const router = useRouter();

	// useEffect(() => {
	// 	router.replace("/");
	// }, []);

	return (
		<div className="text-black pt-20">
			<h1>Page Not Found</h1>
			<p>Redirecting...</p>
			<Link href="/">Home</Link>
		</div>
	);
};

export default NotFoundPage;

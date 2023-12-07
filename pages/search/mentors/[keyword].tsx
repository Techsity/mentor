import { useRouter } from "next/router";
import React from "react";

const MentorsSearchPage = () => {
	const router = useRouter();
	const { keyword } = router.query; // may be mentor name, or mentor jobtitle, or mentor specialization
	return <div>MentorsSearchPage</div>;
};

export default MentorsSearchPage;

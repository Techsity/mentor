import React, { useEffect, useState } from "react";
import protectedPageWrapper from "../../../../pages/protectedPageWrapper";
import ActivityIndicator from "../../../ui/atom/loader/ActivityIndicator";

const EditCourseTemplate = () => {
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		if (loading)
			setTimeout(function () {
				setLoading(false);
			}, 1000); // slow loading simulation
	}, []);
	return loading ? (
		<div className="flex justify-center items-center">
			<ActivityIndicator color="#094B10" size={40} />
		</div>
	) : (
		<>EditCourseTemplate</>
	);
};

export default EditCourseTemplate;

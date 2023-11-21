import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { onboardingMentorState } from "../../../../../../../redux/reducers/features/onboardingSlice";

const FinalStepAvailabilityEdit = () => {
	const dispatch = useDispatch();
	const onboardingMentor = useSelector(onboardingMentorState);
	const [editAvailability, setEditAvailability] = useState<boolean>(false);

	return (
		<div className="my-2">
			<FinalStepEditButton
				title="Your Availability"
				editAction={() => setEditAvailability(!editAvailability)}
			/>
			{editAvailability ? <>Edit</> : <>Display</>}
		</div>
	);
};

export default FinalStepAvailabilityEdit;

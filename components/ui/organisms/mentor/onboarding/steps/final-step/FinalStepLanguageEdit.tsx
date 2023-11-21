import React, { useState } from "react";
import { FinalStepEditButton } from "./index";
import Languages from "../step-four/Languages";

const FinalStepLanguageEdit = () => {
	const [editAvailability, setEditAvailability] = useState<boolean>(false);

	return (
		<div className="my-2">
			<FinalStepEditButton
				title="Languages Spoken"
				editAction={() => setEditAvailability(!editAvailability)}
			/>
			{editAvailability ? <Languages /> : <>Display</>}
		</div>
	);
};

export default FinalStepLanguageEdit;

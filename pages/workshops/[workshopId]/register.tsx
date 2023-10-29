import React from "react";
import protectedPageWrapper from "../../protectedPageWrapper";
import workshops from "../../../data/workshops";

const RegisterForWorkshop = () => {
	const workshop = workshops[0];
	return <>RegisterForWorkshop</>;
};

export default protectedPageWrapper(RegisterForWorkshop);

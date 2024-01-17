import React from "react";
import protectedPageWrapper from "../../../protectedPageWrapper";
import dynamic from "next/dynamic";

const AgoraClientProvider = dynamic(() => import("../../../../hooks/agora"), { ssr: false });
const LiveworkshopTemplate = dynamic(() => import("../../../../components/templates/workshop/live"), {
	ssr: false,
});

const LiveWorkshop = () => {

	
	return (
		<AgoraClientProvider>
			<LiveworkshopTemplate />
		</AgoraClientProvider>
	);
};


// export default LiveWorkshop;
export default protectedPageWrapper(LiveWorkshop);

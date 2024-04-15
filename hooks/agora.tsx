import { ReactNode, useEffect, useState } from "react";
import type { ClientConfig } from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProviderPrimitive = dynamic(
	() => import("agora-rtc-react").then(({ AgoraRTCProvider }) => AgoraRTCProvider),
	{
		ssr: false,
	},
);
const { createClient, disableLogUpload } = (await import("agora-rtc-react")).default;
const config: ClientConfig = { codec: "vp8", mode: "rtc" };

export const client = createClient(config);

export default function AgoraRTCProvider(props: { children?: ReactNode }) {
	disableLogUpload();
	return client !== null && <AgoraRTCProviderPrimitive client={client}>{props.children}</AgoraRTCProviderPrimitive>;
}

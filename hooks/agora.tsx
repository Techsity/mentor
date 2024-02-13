import { ReactNode } from "react";
import type { ClientConfig } from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProviderPrimitive = dynamic(
	() => import("agora-rtc-react").then(({ AgoraRTCProvider }) => AgoraRTCProvider),
	{
		ssr: false,
	},
);
const { createClient, createMicrophoneAndCameraTracks } = (await import("agora-rtc-react")).default;
const config: ClientConfig = { codec: "vp8", mode: "rtc" };

export const client = createClient(config);

export default function AgoraRTCProvider(props: { children?: ReactNode }) {
	return client !== null && <AgoraRTCProviderPrimitive client={client}>{props.children}</AgoraRTCProviderPrimitive>;
}
export const createTracks = createMicrophoneAndCameraTracks;

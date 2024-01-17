import { useState, useEffect, ReactNode, useRef } from "react";
import type { ClientConfig, IAgoraRTCClient } from "agora-rtc-react";
import dynamic from "next/dynamic";

const AgoraRTCProviderPrimitive = dynamic(
	() => import("agora-rtc-react").then(({ AgoraRTCProvider }) => AgoraRTCProvider),
	{
		ssr: false,
	},
);
const AgoraRTC = (await import("agora-rtc-react")).default;

const config: ClientConfig = { codec: "vp8", mode: "rtc" };

export const client = AgoraRTC.createClient(config);
export default function AgoraRTCProvider(props: { children?: ReactNode }) {
	return client !== null && <AgoraRTCProviderPrimitive client={client}>{props.children}</AgoraRTCProviderPrimitive>;
}
